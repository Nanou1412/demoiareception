/**
 * Utility Functions
 * ==================
 *
 * Reusable helpers throughout the application
 */

// ============================================
// DOM Utilities
// ============================================

/**
 * Shortcut for document.querySelector
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent (default: document)
 * @returns {Element|null}
 */
export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Shortcut for document.querySelectorAll
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent (default: document)
 * @returns {NodeList}
 */
export function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Create a DOM element
 * @param {string} tag - Tag name
 * @param {Object} attrs - Attributes
 * @param {string|Element|Array} children - Children
 * @returns {Element}
 */
export function createElement(tag, attrs = {}, children = null) {
    const el = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
            el.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(el.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            el.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([k, v]) => {
                el.dataset[k] = v;
            });
        } else {
            el.setAttribute(key, value);
        }
    });

    if (children) {
        if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    el.appendChild(document.createTextNode(child));
                } else if (child instanceof Element) {
                    el.appendChild(child);
                }
            });
        } else if (typeof children === 'string') {
            el.textContent = children;
        } else if (children instanceof Element) {
            el.appendChild(children);
        }
    }

    return el;
}

/**
 * Wait for DOM to be ready
 * @returns {Promise<void>}
 */
export function domReady() {
    return new Promise(resolve => {
        if (document.readyState !== 'loading') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', resolve);
        }
    });
}

// ============================================
// String Utilities
// ============================================

/**
 * Escape HTML characters
 * @param {string} str - String to escape
 * @returns {string}
 */
export function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Truncate a string
 * @param {string} str - String to truncate
 * @param {number} length - Max length
 * @param {string} suffix - Suffix (default: '...')
 * @returns {string}
 */
export function truncate(str, length, suffix = '...') {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Capitalize first letter
 * @param {string} str - String
 * @returns {string}
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert to URL-friendly slug
 * @param {string} str - String
 * @returns {string}
 */
export function slugify(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// ============================================
// Number Utilities
// ============================================

/**
 * Clamp a number between min and max
 * @param {number} num - Number
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number}
 */
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

/**
 * Format number with separators
 * @param {number} num - Number
 * @param {string} locale - Locale (default: 'en-AU')
 * @returns {string}
 */
export function formatNumber(num, locale = 'en-AU') {
    return new Intl.NumberFormat(locale).format(num);
}

/**
 * Random number between min and max
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number}
 */
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// Date/Time Utilities
// ============================================

/**
 * Format time (HH:MM)
 * @param {Date} date - Date
 * @returns {string}
 */
export function formatTime(date = new Date()) {
    return date.toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format relative time
 * @param {Date|string} date - Date
 * @returns {string}
 */
export function formatRelativeTime(date) {
    const now = new Date();
    const target = new Date(date);
    const diff = now - target;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
}

// ============================================
// Async Utilities
// ============================================

/**
 * Wait for a delay
 * @param {number} ms - Milliseconds
 * @returns {Promise<void>}
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in ms
 * @returns {Function}
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle a function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Interval in ms
 * @returns {Function}
 */
export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Retry a promise with exponential backoff
 * @param {Function} fn - Function returning a promise
 * @param {number} retries - Number of attempts
 * @param {number} baseDelay - Base delay in ms
 * @returns {Promise}
 */
export async function retry(fn, retries = 3, baseDelay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            await delay(baseDelay * Math.pow(2, i));
        }
    }
}

// ============================================
// Object Utilities
// ============================================

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object}
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Deep merge objects
 * @param {Object} target - Target object
 * @param {...Object} sources - Source objects
 * @returns {Object}
 */
export function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepMerge(target, ...sources);
}

/**
 * Check if a value is an object
 * @param {*} item - Value to check
 * @returns {boolean}
 */
export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// ============================================
// UUID
// ============================================

/**
 * Generate a UUID v4
 * @returns {string}
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Generate a short ID
 * @param {number} length - Length (default: 8)
 * @returns {string}
 */
export function shortId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ============================================
// URL Utilities
// ============================================

/**
 * Parse URL query params
 * @param {string} url - URL (default: window.location.search)
 * @returns {Object}
 */
export function parseQueryParams(url = window.location.search) {
    const params = new URLSearchParams(url);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

/**
 * Build URL with query params
 * @param {string} baseUrl - Base URL
 * @param {Object} params - Parameters
 * @returns {string}
 */
export function buildUrl(baseUrl, params = {}) {
    const url = new URL(baseUrl, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, value);
        }
    });
    return url.toString();
}

// ============================================
// Storage Utilities
// ============================================

/**
 * Save to localStorage with JSON
 * @param {string} key - Key
 * @param {*} value - Value
 */
export function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Storage error:', error);
    }
}

/**
 * Retrieve from localStorage with JSON
 * @param {string} key - Key
 * @param {*} defaultValue - Default value
 * @returns {*}
 */
export function getStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn('Storage error:', error);
        return defaultValue;
    }
}

// ============================================
// Browser Detection
// ============================================

/**
 * Detect if on mobile
 * @returns {boolean}
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/**
 * Detect if on iOS
 * @returns {boolean}
 */
export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Check speech synthesis support
 * @returns {boolean}
 */
export function supportsSpeechSynthesis() {
    return 'speechSynthesis' in window;
}

/**
 * Check speech recognition support
 * @returns {boolean}
 */
export function supportsSpeechRecognition() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}
