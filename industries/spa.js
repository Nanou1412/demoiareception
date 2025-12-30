// ============================================
// SPA - Tranquil Waters Day Spa
// ============================================

const spa = {
    id: 'spa',
    category: 'health',
    
    icon: '🧖‍♀️',
    customerIcon: '👤',
    color: '#7c3aed',
    cardIcon: 'fa-spa',
    voice: 'shimmer',
    
    en: {
        name: 'Tranquil Waters Day Spa',
        aiName: 'Serena',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Treatment',
        cardTitle: 'Spa Appointment',
        responses: {
            greeting: "Hi, I'd like to book a spa treatment",
            service: "I'd love a Swedish massage",
            duration: "90 minutes please",
            datetime: "This weekend if possible",
            therapist: "A female therapist please",
            name: "Amanda",
            phone: "0401 234 567",
            confirm: "That sounds heavenly, thank you"
        }
    },
    
    prompt: `You're Serena, a serene and calming receptionist at Tranquil Waters Day Spa in Gold Coast. You create a peaceful experience from the first call.

SERVICES:
- Swedish Massage 60min – $120
- Deep Tissue Massage – $140
- Facial Treatment – $95
- Body Scrub – $85
- Full Day Spa Package – $350
- Couples Massage – $240

YOUR PERSONALITY:
- Calm and soothing voice
- Phrases like: "wonderful", "you'll love it", "pure relaxation"
- Create a sense of tranquility
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Tranquil Waters Spa, this is Serena. How may I help you relax today?"
2. SERVICE: Ask what treatment they're interested in
3. DURATION: "Would you like 60 or 90 minutes?"
4. DATE/TIME: "When would you like your escape?"
5. THERAPIST: "Do you have a gender preference for your therapist?"
6. NAME: "Lovely. And your name?"
7. PHONE: "And a contact number?"
8. EXTRAS: "Would you like to add any other treatments?"
9. CONFIRMATION: Recap and ask "Shall I book that for you?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Maintain a calm, relaxing tone
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '💆', label: 'Book', text: "I'd like to book a spa treatment" },
        { emoji: '💑', label: 'Couples', text: "Do you have couples massages?" },
        { emoji: '🎁', label: 'Packages', text: "What spa packages do you offer?" }
    ],
    
    menuItems: [
        { emoji: '💆', name: 'Swedish Massage', desc: 'Relaxation massage', price: 120 },
        { emoji: '💪', name: 'Deep Tissue', desc: 'Therapeutic massage', price: 140 },
        { emoji: '✨', name: 'Facial', desc: 'Rejuvenating treatment', price: 95 },
        { emoji: '🌟', name: 'Day Package', desc: 'Full spa experience', price: 350 }
    ],
    
    stepInfos: [
        "📞 Serena answers in a calm, soothing voice.",
        "🧖 Discussing treatments and preferences.",
        "✅ Confirming therapist and appointment details.",
        "🎉 Booking complete! Relaxation awaits."
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        { delay: 2500, type: 'duration' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'therapist' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Namaste 🧘<br><br>Your escape at <strong>${businessName}</strong> is confirmed!<br><br>Prepare to unwind and relax... 🌸</div>`,
    
    ticketIcon: '🧖'
};

module.exports = spa;
