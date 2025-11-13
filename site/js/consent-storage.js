/**
 * Consent Storage - Handles localStorage with cookie fallback
 * Adapted from CopyCoffee implementation for vanilla JS
 */

class ConsentStorage {
    constructor() {
        this.STORAGE_KEY = 'barcony-consent-preferences';
        this.VERSION = '1.0';
        this.MAX_RETRIES = 3;
        this.RETRY_DELAY = 100;
    }

    isStorageAvailable() {
        try {
            if (typeof window === 'undefined' || !window.localStorage) {
                return false;
            }
            const testKey = '__barcony_storage_test__';
            const testValue = 'test';
            window.localStorage.setItem(testKey, testValue);
            const retrieved = window.localStorage.getItem(testKey);
            window.localStorage.removeItem(testKey);
            return retrieved === testValue;
        } catch {
            return false;
        }
    }

    setCookieFallback(key, value, days = 365) {
        try {
            if (typeof document === 'undefined') return false;
            const expires = new Date();
            expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
            const secureAttr = typeof window !== 'undefined' && window.location.protocol === 'https:' ? ';Secure' : '';
            document.cookie = `${key}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax${secureAttr}`;
            return true;
        } catch {
            return false;
        }
    }

    getCookieFallback(key) {
        try {
            if (typeof document === 'undefined') return null;
            const nameEQ = `${key}=`;
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(cookie.substring(nameEQ.length));
                }
            }
            return null;
        } catch {
            return null;
        }
    }

    validateStoredData(data) {
        if (!data || typeof data !== 'object') return false;
        if (typeof data.version !== 'string') return false;
        if (typeof data.timestamp !== 'number') return false;
        if (!data.preferences || typeof data.preferences !== 'object') return false;
        
        const prefs = data.preferences;
        const requiredBools = ['necessary', 'analytics', 'marketing', 'preferences'];
        for (const key of requiredBools) {
            if (typeof prefs[key] !== 'boolean') return false;
        }
        if (data.version !== this.VERSION) return false;
        return true;
    }

    buildData(preferences) {
        return {
            version: this.VERSION,
            preferences,
            timestamp: Date.now(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
            domain: typeof window !== 'undefined' ? window.location.hostname : undefined
        };
    }

    async save(preferences) {
        const serializedData = JSON.stringify(this.buildData(preferences));
        
        if (this.isStorageAvailable()) {
            try {
                window.localStorage.setItem(this.STORAGE_KEY, serializedData);
                return;
            } catch (error) {
                if (error.name === 'QuotaExceededError') {
                    try {
                        window.localStorage.removeItem(this.STORAGE_KEY);
                        window.localStorage.setItem(this.STORAGE_KEY, serializedData);
                        return;
                    } catch {
                        // Fall through to cookie
                    }
                }
            }
        }

        const success = this.setCookieFallback(this.STORAGE_KEY, serializedData);
        if (!success) {
            console.error('Failed to save consent preferences: both localStorage and cookie storage failed');
        }
    }

    async load() {
        let rawData = null;
        
        if (this.isStorageAvailable()) {
            try {
                rawData = window.localStorage.getItem(this.STORAGE_KEY);
            } catch {
                // Fall through to cookie
            }
        }

        if (rawData === null) {
            rawData = this.getCookieFallback(this.STORAGE_KEY);
        }

        if (!rawData) {
            return null;
        }

        try {
            const parsed = JSON.parse(rawData);
            if (!this.validateStoredData(parsed)) {
                await this.clear();
                return null;
            }
            return parsed;
        } catch (error) {
            await this.clear();
            console.error('Failed to parse stored consent data:', error);
            return null;
        }
    }

    async clear() {
        if (this.isStorageAvailable()) {
            try {
                window.localStorage.removeItem(this.STORAGE_KEY);
            } catch {
                // Ignore
            }
        }
        this.setCookieFallback(this.STORAGE_KEY, '', -1);
    }
}

const consentStorage = new ConsentStorage();

