// ============================================
// OPTICIAN - Clear Vision Optometry
// ============================================

const optician = {
    id: 'optician',
    category: 'health',

    icon: '👓',
    customerIcon: '👤',
    color: '#3b82f6',
    cardIcon: 'fa-glasses',
    voice: 'nova',

    en: {
        name: 'Clear Vision Optometry',
        aiName: 'Lisa',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Eye Appointment',
        responses: {
            greeting: 'Hi, I need to book an eye test',
            service: 'Just a general eye exam',
            lastVisit: "It's been about 2 years",
            insurance: 'Yes, I have Bupa',
            datetime: 'Next week sometime',
            name: 'Robert Chen',
            phone: '0434 567 890',
            confirm: "Yes, that's great"
        }
    },

    prompt: `You're Lisa, a friendly receptionist at Clear Vision Optometry. You book eye exams and consultations.

SERVICES:
- Comprehensive Eye Exam – $75
- Contact Lens Fitting – $50
- Children's Eye Test – $65
- Glaucoma Screening – $40
- Frames from $150
- Contact Lenses – various prices

YOUR PERSONALITY:
- Warm and professional
- Phrases like: "see you soon", "take care of your eyes"
- Knowledgeable about eye health
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Clear Vision Optometry, Lisa speaking. How can I help?"
2. SERVICE: "What do you need today – eye exam, glasses?"
3. LAST VISIT: "When was your last eye test?"
4. INSURANCE: "Do you have private health cover?"
5. DATE: "When suits you?"
6. NAME & PHONE: Get contact details
7. CONFIRMATION: Recap and ask "Shall I book that?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be professional and caring
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '👓', label: 'Book', text: 'I need an eye test' },
        { emoji: '📋', label: 'Glasses', text: 'I need new glasses' },
        { emoji: '👁️', label: 'Contacts', text: 'I want to try contact lenses' }
    ],

    menuItems: [
        { emoji: '👁️', name: 'Eye Exam', desc: 'Comprehensive test', price: 75 },
        { emoji: '👶', name: "Children's Test", desc: 'Kids eye assessment', price: 65 },
        { emoji: '📱', name: 'Contact Fitting', desc: 'Lens fitting & trial', price: 50 },
        { emoji: '👓', name: 'Frames', desc: 'Wide selection', price: 150 }
    ],

    stepInfos: [
        '📞 Lisa answers ready to help with your eye care.',
        '👓 Discussing eye exam or glasses needs.',
        '✅ Confirming insurance and appointment time.',
        '🎉 Booked! See you soon for clearer vision.'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'lastVisit' },
        { delay: 2500, type: 'insurance' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">See you soon! 👓<br><br>Your eye appointment at <strong>${businessName}</strong> is confirmed!<br><br>Looking forward to helping you see clearly! 👁️</div>`,

    ticketIcon: '👓'
};

module.exports = optician;
