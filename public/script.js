// ============================================
// AI Receptionist Demo - Main JavaScript
// ============================================

// Session ID for conversation
const sessionId = 'session_' + Date.now();

// DOM elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.querySelector('.btn-send');
const voiceBtn = document.querySelector('.btn-voice');
const resetBtn = document.querySelector('.btn-reset');
const transcriptContent = document.querySelector('.transcript-content');
const confirmationSection = document.querySelector('.confirmation-section');

// TTS and Audio
let currentAudio = null;
let isSpeaking = false;

// ============================================
// AUDIO & TTS
// ============================================

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
        updateVoiceButtonState();
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
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    const voices = synthesis.getVoices();
    const ausVoice = voices.find(v => v.lang === 'en-AU') || voices.find(v => v.lang.startsWith('en'));
    if (ausVoice) utterance.voice = ausVoice;
    
    utterance.onstart = () => { 
        isSpeaking = true; 
        updateVoiceButtonState();
    };
    utterance.onend = () => { 
        isSpeaking = false; 
        onAISpeakingEnd();
    };
    utterance.onerror = () => { 
        isSpeaking = false; 
        onAISpeakingEnd();
    };
    
    synthesis.speak(utterance);
}

// ============================================
// SPEECH RECOGNITION
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
        
        if (messageInput) {
            messageInput.value = finalTranscript + interimTranscript;
        }
        
        clearTimeout(silenceTimeout);
        
        if (finalTranscript.trim()) {
            silenceTimeout = setTimeout(() => {
                if (finalTranscript.trim() && !isSpeaking) {
                    const message = finalTranscript.trim();
                    finalTranscript = '';
                    interimTranscript = '';
                    if (messageInput) messageInput.value = '';
                    
                    pauseListening();
                    addMessage(message, false);
                    sendToAI(message);
                }
            }, 1500);
        }
    };

    recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        if (event.error === 'no-speech' && autoListenEnabled) {
            restartListening();
        }
    };

    recognition.onend = () => {
        isListening = false;
        updateVoiceButtonState();
        
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
            updateVoiceButtonState();
        } catch (e) {
            console.log('Recognition start error:', e);
        }
    }
}

function pauseListening() {
    if (recognition && isListening) {
        isListening = false;
        try {
            recognition.stop();
        } catch (e) {}
        updateVoiceButtonState();
    }
}

function stopListening() {
    autoListenEnabled = false;
    pauseListening();
}

function restartListening() {
    if (recognition && autoListenEnabled) {
        pauseListening();
        setTimeout(() => {
            if (autoListenEnabled && !isSpeaking) {
                startListening();
            }
        }, 300);
    }
}

function updateVoiceButtonState() {
    if (!voiceBtn) return;
    
    if (isListening) {
        voiceBtn.classList.add('listening');
        voiceBtn.innerHTML = '🔴 Listening...';
    } else if (isSpeaking) {
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '🔊 AI Speaking';
    } else {
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '🎤 Voice';
    }
}

function onAISpeakingEnd() {
    isSpeaking = false;
    updateVoiceButtonState();
    if (autoListenEnabled) {
        setTimeout(() => {
            startListening();
        }, 500);
    }
}

// ============================================
// MESSAGES & CHAT
// ============================================

function addMessage(text, isAI = true) {
    if (!messagesContainer) return;
    
    const message = document.createElement('div');
    message.className = `message ${isAI ? 'ai' : 'user'}`;
    message.textContent = text;
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to transcript
    addToTranscript(text, isAI);
}

function addTypingIndicator() {
    if (!messagesContainer) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(indicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// ============================================
// TRANSCRIPT
// ============================================

function addToTranscript(text, isAI = true) {
    if (!transcriptContent) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const entry = document.createElement('div');
    entry.className = 'transcript-entry';
    entry.innerHTML = `
        <span class="transcript-time">${time}</span>
        <div class="transcript-speaker ${isAI ? 'ai' : 'customer'}">
            <strong>${isAI ? '🤖 AI Receptionist' : '👤 Customer'}</strong>
            ${text}
        </div>
    `;
    
    transcriptContent.appendChild(entry);
    transcriptContent.scrollTop = transcriptContent.scrollHeight;
}

function clearTranscript() {
    if (transcriptContent) {
        transcriptContent.innerHTML = '';
    }
}

// ============================================
// API COMMUNICATION
// ============================================

async function sendToAI(message = null) {
    try {
        addTypingIndicator();
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, sessionId })
        });
        
        const data = await response.json();
        removeTypingIndicator();
        
        if (data.error) {
            addMessage('Error: ' + data.error, true);
            return;
        }
        
        addMessage(data.response, true);
        
        if (data.audio) {
            playAIAudio(data.audio);
        } else {
            speakTextFallback(data.response);
        }
        
        if (data.isConfirmed) {
            setTimeout(() => {
                showOrderConfirmed();
            }, 2000);
        }
        
    } catch (error) {
        removeTypingIndicator();
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
    } catch (e) {
        console.log('Reset error:', e);
    }
}

