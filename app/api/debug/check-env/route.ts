import { NextResponse } from 'next/server';

// Simple diagnostic endpoint to check if EASYPOST_API_KEY is loaded
export async function GET() {
  const apiKey = process.env.EASYPOST_API_KEY;

  return NextResponse.json({
    easypostKeyExists: !!apiKey,
    easypostKeyLength: apiKey ? apiKey.length : 0,
    easypostKeyPrefix: apiKey ? apiKey.substring(0, 6) + '...' : 'NOT SET',
    allEnvKeys: Object.keys(process.env).filter(key =>
      key.includes('EASYPOST') ||
      key.includes('SHIPPO') ||
      key.includes('STRIPE')
    ),
  });
}
