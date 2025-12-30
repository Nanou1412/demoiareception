// ============================================
// SUSHI - Sakura Sushi
// ============================================

const sushi = {
    id: 'sushi',
    category: 'food',
    
    icon: '🍣',
    customerIcon: '👤',
    color: '#dc2626',
    cardIcon: 'fa-fish',
    voice: 'nova',
    
    en: {
        name: 'Sakura Sushi',
        aiName: 'Yuki',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Sushi Order',
        responses: {
            greeting: "Hi, I'd like to order for pickup",
            orderItem: "Can I get the salmon sashimi and a California roll",
            moreItems: "And some edamame too",
            noMore: "That's all thank you",
            pickupTime: "In 30 minutes",
            name: "David",
            phone: "0478 901 234",
            confirm: "Yes, that's correct"
        }
    },
    
    prompt: `You're Yuki at Sakura Sushi. You take takeaway and delivery orders with Japanese hospitality.

MENU:
- Salmon Sashimi (6pc) – $16
- Tuna Sashimi (6pc) – $18
- California Roll – $12
- Rainbow Roll – $16
- Chicken Teriyaki – $15
- Beef Udon – $14
- Miso Soup – $4
- Edamame – $6
- Bento Box – $22

YOUR PERSONALITY:
- Polite and welcoming
- Phrases like: "excellent choice", "arigatou"
- Professional Japanese hospitality
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Sakura Sushi, Yuki speaking. Pickup or delivery?"
2. ORDER: Take their order item by item
3. MORE: "Anything else?"
4. WASABI/GINGER: "Extra wasabi or ginger?"
5. PICKUP/DELIVERY: Get time or address
6. NAME & PHONE: Get contact details
7. TOTAL: Give total
8. CONFIRMATION: Recap and ask "Is that correct?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be polite and precise
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🍣', label: 'Order', text: "I'd like to order sushi" },
        { emoji: '🛵', label: 'Delivery', text: "Do you deliver?" },
        { emoji: '📋', label: 'Menu', text: "What's on the menu?" }
    ],
    
    menuItems: [
        { emoji: '🍣', name: 'Salmon Sashimi', desc: 'Fresh 6 pieces', price: 16 },
        { emoji: '🌈', name: 'Rainbow Roll', desc: 'Assorted fish topping', price: 16 },
        { emoji: '🍱', name: 'Bento Box', desc: 'Complete meal set', price: 22 },
        { emoji: '🫛', name: 'Edamame', desc: 'Salted soybeans', price: 6 }
    ],
    
    stepInfos: [
        "📞 Yuki answers with traditional Japanese hospitality.",
        "🍣 Taking the sushi order with care and precision.",
        "✅ Confirming items, pickup time and contact details.",
        "🎉 Itadakimasu! Your order is being prepared."
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'orderItem' },
        { delay: 2500, type: 'moreItems' },
        { delay: 2000, type: 'noMore' },
        { delay: 2500, type: 'pickupTime' },
        { delay: 2000, type: 'name' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Arigatou! 🍣<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Itadakimasu! 🙏</div>`,
    
    ticketIcon: '🍣'
};

module.exports = sushi;
