import { NextRequest, NextResponse } from 'next/server';
import { getShipEngineClient, isCarrierEnabled } from '@/lib/shipengine';

// API to get real-time shipping rates from ShipEngine with 50% markup
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toAddress, weight } = body;

    console.log('🚀 ShipEngine Request received:', {
      to: toAddress,
      weight,
    });

    try {
      const shipengine = getShipEngineClient();

      // Your business address (from)
      const shipFrom = {
        name: 'JungleeToys',
        companyName: 'JungleeToys',
        addressLine1: '483 Green Lanes',
        cityLocality: 'London',
        stateProvince: '',
        postalCode: 'N13 4BS',
        countryCode: 'GB',
        phone: '+44 7342224136',
        addressResidentialIndicator: 'no' as const,
      };

      // Customer address (to)
      const shipTo = {
        name: toAddress.name,
        addressLine1: toAddress.street1,
        addressLine2: toAddress.street2 || '',
        cityLocality: toAddress.city,
        stateProvince: toAddress.state || '',
        postalCode: toAddress.zip,
        countryCode: toAddress.country,
        phone: toAddress.phone || '',
        addressResidentialIndicator: 'yes' as const,
      };

      // Package details
      const packageDetails = {
        weight: {
          value: parseFloat(weight || '0.5'),
          unit: 'kilogram' as const,
        },
        dimensions: {
          length: 15,
          width: 10,
          height: 10,
          unit: 'centimeter' as const,
        },
      };

      console.log('📦 Requesting rates from ShipEngine...');

      // Get rates from ShipEngine
      // Use your connected carrier IDs: Royal Mail, EVRi, DPD
      const ratesResponse = await shipengine.getRatesWithShipmentDetails({
        shipment: {
          shipFrom: shipFrom,
          shipTo: shipTo,
          packages: [packageDetails],
        },
        rateOptions: {
          carrierIds: [
            'se-359318', // Royal Mail
            'se-359314', // EVRi
            'se-359315', // DPD
          ],
        },
      });

      const rates = ratesResponse.rateResponse?.rates || [];

      console.log(`✅ Received ${rates.length} rates from ShipEngine`);

      if (rates.length > 0) {
        const providers = rates.map((r: any) => r.carrierFriendlyName || r.carrierCode);
        console.log('🏷️ Available carriers:', Array.from(new Set(providers)));
      }

      // Collect ALL carriers for debugging
      const allCarriersFromShipEngine = Array.from(
        new Set(rates.map((r: any) => r.carrierFriendlyName || r.carrierCode))
      );
      const allRatesDetails = rates.map((r: any) => ({
        carrier: r.carrierFriendlyName || r.carrierCode,
        service: r.serviceType,
        rate: r.shippingAmount?.amount,
        currency: r.shippingAmount?.currency,
        enabled: isCarrierEnabled(r.carrierFriendlyName || r.carrierCode),
      }));

      console.log('🔍 DEBUG: All carriers from ShipEngine:', allCarriersFromShipEngine);
      console.log('🔍 DEBUG: Total rates received:', rates.length);
      console.log('🔍 DEBUG: All rates details:', JSON.stringify(allRatesDetails, null, 2));

      // Filter for enabled carriers and apply 50% markup
      const markedUpRates = rates
        .filter((rate: any) => {
          const carrierName = rate.carrierFriendlyName || rate.carrierCode;
          const enabled = isCarrierEnabled(carrierName);
          console.log(`🔍 ${carrierName} (${rate.serviceType}): ${enabled ? '✅ ENABLED' : '❌ DISABLED'}`);
          return enabled;
        })
        .map((rate: any) => {
          const originalAmount = parseFloat(rate.shippingAmount.amount);
          const markedUpAmount = (originalAmount * 1.5).toFixed(2); // 50% markup (includes handling)

          let carrierName = rate.carrierFriendlyName || rate.carrierCode;

          // Clean up carrier name - remove "ShipStation Carrier Services"
          carrierName = carrierName.replace(' - ShipStation Carrier Services', '');

          // Simplify service names - remove detailed descriptions
          let simplifiedService = 'Standard Delivery';

          // Determine service type based on carrier
          if (carrierName.includes('EVRi')) {
            if (rate.serviceType.toLowerCase().includes('next day')) {
              simplifiedService = 'Next Day Delivery';
            } else {
              simplifiedService = 'Standard Delivery';
            }
          } else if (carrierName.includes('Royal Mail')) {
            if (rate.serviceType.includes('24')) {
              simplifiedService = 'Next Day';
            } else {
              simplifiedService = '2-3 Day Delivery';
            }
          } else if (carrierName.includes('DPD')) {
            if (rate.serviceType.toLowerCase().includes('next day')) {
              simplifiedService = 'Next Day';
            } else {
              simplifiedService = 'Standard Delivery';
            }
          }

          console.log(`💰 ${carrierName} ${rate.serviceType}: £${rate.shippingAmount.amount} → £${markedUpAmount}`);

          return {
            id: rate.rateId,
            provider: carrierName,
            serviceName: simplifiedService,
            amount: markedUpAmount,
            originalAmount: rate.shippingAmount.amount,
            currency: rate.shippingAmount.currency,
            estimatedDays: rate.deliveryDays || '3-5',
            shipengineRateId: rate.rateId,
          };
        })
        .sort((a: any, b: any) => parseFloat(a.amount) - parseFloat(b.amount));

      // Group by carrier and service type - show both standard and next day
      const serviceMap = new Map();
      markedUpRates.forEach((rate: any) => {
        const key = `${rate.provider}_${rate.serviceName}`;
        const existing = serviceMap.get(key);
        if (!existing || parseFloat(rate.amount) < parseFloat(existing.amount)) {
          serviceMap.set(key, rate);
        }
      });

      // Get final rates - includes both standard and next day options
      const finalRates = Array.from(serviceMap.values())
        .sort((a: any, b: any) => parseFloat(a.amount) - parseFloat(b.amount));

      console.log(`✅ Returning ${finalRates.length} simplified rates (standard + next day options)`);

      // If no enabled carriers found, return fallback
      if (finalRates.length === 0) {
        console.log('⚠️ No enabled carrier rates available, using fallback');
        return NextResponse.json({
          rates: [
            {
              id: 'flat-rate',
              provider: 'Standard UK',
              serviceName: 'Standard Delivery',
              amount: '3.99',
              currency: 'GBP',
              estimatedDays: '3-5',
            },
          ],
        });
      }

      // Return simplified rates (cheapest option per carrier, 50% markup included)
      return NextResponse.json({
        rates: finalRates,
      });

    } catch (shipengineError: any) {
      console.error('❌ ShipEngine API Error:', shipengineError);

      // Return fallback on ShipEngine error
      return NextResponse.json({
        rates: [
          {
            id: 'flat-rate',
            provider: 'Standard UK',
            serviceName: 'Standard Delivery',
            amount: '3.99',
            currency: 'GBP',
            estimatedDays: '3-5',
          },
        ],
        debug: {
          error: 'ShipEngine API error',
          message: shipengineError.message,
        },
      });
    }

  } catch (error: any) {
    console.error('💥 Shipping rates error:', error);

    return NextResponse.json({
      rates: [
        {
          id: 'flat-rate',
          provider: 'Standard UK',
          serviceName: 'Standard Delivery',
          amount: '3.99',
          currency: 'GBP',
          estimatedDays: '3-5',
        },
      ],
      error: error.message,
    });
  }
}
