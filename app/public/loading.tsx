import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-4xl w-full space-y-8 animate-pulse">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="h-8 w-64 rounded bg-blue-100 mb-2"></div>
          <div className="h-6 w-full rounded bg-blue-100"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-5 w-24 rounded bg-gray-200 mb-2"></div>
              <div className="h-10 w-32 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="h-5 w-48 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

