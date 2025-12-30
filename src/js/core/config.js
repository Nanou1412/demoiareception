/**
 * Configuration centrale de l'application
 * ========================================
 *
 * Toutes les constantes et configurations globales
 */

// ============================================
// API Configuration
// ============================================
export const API_CONFIG = {
    baseUrl: import.meta.env.PROD ? '' : 'http://localhost:3000',
    endpoints: {
        chat: '/.netlify/functions/chat',
        tts: '/.netlify/functions/chat-tts',
        reset: '/.netlify/functions/chat-reset'
    },
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
};

// ============================================
// Phone Simulation Configuration
// ============================================
export const PHONE_CONFIG = {
    carrier: 'IA Réceptionniste',
    defaultContact: 'Business',
    typingDelay: {
        min: 30,
        max: 60
    },
    messageDelay: {
        thinking: 1000,
        response: 500
    }
};

// ============================================
// Audio Configuration
// ============================================
export const AUDIO_CONFIG = {
    tts: {
        voice: 'alloy',
        model: 'tts-1-hd',
        speed: 1.0
    },
    speech: {
        lang: 'fr-FR',
        continuous: false,
        interimResults: true
    },
    sounds: {
        enabled: true,
        volume: 0.5
    }
};

// ============================================
// UI Configuration
// ============================================
export const UI_CONFIG = {
    animations: {
        duration: 300,
        easing: 'ease-out'
    },
    toast: {
        duration: 3000,
        position: 'bottom-right'
    },
    modal: {
        closeOnOverlay: true,
        closeOnEscape: true
    },
    scroll: {
        behavior: 'smooth',
        block: 'end'
    }
};

// ============================================
// Industry Categories
// ============================================
export const INDUSTRY_CATEGORIES = {
    all: {
        label: 'Tous',
        icon: '🏢',
        order: 0
    },
    restaurant: {
        label: 'Restauration',
        icon: '🍽️',
        order: 1
    },
    health: {
        label: 'Santé',
        icon: '🏥',
        order: 2
    },
    beauty: {
        label: 'Beauté',
        icon: '💅',
        order: 3
    },
    services: {
        label: 'Services',
        icon: '🔧',
        order: 4
    },
    commerce: {
        label: 'Commerce',
        icon: '🛍️',
        order: 5
    },
    education: {
        label: 'Éducation',
        icon: '📚',
        order: 6
    },
    events: {
        label: 'Événements',
        icon: '🎉',
        order: 7
    },
    animals: {
        label: 'Animaux',
        icon: '🐾',
        order: 8
    }
};

// ============================================
// Quick Messages Templates
// ============================================
export const QUICK_MESSAGES = {
    greeting: 'Bonjour, je souhaite prendre rendez-vous',
    availability: 'Quelles sont vos disponibilités ?',
    hours: 'Quels sont vos horaires d\'ouverture ?',
    prices: 'Quels sont vos tarifs ?',
    cancel: 'Je dois annuler mon rendez-vous',
    confirm: 'Je confirme ma réservation',
    info: 'J\'aurais besoin d\'informations',
    emergency: 'C\'est urgent, pouvez-vous m\'aider ?'
};

// ============================================
// Demo Scenarios
// ============================================
export const DEMO_SCENARIOS = {
    reservation: {
        id: 'reservation',
        label: 'Réservation',
        icon: '📅',
        description: 'Prise de rendez-vous ou réservation'
    },
    information: {
        id: 'information',
        label: 'Information',
        icon: 'ℹ️',
        description: 'Demande d\'informations générales'
    },
    complaint: {
        id: 'complaint',
        label: 'Réclamation',
        icon: '😤',
        description: 'Gestion d\'une réclamation client'
    },
    emergency: {
        id: 'emergency',
        label: 'Urgence',
        icon: '🚨',
        description: 'Situation urgente nécessitant une action immédiate'
    },
    followup: {
        id: 'followup',
        label: 'Suivi',
        icon: '📞',
        description: 'Suivi d\'une demande précédente'
    }
};

// ============================================
// Storage Keys
// ============================================
export const STORAGE_KEYS = {
    theme: 'ia-receptionist-theme',
    volume: 'ia-receptionist-volume',
    lastIndustry: 'ia-receptionist-last-industry',
    sessionId: 'ia-receptionist-session',
    preferences: 'ia-receptionist-preferences'
};

// ============================================
// Event Names
// ============================================
export const EVENTS = {
    // State events
    STATE_CHANGE: 'state:change',
    STATE_RESET: 'state:reset',
    
    // Chat events
    CHAT_START: 'chat:start',
    CHAT_MESSAGE: 'chat:message',
    CHAT_RESPONSE: 'chat:response',
    CHAT_ERROR: 'chat:error',
    CHAT_RESET: 'chat:reset',
    
    // Audio events
    AUDIO_PLAY: 'audio:play',
    AUDIO_STOP: 'audio:stop',
    AUDIO_ERROR: 'audio:error',
    
    // Speech events
    SPEECH_START: 'speech:start',
    SPEECH_RESULT: 'speech:result',
    SPEECH_END: 'speech:end',
    SPEECH_ERROR: 'speech:error',
    
    // UI events
    UI_MODAL_OPEN: 'ui:modal:open',
    UI_MODAL_CLOSE: 'ui:modal:close',
    UI_TOAST: 'ui:toast',
    UI_LOADING: 'ui:loading',
    
    // Industry events
    INDUSTRY_SELECT: 'industry:select',
    INDUSTRY_CHANGE: 'industry:change',
    
    // Scenario events
    SCENARIO_SELECT: 'scenario:select'
};

// ============================================
// Error Messages
// ============================================
export const ERROR_MESSAGES = {
    network: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
    api: 'Erreur du serveur. Veuillez réessayer.',
    timeout: 'La requête a pris trop de temps. Veuillez réessayer.',
    audio: 'Impossible de lire l\'audio. Veuillez vérifier vos paramètres.',
    speech: 'La reconnaissance vocale n\'est pas disponible sur ce navigateur.',
    generic: 'Une erreur est survenue. Veuillez réessayer.'
};

// ============================================
// Feature Flags
// ============================================
export const FEATURES = {
    tts: true,
    speechRecognition: true,
    analytics: import.meta.env.PROD,
    darkMode: true,
    notifications: true,
    offlineMode: false
};

// ============================================
// Debug Mode
// ============================================
export const DEBUG = !import.meta.env.PROD;

// ============================================
// Version
// ============================================
export const VERSION = '2.0.0';