// ============================================
// DEMO SCENARIOS
// ============================================

const scenarios = {
    quick: {
        title: 'Quick Order',
        messages: [
            { delay: 500, text: "Hi, I'd like to place a quick order for pickup" },
            { delay: 3000, text: "One Grilled Halloumi Salad please" },
            { delay: 3000, text: "That's all, thanks" },
            { delay: 2000, text: "In about 20 minutes" },
            { delay: 2000, text: "Sarah" },
            { delay: 2000, text: "0412 345 678" }
        ]
    },
    full: {
        title: 'Full Conversation',
        messages: [
            { delay: 500, text: "G'day! I'd like to order some food for pickup" },
            { delay: 4000, text: "What do you recommend?" },
            { delay: 4000, text: "The Halloumi Salad sounds great, I'll take that" },
            { delay: 3000, text: "Can I add some Onion Rings as well?" },
            { delay: 3000, text: "And a Lemon Iced Tea" },
            { delay: 3000, text: "That's everything" },
            { delay: 2500, text: "12:30 would be perfect" },
            { delay: 2500, text: "Michael" },
            { delay: 2500, text: "0498 765 432" }
        ]
    },
    menu: {
        title: 'Menu Query',
        messages: [
            { delay: 500, text: "Hi there, can you tell me what's on the menu?" },
            { delay: 4000, text: "Do you have any vegetarian options?" },
            { delay: 3500, text: "What's in the Halloumi Salad?" },
            { delay: 3500, text: "Sounds delicious! I'll order that" },
            { delay: 2500, text: "Plus a Chocolate Brownie for dessert" },
            { delay: 2500, text: "That's all for me" },
            { delay: 2500, text: "1pm please" },
            { delay: 2000, text: "Emma" },
            { delay: 2000, text: "0423 111 222" }
        ]
    }
};

let scenarioRunning = false;

async function runScenario(scenarioKey) {
    if (scenarioRunning) return;
    scenarioRunning = true;
    
    const scenario = scenarios[scenarioKey];
    if (!scenario) return;
    
    // Clear and reset
    if (messagesContainer) messagesContainer.innerHTML = '';
    clearTranscript();
    await resetConversation();
    
    // Scroll to demo section
    document.querySelector('.demo-section')?.scrollIntoView({ behavior: 'smooth' });
    
    // Get initial AI greeting
    await sendToAI(null);
    
    // Run through scenario messages
    for (const msg of scenario.messages) {
        await new Promise(resolve => setTimeout(resolve, msg.delay));
        if (!scenarioRunning) break;
        
        addMessage(msg.text, false);
        await sendToAI(msg.text);
        
        // Wait for audio to finish
        await new Promise(resolve => {
            const checkAudio = setInterval(() => {
                if (!isSpeaking) {
                    clearInterval(checkAudio);
                    resolve();
                }
            }, 200);
        });
    }
    
    scenarioRunning = false;
}

function stopScenario() {
    scenarioRunning = false;
}

// ============================================
// ROI CALCULATOR
// ============================================

function calculateROI() {
    const employees = parseFloat(document.getElementById('roiEmployees')?.value) || 2;
    const calls = parseFloat(document.getElementById('roiCalls')?.value) || 50;
    const hourlyRate = parseFloat(document.getElementById('roiRate')?.value) || 25;
    
    // Assumptions:
    // - Average call duration: 3 minutes = 0.05 hours
    // - AI handles 100% of calls
    // - Monthly calculation
    
    const hoursPerMonth = calls * 30 * 0.05; // 3 min per call * 30 days
    const monthlySavings = hoursPerMonth * hourlyRate;
    const yearlySavings = monthlySavings * 12;
    
    const savingsElement = document.getElementById('savingsAmount');
    if (savingsElement) {
        savingsElement.textContent = '$' + Math.round(yearlySavings).toLocaleString();
    }
}

// ============================================
// ORDER CONFIRMATION
// ============================================

function showOrderConfirmed() {
    if (confirmationSection) {
        confirmationSection.classList.add('visible');
        confirmationSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update confirmation details
        updateConfirmationDetails();
    }
}

function updateConfirmationDetails() {
    const orderInfo = extractOrderFromChat();
    
    // Update SMS
    const smsBubble = document.querySelector('.sms-bubble');
    if (smsBubble) {
        smsBubble.innerHTML = `
            G'day ${orderInfo.name}! 🎉<br><br>
            Your order is confirmed:<br>
            ${orderInfo.items.map(item => `• ${item}`).join('<br>')}<br><br>
            Total: ${orderInfo.total}<br>
            📍 Pickup: ${orderInfo.pickupTime}<br><br>
            Thanks mate! See you soon 🙏
        `;
    }
    
    // Update Kitchen Ticket
    const orderNum = String(Math.floor(Math.random() * 900) + 100);
    
    const ticketOrderNum = document.querySelector('.order-number');
    if (ticketOrderNum) ticketOrderNum.textContent = '#' + orderNum;
    
    const pickupTime = document.querySelector('.pickup-time');
    if (pickupTime) pickupTime.textContent = orderInfo.pickupTime;
    
    const customerName = document.querySelector('.customer-name');
    if (customerName) customerName.textContent = orderInfo.name + ' • ' + orderInfo.phone;
    
    const ticketItems = document.querySelector('.ticket-items');
    if (ticketItems) {
        ticketItems.innerHTML = orderInfo.items.map(item => `
            <div class="ticket-item">
                <span class="qty">1x</span>
                <span class="name">${item}</span>
            </div>
        `).join('');
    }
}

