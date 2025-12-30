/**
 * Services Module - Point d'entrée
 * =================================
 *
 * Exporte tous les services
 */

// API
export {
    sendMessage,
    resetChat,
    abortRequest,
    getTextToSpeech,
    healthCheck,
    apiClient
} from './api.js';

// Audio
export {
    audioManager,
    speak,
    stopAudio,
    toggleMute,
    setVolume,
    playSound
} from './audio.js';

// Speech Recognition
export {
    speechManager,
    startListening,
    stopListening,
    toggleListening,
    isListening,
    isSpeechSupported
} from './speech.js';

// Industries
export {
    industryManager,
    getIndustry,
    getAllIndustries,
    getIndustriesByCategory,
    getIndustryCategories,
    selectIndustry,
    searchIndustries,
    registerIndustry
} from './industries.js';
