/**
 * Phone UI Component
 * ===================
 *
 * Phone simulator interface management
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
     * Initialize the component
     * @param {string|Element} container - Container or selector
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

        // Update time every minute
        setInterval(() => this._updateTime(), 60000);

        this.isInitialized = true;
    }

    /**
     * Generate phone HTML
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
                        <span class="call-status">On call</span>
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
                               placeholder="Type your message..."
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
     * Generate quick messages
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
     * Cache DOM elements
     * @param {Element} container - Container
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
     * Attach events
     */
    _bindEvents() {
        const { input, sendBtn, micBtn, muteBtn, endCallBtn, quickMessages } = this.elements;

        // Send message
        sendBtn.addEventListener('click', () => this._handleSend());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this._handleSend();
            }
        });

        // Microphone
        micBtn.addEventListener('click', () => this._handleMic());

        // Mute
        muteBtn.addEventListener('click', () => this._handleMute());

        // End call
        endCallBtn.addEventListener('click', () => this._handleEndCall());

        // Quick messages
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
     * Subscribe to state changes
     */
    _subscribeToState() {
        // Listen for new messages
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
     * Handle send message
     */
    async _handleSend() {
        const { input } = this.elements;
        const message = input.value.trim();

        if (!message || store.get('isWaitingResponse')) return;

        input.value = '';
        input.focus();

        try {
            const response = await sendMessage(message);

            // Speak response if not muted
            if (!store.get('isMuted') && response.response) {
                await speak(response.response);
            }
        } catch (error) {
            this._addErrorMessage('Sorry, an error occurred. Please try again.');
        }
    }

    /**
     * Handle microphone
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
     * Handle mute
     */
    _handleMute() {
        const isMuted = store.get('isMuted');
        store.set({ isMuted: !isMuted });

        if (!isMuted) {
            stopAudio();
        }
    }

    /**
     * Handle end call
     */
    _handleEndCall() {
        abortRequest();
        stopAudio();
        stopListening();

        eventBus.emit(EVENTS.CHAT_RESET);
    }

    /**
     * Render messages
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

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Add error message
     * @param {string} text - Error message
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
     * Toggle typing indicator
     * @param {boolean} show - Show or hide
     */
    _toggleTyping(show) {
        this.elements.typingIndicator.classList.toggle('hidden', !show);
        if (show) {
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        }
    }

    /**
     * Update mute button
     * @param {boolean} isMuted - Mute state
     */
    _updateMuteButton(isMuted) {
        this.elements.muteBtn.textContent = isMuted ? '🔇' : '🔊';
        this.elements.muteBtn.classList.toggle('active', isMuted);
    }

    /**
     * Update mic button
     * @param {boolean} isListening - Listening state
     */
    _updateMicButton(isListening) {
        this.elements.micBtn.classList.toggle('listening', isListening);
        this.elements.micBtn.textContent = isListening ? '⏹️' : '🎤';
    }

    /**
     * Update contact info
     * @param {Object} config - Industry configuration
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
     * Update time
     */
    _updateTime() {
        if (this.elements.phoneTime) {
            this.elements.phoneTime.textContent = formatTime();
        }
    }

    /**
     * Destroy component
     */
    destroy() {
        if (this.elements.container) {
            this.elements.container.innerHTML = '';
        }
        this.elements = {};
        this.isInitialized = false;
    }
}

// Singleton instance
export const phoneUI = new PhoneUI();

// Export class for tests
export { PhoneUI };
