// ============================================
// TATTOO - Ink Masters Studio
// ============================================

const tattoo = {
    id: 'tattoo',
    category: 'lifestyle',

    icon: '🎨',
    customerIcon: '👤',
    color: '#1f2937',
    cardIcon: 'fa-pen-nib',
    voice: 'onyx',

    en: {
        name: 'Ink Masters Studio',
        aiName: 'Mike',
        steps: ['Call', 'Consult', 'Confirm', 'Done'],
        totalLabel: 'Session',
        cardTitle: 'Tattoo Booking',
        responses: {
            greeting: "Hi, I'm looking to get a tattoo",
            type: 'New tattoo, first one actually',
            design: "I'm thinking a small geometric design",
            sizePlacement: 'About 3 inches, on my forearm',
            consultation: 'Yeah, a consult would be good first',
            datetime: 'This weekend if possible',
            name: 'Tyler',
            phone: '0434 567 890',
            confirm: 'Yeah, lock it in'
        }
    },

    prompt: `You're Mike, a friendly tattoo artist at Ink Masters Studio. You help clients bring their ideas to life.

SERVICES:
- Small Tattoo (2-3 hrs) – $200
- Medium Piece (4-5 hrs) – $400
- Large Piece (6+ hrs) – $150/hr
- Cover-up – Price varies
- Consultation – Free
- Touch-up – $50

YOUR PERSONALITY:
- Friendly and artistic
- Phrases like: "sick design", "that'll look amazing", "we can work with that"
- Creative and patient
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Ink Masters, Mike here. Looking to get some ink?"
2. TYPE: Ask what they're thinking (new, cover-up, touch-up)
3. DESIGN: "What did you have in mind?"
4. SIZE/PLACEMENT: "Where on your body and how big?"
5. CONSULTATION: "Want to come in for a free consult first?"
6. DATE: "When works for you?"
7. NAME: "And your name?"
8. PHONE: "And your number?"
9. CONFIRMATION: Recap and ask "Lock it in?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be friendly but professional
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🎨', label: 'Book', text: 'I want to get a tattoo' },
        { emoji: '🖼️', label: 'Design', text: 'I have a design idea' },
        { emoji: '🔄', label: 'Cover-up', text: 'I need a cover-up' }
    ],

    menuItems: [
        { emoji: '✨', name: 'Small Tattoo', desc: '2-3 hour session', price: 200 },
        { emoji: '🎨', name: 'Medium Piece', desc: '4-5 hour session', price: 400 },
        { emoji: '🖼️', name: 'Large Piece', desc: 'Per hour rate', price: 150 },
        { emoji: '💬', name: 'Consultation', desc: 'Free design chat', price: 0 }
    ],

    stepInfos: [
        '📞 Mike answers ready to create something awesome!',
        '🎨 Discussing design, size and placement.',
        '✅ Booking consultation or session time.',
        '🎉 Locked in! Get ready for some sick ink!'
    ],

    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'type' },
        { delay: 2500, type: 'design' },
        { delay: 2500, type: 'sizePlacement' },
        { delay: 2500, type: 'consultation' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],

    smsTemplate: (businessName, total, _currency = '$') =>
        `<div class="sms-content">Let's ink it! 🎨<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Get ready for some awesome art! 💉</div>`,

    ticketIcon: '🎨'
};

module.exports = tattoo;
