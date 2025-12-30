/**
 * Notifications Toast
 * ====================
 * 
 * Système de notifications éphémères
 */

import { UI_CONFIG, EVENTS } from '../core/config.js';
import { eventBus } from '../core/events.js';
import { $, createElement, shortId } from '../core/utils.js';
import { toast as toastTemplate } from './templates.js';

// ============================================
// Toast Manager
// ============================================

class ToastManager {
    constructor() {
        this.container = null;
        this.toasts = new Map();
        this._init();
    }

    /**
     * Initialiser le container de toasts
     */
    _init() {
        // Créer le container s'il n'existe pas
        this.container = $('#toast-container');
        if (!this.container) {
            this.container = createElement('div', {
                id: 'toast-container',
                className: `toast-container toast-${UI_CONFIG.toast.position}`,
                'aria-live': 'polite',
                'aria-atomic': 'true'
            });
            document.body.appendChild(this.container);
        }

        // Écouter les événements de toast
        eventBus.on(EVENTS.UI_TOAST, ({ message, type }) => {
            this.show(message, type);
        });
    }

    /**
     * Afficher un toast
     * @param {string} message - Message à afficher
     * @param {string} type - Type (success, error, warning, info)
     * @param {Object} options - Options supplémentaires
     * @returns {string} ID du toast
     */
    show(message, type = 'info', options = {}) {
        const id = shortId();
        const duration = options.duration || UI_CONFIG.toast.duration;

        const html = toastTemplate({ message, type, id });
        const toastEl = createElement('div');
        toastEl.innerHTML = html;
        const toast = toastEl.firstElementChild;

        this.container.appendChild(toast);
        this.toasts.set(id, toast);

        // Bind close event
        const closeBtn = $('.toast-close', toast);
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide(id));
        }

        // Animation d'entrée
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-dismiss
        if (duration > 0) {
            setTimeout(() => this.hide(id), duration);
        }

        return id;
    }

    /**
     * Masquer un toast
     * @param {string} id - ID du toast
     */
    hide(id) {
        const toast = this.toasts.get(id);
        if (!toast) return;

        toast.classList.remove('show');
        toast.classList.add('hide');

        // Supprimer après l'animation
        setTimeout(() => {
            toast.remove();
            this.toasts.delete(id);
        }, 300);
    }

    /**
     * Masquer tous les toasts
     */
    hideAll() {
        this.toasts.forEach((_, id) => this.hide(id));
    }

    /**
     * Raccourcis par type
     */
    success(message, options) {
        return this.show(message, 'success', options);
    }

    error(message, options) {
        return this.show(message, 'error', options);
    }

    warning(message, options) {
        return this.show(message, 'warning', options);
    }

    info(message, options) {
        return this.show(message, 'info', options);
    }
}

// Instance singleton
export const toastManager = new ToastManager();

// ============================================
// Helpers exportés
// ============================================

export const showToast = (message, type, options) => toastManager.show(message, type, options);
export const hideToast = (id) => toastManager.hide(id);
export const toast = {
    success: (msg, opts) => toastManager.success(msg, opts),
    error: (msg, opts) => toastManager.error(msg, opts),
    warning: (msg, opts) => toastManager.warning(msg, opts),
    info: (msg, opts) => toastManager.info(msg, opts)
};

// Export de la classe pour les tests
export { ToastManager };
