// ============================================
// REAL ESTATE - Prestige Properties
// ============================================

const realestate = {
    id: 'realestate',
    category: 'professional',

    icon: '🏠',
    customerIcon: '👤',
    color: '#059669',
    cardIcon: 'fa-home',
    voice: 'echo',

    en: {
        name: 'Prestige Properties',
        aiName: 'Marcus',
        steps: ['Call', 'Discuss', 'Confirm', 'Done'],
        totalLabel: 'Inspection',
        cardTitle: 'Viewing Booking',
        responses: {
            greeting: "Hi, I'm looking to buy a property",
            interest: 'Buying, looking for a family home',
            area: 'South Yarra or Toorak area',
            requirements: '4 bedrooms, prefer a garden',
            budget: 'Around 2 million',
            inspection: 'This weekend would be great',
            name: 'Amanda Roberts',
            contact: '0401 234 567, amanda@email.com',
            confirm: 'Yes, please set that up'
        }
    },

    prompt: `You're Marcus, an enthusiastic real estate agent at Prestige Properties in Melbourne. You help people find their dream home.

SERVICES:
- Property Inspections – Free
- Market Appraisals – Free
- Buyer Consultations
- Rental Listings
- Property Management

YOUR PERSONALITY:
- Enthusiastic and knowledgeable
- Phrases like: "fantastic property", "great location", "won't last long"
- Helpful but not pushy
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Prestige Properties, Marcus speaking. How can I help you today?"
2. INTEREST: Ask if buying, selling, or renting
3. AREA: "What suburbs are you looking at?"
4. REQUIREMENTS: "How many bedrooms are you after?"
5. BUDGET: "And what's your price range?"
6. INSPECTION: "I can arrange some inspections. When are you free?"
7. NAME: "Great! What's your name?"
8. CONTACT: "And your phone and email?"
9. CONFIRMATION: Recap and ask "Shall I set that up?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be enthusiastic but genuine
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🏠', label: 'Buy', text: "I'm looking to buy a property" },
        { emoji: '💰', label: 'Sell', text: 'I want to sell my property' },
        { emoji: '🔑', label: 'Rent', text: "I'm looking to rent" }
    ],

    menuItems: [
        { emoji: '🔍', name: 'Inspection', desc: 'Property viewing', price: 0 },
        { emoji: '📊', name: 'Appraisal', desc: 'Market valuation', price: 0 },
        { emoji: '📋', name: 'Consultation', desc: 'Buyer advice', price: 0 },
        { emoji: '🏘️', name: 'Management', desc: 'Property rental', price: 0 }
    ],

    stepInfos: [
        '📞 Marcus answers enthusiastically about property!',
        '🏠 Discussing requirements, area and budget.',
        '✅ Arranging property inspections.',
        "🎉 Inspections booked! Let's find your dream home!"
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'interest' },
        { delay: 2500, type: 'area' },
        { delay: 2500, type: 'requirements' },
        { delay: 2500, type: 'budget' },
        { delay: 2500, type: 'inspection' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'contact' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Exciting! 🏠<br><br>Your property inspection with <strong>${businessName}</strong> is confirmed!<br><br>Let's find your dream home! 🔑</div>`,

    ticketIcon: '🏠'
};

module.exports = realestate;
