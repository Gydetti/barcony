/**
 * Consent Manager - Google Consent Mode V2 integration
 * Adapted from CopyCoffee implementation
 */

(function() {
    'use strict';

    const DEFAULT_PREFERENCES = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };
    let isConsentGiven = false;
    let showBanner = true;
    let showingPreferences = false;

    // Initialize Google Consent Mode V2
    function initializeGoogleConsentMode() {
        if (typeof window === 'undefined') return;

        // Initialize dataLayer and gtag if not present
        window.dataLayer = window.dataLayer || [];
        if (!window.gtag) {
            window.gtag = function gtag(...args) {
                window.dataLayer.push(args);
            };
        }

        // Regional defaults: deny in EEA/UK/CH, grant analytics elsewhere
        window.gtag('consent', 'default', {
            region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'],
            ad_storage: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            security_storage: 'granted',
            wait_for_update: 500
        });

        // Outside those regions, allow analytics by default (ads remain denied)
        window.gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'granted',
            security_storage: 'granted'
        });
    }

    function getGoogleConsentMode(preferences) {
        return {
            ad_storage: preferences.marketing ? 'granted' : 'denied',
            analytics_storage: preferences.analytics ? 'granted' : 'denied',
            functionality_storage: preferences.preferences ? 'granted' : 'denied',
            personalization_storage: preferences.preferences ? 'granted' : 'denied',
            ad_user_data: preferences.marketing ? 'granted' : 'denied',
            ad_personalization: preferences.marketing ? 'granted' : 'denied',
            security_storage: 'granted'
        };
    }

    function updateGoogleConsentMode(preferences) {
        if (typeof window === 'undefined' || !window.gtag) return;
        const consentMode = getGoogleConsentMode(preferences);
        window.gtag('consent', 'update', consentMode);
    }

    async function loadStoredPreferences() {
        try {
            const storedData = await consentStorage.load();
            if (storedData) {
                currentPreferences = storedData.preferences;
                isConsentGiven = true;
                showBanner = false;
                updateGoogleConsentMode(currentPreferences);
                return true;
            }
        } catch (error) {
            console.warn('Error loading consent preferences:', error);
        }
        return false;
    }

    async function savePreferences(preferences) {
        try {
            await consentStorage.save(preferences);
            updateGoogleConsentMode(preferences);
        } catch (error) {
            console.error('Error saving consent preferences:', error);
            updateGoogleConsentMode(preferences);
        }
    }

    function updatePreferences(newPreferences) {
        const updated = { ...currentPreferences, ...newPreferences, necessary: true };
        currentPreferences = updated;
        savePreferences(updated);
        isConsentGiven = true;
        if (window.updateConsentUI) {
            window.updateConsentUI();
        }
    }

    function acceptAll() {
        const allAccepted = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
        };
        currentPreferences = allAccepted;
        savePreferences(allAccepted);
        isConsentGiven = true;
        showBanner = false;
        showingPreferences = false;
        if (window.updateConsentUI) {
            window.updateConsentUI();
        }
    }

    function rejectAll() {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        savePreferences(currentPreferences);
        isConsentGiven = true;
        showBanner = false;
        showingPreferences = false;
        if (window.updateConsentUI) {
            window.updateConsentUI();
        }
    }

    function showPreferencesPanel() {
        showingPreferences = true;
        if (window.updateConsentUI) {
            window.updateConsentUI();
        }
    }

    function hidePreferencesPanel() {
        showingPreferences = false;
        if (window.updateConsentUI) {
            window.updateConsentUI();
        }
    }

    function reopenConsentDialog() {
        showBanner = true;
        showingPreferences = true;
        if (window.updateConsentUI) {
            window.updateConsentUI();
        }
    }

    // Public API
    window.ConsentManager = {
        getPreferences: () => ({ ...currentPreferences }),
        updatePreferences,
        acceptAll,
        rejectAll,
        showPreferences: showPreferencesPanel,
        hidePreferences: hidePreferencesPanel,
        reopenConsentDialog,
        isConsentGiven: () => isConsentGiven,
        shouldShowBanner: () => showBanner,
        isShowingPreferences: () => showingPreferences
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    async function init() {
        initializeGoogleConsentMode();
        const hasStored = await loadStoredPreferences();
        if (!hasStored && typeof window.initCookieBanner === 'function') {
            window.initCookieBanner();
        }
    }
})();

