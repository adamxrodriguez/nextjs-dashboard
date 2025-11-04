import { test, expect } from '@playwright/test';

test.describe('Public API Route', () => {
  test('should fetch public data', async ({ request }) => {
    const response = await request.get('/api/public/data');
    
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('title');
    expect(data.data).toHaveProperty('stats');
    expect(data.data.stats).toHaveProperty('total');
    expect(data.data.stats).toHaveProperty('active');
    expect(data.data.stats).toHaveProperty('pending');
  });

  test('should have cache headers', async ({ request }) => {
    const response = await request.get('/api/public/data');
    
    const cacheControl = response.headers()['cache-control'];
    expect(cacheControl).toContain('public');
    expect(cacheControl).toContain('s-maxage');
    expect(cacheControl).toContain('stale-while-revalidate');
  });

  test('should return valid timestamp', async ({ request }) => {
    const response = await request.get('/api/public/data');
    const data = await response.json();
    
    const timestamp = new Date(data.timestamp);
    expect(timestamp.getTime()).toBeGreaterThan(0);
    expect(timestamp).toBeInstanceOf(Date);
  });
});

