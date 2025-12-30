// ============================================
// STATE MANAGEMENT
// ============================================

const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

const State = {
    currentIndustry: 'restaurant',
    currentScenario: 'normal',
    isDarkMode: true,
    messageCount: 0,
    orderTotal: 0,
    callStartTime: null,
    callTimerInterval: null,
    currentStep: 0,
    isAutoDemoMode: false,
    isSpeaking: false,
    currentAudio: null,
    isListening: false,
    recognition: null,
    sessionStats: {
        totalCalls: 0,
        completedCalls: 0,
        totalMessages: 0,
        totalCallTime: 0,
        industries: {}
    }
};

// ============================================
// DOM ELEMENTS (lazy cached)
// ============================================
const DOM = {
    get conversation() {
        return document.getElementById('conversation');
    },
    get userInput() {
        return document.getElementById('userInput');
    },
    get voiceBtn() {
        return document.getElementById('voiceBtn');
    },
    get sendBtn() {
        return document.getElementById('sendBtn');
    },
    get typingIndicator() {
        return document.getElementById('typingIndicator');
    },
    get callStatus() {
        return document.getElementById('callStatus');
    },
    get callTimer() {
        return document.getElementById('callTimer');
    },
    get processSteps() {
        return document.querySelectorAll('.process-step');
    },
    get processLines() {
        return document.querySelectorAll('.process-line');
    },
    get messageCountEl() {
        return document.getElementById('messageCount');
    },
    get orderTotalEl() {
        return document.getElementById('orderTotal');
    },
    get callDurationEl() {
        return document.getElementById('callDuration');
    },
    get stepInfoEl() {
        return document.getElementById('stepInfo');
    },
    get smsCard() {
        return document.getElementById('smsCard');
    },
    get ticketCard() {
        return document.getElementById('ticketCard');
    },
    get smsPreview() {
        return document.getElementById('smsPreview');
    },
    get ticketPreview() {
        return document.getElementById('ticketPreview');
    },
    get smsStatus() {
        return document.getElementById('smsStatus');
    },
    get ticketStatus() {
        return document.getElementById('ticketStatus');
    },
    get industryBtns() {
        return document.querySelectorAll('.industry-btn');
    },
    get waveformOverlay() {
        return document.getElementById('waveformOverlay');
    },
    get waveformLabel() {
        return document.getElementById('waveformLabel');
    }
};

// Export for use in other modules
window.AppState = { State, DOM, sessionId };
