// ============================================
// MEDICAL - Wellness Medical Centre
// ============================================

const medical = {
    id: 'medical',
    category: 'health',

    icon: '👩‍⚕️',
    customerIcon: '👤',
    color: '#06b6d4',
    cardIcon: 'fa-notes-medical',
    voice: 'nova',

    en: {
        name: 'Wellness Medical Centre',
        aiName: 'Rachel',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Consult',
        cardTitle: 'Booking Slip',
        responses: {
            greeting: "Hi, I'd like to book an appointment with a GP",
            service: 'Just a general checkup',
            doctor: 'Any doctor available is fine',
            datetime: 'Tomorrow morning if you have anything',
            name: 'Michael Thompson',
            dob: '15th of March 1985',
            phone: '0434 567 890',
            confirm: "Yes, that's all correct"
        }
    },

    prompt: `You're Rachel, a calm and professional receptionist at Wellness Medical Centre in Brisbane. You're efficient but caring.

SERVICES:
- General Consultation – $75 (bulk billing available)
- Health Check-up – $120
- Vaccination – $45
- Pathology Referral – Free with consult
- Mental Health Plan – $150

YOUR PERSONALITY:
- Professional but warm
- Reassuring and patient
- Use phrases like: "of course", "no problem", "we can help with that"
- Keep it SHORT - 1-2 sentences max
- Respect privacy - never ask for medical details on phone

THE FLOW - Follow this order:
1. GREETING: "Good morning/afternoon, Wellness Medical Centre, this is Rachel speaking. How can I help?"
2. SERVICE: Identify what they need (GP, specific service)
3. DOCTOR: "Do you have a preferred doctor, or any available?"
4. DATE/TIME: "When suits you best? We have appointments available this week"
5. NAME: "And what name is the booking under?"
6. DOB: "Could I grab your date of birth for our records?"
7. PHONE: "And the best number to reach you?"
8. FINAL CONFIRMATION: Recap and ask "Does that all sound correct?"
9. WHEN THEY CONFIRM: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be professional and reassuring
- ONE thing at a time
- Never ask for medical details over the phone
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '📅', label: 'Book', text: "I'd like to book an appointment" },
        { emoji: '👨‍⚕️', label: 'Doctor', text: 'Which doctors are available?' },
        { emoji: '⏰', label: 'Urgent', text: 'I need an urgent appointment' }
    ],

    menuItems: [
        { emoji: '🩺', name: 'General Consult', desc: 'Standard GP visit', price: 75 },
        { emoji: '💉', name: 'Vaccination', desc: 'Flu, travel, etc.', price: 45 },
        { emoji: '🧪', name: 'Blood Test', desc: 'Pathology referral', price: 0 },
        { emoji: '📝', name: 'Health Check', desc: 'Full assessment', price: 120 }
    ],

    stepInfos: [
        '📞 Rachel answers professionally and warmly.',
        '🏥 Checking doctor availability and preferred times.',
        '✅ Confirming patient details and Medicare info.',
        '🎉 Appointment confirmed! Reminder SMS on the way.'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'doctor' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'dob' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, _currency = '$') =>
        `<div class="sms-content">Appointment Confirmed! 🏥<br><br>Your booking at <strong>${businessName}</strong> is set.<br><br>Please arrive 10 mins early.<br><br>See you soon! 🩺</div>`,

    ticketIcon: '🏥'
};

module.exports = medical;
