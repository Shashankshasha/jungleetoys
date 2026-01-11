import { NextRequest, NextResponse } from 'next/server';
import { AVAILABLE_CARRIERS, getEnabledCarriers } from '@/lib/easypost';

// GET - Get carrier configuration
export async function GET(req: NextRequest) {
  try {
    const carriers = Object.entries(AVAILABLE_CARRIERS).map(([key, config]) => ({
      id: key,
      name: config.name,
      enabled: config.enabled,
      priority: config.priority,
    }));

    return NextResponse.json({
      success: true,
      carriers,
      enabledCarriers: getEnabledCarriers(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Update carrier configuration (for future dynamic toggling)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { carrierId, enabled } = body;

    // For now, carrier configuration is in code
    // In the future, this could be stored in database/settings

    return NextResponse.json({
      success: true,
      message: 'Carrier configuration updated (requires code deployment)',
      note: 'To enable/disable carriers, update AVAILABLE_CARRIERS in lib/easypost.ts',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
