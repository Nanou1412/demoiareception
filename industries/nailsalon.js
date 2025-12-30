// ============================================
// NAIL SALON - Polished Nails Studio
// ============================================

const nailsalon = {
    id: 'nailsalon',
    category: 'health',

    icon: '💅',
    customerIcon: '👤',
    color: '#f43f5e',
    cardIcon: 'fa-hand-sparkles',
    voice: 'nova',

    en: {
        name: 'Polished Nails Studio',
        aiName: 'Kim',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Nail Appointment',
        responses: {
            greeting: "Hi, I'd like to book a nail appointment",
            service: 'Gel manicure and pedicure please',
            extras: 'Maybe some nail art on the ring fingers',
            datetime: 'This Saturday morning',
            name: 'Sophie',
            phone: '0423 456 789',
            confirm: 'Perfect, thanks!'
        }
    },

    prompt: `You're Kim, a bubbly nail artist at Polished Nails Studio. You book manicures, pedicures and nail art.

SERVICES:
- Classic Manicure – $35
- Gel Manicure – $55
- Classic Pedicure – $45
- Gel Pedicure – $65
- Mani + Pedi Combo – $75
- Nail Art – From $10
- Acrylic Full Set – $80

YOUR PERSONALITY:
- Friendly and trendy
- Phrases like: "gorgeous nails", "looking fabulous"
- Up to date on nail trends
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Polished Nails, Kim here! Ready for gorgeous nails?"
2. SERVICE: "What are you after today – mani, pedi, or both?"
3. TYPE: "Classic, gel or acrylic?"
4. EXTRAS: "Any nail art or special designs?"
5. DATE: "When would you like to come in?"
6. NAME & PHONE: Get contact details
7. CONFIRMATION: Recap and ask "Book you in?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be bubbly and fun
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '💅', label: 'Book', text: "I'd like a nail appointment" },
        { emoji: '✨', label: 'Gel', text: 'Do you do gel nails?' },
        { emoji: '🎨', label: 'Art', text: 'What nail art can you do?' }
    ],

    menuItems: [
        { emoji: '💅', name: 'Gel Manicure', desc: 'Long-lasting gel polish', price: 55 },
        { emoji: '🦶', name: 'Gel Pedicure', desc: 'Luxurious foot treatment', price: 65 },
        { emoji: '✨', name: 'Mani + Pedi', desc: 'Complete package', price: 75 },
        { emoji: '🎨', name: 'Nail Art', desc: 'Custom designs', price: 10 }
    ],

    stepInfos: [
        '📞 Kim answers ready to make your nails fab!',
        '💅 Choosing services - mani, pedi, gel or art.',
        '✅ Confirming appointment time and details.',
        '🎉 Booked! Get ready for gorgeous nails!'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'extras' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Fabulous! 💅<br><br>Your nail appointment at <strong>${businessName}</strong> is confirmed!<br><br>Get ready for gorgeous nails! ✨</div>`,

    ticketIcon: '💅'
};

module.exports = nailsalon;
