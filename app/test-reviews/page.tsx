'use client';

import { useState, useEffect } from 'react';

export default function TestReviews() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch debug info on load
  useEffect(() => {
    fetch('/api/debug/reviews')
      .then((res) => res.json())
      .then((data) => setDebugInfo(data))
      .catch((err) => setDebugInfo({ error: err.message }));
  }, []);

  const testReviewSubmission = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      // Get a real product ID first
      const productsRes = await fetch('/api/products');
      const products = await productsRes.json();
      const firstProduct = products[0];

      if (!firstProduct) {
        setTestResult({ error: 'No products found in database' });
        setLoading(false);
        return;
      }

      // Try to submit a test review
      const reviewRes = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: firstProduct.id,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          rating: 5,
          comment: 'This is a test review',
        }),
      });

      const reviewData = await reviewRes.json();

      setTestResult({
        success: reviewRes.ok,
        status: reviewRes.status,
        productUsed: {
          id: firstProduct.id,
          name: firstProduct.name,
        },
        response: reviewData,
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message,
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Review System Diagnostics</h1>
          <p className="text-gray-600 mb-6">
            This page helps diagnose issues with the review submission system.
          </p>

          <div className="space-y-6">
            {/* Debug Info Section */}
            <div>
              <h2 className="text-lg font-semibold mb-3">System Status</h2>
              {!debugInfo ? (
                <p className="text-gray-500">Loading debug info...</p>
              ) : (
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              )}
            </div>

            {/* Test Button */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Test Review Submission</h2>
              <button
                onClick={testReviewSubmission}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? 'Testing...' : 'Run Test'}
              </button>
            </div>

            {/* Test Results */}
            {testResult && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Test Results</h2>
                <div
                  className={`p-4 rounded ${
                    testResult.success ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <p className="font-semibold mb-2">
                    {testResult.success ? '✅ Success!' : '❌ Failed'}
                  </p>
                  <pre className="bg-white p-3 rounded overflow-auto text-xs">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  <strong>Check Environment Variables:</strong> Ensure
                  SUPABASE_SERVICE_ROLE_KEY is set in Vercel
                </li>
                <li>
                  <strong>Verify Reviews Table:</strong> Run the SQL migration in
                  Supabase SQL Editor
                </li>
                <li>
                  <strong>Check Products Table:</strong> Ensure products exist and use
                  UUID IDs
                </li>
                <li>
                  <strong>Review Logs:</strong> Check Vercel function logs for detailed
                  errors
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
