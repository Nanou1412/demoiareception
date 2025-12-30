// ============================================
// LOCKSMITH - KeyMaster Locksmiths
// ============================================

const locksmith = {
    id: 'locksmith',
    category: 'services',
    
    icon: '🔐',
    customerIcon: '👤',
    color: '#f59e0b',
    cardIcon: 'fa-key',
    voice: 'onyx',
    
    en: {
        name: 'KeyMaster Locksmiths',
        aiName: 'Frank',
        steps: ['Call', 'Dispatch', 'Confirm', 'Done'],
        totalLabel: 'Service',
        cardTitle: 'Service Call',
        responses: {
            greeting: "Hi, I'm locked out of my house",
            situation: "I left my keys inside and the door slammed shut",
            location: "I'm at 15 Lock Street, Brunswick",
            urgency: "Yes, please come as soon as possible",
            name: "David Chen",
            phone: "0467 890 123",
            confirm: "Yes, thank you!"
        }
    },
    
    prompt: `You're Frank, an emergency locksmith dispatcher at KeyMaster. You handle urgent lockout calls.

SERVICES:
- House Lockout – $90
- Car Lockout – $80
- Lock Change – $150+
- Key Cutting – $15+
- Safe Opening – $200+
- 24/7 Emergency – No extra charge

YOUR PERSONALITY:
- Calm and reassuring
- Phrases like: "don't worry", "on the way", "sorted in no time"
- Understands stress of lockouts
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "KeyMaster Locksmiths, Frank here. Locked out?"
2. SITUATION: "What's happened?"
3. LOCATION: "Where are you right now?"
4. URGENCY: For lockouts, dispatch immediately
5. NAME & PHONE: Get contact details
6. ETA: Give estimated arrival time
7. CONFIRMATION: "Locksmith's on the way, all good?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be calm and quick for emergencies
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🔐', label: 'Lockout', text: "I'm locked out" },
        { emoji: '🚗', label: 'Car', text: "I'm locked out of my car" },
        { emoji: '🔑', label: 'Keys', text: "I need new keys cut" }
    ],
    
    menuItems: [
        { emoji: '🏠', name: 'House Lockout', desc: 'Emergency entry', price: 90 },
        { emoji: '🚗', name: 'Car Lockout', desc: 'Vehicle entry', price: 80 },
        { emoji: '🔒', name: 'Lock Change', desc: 'New locks installed', price: 150 },
        { emoji: '🔑', name: 'Key Cutting', desc: 'Duplicates made', price: 15 }
    ],
    
    stepInfos: [
        "📞 Frank answers calmly - help is on the way!",
        "🔐 Getting your location and situation details.",
        "✅ Dispatching the nearest locksmith.",
        "🎉 Locksmith en route! You'll be in soon."
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'situation' },
        { delay: 2500, type: 'location' },
        { delay: 2500, type: 'urgency' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Help is coming! 🔐<br><br>Your locksmith from <strong>${businessName}</strong> is on the way!<br><br>ETA: 15-20 minutes 🔑</div>`,
    
    ticketIcon: '🔐'
};

module.exports = locksmith;
