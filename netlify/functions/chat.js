const OpenAI = require('openai');

// Store conversations in memory (note: will reset on cold starts)
const conversations = new Map();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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
