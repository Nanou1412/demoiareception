const OpenAI = require('openai');

// Store conversations in memory (note: will reset on cold starts)
const conversations = new Map();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const MENU = `
MENU:
- Grilled Halloumi Salad – $17
- Onion Rings – $6
- Chocolate Brownie – $8
- Lemon Iced Tea – $5
`;

const SYSTEM_PROMPT = `You are a friendly phone order assistant for a restaurant in Australia. You speak casual Australian English.

Your personality:
- Warm and friendly, like chatting with a mate
- Use casual Aussie expressions naturally (like "no worries", "mate", "reckon", "heaps good")
- Keep responses short and conversational (1-2 sentences max)
- Sound natural, not scripted or robotic

Your job:
1. Greet warmly and ask what they'd like to order
2. Take their food order (ONLY mention the menu if they ask what's available)
3. Get their name for the order
4. Get their mobile number
5. Confirm pickup time
6. Summarize and confirm the order

${MENU}

IMPORTANT RULES:
- Do NOT list the menu unless the customer specifically asks
- Keep responses SHORT and natural
- Calculate totals correctly
- When order is complete and confirmed, end your message with [ORDER_CONFIRMED]

Example conversation style:
- "Hey! What can I get for you today?"
- "No worries, anything else with that?"
- "Sweet, and what name's that under?"
- "Awesome, what's the best mobile to reach you on?"`;

exports.handler = async (event, context) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    try {
        const { message, sessionId } = JSON.parse(event.body);

        if (!process.env.OPENAI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'OpenAI API key not configured' })
            };
        }

        // Get or create conversation history
        if (!conversations.has(sessionId)) {
            conversations.set(sessionId, []);
        }
        const history = conversations.get(sessionId);

        // Add user message if provided
        if (message) {
            history.push({ role: 'user', content: message });
        }

        // Call OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history
            ],
            max_tokens: 200,
            temperature: 0.8
        });

        const aiResponse = completion.choices[0].message.content;
        
        // Check if order is confirmed
        const isConfirmed = aiResponse.includes('[ORDER_CONFIRMED]');
        const cleanResponse = aiResponse.replace('[ORDER_CONFIRMED]', '').trim();

        // Add AI response to history
        history.push({ role: 'assistant', content: cleanResponse });

        // Generate TTS audio
        let audioBase64 = null;
        try {
            const ttsResponse = await openai.audio.speech.create({
                model: 'tts-1-hd',
                voice: 'shimmer',
                input: cleanResponse,
                speed: 1.05
            });
            const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
            audioBase64 = audioBuffer.toString('base64');
        } catch (ttsError) {
            console.error('TTS error:', ttsError);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: cleanResponse,
                audio: audioBase64,
                isConfirmed
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to process request' })
        };
    }
};
