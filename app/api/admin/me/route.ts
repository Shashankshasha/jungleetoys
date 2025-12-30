import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/admin/me - Get current admin user
export async function GET(req: NextRequest) {
  const admin = await verifyAdminAuth(req);

  if (!admin) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  return NextResponse.json({ admin });
}
