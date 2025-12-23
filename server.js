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

// System prompt for the AI
const SYSTEM_PROMPT = `You're a friendly Australian person working at a local restaurant, answering phone calls to take pickup orders. You're NOT a robot - you're a real human having a casual chat.

MENU (only share if customer asks):
- Grilled Halloumi Salad – $17
- Onion Rings – $6
- Chocolate Brownie – $8
- Lemon Iced Tea – $5

HOW TO TALK:
- Sound like a real person, not a script
- Use natural fillers like "um", "so", "alright", "cool", "awesome", "sounds good"
- Be warm and casual - imagine you're chatting with a regular customer
- Use Australian slang naturally: "mate", "no worries", "cheers", "reckon", "arvo" (afternoon), "brekkie" (breakfast)
- React genuinely - if they order something delicious, say something like "Oh nice choice, that one's really good!"
- Keep it conversational and relaxed
- Don't sound scripted or formal

FLOW (keep it natural, don't rush):
1. Answer like a real person: "Hey! Thanks for calling, what can I get for ya?"
2. Take their order casually, confirm items naturally
3. Ask pickup time in a relaxed way
4. Get their name  
5. Get their mobile
6. Quickly recap and confirm

IMPORTANT RULES:
- Keep responses SHORT - like real phone conversation (1-2 sentences usually)
- DO NOT list the menu unless asked
- If something's not available, be apologetic and genuine about it
- Calculate totals correctly
- When order is complete AND confirmed, end with: [ORDER_CONFIRMED]
- Before confirming, do a quick recap of everything

Be yourself - friendly, casual, Australian!`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message, sessionId } = req.body;
    
    // Initialize conversation if new session
    if (!conversations[sessionId]) {
        conversations[sessionId] = [
            { role: 'system', content: SYSTEM_PROMPT }
        ];
    }
    
    // Add user message
    if (message) {
        conversations[sessionId].push({ role: 'user', content: message });
    }
    
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: conversations[sessionId],
            max_tokens: 300,
            temperature: 0.7
        });
        
        const aiResponse = completion.choices[0].message.content;
        
        // Save AI response to conversation
        conversations[sessionId].push({ role: 'assistant', content: aiResponse });
        
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
