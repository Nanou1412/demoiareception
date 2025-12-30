// ============================================
// PHARMACY - City Pharmacy
// ============================================

const pharmacy = {
    id: 'pharmacy',
    category: 'health',
    
    icon: '💊',
    customerIcon: '👤',
    color: '#22c55e',
    cardIcon: 'fa-prescription-bottle',
    voice: 'nova',
    
    en: {
        name: 'City Pharmacy',
        aiName: 'Sarah',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Pharmacy Order',
        responses: {
            greeting: "Hi, I need to order a prescription",
            medication: "It's my blood pressure medication",
            doctor: "Yes, Dr. Smith sent it through",
            pickupTime: "In about an hour",
            name: "John Williams",
            phone: "0456 789 012",
            confirm: "Yes, that's all correct"
        }
    },
    
    prompt: `You're Dr. Sarah, a helpful pharmacist at City Pharmacy. You assist with prescriptions and health advice.

SERVICES:
- Prescription Fill – varies
- Medication Review – Free
- Vaccinations – $35
- Health Check – $25
- Blood Pressure Test – Free

YOUR PERSONALITY:
- Professional and caring
- Phrases like: "let me check that", "of course", "happy to help"
- Reassuring but efficient
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "City Pharmacy, this is Sarah. How can I help you today?"
2. SERVICE: Ask what they need (prescription, advice, vaccination)
3. MEDICATION: If prescription, ask which medication
4. DOCTOR: "Is this from your regular GP?"
5. PICKUP TIME: "When would you like to collect it?"
6. NAME: "And what name is the prescription under?"
7. PHONE: "And your contact number?"
8. CONFIRMATION: Recap and ask "Shall I prepare that?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be professional and reassuring
- ONE thing at a time
- Never give medical advice over the phone
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '💊', label: 'Script', text: "I need to fill a prescription" },
        { emoji: '💉', label: 'Vaccine', text: "I need a flu vaccination" },
        { emoji: '❓', label: 'Advice', text: "I need some health advice" }
    ],
    
    menuItems: [
        { emoji: '💊', name: 'Prescription', desc: 'Medication fill', price: 0 },
        { emoji: '💉', name: 'Vaccination', desc: 'Flu, COVID etc.', price: 35 },
        { emoji: '❤️', name: 'Health Check', desc: 'Quick assessment', price: 25 },
        { emoji: '🩺', name: 'BP Check', desc: 'Blood pressure', price: 0 }
    ],
    
    stepInfos: [
        "📞 Sarah answers ready to help with your health needs.",
        "💊 Checking prescription and medication details.",
        "✅ Confirming pickup time and patient info.",
        "🎉 Prescription ready! Come collect anytime."
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'medication' },
        { delay: 2500, type: 'doctor' },
        { delay: 2500, type: 'pickupTime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Ready for pickup! 💊<br><br>Your prescription at <strong>${businessName}</strong> is ready.<br><br>See you soon! 🏥</div>`,
    
    ticketIcon: '💊'
};

module.exports = pharmacy;
