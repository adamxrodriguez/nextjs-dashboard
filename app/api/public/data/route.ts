import { NextResponse } from 'next/server';

/**
 * Public API route demonstrating edge caching with stale-while-revalidate
 * This endpoint is cached at the edge with revalidation
 */
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

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

export async function GET() {
  const data: PublicData = {
    timestamp: new Date().toISOString(),
    data: {
      title: 'Public Dashboard Stats',
      description: 'This data is cached at the edge and revalidated periodically',
      stats: {
        total: 1000,
        active: 750,
        pending: 250,
      },
    },
  };

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}

