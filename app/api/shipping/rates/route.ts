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

    if (!shipmentResponse.ok) {
      console.error('Shippo API error');
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

    const shipment = await shipmentResponse.json();
    const rates = shipment.rates || [];

    // Add 50% markup to all rates and format for customer
    const markedUpRates = rates
      .filter((rate: any) =>
        rate.provider === 'Royal Mail' ||
        rate.provider === 'DPD' ||
        rate.provider === 'Parcelforce'
      )
      .map((rate: any) => {
        const originalAmount = parseFloat(rate.amount);
        const markedUpAmount = (originalAmount * 1.5).toFixed(2); // Add 50% markup

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

    // If no rates available, use fallback
    if (markedUpRates.length === 0) {
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
