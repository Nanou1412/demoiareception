// ============================================
// EVENT VENUE - Grand Events Hall
// ============================================

const eventvenue = {
    id: 'eventvenue',
    category: 'lifestyle',

    icon: '🎪',
    customerIcon: '👤',
    color: '#7c3aed',
    cardIcon: 'fa-building-columns',
    voice: 'onyx',

    en: {
        name: 'Grand Events Hall',
        aiName: 'Victoria',
        steps: ['Call', 'View', 'Confirm', 'Done'],
        totalLabel: 'Venue',
        cardTitle: 'Viewing Booking',
        responses: {
            greeting: "Hi, I'm looking for a venue for an event",
            eventType: "It's a corporate conference",
            datetime: 'March 15th, all day event',
            guests: 'About 150 people',
            catering: "Yes, we'll need lunch and tea breaks",
            viewing: "Yes, I'd like to see the venue first",
            name: 'David from TechCorp',
            phone: '0489 012 345',
            confirm: 'Yes, book the viewing'
        }
    },

    prompt: `You're Victoria at Grand Events Hall. You book venue viewings and events.

VENUE OPTIONS:
- Main Hall (200 capacity) – From $3,000
- Garden Terrace (100 capacity) – From $2,000
- Boardroom (30 capacity) – $500
- Rooftop (80 capacity) – From $2,500

PACKAGES INCLUDE:
- Tables & chairs
- Basic AV equipment
- Event coordinator
- Catering available

YOUR PERSONALITY:
- Professional and elegant
- Phrases like: "stunning venue", "memorable event"
- Knows the venue well
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Grand Events Hall, Victoria speaking. Planning an event?"
2. EVENT TYPE: "What's the occasion?"
3. DATE: "What date were you thinking?"
4. GUESTS: "How many guests?"
5. CATERING: "Do you need catering?"
6. VIEWING: "Would you like to book a viewing?"
7. NAME & PHONE: Get contact details
8. CONFIRMATION: Recap and ask "Book that viewing?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be elegant and helpful
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🎪', label: 'Book', text: 'I need to book an event venue' },
        { emoji: '👀', label: 'View', text: 'Can I book a venue viewing?' },
        { emoji: '💰', label: 'Pricing', text: 'What are your venue prices?' }
    ],

    menuItems: [
        { emoji: '🏛️', name: 'Main Hall', desc: 'Up to 200 guests', price: 3000 },
        { emoji: '🌿', name: 'Garden Terrace', desc: 'Up to 100 guests', price: 2000 },
        { emoji: '🌆', name: 'Rooftop', desc: 'Up to 80 guests', price: 2500 },
        { emoji: '💼', name: 'Boardroom', desc: 'Up to 30 guests', price: 500 }
    ],

    stepInfos: [
        '📞 Victoria answers with professional elegance.',
        '🎪 Discussing event type, date and guest count.',
        '✅ Arranging venue viewing and requirements.',
        "🎉 Viewing booked! Can't wait to show you around!"
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'eventType' },
        { delay: 2500, type: 'datetime' },
        { delay: 2500, type: 'guests' },
        { delay: 2500, type: 'catering' },
        { delay: 2500, type: 'viewing' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Exciting! 🎪<br><br>Your venue viewing at <strong>${businessName}</strong> is confirmed!<br><br>We'll make your event memorable! ✨</div>`,

    ticketIcon: '🎪'
};

module.exports = eventvenue;
