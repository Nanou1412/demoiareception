/**
 * Audio Service
 * =============
 *
 * Text-to-Speech and audio playback management
 */

import { AUDIO_CONFIG, EVENTS, ERROR_MESSAGES } from '../core/config.js';
import { eventBus, emitError } from '../core/events.js';
import { store } from '../core/state.js';
import { getTextToSpeech } from './api.js';

// ============================================
// Audio Manager
// ============================================

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.currentAudio = null;
        this.audioQueue = [];
        this.isPlaying = false;
    }

    /**
     * Initialize audio context
     */
    async init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Resume if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    /**
     * Play text via TTS
     * @param {string} text - Text to read
     * @param {Object} options - Options
     * @returns {Promise<void>}
     */
    async speak(text, options = {}) {
        if (store.get('isMuted')) return;

        try {
            await this.init();
            store.set({ isSpeaking: true });
            eventBus.emit(EVENTS.AUDIO_PLAY, { text });

            // Get audio from API
            const audioBlob = await getTextToSpeech(text, {
                voice: options.voice || AUDIO_CONFIG.tts.voice,
                speed: options.speed || AUDIO_CONFIG.tts.speed
            });

            // Create and play audio
            const audioUrl = URL.createObjectURL(audioBlob);
            await this.playAudioUrl(audioUrl);

            // Clean up
            URL.revokeObjectURL(audioUrl);
            store.set({ isSpeaking: false });
            eventBus.emit(EVENTS.AUDIO_STOP);
        } catch (error) {
            store.set({ isSpeaking: false });
            emitError('audio', error);
            console.error('TTS error:', error);
        }
    }

    /**
     * Play audio file from URL
     * @param {string} url - Audio URL
     * @returns {Promise<void>}
     */
    playAudioUrl(url) {
        return new Promise((resolve, reject) => {
            this.stop(); // Stop previous audio

            this.currentAudio = new Audio(url);
            this.currentAudio.volume = store.get('volume');

            this.currentAudio.onended = () => {
                this.isPlaying = false;
                resolve();
            };

            this.currentAudio.onerror = () => {
                this.isPlaying = false;
                reject(new Error(ERROR_MESSAGES.audio));
            };

            this.isPlaying = true;
            this.currentAudio.play().catch(reject);
        });
    }

    /**
     * Play system sound
     * @param {string} soundName - Sound name (notification, success, error)
     */
    async playSound(soundName) {
        if (!AUDIO_CONFIG.sounds.enabled || store.get('isMuted')) return;

        const sounds = {
            notification: '/sounds/notification.mp3',
            success: '/sounds/success.mp3',
            error: '/sounds/error.mp3',
            click: '/sounds/click.mp3'
        };

        const soundUrl = sounds[soundName];
        if (soundUrl) {
            try {
                const audio = new Audio(soundUrl);
                audio.volume = AUDIO_CONFIG.sounds.volume;
                await audio.play();
            } catch {
                // Ignore system sound errors
            }
        }
    }

    /**
     * Stop current playback
     */
    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        this.isPlaying = false;
        store.set({ isSpeaking: false });
        eventBus.emit(EVENTS.AUDIO_STOP);
    }

    /**
     * Pause/resume playback
     */
    togglePause() {
        if (!this.currentAudio) return;

        if (this.currentAudio.paused) {
            this.currentAudio.play();
            this.isPlaying = true;
        } else {
            this.currentAudio.pause();
            this.isPlaying = false;
        }
    }

    /**
     * Set volume
     * @param {number} volume - Volume (0-1)
     */
    setVolume(volume) {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        store.set({ volume: clampedVolume });

        if (this.currentAudio) {
            this.currentAudio.volume = clampedVolume;
        }
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        const isMuted = !store.get('isMuted');
        store.set({ isMuted });

        if (isMuted && this.currentAudio) {
            this.stop();
        }
    }

    /**
     * Check if audio is available
     * @returns {boolean}
     */
    isAudioSupported() {
        return !!(window.AudioContext || window.webkitAudioContext);
    }
}

// Instance singleton
export const audioManager = new AudioManager();

// ============================================
// Exported helpers
// ============================================

export const speak = (text, options) => audioManager.speak(text, options);
export const stopAudio = () => audioManager.stop();
export const toggleMute = () => audioManager.toggleMute();
export const setVolume = (volume) => audioManager.setVolume(volume);
export const playSound = (name) => audioManager.playSound(name);
