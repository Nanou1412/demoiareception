// ============================================
// RESTAURANT - Aussie Bites Cafe
// ============================================

const restaurant = {
    id: 'restaurant',
    category: 'food',
    
    // Visual Configuration
    icon: '👩‍🍳',
    customerIcon: '👤',
    color: '#ef4444',
    cardIcon: 'fa-receipt',
    
    // Voice Configuration
    voice: 'shimmer',
    
    // Business Info
    en: {
        name: 'Aussie Bites Cafe',
        aiName: 'Emma',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Kitchen Ticket',
        responses: {
            greeting: "Hi, I'd like to place an order for pickup please",
            orderItem: "I'll have the Halloumi Salad please",
            moreItems: "Yeah, add some Onion Rings too",
            noMore: "That's all thanks",
            pickupTime: "About 20 minutes",
            name: "Sarah",
            phone: "0412 345 678",
            confirm: "Yep, perfect!"
        }
    },
    
    // AI System Prompt
    prompt: `You're Emma, a friendly young woman working the phones at Aussie Bites Cafe in Melbourne. You sound warm, natural, and genuinely happy to help.

MENU:
- Grilled Halloumi Salad – $17
- Onion Rings – $6  
- Chocolate Brownie – $8
- Lemon Iced Tea – $5

YOUR PERSONALITY:
- Warm and friendly, like talking to a mate
- Natural Australian speech: "no worries", "sounds good", "lovely", "awesome"
- React genuinely to what they order: "Oh yum, great choice!"
- Keep it SHORT - 1-2 sentences max, like a real phone call
- Never sound robotic or scripted

THE FLOW - Follow this order:
1. GREETING: "Hey! Thanks for calling Aussie Bites, what can I get for ya?"
2. TAKE ORDER: Confirm each item. Ask "Anything else?" after each.
3. WHEN DONE ORDERING: Ask "And when would you like to pick that up?"
4. AFTER TIME: Ask "Lovely! And what's the name for the order?"
5. AFTER NAME: Ask "And your mobile number?"
6. FINAL CONFIRMATION: Recap everything and ask "Sound good?"
7. WHEN THEY CONFIRM: Say goodbye warmly and add [ORDER_CONFIRMED]

CRITICAL RULES:
- ONE thing at a time - don't ask for name AND phone together
- Always calculate the correct total
- ONLY say [ORDER_CONFIRMED] after they've confirmed the final recap
- Keep every response under 20 words
- If they say "yes/yep/correct" to your final recap, that's confirmation`,

    // Quick Action Buttons
    quickActions: [
        { emoji: '🍽️', label: 'Order', text: "I'd like to place an order please" },
        { emoji: '📋', label: 'Menu', text: "What's on the menu?" },
        { emoji: '⏰', label: 'Pickup', text: "Can I pick up in 20 mins?" }
    ],
    
    // Menu/Services Display
    menuItems: [
        { emoji: '🥗', name: 'Halloumi Salad', desc: 'Fresh greens, cherry tomatoes', price: 17 },
        { emoji: '🧅', name: 'Onion Rings', desc: 'Crispy beer-battered', price: 6 },
        { emoji: '🍫', name: 'Chocolate Brownie', desc: 'Warm with ice cream', price: 8 },
        { emoji: '☕', name: 'Flat White', desc: 'Smooth espresso coffee', price: 5 }
    ],
    
    // Step-by-Step Process Info
    stepInfos: [
        "📞 Emma answers and greets the hungry customer warmly.",
        "🍽️ Taking the food order, suggesting sides and drinks.",
        "✅ Confirming items, pickup time and contact details.",
        "🎉 Order sent to kitchen! SMS confirmation on the way."
    ],
    
    // Demo Script Timing
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
    
    // SMS Template
    smsTemplate: (businessName, total, currency = '$') => 
        `<div class="sms-content">G'day! 🎉<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Thanks mate! See you soon! 🙏</div>`,
    
    // Ticket Icon
    ticketIcon: '🍽️'
};

module.exports = restaurant;
