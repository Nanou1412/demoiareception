// ============================================
// AI Receptionist Demo - JavaScript
// ============================================

const sessionId = 'session_' + Date.now();

// DOM Elements
const landing = document.getElementById('landing');
const chatSection = document.getElementById('chatSection');
const orderSaved = document.getElementById('orderSaved');
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const voiceBtn = document.getElementById('voiceBtn');
const sendBtn = document.getElementById('sendBtn');
const startBtn = document.getElementById('startBtn');
const startBtn2 = document.getElementById('startBtn2');
const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const listeningIndicator = document.getElementById('listeningIndicator');
const listeningText = listeningIndicator?.querySelector('.listening-text');
const liveTranscript = document.getElementById('liveTranscript');
const transcriptText = document.getElementById('transcriptText');
const notificationSound = document.getElementById('notificationSound');

// ROI Calculator Elements
const missedCallsSlider = document.getElementById('missedCalls');
const avgOrderSlider = document.getElementById('avgOrder');

// Audio & TTS
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

function playNotificationSound() {
    if (notificationSound) {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(() => {});
    }
}

// Speech Recognition
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
        
        // Update input and live transcript
        if (userInput) userInput.value = finalTranscript + interimTranscript;
        if (transcriptText) transcriptText.textContent = finalTranscript + interimTranscript;
        if (liveTranscript && (finalTranscript || interimTranscript)) {
            liveTranscript.classList.remove('hidden');
        }
        
        clearTimeout(silenceTimeout);
        
        if (finalTranscript.trim()) {
            silenceTimeout = setTimeout(() => {
                if (finalTranscript.trim() && !isSpeaking) {
                    const message = finalTranscript.trim();
                    finalTranscript = '';
                    interimTranscript = '';
                    if (userInput) userInput.value = '';
                    if (liveTranscript) liveTranscript.classList.add('hidden');
                    
                    pauseListening();
                    addBubble(message, false);
                    sendToAI(message);
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
    if (autoListenEnabled) {
        setTimeout(startListening, 500);
    }
}

function updateListeningUI(state) {
    if (!listeningIndicator) return;
    
    listeningIndicator.classList.remove('active', 'speaking');
    
    if (state === 'listening') {
        listeningIndicator.classList.add('active');
        if (listeningText) listeningText.textContent = 'Listening...';
        if (voiceBtn) {
            voiceBtn.classList.add('listening');
            voiceBtn.querySelector('.mic-icon').textContent = '🔴';
        }
    } else if (state === 'speaking') {
        listeningIndicator.classList.add('speaking');
        if (listeningText) listeningText.textContent = 'AI speaking...';
        if (voiceBtn) {
            voiceBtn.classList.remove('listening');
            voiceBtn.querySelector('.mic-icon').textContent = '🔊';
        }
    } else {
        if (listeningText) listeningText.textContent = autoListenEnabled ? 'Ready to listen' : 'Click mic to speak';
        if (voiceBtn) {
            voiceBtn.classList.remove('listening');
            voiceBtn.querySelector('.mic-icon').textContent = '🎤';
        }
    }
}

// Chat Functions
function addBubble(text, isAI = true) {
    if (!chatContainer) return;
    
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isAI ? 'ai' : 'user'}`;
    bubble.textContent = text;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Hide quick scenarios after first message
    const quickScenarios = document.getElementById('quickScenarios');
    if (quickScenarios && !isAI) {
        quickScenarios.style.display = 'none';
    }
}

function addLoadingBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ai loading';
    bubble.id = 'loadingBubble';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeLoadingBubble() {
    const loading = document.getElementById('loadingBubble');
    if (loading) loading.remove();
}

// API Communication
async function sendToAI(message = null) {
    if (listeningText) listeningText.textContent = 'AI thinking...';
    
    try {
        addLoadingBubble();
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, sessionId })
        });
        
        const data = await response.json();
        removeLoadingBubble();
        
        if (data.error) {
            addBubble('Error: ' + data.error, true);
            return;
        }
        
        addBubble(data.response, true);
        
        if (data.audio) {
            playAIAudio(data.audio);
        } else {
            speakTextFallback(data.response);
        }
        
        if (data.isConfirmed) {
            playNotificationSound();
            setTimeout(showOrderConfirmed, 2000);
        }
        
    } catch (error) {
        removeLoadingBubble();
        addBubble('Connection error. Please try again.', true);
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

// Order Confirmation
function showOrderConfirmed() {
    if (!chatSection || !orderSaved) return;
    
    chatSection.classList.add('hidden');
    orderSaved.classList.remove('hidden');
    
    const orderInfo = extractOrderFromChat();
    updateConfirmationUI(orderInfo);
}

function extractOrderFromChat() {
    const bubbles = chatContainer?.querySelectorAll('.chat-bubble') || [];
    let lastAIMessage = '';
    
    bubbles.forEach(bubble => {
        if (bubble.classList.contains('ai')) {
            lastAIMessage = bubble.textContent;
        }
    });
    
    const userBubbles = Array.from(chatContainer?.querySelectorAll('.chat-bubble.user') || []);
    
    let name = 'Customer';
    let phone = '04XX XXX XXX';
    let pickupTime = '12:30pm';
    let items = ['Grilled Halloumi Salad'];
    let total = '$17';
    
    userBubbles.forEach((bubble, index) => {
        const text = bubble.textContent;
        
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

function updateConfirmationUI(info) {
    // Order Card
    const orderCard = document.getElementById('orderCard');
    if (orderCard) {
        orderCard.innerHTML = `
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Mobile:</strong> ${info.phone}</p>
            <p><strong>Pickup:</strong> ${info.pickupTime}</p>
            <p><strong>Items:</strong></p>
            <ul class="items-list">
                ${info.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p class="total">Total: ${info.total}</p>
        `;
    }
    
    // SMS Bubble
    const smsBubble = document.getElementById('smsBubble');
    if (smsBubble) {
        smsBubble.innerHTML = `
            G'day ${info.name}! 🎉<br><br>
            Your order is confirmed:<br>
            ${info.items.map(item => `• ${item}`).join('<br>')}<br><br>
            Total: ${info.total}<br>
            📍 Pickup: ${info.pickupTime}<br><br>
            Thanks mate! 🙏
        `;
    }
    
    // Kitchen Ticket
    const orderNum = Math.floor(Math.random() * 900) + 100;
    const now = new Date();
    
    if (document.getElementById('ticketOrderNum')) {
        document.getElementById('ticketOrderNum').textContent = orderNum;
    }
    if (document.getElementById('ticketPickupTime')) {
        document.getElementById('ticketPickupTime').textContent = info.pickupTime;
    }
    if (document.getElementById('ticketCustomerName')) {
        document.getElementById('ticketCustomerName').textContent = info.name;
    }
    if (document.getElementById('ticketCustomerPhone')) {
        document.getElementById('ticketCustomerPhone').textContent = info.phone;
    }
    if (document.getElementById('ticketDateTime')) {
        document.getElementById('ticketDateTime').textContent = 
            `${now.toLocaleDateString('en-AU')} - ${now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    const ticketItems = document.getElementById('ticketItems');
    if (ticketItems) {
        ticketItems.innerHTML = info.items.map(item => `
            <div class="ticket-item">
                <span class="ticket-item-qty">1x</span>${item}
            </div>
        `).join('');
    }
}

// ROI Calculator
function updateROI() {
    if (!missedCallsSlider || !avgOrderSlider) return;
    
    const missedCalls = parseInt(missedCallsSlider.value);
    const avgOrder = parseInt(avgOrderSlider.value);
    
    // Update displayed values
    const missedCallsValue = document.getElementById('missedCallsValue');
    const avgOrderValue = document.getElementById('avgOrderValue');
    
    if (missedCallsValue) missedCallsValue.textContent = missedCalls;
    if (avgOrderValue) avgOrderValue.textContent = '$' + avgOrder;
    
    // Calculate monthly lost revenue
    const monthlyLost = missedCalls * avgOrder * 30;
    
    const lostRevenue = document.getElementById('lostRevenue');
    const recoveredRevenue = document.getElementById('recoveredRevenue');
    
    if (lostRevenue) lostRevenue.textContent = '$' + monthlyLost.toLocaleString();
    if (recoveredRevenue) recoveredRevenue.textContent = '$' + monthlyLost.toLocaleString() + '/month';
}

// Navigation
async function startDemo() {
    if (!landing || !chatSection) return;
    
    landing.classList.add('hidden');
    chatSection.classList.remove('hidden');
    
    if (chatContainer) chatContainer.innerHTML = '';
    
    const quickScenarios = document.getElementById('quickScenarios');
    if (quickScenarios) quickScenarios.style.display = 'block';
    
    autoListenEnabled = true;
    
    await resetConversation();
    await sendToAI(null);
}

function backToLanding() {
    autoListenEnabled = false;
    pauseListening();
    
    chatSection?.classList.add('hidden');
    orderSaved?.classList.add('hidden');
    landing?.classList.remove('hidden');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Start buttons
    startBtn?.addEventListener('click', startDemo);
    startBtn2?.addEventListener('click', startDemo);
    
    // Back buttons
    backBtn?.addEventListener('click', backToLanding);
    backToHomeBtn?.addEventListener('click', backToLanding);
    
    // Reset button
    resetBtn?.addEventListener('click', async () => {
        if (chatContainer) chatContainer.innerHTML = '';
        const quickScenarios = document.getElementById('quickScenarios');
        if (quickScenarios) quickScenarios.style.display = 'block';
        
        autoListenEnabled = true;
        await resetConversation();
        await sendToAI(null);
    });
    
    // New order button
    newOrderBtn?.addEventListener('click', () => {
        orderSaved?.classList.add('hidden');
        startDemo();
    });
    
    // Send button
    sendBtn?.addEventListener('click', () => {
        const message = userInput?.value?.trim();
        if (!message) return;
        
        addBubble(message, false);
        userInput.value = '';
        sendToAI(message);
    });
    
    // Enter key
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (!message) return;
            
            addBubble(message, false);
            userInput.value = '';
            sendToAI(message);
        }
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
        updateListeningUI(isListening ? 'listening' : 'ready');
    });
    
    // Scenario buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.text;
            if (text) {
                addBubble(text, false);
                sendToAI(text);
            }
        });
    });
    
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuCard = document.getElementById('menuCard');
    
    menuToggle?.addEventListener('click', () => {
        menuCard?.classList.toggle('collapsed');
    });
    
    // ROI Calculator sliders
    missedCallsSlider?.addEventListener('input', updateROI);
    avgOrderSlider?.addEventListener('input', updateROI);
    
    // Initial ROI calculation
    updateROI();
});
