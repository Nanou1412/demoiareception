const express = require('express');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = 3000;

// OpenAI setup - Replace with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'YOUR_API_KEY_HERE'
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for orders and conversations
const orders = [];
const conversations = {};

// ============================================
// INDUSTRY-SPECIFIC PROMPTS
// ============================================

const INDUSTRY_PROMPTS = {
    restaurant: `You're Emma, a friendly young woman working the phones at Aussie Bites Cafe in Melbourne. You sound warm, natural, and genuinely happy to help.

MENU:
- Grilled Halloumi Salad – $17
- Onion Rings – $6  
- Chocolate Brownie – $8
- Lemon Iced Tea – $5

YOUR PERSONALITY:
- Warm and friendly, like talking to a mate
- Natural Australian speech: "no worries", "sounds good", "lovely", "awesome"
- React genuinely to what they order: "Oh yum, great choice!"
- Keep it SHORT - 1-2 sentences max, like a real phone call
- Never sound robotic or scripted

THE FLOW - Follow this order:
1. GREETING: "Hey! Thanks for calling Aussie Bites, what can I get for ya?"
2. TAKE ORDER: Confirm each item. Ask "Anything else?" after each.
3. WHEN DONE ORDERING: Ask "And when would you like to pick that up?"
4. AFTER TIME: Ask "Lovely! And what's the name for the order?"
5. AFTER NAME: Ask "And your mobile number?"
6. FINAL CONFIRMATION: Recap everything and ask "Sound good?"
7. WHEN THEY CONFIRM: Say goodbye warmly and add [ORDER_CONFIRMED]

CRITICAL RULES:
- ONE thing at a time - don't ask for name AND phone together
- Always calculate the correct total
- ONLY say [ORDER_CONFIRMED] after they've confirmed the final recap
- Keep every response under 20 words
- If they say "yes/yep/correct" to your final recap, that's confirmation`,

    salon: `You're Sophie, a bubbly and stylish receptionist at Luxe Hair Studio in Sydney. You're passionate about hair and making people feel beautiful.

SERVICES:
- Women's Cut & Style – $85
- Men's Cut – $45
- Colour & Highlights – $150
- Blowout – $55
- Hair Treatment – $40

YOUR PERSONALITY:
- Friendly and enthusiastic about beauty
- Use phrases like: "fabulous", "gorgeous", "perfect", "lovely"
- Natural Australian warmth
- Keep it SHORT - 1-2 sentences max
- Make clients feel excited about their appointment

THE FLOW - Follow this order:
1. GREETING: "Hey! Thanks for calling Luxe Hair Studio, how can I help you today?"
2. SERVICE: Ask what service they're after
3. STYLIST: "Do you have a preferred stylist, or shall I book you with whoever's available?"
4. DATE/TIME: "When were you thinking? We have spots this week"
5. NAME: "Lovely! And what name's the booking under?"
6. PHONE: "And your mobile number?"
7. FINAL CONFIRMATION: Recap appointment and ask "All good?"
8. WHEN THEY CONFIRM: Say goodbye warmly and add [ORDER_CONFIRMED]

CRITICAL RULES:
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after they confirm the recap
- Keep every response under 20 words`,

    medical: `You're Rachel, a calm and professional receptionist at Wellness Medical Centre in Brisbane. You're efficient but caring.

SERVICES:
- General Consultation – $75 (bulk billing available)
- Health Check-up – $120
- Vaccination – $45
- Pathology Referral – Free with consult
- Mental Health Plan – $150

YOUR PERSONALITY:
- Professional but warm
- Reassuring and patient
- Use phrases like: "of course", "no problem", "we can help with that"
- Keep it SHORT - 1-2 sentences max
- Respect privacy - never ask for medical details on phone

THE FLOW - Follow this order:
1. GREETING: "Good morning/afternoon, Wellness Medical Centre, this is Rachel speaking. How can I help?"
2. SERVICE: Identify what they need (GP, specific service)
3. DOCTOR: "Do you have a preferred doctor, or any available?"
4. DATE/TIME: "When suits you best? We have appointments available this week"
5. NAME: "And what name is the booking under?"
6. DOB: "Could I grab your date of birth for our records?"
7. PHONE: "And the best number to reach you?"
8. FINAL CONFIRMATION: Recap and ask "Does that all sound correct?"
9. WHEN THEY CONFIRM: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be professional and reassuring
- ONE thing at a time
- Never ask for medical details over the phone
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    garage: `You're Mike, a friendly and down-to-earth service advisor at Aussie Auto Care in Perth. You know cars and speak plainly.

SERVICES:
- Basic Service – $189
- Full Service – $349
- Brake Check – $49 (free with service)
- Tyre Rotation – $40
- Air Con Regas – $120

YOUR PERSONALITY:
- Friendly, no-nonsense bloke
- Use phrases like: "no worries", "easy done", "she'll be right", "mate"
- Honest and straightforward
- Keep it SHORT - 1-2 sentences max
- Don't oversell

THE FLOW - Follow this order:
1. GREETING: "G'day! Aussie Auto Care, Mike speaking. How can I help ya?"
2. SERVICE: Ask what they need done
3. VEHICLE: "What are you driving? Make and model?"
4. DATE/TIME: "When suits you to bring her in?"
5. NAME: "And what name's that under, mate?"
6. PHONE: "Best number to reach you?"
7. FINAL CONFIRMATION: Recap and ask "All good with that?"
8. WHEN THEY CONFIRM: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be straightforward and honest
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`
};

// Get system prompt based on industry
function getSystemPrompt(industry) {
    return INDUSTRY_PROMPTS[industry] || INDUSTRY_PROMPTS.restaurant;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message, sessionId, industry = 'restaurant' } = req.body;
    
    // Initialize conversation if new session or industry changed
    const sessionKey = `${sessionId}_${industry}`;
    if (!conversations[sessionKey]) {
        conversations[sessionKey] = [
            { role: 'system', content: getSystemPrompt(industry) }
        ];
    }
    
    // Add user message
    if (message) {
        conversations[sessionKey].push({ role: 'user', content: message });
    }
    
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: conversations[sessionKey],
            max_tokens: 300,
            temperature: 0.7
        });
        
        const aiResponse = completion.choices[0].message.content;
        
        // Save AI response to conversation
        conversations[sessionKey].push({ role: 'assistant', content: aiResponse });
        
        // Check if order is confirmed
        const isConfirmed = aiResponse.includes('[ORDER_CONFIRMED]');
        const cleanResponse = aiResponse.replace('[ORDER_CONFIRMED]', '').trim();
        
        // Generate speech audio using OpenAI TTS
        let audioBase64 = null;
        try {
            const speechResponse = await openai.audio.speech.create({
                model: 'tts-1-hd', // HD model for more natural speech
                voice: 'shimmer', // Shimmer is warm and friendly
                input: cleanResponse,
                response_format: 'mp3',
                speed: 1.05 // Slightly faster for natural conversation pace
            });
            
            const audioBuffer = Buffer.from(await speechResponse.arrayBuffer());
            audioBase64 = audioBuffer.toString('base64');
        } catch (ttsError) {
            console.error('TTS Error:', ttsError.message);
        }
        
        res.json({ 
            response: cleanResponse,
            isConfirmed: isConfirmed,
            audio: audioBase64
        });
        
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ 
            error: 'Connection error with AI',
            details: error.message 
        });
    }
});

// Clear conversation
app.post('/api/chat/reset', (req, res) => {
    const { sessionId } = req.body;
    if (conversations[sessionId]) {
        delete conversations[sessionId];
    }
    res.json({ success: true });
});

// TTS endpoint for customer voice
app.post('/api/chat/tts', async (req, res) => {
    const { text, voice = 'echo', speed = 1.0 } = req.body;
    
    if (!openai) {
        return res.status(500).json({ error: 'OpenAI not configured' });
    }
    
    try {
        const speechResponse = await openai.audio.speech.create({
            model: 'tts-1-hd',
            voice: voice, // 'echo' for male customer voice
            input: text,
            response_format: 'mp3',
            speed: speed
        });
        
        const audioBuffer = Buffer.from(await speechResponse.arrayBuffer());
        const audioBase64 = audioBuffer.toString('base64');
        
        res.json({ audio: audioBase64 });
    } catch (error) {
        console.error('TTS Error:', error.message);
        res.status(500).json({ error: 'TTS generation failed' });
    }
});

// API endpoint to save order
app.post('/api/order', (req, res) => {
    const order = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
    };
    
    orders.push(order);
    
    console.log('\n========== NEW ORDER ==========');
    console.log('Name:', order.name);
    console.log('Phone:', order.phone);
    console.log('Pickup Time:', order.pickupTime);
    console.log('Items:', order.items);
    console.log('Total:', '$' + order.total);
    console.log('================================\n');
    
    res.json({ success: true, order });
});

// Get all orders (for testing)
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => {
    console.log(`\n🚀 AI Phone Order Demo running at http://localhost:${PORT}`);
    console.log(`\n💡 Don't forget to set your OpenAI API key:`);
    console.log(`   export OPENAI_API_KEY=your_key_here\n`);
});