function extractOrderFromChat() {
    if (!messagesContainer) {
        return { name: 'Customer', phone: '04XX XXX XXX', pickupTime: '12:30pm', items: ['Grilled Halloumi Salad'], total: '$17' };
    }
    
    const messages = messagesContainer.querySelectorAll('.message');
    let lastAIMessage = '';
    
    messages.forEach(msg => {
        if (msg.classList.contains('ai')) {
            lastAIMessage = msg.textContent;
        }
    });
    
    const userMessages = Array.from(messagesContainer.querySelectorAll('.message.user'));
    
    let name = 'Customer';
    let phone = '04XX XXX XXX';
    let pickupTime = '12:30pm';
    let items = ['Grilled Halloumi Salad'];
    let total = '$17';
    
    userMessages.forEach((msg, index) => {
        const text = msg.textContent;
        
        if (text.match(/04\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/) || text.match(/\d{10}/)) {
            phone = text.trim();
        } else if (text.match(/\d{1,2}[:.]\d{2}\s*(am|pm)?/i) || text.match(/\d{1,2}\s*(am|pm|o'clock)/i)) {
            pickupTime = text.trim();
        } else if (text.length < 30 && !text.match(/\d/) && index > 2) {
            name = text.trim();
        }
    });
    
    const menuItems = ['Grilled Halloumi Salad', 'Onion Rings', 'Chocolate Brownie', 'Lemon Iced Tea'];
    const prices = { 'Grilled Halloumi Salad': 17, 'Onion Rings': 6, 'Chocolate Brownie': 8, 'Lemon Iced Tea': 5 };
    const foundItems = [];
    
    menuItems.forEach(item => {
        if (lastAIMessage.toLowerCase().includes(item.toLowerCase())) {
            foundItems.push(item);
        }
    });
    
    if (foundItems.length > 0) {
        items = foundItems;
        let totalNum = 0;
        foundItems.forEach(item => { totalNum += prices[item] || 0; });
        total = '$' + totalNum;
    }
    
    return { name, phone, pickupTime, items, total };
}

// ============================================
// SMOOTH SCROLL
// ============================================

function scrollToDemo() {
    document.querySelector('.demo-section')?.scrollIntoView({ behavior: 'smooth' });
    
    // Start conversation mode
    if (messagesContainer && messagesContainer.children.length === 0) {
        autoListenEnabled = true;
        resetConversation().then(() => sendToAI(null));
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Send button
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const message = messageInput?.value?.trim();
            if (!message) return;
            
            addMessage(message, false);
            messageInput.value = '';
            sendToAI(message);
        });
    }
    
    // Enter key
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = messageInput.value.trim();
                if (!message) return;
                
                addMessage(message, false);
                messageInput.value = '';
                sendToAI(message);
            }
        });
    }
    
    // Voice button
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            if (autoListenEnabled) {
                autoListenEnabled = false;
                pauseListening();
            } else {
                autoListenEnabled = true;
                if (!isSpeaking) {
                    startListening();
                }
            }
            updateVoiceButtonState();
        });
    }
    
    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
            if (messagesContainer) messagesContainer.innerHTML = '';
            clearTranscript();
            stopScenario();
            await resetConversation();
            await sendToAI(null);
        });
    }
    
    // Scenario buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const scenario = btn.dataset.scenario;
            if (scenario) {
                runScenario(scenario);
            }
        });
    });
    
    // ROI Calculator inputs
    ['roiEmployees', 'roiCalls', 'roiRate'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateROI);
        }
    });
    
    // Initial ROI calculation
    calculateROI();
    
    // Try Demo button
    document.querySelectorAll('[onclick*="scrollToDemo"]').forEach(btn => {
        btn.removeAttribute('onclick');
        btn.addEventListener('click', scrollToDemo);
    });
    
    // CTA buttons
    const tryDemoBtn = document.querySelector('.btn-primary');
    if (tryDemoBtn && tryDemoBtn.textContent.includes('Try')) {
        tryDemoBtn.addEventListener('click', scrollToDemo);
    }
});

// ============================================
// EXPORTS FOR INLINE HANDLERS
// ============================================

window.scrollToDemo = scrollToDemo;
window.runScenario = runScenario;
window.calculateROI = calculateROI;
