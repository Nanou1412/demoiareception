const OpenAI = require('openai');

// Store conversations in memory (note: will reset on cold starts)
const conversations = new Map();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Industry-specific voices
const INDUSTRY_VOICES = {
    restaurant: 'shimmer', salon: 'nova', medical: 'nova', garage: 'onyx',
    hotel: 'onyx', pizza: 'echo', gym: 'echo', vet: 'shimmer',
    dental: 'nova', lawyer: 'onyx', realestate: 'echo', spa: 'shimmer',
    pharmacy: 'nova', bakery: 'shimmer', florist: 'nova', photography: 'onyx',
    tattoo: 'onyx', petgrooming: 'shimmer'
};

// ============================================
// INDUSTRY PROMPTS
// ============================================
const PROMPTS = {
    restaurant: `You're Emma at Aussie Bites Cafe. Warm, natural Australian speech.
MENU: Halloumi Salad $17, Onion Rings $6, Brownie $8, Iced Tea $5
FLOW: 1.Greet 2.Take order 3.Ask pickup time 4.Name 5.Phone 6.Recap 7.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words. Natural.`,

    salon: `You're Sophie at Luxe Hair Studio. Bubbly, passionate about beauty.
SERVICES: Women's Cut $85, Men's Cut $45, Colour $150, Blowout $55, Treatment $40
FLOW: 1.Greet 2.Service 3.Stylist 4.Date/time 5.Name 6.Phone 7.Recap 8.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    medical: `You're Rachel at Wellness Medical Centre. Calm, professional.
SERVICES: Consultation $75, Check-up $120, Vaccination $45
FLOW: 1.Greet 2.Service 3.Doctor 4.Date/time 5.Name 6.DOB 7.Phone 8.Recap 9.Confirm→[ORDER_CONFIRMED]
RULES: Never ask medical details. ONE thing at a time. Under 20 words.`,

    garage: `You're Mike at Aussie Auto Care. Friendly, straightforward bloke.
SERVICES: Basic Service $189, Full Service $349, Brake Check $49
FLOW: 1.Greet 2.Service 3.Vehicle make/model 4.Date/time 5.Name 6.Phone 7.Recap 8.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    hotel: `You're James at The Grand Melbourne Hotel. Polished, 5-star service.
ROOMS: Standard $189, Deluxe $259, Suite $399, Penthouse $699
FLOW: 1.Greet 2.Dates 3.Room type 4.Guests 5.Extras 6.Name 7.Contact 8.Recap 9.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    pizza: `You're Tony at Tony's Famous Pizzeria. Enthusiastic about food!
MENU: Margherita $18, Pepperoni $22, Supreme $26, Garlic Bread $8
FLOW: 1.Greet 2.Take order 3.Extras 4.Pickup/delivery 5.Time 6.Name 7.Phone 8.Address 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    gym: `You're Alex at Peak Fitness. Energetic, motivating.
MEMBERSHIPS: Basic $45/wk, Premium $65/wk, VIP $99/wk, Day Pass $25
FLOW: 1.Greet 2.Interest 3.Goals 4.Tour 5.Membership 6.Start date 7.Name 8.Contact 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    vet: `You're Bella at Paws & Claws Vet. Gentle, caring about pets.
SERVICES: Consultation $75, Vaccination $95, Health Check $60, Dental $350
FLOW: 1.Greet 2.Pet concern 3.Pet name/type 4.Urgency 5.Appointment 6.Owner name 7.Phone 8.Recap 9.Confirm→[ORDER_CONFIRMED]
RULES: Show empathy. ONE thing at a time. Under 20 words.`,

    dental: `You're Grace at Smile Bright Dental. Warm, reassuring.
SERVICES: Check-up $180, X-rays $95, Filling $200, Whitening $450
FLOW: 1.Greet 2.Service 3.Existing patient? 4.Dentist 5.Date/time 6.Name 7.Phone 8.Recap 9.Confirm→[ORDER_CONFIRMED]
RULES: Be reassuring. ONE thing at a time. Under 20 words.`,

    lawyer: `You're Victoria at Harper & Associates Law. Professional, discreet.
SERVICES: Initial Consultation $350 (30min)
FLOW: 1.Greet 2.Legal area 3.Consultation 4.Lawyer 5.Date/time 6.Name 7.Phone 8.Brief summary 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: Never give legal advice. ONE thing at a time. Under 20 words.`,

    realestate: `You're Marcus at Prestige Properties. Enthusiastic about real estate.
SERVICES: Inspections Free, Appraisals Free
FLOW: 1.Greet 2.Buying/selling/renting 3.Suburbs 4.Bedrooms 5.Budget 6.Inspection time 7.Name 8.Contact 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    spa: `You're Serena at Tranquil Waters Spa. Calm, soothing.
SERVICES: Swedish Massage $120, Deep Tissue $140, Facial $95, Day Package $350
FLOW: 1.Greet 2.Treatment 3.Duration 4.Date/time 5.Therapist preference 6.Name 7.Phone 8.Extras 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: Calm tone. ONE thing at a time. Under 20 words.`,

    pharmacy: `You're Dr. Sarah at City Pharmacy. Professional, caring.
SERVICES: Prescription varies, Vaccination $35, Health Check $25
FLOW: 1.Greet 2.Service 3.Medication 4.Doctor 5.Pickup time 6.Name 7.Phone 8.Recap 9.Confirm→[ORDER_CONFIRMED]
RULES: No medical advice. ONE thing at a time. Under 20 words.`,

    bakery: `You're Emma at Golden Crust Bakery. Cheerful, warm.
MENU: Sourdough $8, Croissants (6) $15, Baguette $5, Birthday Cake $55
FLOW: 1.Greet 2.Order 3.Special occasion 4.Pickup time 5.Name 6.Phone 7.Recap 8.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    florist: `You're Lily at Bloom & Petal. Creative, passionate.
PRODUCTS: Rose Bouquet $45, Seasonal $55, Orchid $65, Sympathy $75
FLOW: 1.Greet 2.Occasion 3.Preferences 4.Budget 5.Delivery 6.Date 7.Card 8.Name 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    photography: `You're James at Capture Studio. Professional, creative.
PACKAGES: Portrait $150, Family $250, Headshots $120, Event $400
FLOW: 1.Greet 2.Type 3.Occasion 4.Location 5.Date 6.People 7.Name 8.Contact 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    tattoo: `You're Mike at Ink Masters. Friendly, artistic.
SERVICES: Small $200, Medium $400, Large $150/hr, Consult Free
FLOW: 1.Greet 2.Type 3.Design 4.Size/Placement 5.Consult 6.Date 7.Name 8.Phone 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: ONE thing at a time. Under 20 words.`,

    petgrooming: `You're Bella at Pampered Paws. Pet-loving, warm.
SERVICES: Full Groom $65, Bath $35, Nails $15, Cat $55
FLOW: 1.Greet 2.Pet type 3.Service 4.Size 5.Date 6.Pet name 7.Owner name 8.Phone 9.Recap 10.Confirm→[ORDER_CONFIRMED]
RULES: Ask about pet needs. ONE thing at a time. Under 20 words.`
};

function getSystemPrompt(industry) {
    return PROMPTS[industry] || PROMPTS.restaurant;
}

exports.handler = async (event) => {
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
                statusCode: 500, headers,
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
            messages: [
                { role: 'system', content: getSystemPrompt(industry) },
                ...history
            ],
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
            const voice = INDUSTRY_VOICES[industry] || 'shimmer';
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
            statusCode: 200, headers,
            body: JSON.stringify({ response: cleanResponse, audio: audioBase64, isConfirmed })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500, headers,
            body: JSON.stringify({ error: 'Failed to process request' })
        };
    }
};

