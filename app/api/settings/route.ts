import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

// GET /api/settings - Fetch store settings
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Settings API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/settings - Update store settings (admin only)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    // Update settings (there should only be one row)
    const { data, error } = await supabaseAdmin
      .from('store_settings')
      .update({
        store_name: body.store_name,
        support_email: body.support_email,
        phone: body.phone,
        address_line1: body.address_line1,
        address_line2: body.address_line2,
        city: body.city,
        postal_code: body.postal_code,
        country: body.country,
        currency: body.currency,
        free_shipping_threshold: body.free_shipping_threshold,
        tax_rate: body.tax_rate,
        facebook_url: body.facebook_url,
        instagram_url: body.instagram_url,
        twitter_url: body.twitter_url,
        about_text: body.about_text,
        updated_at: new Date().toISOString(),
      })
      .eq('id', '00000000-0000-0000-0000-000000000001')
      .select()
      .single();

    if (error) {
      console.error('Error updating settings:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
