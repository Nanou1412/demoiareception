// ============================================
// ELECTRICIAN - PowerUp Electric
// ============================================

const electrician = {
    id: 'electrician',
    category: 'services',

    icon: '⚡',
    customerIcon: '👤',
    color: '#eab308',
    cardIcon: 'fa-bolt',
    voice: 'onyx',

    en: {
        name: 'PowerUp Electric',
        aiName: 'Dave',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Job',
        cardTitle: 'Service Call',
        responses: {
            greeting: 'Hi, I need an electrician',
            issue: 'Some power points have stopped working',
            urgency: "It's not urgent, but I'd like it fixed soon",
            address: '12 Pine Avenue, Carlton',
            datetime: 'Tomorrow if possible',
            name: 'Mike Stevens',
            phone: '0434 567 890',
            confirm: 'Yep, that works'
        }
    },

    prompt: `You're Dave, a friendly scheduler at PowerUp Electric. You book electrical jobs for residential and commercial clients.

SERVICES:
- Call-out Fee – $90
- Powerpoint Install – $150
- Light Fixture – $80+
- Switchboard Upgrade – $500+
- Safety Inspection – $200
- Emergency (24/7) – $150 call-out

YOUR PERSONALITY:
- Professional and knowledgeable
- Phrases like: "we'll sort that out", "no worries"
- Safety-focused
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "PowerUp Electric, Dave speaking. What's the job?"
2. ISSUE: "What electrical work do you need?"
3. URGENCY: "Is it urgent or can it wait a few days?"
4. ADDRESS: "What's the property address?"
5. DATE: "When suits you best?"
6. NAME & PHONE: Get contact details
7. CONFIRMATION: Recap and ask "Lock that in?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Ask about safety concerns
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '⚡', label: 'Book', text: 'I need an electrician' },
        { emoji: '🚨', label: 'Emergency', text: 'I have an electrical emergency' },
        { emoji: '💡', label: 'Lights', text: 'I need lights installed' }
    ],

    menuItems: [
        { emoji: '🔌', name: 'Powerpoint', desc: 'Install or repair', price: 150 },
        { emoji: '💡', name: 'Light Fixture', desc: 'Install new lights', price: 80 },
        { emoji: '⚡', name: 'Switchboard', desc: 'Upgrade or repair', price: 500 },
        { emoji: '🔍', name: 'Safety Check', desc: 'Full inspection', price: 200 }
    ],

    stepInfos: [
        '📞 Dave answers ready to solve your electrical issues.',
        '⚡ Discussing the electrical problem and urgency.',
        '✅ Confirming address and appointment time.',
        "🎉 Electrician booked! We'll have it sorted."
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'issue' },
        { delay: 2500, type: 'urgency' },
        { delay: 2500, type: 'address' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Sparky's coming! ⚡<br><br>Your electrical job with <strong>${businessName}</strong> is booked!<br><br>We'll sort it out! 🔌</div>`,

    ticketIcon: '⚡'
};

module.exports = electrician;
