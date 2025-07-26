'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
}

const PerformanceMonitor = () => {
    useEffect(() => {
        // Only run in browser environment
        if (typeof window === 'undefined') return;

        const metrics: PerformanceMetrics = {
            fcp: 0,
            lcp: 0,
            fid: 0,
            cls: 0,
            ttfb: 0,
        };

        // Store observer references for cleanup
        const observers: PerformanceObserver[] = [];

        // Track First Contentful Paint (FCP)
        if ('PerformanceObserver' in window) {
            const fcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                if (entries.length > 0) {
                    const fcp = entries[0] as PerformanceEntry;
                    metrics.fcp = fcp.startTime;
                    // console.log('FCP:', metrics.fcp.toFixed(2), 'ms');
                }
            });
            fcpObserver.observe({ type: 'paint', buffered: true });
            observers.push(fcpObserver);
        }

        // Track Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                if (entries.length > 0) {
                    const lcp = entries[entries.length - 1] as PerformanceEntry;
                    metrics.lcp = lcp.startTime;
                    // console.log('LCP:', metrics.lcp.toFixed(2), 'ms');
                }
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            observers.push(lcpObserver);
        }

        // Track First Input Delay (FID)
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach((entry) => {
                    const fid = entry as any;
                    metrics.fid = fid.processingStart - fid.startTime;
                    // console.log('FID:', metrics.fid.toFixed(2), 'ms');
                });
            });
            fidObserver.observe({ type: 'first-input', buffered: true });
            observers.push(fidObserver);
        }

        // Track Cumulative Layout Shift (CLS)
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach((entry) => {
                    const clsEntry = entry as any;
                    if (!clsEntry.hadRecentInput) {
                        clsValue += clsEntry.value;
                        metrics.cls = clsValue;
                        // console.log('CLS:', metrics.cls.toFixed(4));
                    }
                });
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
            observers.push(clsObserver);
        }

        // Track Time to First Byte (TTFB)
        if ('PerformanceObserver' in window) {
            const navigationObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach((entry) => {
                    const navigationEntry = entry as PerformanceNavigationTiming;
                    metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
                    // console.log('TTFB:', metrics.ttfb.toFixed(2), 'ms');
                });
            });
            navigationObserver.observe({ type: 'navigation', buffered: true });
            observers.push(navigationObserver);
        }

        // Send metrics to analytics (if needed)
        const sendMetrics = () => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'web_vitals', {
                    event_category: 'Web Vitals',
                    event_label: 'Portfolio Performance',
                    value: Math.round(metrics.lcp),
                    custom_map: {
                        metric1: 'fcp',
                        metric2: 'lcp',
                        metric3: 'fid',
                        metric4: 'cls',
                        metric5: 'ttfb',
                    },
                    metric1: Math.round(metrics.fcp),
                    metric2: Math.round(metrics.lcp),
                    metric3: Math.round(metrics.fid),
                    metric4: Math.round(metrics.cls * 1000),
                    metric5: Math.round(metrics.ttfb),
                });
            }
        };

        // Send metrics after a delay to ensure all metrics are collected
        setTimeout(sendMetrics, 5000);

        return () => {
            // Cleanup observers properly
            observers.forEach(observer => {
                observer.disconnect();
            });
        };
    }, []);

    // This component doesn't render anything
    return null;
};

export default PerformanceMonitor; 