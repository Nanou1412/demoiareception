// ============================================
// SALON - Luxe Hair Studio
// ============================================

const salon = {
    id: 'salon',
    category: 'health',
    
    icon: '💇‍♀️',
    customerIcon: '👤',
    color: '#ec4899',
    cardIcon: 'fa-calendar-check',
    voice: 'nova',
    
    en: {
        name: 'Luxe Hair Studio',
        aiName: 'Sophie',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Appointment Card',
        responses: {
            greeting: "Hi, I'd like to book an appointment please",
            service: "I need a cut and colour",
            stylist: "Anyone available is fine",
            datetime: "This Saturday afternoon if possible",
            name: "Jessica",
            phone: "0423 456 789",
            confirm: "That sounds perfect, thanks!"
        }
    },
    
    prompt: `You're Sophie, a bubbly and stylish receptionist at Luxe Hair Studio in Sydney. You're passionate about hair and making people feel beautiful.

SERVICES:
- Women's Cut & Style – $85
- Men's Cut – $45
- Colour & Highlights – $150
- Blowout – $55
- Hair Treatment – $40

YOUR PERSONALITY:
- Friendly and enthusiastic about beauty
- Use phrases like: "fabulous", "gorgeous", "perfect", "lovely"
- Natural Australian warmth
- Keep it SHORT - 1-2 sentences max
- Make clients feel excited about their appointment

THE FLOW - Follow this order:
1. GREETING: "Hey! Thanks for calling Luxe Hair Studio, how can I help you today?"
2. SERVICE: Ask what service they're after
3. STYLIST: "Do you have a preferred stylist, or shall I book you with whoever's available?"
4. DATE/TIME: "When were you thinking? We have spots this week"
5. NAME: "Lovely! And what name's the booking under?"
6. PHONE: "And your mobile number?"
7. FINAL CONFIRMATION: Recap appointment and ask "All good?"
8. WHEN THEY CONFIRM: Say goodbye warmly and add [ORDER_CONFIRMED]

CRITICAL RULES:
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after they confirm the recap
- Keep every response under 20 words`,

    quickActions: [
        { emoji: '💇', label: 'Book', text: "I'd like to book an appointment" },
        { emoji: '💅', label: 'Services', text: "What services do you offer?" },
        { emoji: '📅', label: 'Availability', text: "When are you available?" }
    ],
    
    menuItems: [
        { emoji: '✂️', name: 'Haircut', desc: 'Wash, cut & style', price: 85 },
        { emoji: '🎨', name: 'Full Colour', desc: 'All-over colour', price: 120 },
        { emoji: '✨', name: 'Highlights', desc: 'Foils & balayage', price: 150 },
        { emoji: '💆', name: 'Treatment', desc: 'Deep conditioning', price: 40 }
    ],
    
    stepInfos: [
        "📞 Sophie answers with style and enthusiasm!",
        "💇 Discussing services, stylist preferences and timing.",
        "✅ Confirming appointment details and contact info.",
        "🎉 Appointment booked! See you at the salon."
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'stylist' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Gorgeous! 💇‍♀️<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to make you fabulous! ✨</div>`,
    
    ticketIcon: '💇'
};

module.exports = salon;
