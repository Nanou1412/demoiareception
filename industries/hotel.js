// ============================================
// HOTEL - The Grand Melbourne Hotel
// ============================================

const hotel = {
    id: 'hotel',
    category: 'lifestyle',

    icon: '🏨',
    customerIcon: '👤',
    color: '#7c3aed',
    cardIcon: 'fa-hotel',
    voice: 'onyx',

    en: {
        name: 'The Grand Melbourne Hotel',
        aiName: 'James',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Stay',
        cardTitle: 'Reservation',
        responses: {
            greeting: "Hi, I'd like to book a room",
            dates: 'From the 15th to the 18th of January',
            roomType: 'A deluxe room please',
            guests: 'Just the two of us',
            extras: 'Yes, breakfast would be great',
            name: 'Robert and Sarah Williams',
            contact: '0401 234 567, robert.w@email.com',
            confirm: 'Yes please, confirm the booking'
        }
    },

    prompt: `You're James, a polished and professional front desk agent at The Grand Melbourne Hotel. You provide 5-star service.

ROOMS:
- Standard Room – $189/night
- Deluxe Room – $259/night
- Executive Suite – $399/night
- Penthouse Suite – $699/night
- Add breakfast – $35 per person

YOUR PERSONALITY:
- Elegant and professional
- Warm but refined: "certainly", "my pleasure", "of course"
- Attentive to detail
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Good afternoon, The Grand Melbourne, this is James. How may I assist you?"
2. DATES: "What dates were you looking at for your stay?"
3. ROOM TYPE: Offer options based on availability
4. GUESTS: "How many guests will be staying?"
5. EXTRAS: "Would you like breakfast included?"
6. NAME: "May I have the name for the reservation?"
7. PHONE/EMAIL: "And your contact number and email?"
8. CONFIRMATION: Recap and ask "Shall I confirm this booking?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Maintain professional elegance
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🛏️', label: 'Book', text: "I'd like to book a room" },
        { emoji: '📅', label: 'Dates', text: "What's available next weekend?" },
        { emoji: '🍳', label: 'Breakfast', text: 'Is breakfast included?' }
    ],

    menuItems: [
        { emoji: '🛏️', name: 'Standard Room', desc: 'Comfortable stay', price: 189 },
        { emoji: '✨', name: 'Deluxe Room', desc: 'City views', price: 259 },
        { emoji: '👔', name: 'Executive Suite', desc: 'Luxury space', price: 399 },
        { emoji: '🍳', name: 'Breakfast', desc: 'Per person', price: 35 }
    ],

    stepInfos: [
        '📞 James answers with 5-star professionalism.',
        '🏨 Checking dates, room type and guests.',
        '✅ Confirming reservation details.',
        '🎉 Reservation confirmed! Welcome to The Grand.'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'dates' },
        { delay: 2500, type: 'roomType' },
        { delay: 2500, type: 'guests' },
        { delay: 2500, type: 'extras' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'contact' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, currency = '$') =>
        `<div class="sms-content">Welcome! 🏨<br><br>Your reservation at <strong>${businessName}</strong> is confirmed.<br><br>We look forward to your stay! ⭐</div>`,

    ticketIcon: '🏨'
};

module.exports = hotel;
