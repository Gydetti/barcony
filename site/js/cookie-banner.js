/**
 * Cookie Banner - Beautiful, compliant cookie consent UI
 * Adapted from CopyCoffee with Barcony natural wood theme styling
 */

(function() {
    'use strict';

    const config = {
        cookieSettingsTitle: 'Cookies op de bar 🍪',
        cookiePreferencesTitle: 'Pas je cookie voorkeuren aan',
        cookieDescription: 'We gebruiken cookies om je ervaring te verbeteren, gepersonaliseerde content te tonen en ons verkeer te analyseren. Door op "Alles accepteren" te klikken, geef je toestemming voor deze digitale lekkernijen.',
        acceptAllText: 'Ja, volledige ervaring',
        rejectAllText: 'Nee, alleen essentieel',
        customizeText: 'Aanpassen',
        backText: 'Terug',
        savePreferencesText: 'Voorkeuren opslaan',
        essentialTitle: 'Essentiële cookies',
        essentialDescription: 'Deze cookies zijn noodzakelijk voor de website om te functioneren en kunnen niet worden uitgeschakeld.',
        analyticsTitle: 'Analytische cookies',
        analyticsDescription: 'Deze cookies stellen ons in staat om bezoeken en verkeersbronnen te tellen, zodat we de prestaties van onze site kunnen meten en verbeteren.',
        marketingTitle: 'Marketing cookies',
        marketingDescription: 'Deze cookies kunnen door onze advertentiepartners op onze site worden geplaatst om een profiel van je interesses op te bouwen.',
        preferencesTitle: 'Voorkeur cookies',
        preferencesDescription: 'Deze cookies maken gepersonaliseerde functies en functionaliteit op onze website mogelijk.'
    };

    function createBannerHTML() {
        return `
            <div id="cookie-banner" class="cookie-banner" style="display: none;">
                <div class="cookie-banner__container">
                    <div class="cookie-banner__card">
                        <div id="cookie-banner-main" class="cookie-banner__main">
                            <div class="cookie-banner__header">
                                <div class="cookie-banner__icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="cookie-banner__title">
                                        ${config.cookieSettingsTitle.split(' 🍪')[0]}
                                        <span class="emoji">🍪</span>
                                    </h3>
                                    <span class="cookie-banner__badge">GDPR Compliant</span>
                                </div>
                            </div>
                            <p class="cookie-banner__description">${config.cookieDescription}</p>
                            <div class="cookie-banner__info">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="16" x2="12" y2="12"/>
                                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                                </svg>
                                <span>${config.essentialTitle} zijn altijd ingeschakeld voor website functionaliteit.</span>
                            </div>
                            <div class="cookie-banner__actions">
                                <button id="cookie-accept-all" class="cookie-banner__btn cookie-banner__btn--primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    ${config.acceptAllText}
                                </button>
                                <button id="cookie-reject-all" class="cookie-banner__btn cookie-banner__btn--secondary">
                                    ${config.rejectAllText}
                                </button>
                                <button id="cookie-customize" class="cookie-banner__btn cookie-banner__btn--ghost">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="3"/>
                                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                                    </svg>
                                    ${config.customizeText}
                                </button>
                            </div>
                        </div>
                        <div id="cookie-banner-preferences" class="cookie-banner__preferences" style="display: none;">
                            <div class="cookie-banner__preferences-header">
                                <div>
                                    <h3 class="cookie-banner__preferences-title">${config.cookiePreferencesTitle}</h3>
                                    <p class="cookie-banner__preferences-subtitle">Kies welke cookie categorieën je wilt toestaan.</p>
                                </div>
                                <button id="cookie-close-preferences" class="cookie-banner__close-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"/>
                                        <line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="cookie-banner__categories">
                                <div class="cookie-banner__category" data-category="necessary">
                                    <div class="cookie-banner__category-content">
                                        <div class="cookie-banner__category-icon cookie-banner__category-icon--shield">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                            </svg>
                                        </div>
                                        <div class="cookie-banner__category-info">
                                            <h4 class="cookie-banner__category-title">${config.essentialTitle}</h4>
                                            <p class="cookie-banner__category-description">${config.essentialDescription}</p>
                                        </div>
                                        <label class="cookie-banner__switch">
                                            <input type="checkbox" checked disabled>
                                            <span class="cookie-banner__slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="cookie-banner__category" data-category="analytics">
                                    <div class="cookie-banner__category-content">
                                        <div class="cookie-banner__category-icon cookie-banner__category-icon--chart">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="20" x2="18" y2="10"/>
                                                <line x1="12" y1="20" x2="12" y2="4"/>
                                                <line x1="6" y1="20" x2="6" y2="14"/>
                                            </svg>
                                        </div>
                                        <div class="cookie-banner__category-info">
                                            <h4 class="cookie-banner__category-title">${config.analyticsTitle}</h4>
                                            <p class="cookie-banner__category-description">${config.analyticsDescription}</p>
                                        </div>
                                        <label class="cookie-banner__switch">
                                            <input type="checkbox" id="cookie-analytics-toggle">
                                            <span class="cookie-banner__slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="cookie-banner__category" data-category="marketing">
                                    <div class="cookie-banner__category-content">
                                        <div class="cookie-banner__category-icon cookie-banner__category-icon--megaphone">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                            </svg>
                                        </div>
                                        <div class="cookie-banner__category-info">
                                            <h4 class="cookie-banner__category-title">${config.marketingTitle}</h4>
                                            <p class="cookie-banner__category-description">${config.marketingDescription}</p>
                                        </div>
                                        <label class="cookie-banner__switch">
                                            <input type="checkbox" id="cookie-marketing-toggle">
                                            <span class="cookie-banner__slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="cookie-banner__category" data-category="preferences">
                                    <div class="cookie-banner__category-content">
                                        <div class="cookie-banner__category-icon cookie-banner__category-icon--settings">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="3"/>
                                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                                            </svg>
                                        </div>
                                        <div class="cookie-banner__category-info">
                                            <h4 class="cookie-banner__category-title">${config.preferencesTitle}</h4>
                                            <p class="cookie-banner__category-description">${config.preferencesDescription}</p>
                                        </div>
                                        <label class="cookie-banner__switch">
                                            <input type="checkbox" id="cookie-preferences-toggle">
                                            <span class="cookie-banner__slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="cookie-banner__preferences-actions">
                                <button id="cookie-preferences-reject" class="cookie-banner__btn cookie-banner__btn--secondary">
                                    ${config.rejectAllText}
                                </button>
                                <button id="cookie-preferences-accept" class="cookie-banner__btn cookie-banner__btn--primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    ${config.acceptAllText}
                                </button>
                                <button id="cookie-save-preferences" class="cookie-banner__btn cookie-banner__btn--secondary">
                                    ${config.savePreferencesText}
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `;
    }

    function updateUI() {
        const banner = document.getElementById('cookie-banner');
        const mainPanel = document.getElementById('cookie-banner-main');
        const preferencesPanel = document.getElementById('cookie-banner-preferences');
        
        if (!banner || !mainPanel || !preferencesPanel) return;

        const shouldShow = window.ConsentManager.shouldShowBanner();
        const showingPrefs = window.ConsentManager.isShowingPreferences();
        const prefs = window.ConsentManager.getPreferences();

        if (shouldShow) {
            banner.style.display = 'block';
            if (showingPrefs) {
                mainPanel.style.display = 'none';
                preferencesPanel.style.display = 'block';
            } else {
                mainPanel.style.display = 'block';
                preferencesPanel.style.display = 'none';
            }
        } else {
            banner.style.display = 'none';
        }

        // Update toggles
        document.getElementById('cookie-analytics-toggle').checked = prefs.analytics;
        document.getElementById('cookie-marketing-toggle').checked = prefs.marketing;
        document.getElementById('cookie-preferences-toggle').checked = prefs.preferences;
    }

    function attachEventListeners() {
        // Main panel buttons
        document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
            window.ConsentManager.acceptAll();
        });

        document.getElementById('cookie-reject-all')?.addEventListener('click', () => {
            window.ConsentManager.rejectAll();
        });

        document.getElementById('cookie-customize')?.addEventListener('click', () => {
            window.ConsentManager.showPreferences();
        });

        // Preferences panel buttons
        document.getElementById('cookie-close-preferences')?.addEventListener('click', () => {
            window.ConsentManager.hidePreferences();
        });

        document.getElementById('cookie-preferences-reject')?.addEventListener('click', () => {
            window.ConsentManager.rejectAll();
        });

        document.getElementById('cookie-preferences-accept')?.addEventListener('click', () => {
            window.ConsentManager.acceptAll();
        });

        document.getElementById('cookie-save-preferences')?.addEventListener('click', () => {
            const prefs = {
                analytics: document.getElementById('cookie-analytics-toggle').checked,
                marketing: document.getElementById('cookie-marketing-toggle').checked,
                preferences: document.getElementById('cookie-preferences-toggle').checked
            };
            window.ConsentManager.updatePreferences(prefs);
            window.ConsentManager.hidePreferences();
        });

        // Toggle switches
        document.getElementById('cookie-analytics-toggle')?.addEventListener('change', (e) => {
            window.ConsentManager.updatePreferences({ analytics: e.target.checked });
        });

        document.getElementById('cookie-marketing-toggle')?.addEventListener('change', (e) => {
            window.ConsentManager.updatePreferences({ marketing: e.target.checked });
        });

        document.getElementById('cookie-preferences-toggle')?.addEventListener('change', (e) => {
            window.ConsentManager.updatePreferences({ preferences: e.target.checked });
        });
    }

    function init() {
        // Create banner HTML
        const bannerHTML = createBannerHTML();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = bannerHTML;
        document.body.appendChild(tempDiv.firstElementChild);

        // Attach event listeners
        attachEventListeners();

        // Set up update function
        window.updateConsentUI = updateUI;

        // Initial update
        updateUI();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export init function for manual initialization
    window.initCookieBanner = init;
})();

