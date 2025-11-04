'use client';

import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Public page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Something went wrong</h2>
        <p className="text-gray-600">Failed to load public data.</p>
        <div className="flex gap-4 justify-center mt-6">
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            onClick={() => reset()}
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-300"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

