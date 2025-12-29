// ============================================
// AI RECEPTIONIST - CLIENT PRESENTATION DEMO
// Version avec mode auto-démo et processus visuel
// ============================================

const sessionId = 'session_' + Date.now();

// ============================================
// DOM Elements
// ============================================
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const voiceBtn = document.getElementById('voiceBtn');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.querySelector('.typing-indicator');
const listeningIndicator = document.querySelector('.listening-indicator');

// Process bar elements
const processSteps = document.querySelectorAll('.process-step');
const stepLines = document.querySelectorAll('.step-line');

// Workflow steps
const workflowSteps = document.querySelectorAll('.workflow-step');

// Info panels
const processInfo = document.querySelector('.process-info');
const processInfoContent = document.querySelector('.process-info-content');

// Confirmation elements
const smsCard = document.getElementById('smsCard');
const kitchenCard = document.getElementById('kitchenCard');
const smsContent = document.getElementById('smsContent');
const ticketContent = document.getElementById('ticketContent');

// State
let currentProcessStep = 0;
let currentWorkflowStep = 0;
let isAutoDemoMode = false;
let autoDemoInterval = null;

// ============================================
// Audio & TTS
// ============================================
let currentAudio = null;
let isSpeaking = false;

function playAIAudio(audioBase64) {
    if (!audioBase64) return;
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    const audio = new Audio('data:audio/mp3;base64,' + audioBase64);
    currentAudio = audio;
    
    audio.onplay = () => { 
        isSpeaking = true;
        updateListeningUI('speaking');
    };
    audio.onended = () => { 
        isSpeaking = false;
        currentAudio = null;
        onAISpeakingEnd();
    };
    audio.onerror = () => { 
        isSpeaking = false;
        currentAudio = null;
        onAISpeakingEnd();
    };
    
    audio.play().catch(e => {
        console.log('Audio play failed:', e);
        onAISpeakingEnd();
    });
}

function speakTextFallback(text) {
    const synthesis = window.speechSynthesis;
    if (!synthesis) return;
    
    synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-AU';
    utterance.rate = 1.0;
    
    const voices = synthesis.getVoices();
    const ausVoice = voices.find(v => v.lang === 'en-AU') || voices.find(v => v.lang.startsWith('en'));
    if (ausVoice) utterance.voice = ausVoice;
    
    utterance.onstart = () => { 
        isSpeaking = true;
        updateListeningUI('speaking');
    };
    utterance.onend = () => { 
        isSpeaking = false;
        onAISpeakingEnd();
    };
    
    synthesis.speak(utterance);
}

// ============================================
// Speech Recognition
// ============================================
let recognition = null;
let isListening = false;
let autoListenEnabled = false;
let silenceTimeout = null;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-AU';

    let finalTranscript = '';
    let interimTranscript = '';

    recognition.onresult = (event) => {
        interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        
        if (userInput) userInput.value = finalTranscript + interimTranscript;
        
        clearTimeout(silenceTimeout);
        
        if (finalTranscript.trim()) {
            silenceTimeout = setTimeout(() => {
                if (finalTranscript.trim() && !isSpeaking) {
                    const message = finalTranscript.trim();
                    finalTranscript = '';
                    interimTranscript = '';
                    if (userInput) userInput.value = '';
                    
                    pauseListening();
                    handleSend(message);
                }
            }, 1500);
        }
    };

    recognition.onerror = (event) => {
        console.log('Speech error:', event.error);
        if (event.error === 'no-speech' && autoListenEnabled) {
            restartListening();
        }
    };

    recognition.onend = () => {
        isListening = false;
        updateListeningUI('ready');
        
        if (autoListenEnabled && !isSpeaking) {
            setTimeout(() => {
                if (autoListenEnabled && !isSpeaking) {
                    startListening();
                }
            }, 300);
        }
    };
}

function startListening() {
    if (recognition && !isListening && !isSpeaking) {
        try {
            isListening = true;
            recognition.start();
            updateListeningUI('listening');
        } catch (e) {
            console.log('Recognition start error:', e);
        }
    }
}

function pauseListening() {
    if (recognition && isListening) {
        isListening = false;
        try { recognition.stop(); } catch (e) {}
        updateListeningUI('ready');
    }
}

