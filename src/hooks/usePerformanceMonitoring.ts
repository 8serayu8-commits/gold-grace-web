import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  TTFB: number; // Time to First Byte
}

interface WebVitalsData {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
  name: string;
}

declare global {
  interface Window {
    webVitals?: {
      getCLS: (callback: (metric: any) => void) => void;
      getFID: (callback: (metric: any) => void) => void;
      getFCP: (callback: (metric: any) => void) => void;
      getLCP: (callback: (metric: any) => void) => void;
      getTTFB: (callback: (metric: any) => void) => void;
    };
  }
}

const usePerformanceMonitoring = () => {
  const metricsRef = useRef<Partial<PerformanceMetrics>>({});
  const observersRef = useRef<Set<PerformanceObserver>>(new Set());

  // Load Web Vitals library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
    script.async = true;
    script.onload = () => {
      initializeWebVitals();
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup observers
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current.clear();
    };
  }, []);

  const initializeWebVitals = () => {
    if (!window.webVitals) return;

    // Track Core Web Vitals
    window.webVitals.getCLS((metric) => {
      metricsRef.current.CLS = metric.value;
      sendMetricToAnalytics('CLS', metric);
    });

    window.webVitals.getFID((metric) => {
      metricsRef.current.FID = metric.value;
      sendMetricToAnalytics('FID', metric);
    });

    window.webVitals.getFCP((metric) => {
      metricsRef.current.FCP = metric.value;
      sendMetricToAnalytics('FCP', metric);
    });

    window.webVitals.getLCP((metric) => {
      metricsRef.current.LCP = metric.value;
      sendMetricToAnalytics('LCP', metric);
    });

    window.webVitals.getTTFB((metric) => {
      metricsRef.current.TTFB = metric.value;
      sendMetricToAnalytics('TTFB', metric);
    });
  };

  const sendMetricToAnalytics = (metricName: string, metric: WebVitalsData) => {
    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', metricName, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
        custom_parameter_1: metric.rating,
      });
    }

    // Send to custom analytics endpoint
    sendToCustomAnalytics(metricName, metric);
  };

  const sendToCustomAnalytics = (metricName: string, metric: WebVitalsData) => {
    const payload = {
      metric: metricName,
      value: metric.value,
      rating: metric.rating,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      sessionId: getSessionId(),
    };

    // Send to your analytics API
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(error => {
      console.warn('Failed to send web vitals:', error);
    });
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  };

  // Monitor page load performance
  const trackPageLoad = useCallback(() => {
    if (!window.performance) return;

    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const pageLoadMetrics = {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domParse: navigation.domContentLoadedEventStart - navigation.responseEnd,
      domReady: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      total: navigation.loadEventEnd - navigation.startTime,
    };

    // Send page load metrics
    if (window.gtag) {
      window.gtag('event', 'page_load_time', {
        event_category: 'Performance',
        event_label: 'total_load_time',
        value: Math.round(pageLoadMetrics.total),
        non_interaction: true,
      });
    }

    return pageLoadMetrics;
  }, []);

  // Monitor resource loading performance
  const trackResourcePerformance = useCallback(() => {
    if (!window.performance) return;

    const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const slowResources = resources.filter(resource => {
      const loadTime = resource.responseEnd - resource.requestStart;
      return loadTime > 1000; // Resources taking more than 1 second
    });

    if (slowResources.length > 0) {
      slowResources.forEach(resource => {
        if (window.gtag) {
          window.gtag('event', 'slow_resource', {
            event_category: 'Performance',
            event_label: resource.name,
            value: Math.round(resource.responseEnd - resource.requestStart),
            non_interaction: true,
          });
        }
      });
    }

    return {
      totalResources: resources.length,
      slowResources: slowResources.length,
      averageLoadTime: resources.reduce((acc, r) => acc + (r.responseEnd - r.requestStart), 0) / resources.length,
    };
  }, []);

  // Monitor user interaction performance
  const trackInteractionPerformance = useCallback(() => {
    if (!window.performance) return;

    // Monitor long tasks
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) { // Long task threshold
            if (window.gtag) {
              window.gtag('event', 'long_task', {
                event_category: 'Performance',
                event_label: entry.name,
                value: Math.round(entry.duration),
                non_interaction: true,
              });
            }
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });
      observersRef.current.add(observer);
    } catch (error) {
      console.warn('Long task monitoring not supported:', error);
    }
  }, []);

  // Monitor memory usage
  const trackMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      };

      if (window.gtag && memoryUsage.percentage > 80) {
        window.gtag('event', 'high_memory_usage', {
          event_category: 'Performance',
          event_label: 'memory_pressure',
          value: Math.round(memoryUsage.percentage),
          non_interaction: true,
        });
      }

      return memoryUsage;
    }
    return null;
  }, []);

  // Get current metrics
  const getCurrentMetrics = useCallback(() => {
    return {
      ...metricsRef.current,
      pageLoad: trackPageLoad(),
      resources: trackResourcePerformance(),
      memory: trackMemoryUsage(),
    };
  }, [trackPageLoad, trackResourcePerformance, trackMemoryUsage]);

  // Initialize monitoring
  useEffect(() => {
    // Start monitoring after page load
    const startMonitoring = () => {
      trackPageLoad();
      trackResourcePerformance();
      trackInteractionPerformance();
      trackMemoryUsage();
    };

    if (document.readyState === 'complete') {
      startMonitoring();
    } else {
      window.addEventListener('load', startMonitoring);
      return () => window.removeEventListener('load', startMonitoring);
    }
  }, [trackPageLoad, trackResourcePerformance, trackInteractionPerformance, trackMemoryUsage]);

  return {
    getCurrentMetrics,
    trackPageLoad,
    trackResourcePerformance,
    trackInteractionPerformance,
    trackMemoryUsage,
  };
};

export default usePerformanceMonitoring;
