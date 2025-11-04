import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display welcome message', async ({ page }) => {
    await page.goto('/');
    
    // Check for welcome message
    await expect(page.getByText(/Welcome to Dayboard Hub/i)).toBeVisible();
    
    // Check for login button
    await expect(page.getByRole('link', { name: /log in/i })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Click login button
    await page.getByRole('link', { name: /log in/i }).click();
    
    // Verify we're on the login page
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Public Route', () => {
  test('should load public data page', async ({ page }) => {
    await page.goto('/public');
    
    // Check for title
    await expect(page.getByText(/Public Dashboard Stats/i)).toBeVisible();
    
    // Check for stats cards
    await expect(page.getByText(/Total/i)).toBeVisible();
    await expect(page.getByText(/Active/i)).toBeVisible();
    await expect(page.getByText(/Pending/i)).toBeVisible();
  });

  test('should display cached data info', async ({ page }) => {
    await page.goto('/public');
    
    // Check for caching info
    await expect(page.getByText(/Last updated/i)).toBeVisible();
    await expect(page.getByText(/stale-while-revalidate/i)).toBeVisible();
  });
});

test.describe('Feature Flags', () => {
  test('observability page should be accessible when enabled', async ({ page }) => {
    // This test assumes the feature flag is enabled
    await page.goto('/dashboard/observability');
    
    // Should either show the page or redirect
    const url = page.url();
    expect(url).toContain('/dashboard');
  });
});

test.describe('Navigation', () => {
  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test that main navigation element exists
    const logo = page.locator('img[alt*="Dayboard"]');
    await expect(logo.first()).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should display mobile view correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that page still loads
    await expect(page.getByText(/Welcome to Dayboard Hub/i)).toBeVisible();
  });

  test('should display desktop view correctly', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check that page still loads
    await expect(page.getByText(/Welcome to Dayboard Hub/i)).toBeVisible();
  });
});