function restartListening() {
    pauseListening();
    setTimeout(() => {
        if (autoListenEnabled && !isSpeaking) {
            startListening();
        }
    }, 300);
}

function onAISpeakingEnd() {
    isSpeaking = false;
    updateListeningUI('ready');
    if (autoListenEnabled && !isAutoDemoMode) {
        setTimeout(startListening, 500);
    }
}

function updateListeningUI(state) {
    if (!listeningIndicator) return;
    
    if (state === 'listening') {
        listeningIndicator.classList.add('visible');
        if (voiceBtn) voiceBtn.classList.add('listening');
    } else if (state === 'speaking') {
        listeningIndicator.classList.remove('visible');
        if (voiceBtn) voiceBtn.classList.remove('listening');
    } else {
        listeningIndicator.classList.remove('visible');
        if (voiceBtn) voiceBtn.classList.remove('listening');
    }
}

// ============================================
// Process Bar Management
// ============================================
function updateProcessStep(step) {
    currentProcessStep = step;
    
    processSteps.forEach((ps, index) => {
        ps.classList.remove('active', 'completed');
        
        if (index < step) {
            ps.classList.add('completed');
        } else if (index === step) {
            ps.classList.add('active');
        }
    });
    
    stepLines.forEach((line, index) => {
        line.classList.remove('active', 'completed');
        
        if (index < step) {
            line.classList.add('completed');
        } else if (index === step) {
            line.classList.add('active');
        }
    });
    
    // Update process info content
    updateProcessInfo(step);
}

function updateProcessInfo(step) {
    if (!processInfoContent) return;
    
    const infos = [
        "📞 L'IA décroche automatiquement l'appel et accueille le client avec un ton naturel et chaleureux.",
        "💬 L'IA comprend les demandes du client, pose les bonnes questions et construit la commande étape par étape.",
        "✅ L'IA résume la commande, confirme les détails et génère les notifications automatiquement.",
        "🎉 Le processus est terminé ! SMS envoyé au client, ticket imprimé en cuisine."
    ];
    
    processInfoContent.textContent = infos[step] || infos[0];
}

// ============================================
// Workflow Steps Management
// ============================================
function updateWorkflowStep(step) {
    currentWorkflowStep = step;
    
    workflowSteps.forEach((ws, index) => {
        ws.classList.remove('active', 'completed');
        
        if (index < step) {
            ws.classList.add('completed');
        } else if (index === step) {
            ws.classList.add('active');
        }
    });
}

// ============================================
// Chat Functions
// ============================================
function addMessage(text, isAI = true) {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isAI ? 'ai' : 'user'}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${isAI ? '🤖' : '👤'}
        </div>
        <div class="message-content">${text}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Update workflow based on message content
    if (!isAI) {
        // User is responding
        updateWorkflowStep(Math.min(currentWorkflowStep + 1, 4));
    }
}

function showTyping() {
    if (typingIndicator) {
        typingIndicator.classList.add('visible');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function hideTyping() {
    if (typingIndicator) {
        typingIndicator.classList.remove('visible');
    }
}

// ============================================
// API Communication
// ============================================
async function sendToAI(message = null) {
    showTyping();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, sessionId })
        });
        
        const data = await response.json();
        hideTyping();
        
        if (data.error) {
            addMessage('Error: ' + data.error, true);
            return;
        }
        
        addMessage(data.response, true);
        
        // Progress the process based on conversation
        if (currentProcessStep === 0) {
            updateProcessStep(1);
        }
        
        if (data.audio) {
            playAIAudio(data.audio);
        } else {
            speakTextFallback(data.response);
        }
        
        if (data.isConfirmed) {
            showOrderConfirmation(data.response);
        }
        
    } catch (error) {
        hideTyping();
        addMessage('Connection error. Please try again.', true);
        console.error('Error:', error);
    }
}

async function resetConversation() {
    try {
        await fetch('/api/chat/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
        });
    } catch (e) {}
}

