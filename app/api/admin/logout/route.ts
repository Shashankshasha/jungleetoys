import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// POST /api/admin/logout - Admin logout
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the admin token cookie
  response.cookies.delete('admin-token');

  return response;
}
