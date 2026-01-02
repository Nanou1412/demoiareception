/**
 * API Service
 * ===========
 *
 * API calls management to Netlify functions
 */

import { API_CONFIG, EVENTS, ERROR_MESSAGES } from '../core/config.js';
import { eventBus, emitError } from '../core/events.js';
import { store, addMessage, updateDemoStats } from '../core/state.js';
import { retry, uuid } from '../core/utils.js';

// ============================================
// API Client
// ============================================

class ApiClient {
    constructor(config = API_CONFIG) {
        this.config = config;
        this.abortController = null;
    }

    /**
     * Build full URL
     * @param {string} endpoint - Endpoint
     * @returns {string}
     */
    buildUrl(endpoint) {
        return `${this.config.baseUrl}${endpoint}`;
    }

    /**
     * Perform a fetch request
     * @param {string} endpoint - Endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Response>}
     */
    async request(endpoint, options = {}) {
        this.abortController = new AbortController();
        const timeoutId = setTimeout(
            () => this.abortController.abort(),
            this.config.timeout
        );

        try {
            const response = await fetch(this.buildUrl(endpoint), {
                ...options,
                signal: this.abortController.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error(ERROR_MESSAGES.timeout);
            }

            throw error;
        }
    }

    /**
     * Cancel current request
     */
    abort() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }
}

// Singleton instance
const apiClient = new ApiClient();

// ============================================
// Chat API
// ============================================

/**
 * Send a message to chat
 * @param {string} message - User message
 * @param {Object} options - Options (industry, scenario, etc.)
 * @returns {Promise<Object>} AI response
 */
export async function sendMessage(message, options = {}) {
    const startTime = Date.now();

    // Get or create session ID
    let sessionId = store.get('sessionId');
    if (!sessionId) {
        sessionId = uuid();
        store.set({ sessionId });
    }

    const industryConfig = store.get('industryConfig');
    const scenario = store.get('currentScenario');

    // Ajouter le message utilisateur
    addMessage({
        role: 'user',
        content: message
    });

    // Indiquer qu'on attend une réponse
    store.set({ isWaitingResponse: true, isTyping: true });
    eventBus.emit(EVENTS.CHAT_MESSAGE, { message, sessionId });

    try {
        const response = await retry(
            async () => {
                const res = await apiClient.request(API_CONFIG.endpoints.chat, {
                    method: 'POST',
                    body: JSON.stringify({
                        message,
                        sessionId,
                        industry: industryConfig?.id || 'restaurant',
                        scenario: scenario || 'reservation',
                        businessName: industryConfig?.businessName || 'Demo',
                        ...options
                    })
                });
                return res.json();
            },
            API_CONFIG.retryAttempts,
            API_CONFIG.retryDelay
        );

        const responseTime = Date.now() - startTime;

        // Ajouter la réponse de l'IA
        addMessage({
            role: 'assistant',
            content: response.response || response.message
        });

        // Mettre à jour les stats
        updateDemoStats({
            responseTime,
            satisfaction: response.satisfaction || 95
        });

        store.set({ isWaitingResponse: false, isTyping: false });

        eventBus.emit(EVENTS.CHAT_RESPONSE, {
            response: response.response || response.message,
            responseTime,
            sessionId
        });

        return response;
    } catch (error) {
        store.set({ isWaitingResponse: false, isTyping: false });
        emitError('chat', error);
        eventBus.emit(EVENTS.CHAT_ERROR, { error, sessionId });

        throw error;
    }
}

/**
 * Reset conversation
 * @returns {Promise<void>}
 */
export async function resetChat() {
    const sessionId = store.get('sessionId');

    if (sessionId) {
        try {
            await apiClient.request(API_CONFIG.endpoints.reset, {
                method: 'POST',
                body: JSON.stringify({ sessionId })
            });
        } catch (error) {
            console.warn('Could not reset session on server:', error);
        }
    }

    // Reset local state
    store.set({
        messages: [],
        sessionId: null,
        demoStats: {
            messagesCount: 0,
            responseTime: 0,
            satisfaction: 0
        }
    });

    eventBus.emit(EVENTS.CHAT_RESET);
}

/**
 * Cancel current request
 */
export function abortRequest() {
    apiClient.abort();
    store.set({ isWaitingResponse: false, isTyping: false });
}

// ============================================
// TTS API
// ============================================

/**
 * Get TTS audio for text
 * @param {string} text - Text to convert
 * @param {Object} options - Options (voice, speed, etc.)
 * @returns {Promise<Blob>} Audio blob
 */
export async function getTextToSpeech(text, options = {}) {
    const response = await apiClient.request(API_CONFIG.endpoints.tts, {
        method: 'POST',
        body: JSON.stringify({
            text,
            voice: options.voice || 'nova',
            speed: options.speed || 1.0
        })
    });

    return response.blob();
}

// ============================================
// Health Check
// ============================================

/**
 * Check API availability
 * @returns {Promise<boolean>}
 */
export async function healthCheck() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/api/health`);
        return response.ok;
    } catch {
        return false;
    }
}

// Export instance for tests
export { apiClient };
