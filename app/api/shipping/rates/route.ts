import { NextRequest, NextResponse } from 'next/server';

// API to get real-time shipping rates from Shippo with 50% markup
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toAddress, weight } = body;

    const shippoApiKey = process.env.SHIPPO_API_KEY;

    if (!shippoApiKey) {
      // Fallback to flat rate if Shippo not configured
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

    // Your business address
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
      length: '15', // cm
      width: '10',
      height: '10',
      distance_unit: 'cm',
      weight: weight || '0.5', // kg
      mass_unit: 'kg',
    };

    // Log request details
    console.log('🚀 Shippo Request:', {
      from: fromAddress,
      to: toAddress,
      parcel,
    });

    // Create shipment to get rates
    const shipmentResponse = await fetch('https://api.goshippo.com/shipments/', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${shippoApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address_from: fromAddress,
        address_to: toAddress,
        parcels: [parcel],
        async: false,
      }),
    });

    console.log('📦 Shippo Response Status:', shipmentResponse.status);

    if (!shipmentResponse.ok) {
      const errorText = await shipmentResponse.text();
      console.error('❌ Shippo API error:', {
        status: shipmentResponse.status,
        error: errorText,
      });
      // Fallback to flat rate
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
          error: 'Shippo API returned error',
          status: shipmentResponse.status,
          details: errorText,
        },
      });
    }

    const shipment = await shipmentResponse.json();
    console.log('📊 Shippo Full Response:', JSON.stringify(shipment, null, 2));

    const rates = shipment.rates || [];
    console.log('📋 Available rates count:', rates.length);

    if (rates.length > 0) {
      console.log('🏷️ All available providers:', rates.map((r: any) => r.provider));
    }

    // Add 50% markup to all rates and format for customer
    const markedUpRates = rates
      .filter((rate: any) => {
        // Filter for UK carriers only (DPD UK and Evri UK)
        const isValid = rate.provider === 'DPD UK' ||
                       rate.provider === 'Evri' ||
                       rate.provider === 'Evri UK';
        console.log(`🔍 Checking rate: ${rate.provider} - ${isValid ? '✅ MATCH' : '❌ FILTERED OUT'}`);
        return isValid;
      })
      .map((rate: any) => {
        const originalAmount = parseFloat(rate.amount);
        const markedUpAmount = (originalAmount * 1.5).toFixed(2); // Add 50% markup

        console.log(`💰 Marking up rate: ${rate.provider} ${rate.servicelevel?.name} - £${rate.amount} → £${markedUpAmount}`);

        return {
          id: rate.object_id,
          provider: rate.provider,
          serviceName: rate.servicelevel.name,
          amount: markedUpAmount,
          originalAmount: rate.amount, // Store original for label purchase
          currency: rate.currency?.toUpperCase() || 'GBP',
          estimatedDays: rate.estimated_days || '3-5',
        };
      })
      .sort((a: any, b: any) => parseFloat(a.amount) - parseFloat(b.amount)); // Sort by price

    console.log(`✅ Final marked up rates count: ${markedUpRates.length}`);

    // If no rates available, use fallback
    if (markedUpRates.length === 0) {
      console.log('⚠️ No matching rates found, using fallback');
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
          message: 'No DPD UK or Evri UK rates available',
          availableProviders: rates.map((r: any) => r.provider),
          totalRatesReceived: rates.length,
        },
      });
    }

    console.log('🎉 Returning marked up rates:', markedUpRates);
    return NextResponse.json({ rates: markedUpRates });
  } catch (error) {
    console.error('Shipping rates API error:', error);
    // Fallback to flat rate
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
}
