const OpenAI = require('openai');
const { getSystemPrompt, getVoice } = require('../../industries/index.cjs');

// Store conversations in memory (note: will reset on cold starts)
const conversations = new Map();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async event => {
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
        const { message, sessionId, industry = 'restaurant' } = JSON.parse(event.body);

        if (!process.env.OPENAI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'OpenAI API key not configured' })
            };
        }

        // Get or create conversation history
        const sessionKey = `${sessionId}_${industry}`;
        if (!conversations.has(sessionKey)) {
            conversations.set(sessionKey, []);
        }
        const history = conversations.get(sessionKey);

        // Add user message
        if (message) {
            history.push({ role: 'user', content: message });
        }

        // Call OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: getSystemPrompt(industry) }, ...history],
            max_tokens: 200,
            temperature: 0.85
        });

        const aiResponse = completion.choices[0].message.content;
        const isConfirmed = aiResponse.includes('[ORDER_CONFIRMED]');
        const cleanResponse = aiResponse.replace('[ORDER_CONFIRMED]', '').trim();

        // Add to history
        history.push({ role: 'assistant', content: cleanResponse });

        // Generate TTS
        let audioBase64 = null;
        try {
            const voice = getVoice(industry);
            const ttsResponse = await openai.audio.speech.create({
                model: 'tts-1-hd',
                voice,
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
            body: JSON.stringify({ response: cleanResponse, audio: audioBase64, isConfirmed })
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
