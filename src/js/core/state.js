/**
 * Gestion d'état centralisée
 * ==========================
 * 
 * Store réactif pour l'état de l'application
 */

import { eventBus } from './events.js';
import { EVENTS, STORAGE_KEYS } from './config.js';

// ============================================
// État initial
// ============================================
const initialState = {
    // Session
    sessionId: null,
    isInitialized: false,

    // Industry
    currentIndustry: null,
    industryConfig: null,

    // Scenario
    currentScenario: 'reservation',

    // Chat
    messages: [],
    isTyping: false,
    isWaitingResponse: false,

    // Audio
    isSpeaking: false,
    isListening: false,
    isMuted: false,
    volume: 0.8,

    // UI
    isLoading: false,
    activeModal: null,
    theme: 'dark',

    // Demo
    demoStats: {
        messagesCount: 0,
        responseTime: 0,
        satisfaction: 0
    }
};

// ============================================
// Store Class
// ============================================
class Store {
    constructor(initial) {
        this._state = { ...initial };
        this._subscribers = new Set();
        this._history = [];
        this._maxHistory = 50;

        // Charger les préférences sauvegardées
        this._loadPersistedState();
    }

    /**
     * Obtenir l'état actuel (lecture seule)
     * @returns {Object} État actuel
     */
    get state() {
        return { ...this._state };
    }

    /**
     * Obtenir une valeur spécifique de l'état
     * @param {string} key - Clé de l'état
     * @returns {*} Valeur
     */
    get(key) {
        return this._state[key];
    }

    /**
     * Mettre à jour l'état
     * @param {Object} updates - Mises à jour partielles
     * @param {boolean} silent - Si true, ne pas notifier les subscribers
     */
    set(updates, silent = false) {
        const prevState = { ...this._state };
        
        // Appliquer les mises à jour
        Object.entries(updates).forEach(([key, value]) => {
            if (this._state.hasOwnProperty(key)) {
                this._state[key] = value;
            }
        });

        // Sauvegarder dans l'historique
        this._history.push({
            timestamp: Date.now(),
            prevState,
            updates
        });

        // Limiter la taille de l'historique
        if (this._history.length > this._maxHistory) {
            this._history.shift();
        }

        // Persister certains états
        this._persistState();

        // Notifier les changements
        if (!silent) {
            this._notify(updates, prevState);
        }
    }

    /**
     * Réinitialiser l'état
     * @param {boolean} keepPreferences - Garder les préférences utilisateur
     */
    reset(keepPreferences = true) {
        const preserved = keepPreferences ? {
            theme: this._state.theme,
            volume: this._state.volume,
            isMuted: this._state.isMuted
        } : {};

        this._state = {
            ...initialState,
            ...preserved
        };

        this._history = [];
        
        eventBus.emit(EVENTS.STATE_RESET, this.state);
        this._notifyAll();
    }

    /**
     * S'abonner aux changements d'état
     * @param {Function} callback - Fonction appelée lors des changements
     * @returns {Function} Fonction de désabonnement
     */
    subscribe(callback) {
        this._subscribers.add(callback);
        return () => this._subscribers.delete(callback);
    }

    /**
     * S'abonner aux changements d'une clé spécifique
     * @param {string} key - Clé à surveiller
     * @param {Function} callback - Fonction appelée lors des changements
     * @returns {Function} Fonction de désabonnement
     */
    watch(key, callback) {
        const watcher = (updates) => {
            if (key in updates) {
                callback(updates[key], this._state);
            }
        };
        return this.subscribe(watcher);
    }

    /**
     * Obtenir l'historique des changements
     * @returns {Array} Historique
     */
    getHistory() {
        return [...this._history];
    }

    /**
     * Notifier les subscribers des changements
     * @param {Object} updates - Mises à jour
     * @param {Object} prevState - État précédent
     */
    _notify(updates, prevState) {
        this._subscribers.forEach(callback => {
            try {
                callback(updates, this._state, prevState);
            } catch (error) {
                console.error('Error in state subscriber:', error);
            }
        });

        // Émettre l'événement global
        eventBus.emit(EVENTS.STATE_CHANGE, {
            updates,
            state: this.state,
            prevState
        });
    }

    /**
     * Notifier tous les subscribers de l'état complet
     */
    _notifyAll() {
        const fullState = this.state;
        this._subscribers.forEach(callback => {
            try {
                callback(fullState, fullState, {});
            } catch (error) {
                console.error('Error in state subscriber:', error);
            }
        });
    }

    /**
     * Charger l'état persisté depuis le localStorage
     */
    _loadPersistedState() {
        try {
            const theme = localStorage.getItem(STORAGE_KEYS.theme);
            const volume = localStorage.getItem(STORAGE_KEYS.volume);
            const lastIndustry = localStorage.getItem(STORAGE_KEYS.lastIndustry);

            if (theme) this._state.theme = theme;
            if (volume) this._state.volume = parseFloat(volume);
            if (lastIndustry) {
                try {
                    this._state.currentIndustry = JSON.parse(lastIndustry);
                } catch {
                    // Ignorer si le JSON est invalide
                }
            }
        } catch (error) {
            console.warn('Could not load persisted state:', error);
        }
    }

    /**
     * Persister certains états dans le localStorage
     */
    _persistState() {
        try {
            localStorage.setItem(STORAGE_KEYS.theme, this._state.theme);
            localStorage.setItem(STORAGE_KEYS.volume, String(this._state.volume));
            
            if (this._state.currentIndustry) {
                localStorage.setItem(
                    STORAGE_KEYS.lastIndustry,
                    JSON.stringify(this._state.currentIndustry)
                );
            }
        } catch (error) {
            console.warn('Could not persist state:', error);
        }
    }
}

// ============================================
// Instance singleton du store
// ============================================
export const store = new Store(initialState);

// ============================================
// Helpers pour les mises à jour courantes
// ============================================

/**
 * Ajouter un message au chat
 * @param {Object} message - Message à ajouter
 */
export function addMessage(message) {
    const messages = [...store.get('messages'), {
        ...message,
        id: Date.now(),
        timestamp: new Date().toISOString()
    }];
    
    store.set({
        messages,
        demoStats: {
            ...store.get('demoStats'),
            messagesCount: messages.length
        }
    });
}

/**
 * Définir l'industrie courante
 * @param {Object} industry - Configuration de l'industrie
 */
export function setCurrentIndustry(industry) {
    store.set({
        currentIndustry: industry.id,
        industryConfig: industry,
        messages: [], // Reset chat
        sessionId: null
    });

    eventBus.emit(EVENTS.INDUSTRY_SELECT, industry);
}

/**
 * Définir le scénario courant
 * @param {string} scenarioId - ID du scénario
 */
export function setCurrentScenario(scenarioId) {
    store.set({ currentScenario: scenarioId });
    eventBus.emit(EVENTS.SCENARIO_SELECT, scenarioId);
}

/**
 * Mettre à jour les stats de démo
 * @param {Object} stats - Stats partielles à mettre à jour
 */
export function updateDemoStats(stats) {
    store.set({
        demoStats: {
            ...store.get('demoStats'),
            ...stats
        }
    });
}

/**
 * Basculer le thème
 */
export function toggleTheme() {
    const newTheme = store.get('theme') === 'dark' ? 'light' : 'dark';
    store.set({ theme: newTheme });
    document.body.classList.toggle('light-mode', newTheme === 'light');
}

// ============================================
// Export de la classe pour les tests
// ============================================
export { Store };
