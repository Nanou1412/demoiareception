/**
 * Gestionnaire de Modals
 * ======================
 * 
 * Gestion centralisée des modals
 */

import { UI_CONFIG, EVENTS } from '../core/config.js';
import { eventBus } from '../core/events.js';
import { store } from '../core/state.js';
import { $, $$, createElement } from '../core/utils.js';
import { modal as modalTemplate } from './templates.js';

// ============================================
// Modal Manager
// ============================================

class ModalManager {
    constructor() {
        this.modals = new Map();
        this.activeModal = null;
        this._bindGlobalEvents();
    }

    /**
     * Créer et enregistrer un modal
     * @param {string} id - ID du modal
     * @param {Object} options - Options du modal
     * @returns {Element} Élément du modal
     */
    create(id, options) {
        const html = modalTemplate({ id, ...options });
        const container = createElement('div');
        container.innerHTML = html;
        const modalEl = container.firstElementChild;

        document.body.appendChild(modalEl);
        this.modals.set(id, {
            element: modalEl,
            options
        });

        // Bind close events
        this._bindModalEvents(id, modalEl);

        return modalEl;
    }

    /**
     * Ouvrir un modal
     * @param {string} id - ID du modal
     * @param {Object} data - Données à passer au modal
     */
    open(id, data = {}) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.warn(`Modal "${id}" not found`);
            return;
        }

        // Fermer le modal actif si différent
        if (this.activeModal && this.activeModal !== id) {
            this.close(this.activeModal);
        }

        const { element } = modal;
        element.classList.add('active');
        element.setAttribute('aria-hidden', 'false');

        // Désactiver le scroll du body
        document.body.style.overflow = 'hidden';

        this.activeModal = id;
        store.set({ activeModal: id });
        
        eventBus.emit(EVENTS.UI_MODAL_OPEN, { id, data });
    }

    /**
     * Fermer un modal
     * @param {string} id - ID du modal (optionnel, ferme l'actif si non spécifié)
     */
    close(id = null) {
        const modalId = id || this.activeModal;
        if (!modalId) return;

        const modal = this.modals.get(modalId);
        if (!modal) return;

        const { element } = modal;
        element.classList.remove('active');
        element.setAttribute('aria-hidden', 'true');

        // Réactiver le scroll du body
        document.body.style.overflow = '';

        this.activeModal = null;
        store.set({ activeModal: null });
        
        eventBus.emit(EVENTS.UI_MODAL_CLOSE, { id: modalId });
    }

    /**
     * Basculer un modal
     * @param {string} id - ID du modal
     */
    toggle(id) {
        if (this.activeModal === id) {
            this.close(id);
        } else {
            this.open(id);
        }
    }

    /**
     * Vérifier si un modal est ouvert
     * @param {string} id - ID du modal (optionnel)
     * @returns {boolean}
     */
    isOpen(id = null) {
        if (id) {
            return this.activeModal === id;
        }
        return this.activeModal !== null;
    }

    /**
     * Mettre à jour le contenu d'un modal
     * @param {string} id - ID du modal
     * @param {string} content - Nouveau contenu HTML
     */
    setContent(id, content) {
        const modal = this.modals.get(id);
        if (!modal) return;

        const body = $('.modal-body', modal.element);
        if (body) {
            body.innerHTML = content;
        }
    }

    /**
     * Supprimer un modal
     * @param {string} id - ID du modal
     */
    destroy(id) {
        const modal = this.modals.get(id);
        if (!modal) return;

        if (this.activeModal === id) {
            this.close(id);
        }

        modal.element.remove();
        this.modals.delete(id);
    }

    /**
     * Attacher les événements au modal
     * @param {string} id - ID du modal
     * @param {Element} element - Élément du modal
     */
    _bindModalEvents(id, element) {
        const { closeOnOverlay, closeOnEscape } = UI_CONFIG.modal;

        // Fermeture par bouton
        $$('[data-close-modal]', element).forEach(btn => {
            btn.addEventListener('click', () => this.close(id));
        });

        // Fermeture par overlay
        if (closeOnOverlay) {
            element.addEventListener('click', (e) => {
                if (e.target === element) {
                    this.close(id);
                }
            });
        }
    }

    /**
     * Attacher les événements globaux
     */
    _bindGlobalEvents() {
        // Fermeture par Escape
        if (UI_CONFIG.modal.closeOnEscape) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.activeModal) {
                    this.close();
                }
            });
        }
    }
}

// Instance singleton
export const modalManager = new ModalManager();

// ============================================
// Modals prédéfinis
// ============================================

/**
 * Afficher un modal de confirmation
 * @param {Object} options - Options
 * @returns {Promise<boolean>}
 */
export function confirm(options) {
    const { title = 'Confirmation', message, confirmText = 'Confirmer', cancelText = 'Annuler' } = options;

    return new Promise((resolve) => {
        const id = 'confirm-modal-' + Date.now();
        
        modalManager.create(id, {
            title,
            content: `<p>${message}</p>`,
            footer: `
                <button class="btn btn-outline" data-action="cancel">${cancelText}</button>
                <button class="btn btn-primary" data-action="confirm">${confirmText}</button>
            `,
            size: 'small'
        });

        const modal = modalManager.modals.get(id);
        if (!modal) {
            resolve(false);
            return;
        }

        const handleAction = (e) => {
            const action = e.target.dataset.action;
            if (action) {
                modalManager.destroy(id);
                resolve(action === 'confirm');
            }
        };

        modal.element.addEventListener('click', handleAction);
        modalManager.open(id);
    });
}

/**
 * Afficher un modal d'alerte
 * @param {Object} options - Options
 * @returns {Promise<void>}
 */
export function alert(options) {
    const { title = 'Information', message, buttonText = 'OK' } = options;

    return new Promise((resolve) => {
        const id = 'alert-modal-' + Date.now();
        
        modalManager.create(id, {
            title,
            content: `<p>${message}</p>`,
            footer: `<button class="btn btn-primary" data-action="ok">${buttonText}</button>`,
            size: 'small'
        });

        const modal = modalManager.modals.get(id);
        if (!modal) {
            resolve();
            return;
        }

        const handleAction = (e) => {
            if (e.target.dataset.action === 'ok') {
                modalManager.destroy(id);
                resolve();
            }
        };

        modal.element.addEventListener('click', handleAction);
        modalManager.open(id);
    });
}

// Export de la classe pour les tests
export { ModalManager };
