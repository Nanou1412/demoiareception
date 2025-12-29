// ============================================
// AI RECEPTIONIST - ENHANCED DEMO
// With customer voice simulation & improved flow
// ============================================

const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// DOM Elements
const conversation = document.getElementById('conversation');
const userInput = document.getElementById('userInput');
const voiceBtn = document.getElementById('voiceBtn');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const callStatus = document.getElementById('callStatus');
const callTimer = document.getElementById('callTimer');

// Process elements
const processSteps = document.querySelectorAll('.process-step');
const processLines = document.querySelectorAll('.process-line');

// Stats
const messageCountEl = document.getElementById('messageCount');
const orderTotalEl = document.getElementById('orderTotal');
const callDurationEl = document.getElementById('callDuration');

// Info
const stepInfoEl = document.getElementById('stepInfo');

// Cards
const smsCard = document.getElementById('smsCard');
const ticketCard = document.getElementById('ticketCard');
const smsPreview = document.getElementById('smsPreview');
const ticketPreview = document.getElementById('ticketPreview');
const smsStatus = document.getElementById('smsStatus');
const ticketStatus = document.getElementById('ticketStatus');

// Industry selector
const industryBtns = document.querySelectorAll('.industry-btn');
let currentIndustry = 'restaurant';

// State
let messageCount = 0;
let callStartTime = null;
let callTimerInterval = null;
let currentStep = 0;
let isAutoDemoMode = false;
let isSpeaking = false;
let currentAudio = null;
let orderTotal = 0;

// ============================================
// INDUSTRY CONFIGURATION
// ============================================
const industryConfig = {
    restaurant: {
        name: 'Aussie Bites Cafe',
        aiName: 'Emma',
        aiAvatar: '👩‍🍳',
        customerAvatar: '👤',
        stepLabels: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        confirmCard: 'Kitchen Ticket',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'orderItem' },
            { delay: 2500, type: 'moreItems' },
            { delay: 2000, type: 'noMore' },
            { delay: 2500, type: 'pickupTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Hi, I'd like to place an order for pickup please"],
            orderItem: ["I'll have the Halloumi Salad please"],
            moreItems: ["Yeah, add some Onion Rings too"],
            noMore: ["That's all thanks"],
            pickupTime: ["About 20 minutes"],
            name: ["Sarah"],
            phone: ["0412 345 678"],
            confirm: ["Yep, perfect!"]
        }
    },
    salon: {
        name: 'Luxe Hair Studio',
        aiName: 'Sophie',
        aiAvatar: '💇‍♀️',
        customerAvatar: '👤',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        confirmCard: 'Appointment',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'stylist' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Hi, I'd like to book an appointment please"],
            service: ["I need a cut and colour"],
            stylist: ["Anyone available is fine"],
            datetime: ["This Saturday afternoon if possible"],
            name: ["Jessica"],
            phone: ["0423 456 789"],
            confirm: ["That sounds perfect, thanks!"]
        }
    },
    medical: {
        name: 'Wellness Medical Centre',
        aiName: 'Rachel',
        aiAvatar: '👩‍⚕️',
        customerAvatar: '👤',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Consult',
        confirmCard: 'Appointment',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'doctor' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'dob' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Hi, I'd like to book an appointment with a GP"],
            service: ["Just a general checkup"],
            doctor: ["Any doctor available is fine"],
            datetime: ["Tomorrow morning if you have anything"],
            name: ["Michael Thompson"],
            dob: ["15th of March 1985"],
            phone: ["0434 567 890"],
            confirm: ["Yes, that's all correct"]
        }
    },
    garage: {
        name: 'Aussie Auto Care',
        aiName: 'Mike',
        aiAvatar: '🔧',
        customerAvatar: '👤',
        stepLabels: ['Call', 'Service', 'Confirm', 'Done'],
        totalLabel: 'Service',
        confirmCard: 'Job Card',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'vehicle' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["G'day, I need to book my car in for a service"],
            service: ["Just a basic service and maybe check the brakes"],
            vehicle: ["It's a 2019 Toyota Camry"],
            datetime: ["Can I bring it in Monday morning?"],
            name: ["Dave Wilson"],
            phone: ["0445 678 901"],
            confirm: ["Yeah, all good mate!"]
        }
    }
};

// Get current industry config
function getConfig() {
    return industryConfig[currentIndustry] || industryConfig.restaurant;
}

// ============================================
// VOICE SYNTHESIS - Using OpenAI TTS
// ============================================

// Cache for customer voice audio
let customerVoiceEnabled = true;

