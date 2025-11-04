'use client';

import React from 'react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Observability error:', error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-2xl font-semibold">Observability Error</h2>
      <p className="mt-2 text-gray-600">Failed to load web vitals metrics.</p>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}

