import { useEffect } from 'react';

// Google Analytics tracking functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // Track page view on component mount
    trackPageView();
  }, []);

  const trackPageView = (page?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: page || window.location.pathname,
      });
    }
  };

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackQuoteRequest = (origin: string, destination: string, cargoType: string) => {
    trackEvent('quote_request', 'engagement', `${origin} to ${destination} - ${cargoType}`);
  };

  const trackContactForm = (subject: string) => {
    trackEvent('contact_form', 'engagement', subject);
  };

  const trackChatStart = () => {
    trackEvent('chat_start', 'engagement', 'support_chat');
  };

  const trackLanguageChange = (language: string) => {
    trackEvent('language_change', 'user_preference', language);
  };

  const trackServiceView = (service: string) => {
    trackEvent('service_view', 'content', service);
  };

  const trackDownload = (fileName: string) => {
    trackEvent('download', 'engagement', fileName);
  };

  return {
    trackPageView,
    trackEvent,
    trackQuoteRequest,
    trackContactForm,
    trackChatStart,
    trackLanguageChange,
    trackServiceView,
    trackDownload,
  };
};

// Simple analytics for internal tracking
export const useInternalAnalytics = () => {
  const trackVisitor = async () => {
    try {
      const response = await fetch('/api/analytics/visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: window.location.pathname,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        console.warn('Failed to track visitor');
      }
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  };

  const trackAction = async (action: string, data?: any) => {
    try {
      await fetch('/api/analytics/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data,
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.warn('Action tracking error:', error);
    }
  };

  return {
    trackVisitor,
    trackAction,
  };
};