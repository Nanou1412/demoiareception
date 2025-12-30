// ============================================
// PET GROOMING - Pampered Paws
// ============================================

const petgrooming = {
    id: 'petgrooming',
    category: 'lifestyle',

    icon: '🐩',
    customerIcon: '👤',
    color: '#f472b6',
    cardIcon: 'fa-dog',
    voice: 'shimmer',

    en: {
        name: 'Pampered Paws',
        aiName: 'Bella',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Grooming Booking',
        responses: {
            greeting: 'Hi, I need to book my dog for grooming',
            petType: "He's a golden retriever",
            service: "Full groom please, he's very fluffy",
            size: 'Large, about 30 kilos',
            datetime: 'This Saturday morning',
            petName: 'Buddy',
            ownerName: 'Lisa',
            phone: '0445 678 901',
            confirm: 'Yes, book him in'
        }
    },

    prompt: `You're Bella, a pet-loving groomer at Pampered Paws. You treat every pet like royalty.

SERVICES:
- Full Groom (Dog) – $65
- Bath & Brush – $35
- Nail Trim – $15
- Cat Grooming – $55
- Puppy First Groom – $45
- De-shedding Treatment – $50

YOUR PERSONALITY:
- Warm and pet-crazy
- Phrases like: "precious pup", "fur baby", "looking fabulous"
- Genuinely loves animals
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Pampered Paws, this is Bella! Who's getting pampered today?"
2. PET TYPE: Ask about their pet (dog, cat, breed)
3. SERVICE: "What service are you after?"
4. SIZE: For dogs, "Small, medium or large pup?"
5. DATE: "When would you like to bring them in?"
6. PET NAME: "And what's the little one's name?"
7. OWNER NAME: "And your name?"
8. PHONE: "And your number?"
9. CONFIRMATION: Recap and ask "Shall I book that in?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be enthusiastic about pets
- ONE thing at a time
- Ask about pet needs (allergies, behaviour)
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🐕', label: 'Book', text: 'I need to book grooming for my dog' },
        { emoji: '🐈', label: 'Cat', text: 'Do you groom cats?' },
        { emoji: '✂️', label: 'Nails', text: 'Just a nail trim please' }
    ],

    menuItems: [
        { emoji: '✂️', name: 'Full Groom', desc: 'Wash, cut, style', price: 65 },
        { emoji: '🛁', name: 'Bath & Brush', desc: 'Clean and tidy', price: 35 },
        { emoji: '💅', name: 'Nail Trim', desc: 'Quick clip', price: 15 },
        { emoji: '🐈', name: 'Cat Groom', desc: 'Feline pampering', price: 55 }
    ],

    stepInfos: [
        '📞 Bella answers with love for all fur babies!',
        '🐕 Getting pet details and grooming needs.',
        '✅ Confirming appointment time and service.',
        '🎉 Booked! Your pet will look fabulous!'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'petType' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'size' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'petName' },
        { delay: 2000, type: 'ownerName' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, _currency = '$') =>
        `<div class="sms-content">Pamper time! 🐩<br><br>Grooming booked at <strong>${businessName}</strong>!<br><br>Your fur baby will look fabulous! ✨</div>`,

    ticketIcon: '🐩'
};

module.exports = petgrooming;
