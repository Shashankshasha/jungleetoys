import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Verify admin authentication
async function verifyAdmin() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin-token'); // Fixed: match the cookie name set by login

  if (!adminToken) {
    return false;
  }

  // JWT token verification would go here, but for now just check if cookie exists
  return true;
}

// GET /api/admin/reviews - Get all reviews (for admin)
export async function GET(req: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') || 'all'; // all, pending, approved

    // Query reviews - try without product join first to debug
    let query = supabaseAdmin
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter === 'pending') {
      query = query.eq('approved', false);
    } else if (filter === 'approved') {
      query = query.eq('approved', true);
    }

    const { data: reviews, error } = await query;

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews', details: error.message },
        { status: 500 }
      );
    }

    console.log(`✅ Fetched ${reviews?.length || 0} reviews with filter: ${filter}`);
    return NextResponse.json({ reviews: reviews || [], count: reviews?.length || 0 });
  } catch (error: any) {
    console.error('Admin reviews GET error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/reviews - Approve or reject a review
export async function PATCH(req: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, approved } = body;

    if (!id || typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: 'Review ID and approved status are required' },
        { status: 400 }
      );
    }

    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .update({ approved })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating review:', error);
      return NextResponse.json(
        { error: 'Failed to update review' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: approved ? 'Review approved' : 'Review rejected',
      review,
    });
  } catch (error: any) {
    console.error('Admin reviews PATCH error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/reviews?id=xxx - Delete a review
export async function DELETE(req: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from('reviews').delete().eq('id', id);

    if (error) {
      console.error('Error deleting review:', error);
      return NextResponse.json(
        { error: 'Failed to delete review' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error: any) {
    console.error('Admin reviews DELETE error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete review' },
      { status: 500 }
    );
  }
}
