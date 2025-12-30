// ============================================
// DAYCARE - Little Stars Daycare
// ============================================

const daycare = {
    id: 'daycare',
    category: 'lifestyle',
    
    icon: '👶',
    customerIcon: '👤',
    color: '#fbbf24',
    cardIcon: 'fa-baby',
    voice: 'shimmer',
    
    en: {
        name: 'Little Stars Daycare',
        aiName: 'Jenny',
        steps: ['Call', 'Enroll', 'Confirm', 'Done'],
        totalLabel: 'Care',
        cardTitle: 'Enrollment',
        responses: {
            greeting: "Hi, I'm looking for daycare for my daughter",
            child: "She's 2 and a half years old",
            days: "Monday, Wednesday and Friday",
            startDate: "We'd like to start in February",
            specialNeeds: "She has a nut allergy",
            parentName: "Emma Watson",
            phone: "0467 890 123",
            confirm: "Yes, let's enroll her"
        }
    },
    
    prompt: `You're Miss Jenny at Little Stars Daycare. You handle enrollment enquiries and bookings.

SERVICES:
- Full Day (7am-6pm) – $120
- Half Day (4 hours) – $70
- Before School Care – $25
- After School Care – $35
- Holiday Program – $85/day
- Casual Day – $130

AGES:
- Babies (6 weeks - 2 years)
- Toddlers (2-3 years)
- Preschool (3-5 years)

YOUR PERSONALITY:
- Warm and nurturing
- Phrases like: "little ones", "happy and safe"
- Loves working with children
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Little Stars Daycare, Miss Jenny speaking!"
2. CHILD: "How old is your little one?"
3. DAYS: "What days do you need?"
4. START DATE: "When were you hoping to start?"
5. SPECIAL NEEDS: "Any allergies or special requirements?"
6. PARENT NAME & PHONE: Get contact details
7. WAITLIST/BOOK: Check availability
8. CONFIRMATION: "Want me to start the enrollment?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be warm and reassuring to parents
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '👶', label: 'Enroll', text: "I'm looking for childcare" },
        { emoji: '📅', label: 'Availability', text: "Do you have spots available?" },
        { emoji: '💰', label: 'Fees', text: "What are your fees?" }
    ],
    
    menuItems: [
        { emoji: '☀️', name: 'Full Day', desc: '7am to 6pm', price: 120 },
        { emoji: '🌤️', name: 'Half Day', desc: '4 hour session', price: 70 },
        { emoji: '🌅', name: 'Before School', desc: 'Early care', price: 25 },
        { emoji: '🌆', name: 'After School', desc: 'Afternoon care', price: 35 }
    ],
    
    stepInfos: [
        "📞 Miss Jenny answers with warmth and care!",
        "👶 Discussing child's age and care needs.",
        "✅ Checking availability and special requirements.",
        "🎉 Enrolled! Your little star will love it here!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'child' },
        { delay: 2500, type: 'days' },
        { delay: 2500, type: 'startDate' },
        { delay: 2500, type: 'specialNeeds' },
        { delay: 2000, type: 'parentName' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Welcome little star! 👶<br><br>Enrollment at <strong>${businessName}</strong> is confirmed!<br><br>We can't wait to meet you! ⭐</div>`,
    
    ticketIcon: '👶'
};

module.exports = daycare;
