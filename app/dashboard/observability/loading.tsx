import React from 'react';

export default function Loading() {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-8 h-9 w-64 rounded bg-gray-200"></div>
      
      <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <div className="h-6 w-full rounded bg-blue-100"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 w-40 rounded bg-gray-200"></div>
              <div className="h-6 w-24 rounded bg-gray-200"></div>
            </div>
            <div className="h-10 w-32 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

