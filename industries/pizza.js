// ============================================
// PIZZA - Mario's Pizzeria
// ============================================

const pizza = {
    id: 'pizza',
    category: 'food',
    
    // Visual Configuration
    icon: '🍕',
    customerIcon: '👤',
    color: '#dc2626',
    cardIcon: 'fa-pizza-slice',
    
    // Voice Configuration
    voice: 'echo',
    
    // Business Info
    en: {
        name: "Tony's Famous Pizzeria",
        aiName: 'Tony',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Kitchen Order',
        responses: {
            greeting: "Hey, I'd like to order some pizza for delivery",
            orderItem: "Can I get a large Margherita",
            moreItems: "And a garlic bread too",
            noMore: "That's everything",
            delivery: "Delivery please",
            address: "42 Smith Street, Richmond",
            phone: "0467 890 123",
            confirm: "Yep, all good!"
        }
    },
    
    // AI System Prompt
    prompt: `You're Tony, an enthusiastic and friendly guy at Tony's Famous Pizzeria in Adelaide. You love pizza and it shows!

MENU:
- Margherita – $18
- Pepperoni – $22
- Supreme – $26
- Meat Lovers – $26
- Garlic Bread – $8
- Tiramisu – $10
- Soft Drinks – $4

YOUR PERSONALITY:
- Fun and passionate about food
- Phrases like: "excellent choice", "coming right up", "bellissimo"
- Enthusiastic but efficient
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Tony's Pizzeria, Tony speaking! What can I get for ya tonight?"
2. ORDER: Take pizza order, ask about size if not specified
3. EXTRAS: "Want any garlic bread or drinks with that?"
4. PICKUP/DELIVERY: "Is that for pickup or delivery?"
5. TIME: "That'll be ready in about 25 minutes, that work for ya?"
6. NAME: "What name's that for?"
7. PHONE: "And your number?"
8. IF DELIVERY: "What's the address?"
9. CONFIRMATION: Recap and ask "All good?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be enthusiastic about the food
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    // Quick Action Buttons
    quickActions: [
        { emoji: '🍕', label: 'Order', text: "I'd like to order a pizza" },
        { emoji: '🛵', label: 'Delivery', text: "Do you deliver?" },
        { emoji: '🌶️', label: 'Specials', text: "What are today's specials?" }
    ],
    
    // Menu/Services Display
    menuItems: [
        { emoji: '🍕', name: 'Margherita', desc: 'Classic tomato & mozzarella', price: 18 },
        { emoji: '🥓', name: 'Meat Lovers', desc: 'Pepperoni, bacon, sausage', price: 26 },
        { emoji: '🧄', name: 'Garlic Bread', desc: 'With herbs & butter', price: 8 },
        { emoji: '🥤', name: 'Soft Drink', desc: 'Can - various flavors', price: 4 }
    ],
    
    // Step-by-Step Process Info
    stepInfos: [
        "📞 Tony answers with his famous Italian enthusiasm!",
        "🍕 Taking the pizza order, size and toppings.",
        "✅ Confirming delivery/pickup and payment details.",
        "🎉 Pizza's in the oven! Delivery on its way soon."
    ],
    
    // Demo Script Timing
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'orderItem' },
        { delay: 2500, type: 'moreItems' },
        { delay: 2000, type: 'noMore' },
        { delay: 2500, type: 'delivery' },
        { delay: 2000, type: 'address' },
        { delay: 2000, type: 'phone' },
        { delay: 2000, type: 'confirm' }
    ],
    
    // SMS Template
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">Bellissimo! 🍕<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Hot pizza coming your way! 🔥</div>`,
    
    // Ticket Icon
    ticketIcon: '🍕'
};

module.exports = pizza;
