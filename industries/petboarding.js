// ============================================
// PET BOARDING - Happy Tails Pet Resort
// ============================================

const petboarding = {
    id: 'petboarding',
    category: 'lifestyle',
    
    icon: '🏠',
    customerIcon: '👤',
    color: '#22c55e',
    cardIcon: 'fa-house-chimney',
    voice: 'shimmer',
    
    en: {
        name: 'Happy Tails Pet Resort',
        aiName: 'Lucy',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Stay',
        cardTitle: 'Boarding Booking',
        responses: {
            greeting: "Hi, I need to board my dog",
            petInfo: "She's a border collie named Luna",
            dates: "From the 15th to the 22nd, a week",
            specialNeeds: "She takes medication in the morning",
            vaccination: "Yes, all up to date",
            ownerName: "Michelle",
            phone: "0456 789 012",
            confirm: "Yes please, book her in"
        }
    },
    
    prompt: `You're Lucy at Happy Tails Pet Resort. You book pet boarding and daycare.

SERVICES:
- Dog Boarding (per night) – $50
- Cat Boarding (per night) – $35
- Luxury Suite – $75/night
- Dog Daycare – $40
- Grooming Add-on – $45
- Medication Admin – $5/day

YOUR PERSONALITY:
- Warm and pet-loving
- Phrases like: "fur baby", "home away from home"
- Reassures worried pet parents
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Happy Tails Pet Resort, Lucy here! Who's coming to stay?"
2. PET INFO: "What type of pet and what's their name?"
3. DATES: "What dates do you need?"
4. SPECIAL NEEDS: "Any special food, medication or requirements?"
5. VACCINATION: "Are vaccinations up to date?"
6. OWNER NAME & PHONE: Get contact details
7. CONFIRMATION: Recap and ask "Shall I book that in?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Reassure pet parents
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🏠', label: 'Board', text: "I need to board my pet" },
        { emoji: '☀️', label: 'Daycare', text: "Do you do daycare?" },
        { emoji: '👑', label: 'Luxury', text: "Tell me about the luxury suite" }
    ],
    
    menuItems: [
        { emoji: '🐕', name: 'Dog Boarding', desc: 'Per night', price: 50 },
        { emoji: '🐈', name: 'Cat Boarding', desc: 'Per night', price: 35 },
        { emoji: '👑', name: 'Luxury Suite', desc: 'Premium stay', price: 75 },
        { emoji: '☀️', name: 'Daycare', desc: 'Daily care', price: 40 }
    ],
    
    stepInfos: [
        "📞 Lucy answers ready to welcome your pet!",
        "🏠 Getting pet details and stay dates.",
        "✅ Noting special needs and confirming booking.",
        "🎉 Booked! Your pet will have a great stay!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'petInfo' },
        { delay: 2500, type: 'dates' },
        { delay: 2500, type: 'specialNeeds' },
        { delay: 2500, type: 'vaccination' },
        { delay: 2000, type: 'ownerName' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Home away from home! 🏠<br><br>Your pet's stay at <strong>${businessName}</strong> is confirmed!<br><br>They'll have a tail-wagging time! 🐕</div>`,
    
    ticketIcon: '🏠'
};

module.exports = petboarding;
