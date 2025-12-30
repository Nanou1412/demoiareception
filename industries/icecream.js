// ============================================
// ICE CREAM - Scoops Delight
// ============================================

const icecream = {
    id: 'icecream',
    category: 'food',
    
    icon: '🍦',
    customerIcon: '👤',
    color: '#f472b6',
    cardIcon: 'fa-ice-cream',
    voice: 'shimmer',
    
    en: {
        name: 'Scoops Delight',
        aiName: 'Sunny',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Ice Cream Order',
        responses: {
            greeting: "Hi, I'd like to order some ice cream",
            orderItem: "Can I get a double scoop - chocolate and salted caramel",
            moreItems: "In a waffle cone please",
            noMore: "That's all",
            pickupTime: "I'll be there in 10 mins",
            name: "Lily",
            phone: "0490 123 456",
            confirm: "Perfect!"
        }
    },
    
    prompt: `You're Sunny, a cheerful team member at Scoops Delight ice cream parlor. You take orders for pickup.

FLAVORS:
- Vanilla, Chocolate, Strawberry
- Cookies & Cream, Mint Choc Chip
- Salted Caramel, Mango Sorbet
- Cookie Dough, Pistachio

SIZES:
- Single Scoop – $5
- Double Scoop – $7.50
- Waffle Cone – +$2
- Sundae – $12
- Take-home Tub (1L) – $15

YOUR PERSONALITY:
- Super cheerful and fun
- Phrases like: "sweet choice!", "yummy!"
- Makes ordering fun
- Keep it SHORT - 1-2 sentences max

THE FLOW:
1. GREETING: "Scoops Delight, Sunny here! Ready for something sweet?"
2. FLAVORS: "What flavors are you craving?"
3. SIZE: "Single, double or a tub?"
4. CONE/CUP: "Cup or cone?"
5. MORE: "Any toppings or extras?"
6. PICKUP: "When will you be in?"
7. NAME: "Name for the order?"
8. CONFIRMATION: Recap and ask "Sound delicious?"
9. WHEN CONFIRMED: Add [ORDER_CONFIRMED]

CRITICAL RULES:
- Be enthusiastic and fun
- ONE thing at a time
- ONLY say [ORDER_CONFIRMED] after confirmation
- Keep responses under 20 words`,

    quickActions: [
        { emoji: '🍦', label: 'Order', text: "I'd like to order ice cream" },
        { emoji: '🌈', label: 'Flavors', text: "What flavors do you have?" },
        { emoji: '🍨', label: 'Sundae', text: "Tell me about your sundaes" }
    ],
    
    menuItems: [
        { emoji: '🍫', name: 'Double Scoop', desc: 'Any two flavors', price: 7.50 },
        { emoji: '🧇', name: 'Waffle Cone', desc: 'Fresh made cone', price: 2 },
        { emoji: '🍨', name: 'Sundae', desc: 'With toppings & sauce', price: 12 },
        { emoji: '🫙', name: 'Take-home Tub', desc: '1 litre any flavor', price: 15 }
    ],
    
    stepInfos: [
        "📞 Sunny answers with sweet enthusiasm!",
        "🍦 Choosing flavors, scoops and cone type.",
        "✅ Confirming the sweet order details.",
        "🎉 Scooping now! Your treat awaits!"
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
        `<div class="sms-content">Sweet! 🍦<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Get ready for deliciousness! 🍨</div>`,
    
    ticketIcon: '🍦'
};

module.exports = icecream;
