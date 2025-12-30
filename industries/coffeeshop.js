// ============================================
// COFFEE SHOP - Bean There Café
// ============================================

const coffeeshop = {
    id: 'coffeeshop',
    category: 'food',

    icon: '☕',
    customerIcon: '👤',
    color: '#78350f',
    cardIcon: 'fa-mug-hot',
    voice: 'echo',

    en: {
        name: 'Bean There Café',
        aiName: 'Joe',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Café Order',
        responses: {
            greeting: "Hi, I'd like to place an order for pickup",
            orderItem: 'Can I get a large flat white with oat milk',
            moreItems: 'And a banana bread please',
            noMore: "That's all",
            pickupTime: 'In 10 minutes',
            name: 'Chris',
            phone: '0456 789 012',
            confirm: 'Yep, sounds good!'
        }
    },

    prompt: `You're Barista Joe at Bean There Café. You take phone orders for coffee and light food.

MENU:
- Flat White/Latte/Cap – $5
- Long Black – $4.50
- Mocha/Chai – $5.50
- Fresh Juice – $7
- Croissant – $5
- Banana Bread – $6
- Breakfast Wrap – $12
- Catering available

YOUR PERSONALITY:
- Friendly and energetic
- Phrases like: "great choice", "see you soon"
- Coffee enthusiast
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Bean There Café, Joe speaking. What can I get you?"
2. DRINKS: Take coffee order (note milk preferences)
3. FOOD: "Any food with that?"
4. MORE ITEMS: "Anything else?"
5. PICKUP TIME: "When will you pick up?"
6. NAME: "Name for the order?"
7. TOTAL: Give total
8. CONFIRMATION: Recap and ask "All good?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Ask about milk type for coffees
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '☕', label: 'Coffee', text: "I'd like to order a coffee" },
        { emoji: '🥛', label: 'Milk', text: 'What milk options do you have?' },
        { emoji: '🥐', label: 'Food', text: 'What food do you have?' }
    ],

    menuItems: [
        { emoji: '☕', name: 'Flat White', desc: 'Smooth espresso & milk', price: 5 },
        { emoji: '🧋', name: 'Chai Latte', desc: 'Spiced chai with milk', price: 5.5 },
        { emoji: '🍌', name: 'Banana Bread', desc: 'Fresh baked, toasted', price: 6 },
        { emoji: '🌯', name: 'Breakfast Wrap', desc: 'Eggs, bacon, cheese', price: 12 }
    ],

    stepInfos: [
        '📞 Joe answers, ready to brew your perfect cup!',
        '☕ Taking the coffee order with milk preferences.',
        '✅ Confirming pickup time and order details.',
        "🎉 Barista's on it! Coffee will be ready soon."
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
        `<div class="sms-content">Coffee time! ☕<br><br>Your order from <strong>${businessName}</strong> is brewing!<br><br><strong>Total:</strong> ${currency}${total}<br><br>See you soon! ☕</div>`,

    ticketIcon: '☕'
};

module.exports = coffeeshop;
