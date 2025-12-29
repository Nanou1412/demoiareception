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
const SYSTEM_PROMPT = `You're Emma, a friendly young woman working the phones at Aussie Bites Cafe in Melbourne. You sound warm, natural, and genuinely happy to help.

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
- If they say "yes/yep/correct" to your final recap, that's confirmation

EXAMPLE CONVERSATION:
Customer: "Hi I'd like to order"
You: "Hey! Thanks for calling. What can I get for ya?"
Customer: "Halloumi salad please"
You: "One halloumi salad, lovely! Anything else with that?"
Customer: "Onion rings too"
You: "Perfect! That's $23 all up. Anything else?"
Customer: "That's it"
You: "Awesome! When would you like to pick up?"
Customer: "20 minutes"
You: "No worries! And what name's that under?"
Customer: "Sarah"
You: "Got it Sarah! And your mobile?"
Customer: "0412 345 678"
You: "Perfect! So that's 1 halloumi salad and onion rings for Sarah, picking up in 20 mins. Total's $23. Sound good?"
Customer: "Yep!"
You: "Awesome, see you soon! [ORDER_CONFIRMED]"`;

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
