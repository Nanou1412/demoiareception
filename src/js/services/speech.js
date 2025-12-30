/**
 * Service de Reconnaissance Vocale
 * =================================
 *
 * Gestion du Speech-to-Text via Web Speech API
 */

import { AUDIO_CONFIG, EVENTS, ERROR_MESSAGES, FEATURES } from '../core/config.js';
import { eventBus, emitError } from '../core/events.js';
import { store } from '../core/state.js';
import { supportsSpeechRecognition } from '../core/utils.js';

// ============================================
// Speech Recognition Manager
// ============================================

class SpeechManager {
    constructor() {
        this.recognition = null;
        this.isSupported = false;
        this.isListening = false;
        this.transcript = '';
        this.onResultCallback = null;
        this.onEndCallback = null;
    }

    /**
     * Initialiser la reconnaissance vocale
     * @returns {boolean} Succès de l'initialisation
     */
    init() {
        if (!FEATURES.speechRecognition) {
            console.warn('Speech recognition is disabled');
            return false;
        }

        if (!supportsSpeechRecognition()) {
            console.warn('Speech recognition is not supported in this browser');
            this.isSupported = false;
            return false;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        // Configuration
        this.recognition.lang = AUDIO_CONFIG.speech.lang;
        this.recognition.continuous = AUDIO_CONFIG.speech.continuous;
        this.recognition.interimResults = AUDIO_CONFIG.speech.interimResults;

        // Event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            store.set({ isListening: true });
            eventBus.emit(EVENTS.SPEECH_START);
        };

        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    finalTranscript += result[0].transcript;
                } else {
                    interimTranscript += result[0].transcript;
                }
            }

            this.transcript = finalTranscript || interimTranscript;

            eventBus.emit(EVENTS.SPEECH_RESULT, {
                transcript: this.transcript,
                isFinal: !!finalTranscript,
                confidence: event.results[0]?.[0]?.confidence || 0
            });

            if (finalTranscript && this.onResultCallback) {
                this.onResultCallback(finalTranscript);
            }
        };

        this.recognition.onerror = (event) => {
            this.isListening = false;
            store.set({ isListening: false });

            // Ne pas émettre d'erreur pour les annulations normales
            if (event.error !== 'aborted' && event.error !== 'no-speech') {
                emitError('speech', event.error);
                eventBus.emit(EVENTS.SPEECH_ERROR, { error: event.error });
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            store.set({ isListening: false });
            eventBus.emit(EVENTS.SPEECH_END, { transcript: this.transcript });

            if (this.onEndCallback) {
                this.onEndCallback(this.transcript);
            }
        };

        this.isSupported = true;
        return true;
    }

    /**
     * Démarrer l'écoute
     * @param {Object} options - Options
     * @returns {Promise<string>} Transcription
     */
    start(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isSupported && !this.init()) {
                reject(new Error(ERROR_MESSAGES.speech));
                return;
            }

            if (this.isListening) {
                this.stop();
            }

            this.transcript = '';
            this.onResultCallback = options.onResult || null;

            this.onEndCallback = (transcript) => {
                if (options.onEnd) options.onEnd(transcript);
                resolve(transcript);
            };

            try {
                this.recognition.start();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Arrêter l'écoute
     */
    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    /**
     * Annuler l'écoute (sans déclencher onend)
     */
    abort() {
        if (this.recognition && this.isListening) {
            this.recognition.abort();
        }
        this.transcript = '';
    }

    /**
     * Basculer l'écoute
     * @returns {boolean} Nouvel état (true = écoute)
     */
    toggle() {
        if (this.isListening) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }

    /**
     * Get supported languages
     * @returns {string[]} Languages
     */
    getSupportedLanguages() {
        // List of supported English locales
        return [
            'en-AU',
            'en-GB',
            'en-US',
            'en-NZ'
        ];
    }

    /**
     * Changer la langue
     * @param {string} lang - Code de langue
     */
    setLanguage(lang) {
        if (this.recognition) {
            this.recognition.lang = lang;
        }
    }
}

// Instance singleton
export const speechManager = new SpeechManager();

// ============================================
// Helpers exportés
// ============================================

export const startListening = (options) => speechManager.start(options);
export const stopListening = () => speechManager.stop();
export const toggleListening = () => speechManager.toggle();
export const isListening = () => speechManager.isListening;
export const isSpeechSupported = () => speechManager.isSupported || supportsSpeechRecognition();
