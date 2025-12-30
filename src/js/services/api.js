/**
 * Service API
 * ===========
 *
 * Gestion des appels API vers les fonctions Netlify
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
     * Construire l'URL complète
     * @param {string} endpoint - Endpoint
     * @returns {string}
     */
    buildUrl(endpoint) {
        return `${this.config.baseUrl}${endpoint}`;
    }

    /**
     * Effectuer une requête fetch
     * @param {string} endpoint - Endpoint
     * @param {Object} options - Options fetch
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
     * Annuler la requête en cours
     */
    abort() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }
}

// Instance singleton
const apiClient = new ApiClient();

// ============================================
// Chat API
// ============================================

/**
 * Envoyer un message au chat
 * @param {string} message - Message utilisateur
 * @param {Object} options - Options (industry, scenario, etc.)
 * @returns {Promise<Object>} Réponse de l'IA
 */
export async function sendMessage(message, options = {}) {
    const startTime = Date.now();
    
    // Obtenir ou créer l'ID de session
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
 * Réinitialiser la conversation
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
 * Annuler la requête en cours
 */
export function abortRequest() {
    apiClient.abort();
    store.set({ isWaitingResponse: false, isTyping: false });
}

// ============================================
// TTS API
// ============================================

/**
 * Obtenir l'audio TTS pour un texte
 * @param {string} text - Texte à convertir
 * @param {Object} options - Options (voice, speed, etc.)
 * @returns {Promise<Blob>} Audio blob
 */
export async function getTextToSpeech(text, options = {}) {
    const response = await apiClient.request(API_CONFIG.endpoints.tts, {
        method: 'POST',
        body: JSON.stringify({
            text,
            voice: options.voice || 'alloy',
            speed: options.speed || 1.0
        })
    });

    return response.blob();
}

// ============================================
// Health Check
// ============================================

/**
 * Vérifier la disponibilité de l'API
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

// Export de l'instance pour les tests
export { apiClient };
