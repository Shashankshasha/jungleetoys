import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shippoApiKey = process.env.SHIPPO_API_KEY;

  if (!shippoApiKey) {
    return NextResponse.json({ error: 'SHIPPO_API_KEY not configured' }, { status: 500 });
  }

  // Test address in UK
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

  const toAddress = {
    name: 'Test Customer',
    street1: '142 midland road',
    city: 'crawley',
    state: '',
    zip: 'lu2 0gh',
    country: 'GB',
    phone: '+44 7123456789',
    email: 'test@example.com',
  };

  const parcel = {
    length: '15',
    width: '10',
    height: '10',
    distance_unit: 'cm',
    weight: '0.5',
    mass_unit: 'kg',
  };

  try {
    const response = await fetch('https://api.goshippo.com/shipments/', {
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

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        error: 'Shippo API error',
        status: response.status,
        details: data,
      }, { status: 500 });
    }

    // Extract just the important rate info
    const ratesSummary = (data.rates || []).map((rate: any) => ({
      provider: rate.provider,
      serviceName: rate.servicelevel?.name,
      amount: rate.amount,
      currency: rate.currency,
      estimatedDays: rate.estimated_days,
    }));

    return NextResponse.json({
      success: true,
      totalRates: data.rates?.length || 0,
      providers: (data.rates || []).map((r: any) => r.provider),
      ratesSummary,
      fullResponse: data,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch Shippo rates',
      message: error.message,
    }, { status: 500 });
  }
}
