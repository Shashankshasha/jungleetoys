import { NextResponse } from 'next/server';
import { getEasyPostClient, getEnabledCarriers } from '@/lib/easypost';

export async function GET() {
  try {
    const apiKey = process.env.EASYPOST_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'EASYPOST_API_KEY not configured',
      });
    }

    console.log('🔑 EasyPost API Key found');

    const easypost = getEasyPostClient();

    // Test addresses
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
      length: 15,
      width: 10,
      height: 10,
      weight: 500, // 500 grams
    };

    console.log('📦 Creating test shipment...');

    const shipment = await easypost.Shipment.create({
      to_address: toAddress,
      from_address: fromAddress,
      parcel: parcel,
    });

    const rates = shipment.rates || [];
    const carriers = Array.from(new Set(rates.map((r: any) => r.carrier)));

    console.log(`✅ Received ${rates.length} rates from ${carriers.length} carriers`);

    return NextResponse.json({
      success: true,
      keyExists: true,
      keyLength: apiKey.length,
      keyPrefix: apiKey.substring(0, 7),
      shipmentId: shipment.id,
      totalRates: rates.length,
      carriers: carriers,
      enabledCarriers: getEnabledCarriers().map(c => c.name),
      sampleRates: rates.slice(0, 5).map((r: any) => ({
        carrier: r.carrier,
        service: r.service,
        rate: r.rate,
        currency: r.currency,
        deliveryDays: r.delivery_days,
      })),
      allRates: rates.map((r: any) => ({
        carrier: r.carrier,
        service: r.service,
        rate: r.rate,
        currency: r.currency,
      })),
    });

  } catch (error: any) {
    console.error('❌ EasyPost test error:', error);

    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.details || error.stack,
    }, { status: 500 });
  }
}
