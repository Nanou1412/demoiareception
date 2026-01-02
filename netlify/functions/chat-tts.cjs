const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event, _context) => {
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
        const { text, voice = 'nova', speed = 1.0 } = JSON.parse(event.body);

        if (!process.env.OPENAI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'OpenAI API key not configured' })
            };
        }

        if (!text) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Text is required' })
            };
        }

        // Generate TTS audio - 'nova' for natural, warm female voice
        const ttsResponse = await openai.audio.speech.create({
            model: 'tts-1-hd',
            voice: voice, // 'nova' for professional receptionist voice
            input: text,
            response_format: 'mp3',
            speed: speed
        });

        const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
        const audioBase64 = audioBuffer.toString('base64');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ audio: audioBase64 })
        };
    } catch (error) {
        console.error('TTS Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'TTS generation failed' })
        };
    }
};
