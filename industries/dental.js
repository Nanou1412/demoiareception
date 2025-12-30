// ============================================
// DENTAL - Smile Bright Dental
// ============================================

const dental = {
    id: 'dental',
    category: 'health',

    icon: '🦷',
    customerIcon: '👤',
    color: '#0ea5e9',
    cardIcon: 'fa-tooth',
    voice: 'nova',

    en: {
        name: 'Smile Bright Dental',
        aiName: 'Grace',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Treatment',
        cardTitle: 'Dental Appointment',
        responses: {
            greeting: "Hi, I'd like to book a dental appointment",
            reason: 'Just a regular checkup and clean',
            dentist: 'Anyone available is fine',
            datetime: 'Next Tuesday morning',
            name: 'Jennifer Brown',
            insurance: 'Yes, I have Medibank',
            phone: '0490 123 456',
            confirm: "That's all correct, thanks!"
        }
    },

    prompt: `You're Grace, a friendly receptionist at Smile Bright Dental in Melbourne. You help patients feel at ease about dental visits.

SERVICES:
- Check-up & Clean – $180
- X-rays – $95
- Filling – from $200
- Whitening – $450
- Crown – $1,200
- Emergency – $120 + treatment

YOUR PERSONALITY:
- Warm and reassuring
- Help ease dental anxiety
- Professional but friendly
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Smile Bright Dental, Grace speaking. How can I help?"
2. SERVICE: Ask what they need (check-up, issue, emergency)
3. PATIENT: "Are you an existing patient with us?"
4. DENTIST: "Do you have a preferred dentist?"
5. DATE/TIME: "When suits you best?"
6. NAME: "What name is the appointment under?"
7. PHONE: "And your contact number?"
8. CONFIRMATION: Recap and ask "All confirmed?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be reassuring about dental care
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🦷', label: 'Book', text: 'I need a dental appointment' },
        { emoji: '😬', label: 'Emergency', text: "I have a toothache, it's urgent" },
        { emoji: '💰', label: 'Prices', text: 'What are your prices?' }
    ],

    menuItems: [
        { emoji: '✨', name: 'Check & Clean', desc: 'Regular dental hygiene', price: 180 },
        { emoji: '🦷', name: 'Filling', desc: 'Composite or amalgam', price: 200 },
        { emoji: '😁', name: 'Whitening', desc: 'Professional whitening', price: 450 },
        { emoji: '📸', name: 'X-Ray', desc: 'Digital dental x-ray', price: 95 }
    ],

    stepInfos: [
        '📞 Grace answers with a reassuring, friendly tone.',
        '🦷 Discussing the dental issue and preferred times.',
        '✅ Confirming patient details and insurance info.',
        '🎉 Appointment booked! Smile bright soon!'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'reason' },
        { delay: 2500, type: 'dentist' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'insurance' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">All smiles! 😁<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Remember to brush before your visit! 🦷</div>`,

    ticketIcon: '🦷'
};

module.exports = dental;
