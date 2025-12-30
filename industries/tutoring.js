// ============================================
// TUTORING - BrightMinds Tutoring
// ============================================

const tutoring = {
    id: 'tutoring',
    category: 'professional',

    icon: '📚',
    customerIcon: '👤',
    color: '#6366f1',
    cardIcon: 'fa-graduation-cap',
    voice: 'nova',

    en: {
        name: 'BrightMinds Tutoring',
        aiName: 'Amy',
        steps: ['Call', 'Match', 'Confirm', 'Done'],
        totalLabel: 'Session',
        cardTitle: 'Tutoring Booking',
        responses: {
            greeting: "Hi, I'm looking for a tutor for my son",
            student: "He's in Year 10",
            subject: "Maths, he's struggling with algebra",
            level: 'Year 10, VCE prep',
            goals: 'We want him to improve his grades and confidence',
            schedule: 'Twice a week, after school',
            name: 'Karen Mitchell',
            phone: '0412 345 678',
            confirm: 'Yes, please match us with a tutor'
        }
    },

    prompt: `You're Professor Amy's assistant at BrightMinds Tutoring. You match students with tutors.

SERVICES:
- Primary School (1hr) – $50
- High School (1hr) – $60
- VCE/HSC Specialist – $75
- Uni Level – $80
- Group Session (max 4) – $35/student
- Online Tutoring – Same rates

SUBJECTS:
- Maths, English, Science
- Languages, Music, Art
- Test Prep (NAPLAN, VCE, HSC)

YOUR PERSONALITY:
- Warm and educational
- Phrases like: "great progress", "reach their potential"
- Cares about student success
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "BrightMinds Tutoring, how can I help?"
2. STUDENT: "Who needs tutoring?"
3. SUBJECT: "What subject?"
4. LEVEL: "What year level?"
5. GOALS: "What are you hoping to achieve?"
6. SCHEDULE: "When works for sessions?"
7. NAME & PHONE: Parent contact details
8. CONFIRMATION: Recap and ask "Match you with a tutor?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be supportive and helpful
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '📚', label: 'Tutor', text: 'I need a tutor for my child' },
        { emoji: '🔢', label: 'Maths', text: 'We need maths tutoring' },
        { emoji: '📝', label: 'Exam', text: 'Help with exam preparation' }
    ],

    menuItems: [
        { emoji: '🧒', name: 'Primary', desc: 'Years 1-6', price: 50 },
        { emoji: '👦', name: 'High School', desc: 'Years 7-10', price: 60 },
        { emoji: '🎓', name: 'VCE/HSC', desc: 'Year 11-12 specialist', price: 75 },
        { emoji: '👥', name: 'Group Session', desc: 'Max 4 students', price: 35 }
    ],

    stepInfos: [
        "📞 Amy's team is ready to help your child succeed!",
        '📚 Discussing subject, level and learning goals.',
        '✅ Matching with the perfect tutor.',
        '🎉 Tutor matched! Learning journey begins!'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'student' },
        { delay: 2500, type: 'subject' },
        { delay: 2500, type: 'level' },
        { delay: 2500, type: 'goals' },
        { delay: 2500, type: 'schedule' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Learning begins! 📚<br><br>Your tutoring with <strong>${businessName}</strong> is set up!<br><br>Let's reach their potential! 🌟</div>`,

    ticketIcon: '📚'
};

module.exports = tutoring;
