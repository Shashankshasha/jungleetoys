import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export interface AdminPayload {
  adminId: string;
  email: string;
  name: string;
}

/**
 * Verify admin authentication from request cookies
 * Returns admin payload if authenticated, null otherwise
 */
export async function verifyAdminAuth(
  req: NextRequest
): Promise<AdminPayload | null> {
  try {
    const token = req.cookies.get('admin-token')?.value;

    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key-change-this'
    );

    const { payload } = await jwtVerify(token, secret);

    return {
      adminId: payload.adminId as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

/**
 * Middleware to require admin authentication
 * Returns 401 if not authenticated, otherwise returns admin payload
 */
export async function requireAdminAuth(
  req: NextRequest
): Promise<{ admin: AdminPayload } | Response> {
  const admin = await verifyAdminAuth(req);

  if (!admin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return { admin };
}