async function speakAsCustomer(text) {
    if (!customerVoiceEnabled) return Promise.resolve();
    
    return new Promise(async (resolve) => {
        try {
            isSpeaking = true;
            
            // Use OpenAI TTS for customer voice (different voice)
            const response = await fetch('/api/chat/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text, 
                    voice: 'echo',  // Male voice for customer
                    speed: 1.0
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.audio) {
                    const audio = new Audio('data:audio/mp3;base64,' + data.audio);
                    audio.volume = 1.0;
                    
                    audio.onended = () => {
                        isSpeaking = false;
                        resolve();
                    };
                    audio.onerror = () => {
                        isSpeaking = false;
                        resolve();
                    };
                    
                    await audio.play();
                    return;
                }
            }
            
            // Fallback to browser TTS
            await speakWithBrowserTTS(text, 'customer');
            isSpeaking = false;
            resolve();
            
        } catch (error) {
            console.error('Customer TTS error:', error);
            isSpeaking = false;
            resolve();
        }
    });
}

async function speakWithBrowserTTS(text, role = 'ai') {
    return new Promise(async (resolve) => {
        const synthesis = window.speechSynthesis;
        if (!synthesis) {
            resolve();
            return;
        }
        
        synthesis.cancel();
        
        const voices = await getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        
        if (role === 'customer') {
            // Male voice for customer
            const voice = voices.find(v => 
                v.name.includes('Daniel') || 
                v.name.includes('Alex') ||
                (v.lang.includes('en') && v.name.toLowerCase().includes('male'))
            ) || voices.find(v => v.lang.startsWith('en'));
            if (voice) utterance.voice = voice;
            utterance.pitch = 0.9;
            utterance.rate = 1.0;
        } else {
            // Female voice for AI
            const voice = voices.find(v => 
                v.name.includes('Karen') || 
                v.name.includes('Samantha') ||
                (v.lang.includes('en') && v.name.toLowerCase().includes('female'))
            ) || voices.find(v => v.lang.startsWith('en'));
            if (voice) utterance.voice = voice;
            utterance.pitch = 1.1;
            utterance.rate = 1.05;
        }
        
        utterance.lang = 'en-AU';
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        
        synthesis.speak(utterance);
    });
}

function getVoices() {
    return new Promise(resolve => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
        } else {
            speechSynthesis.onvoiceschanged = () => {
                resolve(speechSynthesis.getVoices());
            };
        }
    });
}

async function speakAsAI(text) {
    return new Promise(async (resolve) => {
        const synthesis = window.speechSynthesis;
        if (!synthesis) {
            resolve();
            return;
        }
        
        synthesis.cancel();
        
        const voices = await getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find a natural female voice for AI
        const aiVoice = voices.find(v => 
            v.name.includes('Samantha') || 
            v.name.includes('Karen') ||
            v.name.includes('Tessa') ||
            (v.lang.includes('en-AU'))
        ) || voices.find(v => v.lang.startsWith('en'));
        
        if (aiVoice) utterance.voice = aiVoice;
        utterance.lang = 'en-AU';
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        
        isSpeaking = true;
        utterance.onend = () => {
            isSpeaking = false;
            resolve();
        };
        utterance.onerror = () => {
            isSpeaking = false;
            resolve();
        };
        
        synthesis.speak(utterance);
    });
}

// Play OpenAI TTS audio
async function playAIAudio(audioBase64) {
    return new Promise((resolve) => {
        if (!audioBase64) {
            resolve();
            return;
        }
        
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        const audio = new Audio('data:audio/mp3;base64,' + audioBase64);
        currentAudio = audio;
        isSpeaking = true;
        
        audio.onended = () => {
            isSpeaking = false;
            currentAudio = null;
            resolve();
        };
        
        audio.onerror = () => {
            isSpeaking = false;
            currentAudio = null;
            resolve();
        };
        
        audio.play().catch(() => {
            isSpeaking = false;
            resolve();
        });
    });
}

// ============================================
// SPEECH RECOGNITION
// ============================================
let recognition = null;
let isListening = false;
let autoListenEnabled = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-AU';

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        userInput.value = transcript;
        
        if (event.results[event.results.length - 1].isFinal) {
            handleUserMessage(transcript.trim());
            userInput.value = '';
        }
    };

    recognition.onend = () => {
        isListening = false;
        voiceBtn.classList.remove('listening');
    };

    recognition.onerror = () => {
        isListening = false;
        voiceBtn.classList.remove('listening');
    };
}