// ============================================
// Order Confirmation
// ============================================
function showOrderConfirmation(aiResponse) {
    // Update process to final step
    updateProcessStep(3);
    updateWorkflowStep(5);
    
    // Activate confirmation cards
    smsCard?.classList.add('active');
    kitchenCard?.classList.add('active');
    
    const cardStatuses = document.querySelectorAll('.card-status');
    cardStatuses.forEach(status => status.classList.add('ready'));
    
    // Generate SMS content
    if (smsContent) {
        smsContent.classList.remove('placeholder');
        smsContent.innerHTML = `
            <div class="sms-header">
                <i class="fas fa-check-circle"></i>
                <span>Aussie Bites Cafe</span>
            </div>
            G'day! 🎉<br><br>
            Your order is confirmed!<br><br>
            📍 Ready for pickup soon<br><br>
            Thanks mate! See you soon! 🙏
        `;
    }
    
    // Generate kitchen ticket
    if (ticketContent) {
        ticketContent.classList.remove('placeholder');
        const orderNum = Math.floor(Math.random() * 900) + 100;
        const now = new Date();
        
        ticketContent.innerHTML = `
            <div class="ticket-header">
                <h4>ORDER #${orderNum}</h4>
                <div class="order-number">${now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            <div class="ticket-items">
                <div class="ticket-item"><span>1x</span> Order Item</div>
            </div>
            <div class="ticket-time">
                <strong>PICKUP</strong>
                As requested
            </div>
        `;
    }
}

// ============================================
// Handle Send
// ============================================
function handleSend(message = null) {
    const text = message || userInput?.value?.trim();
    if (!text) return;
    
    addMessage(text, false);
    if (userInput) userInput.value = '';
    
    // Update process step
    if (currentProcessStep < 2) {
        updateProcessStep(2);
    }
    
    sendToAI(text);
}

// ============================================
// Auto-Demo Mode
// ============================================
const autodemoPhrases = [
    "Hi, I'd like to place an order for pickup please",
    "Can I get a Grilled Halloumi Salad",
    "And also some Onion Rings please",
    "12:30pm would be great",
    "My number is 0412 345 678",
    "Sarah",
    "Yes that's correct, thanks!"
];

let autodemoIndex = 0;

async function startAutoDemo() {
    isAutoDemoMode = true;
    autodemoIndex = 0;
    document.body.classList.add('auto-demo-active');
    
    // Reset conversation
    await resetConversation();
    if (chatMessages) chatMessages.innerHTML = '';
    
    // Reset process
    updateProcessStep(0);
    updateWorkflowStep(0);
    
    // Reset confirmation cards
    smsCard?.classList.remove('active');
    kitchenCard?.classList.remove('active');
    
    if (smsContent) {
        smsContent.classList.add('placeholder');
        smsContent.innerHTML = '<p class="sms-content placeholder">SMS will appear here when order is confirmed</p>';
    }
    if (ticketContent) {
        ticketContent.classList.add('placeholder');
        ticketContent.innerHTML = '<div class="ticket placeholder">Kitchen ticket will appear here when order is confirmed</div>';
    }
    
    // Start with AI greeting
    await sendToAI(null);
    
    // Schedule auto responses
    scheduleNextAutoResponse();
}

function scheduleNextAutoResponse() {
    if (!isAutoDemoMode || autodemoIndex >= autodemoPhrases.length) {
        isAutoDemoMode = false;
        document.body.classList.remove('auto-demo-active');
        return;
    }
    
    // Wait for AI to finish speaking, then respond
    const checkAndRespond = () => {
        if (!isSpeaking && !typingIndicator?.classList.contains('visible')) {
            setTimeout(() => {
                if (autodemoIndex < autodemoPhrases.length) {
                    handleSend(autodemoPhrases[autodemoIndex]);
                    autodemoIndex++;
                    
                    // Schedule next response after AI replies
                    setTimeout(scheduleNextAutoResponse, 3000);
                }
            }, 1500);
        } else {
            setTimeout(checkAndRespond, 500);
        }
    };
    
    setTimeout(checkAndRespond, 2000);
}

function stopAutoDemo() {
    isAutoDemoMode = false;
    document.body.classList.remove('auto-demo-active');
    if (autoDemoInterval) {
        clearInterval(autoDemoInterval);
        autoDemoInterval = null;
    }
}

