import { NextRequest, NextResponse } from 'next/server';

// Shippo API integration for generating shipping labels
// Supports Royal Mail, DPD, Hermes, Parcelforce for UK shipping

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = req.headers.get('cookie');
    if (!authHeader?.includes('admin-token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, shippingAddress, items, weight } = body;

    const shippoApiKey = process.env.SHIPPO_API_KEY;
    if (!shippoApiKey) {
      return NextResponse.json(
        { error: 'Shippo API key not configured. Please add SHIPPO_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

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

    // Customer address (to)
    const toAddress = {
      name: shippingAddress.name || 'Customer',
      street1: shippingAddress.line1,
      street2: shippingAddress.line2 || '',
      city: shippingAddress.city,
      state: shippingAddress.state || '',
      zip: shippingAddress.postal_code,
      country: shippingAddress.country || 'GB',
      phone: shippingAddress.phone || '',
      email: shippingAddress.email || '',
    };

    // Parcel details
    const parcel = {
      length: '15', // cm
      width: '10',  // cm
      height: '10', // cm
      distance_unit: 'cm',
      weight: weight || '0.5', // kg
      mass_unit: 'kg',
    };

    // Step 1: Create shipment
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
        async: false, // Get rates immediately
      }),
    });

    if (!shipmentResponse.ok) {
      const error = await shipmentResponse.json();
      console.error('Shippo shipment error:', error);
      return NextResponse.json(
        { error: 'Failed to create shipment', details: error },
        { status: 500 }
      );
    }

    const shipment = await shipmentResponse.json();

    // Step 2: Get available rates
    const rates = shipment.rates || [];

    if (rates.length === 0) {
      return NextResponse.json(
        { error: 'No shipping rates available for this address' },
        { status: 400 }
      );
    }

    // Find cheapest or recommended rate
    // You can filter by carrier (Royal Mail, DPD, etc.)
    const selectedRate = rates.find((rate: any) =>
      rate.provider === 'Royal Mail' ||
      rate.provider === 'DPD' ||
      rate.provider === 'Parcelforce'
    ) || rates[0]; // Fallback to cheapest rate

    // Step 3: Purchase shipping label
    const transactionResponse = await fetch('https://api.goshippo.com/transactions/', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${shippoApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rate: selectedRate.object_id,
        label_file_type: 'PDF',
        async: false,
      }),
    });

    if (!transactionResponse.ok) {
      const error = await transactionResponse.json();
      console.error('Shippo transaction error:', error);
      return NextResponse.json(
        { error: 'Failed to purchase shipping label', details: error },
        { status: 500 }
      );
    }

    const transaction = await transactionResponse.json();

    if (transaction.status !== 'SUCCESS') {
      return NextResponse.json(
        { error: 'Label purchase failed', details: transaction.messages },
        { status: 500 }
      );
    }

    // Return label details
    return NextResponse.json({
      success: true,
      labelUrl: transaction.label_url, // PDF label to print
      trackingNumber: transaction.tracking_number,
      trackingUrl: transaction.tracking_url_provider,
      carrier: selectedRate.provider,
      serviceName: selectedRate.servicelevel.name,
      cost: selectedRate.amount,
      currency: selectedRate.currency,
      estimatedDays: selectedRate.estimated_days,
    });
  } catch (error) {
    console.error('Shipping label API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
