# Cookie Banner & Tracking Setup

## Overview

The Barcony website now includes a GDPR-compliant cookie banner with Google Consent Mode V2 integration, adapted from CopyCoffee's professional implementation.

## Features

- ✅ **Google Consent Mode V2** - Regional defaults (deny in EEA/UK/CH, grant elsewhere)
- ✅ **Beautiful UI** - Natural wood theme matching Barcony branding
- ✅ **GDPR Compliant** - Full compliance with EU regulations
- ✅ **Performance Optimized** - Lazy loading, preconnects, minimal impact on page load
- ✅ **Adaptive Tracking** - GA4 only loads when consent is granted
- ✅ **Storage Fallback** - localStorage with cookie fallback for private browsing
- ✅ **Anonymous Pageviews** - Tracks pageviews even without full consent

## Configuration

### Setting Your GA4 ID

1. **Option 1: In HTML (Quick Setup)**
   Edit `site/index.html` and set your GA4 ID:
   ```javascript
   window.BARCONY_GA4_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
   ```

2. **Option 2: Via Environment Variable (Recommended for Production)**
   Set `BARCONY_GA4_ID` environment variable in Vercel dashboard.

3. **Option 3: Dynamic Configuration**
   You can set it dynamically before the scripts load:
   ```javascript
   window.BARCONY_GA4_ID = 'G-XXXXXXXXXX';
   ```

### How It Works

1. **Consent Mode V2 Initialization**
   - Sets regional defaults before any tracking scripts load
   - Denies consent in EEA/UK/CH by default
   - Grants analytics consent elsewhere (ads always denied)

2. **Cookie Banner Display**
   - Shows on first visit if no consent stored
   - Beautiful slide-up animation
   - Three options: Accept All, Reject All, Customize

3. **Adaptive Script Loading**
   - GA4 scripts only load when analytics consent is granted
   - Preconnects added for faster loading when consent granted
   - Anonymous pageviews tracked even without full consent

4. **Consent Storage**
   - Uses localStorage (primary)
   - Falls back to cookies (private browsing mode)
   - Stores preferences for 365 days

## Files Structure

```
site/
├── js/
│   ├── consent-storage.js    # Storage handler (localStorage + cookie fallback)
│   ├── consent-manager.js    # Google Consent Mode V2 integration
│   ├── cookie-banner.js      # UI component
│   └── tracking.js           # Adaptive GA4 loader
└── components/
    └── cookie-banner.css     # Styling (natural wood theme)
```

## Testing

1. **Test Cookie Banner**
   - Clear browser storage/cookies
   - Reload page - banner should appear
   - Test Accept All, Reject All, Customize options

2. **Test Consent Storage**
   - Accept cookies
   - Reload page - banner should not appear
   - Check localStorage: `barcony-consent-preferences`

3. **Test Tracking**
   - Open browser DevTools → Network tab
   - Accept analytics cookies
   - Verify GA4 script loads: `gtag/js?id=G-XXXXXXXXXX`
   - Check pageview events in Network tab

4. **Test Regional Defaults**
   - Use VPN to test from EEA region
   - Verify consent defaults to denied
   - Verify consent defaults to granted outside EEA

## Customization

### Cookie Banner Text

Edit `site/js/cookie-banner.js` to customize:
- `cookieSettingsTitle` - Main title
- `cookieDescription` - Description text
- Button labels and category descriptions

### Styling

Edit `site/components/cookie-banner.css` to match your brand:
- Colors use CSS variables from `variables.css`
- Natural wood theme colors: `--color-primary`, `--color-accent`
- Responsive breakpoints included

## Compliance

- ✅ GDPR compliant (EU)
- ✅ CCPA ready (California)
- ✅ Regional consent defaults
- ✅ Clear opt-in/opt-out
- ✅ Preference storage
- ✅ Consent withdrawal support

## Performance

- **Zero blocking** - All scripts load with `defer`
- **Lazy loading** - GA4 only loads with consent
- **Preconnects** - Added for faster GA loading
- **Minimal CSS** - Optimized stylesheet
- **No dependencies** - Pure vanilla JavaScript

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage with cookie fallback
- Graceful degradation for older browsers

## Troubleshooting

**Banner not showing?**
- Check browser console for errors
- Verify scripts are loading: `/js/consent-storage.js`, `/js/consent-manager.js`, `/js/cookie-banner.js`
- Clear browser storage and reload

**Tracking not working?**
- Verify GA4 ID is set: `window.BARCONY_GA4_ID`
- Check consent was granted: `window.ConsentManager.getPreferences()`
- Verify GA4 script loads in Network tab
- Check browser console for errors

**Consent not persisting?**
- Check localStorage availability
- Verify cookie fallback works
- Check browser privacy settings

## Next Steps

1. Set your GA4 ID in `site/index.html`
2. Test the cookie banner functionality
3. Verify tracking in Google Analytics
4. Customize text/styling if needed
5. Deploy to production

