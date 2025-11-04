import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { featureFlags, isFeatureEnabled } from '@/app/lib/utils';

describe('Feature Flags', () => {
  beforeEach(() => {
    // Reset environment variables before each test
    delete process.env.ENABLE_EXPERIMENTAL_DASHBOARD;
    delete process.env.ENABLE_ANALYTICS_PAGE;
    delete process.env.ENABLE_OBSERVABILITY_PAGE;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return false when feature flag is not set', () => {
    expect(isFeatureEnabled('enableObservabilityPage')).toBe(false);
  });

  it('should return true when feature flag is enabled', () => {
    process.env.ENABLE_OBSERVABILITY_PAGE = 'true';
    expect(isFeatureEnabled('enableObservabilityPage')).toBe(true);
  });

  it('should return false when feature flag is explicitly disabled', () => {
    process.env.ENABLE_OBSERVABILITY_PAGE = 'false';
    expect(isFeatureEnabled('enableObservabilityPage')).toBe(false);
  });

  it('should have all expected feature flags defined', () => {
    expect(featureFlags).toHaveProperty('enableExperimentalDashboard');
    expect(featureFlags).toHaveProperty('enableAnalyticsPage');
    expect(featureFlags).toHaveProperty('enableObservabilityPage');
  });
});

