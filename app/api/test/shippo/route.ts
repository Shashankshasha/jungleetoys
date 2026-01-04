import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const shippoKey = process.env.SHIPPO_API_KEY;

    if (!shippoKey) {
      return NextResponse.json({
        success: false,
        error: 'SHIPPO_API_KEY not found in environment',
        allEnvKeys: Object.keys(process.env).filter(k => k.includes('SHIPPO')),
      });
    }

    // Try to make a simple API call to Shippo
    const response = await fetch('https://api.goshippo.com/carrier_accounts/', {
      headers: {
        'Authorization': `ShippoToken ${shippoKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: response.ok,
      keyExists: true,
      keyLength: shippoKey.length,
      keyPrefix: shippoKey.substring(0, 11),
      apiWorks: response.ok,
      apiStatus: response.status,
      carrierAccounts: data.results?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      keyExists: !!process.env.SHIPPO_API_KEY,
    }, { status: 500 });
  }
}
