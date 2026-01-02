/**
 * Centralized State Management
 * ============================
 *
 * Reactive store for application state
 */

import { eventBus } from './events.js';
import { EVENTS, STORAGE_KEYS } from './config.js';

// ============================================
// Initial State
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

        // Load saved preferences
        this._loadPersistedState();
    }

    /**
     * Get current state (read-only)
     * @returns {Object} Current state
     */
    get state() {
        return { ...this._state };
    }

    /**
     * Get a specific state value
     * @param {string} key - State key
     * @returns {*} Value
     */
    get(key) {
        return this._state[key];
    }

    /**
     * Update state
     * @param {Object} updates - Partial updates
     * @param {boolean} silent - If true, don't notify subscribers
     */
    set(updates, silent = false) {
        const prevState = { ...this._state };

        // Appliquer les mises à jour
        Object.entries(updates).forEach(([key, value]) => {
            if (Object.prototype.hasOwnProperty.call(this._state, key)) {
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
     * Reset state
     * @param {boolean} keepPreferences - Keep user preferences
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
     * Subscribe to state changes
     * @param {Function} callback - Function called on changes
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
        this._subscribers.add(callback);
        return () => this._subscribers.delete(callback);
    }

    /**
     * Watch a specific key for changes
     * @param {string} key - Key to watch
     * @param {Function} callback - Function called on changes
     * @returns {Function} Unsubscribe function
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
     * Get change history
     * @returns {Array} History
     */
    getHistory() {
        return [...this._history];
    }

    /**
     * Notify subscribers of changes
     * @param {Object} updates - Updates
     * @param {Object} prevState - Previous state
     */
    _notify(updates, prevState) {
        this._subscribers.forEach(callback => {
            try {
                callback(updates, this._state, prevState);
            } catch (error) {
                console.error('Error in state subscriber:', error);
            }
        });

        // Emit global event
        eventBus.emit(EVENTS.STATE_CHANGE, {
            updates,
            state: this.state,
            prevState
        });
    }

    /**
     * Notify all subscribers of full state
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
     * Load persisted state from localStorage
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
                    // Ignore if JSON is invalid
                }
            }
        } catch (error) {
            console.warn('Could not load persisted state:', error);
        }
    }

    /**
     * Persist certain state to localStorage
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
// Store singleton instance
// ============================================
export const store = new Store(initialState);

// ============================================
// Helpers for common updates
// ============================================

/**
 * Add a message to chat
 * @param {Object} message - Message to add
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
 * Set current industry
 * @param {Object} industry - Industry configuration
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
 * Set current scenario
 * @param {string} scenarioId - Scenario ID
 */
export function setCurrentScenario(scenarioId) {
    store.set({ currentScenario: scenarioId });
    eventBus.emit(EVENTS.SCENARIO_SELECT, scenarioId);
}

/**
 * Update demo stats
 * @param {Object} stats - Partial stats to update
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
 * Toggle theme
 */
export function toggleTheme() {
    const newTheme = store.get('theme') === 'dark' ? 'light' : 'dark';
    store.set({ theme: newTheme });
    document.body.classList.toggle('light-mode', newTheme === 'light');
}

// ============================================
// Export class for tests
// ============================================
export { Store };
