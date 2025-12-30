// ============================================
// LAWYER - Harper & Associates Law
// ============================================

const lawyer = {
    id: 'lawyer',
    category: 'professional',

    icon: '⚖️',
    customerIcon: '👤',
    color: '#1e3a5f',
    cardIcon: 'fa-gavel',
    voice: 'onyx',

    en: {
        name: 'Harper & Associates Law',
        aiName: 'Victoria',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Consultation',
        cardTitle: 'Appointment',
        responses: {
            greeting: 'Hi, I need to speak with a lawyer',
            area: "It's regarding a property matter",
            consultation: "Yes, I'd like to book a consultation",
            lawyer: 'Anyone available is fine',
            datetime: 'Early next week if possible',
            name: 'Richard Thompson',
            phone: '0490 123 456',
            brief: 'Property settlement dispute',
            confirm: "Yes, that's all correct"
        }
    },

    prompt: `You're Victoria, a professional and discreet legal receptionist at Harper & Associates Law Firm in Sydney.

SERVICES:
- Initial Consultation – $350 (30 min)
- Family Law
- Property & Conveyancing
- Wills & Estates
- Business Law
- Criminal Defence

YOUR PERSONALITY:
- Professional and discreet
- Reassuring but formal
- Never give legal advice
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Harper & Associates, Victoria speaking. How may I direct your call?"
2. AREA: Ask what type of legal matter
3. CONSULTATION: "Would you like to book an initial consultation?"
4. LAWYER: "Do you have a preferred solicitor?"
5. DATE/TIME: "When would suit you?"
6. NAME: "May I have your full name?"
7. PHONE: "And the best number to reach you?"
8. BRIEF: "Can you give me a one-sentence summary for the file?"
9. CONFIRMATION: Recap and ask "Shall I confirm this appointment?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Maintain confidentiality
- Never give legal advice
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '⚖️', label: 'Consult', text: 'I need legal advice' },
        { emoji: '🏠', label: 'Property', text: 'I have a property matter' },
        { emoji: '👨‍👩‍👧', label: 'Family', text: 'I need family law help' }
    ],

    menuItems: [
        { emoji: '💼', name: 'Consultation', desc: 'Initial 30 min meeting', price: 350 },
        { emoji: '🏠', name: 'Property Law', desc: 'Conveyancing & disputes', price: 0 },
        { emoji: '👨‍👩‍👧', name: 'Family Law', desc: 'Separation & custody', price: 0 },
        { emoji: '📜', name: 'Wills & Estates', desc: 'Estate planning', price: 0 }
    ],

    stepInfos: [
        '📞 Victoria answers professionally and discreetly.',
        '⚖️ Identifying the legal matter and needs.',
        '✅ Confirming solicitor and appointment time.',
        '🎉 Consultation booked! Confidential and secure.'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'area' },
        { delay: 2500, type: 'consultation' },
        { delay: 2500, type: 'lawyer' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2500, type: 'brief' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, _currency = '$') =>
        `<div class="sms-content">Confirmed ⚖️<br><br>Your consultation at <strong>${businessName}</strong> is booked.<br><br>Please bring relevant documents. 📋</div>`,

    ticketIcon: '⚖️'
};

module.exports = lawyer;
