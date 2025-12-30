// ============================================
// GYM - Peak Fitness Brisbane
// ============================================

const gym = {
    id: 'gym',
    category: 'lifestyle',
    
    icon: '💪',
    customerIcon: '👤',
    color: '#f97316',
    cardIcon: 'fa-dumbbell',
    voice: 'echo',
    
    en: {
        name: 'Peak Fitness Brisbane',
        aiName: 'Alex',
        steps: ['Call', 'Join', 'Confirm', 'Done'],
        totalLabel: 'Membership',
        cardTitle: 'Member Card',
        responses: {
            greeting: "Hi, I'm interested in joining the gym",
            interest: "Looking for a full membership with classes",
            goals: "Mainly weight loss and general fitness",
            tour: "Yes, I'd like to see the facilities first",
            membership: "The Premium sounds good",
            startDate: "I'd like to start next Monday",
            name: "Chris Anderson",
            contact: "0412 345 678, chris.a@email.com",
            confirm: "Yes, sign me up!"
        }
    },
    
    prompt: `You're Alex, an energetic and motivating membership advisor at Peak Fitness Brisbane.

MEMBERSHIPS:
- Basic (gym only) – $45/week
- Premium (gym + classes) – $65/week
- VIP (all access + PT session) – $99/week
- Day Pass – $25
- Personal Training – $80/session

YOUR PERSONALITY:
- Energetic and motivating
- Phrases like: "awesome", "let's do it", "great goal"
- Supportive and encouraging
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Hey! Peak Fitness, Alex speaking. How can I help?"
2. INTEREST: Ask what they're looking for (membership, day pass, PT)
3. GOALS: "What are your fitness goals?"
4. TOUR: "Would you like to come in for a tour first?"
5. MEMBERSHIP: Explain options briefly
6. START DATE: "When were you thinking of starting?"
7. NAME: "Awesome! And what's your name?"
8. CONTACT: "Best number and email to reach you?"
9. CONFIRMATION: Recap and ask "Ready to get started?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be motivating but not pushy
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '💪', label: 'Join', text: "I want to join the gym" },
        { emoji: '🎫', label: 'Day Pass', text: "Can I get a day pass?" },
        { emoji: '🏋️', label: 'PT', text: "Tell me about personal training" }
    ],
    
    menuItems: [
        { emoji: '🏃', name: 'Basic', desc: 'Gym access only', price: 45 },
        { emoji: '⭐', name: 'Premium', desc: 'Gym + all classes', price: 65 },
        { emoji: '👑', name: 'VIP', desc: 'All access + PT', price: 99 },
        { emoji: '🎫', name: 'Day Pass', desc: 'Single visit', price: 25 }
    ],
    
    stepInfos: [
        "📞 Alex answers with energy and motivation!",
        "💪 Discussing fitness goals and membership options.",
        "✅ Setting up your membership start date.",
        "🎉 Welcome to the team! Let's crush those goals!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'interest' },
        { delay: 2500, type: 'goals' },
        { delay: 2500, type: 'tour' },
        { delay: 2500, type: 'membership' },
        { delay: 2500, type: 'startDate' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'contact' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Let's go! 💪<br><br>Your membership at <strong>${businessName}</strong> is active!<br><br>Time to crush those goals! 🏆</div>`,
    
    ticketIcon: '💪'
};

module.exports = gym;
