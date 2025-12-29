// Session ID for conversation
const sessionId = 'session_' + Date.now();

// DOM elements
const landing = document.getElementById('landing');
const chatSection = document.getElementById('chatSection');
const orderSaved = document.getElementById('orderSaved');
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const voiceBtn = document.getElementById('voiceBtn');
const sendBtn = document.getElementById('sendBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const orderCard = document.getElementById('orderCard');
const notificationSound = document.getElementById('notificationSound');
const listeningIndicator = document.getElementById('listeningIndicator');
const listeningText = listeningIndicator?.querySelector('.listening-text');

// Text-to-Speech setup - Using OpenAI TTS (much more human-like)
let currentAudio = null;
let isSpeaking = false;

// Play OpenAI TTS audio (base64 mp3)
function playAIAudio(audioBase64) {
    if (!audioBase64) return;
    
    // Stop any current audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    const audio = new Audio('data:audio/mp3;base64,' + audioBase64);
    currentAudio = audio;
    
    audio.onplay = () => { isSpeaking = true; };
    audio.onended = () => { 
        isSpeaking = false; 
        currentAudio = null; 
        onAISpeakingEnd(); // Restart listening after AI finishes speaking
    };
    audio.onerror = () => { 
        isSpeaking = false; 
        currentAudio = null; 
        onAISpeakingEnd(); // Restart listening even on error
    };
    
    audio.play().catch(e => {
        console.log('Audio play failed:', e);
        onAISpeakingEnd(); // Restart listening if audio fails
    });
}

// Fallback to browser TTS if OpenAI audio not available
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
    if (ausVoice) {
        utterance.voice = ausVoice;
    }
    
    utterance.onstart = () => { isSpeaking = true; };
    utterance.onend = () => { 
        isSpeaking = false; 
        onAISpeakingEnd(); // Restart listening after AI finishes speaking
    };
    utterance.onerror = () => { 
        isSpeaking = false; 
        onAISpeakingEnd(); // Restart listening even on error
    };
    
    synthesis.speak(utterance);
}

