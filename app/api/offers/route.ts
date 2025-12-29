import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/auth';

export const runtime = 'nodejs';

// GET /api/offers - Fetch all offers (admin only)
export async function GET(req: NextRequest) {
  // Require admin authentication
  const authResult = await requireAdminAuth(req);
  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('product_offers')
      .select(`
        *,
        products (
          id,
          name,
          slug,
          price,
          images
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by status if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching offers:', error);
      return NextResponse.json(
        { error: 'Failed to fetch offers' },
        { status: 500 }
      );
    }

    return NextResponse.json({ offers: data });
  } catch (error) {
    console.error('Offers API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/offers - Submit a new offer (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ['product_id', 'customer_name', 'customer_email', 'offer_amount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customer_email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate offer amount is positive
    if (body.offer_amount <= 0) {
      return NextResponse.json(
        { error: 'Offer amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Create offer
    const { data, error } = await supabase.from('product_offers').insert({
      product_id: body.product_id,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone || null,
      offer_amount: body.offer_amount,
      message: body.message || null,
      status: 'pending',
    }).select().single();

    if (error) {
      console.error('Error creating offer:', error);
      return NextResponse.json(
        { error: 'Failed to submit offer' },
        { status: 500 }
      );
    }

    return NextResponse.json({ offer: data }, { status: 201 });
  } catch (error) {
    console.error('Submit offer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/offers - Update offer status (admin only)
export async function PATCH(req: NextRequest) {
  // Require admin authentication
  const authResult = await requireAdminAuth(req);
  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const body = await req.json();
    const { id, status, admin_notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Offer ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status;
    }

    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes;
    }

    const { data, error } = await supabaseAdmin
      .from('product_offers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating offer:', error);
      return NextResponse.json(
        { error: 'Failed to update offer' },
        { status: 500 }
      );
    }

    return NextResponse.json({ offer: data });
  } catch (error) {
    console.error('Update offer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/offers - Delete an offer (admin only)
export async function DELETE(req: NextRequest) {
  // Require admin authentication
  const authResult = await requireAdminAuth(req);
  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Offer ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('product_offers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting offer:', error);
      return NextResponse.json(
        { error: 'Failed to delete offer' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete offer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
