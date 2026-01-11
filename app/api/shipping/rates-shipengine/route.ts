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
        company_name: 'JungleeToys',
        address_line1: '483 Green Lanes',
        city_locality: 'London',
        state_province: '',
        postal_code: 'N13 4BS',
        country_code: 'GB',
        phone: '+44 7342224136',
      };

      // Customer address (to)
      const shipTo = {
        name: toAddress.name,
        address_line1: toAddress.street1,
        address_line2: toAddress.street2 || '',
        city_locality: toAddress.city,
        state_province: toAddress.state || '',
        postal_code: toAddress.zip,
        country_code: toAddress.country,
        phone: toAddress.phone || '',
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
      const ratesResponse = await shipengine.getRatesWithShipmentDetails({
        shipment: {
          ship_from: shipFrom,
          ship_to: shipTo,
          packages: [packageDetails],
        },
        rate_options: {
          carrier_ids: [], // Empty means all connected carriers
        },
      });

      const rates = ratesResponse.rate_response?.rates || [];

      console.log(`✅ Received ${rates.length} rates from ShipEngine`);

      if (rates.length > 0) {
        const providers = rates.map((r: any) => r.carrier_friendly_name || r.carrier_code);
        console.log('🏷️ Available carriers:', Array.from(new Set(providers)));
      }

      // Collect ALL carriers for debugging
      const allCarriersFromShipEngine = Array.from(
        new Set(rates.map((r: any) => r.carrier_friendly_name || r.carrier_code))
      );
      const allRatesDetails = rates.map((r: any) => ({
        carrier: r.carrier_friendly_name || r.carrier_code,
        service: r.service_type,
        rate: r.shipping_amount?.amount,
        currency: r.shipping_amount?.currency,
        enabled: isCarrierEnabled(r.carrier_friendly_name || r.carrier_code),
      }));

      console.log('🔍 DEBUG: All carriers from ShipEngine:', allCarriersFromShipEngine);
      console.log('🔍 DEBUG: Total rates received:', rates.length);
      console.log('🔍 DEBUG: All rates details:', JSON.stringify(allRatesDetails, null, 2));

      // Filter for enabled carriers and apply 50% markup
      const markedUpRates = rates
        .filter((rate: any) => {
          const carrierName = rate.carrier_friendly_name || rate.carrier_code;
          const enabled = isCarrierEnabled(carrierName);
          console.log(`🔍 ${carrierName} (${rate.service_type}): ${enabled ? '✅ ENABLED' : '❌ DISABLED'}`);
          return enabled;
        })
        .map((rate: any) => {
          const originalAmount = parseFloat(rate.shipping_amount.amount);
          const markedUpAmount = (originalAmount * 1.5).toFixed(2); // 50% markup

          const carrierName = rate.carrier_friendly_name || rate.carrier_code;
          console.log(`💰 ${carrierName} ${rate.service_type}: £${rate.shipping_amount.amount} → £${markedUpAmount}`);

          return {
            id: rate.rate_id,
            provider: carrierName,
            serviceName: rate.service_type,
            amount: markedUpAmount,
            originalAmount: rate.shipping_amount.amount,
            currency: rate.shipping_amount.currency,
            estimatedDays: rate.delivery_days || '3-5',
            shipengineRateId: rate.rate_id, // Store for label purchase
          };
        })
        .sort((a: any, b: any) => parseFloat(a.amount) - parseFloat(b.amount));

      console.log(`✅ Returning ${markedUpRates.length} marked up rates`);

      // If no enabled carriers found, return fallback
      if (markedUpRates.length === 0) {
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
          debug: {
            message: 'No enabled carriers available',
            totalRatesReceived: rates.length,
            availableCarriers: allCarriersFromShipEngine,
            allRates: allRatesDetails,
          },
        });
      }

      // TEMPORARY: Include debug info to see what carriers ShipEngine is returning
      return NextResponse.json({
        rates: markedUpRates,
        debug: {
          totalRatesReceived: rates.length,
          totalRatesReturned: markedUpRates.length,
          allCarriersFromShipEngine: allCarriersFromShipEngine,
          allRates: allRatesDetails,
        },
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
