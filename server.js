const express = require('express');
const path = require('path');
const OpenAI = require('openai');
const { getSystemPrompt } = require('./shared/prompts');

const app = express();
const PORT = 3000;

// OpenAI setup
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
// ROUTES
// ============================================

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message, sessionId, industry = 'restaurant', language = 'en' } = req.body;

    // Initialize conversation if new session or industry changed
    const sessionKey = `${sessionId}_${industry}_${language}`;
    if (!conversations[sessionKey]) {
        conversations[sessionKey] = [
            { role: 'system', content: getSystemPrompt(industry, language) }
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
                model: 'tts-1-hd',
                voice: 'shimmer',
                input: cleanResponse,
                response_format: 'mp3',
                speed: 1.05
            });

            const audioBuffer = Buffer.from(await speechResponse.arrayBuffer());
            audioBase64 = audioBuffer.toString('base64');
        } catch (ttsError) {
            console.error('TTS Error:', ttsError.message);
        }

        res.json({
            response: cleanResponse,
            isConfirmed,
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
    // Clear all sessions matching this ID
    Object.keys(conversations).forEach(key => {
        if (key.startsWith(sessionId)) {
            delete conversations[key];
        }
    });
    res.json({ success: true });
});

// TTS endpoint for customer voice
app.post('/api/chat/tts', async (req, res) => {
    const { text, voice = 'echo', speed = 1.0 } = req.body;

    try {
        const speechResponse = await openai.audio.speech.create({
            model: 'tts-1-hd',
            voice,
            input: text,
            response_format: 'mp3',
            speed
        });

        const audioBuffer = Buffer.from(await speechResponse.arrayBuffer());
        const audioBase64 = audioBuffer.toString('base64');

        res.json({ audio: audioBase64 });
    } catch (error) {
        console.error('TTS Error:', error.message);
        res.status(500).json({ error: 'TTS generation failed' });
    }
});

// Save order
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

// Get all orders
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 AI Phone Order Demo running at http://localhost:${PORT}`);
    console.log(`\n💡 Don't forget to set your OpenAI API key:`);
    console.log(`   export OPENAI_API_KEY=your_key_here\n`);
});
