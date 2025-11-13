/**
 * Adaptive Tracking Scripts - Loads GA4 based on consent
 * Adapted from CopyCoffee implementation
 */

(function() {
    'use strict';

    // Configuration - Set your GA4 ID here or via environment variable
    const GA4_ID = window.BARCONY_GA4_ID || '';

    if (!GA4_ID) {
        console.warn('GA4 ID not configured. Tracking disabled.');
        return;
    }

    // Preconnect for faster GA loading
    function addPreconnects() {
        const preconnects = [
            { rel: 'preconnect', href: 'https://www.google-analytics.com' },
            { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
            { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
            { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }
        ];

        preconnects.forEach(({ rel, href }) => {
            const link = document.createElement('link');
            link.rel = rel;
            link.href = href;
            document.head.appendChild(link);
        });
    }

    // Load GA4 script
    function loadGA4() {
        if (window.gtag && document.querySelector(`script[src*="${GA4_ID}"]`)) {
            return; // Already loaded
        }

        // Load gtag.js
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
        script1.setAttribute('data-consent-mode', 'lazy');
        document.head.appendChild(script1);

        // Configure GA4
        const script2 = document.createElement('script');
        script2.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
                anonymize_ip: true,
                transport_type: 'beacon',
                send_page_view: false
            });
        `;
        document.head.appendChild(script2);
    }

    // Track pageview
    function trackPageView() {
        if (!window.gtag) return;
        
        window.gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_location: window.location.href,
            page_title: document.title
        });
    }

    // Watch for consent changes
    let prevAnalyticsGranted = null;

    function checkConsentAndLoad() {
        if (!window.ConsentManager) return;

        const prefs = window.ConsentManager.getPreferences();
        const analyticsGranted = window.ConsentManager.isConsentGiven() && prefs.analytics === true;

        if (prevAnalyticsGranted === null) {
            prevAnalyticsGranted = analyticsGranted;
            if (analyticsGranted) {
                addPreconnects();
                loadGA4();
                // Track initial pageview after a short delay to ensure script is loaded
                setTimeout(trackPageView, 500);
            }
            return;
        }

        if (!prevAnalyticsGranted && analyticsGranted) {
            // Consent just granted - load scripts
            addPreconnects();
            loadGA4();
            setTimeout(() => {
                trackPageView();
            }, 500);
        } else if (prevAnalyticsGranted && !analyticsGranted) {
            // Consent revoked - scripts remain but won't track
            // GA4 respects consent mode automatically
        }

        prevAnalyticsGranted = analyticsGranted;
    }

    // Initialize
    function init() {
        addPreconnects(); // Always add preconnects for faster loading if consent is granted

        // Check consent periodically (in case it changes)
        checkConsentAndLoad();
        setInterval(checkConsentAndLoad, 1000);

        // Track pageview on initial load if consent already granted
        if (window.ConsentManager && window.ConsentManager.isConsentGiven()) {
            const prefs = window.ConsentManager.getPreferences();
            if (prefs.analytics) {
                setTimeout(() => {
                    loadGA4();
                    trackPageView();
                }, 1000);
            }
        }
    }

    // Wait for ConsentManager to be available
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(init, 100);
        });
    } else {
        setTimeout(init, 100);
    }
})();

