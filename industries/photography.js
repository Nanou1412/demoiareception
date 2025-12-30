// ============================================
// PHOTOGRAPHY - Capture Studio
// ============================================

const photography = {
    id: 'photography',
    category: 'lifestyle',
    
    icon: '📷',
    customerIcon: '👤',
    color: '#6366f1',
    cardIcon: 'fa-camera',
    voice: 'onyx',
    
    en: {
        name: 'Capture Studio',
        aiName: 'James',
        steps: ['Call', 'Plan', 'Confirm', 'Done'],
        totalLabel: 'Package',
        cardTitle: 'Photo Session',
        responses: {
            greeting: "Hi, I'd like to book a photography session",
            type: "Family photos, we have two kids",
            occasion: "Just want some nice family portraits",
            location: "Outdoor would be lovely, maybe a park",
            datetime: "Next Saturday afternoon",
            people: "Four of us - two adults, two children",
            name: "The Johnson family",
            contact: "0423 456 789, sarah.j@email.com",
            confirm: "Yes, let's book it"
        }
    },
    
    prompt: `You're James, a professional photographer at Capture Studio. You help clients preserve their precious moments.

PACKAGES:
- Portrait Session – $150
- Family Package – $250
- Headshots – $120
- Event Coverage – $400
- Wedding Package – $2500
- Product Photography – $200

YOUR PERSONALITY:
- Professional and creative
- Phrases like: "great light", "perfect shot", "capture the moment"
- Passionate about photography
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Capture Studio, James speaking. How can I help capture your moment?"
2. TYPE: Ask what kind of shoot they need
3. OCCASION: "What's the occasion?"
4. LOCATION: "Studio or on-location?"
5. DATE: "When were you thinking?"
6. PEOPLE: "How many people in the session?"
7. NAME: "And your name?"
8. CONTACT: "Your phone and email?"
9. CONFIRMATION: Recap and ask "Shall I book that?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be professional and creative
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '📷', label: 'Book', text: "I'd like to book a photo session" },
        { emoji: '👨‍👩‍👧‍👦', label: 'Family', text: "I need family photos" },
        { emoji: '💼', label: 'Headshots', text: "I need professional headshots" }
    ],
    
    menuItems: [
        { emoji: '🖼️', name: 'Portrait', desc: 'Individual session', price: 150 },
        { emoji: '👨‍👩‍👧‍👦', name: 'Family', desc: 'Group package', price: 250 },
        { emoji: '💼', name: 'Headshots', desc: 'Professional photos', price: 120 },
        { emoji: '🎉', name: 'Event', desc: 'Full coverage', price: 400 }
    ],
    
    stepInfos: [
        "📞 James answers ready to capture your moment!",
        "📷 Discussing shoot type, location and occasion.",
        "✅ Confirming date, people and package.",
        "🎉 Session booked! Get ready for amazing photos!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'type' },
        { delay: 2500, type: 'occasion' },
        { delay: 2500, type: 'location' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'people' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'contact' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Say cheese! 📷<br><br>Your photo session with <strong>${businessName}</strong> is confirmed!<br><br>Get ready for amazing shots! ✨</div>`,
    
    ticketIcon: '📷'
};

module.exports = photography;
