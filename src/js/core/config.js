/**
 * Central Application Configuration
 * ==================================
 *
 * All global constants and configurations
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
    carrier: 'AI Receptionist',
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
        voice: 'nova',
        model: 'tts-1-hd',
        speed: 1.0
    },
    speech: {
        lang: 'en-AU',
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
        label: 'All',
        icon: '🏢',
        order: 0
    },
    restaurant: {
        label: 'Food & Dining',
        icon: '🍽️',
        order: 1
    },
    health: {
        label: 'Health',
        icon: '🏥',
        order: 2
    },
    beauty: {
        label: 'Beauty',
        icon: '💅',
        order: 3
    },
    services: {
        label: 'Services',
        icon: '🔧',
        order: 4
    },
    commerce: {
        label: 'Retail',
        icon: '🛍️',
        order: 5
    },
    education: {
        label: 'Education',
        icon: '📚',
        order: 6
    },
    events: {
        label: 'Events',
        icon: '🎉',
        order: 7
    },
    animals: {
        label: 'Pets',
        icon: '🐾',
        order: 8
    }
};

// ============================================
// Quick Messages Templates
// ============================================
export const QUICK_MESSAGES = {
    greeting: 'Hi, I\'d like to make a booking',
    availability: 'What\'s your availability?',
    hours: 'What are your opening hours?',
    prices: 'What are your prices?',
    cancel: 'I need to cancel my appointment',
    confirm: 'I\'d like to confirm my booking',
    info: 'I need some information',
    emergency: 'It\'s urgent, can you help me?'
};

// ============================================
// Demo Scenarios
// ============================================
export const DEMO_SCENARIOS = {
    reservation: {
        id: 'reservation',
        label: 'Booking',
        icon: '📅',
        description: 'Make a booking or reservation'
    },
    information: {
        id: 'information',
        label: 'Information',
        icon: 'ℹ️',
        description: 'General information enquiry'
    },
    complaint: {
        id: 'complaint',
        label: 'Complaint',
        icon: '😤',
        description: 'Handle a customer complaint'
    },
    emergency: {
        id: 'emergency',
        label: 'Emergency',
        icon: '🚨',
        description: 'Urgent situation requiring immediate action'
    },
    followup: {
        id: 'followup',
        label: 'Follow-up',
        icon: '📞',
        description: 'Follow up on a previous enquiry'
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
    network: 'Connection error. Please check your internet connection.',
    api: 'Server error. Please try again.',
    timeout: 'Request timed out. Please try again.',
    audio: 'Unable to play audio. Please check your settings.',
    speech: 'Speech recognition is not available on this browser.',
    generic: 'An error occurred. Please try again.'
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
