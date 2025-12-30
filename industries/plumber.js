// ============================================
// PLUMBER - Quick Flow Plumbing
// ============================================

const plumber = {
    id: 'plumber',
    category: 'services',

    icon: '🔧',
    customerIcon: '👤',
    color: '#3b82f6',
    cardIcon: 'fa-wrench',
    voice: 'onyx',

    en: {
        name: 'Quick Flow Plumbing',
        aiName: 'Steve',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Job',
        cardTitle: 'Service Call',
        responses: {
            greeting: 'Hi, I need a plumber',
            issue: "I've got a blocked drain in the kitchen",
            urgency: "It's pretty bad, water's backing up",
            address: '78 River Road, Southbank',
            datetime: 'Today if possible',
            name: 'Tom Bradley',
            phone: '0445 678 901',
            confirm: 'Yep, see you then'
        }
    },

    prompt: `You're Steve, a no-nonsense scheduler at Quick Flow Plumbing. You book plumbing jobs efficiently.

SERVICES:
- Call-out Fee – $80
- Blocked Drain – $150+
- Leaking Tap – $120
- Hot Water Repair – $200+
- Toilet Repair – $150
- Emergency (24/7) – $120 call-out

YOUR PERSONALITY:
- Direct and efficient
- Phrases like: "we'll fix that", "no worries mate"
- Understands urgency
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Quick Flow Plumbing, Steve here. What's the problem?"
2. ISSUE: "What's happening exactly?"
3. URGENCY: "Is it an emergency or can it wait?"
4. ADDRESS: "What's the address?"
5. DATE/TIME: "When can we come out?"
6. NAME & PHONE: Get contact details
7. CONFIRMATION: Recap and ask "Book it in?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Prioritize emergencies
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🔧', label: 'Book', text: 'I need a plumber' },
        { emoji: '🚨', label: 'Emergency', text: 'I have a plumbing emergency' },
        { emoji: '🚿', label: 'Drain', text: 'I have a blocked drain' }
    ],

    menuItems: [
        { emoji: '🚿', name: 'Blocked Drain', desc: 'Clear blockages', price: 150 },
        { emoji: '🚰', name: 'Leaking Tap', desc: 'Repair or replace', price: 120 },
        { emoji: '🔥', name: 'Hot Water', desc: 'Repair or install', price: 200 },
        { emoji: '🚽', name: 'Toilet Repair', desc: 'All toilet issues', price: 150 }
    ],

    stepInfos: [
        '📞 Steve answers ready to tackle your plumbing problem.',
        '🔧 Getting details on the plumbing issue.',
        '✅ Confirming address and arrival time.',
        "🎉 Plumber on the way! We'll fix it."
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
        `<div class="sms-content">On our way! 🔧<br><br>Your plumber from <strong>${businessName}</strong> is booked!<br><br>We'll get it flowing! 🚿</div>`,

    ticketIcon: '🔧'
};

module.exports = plumber;
