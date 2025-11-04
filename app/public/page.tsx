import React from 'react';

interface PublicData {
  timestamp: string;
  data: {
    title: string;
    description: string;
    stats: {
      total: number;
      active: number;
      pending: number;
    };
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getPublicData(): Promise<PublicData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/public/data`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch public data');
  }

  return res.json();
}

export default async function PublicPage() {
  const { timestamp, data } = await getPublicData();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{data.title}</h1>
          <p className="text-blue-700">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total</h3>
            <p className="text-4xl font-bold text-gray-900">{data.stats.total.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active</h3>
            <p className="text-4xl font-bold text-green-600">{data.stats.active.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
            <p className="text-4xl font-bold text-yellow-600">{data.stats.pending.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            Last updated: {new Date(timestamp).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This page uses edge caching with stale-while-revalidate strategy
          </p>
        </div>
      </div>
    </div>
  );
}

