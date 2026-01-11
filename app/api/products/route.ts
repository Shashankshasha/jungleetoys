import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/auth';

// Force dynamic rendering - don't pre-render this route during build
export const dynamic = 'force-dynamic';

// GET /api/products - Fetch all products with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const isNew = searchParams.get('new');
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = (supabase as any)
      .from('products')
      .select('*', { count: 'exact' });

    // Apply filters
    if (category) {
      query = query.eq('category_id', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (isNew === 'true') {
      query = query.eq('is_new', true);
    }

    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    // Fetch review statistics for all products
    const productIds = data?.map((p: any) => p.id) || [];
    let productsWithReviews = data || [];

    if (productIds.length > 0) {
      // Get approved reviews grouped by product
      const { data: reviews } = await supabase
        .from('reviews')
        .select('product_id, rating')
        .eq('approved', true)
        .in('product_id', productIds);

      // Calculate review stats for each product
      const reviewStats = (reviews || []).reduce((acc: any, review: any) => {
        if (!acc[review.product_id]) {
          acc[review.product_id] = { total: 0, sum: 0 };
        }
        acc[review.product_id].total += 1;
        acc[review.product_id].sum += review.rating;
        return acc;
      }, {});

      // Add review data to products
      productsWithReviews = data.map((product: any) => {
        const stats = reviewStats[product.id] || { total: 0, sum: 0 };
        return {
          ...product,
          review_count: stats.total,
          average_rating: stats.total > 0 ? Math.round((stats.sum / stats.total) * 10) / 10 : 0,
        };
      });
    }

    return NextResponse.json({
      products: productsWithReviews,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/products - Create a new product (admin only)
export async function POST(req: NextRequest) {
  // Require admin authentication
  const authResult = await requireAdminAuth(req);
  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ['name', 'slug', 'price', 'category_id'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create product
    const { data, error } = await (supabaseAdmin as any).from('products').insert({
      name: body.name,
      slug: body.slug,
      description: body.description || '',
      price: body.price,
      compare_price: body.compare_price || null,
      category_id: body.category_id,
      images: body.images || [],
      stock: body.stock || 0,
      featured: body.featured || false,
      is_new: body.is_new || true,
      age_range: body.age_range || null,
      brand: body.brand || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).select().single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/products - Update a product (admin only)
export async function PUT(req: NextRequest) {
  // Require admin authentication
  const authResult = await requireAdminAuth(req);
  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Update product
    const { data, error } = await (supabaseAdmin as any)
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/products - Delete a product (admin only)
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
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const { error } = await (supabaseAdmin as any)
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
