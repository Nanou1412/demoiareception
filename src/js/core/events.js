/**
 * Système d'événements global
 * ===========================
 *
 * EventEmitter léger pour la communication inter-modules
 */

class EventEmitter {
    constructor() {
        this.events = new Map();
        this.onceEvents = new Map();
    }

    /**
     * S'abonner à un événement
     * @param {string} event - Nom de l'événement
     * @param {Function} callback - Fonction de rappel
     * @returns {Function} Fonction de désabonnement
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);

        // Retourne une fonction de désabonnement
        return () => this.off(event, callback);
    }

    /**
     * S'abonner à un événement une seule fois
     * @param {string} event - Nom de l'événement
     * @param {Function} callback - Fonction de rappel
     */
    once(event, callback) {
        if (!this.onceEvents.has(event)) {
            this.onceEvents.set(event, new Set());
        }
        this.onceEvents.get(event).add(callback);
    }

    /**
     * Se désabonner d'un événement
     * @param {string} event - Nom de l'événement
     * @param {Function} callback - Fonction de rappel à retirer
     */
    off(event, callback) {
        if (this.events.has(event)) {
            this.events.get(event).delete(callback);
        }
        if (this.onceEvents.has(event)) {
            this.onceEvents.get(event).delete(callback);
        }
    }

    /**
     * Émettre un événement
     * @param {string} event - Nom de l'événement
     * @param {*} data - Données à transmettre
     */
    emit(event, data) {
        // Exécuter les callbacks réguliers
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }

        // Exécuter et supprimer les callbacks "once"
        if (this.onceEvents.has(event)) {
            this.onceEvents.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in once handler for ${event}:`, error);
                }
            });
            this.onceEvents.delete(event);
        }
    }

    /**
     * Supprimer tous les listeners d'un événement
     * @param {string} event - Nom de l'événement (optionnel, si absent supprime tout)
     */
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
            this.onceEvents.delete(event);
        } else {
            this.events.clear();
            this.onceEvents.clear();
        }
    }

    /**
     * Obtenir le nombre de listeners pour un événement
     * @param {string} event - Nom de l'événement
     * @returns {number} Nombre de listeners
     */
    listenerCount(event) {
        const regular = this.events.has(event) ? this.events.get(event).size : 0;
        const once = this.onceEvents.has(event) ? this.onceEvents.get(event).size : 0;
        return regular + once;
    }

    /**
     * Obtenir tous les événements avec des listeners
     * @returns {string[]} Liste des événements
     */
    eventNames() {
        const names = new Set([
            ...this.events.keys(),
            ...this.onceEvents.keys()
        ]);
        return Array.from(names);
    }
}

// Instance globale
export const eventBus = new EventEmitter();

// Export de la classe pour créer des instances locales
export { EventEmitter };

// ============================================
// Helpers pour les événements courants
// ============================================

/**
 * Émettre un événement de chargement
 * @param {boolean} isLoading - État de chargement
 */
export function emitLoading(isLoading) {
    eventBus.emit('ui:loading', { isLoading });
}

/**
 * Émettre une notification toast
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification (success, error, warning, info)
 */
export function emitToast(message, type = 'info') {
    eventBus.emit('ui:toast', { message, type });
}

/**
 * Émettre une erreur
 * @param {string} source - Source de l'erreur
 * @param {Error|string} error - Erreur
 */
export function emitError(source, error) {
    eventBus.emit(`${source}:error`, {
        message: error instanceof Error ? error.message : error,
        error
    });
}
