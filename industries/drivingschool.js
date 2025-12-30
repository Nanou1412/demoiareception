// ============================================
// DRIVING SCHOOL - Pass First Driving School
// ============================================

const drivingschool = {
    id: 'drivingschool',
    category: 'professional',
    
    icon: '🚗',
    customerIcon: '👤',
    color: '#ef4444',
    cardIcon: 'fa-car-side',
    voice: 'echo',
    
    en: {
        name: 'Pass First Driving School',
        aiName: 'Mike',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Lesson',
        cardTitle: 'Lesson Booking',
        responses: {
            greeting: "Hi, I'd like to book driving lessons",
            experience: "I've had about 20 hours with my parents",
            license: "Yes, I have my learner's permit",
            package: "Maybe the 5 lesson package",
            datetime: "Weekends would work best",
            pickup: "From home, in Brunswick",
            name: "Jake Thompson",
            phone: "0423 456 789",
            confirm: "Yes, let's book it"
        }
    },
    
    prompt: `You're Instructor Mike's receptionist at Pass First Driving School. You book driving lessons.

SERVICES:
- Single Lesson (1hr) – $70
- 5 Lesson Package – $320
- 10 Lesson Package – $600
- Pre-Test Lesson – $80
- Keys2Drive (FREE with voucher)
- Test Day Package – $150

YOUR PERSONALITY:
- Encouraging and patient
- Phrases like: "you'll do great", "on your way to passing"
- Supportive of nervous learners
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Pass First Driving School, how can I help?"
2. EXPERIENCE: "Have you had lessons before?"
3. LICENSE: "Do you have your learner's permit?"
4. PACKAGE: "Single lesson or a package deal?"
5. DATE: "When suits you – weekday or weekend?"
6. PICKUP: "Where should we pick you up?"
7. NAME & PHONE: Get contact details
8. CONFIRMATION: Recap and ask "Book that in?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be encouraging
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🚗', label: 'Lesson', text: "I want to book driving lessons" },
        { emoji: '📦', label: 'Package', text: "What lesson packages do you have?" },
        { emoji: '📝', label: 'Test', text: "I need a pre-test lesson" }
    ],
    
    menuItems: [
        { emoji: '🚗', name: 'Single Lesson', desc: '1 hour session', price: 70 },
        { emoji: '📦', name: '5 Lessons', desc: 'Save $30', price: 320 },
        { emoji: '🎯', name: '10 Lessons', desc: 'Best value', price: 600 },
        { emoji: '📝', name: 'Test Day', desc: 'Car for test', price: 150 }
    ],
    
    stepInfos: [
        "📞 Booking team ready to get you on the road!",
        "🚗 Checking experience and learner permit.",
        "✅ Setting up lessons and pickup location.",
        "🎉 Lessons booked! You'll pass in no time!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'experience' },
        { delay: 2500, type: 'license' },
        { delay: 2500, type: 'package' },
        { delay: 2500, type: 'datetime' },
        { delay: 2500, type: 'pickup' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Let's drive! 🚗<br><br>Your lesson with <strong>${businessName}</strong> is booked!<br><br>You'll pass in no time! 🎉</div>`,
    
    ticketIcon: '🚗'
};

module.exports = drivingschool;