function toggleListening() {
    if (isListening) {
        recognition?.stop();
        isListening = false;
        voiceBtn.classList.remove('listening');
    } else if (recognition && !isSpeaking) {
        recognition.start();
        isListening = true;
        voiceBtn.classList.add('listening');
    }
}

// ============================================
// TIMER
// ============================================
function startCallTimer() {
    callStartTime = Date.now();
    callStatus.textContent = 'On Call';
    
    callTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
        callTimer.textContent = timeStr;
        callDurationEl.textContent = timeStr;
    }, 1000);
}

function stopCallTimer() {
    if (callTimerInterval) {
        clearInterval(callTimerInterval);
        callTimerInterval = null;
    }
}

// ============================================
// PROCESS STEPS
// ============================================
function updateProcessStep(step) {
    currentStep = step;
    
    processSteps.forEach((ps, i) => {
        ps.classList.remove('active', 'completed');
        if (i < step) ps.classList.add('completed');
        else if (i === step) ps.classList.add('active');
    });
    
    processLines.forEach((line, i) => {
        line.classList.toggle('active', i < step);
    });
    
    // Update info text
    const infos = [
        "📞 The AI answers the call instantly and greets the customer naturally.",
        "🍽️ The AI is taking the order, asking questions and building the cart.",
        "✅ Confirming order details, pickup time, and customer information.",
        "🎉 Order complete! SMS sent to customer, ticket printed in kitchen."
    ];
    stepInfoEl.textContent = infos[step] || infos[0];
}

// ============================================
// CHAT UI
// ============================================
function addMessage(text, isAI = true, speakIt = true) {
    const config = getConfig();
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isAI ? 'ai' : 'user'}`;
    
    const avatar = isAI ? config.aiAvatar : config.customerAvatar;
    const speaker = isAI ? `${config.aiName} - ${config.name}` : 'Customer';
    
    msgDiv.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div>
            <div class="msg-bubble">${text}</div>
            <div class="msg-speaker">
                <i class="fas fa-volume-up"></i>
                ${speaker}
            </div>
        </div>
    `;
    
    conversation.appendChild(msgDiv);
    conversation.scrollTop = conversation.scrollHeight;
    
    messageCount++;
    messageCountEl.textContent = messageCount;
    
    // Extract order total from conversation
    const totalMatch = text.match(/\$(\d+)/);
    if (totalMatch && isAI) {
        orderTotal = parseInt(totalMatch[1]);
        orderTotalEl.textContent = '$' + orderTotal;
    }
    
    return msgDiv;
}

function showTyping() {
    typingIndicator.classList.add('visible');
    conversation.scrollTop = conversation.scrollHeight;
}

function hideTyping() {
    typingIndicator.classList.remove('visible');
}

