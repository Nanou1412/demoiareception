/**
 * Fonctions utilitaires
 * =====================
 * 
 * Helpers réutilisables dans toute l'application
 */

// ============================================
// DOM Utilities
// ============================================

/**
 * Raccourci pour document.querySelector
 * @param {string} selector - Sélecteur CSS
 * @param {Element} parent - Parent (défaut: document)
 * @returns {Element|null}
 */
export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Raccourci pour document.querySelectorAll
 * @param {string} selector - Sélecteur CSS
 * @param {Element} parent - Parent (défaut: document)
 * @returns {NodeList}
 */
export function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Créer un élément DOM
 * @param {string} tag - Nom de la balise
 * @param {Object} attrs - Attributs
 * @param {string|Element|Array} children - Enfants
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
 * Attendre que le DOM soit prêt
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
 * Échapper les caractères HTML
 * @param {string} str - Chaîne à échapper
 * @returns {string}
 */
export function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Tronquer une chaîne
 * @param {string} str - Chaîne à tronquer
 * @param {number} length - Longueur max
 * @param {string} suffix - Suffixe (défaut: '...')
 * @returns {string}
 */
export function truncate(str, length, suffix = '...') {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Capitaliser la première lettre
 * @param {string} str - Chaîne
 * @returns {string}
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convertir en slug URL-friendly
 * @param {string} str - Chaîne
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
 * Limiter un nombre entre min et max
 * @param {number} num - Nombre
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number}
 */
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

/**
 * Formater un nombre avec séparateurs
 * @param {number} num - Nombre
 * @param {string} locale - Locale (défaut: 'fr-FR')
 * @returns {string}
 */
export function formatNumber(num, locale = 'fr-FR') {
    return new Intl.NumberFormat(locale).format(num);
}

/**
 * Nombre aléatoire entre min et max
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
 * Formater une heure (HH:MM)
 * @param {Date} date - Date
 * @returns {string}
 */
export function formatTime(date = new Date()) {
    return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formater une date relative
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

    if (days > 0) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    return "à l'instant";
}

// ============================================
// Async Utilities
// ============================================

/**
 * Attendre un délai
 * @param {number} ms - Millisecondes
 * @returns {Promise<void>}
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce une fonction
 * @param {Function} func - Fonction à debounce
 * @param {number} wait - Délai en ms
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
 * Throttle une fonction
 * @param {Function} func - Fonction à throttle
 * @param {number} limit - Intervalle en ms
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
 * Réessayer une promesse avec délai exponentiel
 * @param {Function} fn - Fonction retournant une promesse
 * @param {number} retries - Nombre de tentatives
 * @param {number} baseDelay - Délai de base en ms
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
 * Clone profond d'un objet
 * @param {Object} obj - Objet à cloner
 * @returns {Object}
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge profond d'objets
 * @param {Object} target - Objet cible
 * @param {...Object} sources - Objets sources
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
 * Vérifier si une valeur est un objet
 * @param {*} item - Valeur à vérifier
 * @returns {boolean}
 */
export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// ============================================
// UUID
// ============================================

/**
 * Générer un UUID v4
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
 * Générer un ID court
 * @param {number} length - Longueur (défaut: 8)
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
 * Parser les query params de l'URL
 * @param {string} url - URL (défaut: window.location.search)
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
 * Construire une URL avec query params
 * @param {string} baseUrl - URL de base
 * @param {Object} params - Paramètres
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
 * Sauvegarder dans localStorage avec JSON
 * @param {string} key - Clé
 * @param {*} value - Valeur
 */
export function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Storage error:', error);
    }
}

/**
 * Récupérer depuis localStorage avec JSON
 * @param {string} key - Clé
 * @param {*} defaultValue - Valeur par défaut
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
 * Détecter si on est sur mobile
 * @returns {boolean}
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/**
 * Détecter si on est sur iOS
 * @returns {boolean}
 */
export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Vérifier le support de la synthèse vocale
 * @returns {boolean}
 */
export function supportsSpeechSynthesis() {
    return 'speechSynthesis' in window;
}

/**
 * Vérifier le support de la reconnaissance vocale
 * @returns {boolean}
 */
export function supportsSpeechRecognition() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}
