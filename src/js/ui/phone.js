/**
 * Composant Phone UI
 * ===================
 *
 * Gestion de l'interface du simulateur de téléphone
 */

import { PHONE_CONFIG, EVENTS, QUICK_MESSAGES } from '../core/config.js';
import { eventBus } from '../core/events.js';
import { store } from '../core/state.js';
import { $, createElement, formatTime, escapeHtml } from '../core/utils.js';
import { sendMessage, abortRequest } from '../services/api.js';
import { speak, stopAudio } from '../services/audio.js';
import { startListening, stopListening } from '../services/speech.js';

// ============================================
// Phone UI Manager
// ============================================

class PhoneUI {
    constructor() {
        this.elements = {};
        this.isInitialized = false;
    }

    /**
     * Initialiser le composant
     * @param {string|Element} container - Conteneur ou sélecteur
     */
    init(container) {
        const el = typeof container === 'string' ? $(container) : container;
        if (!el) {
            console.error('Phone container not found');
            return;
        }

        el.innerHTML = this._render();
        this._cacheElements(el);
        this._bindEvents();
        this._subscribeToState();
        this._updateTime();

        // Mettre à jour l'heure toutes les minutes
        setInterval(() => this._updateTime(), 60000);

        this.isInitialized = true;
    }

    /**
     * Générer le HTML du téléphone
     * @returns {string}
     */
    _render() {
        const industryConfig = store.get('industryConfig');
        const contactName = industryConfig?.businessName || PHONE_CONFIG.defaultContact;

        return `
            <div class="phone-frame">
                <div class="phone-notch"></div>
                
                <div class="phone-header">
                    <div class="phone-time">${formatTime()}</div>
                    <div class="phone-status">
                        <span class="signal">📶</span>
                        <span class="battery">🔋</span>
                    </div>
                </div>

                <div class="call-header">
                    <div class="contact-avatar">
                        <span class="avatar-icon">${industryConfig?.icon || '👤'}</span>
                    </div>
                    <div class="contact-info">
                        <span class="contact-name">${escapeHtml(contactName)}</span>
                        <span class="call-status">En appel</span>
                    </div>
                </div>

                <div class="phone-screen">
                    <div class="messages-container" id="messages"></div>
                    <div class="typing-indicator hidden" id="typingIndicator">
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div class="quick-messages" id="quickMessages">
                    ${this._renderQuickMessages()}
                </div>

                <div class="phone-controls">
                    <div class="input-area">
                        <input type="text" 
                               id="messageInput" 
                               class="message-input" 
                               placeholder="Écrivez votre message..."
                               autocomplete="off">
                        <button class="control-btn mic-btn" id="micBtn" title="Parler">
                            🎤
                        </button>
                        <button class="control-btn send-btn" id="sendBtn" title="Envoyer">
                            📤
                        </button>
                    </div>
                    
                    <div class="control-buttons">
                        <button class="control-btn" id="muteBtn" title="Muet">
                            🔊
                        </button>
                        <button class="control-btn end-call-btn" id="endCallBtn" title="Raccrocher">
                            📞
                        </button>
                        <button class="control-btn" id="speakerBtn" title="Haut-parleur">
                            📢
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Générer les messages rapides
     * @returns {string}
     */
    _renderQuickMessages() {
        return Object.entries(QUICK_MESSAGES).slice(0, 4).map(([_key, text]) => `
            <button class="quick-btn" data-message="${escapeHtml(text)}">
                ${escapeHtml(text.substring(0, 30))}${text.length > 30 ? '...' : ''}
            </button>
        `).join('');
    }

    /**
     * Mettre en cache les éléments DOM
     * @param {Element} container - Conteneur
     */
    _cacheElements(container) {
        this.elements = {
            container,
            messages: $('#messages', container),
            input: $('#messageInput', container),
            sendBtn: $('#sendBtn', container),
            micBtn: $('#micBtn', container),
            muteBtn: $('#muteBtn', container),
            endCallBtn: $('#endCallBtn', container),
            speakerBtn: $('#speakerBtn', container),
            typingIndicator: $('#typingIndicator', container),
            quickMessages: $('#quickMessages', container),
            contactName: $('.contact-name', container),
            contactAvatar: $('.avatar-icon', container),
            phoneTime: $('.phone-time', container)
        };
    }

    /**
     * Attacher les événements
     */
    _bindEvents() {
        const { input, sendBtn, micBtn, muteBtn, endCallBtn, quickMessages } = this.elements;

        // Envoi de message
        sendBtn.addEventListener('click', () => this._handleSend());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this._handleSend();
            }
        });

        // Micro
        micBtn.addEventListener('click', () => this._handleMic());

        // Muet
        muteBtn.addEventListener('click', () => this._handleMute());

        // Fin d'appel
        endCallBtn.addEventListener('click', () => this._handleEndCall());

        // Messages rapides
        quickMessages.addEventListener('click', (e) => {
            const btn = e.target.closest('.quick-btn');
            if (btn) {
                const message = btn.dataset.message;
                if (message) {
                    input.value = message;
                    this._handleSend();
                }
            }
        });
    }

    /**
     * S'abonner aux changements d'état
     */
    _subscribeToState() {
        // Écouter les nouveaux messages
        store.subscribe((updates) => {
            if ('messages' in updates) {
                this._renderMessages();
            }
            if ('isTyping' in updates) {
                this._toggleTyping(updates.isTyping);
            }
            if ('isMuted' in updates) {
                this._updateMuteButton(updates.isMuted);
            }
            if ('isListening' in updates) {
                this._updateMicButton(updates.isListening);
            }
            if ('industryConfig' in updates && updates.industryConfig) {
                this._updateContact(updates.industryConfig);
            }
        });
    }

    /**
     * Gérer l'envoi de message
     */
    async _handleSend() {
        const { input } = this.elements;
        const message = input.value.trim();

        if (!message || store.get('isWaitingResponse')) return;

        input.value = '';
        input.focus();

        try {
            const response = await sendMessage(message);

            // Lire la réponse si non muet
            if (!store.get('isMuted') && response.response) {
                await speak(response.response);
            }
        } catch (error) {
            this._addErrorMessage('Désolé, une erreur est survenue. Veuillez réessayer.');
        }
    }

    /**
     * Gérer le micro
     */
    async _handleMic() {
        const isListening = store.get('isListening');

        if (isListening) {
            stopListening();
        } else {
            try {
                const transcript = await startListening({
                    onResult: (text) => {
                        this.elements.input.value = text;
                    }
                });

                if (transcript) {
                    this.elements.input.value = transcript;
                    this._handleSend();
                }
            } catch (error) {
                console.error('Speech recognition error:', error);
            }
        }
    }

    /**
     * Gérer le muet
     */
    _handleMute() {
        const isMuted = store.get('isMuted');
        store.set({ isMuted: !isMuted });

        if (!isMuted) {
            stopAudio();
        }
    }

    /**
     * Gérer la fin d'appel
     */
    _handleEndCall() {
        abortRequest();
        stopAudio();
        stopListening();

        eventBus.emit(EVENTS.CHAT_RESET);
    }

    /**
     * Afficher les messages
     */
    _renderMessages() {
        const { messages: container } = this.elements;
        const messages = store.get('messages');

        container.innerHTML = messages.map(msg => `
            <div class="message ${msg.role === 'user' ? 'user-message' : 'ai-message'}">
                <div class="message-content">${escapeHtml(msg.content)}</div>
                <div class="message-time">${formatTime(new Date(msg.timestamp))}</div>
            </div>
        `).join('');

        // Scroll vers le bas
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Ajouter un message d'erreur
     * @param {string} text - Message d'erreur
     */
    _addErrorMessage(text) {
        const { messages: container } = this.elements;
        const errorDiv = createElement('div', {
            className: 'message error-message'
        }, text);

        container.appendChild(errorDiv);
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Basculer l'indicateur de frappe
     * @param {boolean} show - Afficher ou non
     */
    _toggleTyping(show) {
        this.elements.typingIndicator.classList.toggle('hidden', !show);
        if (show) {
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        }
    }

    /**
     * Mettre à jour le bouton muet
     * @param {boolean} isMuted - État muet
     */
    _updateMuteButton(isMuted) {
        this.elements.muteBtn.textContent = isMuted ? '🔇' : '🔊';
        this.elements.muteBtn.classList.toggle('active', isMuted);
    }

    /**
     * Mettre à jour le bouton micro
     * @param {boolean} isListening - En écoute
     */
    _updateMicButton(isListening) {
        this.elements.micBtn.classList.toggle('listening', isListening);
        this.elements.micBtn.textContent = isListening ? '⏹️' : '🎤';
    }

    /**
     * Mettre à jour les infos de contact
     * @param {Object} config - Configuration de l'industrie
     */
    _updateContact(config) {
        if (this.elements.contactName) {
            this.elements.contactName.textContent = config.businessName || config.name;
        }
        if (this.elements.contactAvatar) {
            this.elements.contactAvatar.textContent = config.icon || '👤';
        }
    }

    /**
     * Mettre à jour l'heure
     */
    _updateTime() {
        if (this.elements.phoneTime) {
            this.elements.phoneTime.textContent = formatTime();
        }
    }

    /**
     * Détruire le composant
     */
    destroy() {
        if (this.elements.container) {
            this.elements.container.innerHTML = '';
        }
        this.elements = {};
        this.isInitialized = false;
    }
}

// Instance singleton
export const phoneUI = new PhoneUI();

// Export de la classe pour les tests
export { PhoneUI };
