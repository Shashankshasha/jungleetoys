import { NextRequest, NextResponse } from 'next/server';
import { getEasyPostClient, isCarrierEnabled } from '@/lib/easypost';

// API to get real-time shipping rates from EasyPost with 50% markup
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toAddress, weight } = body;

    console.log('🚀 EasyPost Request received:', {
      to: toAddress,
      weight,
    });

    try {
      const easypost = getEasyPostClient();

      // Your business address (from)
      const fromAddress = {
        name: 'JungleeToys',
        street1: '483 Green Lanes',
        city: 'London',
        state: '',
        zip: 'N13 4BS',
        country: 'GB',
        phone: '+44 7342224136',
        email: 'grace@jungleetoys.com',
      };

      // Parcel details
      const parcel = {
        length: 15, // cm
        width: 10,
        height: 10,
        weight: parseFloat(weight || '0.5') * 1000, // Convert kg to grams for EasyPost
      };

      console.log('📦 Creating EasyPost shipment...');

      // Create shipment to get rates
      const shipment = await easypost.Shipment.create({
        to_address: {
          name: toAddress.name,
          street1: toAddress.street1,
          street2: toAddress.street2 || '',
          city: toAddress.city,
          state: toAddress.state || '',
          zip: toAddress.zip,
          country: toAddress.country,
          phone: toAddress.phone || '',
          email: toAddress.email,
        },
        from_address: fromAddress,
        parcel: parcel,
      });

      console.log(`✅ Shipment created: ${shipment.id}`);
      console.log(`📋 Received ${shipment.rates?.length || 0} rates`);

      const rates = shipment.rates || [];

      if (rates.length > 0) {
        const providers = rates.map((r: any) => r.carrier);
        console.log('🏷️ Available carriers:', Array.from(new Set(providers)));
      }

      // Filter for enabled UK carriers and apply 50% markup
      const markedUpRates = rates
        .filter((rate: any) => {
          // Check if carrier is enabled in configuration
          const enabled = isCarrierEnabled(rate.carrier);
          console.log(`🔍 ${rate.carrier} (${rate.service}): ${enabled ? '✅ ENABLED' : '❌ DISABLED'}`);
          return enabled;
        })
        .map((rate: any) => {
          const originalAmount = parseFloat(rate.rate);
          const markedUpAmount = (originalAmount * 1.5).toFixed(2); // 50% markup

          console.log(`💰 ${rate.carrier} ${rate.service}: £${rate.rate} → £${markedUpAmount}`);

          return {
            id: rate.id,
            provider: rate.carrier,
            serviceName: rate.service,
            amount: markedUpAmount,
            originalAmount: rate.rate,
            currency: rate.currency,
            estimatedDays: rate.delivery_days || '3-5',
            easypostRateId: rate.id, // Store for label purchase
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
            availableCarriers: Array.from(new Set(rates.map((r: any) => r.carrier))),
          },
        });
      }

      return NextResponse.json({ rates: markedUpRates });

    } catch (easypostError: any) {
      console.error('❌ EasyPost API Error:', easypostError);

      // Return fallback on EasyPost error
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
          error: 'EasyPost API error',
          message: easypostError.message,
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
