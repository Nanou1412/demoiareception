// ============================================
// LANDSCAPING - Green Thumb Gardens
// ============================================

const landscaping = {
    id: 'landscaping',
    category: 'services',

    icon: '🌿',
    customerIcon: '👤',
    color: '#22c55e',
    cardIcon: 'fa-leaf',
    voice: 'echo',

    en: {
        name: 'Green Thumb Gardens',
        aiName: 'Tom',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Garden Booking',
        responses: {
            greeting: 'Hi, I need some gardening work done',
            service: 'Lawn mowing and hedge trimming',
            size: 'Medium sized yard, about 400 sqm',
            frequency: 'Monthly would be great',
            datetime: 'Next week sometime',
            address: '22 Garden Lane, Toorak',
            name: 'Peter Green',
            phone: '0456 789 012',
            confirm: "Yes, that's great"
        }
    },

    prompt: `You're Tom, a friendly garden expert at Green Thumb Gardens. You book lawn and garden services.

SERVICES:
- Lawn Mow (standard) – $60
- Lawn Mow (large) – $90
- Hedge Trimming – $80+
- Garden Clean-up – $200+
- Tree Pruning – Quote based
- Regular Maintenance – From $120/fortnight

YOUR PERSONALITY:
- Friendly and outdoorsy
- Phrases like: "looking great", "healthy garden"
- Loves plants and gardens
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Green Thumb Gardens, Tom here! What can we do for your garden?"
2. SERVICE: "What work do you need done?"
3. SIZE: "How big is the yard roughly?"
4. FREQUENCY: "One-off or regular service?"
5. DATE: "When would you like us out?"
6. ADDRESS & NAME: Get details
7. CONFIRMATION: Recap and ask "Sound good?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be enthusiastic about gardens
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🌿', label: 'Book', text: 'I need garden work done' },
        { emoji: '🌱', label: 'Mowing', text: 'I need lawn mowing' },
        { emoji: '🌳', label: 'Trees', text: 'I need tree pruning' }
    ],

    menuItems: [
        { emoji: '🌱', name: 'Lawn Mow', desc: 'Standard yard', price: 60 },
        { emoji: '🌲', name: 'Hedge Trim', desc: 'Shape and trim', price: 80 },
        { emoji: '🧹', name: 'Garden Cleanup', desc: 'Full tidy up', price: 200 },
        { emoji: '📅', name: 'Regular Care', desc: 'Fortnightly visits', price: 120 }
    ],

    stepInfos: [
        '📞 Tom answers with enthusiasm for gardens!',
        '🌿 Discussing garden work and yard size.',
        '✅ Confirming schedule and address.',
        '🎉 Booked! Your garden will look amazing!'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'size' },
        { delay: 2500, type: 'frequency' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'address' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Green thumbs up! 🌿<br><br>Your garden service with <strong>${businessName}</strong> is booked!<br><br>Your yard will be beautiful! 🌱</div>`,

    ticketIcon: '🌿'
};

module.exports = landscaping;
