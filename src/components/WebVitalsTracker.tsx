// src/components/WebVitalsTracker.tsx
import { useEffect } from 'react';
import { api } from '@/lib/api';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  timestamp: number;
}

const WebVitalsTracker = () => {
  useEffect(() => {
    // Function to send web vitals to API
    const sendWebVitals = async (metric: WebVitalsMetric) => {
      try {
        await api.analytics.postWebVitals({
          id: metric.id,
          name: metric.name,
          value: metric.value,
          delta: metric.delta,
          url: window.location.href,
          timestamp: metric.timestamp
        });
      } catch (error) {
        console.error('Failed to send web vitals:', error);
      }
    };

    // Import and use web-vitals library
    const importWebVitals = async () => {
      try {
        const webVitals = await import('web-vitals');
        
        // Track Core Web Vitals
        webVitals.getCLS(sendWebVitals);
        webVitals.getFID(sendWebVitals);
        webVitals.getFCP(sendWebVitals);
        webVitals.getLCP(sendWebVitals);
        webVitals.getTTFB(sendWebVitals);
        webVitals.getINP(sendWebVitals);
        
        console.log('Web Vitals tracking initialized');
      } catch (error) {
        console.error('Failed to load web-vitals library:', error);
      }
    };

    // Initialize web vitals tracking
    importWebVitals();

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Track when page becomes visible
        const metric: WebVitalsMetric = {
          id: `page-visible-${Date.now()}`,
          name: 'PAGE_VISIBLE',
          value: 1,
          delta: 0,
          timestamp: Date.now()
        };
        sendWebVitals(metric);
      }
    };

    // Track route changes (for SPA)
    const handleRouteChange = () => {
      const metric: WebVitalsMetric = {
        id: `route-change-${Date.now()}`,
        name: 'ROUTE_CHANGE',
        value: 1,
        delta: 0,
        timestamp: Date.now()
      };
      sendWebVitals(metric);
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitalsTracker;
