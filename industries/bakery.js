// ============================================
// BAKERY - Golden Crust Bakery
// ============================================

const bakery = {
    id: 'bakery',
    category: 'food',

    icon: '🥐',
    customerIcon: '👤',
    color: '#f59e0b',
    cardIcon: 'fa-bread-slice',
    voice: 'shimmer',

    en: {
        name: 'Golden Crust Bakery',
        aiName: 'Emma',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Bakery Order',
        responses: {
            greeting: "Hi, I'd like to place an order",
            orderItem: "I'll take a sourdough loaf please",
            moreItems: 'And 6 croissants',
            noMore: "That's all",
            pickupTime: 'In about an hour',
            name: 'Emma',
            phone: '0445 678 901',
            confirm: 'Perfect, thanks!'
        }
    },

    prompt: `You're Emma, a cheerful baker at Golden Crust Bakery. You love fresh bread and making customers smile.

MENU:
- Sourdough Loaf – $8
- Croissants (6) – $15
- Baguette – $5
- Birthday Cake – $55
- Muffins (4) – $12
- Cinnamon Rolls (6) – $18

YOUR PERSONALITY:
- Cheerful and warm
- Phrases like: "fresh out of the oven", "lovely choice", "delicious"
- Excited about baked goods
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Good morning! Golden Crust Bakery, how can I help you?"
2. ORDER: Take their order
3. SPECIAL: "Is this for a special occasion?"
4. PICKUP: "When do you need it by?"
5. NAME: "And the name for the order?"
6. PHONE: "And your number?"
7. CONFIRMATION: Recap and ask "Sound good?"
8. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be warm and enthusiastic
- ONE thing at a time
- Calculate total correctly
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🥖', label: 'Order', text: "I'd like to order some bread" },
        { emoji: '🎂', label: 'Cake', text: 'I need a birthday cake' },
        { emoji: '⏰', label: 'Pickup', text: 'When can I pick up?' }
    ],

    menuItems: [
        { emoji: '🍞', name: 'Sourdough Loaf', desc: 'Fresh baked daily', price: 8 },
        { emoji: '🥐', name: 'Croissants (6)', desc: 'Buttery & flaky', price: 15 },
        { emoji: '🎂', name: 'Birthday Cake', desc: 'Custom decoration', price: 55 },
        { emoji: '🧁', name: 'Muffins (4)', desc: 'Various flavors', price: 12 }
    ],

    stepInfos: [
        '📞 Emma answers with bakery-fresh enthusiasm!',
        '🥐 Taking the order for breads, pastries or cakes.',
        '✅ Confirming pickup time and contact details.',
        '🎉 Order ready! Fresh from the oven soon.'
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
        `<div class="sms-content">Fresh from the oven! 🥐<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Can't wait to see you! 🍞</div>`,

    ticketIcon: '🥐'
};

module.exports = bakery;
