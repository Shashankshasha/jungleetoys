'use client';

import { useState } from 'react';

export default function TestUploadPage() {
  const [result, setResult] = useState('');
  const [testing, setTesting] = useState(false);

  const testUpload = async () => {
    setTesting(true);
    setResult('Testing...');

    try {
      // Create a small test image
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('TEST', 25, 55);
      }

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png');
      });

      const file = new File([blob], 'test.png', { type: 'image/png' });
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ SUCCESS!\n\nImage uploaded to:\n${data.url}\n\nYour storage is working correctly!`);
      } else {
        setResult(`❌ UPLOAD FAILED\n\nError: ${data.error}\n\nStatus: ${response.status}\n\nThis means:\n${getErrorExplanation(response.status, data.error)}`);
      }
    } catch (error) {
      setResult(`❌ ERROR\n\n${error}\n\nCheck browser console for details.`);
    } finally {
      setTesting(false);
    }
  };

  const getErrorExplanation = (status: number, error: string) => {
    if (status === 403 || error?.includes('new row violates row-level security')) {
      return `
→ Storage bucket policies are not set correctly
→ Go to Supabase Dashboard → Storage → product-images → Policies
→ Add INSERT, SELECT, and DELETE policies (see SUPABASE_STORAGE_SETUP.md)
      `;
    }
    if (error?.includes('Bucket not found') || error?.includes('product-images')) {
      return `
→ Storage bucket 'product-images' does not exist
→ Go to Supabase Dashboard → Storage → New Bucket
→ Name: product-images, Public: ON
      `;
    }
    if (status === 500) {
      return `
→ Server error - check Supabase service role key is set in Vercel
→ Go to Vercel → Your Project → Settings → Environment Variables
→ Verify SUPABASE_SERVICE_ROLE_KEY exists
      `;
    }
    return 'Unknown error - check browser console';
  };

  const testStorageConnection = async () => {
    setTesting(true);
    setResult('Checking Supabase connection...');

    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase.storage.listBuckets();

      if (error) {
        setResult(`❌ Connection Failed\n\n${error.message}`);
      } else {
        const bucketNames = data.map((b) => b.name).join(', ');
        const hasProductImages = data.some((b) => b.name === 'product-images');

        setResult(`✅ Connected to Supabase!\n\nBuckets found: ${bucketNames}\n\n${
          hasProductImages
            ? '✅ product-images bucket EXISTS'
            : '❌ product-images bucket NOT FOUND\n→ Create it in Supabase Dashboard'
        }`);
      }
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">🧪 Storage Upload Test</h1>
          <p className="text-gray-600 mb-8">
            Use this page to test if your Supabase storage is configured correctly
          </p>

          <div className="space-y-4 mb-8">
            <button
              onClick={testStorageConnection}
              disabled={testing}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
            >
              {testing ? '⏳ Testing...' : '1️⃣ Test Supabase Connection'}
            </button>

            <button
              onClick={testUpload}
              disabled={testing}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
            >
              {testing ? '⏳ Testing...' : '2️⃣ Test Image Upload'}
            </button>
          </div>

          {result && (
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap">
              {result}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">📖 Instructions</h3>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Click "Test Supabase Connection" to verify your Supabase is reachable</li>
              <li>Click "Test Image Upload" to test uploading to storage</li>
              <li>If you see errors, follow the instructions in the error message</li>
              <li>See SUPABASE_STORAGE_SETUP.md for detailed setup instructions</li>
            </ol>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/admin"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
