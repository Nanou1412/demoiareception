// ============================================
// CLEANING - Sparkle Clean Co
// ============================================

const cleaning = {
    id: 'cleaning',
    category: 'services',
    
    icon: '🧹',
    customerIcon: '👤',
    color: '#06b6d4',
    cardIcon: 'fa-broom',
    voice: 'nova',
    
    en: {
        name: 'Sparkle Clean Co',
        aiName: 'Maria',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Cleaning Booking',
        responses: {
            greeting: "Hi, I need to book a house cleaning",
            serviceType: "A deep clean please",
            propertySize: "3 bedroom house",
            frequency: "Just a one-time clean",
            datetime: "This Saturday morning",
            address: "45 Oak Street, Richmond",
            name: "Emma Watson",
            phone: "0423 456 789",
            confirm: "Yes, that's perfect"
        }
    },
    
    prompt: `You're Maria, a friendly booking agent at Sparkle Clean Co. You handle residential and commercial cleaning bookings.

SERVICES:
- Regular Clean (2 bed) – $120
- Regular Clean (3 bed) – $150
- Deep Clean – $250+
- End of Lease – $350+
- Office Clean – Quote based
- Window Cleaning – $80+

YOUR PERSONALITY:
- Friendly and professional
- Phrases like: "sparkling clean", "fresh and tidy"
- Assure quality and reliability
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Sparkle Clean, this is Maria! How can I help?"
2. SERVICE TYPE: "What type of cleaning do you need?"
3. PROPERTY SIZE: "How many bedrooms?"
4. FREQUENCY: "One-time or regular service?"
5. DATE: "When would you like us to come?"
6. ADDRESS: "And the address?"
7. NAME & PHONE: Get contact details
8. CONFIRMATION: Recap and ask "Shall I book that?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be professional and reassuring
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🏠', label: 'Book', text: "I need a house cleaning" },
        { emoji: '✨', label: 'Deep', text: "I need a deep clean" },
        { emoji: '🔑', label: 'Lease', text: "End of lease cleaning" }
    ],
    
    menuItems: [
        { emoji: '🏠', name: 'Regular Clean', desc: '2-3 bedroom home', price: 120 },
        { emoji: '✨', name: 'Deep Clean', desc: 'Thorough cleaning', price: 250 },
        { emoji: '🔑', name: 'End of Lease', desc: 'Bond back guarantee', price: 350 },
        { emoji: '🪟', name: 'Windows', desc: 'Interior & exterior', price: 80 }
    ],
    
    stepInfos: [
        "📞 Maria answers ready to help you sparkle!",
        "🧹 Discussing cleaning type and property size.",
        "✅ Confirming date, time and address.",
        "🎉 Booked! Your home will be sparkling soon!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'serviceType' },
        { delay: 2500, type: 'propertySize' },
        { delay: 2500, type: 'frequency' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'address' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Sparkle sparkle! 🧹<br><br>Your cleaning from <strong>${businessName}</strong> is confirmed!<br><br>Get ready for a spotless home! ✨</div>`,
    
    ticketIcon: '🧹'
};

module.exports = cleaning;
