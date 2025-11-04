import React from 'react';

export default function Loading() {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-8 h-9 w-48 rounded bg-gray-200"></div>
      
      <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
        <div className="h-6 w-full rounded bg-green-100"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-6">
            <div className="h-6 w-32 rounded bg-gray-200 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-100"></div>
              <div className="h-4 w-full rounded bg-gray-100"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

