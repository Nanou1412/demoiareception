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

const SYSTEM_PROMPT = `You're the friendly AI voice assistant for a busy Aussie restaurant. You handle phone orders like a pro barista handles coffee orders - quick, friendly, and efficient.

PERSONALITY:
- Warm but efficient - you're busy but never rushed
- Natural Aussie speech (use "no worries", "mate", "brilliant", "lovely" naturally)
- Sound like a real person, not a robot reading a script
- Keep it SHORT - max 1-2 sentences per response
- Be helpful but don't over-explain

YOUR FLOW:
1. Warm greeting → Ask what they'd like
2. Take the order (suggest extras naturally if it makes sense)
3. Confirm items & calculate total
4. Get their name
5. Get mobile number
6. Suggest pickup time or ask their preference
7. Summarize everything and confirm

${MENU}

CRITICAL RULES:
- NEVER list the full menu unless they specifically ask "what do you have" or "what's on the menu"
- Keep responses ULTRA short and punchy
- Calculate totals accurately
- When the order is 100% complete and confirmed, end with [ORDER_CONFIRMED]
- If they seem unsure, gently guide them

EXAMPLE RESPONSES:
- "G'day! What can I get started for ya?"
- "One halloumi salad, no worries! Anything else?"
- "Lovely, that's $23 all up. What name's it under?"
- "Perfect, and your mobile?"
- "Sweet, ready in about 15 mins - that work for you?"
- "Brilliant! So that's 1 halloumi salad and 1 onion rings for Sarah, picking up at 12:30. Total's $23. All good? [ORDER_CONFIRMED]"`;

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
                body: JSON.stringify({ error: 'OpenAI API key not configured. Please add OPENAI_API_KEY in Netlify environment variables.' })
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
            temperature: 0.85
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
                speed: 1.08
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
