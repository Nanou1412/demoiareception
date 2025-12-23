// Simple reset endpoint for Netlify
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // For serverless, we just acknowledge the reset
    // The actual conversation is managed client-side via sessionId
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true })
    };
};
