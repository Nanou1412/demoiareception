// ============================================
// GARAGE - Aussie Auto Care
// ============================================

const garage = {
    id: 'garage',
    category: 'services',

    icon: '🚗',
    customerIcon: '👤',
    color: '#64748b',
    cardIcon: 'fa-car',
    voice: 'onyx',

    en: {
        name: 'Aussie Auto Care',
        aiName: 'Mike',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Service Booking',
        responses: {
            greeting: 'Hi, I need to book my car in for a service',
            service: "Just a regular service, it's due",
            vehicle: "It's a 2019 Toyota Camry",
            datetime: 'Next Monday morning if possible',
            name: 'Sarah Collins',
            phone: '0489 012 345',
            confirm: "That's perfect, thanks"
        }
    },

    prompt: `You're Mike, a friendly and down-to-earth service advisor at Aussie Auto Care in Perth. You know cars and speak plainly.

SERVICES:
- Basic Service – $189
- Full Service – $349
- Brake Check – $49 (free with service)
- Tyre Rotation – $40
- Air Con Regas – $120

YOUR PERSONALITY:
- Friendly, no-nonsense bloke
- Use phrases like: "no worries", "easy done", "she'll be right", "mate"
- Honest and straightforward
- Keep it SHORT - 1-2 sentences max
- Don't oversell

THE FLOW - Follow this order:
1. GREETING: "G'day! Aussie Auto Care, Mike speaking. How can I help ya?"
2. SERVICE: Ask what they need done
3. VEHICLE: "What are you driving? Make and model?"
4. DATE/TIME: "When suits you to bring her in?"
5. NAME: "And what name's that under, mate?"
6. PHONE: "Best number to reach you?"
7. FINAL CONFIRMATION: Recap and ask "All good with that?"
8. WHEN THEY CONFIRM: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be straightforward and honest
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🔧', label: 'Service', text: 'I need to book a car service' },
        { emoji: '🛞', label: 'Tyres', text: 'I need my tyres checked' },
        { emoji: '💨', label: 'Aircon', text: 'My aircon needs a regas' }
    ],

    menuItems: [
        { emoji: '🔧', name: 'Basic Service', desc: 'Oil, filter, check', price: 189 },
        { emoji: '⚙️', name: 'Full Service', desc: 'Complete service', price: 349 },
        { emoji: '🛞', name: 'Brake Check', desc: 'Safety inspection', price: 49 },
        { emoji: '❄️', name: 'Aircon Regas', desc: 'Full recharge', price: 120 }
    ],

    stepInfos: [
        '📞 Mike answers like a true Aussie mechanic.',
        '🚗 Discussing service needs and vehicle details.',
        '✅ Confirming booking date and time.',
        "🎉 Booked in! We'll take good care of her."
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'vehicle' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Booked in mate! 🚗<br><br>Your service at <strong>${businessName}</strong> is confirmed!<br><br>She'll be running sweet! 🔧</div>`,

    ticketIcon: '🚗'
};

module.exports = garage;
