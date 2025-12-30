// ============================================
// VET - Paws & Claws Veterinary Clinic
// ============================================

const vet = {
    id: 'vet',
    category: 'health',

    icon: '🐕',
    customerIcon: '👤',
    color: '#14b8a6',
    cardIcon: 'fa-paw',
    voice: 'shimmer',

    en: {
        name: 'Paws & Claws Vet Clinic',
        aiName: 'Bella',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Consult',
        cardTitle: 'Vet Appointment',
        responses: {
            greeting: 'Hi, I need to book an appointment for my dog',
            petType: "He's a golden retriever named Max",
            reason: "He's been scratching a lot and seems uncomfortable",
            datetime: 'As soon as possible please',
            petName: 'Max',
            ownerName: 'Sarah Johnson',
            phone: '0412 345 678',
            confirm: "Yes, that's all correct"
        }
    },

    prompt: `You're Dr. Sarah's receptionist, Bella, at Paws & Claws Veterinary Clinic in Sydney. You're gentle and caring, especially about pets.

SERVICES:
- Consultation – $75
- Vaccination – $95
- Health Check – $60
- Dental Clean – $350
- Desexing – from $300
- Emergency – $150 + treatment

YOUR PERSONALITY:
- Warm and caring about animals
- Reassuring to worried pet parents
- Phrases like: "poor little one", "we'll take good care of them"
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Paws & Claws Vet Clinic, this is Bella. How can I help?"
2. CONCERN: Ask what's happening with their pet
3. PET INFO: "What's your pet's name and what type of animal?"
4. URGENCY: Assess if it's urgent or routine
5. APPOINTMENT: "When would you like to bring them in?"
6. OWNER NAME: "And your name?"
7. PHONE: "Best number to reach you?"
8. CONFIRMATION: Recap and ask "Does that work for you?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Show empathy for pet and owner
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🐾', label: 'Book', text: 'I need to book a vet appointment' },
        { emoji: '🚨', label: 'Emergency', text: 'My pet needs urgent care' },
        { emoji: '💉', label: 'Vaccines', text: 'I need to update vaccinations' }
    ],

    menuItems: [
        { emoji: '🩺', name: 'Consultation', desc: 'General checkup', price: 75 },
        { emoji: '💉', name: 'Vaccination', desc: 'Annual vaccines', price: 95 },
        { emoji: '✂️', name: 'Desexing', desc: 'Surgical procedure', price: 300 },
        { emoji: '🦷', name: 'Dental Clean', desc: 'Pet dental care', price: 350 }
    ],

    stepInfos: [
        '📞 Bella answers with love for all furry friends!',
        '🐾 Getting pet details, symptoms and urgency level.',
        '✅ Confirming owner details and pet information.',
        '🎉 Appointment booked! See you at the clinic.'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'petType' },
        { delay: 2500, type: 'reason' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'petName' },
        { delay: 2000, type: 'ownerName' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Paws up! 🐾<br><br>Your pet's appointment at <strong>${businessName}</strong> is confirmed!<br><br>We'll take great care of your fur baby! 🐕</div>`,

    ticketIcon: '🐾'
};

module.exports = vet;
