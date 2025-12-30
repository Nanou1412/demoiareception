// ============================================
// MOVING - Swift Movers
// ============================================

const moving = {
    id: 'moving',
    category: 'services',

    icon: '📦',
    customerIcon: '👤',
    color: '#8b5cf6',
    cardIcon: 'fa-truck-moving',
    voice: 'echo',

    en: {
        name: 'Swift Movers',
        aiName: 'Mark',
        steps: ['Call', 'Quote', 'Confirm', 'Done'],
        totalLabel: 'Estimate',
        cardTitle: 'Moving Booking',
        responses: {
            greeting: 'Hi, I need to book a move',
            moveType: "It's a local move",
            size: '3 bedroom house',
            datetime: 'End of the month, the 30th',
            addresses: 'From Carlton to Fitzroy',
            name: 'James Wilson',
            phone: '0478 901 234',
            confirm: "Yes, let's book it"
        }
    },

    prompt: `You're Mark, a moving coordinator at Swift Movers. You book residential and commercial moves.

SERVICES:
- 2 Movers + Truck (2hr min) – $150/hr
- 3 Movers + Truck – $200/hr
- Packing Service – $50/hr per packer
- Piano Moving – From $200
- Interstate Moves – Quote based
- Storage – From $100/week

YOUR PERSONALITY:
- Organized and helpful
- Phrases like: "stress-free move", "we've got you covered"
- Understands moving stress
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Swift Movers, Mark speaking. Planning a move?"
2. MOVE TYPE: "Local or interstate?"
3. SIZE: "How many bedrooms?"
4. DATE: "When's the moving day?"
5. ADDRESSES: "From where to where?"
6. NAME & PHONE: Get contact details
7. QUOTE: Give rough estimate
8. CONFIRMATION: "Want me to book that in?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be reassuring about the process
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '📦', label: 'Book', text: 'I need to book a move' },
        { emoji: '💰', label: 'Quote', text: 'Can I get a quote?' },
        { emoji: '📅', label: 'Date', text: 'What dates are available?' }
    ],

    menuItems: [
        { emoji: '👥', name: '2 Movers + Truck', desc: 'Standard move', price: 150 },
        { emoji: '👥', name: '3 Movers + Truck', desc: 'Larger move', price: 200 },
        { emoji: '📦', name: 'Packing Service', desc: 'Per hour/packer', price: 50 },
        { emoji: '🎹', name: 'Piano Moving', desc: 'Specialist move', price: 200 }
    ],

    stepInfos: [
        '📞 Mark answers ready to plan your stress-free move.',
        '📦 Getting details on size and distance.',
        '✅ Confirming date, addresses and quote.',
        "🎉 Move booked! We've got you covered!"
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'moveType' },
        { delay: 2500, type: 'size' },
        { delay: 2500, type: 'datetime' },
        { delay: 2500, type: 'addresses' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Moving day set! 📦<br><br>Your move with <strong>${businessName}</strong> is confirmed!<br><br>We'll make it stress-free! 🚚</div>`,

    ticketIcon: '📦'
};

module.exports = moving;
