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

  // Load Web Vitals library with optimized loading
  useEffect(() => {
    // Use requestIdleCallback for non-blocking loading
    const loadWebVitals = () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
      script.async = true;
      script.defer = true; // Add defer for better loading
      script.onload = () => {
        // Initialize after script loads
        requestIdleCallback(() => {
          initializeWebVitals();
        });
      };
      script.onerror = () => {
        console.warn('Failed to load Web Vitals library');
      };
      document.head.appendChild(script);
    };

    // Load Web Vitals after critical resources
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadWebVitals, { timeout: 3000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadWebVitals, 1000);
    }

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

    // Send to your analytics API with keepalive and non-blocking optimizations
    const sendAnalytics = () => {
      // Use navigator.sendBeacon if available for better performance
      if ('sendBeacon' in navigator) {
        const data = new Blob([JSON.stringify(payload)], {
          type: 'application/json'
        });
        
        const success = navigator.sendBeacon('/api/analytics/web-vitals', data);
        if (success) {
          console.log('Web vitals sent via sendBeacon');
          return;
        }
      }

      // Fallback to fetch with keepalive
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true, // Keep connection alive for better performance
        priority: 'low', // Low priority for non-critical requests
      })
      .then(async (response) => {
        if (!response.ok) {
          // Handle different error statuses
          if (response.status === 405) {
            console.warn('Web vitals endpoint does not support POST method');
          } else if (response.status === 400) {
            const errorData = await response.json().catch(() => ({}));
            console.warn('Invalid web vitals data:', errorData.error || 'Bad request');
          } else if (response.status >= 500) {
            console.warn('Server error when sending web vitals:', response.status);
          } else {
            console.warn('Unexpected response status:', response.status);
          }
          return;
        }
        
        // Success case
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log('Web vitals sent successfully:', data.receivedAt);
        }
      })
      .catch(error => {
        // Network errors, CORS issues, etc.
        console.warn('Failed to send web vitals:', error.message || error);
        
        // Store failed metrics locally for retry later
        const failedMetrics = JSON.parse(localStorage.getItem('failed_web_vitals') || '[]');
        failedMetrics.push({ ...payload, failedAt: Date.now() });
        
        // Keep only last 10 failed metrics
        if (failedMetrics.length > 10) {
          failedMetrics.splice(0, failedMetrics.length - 10);
        }
        
        localStorage.setItem('failed_web_vitals', JSON.stringify(failedMetrics));
      });
    };

    // Send analytics in a non-blocking way
    if ('requestIdleCallback' in window) {
      requestIdleCallback(sendAnalytics, { timeout: 2000 });
    } else {
      // Use setTimeout as fallback
      setTimeout(sendAnalytics, 0);
    }
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