// ============================================
// API COMMUNICATION
// ============================================
async function sendToAI(message = null) {
    showTyping();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, sessionId, industry: currentIndustry })
        });
        
        const data = await response.json();
        hideTyping();
        
        if (data.error) {
            addMessage('Sorry, having technical difficulties. Try again?', true, false);
            return null;
        }
        
        addMessage(data.response, true, false);
        
        // Update process step based on conversation
        if (currentStep === 0) updateProcessStep(1);
        
        // Play audio
        if (data.audio) {
            await playAIAudio(data.audio);
        } else {
            await speakAsAI(data.response);
        }
        
        // Handle confirmation
        if (data.isConfirmed) {
            handleOrderConfirmed();
        }
        
        return data;
        
    } catch (error) {
        hideTyping();
        console.error('API Error:', error);
        return null;
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
// USER MESSAGE HANDLING
// ============================================
async function handleUserMessage(text) {
    if (!text.trim()) return;
    
    // Add user message
    addMessage(text, false, false);
    
    // Speak as customer (in auto-demo mode)
    if (isAutoDemoMode) {
        await speakAsCustomer(text);
    }
    
    // Update process
    if (currentStep < 2) updateProcessStep(2);
    
    // Send to AI
    await sendToAI(text);
}

// ============================================
// ORDER CONFIRMATION
// ============================================
function handleOrderConfirmed() {
    const config = getConfig();
    updateProcessStep(3);
    
    // Activate cards
    smsCard.classList.add('active');
    ticketCard.classList.add('active');
    smsStatus.textContent = '✓ Sent';
    smsStatus.classList.add('sent');
    ticketStatus.textContent = '✓ Done';
    ticketStatus.classList.add('sent');
    
    // Generate SMS based on industry
    const smsTemplates = {
        restaurant: `
            <div class="sms-content">
                G'day! 🎉<br><br>
                Your order from <strong>${config.name}</strong> is confirmed!<br><br>
                <strong>Total:</strong> $${orderTotal}<br>
                <strong>Pickup:</strong> As requested<br><br>
                Thanks mate! See you soon! 🙏
            </div>
        `,
        salon: `
            <div class="sms-content">
                Hey gorgeous! 💇‍♀️<br><br>
                Your appointment at <strong>${config.name}</strong> is confirmed!<br><br>
                We'll see you at your scheduled time.<br><br>
                Can't wait to make you look fabulous! ✨
            </div>
        `,
        medical: `
            <div class="sms-content">
                Hello,<br><br>
                Your appointment at <strong>${config.name}</strong> is confirmed.<br><br>
                Please arrive 10 minutes early with your Medicare card.<br><br>
                See you soon! 🏥
            </div>
        `,
        garage: `
            <div class="sms-content">
                G'day mate! 🔧<br><br>
                Your service booking at <strong>${config.name}</strong> is confirmed!<br><br>
                Bring the car in at your scheduled time.<br><br>
                She'll be right! 🚗
            </div>
        `
    };
    
    smsPreview.innerHTML = smsTemplates[currentIndustry] || smsTemplates.restaurant;
    
    // Generate ticket/confirmation based on industry
    const orderNum = Math.floor(Math.random() * 900) + 100;
    const now = new Date();
    
    const ticketTemplates = {
        restaurant: `
            <div class="ticket-content">
                <h4>ORDER #${orderNum}</h4>
                <p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</p>
                <div class="ticket-item"><span>Items:</span><span>As ordered</span></div>
                <div class="ticket-item"><span>Total:</span><span>$${orderTotal}</span></div>
                <p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** PICKUP ***</p>
            </div>
        `,
        salon: `
            <div class="ticket-content">
                <h4>APPOINTMENT #${orderNum}</h4>
                <p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString('en-AU')}</p>
                <div class="ticket-item"><span>Service:</span><span>As booked</span></div>
                <div class="ticket-item"><span>Stylist:</span><span>Assigned</span></div>
                <p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p>
            </div>
        `,
        medical: `
            <div class="ticket-content">
                <h4>BOOKING #${orderNum}</h4>
                <p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString('en-AU')}</p>
                <div class="ticket-item"><span>Type:</span><span>GP Consult</span></div>
                <div class="ticket-item"><span>Doctor:</span><span>Assigned</span></div>
                <p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p>
            </div>
        `,
        garage: `
            <div class="ticket-content">
                <h4>JOB CARD #${orderNum}</h4>
                <p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString('en-AU')}</p>
                <div class="ticket-item"><span>Service:</span><span>As discussed</span></div>
                <div class="ticket-item"><span>Vehicle:</span><span>Booked in</span></div>
                <p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** SERVICE BOOKED ***</p>
            </div>
        `
    };
    
    ticketPreview.innerHTML = ticketTemplates[currentIndustry] || ticketTemplates.restaurant;
    
    // Stop call timer after a delay
    setTimeout(() => {
        callStatus.textContent = 'Call Ended';
        stopCallTimer();
    }, 2000);
    
    // Stop auto demo
    isAutoDemoMode = false;
}

// ============================================
// AUTO-DEMO
// ============================================

function getRandomResponse(type) {
    const config = getConfig();
    const responses = config.responses[type] || [];
    return responses[Math.floor(Math.random() * responses.length)] || "Yes";
}

// Track what stage we're at in the demo
let demoStage = 0;

async function runAutoDemo() {
    isAutoDemoMode = true;
    demoStage = 0;
    
    const config = getConfig();
    
    // Reset everything
    await resetConversation();
    conversation.innerHTML = '';
    messageCount = 0;
    orderTotal = 0;
    messageCountEl.textContent = '0';
    orderTotalEl.textContent = '$0';
    updateProcessStep(0);
    
    // Reset cards
    smsCard.classList.remove('active');
    ticketCard.classList.remove('active');
    smsStatus.textContent = 'Pending';
    smsStatus.classList.remove('sent');
    ticketStatus.textContent = 'Pending';
    ticketStatus.classList.remove('sent');
    smsPreview.innerHTML = '<div class="sms-placeholder"><i class="fas fa-message"></i><span>SMS appears after confirmation</span></div>';
    ticketPreview.innerHTML = '<div class="ticket-placeholder"><i class="fas fa-print"></i><span>Ticket prints after confirmation</span></div>';
    
    // Start call
    startCallTimer();
    
    // AI greeting
    await sendToAI(null);
    
    // Get demo sequence for current industry
    const demoSequence = config.demoScript;
    
    for (let i = 0; i < demoSequence.length && isAutoDemoMode; i++) {
        // Wait for delay
        await new Promise(resolve => setTimeout(resolve, demoSequence[i].delay));
        
        // Wait for AI to stop speaking
        while (isSpeaking) {
            await new Promise(r => setTimeout(r, 100));
        }
        
        if (!isAutoDemoMode) break;
        
        // Get appropriate response
        const response = getRandomResponse(demoSequence[i].type);
        await handleUserMessage(response);
        
        // Check if we're done (order confirmed)
        if (!isAutoDemoMode) break;
        
        // Wait a bit after AI responds
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// ============================================
// INTERACTIVE MODE
// ============================================
async function startInteractiveMode() {
    isAutoDemoMode = false;
    
    // Reset
    await resetConversation();
    conversation.innerHTML = '';
    messageCount = 0;
    orderTotal = 0;
    messageCountEl.textContent = '0';
    orderTotalEl.textContent = '$0';
    updateProcessStep(0);
    
    // Reset cards
    smsCard.classList.remove('active');
    ticketCard.classList.remove('active');
    smsStatus.textContent = 'Pending';
    smsStatus.classList.remove('sent');
    ticketStatus.textContent = 'Pending';
    ticketStatus.classList.remove('sent');
    smsPreview.innerHTML = '<div class="sms-placeholder"><i class="fas fa-message"></i><span>SMS appears after confirmation</span></div>';
    ticketPreview.innerHTML = '<div class="ticket-placeholder"><i class="fas fa-print"></i><span>Ticket prints after confirmation</span></div>';
    
    // Start call
    startCallTimer();
    
    // AI greeting
    await sendToAI(null);
    
    // Scroll to demo
    document.querySelector('.demo-section').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// ROI CALCULATOR
// ============================================
function calculateROI() {
    const missed = parseInt(document.getElementById('missedCalls').value) || 0;
    const avgOrder = parseInt(document.getElementById('avgOrder').value) || 0;
    const hourly = parseInt(document.getElementById('hourlyRate').value) || 0;
    
    const revenue = missed * avgOrder * 30;
    const labour = hourly * 4 * 30; // 4 hours/day
    const total = revenue + labour;
    
    document.getElementById('revenueRecovered').textContent = '$' + revenue.toLocaleString();
    document.getElementById('labourSaved').textContent = '$' + labour.toLocaleString();
    document.getElementById('totalSavings').textContent = '$' + total.toLocaleString();
    document.getElementById('roiResults').classList.remove('hidden');
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Preload voices
    if (window.speechSynthesis) {
        speechSynthesis.getVoices();
    }
    
    // Industry selector
    industryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            industryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update current industry
            currentIndustry = btn.dataset.industry;
            
            // Reset conversation for new industry
            resetConversation();
            conversation.innerHTML = '';
            messageCount = 0;
            orderTotal = 0;
            messageCountEl.textContent = '0';
            orderTotalEl.textContent = '$0';
            updateProcessStep(0);
            
            // Update UI for selected industry
            const config = getConfig();
            console.log(`Switched to ${config.name} (${currentIndustry})`);
        });
    });
    
    // Demo buttons
    document.getElementById('startInteractive')?.addEventListener('click', startInteractiveMode);
    document.getElementById('startAutoDemo')?.addEventListener('click', runAutoDemo);
    
    // Send
    sendBtn?.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) {
            handleUserMessage(text);
            userInput.value = '';
        }
    });
    
    // Enter key
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = userInput.value.trim();
            if (text) {
                handleUserMessage(text);
                userInput.value = '';
            }
        }
    });
    
    // Voice
    voiceBtn?.addEventListener('click', toggleListening);
    
    // Quick actions
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.text;
            if (text) handleUserMessage(text);
        });
    });
    
    // Menu toggle
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('menuSection')?.classList.toggle('hidden');
    });
    
    // ROI Modal
    document.getElementById('roiBtn')?.addEventListener('click', () => {
        document.getElementById('roiModal')?.classList.add('visible');
    });
    
    document.getElementById('closeModal')?.addEventListener('click', () => {
        document.getElementById('roiModal')?.classList.remove('visible');
    });
    
    document.getElementById('roiModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'roiModal') {
            e.target.classList.remove('visible');
        }
    });
    
    document.getElementById('calculateROI')?.addEventListener('click', calculateROI);
    
    // Initialize
    updateProcessStep(0);
});
