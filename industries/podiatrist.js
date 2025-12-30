// ============================================
// PODIATRIST - Happy Feet Podiatry
// ============================================

const podiatrist = {
    id: 'podiatrist',
    category: 'health',

    icon: '🦶',
    customerIcon: '👤',
    color: '#14b8a6',
    cardIcon: 'fa-shoe-prints',
    voice: 'nova',

    en: {
        name: 'Happy Feet Podiatry',
        aiName: 'Kate',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Consult',
        cardTitle: 'Podiatry Appointment',
        responses: {
            greeting: 'Hi, I need to see a podiatrist',
            issue: "I've got heel pain, it's quite painful",
            firstVisit: 'Yes, first time',
            datetime: 'As soon as possible please',
            name: 'Andrew Miller',
            insurance: 'Yes, I have HCF',
            phone: '0445 678 901',
            confirm: "That's perfect, thank you"
        }
    },

    prompt: `You're Dr. Kate's receptionist at Happy Feet Podiatry. You book foot care appointments.

SERVICES:
- Initial Consultation – $90
- General Treatment – $70
- Orthotics Fitting – $350+
- Diabetic Foot Care – $80
- Nail Surgery – $250
- Biomechanical Assessment – $150

YOUR PERSONALITY:
- Professional and empathetic
- Phrases like: "get you back on your feet", "walking comfortably"
- Understanding of foot pain issues
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Happy Feet Podiatry, how can I help?"
2. ISSUE: "What's troubling your feet?"
3. FIRST VISIT: "Have you seen us before?"
4. DATE: "When would you like to come in?"
5. NAME & PHONE: Get contact details
6. INSURANCE: "Do you have private health?"
7. CONFIRMATION: Recap and ask "Lock that in?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be empathetic about pain
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🦶', label: 'Book', text: 'I need to see a podiatrist' },
        { emoji: '🩹', label: 'Pain', text: 'I have foot pain' },
        { emoji: '👟', label: 'Orthotics', text: 'I need orthotics' }
    ],

    menuItems: [
        { emoji: '🩺', name: 'Consultation', desc: 'Initial assessment', price: 90 },
        { emoji: '🦶', name: 'Treatment', desc: 'General foot care', price: 70 },
        { emoji: '👟', name: 'Orthotics', desc: 'Custom fitting', price: 350 },
        { emoji: '🩹', name: 'Diabetic Care', desc: 'Specialist care', price: 80 }
    ],

    stepInfos: [
        "📞 Kate's team answers with care and understanding.",
        '🦶 Discussing foot issues and concerns.',
        '✅ Confirming insurance and appointment time.',
        "🎉 Booked! We'll get you back on your feet."
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'issue' },
        { delay: 2500, type: 'firstVisit' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'insurance' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, _currency = '$') =>
        `<div class="sms-content">Step right in! 🦶<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>We'll get you back on your feet! 👟</div>`,

    ticketIcon: '🦶'
};

module.exports = podiatrist;