// ============================================
// Interactive Mode
// ============================================
async function startInteractiveMode() {
    stopAutoDemo();
    autoListenEnabled = true;
    
    // Reset conversation
    await resetConversation();
    if (chatMessages) chatMessages.innerHTML = '';
    
    // Reset process
    updateProcessStep(0);
    updateWorkflowStep(0);
    
    // Reset confirmation cards
    smsCard?.classList.remove('active');
    kitchenCard?.classList.remove('active');
    
    if (smsContent) {
        smsContent.classList.add('placeholder');
        smsContent.innerHTML = '<p class="sms-content placeholder">SMS will appear here when order is confirmed</p>';
    }
    if (ticketContent) {
        ticketContent.classList.add('placeholder');
        ticketContent.innerHTML = '<div class="ticket placeholder">Kitchen ticket will appear here when order is confirmed</div>';
    }
    
    // Start with AI greeting
    await sendToAI(null);
    
    // Scroll to demo section
    document.querySelector('.demo-grid')?.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// ROI Calculator
// ============================================
function calculateROI() {
    const missedCalls = parseInt(document.getElementById('roiMissedCalls')?.value) || 0;
    const avgOrder = parseInt(document.getElementById('roiAvgOrder')?.value) || 0;
    const hourlyWage = parseInt(document.getElementById('roiHourlyWage')?.value) || 0;
    
    const monthlyRevenueLost = missedCalls * avgOrder * 30;
    const monthlyLaborSaved = hourlyWage * 4 * 30; // 4 hours/day saved
    const totalMonthlySavings = monthlyRevenueLost + monthlyLaborSaved;
    
    const results = document.getElementById('roiResults');
    if (results) {
        results.classList.add('visible');
        results.innerHTML = `
            <h3><i class="fas fa-chart-line"></i> Potential Monthly Impact</h3>
            <div class="roi-stat">
                <span>Recovered Revenue</span>
                <span>$${monthlyRevenueLost.toLocaleString()}</span>
            </div>
            <div class="roi-stat">
                <span>Labour Savings</span>
                <span>$${monthlyLaborSaved.toLocaleString()}</span>
            </div>
            <div class="roi-stat">
                <span><strong>Total Savings</strong></span>
                <span><strong>$${totalMonthlySavings.toLocaleString()}/mo</strong></span>
            </div>
        `;
    }
}

// ============================================
// Menu Toggle
// ============================================
function toggleMenu() {
    const menuSection = document.querySelector('.menu-section');
    menuSection?.classList.toggle('hidden');
}

// ============================================
// Modal Management
// ============================================
function openROIModal() {
    const modal = document.getElementById('roiModal');
    modal?.classList.add('visible');
}

function closeROIModal() {
    const modal = document.getElementById('roiModal');
    modal?.classList.remove('visible');
}

// ============================================
// Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Demo mode buttons
    document.querySelector('.demo-mode-btn.interactive')?.addEventListener('click', startInteractiveMode);
    document.querySelector('.demo-mode-btn.auto-demo')?.addEventListener('click', startAutoDemo);
    
    // Send button
    sendBtn?.addEventListener('click', () => handleSend());
    
    // Enter key
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
    
    // Voice button
    voiceBtn?.addEventListener('click', () => {
        if (autoListenEnabled && isListening) {
            autoListenEnabled = false;
            pauseListening();
        } else {
            autoListenEnabled = true;
            if (!isSpeaking) startListening();
        }
    });
    
    // Scenario buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.text;
            if (text) handleSend(text);
        });
    });
    
    // Menu toggle
    document.querySelector('.menu-toggle-btn')?.addEventListener('click', toggleMenu);
    
    // ROI Modal
    document.querySelector('.btn-roi')?.addEventListener('click', openROIModal);
    document.querySelector('.modal-close')?.addEventListener('click', closeROIModal);
    document.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) closeROIModal();
    });
    
    // ROI Calculator
    document.querySelector('.btn-calculate')?.addEventListener('click', calculateROI);
    
    // Initialize process bar
    updateProcessStep(0);
    updateWorkflowStep(0);
    
    // Initial info
    updateProcessInfo(0);
});
