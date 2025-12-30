// ============================================
// MASSAGE - Healing Hands Massage
// ============================================

const massage = {
    id: 'massage',
    category: 'health',

    icon: '💆',
    customerIcon: '👤',
    color: '#8b5cf6',
    cardIcon: 'fa-hands',
    voice: 'shimmer',

    en: {
        name: 'Healing Hands Massage',
        aiName: 'Zen',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Session',
        cardTitle: 'Massage Booking',
        responses: {
            greeting: "Hi, I'd like to book a massage",
            service: 'Deep tissue please, my back is killing me',
            duration: '60 minutes',
            therapist: 'Anyone available is fine',
            datetime: 'Tomorrow afternoon',
            name: 'Marcus',
            phone: '0412 345 678',
            confirm: "Yes, that's perfect"
        }
    },

    prompt: `You're Zen, a calming receptionist at Healing Hands Massage. You book therapeutic massage sessions.

SERVICES:
- Relaxation Massage (60min) – $90
- Deep Tissue (60min) – $100
- Hot Stone (75min) – $120
- Sports Massage (60min) – $95
- Pregnancy Massage – $100
- Couples Massage – $180

YOUR PERSONALITY:
- Calm and soothing voice
- Phrases like: "relax and unwind", "melt away tension"
- Promotes wellness
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Healing Hands Massage, this is Zen. Ready to relax?"
2. SERVICE: "What type of massage are you after?"
3. DURATION: "30, 60 or 90 minutes?"
4. THERAPIST: "Do you have a preferred therapist?"
5. DATE: "When would you like to come in?"
6. NAME & PHONE: Get contact details
7. CONFIRMATION: Recap and ask "Shall I book that?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be calm and relaxing
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '💆', label: 'Book', text: "I'd like to book a massage" },
        { emoji: '💪', label: 'Deep Tissue', text: 'I need a deep tissue massage' },
        { emoji: '❓', label: 'Types', text: 'What types of massage do you offer?' }
    ],

    menuItems: [
        { emoji: '😌', name: 'Relaxation', desc: 'Gentle soothing massage', price: 90 },
        { emoji: '💪', name: 'Deep Tissue', desc: 'Therapeutic pressure', price: 100 },
        { emoji: '🔥', name: 'Hot Stone', desc: 'Heated stone therapy', price: 120 },
        { emoji: '🏃', name: 'Sports', desc: 'Athletic recovery', price: 95 }
    ],

    stepInfos: [
        '📞 Zen answers in a calm, peaceful voice.',
        '💆 Discussing massage type and duration.',
        '✅ Confirming therapist and time slot.',
        '🎉 Booked! Time to relax and unwind.'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'duration' },
        { delay: 2500, type: 'therapist' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, _currency = '$') =>
        `<div class="sms-content">Relax... 💆<br><br>Your massage at <strong>${businessName}</strong> is confirmed!<br><br>Time to melt away the tension! 🌿</div>`,

    ticketIcon: '💆'
};

module.exports = massage;
