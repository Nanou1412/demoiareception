// ============================================
// RESTAURANT - Aussie Bites Cafe
// Version 2.0 - Full Features
// ============================================

const restaurant = {
    id: 'restaurant',
    category: 'food',

    // Visual Configuration
    icon: '👩‍🍳',
    customerIcon: '👤',
    color: '#ef4444',
    cardIcon: 'fa-receipt',

    // Voice Configuration - Ultra naturelle
    voice: 'shimmer',
    voiceSettings: {
        speed: 1.05,
        model: 'tts-1-hd',
        responseFormat: 'mp3'
    },

    // Business Info
    businessInfo: {
        name: 'Aussie Bites Cafe',
        address: '42 Chapel Street, South Yarra VIC 3141',
        phone: '(03) 9123 4567',
        email: 'hello@aussiebites.com.au',
        website: 'www.aussiebites.com.au',
        openingHours: {
            monday: { open: '07:00', close: '21:00' },
            tuesday: { open: '07:00', close: '21:00' },
            wednesday: { open: '07:00', close: '21:00' },
            thursday: { open: '07:00', close: '22:00' },
            friday: { open: '07:00', close: '23:00' },
            saturday: { open: '08:00', close: '23:00' },
            sunday: { open: '08:00', close: '20:00' }
        },
        capacity: {
            indoor: 45,
            outdoor: 20,
            private: 12
        }
    },

    // Reservation System
    reservationConfig: {
        enabled: true,
        minPartySize: 1,
        maxPartySize: 12,
        advanceBookingDays: 30,
        slotDuration: 90,
        timeSlots: [
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30'
        ],
        bufferBetweenSlots: 15,
        requireDeposit: false,
        cancellationPolicy: '24 hours notice required'
    },

    // Menu complet
    menu: {
        starters: [
            {
                id: 'hal-sal',
                emoji: '🥗',
                name: 'Grilled Halloumi Salad',
                desc: 'Mixed greens, cherry tomatoes, cucumber, lemon herb dressing',
                price: 17,
                prepTime: 8
            },
            {
                id: 'soup',
                emoji: '🍲',
                name: 'Soup of the Day',
                desc: "Chef's seasonal selection with sourdough",
                price: 12,
                prepTime: 5
            },
            {
                id: 'brusch',
                emoji: '🍞',
                name: 'Bruschetta Trio',
                desc: 'Tomato basil, mushroom truffle, avocado feta',
                price: 16,
                prepTime: 7
            },
            {
                id: 'wings',
                emoji: '🍗',
                name: 'Crispy Chicken Wings',
                desc: '8 pieces with sriracha honey glaze',
                price: 15,
                prepTime: 12
            }
        ],
        mains: [
            {
                id: 'burger',
                emoji: '🍔',
                name: 'Aussie Beef Burger',
                desc: 'Wagyu patty, bacon, cheese, beetroot, egg, chips',
                price: 24,
                prepTime: 15
            },
            {
                id: 'fish',
                emoji: '🐟',
                name: 'Beer Battered Fish & Chips',
                desc: 'Barramundi, hand-cut chips, mushy peas, tartare',
                price: 26,
                prepTime: 18
            },
            {
                id: 'steak',
                emoji: '🥩',
                name: 'Scotch Fillet 300g',
                desc: 'Grass-fed, choice of sauce, seasonal veg',
                price: 42,
                prepTime: 20
            },
            {
                id: 'pasta',
                emoji: '🍝',
                name: 'Prawn Linguine',
                desc: 'Tiger prawns, garlic, chilli, white wine, cherry tomatoes',
                price: 28,
                prepTime: 14
            },
            {
                id: 'risotto',
                emoji: '🍚',
                name: 'Wild Mushroom Risotto',
                desc: 'Porcini, shiitake, parmesan, truffle oil (V)',
                price: 25,
                prepTime: 16
            },
            {
                id: 'chicken',
                emoji: '🍗',
                name: 'Herb Roasted Chicken',
                desc: 'Half chicken, roast potatoes, gravy, greens',
                price: 29,
                prepTime: 22
            }
        ],
        sides: [
            {
                id: 'chips',
                emoji: '🍟',
                name: 'Hand-Cut Chips',
                desc: 'With aioli',
                price: 9,
                prepTime: 8
            },
            {
                id: 'rings',
                emoji: '🧅',
                name: 'Onion Rings',
                desc: 'Beer-battered, chipotle mayo',
                price: 8,
                prepTime: 6
            },
            {
                id: 'salad',
                emoji: '🥬',
                name: 'Garden Salad',
                desc: 'Mixed leaves, balsamic',
                price: 7,
                prepTime: 3
            },
            {
                id: 'bread',
                emoji: '🥖',
                name: 'Garlic Bread',
                desc: 'With herb butter',
                price: 6,
                prepTime: 5
            },
            {
                id: 'mash',
                emoji: '🥔',
                name: 'Creamy Mash',
                desc: 'Butter, chives',
                price: 8,
                prepTime: 5
            }
        ],
        desserts: [
            {
                id: 'brownie',
                emoji: '🍫',
                name: 'Chocolate Brownie',
                desc: 'Warm, vanilla ice cream, chocolate sauce',
                price: 14,
                prepTime: 5
            },
            {
                id: 'pav',
                emoji: '🍰',
                name: 'Mini Pavlova',
                desc: 'Seasonal fruits, passionfruit coulis',
                price: 13,
                prepTime: 4
            },
            {
                id: 'cheese',
                emoji: '🧀',
                name: 'Cheese Board',
                desc: 'Selection of 3, quince, crackers',
                price: 18,
                prepTime: 5
            },
            {
                id: 'affogato',
                emoji: '☕',
                name: 'Affogato',
                desc: 'Espresso, vanilla gelato, biscotti',
                price: 10,
                prepTime: 3
            }
        ],
        drinks: [
            {
                id: 'coffee',
                emoji: '☕',
                name: 'Coffee',
                desc: 'Flat white, latte, cappuccino, long black',
                price: 5,
                prepTime: 3
            },
            {
                id: 'tea',
                emoji: '🍵',
                name: 'Tea Selection',
                desc: 'English breakfast, earl grey, green, chamomile',
                price: 5,
                prepTime: 2
            },
            {
                id: 'juice',
                emoji: '🧃',
                name: 'Fresh Juice',
                desc: 'Orange, apple, or tropical blend',
                price: 7,
                prepTime: 3
            },
            {
                id: 'iced-tea',
                emoji: '🧊',
                name: 'Lemon Iced Tea',
                desc: 'House-made, refreshing',
                price: 6,
                prepTime: 2
            },
            {
                id: 'smoothie',
                emoji: '🥤',
                name: 'Smoothie',
                desc: 'Mango, berry, or green detox',
                price: 9,
                prepTime: 4
            },
            {
                id: 'soft',
                emoji: '🥤',
                name: 'Soft Drinks',
                desc: 'Coke, Sprite, Fanta, Lemonade',
                price: 4,
                prepTime: 1
            }
        ],
        alcohol: [
            {
                id: 'beer',
                emoji: '🍺',
                name: 'Local Craft Beer',
                desc: "Ask for today's selection",
                price: 10,
                prepTime: 1
            },
            {
                id: 'wine-w',
                emoji: '🍷',
                name: 'House White',
                desc: 'Yarra Valley Chardonnay (glass)',
                price: 12,
                prepTime: 1
            },
            {
                id: 'wine-r',
                emoji: '🍷',
                name: 'House Red',
                desc: 'Barossa Shiraz (glass)',
                price: 12,
                prepTime: 1
            },
            {
                id: 'cocktail',
                emoji: '🍹',
                name: 'Cocktail of the Day',
                desc: 'Ask your server',
                price: 18,
                prepTime: 4
            }
        ]
    },

    en: {
        name: 'Aussie Bites Cafe',
        aiName: 'Emma',
        steps: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        cardTitle: 'Kitchen Ticket',
        responses: {
            greeting: "Hi, I'd like to place a pickup order please",
            orderItem: "I'll have the Aussie Beef Burger please",
            moreItems: 'And some onion rings as a side',
            drink: 'A lemon iced tea would be great',
            noMore: "That's everything thanks",
            pickupTime: 'In about 25 minutes',
            name: 'Sarah',
            phone: '0412 345 678',
            confirm: 'Yep, perfect!',
            reserveGreeting: "Hi, I'd like to book a table please",
            partySize: 'For 4 people',
            reserveDate: 'This Saturday night',
            reserveTime: 'Around 7pm if possible',
            reserveConfirm: 'That sounds perfect, thanks!'
        }
    },

    // AI System Prompt - Ultra naturel avec gestion réservations
    prompt: `You're Emma, a friendly young Aussie woman working at Aussie Bites Cafe in South Yarra, Melbourne. You handle both TAKEAWAY ORDERS and TABLE RESERVATIONS.

YOUR VOICE & PERSONALITY:
- You're warm, bubbly, and genuinely happy - you LOVE your job
- Natural Aussie speech: "no worries", "sounds good", "lovely", "awesome", "no drama"
- React authentically: "Oh yum, the burger is my fave!", "Great choice!"
- You're efficient but never rushed - customers feel valued
- Slight laugh or enthusiasm in voice when appropriate
- NEVER sound robotic - you're a real person having a chat

RESPONSE STYLE - CRITICAL:
- Keep responses SHORT: 1-2 sentences MAX (under 15 words ideal)
- ONE question at a time - never double-barrel questions
- Pause naturally between thoughts
- Use contractions: "What's", "I'll", "That's", "We've"
- Confirm back what they said before moving on

═══════════════════════════════════════════════════
FLOW A: TAKEAWAY/PICKUP ORDER
═══════════════════════════════════════════════════

STEP 1 - GREETING:
"Hey! Aussie Bites, Emma speaking - pickup or dine-in today?"

STEP 2 - TAKE ORDER (if pickup/takeaway):
- Listen to their order, confirm each item
- "One Aussie burger, awesome! Anything else with that?"
- Suggest sides/drinks naturally: "Want some chips or a drink with that?"
- When they're done: "Perfect! So that's [recap items]"

STEP 3 - PICKUP TIME:
"When would you like to pick up?"
- If they give a time, confirm: "25 mins, no worries!"
- Suggest realistic time based on order: "That's about 20 mins prep, does [time] work?"

STEP 4 - CUSTOMER DETAILS:
"Lovely! Name for the order?" → wait → "And mobile number?" → wait

STEP 5 - FINAL CONFIRMATION:
"Awesome [Name]! So that's [items] for pickup at [time]. Total's $[amount]. All good?"

STEP 6 - COMPLETE:
When they confirm → "Beaut! See ya soon! [ORDER_CONFIRMED]"

═══════════════════════════════════════════════════
FLOW B: TABLE RESERVATION
═══════════════════════════════════════════════════

STEP 1 - DETECT RESERVATION:
If they say "book", "reserve", "table for", "reservation" → switch to reservation flow

STEP 2 - PARTY SIZE:
"Lovely! How many people?"

STEP 3 - DATE:
"And what date were you thinking?"

STEP 4 - TIME & AVAILABILITY CHECK:
"What time works for you?"
→ Check against BOOKED_SLOTS (provided in context)
→ If AVAILABLE: "7pm Saturday, let me check... Yes! Got a nice table for you!"
→ If UNAVAILABLE: "Ah, 7pm's booked out sorry! I've got 6:30 or 7:30 - either work?"

STEP 5 - CUSTOMER DETAILS:
"Perfect! Name for the booking?" → wait → "And best contact number?" → wait → "Email for confirmation?" (optional)

STEP 6 - SPECIAL REQUESTS:
"Any special occasion or dietary requirements I should note?"

STEP 7 - CONFIRM RESERVATION:
"Awesome! Table for [X] on [DATE] at [TIME] under [NAME]. I'll send you a confirmation text. See you then! [RESERVATION_CONFIRMED]"

═══════════════════════════════════════════════════
MENU KNOWLEDGE
═══════════════════════════════════════════════════

STARTERS ($12-17): Halloumi Salad $17, Soup $12, Bruschetta $16, Wings $15
MAINS ($24-42): Burger $24, Fish & Chips $26, Steak $42, Prawn Linguine $28, Risotto $25, Roast Chicken $29
SIDES ($6-9): Chips $9, Onion Rings $8, Salad $7, Garlic Bread $6, Mash $8
DESSERTS ($10-18): Brownie $14, Pavlova $13, Cheese Board $18, Affogato $10
DRINKS ($4-9): Coffee $5, Tea $5, Juice $7, Iced Tea $6, Smoothie $9, Soft drink $4
ALCOHOL ($10-18): Beer $10, Wine $12, Cocktail $18

POPULAR COMBOS:
- "Burger & chips" = $33
- "Fish & chips with a beer" = $36
- "Steak with mash and house red" = $62

═══════════════════════════════════════════════════
CRITICAL RULES
═══════════════════════════════════════════════════

1. ONE THING AT A TIME - never ask multiple questions
2. ALWAYS calculate correct totals
3. For pickup: include realistic prep time based on order complexity
4. For reservations: ALWAYS check availability before confirming
5. Say [ORDER_CONFIRMED] only after customer confirms pickup order
6. Say [RESERVATION_CONFIRMED] only after customer confirms table booking
7. If slot unavailable, offer 2-3 alternatives
8. Keep EVERY response under 20 words
9. If unclear whether order or reservation, ASK: "Is this for pickup or booking a table?"

OPENING HOURS (for reservations):
Mon-Wed: 7am-9pm | Thu: 7am-10pm | Fri-Sat: 7am-11pm (last booking 9:30pm) | Sun: 8am-8pm`,

    // Quick Action Buttons
    quickActions: [
        { emoji: '🍔', label: 'Order Pickup', text: "I'd like to place a pickup order please" },
        { emoji: '📅', label: 'Book Table', text: "I'd like to book a table please" },
        { emoji: '📋', label: 'See Menu', text: "What's on the menu today?" },
        { emoji: '⏰', label: 'Hours', text: 'What are your opening hours?' },
        { emoji: '🥗', label: 'Vegetarian', text: 'What vegetarian options do you have?' },
        { emoji: '🎉', label: 'Events', text: 'Do you cater for private events?' }
    ],

    // Menu Display (pour UI)
    menuItems: [
        {
            emoji: '🍔',
            name: 'Aussie Beef Burger',
            desc: 'Wagyu, bacon, egg, beetroot, chips',
            price: 24
        },
        { emoji: '🐟', name: 'Fish & Chips', desc: 'Beer-battered barramundi', price: 26 },
        { emoji: '🥩', name: 'Scotch Fillet', desc: '300g grass-fed, choice of sauce', price: 42 },
        { emoji: '🍝', name: 'Prawn Linguine', desc: 'Tiger prawns, garlic, chilli', price: 28 },
        {
            emoji: '🥗',
            name: 'Halloumi Salad',
            desc: 'Fresh greens, lemon herb dressing',
            price: 17
        },
        { emoji: '🍫', name: 'Chocolate Brownie', desc: 'Warm with vanilla ice cream', price: 14 }
    ],

    // Step-by-Step Process Info
    stepInfos: [
        '📞 Emma answers warmly - pickup order or table reservation?',
        '🍽️ Taking details - menu items or party size and date.',
        '✅ Confirming everything - time, contact details, special requests.',
        '🎉 All done! SMS confirmation sent, kitchen notified or table reserved.'
    ],

    // Demo Script Timing - Optimisé pour moins de latence
    demoScript: [
        { delay: 1500, type: 'greeting' },
        { delay: 2000, type: 'orderItem' },
        { delay: 2000, type: 'moreItems' },
        { delay: 1800, type: 'drink' },
        { delay: 1500, type: 'noMore' },
        { delay: 2000, type: 'pickupTime' },
        { delay: 1500, type: 'name' },
        { delay: 1500, type: 'phone' },
        { delay: 1500, type: 'confirm' }
    ],

    // SMS Template - Détaillé avec commande complète
    smsTemplate: (businessName, total, currency = '$', data = {}) => {
        const { customerName, items, pickupTime, orderNumber, address } = data;
        const itemsList = items
            ? items
                  .map(
                      item =>
                          `• ${item.qty || 1}x ${item.name} - $${(item.price || 0) * (item.qty || 1)}`
                  )
                  .join('<br>')
            : '• 1x Aussie Beef Burger - $24<br>• 1x Onion Rings - $8<br>• 1x Lemon Iced Tea - $6';

        return `<div class="sms-content">
            <div class="sms-header">🎉 Order Confirmed!</div>
            <div class="sms-business"><strong>${businessName}</strong></div>
            <br>
            <div class="sms-greeting">Hey ${customerName || 'Sarah'}!</div>
            <br>
            <div class="sms-section">
                <strong>📦 Order #${orderNumber || 'AB' + Math.floor(Math.random() * 900 + 100)}</strong><br>
                ${itemsList}
            </div>
            <br>
            <div class="sms-total"><strong>💰 Total: ${currency}${total}</strong></div>
            <br>
            <div class="sms-pickup">
                <strong>⏰ Pickup:</strong> ${pickupTime || 'In 25 mins'}<br>
                <strong>📍 Address:</strong> ${address || '42 Chapel St, South Yarra'}
            </div>
            <br>
            <div class="sms-footer">Thanks legend! See ya soon! 🙏</div>
        </div>`;
    },

    // SMS Template pour réservation
    reservationSmsTemplate: (data = {}) => {
        const { businessName, customerName, partySize, date, time, confirmationCode } = data;
        return `<div class="sms-content">
            <div class="sms-header">📅 Reservation Confirmed!</div>
            <div class="sms-business"><strong>${businessName || 'Aussie Bites Cafe'}</strong></div>
            <br>
            <div class="sms-greeting">Hey ${customerName || 'there'}!</div>
            <br>
            <div class="sms-section">
                <strong>🪑 Your Booking</strong><br>
                • Party: ${partySize || '4'} guests<br>
                • Date: ${date || 'Saturday 4th Jan'}<br>
                • Time: ${time || '7:00 PM'}<br>
                • Ref: #${confirmationCode || 'RES' + Math.floor(Math.random() * 9000 + 1000)}
            </div>
            <br>
            <div class="sms-note">
                📝 Please arrive on time - table held 15 mins<br>
                For changes: (03) 9123 4567
            </div>
            <br>
            <div class="sms-footer">Can't wait to see you! 🎉</div>
        </div>`;
    },

    // Kitchen Ticket Template
    kitchenTicketTemplate: (data = {}) => {
        const { orderNumber, customerName, phone, pickupTime, items, notes } = data;
        const orderTime = new Date().toLocaleTimeString('en-AU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return {
            header: `ORDER #${orderNumber || 'AB' + Math.floor(Math.random() * 900 + 100)}`,
            orderTime: orderTime,
            pickupTime: pickupTime || '+25 mins',
            customerName: customerName || 'Sarah',
            phone: phone || '0412 345 678',
            items: items || [
                { qty: 1, name: 'Aussie Beef Burger', mods: '' },
                { qty: 1, name: 'Onion Rings', mods: '' },
                { qty: 1, name: 'Lemon Iced Tea', mods: '' }
            ],
            notes: notes || '',
            priority: 'NORMAL'
        };
    },

    // Calendar Event Template
    calendarEventTemplate: (data = {}) => {
        const {
            customerName,
            partySize,
            date,
            time,
            phone,
            email,
            specialRequests,
            confirmationCode
        } = data;
        const endTime = addMinutes(time || '19:00', 90);
        return {
            title: `🍽️ ${customerName || 'Guest'} (${partySize || 4} pax)`,
            start: `${date || '2025-01-04'}T${time || '19:00'}`,
            end: `${date || '2025-01-04'}T${endTime}`,
            description: `Booking #${confirmationCode || 'RES0000'}\nParty: ${partySize || 4}\nPhone: ${phone || ''}\nEmail: ${email || ''}\nNotes: ${specialRequests || 'None'}`,
            color: '#ef4444',
            reminder: 60
        };
    },

    ticketIcon: '🍽️',

    // Availability checker
    checkAvailability: (date, time, partySize) => {
        const bookedSlots = {
            '2025-01-04': ['19:00', '19:30'],
            '2025-01-05': ['12:30', '13:00']
        };
        const dateSlots = bookedSlots[date] || [];
        const isBooked = dateSlots.includes(time);
        if (isBooked) {
            const allSlots = [
                '12:00',
                '12:30',
                '13:00',
                '18:00',
                '18:30',
                '19:00',
                '19:30',
                '20:00',
                '20:30'
            ];
            const available = allSlots.filter(slot => !dateSlots.includes(slot));
            return { available: false, alternatives: available.slice(0, 3) };
        }
        return { available: true };
    }
};

function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMins = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMins / 60) % 24;
    const newMins = totalMins % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

module.exports = restaurant;
