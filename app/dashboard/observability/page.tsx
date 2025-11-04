'use client';

import React, { useEffect, useState } from 'react';

interface Metric {
  name: string;
  value: number | string;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

interface WebVitalMetrics {
  [key: string]: number;
}

export default function ObservabilityPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import reportWebVitals only on client side
    import('next/web-vitals').then(({ onCLS, onFCP, onFID, onINP, onLCP, onTTFB }) => {
      const collectedMetrics: WebVitalMetrics = {};

      onCLS((metric) => {
        collectedMetrics.CLS = metric.value;
        updateMetrics();
      });

      onFCP((metric) => {
        collectedMetrics.FCP = metric.value;
        updateMetrics();
      });

      onFID((metric) => {
        collectedMetrics.FID = metric.value;
        updateMetrics();
      });

      onINP((metric) => {
        collectedMetrics.INP = metric.value;
        updateMetrics();
      });

      onLCP((metric) => {
        collectedMetrics.LCP = metric.value;
        updateMetrics();
      });

      onTTFB((metric) => {
        collectedMetrics.TTFB = metric.value;
        updateMetrics();
      });

      function updateMetrics() {
        const formattedMetrics: Metric[] = [
          {
            name: 'First Contentful Paint (FCP)',
            value: collectedMetrics.FCP 
              ? `${(collectedMetrics.FCP / 1000).toFixed(2)}s` 
              : 'Collecting...',
            rating: getRating('FCP', collectedMetrics.FCP),
            delta: collectedMetrics.FCP,
          },
          {
            name: 'Largest Contentful Paint (LCP)',
            value: collectedMetrics.LCP 
              ? `${(collectedMetrics.LCP / 1000).toFixed(2)}s` 
              : 'Collecting...',
            rating: getRating('LCP', collectedMetrics.LCP),
            delta: collectedMetrics.LCP,
          },
          {
            name: 'First Input Delay (FID)',
            value: collectedMetrics.FID 
              ? `${collectedMetrics.FID.toFixed(0)}ms` 
              : 'Collecting...',
            rating: getRating('FID', collectedMetrics.FID),
            delta: collectedMetrics.FID,
          },
          {
            name: 'Interaction to Next Paint (INP)',
            value: collectedMetrics.INP 
              ? `${collectedMetrics.INP.toFixed(0)}ms` 
              : 'Collecting...',
            rating: getRating('INP', collectedMetrics.INP),
            delta: collectedMetrics.INP,
          },
          {
            name: 'Cumulative Layout Shift (CLS)',
            value: collectedMetrics.CLS 
              ? collectedMetrics.CLS.toFixed(3) 
              : 'Collecting...',
            rating: getRating('CLS', collectedMetrics.CLS),
            delta: collectedMetrics.CLS,
          },
          {
            name: 'Time to First Byte (TTFB)',
            value: collectedMetrics.TTFB 
              ? `${(collectedMetrics.TTFB / 1000).toFixed(2)}s` 
              : 'Collecting...',
            rating: getRating('TTFB', collectedMetrics.TTFB),
            delta: collectedMetrics.TTFB,
          },
        ];
        setMetrics(formattedMetrics);
      }
    });
  }, []);

  function getRating(metricName: string, value?: number): 'good' | 'needs-improvement' | 'poor' {
    if (value === undefined) return 'good';
    
    const thresholds: { [key: string]: { good: number; needsImprovement: number } } = {
      FCP: { good: 1800, needsImprovement: 3000 },
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      INP: { good: 200, needsImprovement: 500 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      TTFB: { good: 800, needsImprovement: 1800 },
    };

    const threshold = thresholds[metricName];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  function getRatingColor(rating: string) {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }

  function getRatingBadgeColor(rating: string) {
    switch (rating) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading observability metrics...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="mb-8 text-3xl font-bold">Web Vitals Observability</h1>
      
      <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm text-blue-800">
          This page displays real-time Core Web Vitals metrics using next/web-vitals.
          Navigate around the dashboard to see metrics update.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`rounded-lg border p-6 ${getRatingColor(metric.rating)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{metric.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRatingBadgeColor(metric.rating)}`}>
                {metric.rating.replace('-', ' ')}
              </span>
            </div>
            <div className="text-3xl font-bold">{metric.value}</div>
            {metric.delta && (
              <div className="mt-2 text-sm opacity-75">
                Raw value: {metric.delta.toFixed(2)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Understanding Web Vitals</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <strong>FCP (First Contentful Paint):</strong> Measures loading performance
          </li>
          <li>
            <strong>LCP (Largest Contentful Paint):</strong> Measures loading performance
          </li>
          <li>
            <strong>FID (First Input Delay):</strong> Measures interactivity
          </li>
          <li>
            <strong>INP (Interaction to Next Paint):</strong> Measures responsiveness
          </li>
          <li>
            <strong>CLS (Cumulative Layout Shift):</strong> Measures visual stability
          </li>
          <li>
            <strong>TTFB (Time to First Byte):</strong> Measures server response time
          </li>
        </ul>
      </div>
    </div>
  );
}

