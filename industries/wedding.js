// ============================================
// WEDDING - Forever After Weddings
// ============================================

const wedding = {
    id: 'wedding',
    category: 'lifestyle',
    
    icon: '💒',
    customerIcon: '👤',
    color: '#f43f5e',
    cardIcon: 'fa-heart',
    voice: 'nova',
    
    en: {
        name: 'Forever After Weddings',
        aiName: 'Grace',
        steps: ['Call', 'Plan', 'Confirm', 'Done'],
        totalLabel: 'Package',
        cardTitle: 'Consultation',
        responses: {
            greeting: "Hi, we're getting married and need help planning",
            date: "We're looking at October next year",
            venue: "We have a venue, it's at the Grand Hotel",
            guests: "About 120 guests",
            services: "Full planning and coordination",
            budget: "Around $30,000 all up",
            coupleNames: "James and Emily",
            phone: "0478 901 234",
            confirm: "Yes, let's book a consultation"
        }
    },
    
    prompt: `You're Grace at Forever After Weddings. You book initial consultations for wedding planning.

PACKAGES:
- Full Planning – From $5,000
- Partial Planning – From $2,500
- Day-of Coordination – $1,500
- Destination Wedding – Quote based
- Elopement Package – $800

YOUR PERSONALITY:
- Romantic and excited
- Phrases like: "dream wedding", "perfect day", "congratulations!"
- Shares in their excitement
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Forever After Weddings, Grace speaking. Congratulations!"
2. DATE: "When's the big day?"
3. VENUE: "Do you have a venue in mind?"
4. GUESTS: "How many guests?"
5. SERVICES: "What help do you need?"
6. BUDGET: "What's your overall budget?"
7. COUPLE NAMES & PHONE: Get contact details
8. CONSULTATION: "Want to book a free consultation?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be excited and romantic
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '💒', label: 'Plan', text: "We need wedding planning help" },
        { emoji: '📅', label: 'Date', text: "We have a date, need a planner" },
        { emoji: '💰', label: 'Packages', text: "What packages do you offer?" }
    ],
    
    menuItems: [
        { emoji: '👑', name: 'Full Planning', desc: 'Complete service', price: 5000 },
        { emoji: '📋', name: 'Partial', desc: 'Selected services', price: 2500 },
        { emoji: '📅', name: 'Day-of', desc: 'Coordination only', price: 1500 },
        { emoji: '💕', name: 'Elopement', desc: 'Intimate package', price: 800 }
    ],
    
    stepInfos: [
        "📞 Grace answers with wedding excitement!",
        "💒 Discussing date, venue and vision.",
        "✅ Matching to the perfect planning package.",
        "🎉 Consultation booked! Let's plan your dream day!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'date' },
        { delay: 2500, type: 'venue' },
        { delay: 2500, type: 'guests' },
        { delay: 2500, type: 'services' },
        { delay: 2500, type: 'budget' },
        { delay: 2000, type: 'coupleNames' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Congratulations! 💒<br><br>Your consultation with <strong>${businessName}</strong> is confirmed!<br><br>Let's plan your dream wedding! 💕</div>`,
    
    ticketIcon: '💒'
};

module.exports = wedding;