// Play notification sound
function playNotificationSound() {
    if (notificationSound) {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Speech Recognition setup - Continuous conversation mode
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
        
        // Show interim results in input
        userInput.value = finalTranscript + interimTranscript;
        
        // Reset silence timeout - wait for user to finish speaking
        clearTimeout(silenceTimeout);
        
        if (finalTranscript.trim()) {
            // Wait 1.5 seconds of silence before sending
            silenceTimeout = setTimeout(() => {
                if (finalTranscript.trim() && !isSpeaking) {
                    const message = finalTranscript.trim();
                    finalTranscript = '';
                    interimTranscript = '';
                    userInput.value = '';
                    
                    // Stop listening while AI responds
                    pauseListening();
                    
                    // Send the message
                    addBubble(message, false);
                    sendToAI(message);
                }
            }, 1500);
        }
    };

    recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        if (event.error === 'no-speech' && autoListenEnabled) {
            // Restart if no speech detected
            restartListening();
        }
    };

    recognition.onend = () => {
        isListening = false;
        updateMicButton();
        
        // Auto-restart if in conversation mode and AI is not speaking
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
            updateMicButton();
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
        updateMicButton();
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

function updateMicButton() {
    if (isListening) {
        voiceBtn.classList.add('listening');
        voiceBtn.textContent = '🔴';
        // Update listening indicator
        if (listeningIndicator) {
            listeningIndicator.classList.add('active');
            listeningIndicator.classList.remove('paused');
            if (listeningText) listeningText.textContent = 'Listening...';
        }
    } else {
        voiceBtn.classList.remove('listening');
        voiceBtn.textContent = '🎤';
        // Update listening indicator
        if (listeningIndicator) {
            if (isSpeaking) {
                listeningIndicator.classList.add('active', 'paused');
                if (listeningText) listeningText.textContent = 'Speaking...';
            } else if (autoListenEnabled) {
                listeningIndicator.classList.add('active', 'paused');
                if (listeningText) listeningText.textContent = 'Ready to listen';
            } else {
                listeningIndicator.classList.add('inactive');
            }
        }
    }
}

// Start auto-listening after AI finishes speaking
function onAISpeakingEnd() {
    isSpeaking = false;
    // Update indicator
    if (listeningIndicator) {
        listeningIndicator.classList.remove('speaking');
    }
    if (autoListenEnabled) {
        setTimeout(() => {
            startListening();
        }, 500);
    }
}

// Add chat bubble
function addBubble(text, isAI = true) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isAI ? 'ai' : 'user'}`;
    bubble.textContent = text;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Add loading bubble with animated dots
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

// Send message to AI
async function sendToAI(message = null) {
    // Update indicator to show AI is thinking
    if (listeningIndicator && listeningText) {
        listeningIndicator.classList.add('speaking');
        listeningText.textContent = 'AI thinking...';
    }
    
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
        
        // Play OpenAI TTS audio (human-like voice)
        if (data.audio) {
            playAIAudio(data.audio);
        } else {
            // Fallback to browser TTS
            speakTextFallback(data.response);
        }
        
        // If order is confirmed, show saved screen
        if (data.isConfirmed) {
            // Play notification sound
            playNotificationSound();
            
            setTimeout(() => {
                showOrderConfirmed();
            }, 2000);
        }
        
    } catch (error) {
        removeLoadingBubble();
        addBubble('Erreur de connexion. Veuillez réessayer.', true);
        console.error('Error:', error);
    }
}

// Show order confirmed
function showOrderConfirmed() {
    chatSection.classList.add('hidden');
    orderSaved.classList.remove('hidden');
    
    // Extract order info from conversation (demo values)
    const orderInfo = extractOrderFromChat();
    
    // Update order card
    orderCard.innerHTML = `
        <p><strong>Name:</strong> ${orderInfo.name}</p>
        <p><strong>Mobile:</strong> ${orderInfo.phone}</p>
        <p><strong>Pickup Time:</strong> ${orderInfo.pickupTime}</p>
        <p><strong>Items:</strong></p>
        <ul class="items-list">
            ${orderInfo.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <p class="total">Total: ${orderInfo.total}</p>
    `;
    
    // Update SMS bubble
    const smsBubble = document.getElementById('smsBubble');
    smsBubble.innerHTML = `
        <span class="sms-emoji">✅</span>
        <p><span class="sms-restaurant">Restaurant Demo</span></p>
        <p>G'day ${orderInfo.name}!</p>
        <p>Your order is confirmed:</p>
        <div class="sms-items">
            ${orderInfo.items.map(item => `• ${item}`).join('<br>')}
        </div>
        <p class="sms-total">Total: ${orderInfo.total}</p>
        <p>📍 Pickup at <strong>${orderInfo.pickupTime}</strong></p>
        <p class="sms-footer">Thanks for your order! See you soon 🙏</p>
    `;
    
    // Update Kitchen Ticket
    const orderNum = String(Math.floor(Math.random() * 900) + 100);
    document.getElementById('ticketOrderNum').textContent = orderNum;
    document.getElementById('ticketPickupTime').textContent = orderInfo.pickupTime;
    document.getElementById('ticketCustomerName').textContent = orderInfo.name;
    document.getElementById('ticketCustomerPhone').textContent = orderInfo.phone;
    
    // Update ticket items
    const ticketItems = document.getElementById('ticketItems');
    ticketItems.innerHTML = orderInfo.items.map(item => `
        <div class="ticket-item">
            <span><span class="ticket-item-qty">1x</span>${item}</span>
        </div>
    `).join('');
    
    // Update ticket date/time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-AU');
    const timeStr = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('ticketDateTime').textContent = `${dateStr} - ${timeStr}`;
    
    // Trigger animations
    triggerConfirmationAnimations();
}

// Trigger animations on confirmation screen
function triggerConfirmationAnimations() {
    const phoneMockup = document.querySelector('.phone-mockup');
    const kitchenTicket = document.querySelector('.kitchen-ticket');
    
    // Reset animations
    orderCard.classList.remove('animate');
    if (phoneMockup) phoneMockup.classList.remove('animate');
    if (kitchenTicket) kitchenTicket.classList.remove('animate');
    
    // Trigger animations with delays
    setTimeout(() => {
        orderCard.classList.add('animate');
    }, 100);
    
    setTimeout(() => {
        if (phoneMockup) {
            phoneMockup.classList.add('animate');
            playNotificationSound();
        }
    }, 400);
    
    setTimeout(() => {
        if (kitchenTicket) {
            kitchenTicket.classList.add('animate');
        }
    }, 800);
}

// Extract order info from chat bubbles
function extractOrderFromChat() {
    const bubbles = chatContainer.querySelectorAll('.chat-bubble');
    let lastAIMessage = '';
    
    // Get the last AI message (should be the confirmation)
    bubbles.forEach(bubble => {
        if (bubble.classList.contains('ai')) {
            lastAIMessage = bubble.textContent;
        }
    });
    
    // Demo extraction - in real app this would come from server
    // Try to find patterns in the conversation
    const userBubbles = Array.from(chatContainer.querySelectorAll('.chat-bubble.user'));
    
    // Default values for demo
    let name = 'Customer';
    let phone = '04XX XXX XXX';
    let pickupTime = '12:30pm';
    let items = ['Grilled Halloumi Salad', 'Lemon Iced Tea'];
    let total = '$22';
    
    // Try to extract from user messages
    userBubbles.forEach((bubble, index) => {
        const text = bubble.textContent;
        
        // Check for Australian phone pattern (04XX XXX XXX or similar)
        if (text.match(/04\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/) || text.match(/\d{10}/)) {
            phone = text.trim();
        }
        // Check for time pattern
        else if (text.match(/\d{1,2}[:.]\d{2}\s*(am|pm)?/i) || text.match(/\d{1,2}\s*(am|pm|o'clock)/i)) {
            pickupTime = text.trim();
        }
        // Check if it's a name (short text, no numbers, after asking for name)
        else if (text.length < 30 && !text.match(/\d/) && index > 2) {
            name = text.trim();
        }
    });
    
    // Try to extract items from AI confirmation message
    const menuItems = ['Grilled Halloumi Salad', 'Onion Rings', 'Chocolate Brownie', 'Lemon Iced Tea'];
    const foundItems = [];
    
    menuItems.forEach(item => {
        if (lastAIMessage.toLowerCase().includes(item.toLowerCase())) {
            foundItems.push(item);
        }
    });
    
    if (foundItems.length > 0) {
        items = foundItems;
        // Calculate total
        const prices = {
            'Grilled Halloumi Salad': 17,
            'Onion Rings': 6,
            'Chocolate Brownie': 8,
            'Lemon Iced Tea': 5
        };
        let totalNum = 0;
        foundItems.forEach(item => {
            totalNum += prices[item] || 0;
        });
        total = '$' + totalNum;
    }
    
    return { name, phone, pickupTime, items, total };
}

// Handle send
async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    addBubble(message, false);
    userInput.value = '';
    sendBtn.disabled = true;
    voiceBtn.disabled = true;

    await sendToAI(message);
    
    sendBtn.disabled = false;
    voiceBtn.disabled = false;
}

// Start demo
async function startDemo() {
    landing.classList.add('hidden');
    chatSection.classList.remove('hidden');
    chatContainer.innerHTML = '';
    
    // Enable auto-listening mode
    autoListenEnabled = true;
    
    // Reset conversation on server
    await fetch('/api/chat/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
    });
    
    // Get initial greeting from AI
    await sendToAI(null);
}

// Event listeners
startBtn.addEventListener('click', startDemo);

resetBtn.addEventListener('click', async () => {
    chatContainer.innerHTML = '';
    autoListenEnabled = true; // Re-enable auto-listening
    await fetch('/api/chat/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
    });
    await sendToAI(null);
});

newOrderBtn.addEventListener('click', () => {
    orderSaved.classList.add('hidden');
    startDemo();
});

sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});

// Voice button toggles auto-listening mode
voiceBtn.addEventListener('click', () => {
    if (autoListenEnabled) {
        // Disable auto-listening
        autoListenEnabled = false;
        pauseListening();
    } else {
        // Enable auto-listening
        autoListenEnabled = true;
        if (!isSpeaking) {
            startListening();
        }
    }
});

// Menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const menuCard = document.getElementById('menuCard');

if (menuToggle && menuCard) {
    menuToggle.addEventListener('click', () => {
        menuCard.classList.toggle('collapsed');
    });
}

// Update listening indicator text based on state
function updateListeningIndicatorText(text) {
    if (listeningText) {
        listeningText.textContent = text;
    }
}
