/**
 * Toast Notifications
 * ====================
 *
 * Ephemeral notification system
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
     * Initialize toast container
     */
    _init() {
        // Create container if it doesn't exist
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
     * Show a toast
     * @param {string} message - Message to display
     * @param {string} type - Type (success, error, warning, info)
     * @param {Object} options - Additional options
     * @returns {string} Toast ID
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

        // Entry animation
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
     * Hide a toast
     * @param {string} id - Toast ID
     */
    hide(id) {
        const toast = this.toasts.get(id);
        if (!toast) return;

        toast.classList.remove('show');
        toast.classList.add('hide');

        // Remove after animation
        setTimeout(() => {
            toast.remove();
            this.toasts.delete(id);
        }, 300);
    }

    /**
     * Hide all toasts
     */
    hideAll() {
        this.toasts.forEach((_, id) => this.hide(id));
    }

    /**
     * Type shortcuts
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

// Singleton instance
export const toastManager = new ToastManager();

// ============================================
// Exported helpers
// ============================================

export const showToast = (message, type, options) => toastManager.show(message, type, options);
export const hideToast = (id) => toastManager.hide(id);
export const toast = {
    success: (msg, opts) => toastManager.success(msg, opts),
    error: (msg, opts) => toastManager.error(msg, opts),
    warning: (msg, opts) => toastManager.warning(msg, opts),
    info: (msg, opts) => toastManager.info(msg, opts)
};

// Export class for tests
export { ToastManager };
