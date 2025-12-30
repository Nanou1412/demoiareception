// ============================================
// FLORIST - Bloom & Petal
// ============================================

const florist = {
    id: 'florist',
    category: 'lifestyle',
    
    icon: '💐',
    customerIcon: '👤',
    color: '#ec4899',
    cardIcon: 'fa-seedling',
    voice: 'nova',
    
    en: {
        name: 'Bloom & Petal',
        aiName: 'Lily',
        steps: ['Call', 'Design', 'Confirm', 'Done'],
        totalLabel: 'Order',
        cardTitle: 'Flower Order',
        responses: {
            greeting: "Hi, I need to order some flowers",
            occasion: "It's for my wife's birthday",
            preferences: "She loves roses, maybe pink ones",
            budget: "Around $80",
            delivery: "Delivery please",
            datetime: "Tomorrow by noon",
            recipient: "Sarah, my darling wife",
            nameContact: "Tom, 0412 345 678",
            confirm: "Yes, please create that"
        }
    },
    
    prompt: `You're Lily, a passionate florist at Bloom & Petal. You create beautiful arrangements for every occasion.

PRODUCTS:
- Rose Bouquet – $45
- Mixed Seasonal – $55
- Orchid Plant – $65
- Wedding Consultation – Free
- Sympathy Arrangement – $75
- Subscription Monthly – $85

YOUR PERSONALITY:
- Creative and warm
- Phrases like: "beautiful", "gorgeous", "perfect for the occasion"
- Passionate about flowers
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Bloom & Petal, this is Lily. How can I brighten your day?"
2. OCCASION: Ask what the flowers are for
3. PREFERENCES: "Any favourite flowers or colours?"
4. BUDGET: "What's your budget?"
5. DELIVERY: "Is this for pickup or delivery?"
6. DATE: "When do you need them?"
7. RECIPIENT: "Who should I put on the card?"
8. NAME & CONTACT: "Your name and phone number?"
9. CONFIRMATION: Recap and ask "Shall I create that?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be creative and enthusiastic
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '💐', label: 'Order', text: "I need to order flowers" },
        { emoji: '🌹', label: 'Roses', text: "I'd like a rose bouquet" },
        { emoji: '💒', label: 'Wedding', text: "I need wedding flowers" }
    ],
    
    menuItems: [
        { emoji: '🌹', name: 'Rose Bouquet', desc: 'Classic elegance', price: 45 },
        { emoji: '💐', name: 'Mixed Seasonal', desc: 'Fresh variety', price: 55 },
        { emoji: '🪻', name: 'Orchid Plant', desc: 'Long lasting', price: 65 },
        { emoji: '🤍', name: 'Sympathy', desc: 'Thoughtful tribute', price: 75 }
    ],
    
    stepInfos: [
        "📞 Lily answers ready to create something beautiful!",
        "💐 Discussing occasion, colors and preferences.",
        "✅ Confirming delivery details and card message.",
        "🎉 Order created! Beautiful flowers on the way!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'occasion' },
        { delay: 2500, type: 'preferences' },
        { delay: 2500, type: 'budget' },
        { delay: 2500, type: 'delivery' },
        { delay: 2500, type: 'datetime' },
        { delay: 2000, type: 'recipient' },
        { delay: 2000, type: 'nameContact' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Beautiful! 💐<br><br>Your flower order from <strong>${businessName}</strong> is confirmed!<br><br>Ready to brighten someone's day! 🌸</div>`,
    
    ticketIcon: '💐'
};

module.exports = florist;
