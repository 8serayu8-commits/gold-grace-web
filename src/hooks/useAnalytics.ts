import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface PageViewData {
  page: string;
  title: string;
  location?: string;
}

interface UserProperties {
  userId?: string;
  language?: string;
  theme?: string;
  userAgent?: string;
  screenResolution?: string;
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const useAnalytics = () => {
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

  // Initialize Google Analytics
  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(...args: any[]) {
      window.dataLayer!.push(arguments);
    };

    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'user_language',
        'custom_parameter_2': 'theme_preference',
      },
    });

    return () => {
      // Cleanup script if needed
      const existingScript = document.querySelector(`script[src*="googletagmanager"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [GA_MEASUREMENT_ID]);

  // Track page views
  const trackPageView = useCallback((data: PageViewData) => {
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: data.title,
        page_location: data.location || window.location.href,
        page_path: data.page,
      });
    }
  }, [GA_MEASUREMENT_ID]);

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_1: localStorage.getItem('language') || 'en',
        custom_parameter_2: localStorage.getItem('theme') || 'light',
      });
    }
  }, []);

  // Track user properties
  const trackUserProperties = useCallback((properties: UserProperties) => {
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        user_id: properties.userId,
        custom_parameter_1: properties.language,
        custom_parameter_2: properties.theme,
      });
    }
  }, [GA_MEASUREMENT_ID]);

  // Track conversion events
  const trackConversion = useCallback((conversionType: string, value?: number) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${GA_MEASUREMENT_ID}/${conversionType}`,
        value: value || 0,
        currency: 'IDR',
      });
    }
  }, [GA_MEASUREMENT_ID]);

  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, success: boolean) => {
    trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
      value: success ? 1 : 0,
    });
  }, [trackEvent]);

  // Track calculator usage
  const trackCalculatorUsage = useCallback((calculatorType: string, steps: number) => {
    trackEvent({
      action: 'calculator_use',
      category: 'tool_engagement',
      label: calculatorType,
      value: steps,
    });
  }, [trackEvent]);

  // Track blog engagement
  const trackBlogEngagement = useCallback((articleId: string, action: 'view' | 'share' | 'comment') => {
    trackEvent({
      action: `blog_${action}`,
      category: 'content_engagement',
      label: articleId,
    });
  }, [trackEvent]);

  // Track newsletter signup
  const trackNewsletterSignup = useCallback((source: string) => {
    trackEvent({
      action: 'newsletter_signup',
      category: 'lead_generation',
      label: source,
      value: 1,
    });
  }, [trackEvent]);

  // Track service inquiries
  const trackServiceInquiry = useCallback((serviceName: string) => {
    trackEvent({
      action: 'service_inquiry',
      category: 'business_inquiry',
      label: serviceName,
      value: 1,
    });
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackUserProperties,
    trackConversion,
    trackFormSubmission,
    trackCalculatorUsage,
    trackBlogEngagement,
    trackNewsletterSignup,
    trackServiceInquiry,
  };
};

export default useAnalytics;
