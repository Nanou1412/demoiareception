// ============================================
// FAST FOOD - Burger Barn
// ============================================

const fastfood = {
    id: 'fastfood',
    category: 'food',
    
    icon: '🍔',
    customerIcon: '👤',
    color: '#ea580c',
    cardIcon: 'fa-burger',
    voice: 'echo',
    
    en: {
        name: 'Burger Barn',
        aiName: 'Billy',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Kitchen Order',
        responses: {
            greeting: "Hi, I'd like to order a burger",
            orderItem: "I'll have the Double Cheese",
            moreItems: "Large fries and a Coke please",
            noMore: "That's everything",
            pickupTime: "Pickup in 15 mins",
            name: "Jake",
            phone: "0489 012 345",
            confirm: "Yep, sounds good!"
        }
    },
    
    prompt: `You're Billy at Burger Barn. You take fast food orders quickly and efficiently.

MENU:
- Classic Burger – $9
- Double Cheese – $12
- Chicken Burger – $10
- Veggie Burger – $10
- Fries (Reg) – $4
- Fries (Large) – $6
- Onion Rings – $5
- Soft Drink – $3.50
- Combo (Burger+Fries+Drink) – +$6

YOUR PERSONALITY:
- Fast and friendly
- Phrases like: "you got it", "awesome choice"
- Efficient service
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Burger Barn, what can I get ya?"
2. ORDER: Take main items
3. SIDES: "Fries or onion rings?"
4. DRINKS: "Any drinks?"
5. MORE: "Anything else?"
6. PICKUP/DELIVERY: "Pickup or delivery?"
7. NAME: "Name for the order?"
8. TOTAL: Give total
9. CONFIRMATION: Recap and ask "All good?"
10. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be quick and efficient
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🍔', label: 'Order', text: "I'd like to order a burger" },
        { emoji: '🍟', label: 'Combo', text: "What combos do you have?" },
        { emoji: '🛵', label: 'Delivery', text: "Do you deliver?" }
    ],
    
    menuItems: [
        { emoji: '🍔', name: 'Double Cheese', desc: 'Two patties, extra cheese', price: 12 },
        { emoji: '🐔', name: 'Chicken Burger', desc: 'Crispy chicken fillet', price: 10 },
        { emoji: '🍟', name: 'Large Fries', desc: 'Crispy golden fries', price: 6 },
        { emoji: '🥤', name: 'Soft Drink', desc: 'Various flavors', price: 3.50 }
    ],
    
    stepInfos: [
        "📞 Billy answers, ready for your order!",
        "🍔 Taking your burger order with sides and drinks.",
        "✅ Confirming pickup/delivery and total.",
        "🎉 Order in! Burgers cooking now!"
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
        `<div class="sms-content">Burgers up! 🍔<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>See you at the counter! 🍟</div>`,
    
    ticketIcon: '🍔'
};

module.exports = fastfood;
