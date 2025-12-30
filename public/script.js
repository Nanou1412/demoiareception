// ============================================
// AI RECEPTIONIST - OPTIMIZED VERSION
// Refactored for better maintainability
// ============================================

// ============================================
// SESSION & STATE
// ============================================
const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

const State = {
    currentIndustry: 'restaurant',
    currentScenario: 'normal',
    isDarkMode: true,
    messageCount: 0,
    orderTotal: 0,
    callStartTime: null,
    callTimerInterval: null,
    currentStep: 0,
    isAutoDemoMode: false,
    isSpeaking: false,
    currentAudio: null,
    isListening: false,
    recognition: null,
    sessionStats: {
        totalCalls: 0,
        completedCalls: 0,
        totalMessages: 0,
        totalCallTime: 0,
        industries: {}
    }
};

// ============================================
// DOM ELEMENTS (lazy cached)
// ============================================
const DOM = {
    get conversation() { return document.getElementById('conversation'); },
    get userInput() { return document.getElementById('userInput'); },
    get voiceBtn() { return document.getElementById('voiceBtn'); },
    get sendBtn() { return document.getElementById('sendBtn'); },
    get typingIndicator() { return document.getElementById('typingIndicator'); },
    get callStatus() { return document.getElementById('callStatus'); },
    get callTimer() { return document.getElementById('callTimer'); },
    get processSteps() { return document.querySelectorAll('.process-step'); },
    get processLines() { return document.querySelectorAll('.process-line'); },
    get messageCountEl() { return document.getElementById('messageCount'); },
    get orderTotalEl() { return document.getElementById('orderTotal'); },
    get callDurationEl() { return document.getElementById('callDuration'); },
    get stepInfoEl() { return document.getElementById('stepInfo'); },
    get smsCard() { return document.getElementById('smsCard'); },
    get ticketCard() { return document.getElementById('ticketCard'); },
    get smsPreview() { return document.getElementById('smsPreview'); },
    get ticketPreview() { return document.getElementById('ticketPreview'); },
    get smsStatus() { return document.getElementById('smsStatus'); },
    get ticketStatus() { return document.getElementById('ticketStatus'); },
    get industryBtns() { return document.querySelectorAll('.industry-btn'); },
    get waveformOverlay() { return document.getElementById('waveformOverlay'); },
    get waveformLabel() { return document.getElementById('waveformLabel'); }
};

// ============================================
// UNIFIED INDUSTRY CONFIGURATION
// Merged EN/FR - reduces ~400 lines of duplication
// ============================================
const Industries = {
    restaurant: {
        icon: '👩‍🍳',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#ef4444',
        cardIcon: 'fa-receipt',
        quickActions: [
            { emoji: '🍽️', label: 'Order', text: "I'd like to place an order please" },
            { emoji: '📋', label: 'Menu', text: "What's on the menu?" },
            { emoji: '⏰', label: 'Pickup', text: "Can I pick up in 20 mins?" }
        ],
        menuItems: [
            { emoji: '🥗', name: 'Halloumi Salad', desc: 'Fresh greens, cherry tomatoes', price: 17 },
            { emoji: '🧅', name: 'Onion Rings', desc: 'Crispy beer-battered', price: 6 },
            { emoji: '🍫', name: 'Chocolate Brownie', desc: 'Warm with ice cream', price: 8 },
            { emoji: '☕', name: 'Flat White', desc: 'Smooth espresso coffee', price: 5 }
        ],
        stepInfos: [
            "📞 The AI answers and greets the hungry customer warmly.",
            "🍽️ Taking the food order, suggesting sides and drinks.",
            "✅ Confirming items, pickup time and contact details.",
            "🎉 Order sent to kitchen! SMS confirmation on the way."
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
        }
    },
    pizza: {
        icon: '🍕',
        customerIcon: '👤',
        voice: 'echo',
        color: '#dc2626',
        cardIcon: 'fa-pizza-slice',
        quickActions: [
            { emoji: '🍕', label: 'Order', text: "I'd like to order a pizza" },
            { emoji: '🛵', label: 'Delivery', text: "Do you deliver?" },
            { emoji: '🌶️', label: 'Specials', text: "What are today's specials?" }
        ],
        menuItems: [
            { emoji: '🍕', name: 'Margherita', desc: 'Classic tomato & mozzarella', price: 18 },
            { emoji: '🥓', name: 'Meat Lovers', desc: 'Pepperoni, bacon, sausage', price: 24 },
            { emoji: '🧄', name: 'Garlic Bread', desc: 'With herbs & butter', price: 8 },
            { emoji: '🥤', name: 'Soft Drink', desc: 'Can - various flavors', price: 4 }
        ],
        stepInfos: [
            "📞 Tony answers with his famous Italian enthusiasm!",
            "🍕 Taking the pizza order, size and toppings.",
            "✅ Confirming delivery/pickup and payment details.",
            "🎉 Pizza's in the oven! Delivery on its way soon."
        ],
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
        en: {
            name: "Mario's Pizzeria",
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
        }
    },
    salon: {
        icon: '💇‍♀️',
        customerIcon: '👤',
        voice: 'nova',
        color: '#ec4899',
        cardIcon: 'fa-calendar-check',
        quickActions: [
            { emoji: '💇', label: 'Book', text: "I'd like to book an appointment" },
            { emoji: '💅', label: 'Services', text: "What services do you offer?" },
            { emoji: '📅', label: 'Availability', text: "When are you available?" }
        ],
        menuItems: [
            { emoji: '✂️', name: 'Haircut', desc: 'Wash, cut & style', price: 65 },
            { emoji: '🎨', name: 'Full Colour', desc: 'All-over colour', price: 120 },
            { emoji: '✨', name: 'Highlights', desc: 'Foils & balayage', price: 150 },
            { emoji: '💆', name: 'Treatment', desc: 'Deep conditioning', price: 45 }
        ],
        stepInfos: [
            "📞 Sophie answers with style and enthusiasm!",
            "💇 Discussing services, stylist preferences and timing.",
            "✅ Confirming appointment details and contact info.",
            "🎉 Appointment booked! See you at the salon."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'stylist' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Luxe Hair Studio',
            aiName: 'Sophie',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Service',
            cardTitle: 'Appointment Card',
            responses: {
                greeting: "Hi, I'd like to book an appointment please",
                service: "I need a cut and colour",
                stylist: "Anyone available is fine",
                datetime: "This Saturday afternoon if possible",
                name: "Jessica",
                phone: "0423 456 789",
                confirm: "That sounds perfect, thanks!"
            }
        }
    },
    medical: {
        icon: '👩‍⚕️',
        customerIcon: '👤',
        voice: 'alloy',
        color: '#06b6d4',
        cardIcon: 'fa-notes-medical',
        quickActions: [
            { emoji: '📅', label: 'Book', text: "I'd like to book an appointment" },
            { emoji: '👨‍⚕️', label: 'Doctor', text: "Which doctors are available?" },
            { emoji: '⏰', label: 'Urgent', text: "I need an urgent appointment" }
        ],
        menuItems: [
            { emoji: '🩺', name: 'General Consult', desc: 'Standard GP visit', price: 75 },
            { emoji: '💉', name: 'Vaccination', desc: 'Flu, travel, etc.', price: 40 },
            { emoji: '🧪', name: 'Blood Test', desc: 'Pathology referral', price: 0 },
            { emoji: '📝', name: 'Health Check', desc: 'Full health assessment', price: 150 }
        ],
        stepInfos: [
            "📞 Rachel answers professionally and efficiently.",
            "🏥 Checking availability, doctor preference and reason.",
            "✅ Confirming patient details and Medicare info.",
            "🎉 Appointment confirmed! Reminder SMS on the way."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'doctor' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'dob' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Wellness Medical Centre',
            aiName: 'Rachel',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Consult',
            cardTitle: 'Booking Slip',
            responses: {
                greeting: "Hi, I'd like to book an appointment with a GP",
                service: "Just a general checkup",
                doctor: "Any doctor available is fine",
                datetime: "Tomorrow morning if you have anything",
                name: "Michael Thompson",
                dob: "15th of March 1985",
                phone: "0434 567 890",
                confirm: "Yes, that's all correct"
            }
        }
    },
    dental: {
        icon: '🦷',
        customerIcon: '👤',
        voice: 'nova',
        color: '#0ea5e9',
        cardIcon: 'fa-tooth',
        quickActions: [
            { emoji: '🦷', label: 'Book', text: "I need a dental appointment" },
            { emoji: '😬', label: 'Emergency', text: "I have a toothache, it's urgent" },
            { emoji: '💰', label: 'Prices', text: "What are your prices?" }
        ],
        menuItems: [
            { emoji: '✨', name: 'Check & Clean', desc: 'Regular dental hygiene', price: 180 },
            { emoji: '🦷', name: 'Filling', desc: 'Composite or amalgam', price: 200 },
            { emoji: '😁', name: 'Whitening', desc: 'Professional whitening', price: 450 },
            { emoji: '📸', name: 'X-Ray', desc: 'Digital dental x-ray', price: 60 }
        ],
        stepInfos: [
            "📞 Grace answers with a reassuring, friendly tone.",
            "🦷 Discussing the dental issue and preferred times.",
            "✅ Confirming patient details and insurance info.",
            "🎉 Appointment booked! Smile bright soon!"
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'reason' },
            { delay: 2500, type: 'dentist' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'insurance' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Smile Bright Dental',
            aiName: 'Grace',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Treatment',
            cardTitle: 'Dental Appointment',
            responses: {
                greeting: "Hi, I'd like to book a dental appointment",
                reason: "Just a regular checkup and clean",
                dentist: "Anyone available is fine",
                datetime: "Next Tuesday morning",
                name: "Jennifer Brown",
                insurance: "Yes, I have Medibank",
                phone: "0490 123 456",
                confirm: "That's all correct, thanks!"
            }
        }
    },
    vet: {
        icon: '🐕',
        customerIcon: '👤',
        voice: 'nova',
        color: '#14b8a6',
        cardIcon: 'fa-paw',
        quickActions: [
            { emoji: '🐾', label: 'Book', text: "I need to book a vet appointment" },
            { emoji: '🚨', label: 'Emergency', text: "My pet needs urgent care" },
            { emoji: '💉', label: 'Vaccines', text: "I need to update my pet's vaccinations" }
        ],
        menuItems: [
            { emoji: '🩺', name: 'Consultation', desc: 'General checkup', price: 85 },
            { emoji: '💉', name: 'Vaccination', desc: 'Annual vaccines', price: 120 },
            { emoji: '✂️', name: 'Desexing', desc: 'Surgical procedure', price: 350 },
            { emoji: '🦷', name: 'Dental Clean', desc: 'Pet dental care', price: 450 }
        ],
        stepInfos: [
            "📞 Bella answers with love for all furry friends!",
            "🐾 Getting pet details, symptoms and urgency level.",
            "✅ Confirming owner details and pet information.",
            "🎉 Appointment booked! See you at the clinic."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'petType' },
            { delay: 2500, type: 'reason' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'petName' },
            { delay: 2000, type: 'ownerName' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Happy Paws Vet Clinic',
            aiName: 'Dr. Sarah',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Consult',
            cardTitle: 'Pet Visit Card',
            responses: {
                greeting: "Hi, I need to book an appointment for my pet",
                petType: "It's a dog, a golden retriever",
                reason: "Just the annual checkup and vaccinations",
                datetime: "Thursday afternoon if possible",
                petName: "His name is Max",
                ownerName: "I'm Emma Wilson",
                phone: "0489 012 345",
                confirm: "Perfect, we'll be there!"
            }
        }
    },
    garage: {
        icon: '🔧',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#f59e0b',
        cardIcon: 'fa-car',
        quickActions: [
            { emoji: '🚗', label: 'Service', text: "I need to book a car service" },
            { emoji: '🚨', label: 'Breakdown', text: "My car broke down, I need help" },
            { emoji: '💰', label: 'Quote', text: "Can I get a quote?" }
        ],
        menuItems: [
            { emoji: '🛢️', name: 'Basic Service', desc: 'Oil, filter, check', price: 189 },
            { emoji: '🔧', name: 'Full Service', desc: 'Complete inspection', price: 350 },
            { emoji: '🚧', name: 'Brake Service', desc: 'Pads & rotors check', price: 250 },
            { emoji: '💻', name: 'Diagnostic', desc: 'Computer scan', price: 99 }
        ],
        stepInfos: [
            "📞 Mike answers like a true Aussie car legend!",
            "🚗 Getting vehicle details and service requirements.",
            "✅ Confirming drop-off time and contact details.",
            "🎉 Booking confirmed! She'll be right, mate."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'vehicle' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Aussie Auto Care',
            aiName: 'Mike',
            steps: ['Call', 'Service', 'Confirm', 'Done'],
            totalLabel: 'Service',
            cardTitle: 'Job Card',
            responses: {
                greeting: "G'day, I need to book my car in for a service",
                service: "Just a basic service and maybe check the brakes",
                vehicle: "It's a 2019 Toyota Camry",
                datetime: "Can I bring it in Monday morning?",
                name: "Dave Wilson",
                phone: "0445 678 901",
                confirm: "Yeah, all good mate!"
            }
        }
    },
    hotel: {
        icon: '🏨',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#8b5cf6',
        cardIcon: 'fa-bed',
        quickActions: [
            { emoji: '🛏️', label: 'Book', text: "I'd like to book a room" },
            { emoji: '📅', label: 'Availability', text: "What rooms are available?" },
            { emoji: '🍽️', label: 'Amenities', text: "What amenities do you have?" }
        ],
        menuItems: [
            { emoji: '🛏️', name: 'Standard Room', desc: 'Comfortable queen bed', price: 189 },
            { emoji: '🌅', name: 'Ocean View', desc: 'King bed, balcony', price: 289 },
            { emoji: '👑', name: 'Suite', desc: 'Luxury suite', price: 450 },
            { emoji: '🍳', name: 'Breakfast', desc: 'Buffet add-on', price: 35 }
        ],
        stepInfos: [
            "📞 James welcomes you with 5-star hospitality.",
            "🏨 Checking room types, dates and special requests.",
            "✅ Confirming reservation details and payment.",
            "🎉 Booking confirmed! Welcome to the Grand."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'roomType' },
            { delay: 2500, type: 'dates' },
            { delay: 2500, type: 'guests' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Harbour View Hotel',
            aiName: 'Claire',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Booking',
            cardTitle: 'Reservation',
            responses: {
                greeting: "Hi, I'd like to book a room please",
                roomType: "A double room with ocean view if available",
                dates: "From the 15th to the 18th of January",
                guests: "Just two adults",
                name: "Robert Chen",
                phone: "0456 789 012",
                confirm: "That's perfect, thank you!"
            }
        }
    },
    gym: {
        icon: '🏋️',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#22c55e',
        cardIcon: 'fa-dumbbell',
        quickActions: [
            { emoji: '💪', label: 'Join', text: "I want to join the gym" },
            { emoji: '🏟️', label: 'Classes', text: "What classes do you offer?" },
            { emoji: '🎫', label: 'Trial', text: "Can I get a free trial?" }
        ],
        menuItems: [
            { emoji: '🎫', name: 'Day Pass', desc: 'Single visit', price: 20 },
            { emoji: '💪', name: 'Monthly', desc: 'Full access', price: 69 },
            { emoji: '🥇', name: 'Annual', desc: 'Best value', price: 599 },
            { emoji: '🧑‍🏫', name: 'PT Session', desc: 'Personal trainer', price: 80 }
        ],
        stepInfos: [
            "📞 Alex answers with energy and motivation!",
            "🏋️ Discussing fitness goals and membership options.",
            "✅ Confirming trial visit or membership signup.",
            "🎉 You're in! Get ready to crush those goals."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'interest' },
            { delay: 2500, type: 'experience' },
            { delay: 2500, type: 'trialTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'FitLife Gym',
            aiName: 'Jake',
            steps: ['Call', 'Enquire', 'Confirm', 'Done'],
            totalLabel: 'Membership',
            cardTitle: 'Trial Pass',
            responses: {
                greeting: "Hi, I'm interested in joining the gym",
                interest: "I'm looking to get fit and maybe do some weights",
                experience: "I've been to gyms before, intermediate level",
                trialTime: "This weekend would be great",
                name: "Alex Murphy",
                phone: "0478 901 234",
                confirm: "Sounds great, see you then!"
            }
        }
    },
    spa: {
        icon: '🧘',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#a855f7',
        cardIcon: 'fa-spa',
        quickActions: [
            { emoji: '💆', label: 'Book', text: "I'd like to book a treatment" },
            { emoji: '👆', label: 'Massage', text: "What massages do you offer?" },
            { emoji: '🎁', label: 'Packages', text: "Do you have any packages?" }
        ],
        menuItems: [
            { emoji: '💆', name: 'Swedish Massage', desc: 'Relaxation massage', price: 95 },
            { emoji: '💪', name: 'Deep Tissue', desc: 'Therapeutic massage', price: 110 },
            { emoji: '🪨', name: 'Hot Stone', desc: 'Heated stone therapy', price: 130 },
            { emoji: '🧖', name: 'Facial', desc: 'Rejuvenating facial', price: 85 }
        ],
        stepInfos: [
            "📞 Serena answers with calm, soothing energy.",
            "🧘 Discussing treatments, duration and preferences.",
            "✅ Confirming booking details and special requests.",
            "🎉 Relaxation awaits! See you at the spa."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'treatment' },
            { delay: 2500, type: 'duration' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'therapist' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Tranquil Waters Spa',
            aiName: 'Serena',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Treatment',
            cardTitle: 'Spa Booking',
            responses: {
                greeting: "Hi, I'd like to book a spa treatment",
                treatment: "A Swedish massage please",
                duration: "90 minutes would be lovely",
                datetime: "This Sunday morning if possible",
                therapist: "Female therapist please",
                name: "Michelle Taylor",
                phone: "0423 456 789",
                confirm: "Wonderful, thank you so much!"
            }
        }
    },
    lawyer: {
        icon: '⚖️',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#64748b',
        cardIcon: 'fa-gavel',
        quickActions: [
            { emoji: '📅', label: 'Consult', text: "I need to book a consultation" },
            { emoji: '⚖️', label: 'Areas', text: "What areas of law do you cover?" },
            { emoji: '💰', label: 'Fees', text: "What are your fees?" }
        ],
        menuItems: [
            { emoji: '💼', name: 'Initial Consult', desc: '30-minute meeting', price: 150 },
            { emoji: '🏠', name: 'Property Law', desc: 'Conveyancing services', price: 1200 },
            { emoji: '💔', name: 'Family Law', desc: 'Divorce, custody', price: 350 },
            { emoji: '📝', name: 'Will & Estate', desc: 'Estate planning', price: 450 }
        ],
        stepInfos: [
            "📞 Victoria answers with professionalism and discretion.",
            "⚖️ Understanding the legal matter and urgency.",
            "✅ Confirming consultation details and client info.",
            "🎉 Consultation booked. We'll be in touch."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'matter' },
            { delay: 2500, type: 'lawyer' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Harper & Associates',
            aiName: 'Victoria',
            steps: ['Call', 'Consult', 'Confirm', 'Done'],
            totalLabel: 'Consultation',
            cardTitle: 'Consultation',
            responses: {
                greeting: "Hi, I need to speak with a lawyer about a property matter",
                matter: "It's regarding a property settlement",
                lawyer: "Whoever is available for this type of case",
                datetime: "Early next week if possible",
                name: "David Richardson",
                phone: "0401 234 567",
                confirm: "Yes, that's confirmed, thank you"
            }
        }
    },
    realestate: {
        icon: '🏠',
        customerIcon: '👤',
        voice: 'echo',
        color: '#059669',
        cardIcon: 'fa-home',
        quickActions: [
            { emoji: '🏠', label: 'View', text: "I'd like to book a property viewing" },
            { emoji: '🔍', label: 'Search', text: "What properties do you have?" },
            { emoji: '💰', label: 'Appraisal', text: "I need a property appraisal" }
        ],
        menuItems: [
            { emoji: '🏡', name: '3 Bed House', desc: 'Family home', price: 850000 },
            { emoji: '🏙️', name: '2 Bed Apartment', desc: 'City living', price: 550000 },
            { emoji: '🌳', name: 'Townhouse', desc: 'Low maintenance', price: 720000 },
            { emoji: '🏞️', name: 'Land', desc: 'Build your dream', price: 450000 }
        ],
        stepInfos: [
            "📞 Marcus answers with property expertise!",
            "🏠 Discussing requirements, budget and locations.",
            "✅ Scheduling property viewings and follow-up.",
            "🎉 Viewing booked! Your dream home awaits."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'interest' },
            { delay: 2500, type: 'requirements' },
            { delay: 2500, type: 'budget' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Prestige Properties',
            aiName: 'Marcus',
            steps: ['Call', 'Enquire', 'Confirm', 'Done'],
            totalLabel: 'Inspection',
            cardTitle: 'Viewing Booked',
            responses: {
                greeting: "Hi, I'm looking to buy a property in the area",
                interest: "Looking to buy, a family home",
                requirements: "3 bedrooms, ideally with a backyard",
                budget: "Around 800k to 950k",
                datetime: "Saturday afternoon would be great",
                name: "Sophie Anderson",
                phone: "0412 345 678",
                confirm: "Perfect, I'll be there!"
            }
        }
    },
    pharmacy: {
        icon: '💊',
        customerIcon: '👤',
        voice: 'nova',
        color: '#16a34a',
        cardIcon: 'fa-prescription-bottle-medical',
        quickActions: [
            { emoji: '💊', label: 'Prescription', text: "Is my prescription ready?" },
            { emoji: '🩺', label: 'Advice', text: "I need some health advice" },
            { emoji: '🔄', label: 'Refill', text: "I need to refill my medication" }
        ],
        menuItems: [
            { emoji: '💊', name: 'Prescription', desc: 'PBS medications', price: 7 },
            { emoji: '🧤', name: 'Vitamins', desc: 'Daily supplements', price: 25 },
            { emoji: '🩺', name: 'First Aid', desc: 'Medical supplies', price: 15 },
            { emoji: '🧬', name: 'Blood Pressure', desc: 'Free check', price: 0 }
        ],
        stepInfos: [
            "📞 Dr. Sarah answers with healthcare expertise.",
            "💊 Checking prescription status or health query.",
            "✅ Confirming patient details and pickup time.",
            "🎉 Ready for pickup! Stay healthy."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'prescription' },
            { delay: 2500, type: 'pickup' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'dob' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'HealthPlus Pharmacy',
            aiName: 'Lisa',
            steps: ['Call', 'Request', 'Confirm', 'Done'],
            totalLabel: 'Prescription',
            cardTitle: 'Prescription Ready',
            responses: {
                greeting: "Hi, I need to check if my prescription is ready",
                prescription: "It's for blood pressure medication, Amlodipine",
                pickup: "I can come by in an hour",
                name: "Margaret Wilson",
                dob: "15th March 1965",
                confirm: "Great, thanks so much!"
            }
        }
    },
    bakery: {
        icon: '🥐',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#d97706',
        cardIcon: 'fa-bread-slice',
        quickActions: [
            { emoji: '🥐', label: 'Order', text: "I'd like to place an order" },
            { emoji: '🎂', label: 'Cakes', text: "Do you make custom cakes?" },
            { emoji: '⏰', label: 'Pickup', text: "When can I pick up?" }
        ],
        menuItems: [
            { emoji: '🥐', name: 'Croissants', desc: 'Fresh buttery', price: 5 },
            { emoji: '🍞', name: 'Sourdough', desc: 'Artisan loaf', price: 9 },
            { emoji: '🎂', name: 'Custom Cake', desc: 'Made to order', price: 85 },
            { emoji: '🧁', name: 'Cupcakes (6)', desc: 'Assorted flavors', price: 24 }
        ],
        stepInfos: [
            "📞 Emma answers with sweet enthusiasm!",
            "🥐 Taking the order for fresh baked goods.",
            "✅ Confirming items and pickup time.",
            "🎉 Fresh from the oven! Order confirmed."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'orderItem' },
            { delay: 2500, type: 'quantity' },
            { delay: 2000, type: 'pickupTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Golden Crust Bakery',
            aiName: 'Sophie',
            steps: ['Call', 'Order', 'Confirm', 'Done'],
            totalLabel: 'Order Total',
            cardTitle: 'Bakery Order',
            responses: {
                greeting: "Hi, I'd like to order some pastries for tomorrow morning",
                orderItem: "I need croissants and pain au chocolat",
                quantity: "6 of each please",
                pickupTime: "Around 8am tomorrow",
                name: "Jennifer Blake",
                phone: "0423 456 789",
                confirm: "Perfect, see you then!"
            }
        }
    },
    florist: {
        icon: '💐',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#e11d48',
        cardIcon: 'fa-seedling',
        quickActions: [
            { emoji: '🌹', label: 'Order', text: "I'd like to order flowers" },
            { emoji: '🚚', label: 'Delivery', text: "Do you deliver?" },
            { emoji: '🎁', label: 'Occasions', text: "What do you recommend for a birthday?" }
        ],
        menuItems: [
            { emoji: '🌹', name: 'Dozen Roses', desc: 'Classic red roses', price: 89 },
            { emoji: '💐', name: 'Mixed Bouquet', desc: 'Seasonal flowers', price: 65 },
            { emoji: '🌷', name: 'Tulips', desc: 'Fresh tulip bunch', price: 45 },
            { emoji: '🌻', name: 'Sunflowers', desc: 'Bright & cheerful', price: 55 }
        ],
        stepInfos: [
            "📞 Lily answers with passion for blooms!",
            "🌹 Discussing occasion, preferences and budget.",
            "✅ Confirming delivery details and message.",
            "🎉 Beautiful blooms on the way!"
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'occasion' },
            { delay: 2500, type: 'budget' },
            { delay: 2000, type: 'delivery' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Bloom & Co Florist',
            aiName: 'Rose',
            steps: ['Call', 'Design', 'Confirm', 'Done'],
            totalLabel: 'Bouquet',
            cardTitle: 'Floral Order',
            responses: {
                greeting: "Hi, I need to order flowers for a special occasion",
                occasion: "It's for my wife's birthday",
                budget: "Around $80 to $100",
                delivery: "Yes, delivery please",
                datetime: "Tomorrow before noon",
                name: "Michael Thompson, to 15 Rose Street",
                confirm: "That sounds beautiful, thank you!"
            }
        }
    },
    photography: {
        icon: '📸',
        customerIcon: '👤',
        voice: 'echo',
        color: '#7c3aed',
        cardIcon: 'fa-camera',
        quickActions: [
            { emoji: '📷', label: 'Book', text: "I'd like to book a session" },
            { emoji: '👰', label: 'Wedding', text: "I need a wedding photographer" },
            { emoji: '💰', label: 'Packages', text: "What packages do you offer?" }
        ],
        menuItems: [
            { emoji: '👶', name: 'Portrait', desc: '1 hour session', price: 250 },
            { emoji: '👰', name: 'Wedding', desc: 'Full day coverage', price: 3500 },
            { emoji: '👨‍👩‍👧', name: 'Family', desc: '2 hour session', price: 450 },
            { emoji: '🏢', name: 'Corporate', desc: 'Headshots & events', price: 600 }
        ],
        stepInfos: [
            "📞 James answers with creative energy!",
            "📷 Discussing event type, style and coverage.",
            "✅ Confirming date, location and package.",
            "🎉 Booking confirmed! Ready to capture magic."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'eventType' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'location' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Capture Moments Studio',
            aiName: 'Alex',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Session',
            cardTitle: 'Booking Confirmed',
            responses: {
                greeting: "Hi, I'm looking to book a photography session",
                eventType: "It's for a wedding, about 6 hours coverage",
                datetime: "March 15th next year",
                location: "The ceremony is at St Mary's Church",
                name: "Emma and James Mitchell",
                phone: "0456 789 012",
                confirm: "Wonderful, we're so excited!"
            }
        }
    },
    tattoo: {
        icon: '🎨',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#1f2937',
        cardIcon: 'fa-pen-nib',
        quickActions: [
            { emoji: '🎨', label: 'Book', text: "I want to book a tattoo session" },
            { emoji: '📝', label: 'Consult', text: "I need a design consultation" },
            { emoji: '💰', label: 'Prices', text: "What are your rates?" }
        ],
        menuItems: [
            { emoji: '✨', name: 'Small Tattoo', desc: 'Under 2 inches', price: 150 },
            { emoji: '🎨', name: 'Medium', desc: '2-5 inches', price: 350 },
            { emoji: '💪', name: 'Large', desc: 'Half sleeve', price: 800 },
            { emoji: '🌟', name: 'Custom Design', desc: 'Unique artwork', price: 100 }
        ],
        stepInfos: [
            "📞 Mike answers with artistic flair!",
            "🎨 Discussing design ideas, size and placement.",
            "✅ Confirming consultation or session booking.",
            "🎉 Can't wait to create your masterpiece!"
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'design' },
            { delay: 2500, type: 'size' },
            { delay: 2000, type: 'artist' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Ink Masters Studio',
            aiName: 'Jake',
            steps: ['Call', 'Consult', 'Confirm', 'Done'],
            totalLabel: 'Deposit',
            cardTitle: 'Session Booked',
            responses: {
                greeting: "Hey, I want to book a tattoo consultation",
                design: "I'm thinking a Japanese sleeve, koi fish theme",
                size: "Full sleeve, shoulder to wrist",
                artist: "I've seen Mike's work online, is he available?",
                datetime: "Any Saturday afternoon works for me",
                name: "Chris Palmer",
                confirm: "Awesome, can't wait!"
            }
        }
    },
    petgrooming: {
        icon: '🐩',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#0891b2',
        cardIcon: 'fa-paw',
        quickActions: [
            { emoji: '🐕', label: 'Book', text: "I need to book a grooming session" },
            { emoji: '✂️', label: 'Services', text: "What grooming services do you offer?" },
            { emoji: '💰', label: 'Prices', text: "What are your prices?" }
        ],
        menuItems: [
            { emoji: '🛁', name: 'Bath & Brush', desc: 'Wash and dry', price: 45 },
            { emoji: '✂️', name: 'Full Groom', desc: 'Bath, cut & nails', price: 75 },
            { emoji: '🐾', name: 'Nail Trim', desc: 'Quick nail clip', price: 20 },
            { emoji: '🧴', name: 'De-shedding', desc: 'Reduce shedding', price: 55 }
        ],
        stepInfos: [
            "📞 Bella answers with love for furry friends!",
            "🐩 Getting pet details and grooming needs.",
            "✅ Confirming appointment and special requests.",
            "🎉 They'll look fabulous! See you soon."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'petInfo' },
            { delay: 2500, type: 'service' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Pawfect Grooming',
            aiName: 'Bella',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Service',
            cardTitle: 'Grooming Booked',
            responses: {
                greeting: "Hi, I'd like to book a grooming appointment for my dog",
                petInfo: "He's a Golden Retriever named Max, about 3 years old",
                service: "Full groom please, bath, haircut and nails",
                datetime: "This Saturday morning if possible",
                name: "Laura Henderson",
                phone: "0478 901 234",
                confirm: "Perfect, Max will love it!"
            }
        }
    },
    // ============= NEW INDUSTRIES =============
    // SERVICES
    cleaning: {
        icon: '🧹',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#06b6d4',
        cardIcon: 'fa-spray-can-sparkles',
        quickActions: [
            { emoji: '🧹', label: 'Book', text: "I need a cleaning service" },
            { emoji: '🏠', label: 'Quote', text: "Can I get a quote?" },
            { emoji: '📅', label: 'Regular', text: "I want regular cleaning" }
        ],
        menuItems: [
            { emoji: '✨', name: 'Standard Clean', desc: 'Weekly/fortnightly', price: 150 },
            { emoji: '🧴', name: 'Deep Clean', desc: 'Top to bottom', price: 350 },
            { emoji: '🛁', name: 'Carpet Clean', desc: 'Steam cleaning', price: 200 },
            { emoji: '🧼', name: 'Move Out Clean', desc: 'Bond clean', price: 450 }
        ],
        stepInfos: [
            "📞 Maria answers with professionalism!",
            "🧹 Getting property details and cleaning needs.",
            "✅ Confirming date, time and access details.",
            "🎉 Cleaning scheduled! Your place will sparkle."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'size' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'address' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Sparkle Clean Co',
            aiName: 'Maria',
            steps: ['Call', 'Quote', 'Book', 'Done'],
            totalLabel: 'Estimate',
            cardTitle: 'Cleaning Booked',
            responses: {
                greeting: "Hi, I need a house cleaning service",
                service: "A deep clean please, including windows",
                size: "It's a 3 bedroom house",
                datetime: "Next Monday morning",
                address: "25 Ocean Drive, Brighton",
                phone: "0423 567 890",
                confirm: "That works great, thanks!"
            }
        }
    },
    electrician: {
        icon: '🔌',
        customerIcon: '👤',
        voice: 'echo',
        color: '#eab308',
        cardIcon: 'fa-bolt',
        quickActions: [
            { emoji: '⚡', label: 'Urgent', text: "I have an electrical emergency" },
            { emoji: '🔌', label: 'Book', text: "I need an electrician" },
            { emoji: '💰', label: 'Quote', text: "Can I get a quote?" }
        ],
        menuItems: [
            { emoji: '📡', name: 'Call-out', desc: 'Diagnosis fee', price: 99 },
            { emoji: '🔌', name: 'Power Point', desc: 'Install/repair', price: 150 },
            { emoji: '💡', name: 'Lighting', desc: 'Install/replace', price: 180 },
            { emoji: '⚡', name: 'Safety Check', desc: 'Full inspection', price: 250 }
        ],
        stepInfos: [
            "📞 Dave answers ready to power up!",
            "🔌 Understanding the electrical issue and urgency.",
            "✅ Confirming address and booking time.",
            "🎉 Sparky's on the way! Job booked."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'issue' },
            { delay: 2500, type: 'urgent' },
            { delay: 2000, type: 'address' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'PowerUp Electric',
            aiName: 'Dave',
            steps: ['Call', 'Assess', 'Book', 'Done'],
            totalLabel: 'Call-out',
            cardTitle: 'Job Booked',
            responses: {
                greeting: "Hi, I need an electrician",
                issue: "Some power points stopped working in my kitchen",
                urgent: "Not urgent, but this week would be good",
                address: "18 Park Lane, Kew",
                datetime: "Wednesday afternoon works",
                name: "Robert Miller",
                confirm: "Perfect, see you then!"
            }
        }
    },
    plumber: {
        icon: '🚿',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#3b82f6',
        cardIcon: 'fa-faucet',
        quickActions: [
            { emoji: '🚨', label: 'Emergency', text: "I have a plumbing emergency" },
            { emoji: '🚿', label: 'Book', text: "I need a plumber" },
            { emoji: '💰', label: 'Quote', text: "Can I get a quote?" }
        ],
        menuItems: [
            { emoji: '🔧', name: 'Call-out', desc: 'Diagnosis fee', price: 99 },
            { emoji: '🚿', name: 'Tap Repair', desc: 'Fix leaky tap', price: 120 },
            { emoji: '🚽', name: 'Toilet Repair', desc: 'Unblock/repair', price: 180 },
            { emoji: '🌡️', name: 'Hot Water', desc: 'System repair', price: 350 }
        ],
        stepInfos: [
            "📞 Steve answers, ready to fix it fast!",
            "🚿 Understanding the plumbing problem and urgency.",
            "✅ Confirming address and booking time.",
            "🎉 Plumber dispatched! Help is on the way."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'issue' },
            { delay: 2500, type: 'urgent' },
            { delay: 2000, type: 'address' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Quick Flow Plumbing',
            aiName: 'Steve',
            steps: ['Call', 'Assess', 'Book', 'Done'],
            totalLabel: 'Call-out',
            cardTitle: 'Job Booked',
            responses: {
                greeting: "Hi, I've got a plumbing issue",
                issue: "There's a leak under my kitchen sink",
                urgent: "It's dripping pretty badly, as soon as possible",
                address: "42 River Road, Hawthorn",
                datetime: "Today if you can",
                name: "Karen White",
                confirm: "Thank you so much!"
            }
        }
    },
    landscaping: {
        icon: '🌳',
        customerIcon: '👤',
        voice: 'echo',
        color: '#22c55e',
        cardIcon: 'fa-tree',
        quickActions: [
            { emoji: '🌿', label: 'Book', text: "I need lawn and garden services" },
            { emoji: '🌳', label: 'Quote', text: "Can I get a quote?" },
            { emoji: '🔄', label: 'Regular', text: "I want regular maintenance" }
        ],
        menuItems: [
            { emoji: '🌾', name: 'Lawn Mow', desc: 'Standard mow', price: 60 },
            { emoji: '✂️', name: 'Hedge Trim', desc: 'Shape & trim', price: 80 },
            { emoji: '🍂', name: 'Garden Clean', desc: 'Full cleanup', price: 200 },
            { emoji: '🌱', name: 'Planting', desc: 'New plants', price: 150 }
        ],
        stepInfos: [
            "📞 Tom answers with garden enthusiasm!",
            "🌳 Discussing yard size and services needed.",
            "✅ Confirming schedule and access details.",
            "🎉 Garden service booked! Looking great soon."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'size' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'address' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Green Thumb Gardens',
            aiName: 'Tom',
            steps: ['Call', 'Quote', 'Book', 'Done'],
            totalLabel: 'Estimate',
            cardTitle: 'Service Booked',
            responses: {
                greeting: "Hi, I need some landscaping work done",
                service: "Lawn mowing and hedge trimming",
                size: "It's a medium-sized backyard, about 200sqm",
                datetime: "Every fortnight would be ideal",
                address: "56 Garden Street, Camberwell",
                name: "Paul Anderson",
                confirm: "Sounds great, thanks!"
            }
        }
    },
    moving: {
        icon: '🚚',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#f97316',
        cardIcon: 'fa-truck-moving',
        quickActions: [
            { emoji: '🚚', label: 'Quote', text: "I need a moving quote" },
            { emoji: '📅', label: 'Book', text: "I want to book a move" },
            { emoji: '📦', label: 'Packing', text: "Do you offer packing services?" }
        ],
        menuItems: [
            { emoji: '🚚', name: '2 Movers', desc: 'Small move', price: 150 },
            { emoji: '📦', name: '3 Movers', desc: 'Standard move', price: 200 },
            { emoji: '🏠', name: 'Full Service', desc: 'Pack & move', price: 400 },
            { emoji: '🎹', name: 'Piano', desc: 'Specialty move', price: 300 }
        ],
        stepInfos: [
            "📞 Mark answers ready to help you move!",
            "🚚 Getting move details, size and dates.",
            "✅ Confirming addresses and booking.",
            "🎉 Move booked! Stress-free relocation ahead."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'moveType' },
            { delay: 2500, type: 'size' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'addresses' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Swift Movers',
            aiName: 'Mark',
            steps: ['Call', 'Quote', 'Book', 'Done'],
            totalLabel: 'Quote',
            cardTitle: 'Move Booked',
            responses: {
                greeting: "Hi, I need to book a moving service",
                moveType: "It's a house move, local only",
                size: "3 bedroom house, fairly standard furniture",
                datetime: "End of the month, the 28th",
                addresses: "From Fitzroy to Carlton, about 5km",
                name: "Sarah Mitchell",
                confirm: "Perfect, we'll be ready!"
            }
        }
    },
    locksmith: {
        icon: '🔒',
        customerIcon: '👤',
        voice: 'echo',
        color: '#64748b',
        cardIcon: 'fa-key',
        quickActions: [
            { emoji: '🚨', label: 'Locked Out', text: "I'm locked out!" },
            { emoji: '🔑', label: 'Rekey', text: "I need locks rekeyed" },
            { emoji: '🔒', label: 'New Lock', text: "I need a new lock installed" }
        ],
        menuItems: [
            { emoji: '🚗', name: 'Car Lockout', desc: 'Emergency unlock', price: 89 },
            { emoji: '🏠', name: 'House Lockout', desc: 'Emergency unlock', price: 99 },
            { emoji: '🔑', name: 'Rekey', desc: 'Change key combo', price: 150 },
            { emoji: '🔒', name: 'New Lock', desc: 'Install new lock', price: 200 }
        ],
        stepInfos: [
            "📞 Frank answers calmly in your emergency!",
            "🔒 Getting your location and situation.",
            "✅ Dispatching locksmith immediately.",
            "🎉 Help is on the way! ETA provided."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'issue' },
            { delay: 2500, type: 'urgent' },
            { delay: 2000, type: 'address' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'KeyMaster Locksmiths',
            aiName: 'Frank',
            steps: ['Call', 'Dispatch', 'Done'],
            totalLabel: 'Call-out',
            cardTitle: 'Job Dispatched',
            responses: {
                greeting: "Hi, I'm locked out of my house",
                issue: "I left my keys inside when the door closed",
                urgent: "Yes, I'm standing outside now",
                address: "77 Lock Street, Brunswick",
                name: "Tim Johnson",
                phone: "0445 678 901",
                confirm: "Thank you, I'll wait here!"
            }
        }
    },
    // HEALTH/BEAUTY
    optician: {
        icon: '👁️',
        customerIcon: '👤',
        voice: 'nova',
        color: '#0ea5e9',
        cardIcon: 'fa-eye',
        quickActions: [
            { emoji: '👁️', label: 'Eye Test', text: "I need an eye test" },
            { emoji: '👓', label: 'Glasses', text: "I need new glasses" },
            { emoji: '📞', label: 'Contacts', text: "I need contact lenses" }
        ],
        menuItems: [
            { emoji: '👁️', name: 'Eye Exam', desc: 'Comprehensive test', price: 75 },
            { emoji: '👓', name: 'Frames', desc: 'Designer range', price: 199 },
            { emoji: '🩹', name: 'Contacts', desc: 'Monthly supply', price: 60 },
            { emoji: '🕶️', name: 'Sunglasses', desc: 'Prescription sunnies', price: 249 }
        ],
        stepInfos: [
            "📞 Lisa answers with care for your vision!",
            "👁️ Discussing eye care needs and insurance.",
            "✅ Confirming appointment details.",
            "🎉 Eye exam booked! See you soon."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'insurance' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Clear Vision Optometry',
            aiName: 'Lisa',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Appointment',
            cardTitle: 'Eye Exam Booked',
            responses: {
                greeting: "Hi, I'd like to book an eye test",
                service: "Full eye exam and I might need new glasses",
                insurance: "Yes, I have private health cover",
                datetime: "Next Tuesday afternoon",
                name: "David Chen",
                phone: "0467 234 567",
                confirm: "Great, see you then!"
            }
        }
    },
    podiatrist: {
        icon: '🦶',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#14b8a6',
        cardIcon: 'fa-shoe-prints',
        quickActions: [
            { emoji: '🦶', label: 'Book', text: "I need a podiatry appointment" },
            { emoji: '🩺', label: 'Pain', text: "I have foot pain" },
            { emoji: '👟', label: 'Orthotics', text: "I need custom orthotics" }
        ],
        menuItems: [
            { emoji: '🦶', name: 'Consultation', desc: 'Initial assessment', price: 90 },
            { emoji: '✂️', name: 'Nail Care', desc: 'Trim & treatment', price: 70 },
            { emoji: '👟', name: 'Orthotics', desc: 'Custom insoles', price: 350 },
            { emoji: '🩺', name: 'Corn Removal', desc: 'Professional care', price: 80 }
        ],
        stepInfos: [
            "📞 Dr. Kate's receptionist answers warmly.",
            "🦶 Understanding foot issues and concerns.",
            "✅ Confirming appointment and patient details.",
            "🎉 Appointment booked! Happy feet ahead."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'issue' },
            { delay: 2500, type: 'firstVisit' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Happy Feet Podiatry',
            aiName: 'Dr. Kate',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Consult',
            cardTitle: 'Appointment Booked',
            responses: {
                greeting: "Hi, I need to see a podiatrist",
                issue: "I've been having heel pain, might be plantar fasciitis",
                firstVisit: "Yes, this is my first visit",
                datetime: "Friday morning works for me",
                name: "Angela Williams",
                phone: "0489 012 345",
                confirm: "Thank you, looking forward to it!"
            }
        }
    },
    massage: {
        icon: '💆',
        customerIcon: '👤',
        voice: 'nova',
        color: '#a855f7',
        cardIcon: 'fa-spa',
        quickActions: [
            { emoji: '💆', label: 'Book', text: "I'd like to book a massage" },
            { emoji: '💪', label: 'Deep Tissue', text: "I need a deep tissue massage" },
            { emoji: '🎁', label: 'Couples', text: "Do you offer couples massage?" }
        ],
        menuItems: [
            { emoji: '🧘', name: 'Relaxation', desc: '60 min Swedish', price: 90 },
            { emoji: '💪', name: 'Deep Tissue', desc: '60 min therapeutic', price: 100 },
            { emoji: '🪨', name: 'Hot Stone', desc: '75 min treatment', price: 120 },
            { emoji: '👫', name: 'Couples', desc: 'Side by side', price: 180 }
        ],
        stepInfos: [
            "📞 Zen answers with calming energy.",
            "💆 Discussing massage type and preferences.",
            "✅ Confirming booking and therapist preference.",
            "🎉 Relaxation awaits! Booking confirmed."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'duration' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Healing Hands Massage',
            aiName: 'Zen',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Session',
            cardTitle: 'Massage Booked',
            responses: {
                greeting: "Hi, I'd like to book a massage",
                service: "Deep tissue massage please, I have a lot of tension",
                duration: "60 minutes would be great",
                datetime: "Saturday afternoon, around 3pm",
                name: "Michelle Brown",
                phone: "0456 789 123",
                confirm: "Perfect, can't wait!"
            }
        }
    },
    nailsalon: {
        icon: '💅',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#ec4899',
        cardIcon: 'fa-hand-sparkles',
        quickActions: [
            { emoji: '💅', label: 'Book', text: "I'd like to book a nail appointment" },
            { emoji: '✨', label: 'Gel', text: "Do you do gel nails?" },
            { emoji: '🎨', label: 'Art', text: "Do you offer nail art?" }
        ],
        menuItems: [
            { emoji: '💅', name: 'Manicure', desc: 'Classic polish', price: 35 },
            { emoji: '✨', name: 'Gel Manicure', desc: 'Long-lasting gel', price: 55 },
            { emoji: '🦶', name: 'Pedicure', desc: 'Full foot care', price: 50 },
            { emoji: '🎨', name: 'Nail Art', desc: 'Custom designs', price: 15 }
        ],
        stepInfos: [
            "📞 Kim answers with bubbly enthusiasm!",
            "💅 Discussing services and nail preferences.",
            "✅ Confirming appointment time.",
            "🎉 Gorgeous nails coming up!"
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'extras' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Polished Nails Studio',
            aiName: 'Kim',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Service',
            cardTitle: 'Appointment Booked',
            responses: {
                greeting: "Hi, I'd like to book a nail appointment",
                service: "Gel manicure and pedicure please",
                extras: "Yes, with some nail art on the accent nails",
                datetime: "Tomorrow at 2pm if available",
                name: "Jessica Taylor",
                phone: "0478 345 678",
                confirm: "Lovely, see you tomorrow!"
            }
        }
    },
    // FOOD
    coffeeshop: {
        icon: '☕',
        customerIcon: '👤',
        voice: 'echo',
        color: '#78350f',
        cardIcon: 'fa-mug-hot',
        quickActions: [
            { emoji: '☕', label: 'Order', text: "I'd like to order coffees" },
            { emoji: '🥐', label: 'Food', text: "What food do you have?" },
            { emoji: '⏰', label: 'Pickup', text: "When can I pick up?" }
        ],
        menuItems: [
            { emoji: '☕', name: 'Flat White', desc: 'Classic aussie coffee', price: 5 },
            { emoji: '☕', name: 'Latte', desc: 'Smooth & creamy', price: 5 },
            { emoji: '🥐', name: 'Croissant', desc: 'Fresh buttery', price: 5 },
            { emoji: '🍞', name: 'Toast', desc: 'Sourdough w/ avo', price: 12 }
        ],
        stepInfos: [
            "📞 Barista Joe answers with caffeine energy!",
            "☕ Taking the coffee order and extras.",
            "✅ Confirming order and pickup time.",
            "🎉 Coffee's brewing! See you soon."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'orderItem' },
            { delay: 2500, type: 'moreItems' },
            { delay: 2000, type: 'pickupTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Bean There Café',
            aiName: 'Barista Joe',
            steps: ['Call', 'Order', 'Confirm', 'Done'],
            totalLabel: 'Order Total',
            cardTitle: 'Coffee Order',
            responses: {
                greeting: "Hi, I'd like to order some coffees for pickup",
                orderItem: "3 flat whites and 2 lattes please",
                moreItems: "Add a couple of croissants too",
                pickupTime: "About 15 minutes",
                name: "Office order for Acme Corp",
                confirm: "Perfect, thanks!"
            }
        }
    },
    icecream: {
        icon: '🍦',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#fbbf24',
        cardIcon: 'fa-ice-cream',
        quickActions: [
            { emoji: '🍦', label: 'Order', text: "I'd like to order ice cream" },
            { emoji: '🍨', label: 'Flavors', text: "What flavors do you have?" },
            { emoji: '🎂', label: 'Party', text: "I need ice cream for a party" }
        ],
        menuItems: [
            { emoji: '🍦', name: 'Single Scoop', desc: 'One flavor', price: 5 },
            { emoji: '🍨', name: 'Double Scoop', desc: 'Two flavors', price: 7.5 },
            { emoji: '🥤', name: 'Milkshake', desc: 'Thick & creamy', price: 9 },
            { emoji: '🧁', name: 'Tub (1L)', desc: 'Take home', price: 15 }
        ],
        stepInfos: [
            "📞 Sunny answers with sweet enthusiasm!",
            "🍦 Taking the ice cream order and flavors.",
            "✅ Confirming size and pickup time.",
            "🎉 Sweet treat on the way!"
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'orderItem' },
            { delay: 2500, type: 'size' },
            { delay: 2000, type: 'moreItems' },
            { delay: 2000, type: 'pickupTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Scoops Delight',
            aiName: 'Sunny',
            steps: ['Call', 'Order', 'Confirm', 'Done'],
            totalLabel: 'Order Total',
            cardTitle: 'Ice Cream Order',
            responses: {
                greeting: "Hi, I'd like to order ice cream for a party",
                orderItem: "Can I get chocolate, vanilla, and strawberry",
                size: "Large tubs, 2 liters each",
                moreItems: "And some waffle cones please",
                pickupTime: "In about an hour",
                name: "Birthday party for Lucy",
                confirm: "Awesome, thanks!"
            }
        }
    },
    sushi: {
        icon: '🍣',
        customerIcon: '👤',
        voice: 'nova',
        color: '#dc2626',
        cardIcon: 'fa-fish',
        quickActions: [
            { emoji: '🍣', label: 'Order', text: "I'd like to order sushi" },
            { emoji: '🚚', label: 'Delivery', text: "Do you deliver?" },
            { emoji: '🍱', label: 'Bento', text: "What bento boxes do you have?" }
        ],
        menuItems: [
            { emoji: '🍣', name: 'Salmon Sashimi', desc: '6 pieces', price: 16 },
            { emoji: '🌣', name: 'California Roll', desc: '8 pieces', price: 12 },
            { emoji: '🍱', name: 'Bento Box', desc: 'Complete meal', price: 22 },
            { emoji: '🥮', name: 'Gyoza', desc: '6 dumplings', price: 10 }
        ],
        stepInfos: [
            "📞 Yuki answers with Japanese hospitality!",
            "🍣 Taking the sushi order carefully.",
            "✅ Confirming items and pickup/delivery.",
            "🎉 Arigatou! Your order is being prepared."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'orderItem' },
            { delay: 2500, type: 'moreItems' },
            { delay: 2000, type: 'noMore' },
            { delay: 2000, type: 'pickupTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Sakura Sushi',
            aiName: 'Yuki',
            steps: ['Call', 'Order', 'Confirm', 'Done'],
            totalLabel: 'Order Total',
            cardTitle: 'Sushi Order',
            responses: {
                greeting: "Hi, I'd like to place a takeaway order",
                orderItem: "Salmon sashimi and a rainbow roll please",
                moreItems: "Add some edamame and miso soup",
                noMore: "That's all thanks",
                pickupTime: "About 20 minutes",
                name: "Kevin",
                confirm: "Arigatou!"
            }
        }
    },
    fastfood: {
        icon: '🍔',
        customerIcon: '👤',
        voice: 'echo',
        color: '#ea580c',
        cardIcon: 'fa-burger',
        quickActions: [
            { emoji: '🍔', label: 'Order', text: "I want to order food" },
            { emoji: '🍟', label: 'Combo', text: "What combos do you have?" },
            { emoji: '🚚', label: 'Delivery', text: "Do you deliver?" }
        ],
        menuItems: [
            { emoji: '🍔', name: 'Classic Burger', desc: 'Beef patty', price: 9 },
            { emoji: '🍟', name: 'Fries', desc: 'Large size', price: 6 },
            { emoji: '🍗', name: 'Chicken Burger', desc: 'Crispy chicken', price: 10 },
            { emoji: '🥤', name: 'Combo Deal', desc: 'Burger+Fries+Drink', price: 15 }
        ],
        stepInfos: [
            "📞 Billy answers fast and friendly!",
            "🍔 Taking your burger order quickly.",
            "✅ Confirming order and pickup/delivery.",
            "🎉 Order up! Almost ready."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'orderItem' },
            { delay: 2500, type: 'moreItems' },
            { delay: 2000, type: 'noMore' },
            { delay: 2000, type: 'pickupDelivery' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Burger Barn',
            aiName: 'Billy',
            steps: ['Call', 'Order', 'Confirm', 'Done'],
            totalLabel: 'Order Total',
            cardTitle: 'Burger Order',
            responses: {
                greeting: "Hey, I want to order some burgers",
                orderItem: "Double cheeseburger meal with fries",
                moreItems: "Make that two, and add a chicken burger",
                noMore: "That's it",
                pickupDelivery: "Pickup please, I'll be there in 10",
                name: "Jake",
                confirm: "Sweet, cheers!"
            }
        }
    },
    // OTHER
    drivingschool: {
        icon: '🏫',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#0284c7',
        cardIcon: 'fa-car',
        quickActions: [
            { emoji: '🚗', label: 'Lesson', text: "I want to book a driving lesson" },
            { emoji: '🎫', label: 'Package', text: "What packages do you offer?" },
            { emoji: '🏆', label: 'Test', text: "I need a test day lesson" }
        ],
        menuItems: [
            { emoji: '🚗', name: 'Single Lesson', desc: '1 hour', price: 70 },
            { emoji: '🎫', name: '5 Lessons', desc: 'Package deal', price: 320 },
            { emoji: '🌟', name: '10 Lessons', desc: 'Best value', price: 600 },
            { emoji: '🏆', name: 'Test Day', desc: 'Pre-test + car', price: 150 }
        ],
        stepInfos: [
            "📞 Instructor Mike's team answers encouragingly!",
            "🚗 Discussing experience and lesson needs.",
            "✅ Confirming schedule and pickup location.",
            "🎉 Lesson booked! You'll be driving soon."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'experience' },
            { delay: 2500, type: 'license' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Pass First Driving School',
            aiName: 'Instructor Mike',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Lesson',
            cardTitle: 'Lesson Booked',
            responses: {
                greeting: "Hi, I want to book driving lessons",
                experience: "I'm a complete beginner",
                license: "Yes, I have my learner's permit",
                datetime: "Weekends work best for me",
                name: "Emily Watson",
                phone: "0498 765 432",
                confirm: "Great, looking forward to it!"
            }
        }
    },
    tutoring: {
        icon: '🎓',
        customerIcon: '👤',
        voice: 'nova',
        color: '#6366f1',
        cardIcon: 'fa-graduation-cap',
        quickActions: [
            { emoji: '📚', label: 'Find Tutor', text: "I need a tutor" },
            { emoji: '🧠', label: 'Subjects', text: "What subjects do you cover?" },
            { emoji: '💰', label: 'Rates', text: "What are your rates?" }
        ],
        menuItems: [
            { emoji: '📖', name: 'Primary', desc: '1 hour session', price: 50 },
            { emoji: '📚', name: 'High School', desc: '1 hour session', price: 60 },
            { emoji: '🎓', name: 'VCE/HSC', desc: 'Specialist', price: 75 },
            { emoji: '👥', name: 'Group', desc: 'Per student', price: 35 }
        ],
        stepInfos: [
            "📞 Professor Amy's team answers warmly!",
            "📚 Discussing student needs and subjects.",
            "✅ Matching with the right tutor.",
            "🎉 Tutor matched! Success awaits."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'subject' },
            { delay: 2500, type: 'level' },
            { delay: 2000, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'BrightMinds Tutoring',
            aiName: 'Professor Amy',
            steps: ['Call', 'Match', 'Book', 'Done'],
            totalLabel: 'Session',
            cardTitle: 'Tutoring Booked',
            responses: {
                greeting: "Hi, I'm looking for a tutor for my son",
                subject: "He needs help with maths",
                level: "Year 10, preparing for VCE",
                datetime: "Thursdays after school, around 4pm",
                name: "Daniel, my son's name is Jack",
                phone: "0412 987 654",
                confirm: "Wonderful, thank you!"
            }
        }
    },
    daycare: {
        icon: '🧒',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#f472b6',
        cardIcon: 'fa-baby',
        quickActions: [
            { emoji: '👶', label: 'Enquire', text: "I'm looking for childcare" },
            { emoji: '📅', label: 'Availability', text: "Do you have spots available?" },
            { emoji: '💰', label: 'Fees', text: "What are your fees?" }
        ],
        menuItems: [
            { emoji: '☀️', name: 'Full Day', desc: '7am-6pm', price: 120 },
            { emoji: '🌙', name: 'Half Day', desc: '4 hours', price: 70 },
            { emoji: '🏠', name: 'After School', desc: '3pm-6pm', price: 35 },
            { emoji: '🌴', name: 'Holiday', desc: 'Per day', price: 85 }
        ],
        stepInfos: [
            "📞 Miss Jenny answers with warmth and care!",
            "👶 Learning about your child's needs.",
            "✅ Checking availability and requirements.",
            "🎉 Enrollment started! Welcome to the family."
        ],
        color: '#f472b6',
        cardIcon: 'fa-baby',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'childAge' },
            { delay: 2500, type: 'schedule' },
            { delay: 2000, type: 'startDate' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Little Stars Daycare',
            aiName: 'Miss Jenny',
            steps: ['Call', 'Enroll', 'Confirm', 'Done'],
            totalLabel: 'Enrollment',
            cardTitle: 'Enrollment Started',
            responses: {
                greeting: "Hi, I'm enquiring about daycare spots",
                childAge: "My daughter is 2 years old",
                schedule: "We need 3 days a week, Monday, Wednesday, Friday",
                startDate: "We'd like to start next month",
                name: "Parent: Sarah, Child: Olivia",
                phone: "0456 321 098",
                confirm: "That's perfect, thank you!"
            }
        }
    },
    petboarding: {
        icon: '🐈',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#84cc16',
        cardIcon: 'fa-cat',
        quickActions: [
            { emoji: '🐾', label: 'Book', text: "I need to board my pet" },
            { emoji: '📅', label: 'Dates', text: "I need boarding from..." },
            { emoji: '💰', label: 'Rates', text: "What are your rates?" }
        ],
        menuItems: [
            { emoji: '🐕', name: 'Dog Boarding', desc: 'Per night', price: 50 },
            { emoji: '🐈', name: 'Cat Boarding', desc: 'Per night', price: 35 },
            { emoji: '👑', name: 'Luxury Suite', desc: 'Premium stay', price: 75 },
            { emoji: '☀️', name: 'Day Care', desc: 'Daily visit', price: 40 }
        ],
        stepInfos: [
            "📞 Lucy answers with pet parent understanding!",
            "🐾 Getting pet details and special needs.",
            "✅ Confirming dates and requirements.",
            "🎉 Boarding booked! They'll have a blast."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'petInfo' },
            { delay: 2500, type: 'dates' },
            { delay: 2000, type: 'special' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Happy Tails Pet Resort',
            aiName: 'Lucy',
            steps: ['Call', 'Book', 'Confirm', 'Done'],
            totalLabel: 'Boarding',
            cardTitle: 'Boarding Booked',
            responses: {
                greeting: "Hi, I need to board my cat while I'm on holiday",
                petInfo: "She's a 4 year old tabby named Whiskers",
                dates: "From December 20th to January 3rd",
                special: "She's on a special diet, I'll bring her food",
                name: "Rachel Green",
                phone: "0467 890 123",
                confirm: "Thank you, she'll love it there!"
            }
        }
    },
    wedding: {
        icon: '💒',
        customerIcon: '👤',
        voice: 'nova',
        color: '#f9a8d4',
        cardIcon: 'fa-heart',
        quickActions: [
            { emoji: '💍', label: 'Plan', text: "We need a wedding planner" },
            { emoji: '📅', label: 'Date', text: "We're getting married in..." },
            { emoji: '💰', label: 'Packages', text: "What packages do you offer?" }
        ],
        menuItems: [
            { emoji: '💒', name: 'Full Planning', desc: 'Everything covered', price: 5000 },
            { emoji: '📅', name: 'Partial', desc: 'Key elements', price: 2500 },
            { emoji: '✨', name: 'Day-of', desc: 'Coordination only', price: 1500 },
            { emoji: '✈️', name: 'Destination', desc: 'Quote based', price: 0 }
        ],
        stepInfos: [
            "📞 Grace answers with wedding excitement!",
            "💒 Learning about your dream wedding.",
            "✅ Booking consultation and next steps.",
            "🎉 Congratulations! Let's make magic."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'date' },
            { delay: 2500, type: 'guests' },
            { delay: 2000, type: 'services' },
            { delay: 2000, type: 'budget' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Forever After Weddings',
            aiName: 'Grace',
            steps: ['Call', 'Consult', 'Plan', 'Done'],
            totalLabel: 'Package',
            cardTitle: 'Consultation Booked',
            responses: {
                greeting: "Hi, we just got engaged and need a wedding planner",
                date: "We're thinking October next year",
                guests: "Around 120 guests",
                services: "Full planning, venue, catering, everything",
                budget: "Our budget is around $40,000",
                name: "Emma and James",
                confirm: "We're so excited, thank you!"
            }
        }
    },
    eventvenue: {
        icon: '🎭',
        customerIcon: '👤',
        voice: 'echo',
        color: '#7c3aed',
        cardIcon: 'fa-champagne-glasses',
        quickActions: [
            { emoji: '🎪', label: 'Book', text: "I want to book a venue" },
            { emoji: '📅', label: 'Viewing', text: "Can I schedule a viewing?" },
            { emoji: '💰', label: 'Pricing', text: "What are your venue rates?" }
        ],
        menuItems: [
            { emoji: '🏛️', name: 'Main Hall', desc: '200 guests', price: 3000 },
            { emoji: '🌳', name: 'Garden', desc: '100 guests', price: 2000 },
            { emoji: '🏢', name: 'Boardroom', desc: '30 guests', price: 500 },
            { emoji: '🌃', name: 'Rooftop', desc: '80 guests', price: 2500 }
        ],
        stepInfos: [
            "📞 Victoria answers with event expertise!",
            "🎭 Discussing event type, date and capacity.",
            "✅ Scheduling venue viewing or booking.",
            "🎉 Viewing confirmed! Let's create magic."
        ],
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'eventType' },
            { delay: 2500, type: 'date' },
            { delay: 2000, type: 'guests' },
            { delay: 2000, type: 'catering' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'confirm' }
        ],
        en: {
            name: 'Grand Events Hall',
            aiName: 'Victoria',
            steps: ['Call', 'View', 'Book', 'Done'],
            totalLabel: 'Venue',
            cardTitle: 'Viewing Booked',
            responses: {
                greeting: "Hi, I'm looking to book a venue for an event",
                eventType: "It's a corporate end-of-year party",
                date: "December 15th, evening event",
                guests: "About 80 people",
                catering: "Yes, we'd need catering and bar service",
                name: "Acme Corporation, contact: Peter",
                confirm: "Fantastic, we'll see you for the viewing!"
            }
        }
    }
};

// ============================================
// TRANSLATIONS
// ============================================
const Translations = {
    en: {
        title: 'AI Receptionist',
        subtitle: 'Experience how our AI receptionist handles calls naturally - with voice, personality, and zero wait times.',
        landingSubtitle: 'Select your industry to see how AI handles calls for your business',
        tryIt: 'Try It Yourself',
        watchDemo: 'Watch Demo',
        messages: 'Messages',
        callTime: 'Call Time',
        customerSMS: 'Customer SMS',
        pending: 'Pending',
        sent: '✓ Sent',
        done: '✓ Done',
        incomingCall: 'Incoming Call...',
        onCall: 'On Call',
        callEnded: 'Call Ended',
        typeOrSpeak: 'Type or speak...',
        whatHappening: "What's Happening",
        change: 'Change',
        clickToStart: 'Click any industry to start the demo',
        stepInfos: [
            "📞 The AI answers the call instantly and greets the customer naturally.",
            "🍽️ The AI is taking the order, asking questions and building the cart.",
            "✅ Confirming order details, pickup time, and customer information.",
            "🎉 Order complete! SMS sent to customer, ticket printed in kitchen."
        ],
        smsPlaceholder: 'SMS appears after confirmation',
        ticketPlaceholder: 'Confirmation appears after booking',
        noConversation: 'No conversation to export. Start a demo first!',
        // Industry descriptions
        restaurantDesc: 'Take orders, handle reservations',
        pizzaDesc: 'Orders & delivery management',
        salonName: 'Hair Salon',
        salonDesc: 'Book appointments, manage stylists',
        medicalName: 'Medical Centre',
        medicalDesc: 'Patient scheduling & inquiries',
        dentalName: 'Dentist',
        dentalDesc: 'Dental appointments & care',
        vetName: 'Vet Clinic',
        vetDesc: 'Pet appointments & emergencies',
        garageName: 'Auto Shop',
        garageDesc: 'Service bookings & quotes',
        hotelName: 'Hotel',
        hotelDesc: 'Room reservations & concierge',
        gymName: 'Gym',
        gymDesc: 'Memberships & class bookings',
        spaDesc: 'Wellness appointments & packages',
        lawyerName: 'Legal',
        lawyerDesc: 'Consultations & case inquiries',
        realestateName: 'Real Estate',
        realestateDesc: 'Property viewings & inquiries',
        pharmacyName: 'Pharmacy',
        pharmacyDesc: 'Prescriptions & health advice',
        bakeryName: 'Bakery',
        bakeryDesc: 'Orders & special requests',
        floristName: 'Florist',
        floristDesc: 'Bouquets & delivery',
        photographyName: 'Photo Studio',
        photographyDesc: 'Sessions & packages',
        tattooName: 'Tattoo Studio',
        tattooDesc: 'Appointments & consultations',
        petgroomingName: 'Pet Grooming',
        petgroomingDesc: 'Grooming & pet care'
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const t = (key) => Translations.en[key] || key;

const getIndustry = () => Industries[State.currentIndustry] || Industries.restaurant;

const getIndustryLang = () => {
    const ind = getIndustry();
    return ind.en;
};

const getCurrency = () => '$';

// ============================================
// AUDIO MANAGER - Centralized TTS handling
// ============================================
const AudioManager = {
    async playAIAudio(audioBase64) {
        return new Promise((resolve) => {
            if (!audioBase64) return resolve();
            
            if (State.currentAudio) {
                State.currentAudio.pause();
                State.currentAudio = null;
            }
            
            const audio = new Audio('data:audio/mp3;base64,' + audioBase64);
            State.currentAudio = audio;
            State.isSpeaking = true;
            
            audio.onended = () => {
                State.isSpeaking = false;
                State.currentAudio = null;
                resolve();
            };
            audio.onerror = () => {
                State.isSpeaking = false;
                State.currentAudio = null;
                resolve();
            };
            audio.play().catch(() => {
                State.isSpeaking = false;
                resolve();
            });
        });
    },

    async speakAsCustomer(text) {
        return new Promise(async (resolve) => {
            try {
                State.isSpeaking = true;
                const response = await fetch('/api/chat/tts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, voice: 'echo', speed: 1.0 })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.audio) {
                        const audio = new Audio('data:audio/mp3;base64,' + data.audio);
                        audio.onended = () => { State.isSpeaking = false; resolve(); };
                        audio.onerror = () => { State.isSpeaking = false; resolve(); };
                        await audio.play();
                        return;
                    }
                }
                await this.browserTTS(text, 'customer');
                State.isSpeaking = false;
                resolve();
            } catch (error) {
                console.error('Customer TTS error:', error);
                State.isSpeaking = false;
                resolve();
            }
        });
    },

    async browserTTS(text, role = 'ai') {
        return new Promise(async (resolve) => {
            const synthesis = window.speechSynthesis;
            if (!synthesis) return resolve();
            
            synthesis.cancel();
            const voices = await this.getVoices();
            const utterance = new SpeechSynthesisUtterance(text);
            
            const voiceSearch = role === 'customer' 
                ? ['Daniel', 'Alex', 'male'] 
                : ['Karen', 'Samantha', 'female'];
            
            const voice = voices.find(v => voiceSearch.some(s => v.name.toLowerCase().includes(s.toLowerCase())))
                || voices.find(v => v.lang.startsWith('en'));
            
            if (voice) utterance.voice = voice;
            utterance.lang = 'en-AU';
            utterance.pitch = role === 'customer' ? 0.9 : 1.1;
            utterance.rate = role === 'customer' ? 1.0 : 1.05;
            
            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();
            synthesis.speak(utterance);
        });
    },

    getVoices() {
        return new Promise(resolve => {
            let voices = speechSynthesis.getVoices();
            if (voices.length) return resolve(voices);
            speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
        });
    }
};

// ============================================
// API MANAGER - Centralized API calls with error handling
// ============================================
const API = {
    async sendMessage(message = null) {
        UI.showTyping();
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    sessionId,
                    industry: State.currentIndustry
                })
            });
            
            const data = await response.json();
            UI.hideTyping();
            
            if (data.error) {
                const errorMsg = 'Sorry, having technical difficulties. Try again?';
                UI.addMessage(errorMsg, true, false);
                return null;
            }
            
            UI.addMessage(data.response, true, false);
            if (State.currentStep === 0) UI.updateProcessStep(1);
            
            if (data.audio) {
                await AudioManager.playAIAudio(data.audio);
            }
            
            if (data.isConfirmed) {
                UI.handleOrderConfirmed();
            }
            
            return data;
        } catch (error) {
            UI.hideTyping();
            console.error('API Error:', error);
            return null;
        }
    },

    async resetConversation() {
        try {
            await fetch('/api/chat/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });
        } catch (e) { console.error('Reset error:', e); }
    }
};

// ============================================
// UI MANAGER - All UI updates centralized
// ============================================
const UI = {
    showTyping() {
        DOM.typingIndicator?.classList.add('visible');
        DOM.conversation?.scrollTo(0, DOM.conversation.scrollHeight);
    },

    hideTyping() {
        DOM.typingIndicator?.classList.remove('visible');
    },

    addMessage(text, isAI = true, speakIt = true) {
        const ind = getIndustry();
        const indLang = getIndustryLang();
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isAI ? 'ai' : 'user'}`;
        
        const avatar = isAI ? ind.icon : ind.customerIcon;
        const customerLabel = 'Customer';
        const speaker = isAI ? `${indLang.aiName} - ${indLang.name}` : customerLabel;
        
        msgDiv.innerHTML = `
            <div class="msg-avatar">${avatar}</div>
            <div>
                <div class="msg-bubble">${text}</div>
                <div class="msg-speaker"><i class="fas fa-volume-up"></i> ${speaker}</div>
            </div>
        `;
        
        DOM.conversation?.appendChild(msgDiv);
        DOM.conversation?.scrollTo(0, DOM.conversation.scrollHeight);
        
        State.messageCount++;
        if (DOM.messageCountEl) DOM.messageCountEl.textContent = State.messageCount;
        
        const totalMatch = text.match(/[\$€](\d+)/);
        if (totalMatch && isAI) {
            State.orderTotal = parseInt(totalMatch[1]);
            if (DOM.orderTotalEl) DOM.orderTotalEl.textContent = getCurrency() + State.orderTotal;
        }
        
        return msgDiv;
    },

    updateProcessStep(step) {
        State.currentStep = step;
        
        DOM.processSteps?.forEach((ps, i) => {
            ps.classList.remove('active', 'completed');
            if (i < step) ps.classList.add('completed');
            else if (i === step) ps.classList.add('active');
        });
        
        DOM.processLines?.forEach((line, i) => {
            line.classList.toggle('active', i < step);
        });
        
        // Use industry-specific step infos if available
        const ind = getIndustry();
        const infos = ind.stepInfos || t('stepInfos');
        if (DOM.stepInfoEl) DOM.stepInfoEl.textContent = infos[step] || infos[0];
    },

    updateCardTitles() {
        const ind = getIndustry();
        const indLang = getIndustryLang();
        
        const ticketTitle = document.getElementById('ticketCardTitle');
        const ticketIcon = document.getElementById('ticketCardIcon');
        const smsCardTitle = document.getElementById('smsCardTitle');
        
        if (ticketTitle) ticketTitle.textContent = indLang.cardTitle;
        if (ticketIcon) ticketIcon.className = `fas ${ind.cardIcon}`;
        if (smsCardTitle) smsCardTitle.textContent = t('customerSMS');
        
        // Update process steps labels
        this.updateProcessStepLabels();
        
        // Update CSS variables for industry color
        this.updateIndustryColor();
        
        // Update quick actions for this industry
        this.updateQuickActions();
        
        // Update menu/services section
        this.updateMenuSection();
    },

    updateQuickActions() {
        const ind = getIndustry();
        const quickActionsContainer = document.querySelector('.quick-actions');
        
        if (!quickActionsContainer || !ind.quickActions) return;
        
        quickActionsContainer.innerHTML = ind.quickActions.map(action => 
            `<button class="quick-btn" data-text="${action.text}">${action.emoji} ${action.label}</button>`
        ).join('');
        
        // Re-attach event listeners
        quickActionsContainer.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.text;
                if (text) Demo.handleUserMessage(text);
            });
        });
    },

    updateMenuSection() {
        const ind = getIndustry();
        const indLang = getIndustryLang();
        const menuGrid = document.querySelector('.menu-grid');
        const menuTitle = document.querySelector('.menu-section h2');
        
        if (!menuGrid || !ind.menuItems) return;
        
        // Update menu title based on industry type
        const isFood = ['restaurant', 'pizza', 'bakery', 'coffeeshop', 'icecream', 'sushi', 'fastfood'].includes(State.currentIndustry);
        const menuLabel = isFood ? 'Menu' : 'Services';
        const menuIcon = isFood ? 'fa-utensils' : 'fa-concierge-bell';
        if (menuTitle) menuTitle.innerHTML = `<i class="fas ${menuIcon}"></i> ${menuLabel}`;
        
        // Update menu toggle button text
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.innerHTML = `<i class="fas ${menuIcon}"></i> <span>${menuLabel}</span>`;
        }
        
        // Generate menu items
        menuGrid.innerHTML = ind.menuItems.map(item => `
            <div class="menu-item">
                <span class="item-emoji">${item.emoji}</span>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                <span class="item-price">${item.price > 0 ? '$' + item.price.toLocaleString() : 'Free'}</span>
            </div>
        `).join('');
    },

    updateProcessStepLabels() {
        const indLang = getIndustryLang();
        const steps = indLang.steps || ['Call', 'Order', 'Confirm', 'Done'];
        
        DOM.processSteps?.forEach((stepEl, i) => {
            const label = stepEl.querySelector('span');
            if (label && steps[i]) {
                label.textContent = steps[i];
            }
        });
    },

    updateIndustryColor() {
        const ind = getIndustry();
        const color = ind.color || '#6366f1';
        
        // Convert hex to RGB for glow effect
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const glow = `rgba(${r}, ${g}, ${b}, 0.35)`;
        
        document.documentElement.style.setProperty('--industry-color', color);
        document.documentElement.style.setProperty('--industry-glow', glow);
    },

    handleOrderConfirmed() {
        const ind = getIndustry();
        const indLang = getIndustryLang();
        this.updateProcessStep(3);
        
        DOM.smsCard?.classList.add('active');
        DOM.ticketCard?.classList.add('active');
        if (DOM.smsStatus) { DOM.smsStatus.textContent = t('sent'); DOM.smsStatus.classList.add('sent'); }
        if (DOM.ticketStatus) { DOM.ticketStatus.textContent = t('done'); DOM.ticketStatus.classList.add('sent'); }
        
        // Generate SMS
        const orderNum = Math.floor(Math.random() * 900) + 100;
        const currency = getCurrency();
        
        if (DOM.smsPreview) {
            DOM.smsPreview.innerHTML = Templates.getSMS(State.currentIndustry, indLang.name, State.orderTotal, currency);
        }
        
        if (DOM.ticketPreview) {
            DOM.ticketPreview.innerHTML = Templates.getTicket(State.currentIndustry, orderNum, State.orderTotal, currency);
        }
        
        setTimeout(() => {
            if (DOM.callStatus) DOM.callStatus.textContent = t('callEnded');
            Timer.stop();
        }, 2000);
        
        State.isAutoDemoMode = false;
        State.sessionStats.completedCalls++;
    },

    resetUI() {
        if (DOM.conversation) DOM.conversation.innerHTML = '';
        State.messageCount = 0;
        State.orderTotal = 0;
        if (DOM.messageCountEl) DOM.messageCountEl.textContent = '0';
        if (DOM.orderTotalEl) DOM.orderTotalEl.textContent = getCurrency() + '0';
        this.updateProcessStep(0);
        
        DOM.smsCard?.classList.remove('active');
        DOM.ticketCard?.classList.remove('active');
        if (DOM.smsStatus) { DOM.smsStatus.textContent = t('pending'); DOM.smsStatus.classList.remove('sent'); }
        if (DOM.ticketStatus) { DOM.ticketStatus.textContent = t('pending'); DOM.ticketStatus.classList.remove('sent'); }
        if (DOM.smsPreview) DOM.smsPreview.innerHTML = `<div class="sms-placeholder"><i class="fas fa-message"></i><span>${t('smsPlaceholder')}</span></div>`;
        if (DOM.ticketPreview) DOM.ticketPreview.innerHTML = `<div class="ticket-placeholder"><i class="fas fa-print"></i><span>${t('ticketPlaceholder')}</span></div>`;
    },

    updateCardTitles() {
        this.updateCardTitles && this.updateCardTitles();
    }
};

// ============================================
// TEMPLATES - SMS and Tickets
// ============================================
const Templates = {
    getSMS(industry, businessName, total, currency) {
        const templates = {
            // FOOD
            restaurant: `<div class="sms-content">G'day! 🎉<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Thanks mate! See you soon! 🙏</div>`,
            pizza: `<div class="sms-content">Bellissimo! 🍕<br><br>Your pizza order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Your delicious pizza is on its way! 🛵</div>`,
            bakery: `<div class="sms-content">Fresh from the oven! 🥐<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>See you soon!</div>`,
            coffeeshop: `<div class="sms-content">☕ Coffee's brewing!<br><br>Your order from <strong>${businessName}</strong> is ready soon!<br><br><strong>Total:</strong> ${currency}${total}<br><br>See you in a few!</div>`,
            sushi: `<div class="sms-content">🍣 Arigatou!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Enjoy your meal!</div>`,
            fastfood: `<div class="sms-content">🍔 Order up!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Ready soon!</div>`,
            icecream: `<div class="sms-content">🍦 Sweet!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Deliciousness awaits!</div>`,
            // HEALTH/BEAUTY
            salon: `<div class="sms-content">Hey gorgeous! 💇‍♀️<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to make you look fabulous! ✨</div>`,
            medical: `<div class="sms-content">Hello,<br><br>Your appointment at <strong>${businessName}</strong> is confirmed.<br><br>Please arrive 10 minutes early. 🏥</div>`,
            dental: `<div class="sms-content">Hello! 🦷<br><br>Your dental appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you soon for a brighter smile!</div>`,
            vet: `<div class="sms-content">Hello! 🐾<br><br>Your pet's appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you and your furry friend soon! 🐕</div>`,
            spa: `<div class="sms-content">Namaste 🧘<br><br>Your relaxation awaits at <strong>${businessName}</strong>!<br><br>Pure bliss awaits... ✨</div>`,
            pharmacy: `<div class="sms-content">Hello! 💊<br><br>Your prescription at <strong>${businessName}</strong> is ready!<br><br>See you soon!</div>`,
            optician: `<div class="sms-content">👁️ See you soon!<br><br>Your eye exam at <strong>${businessName}</strong> is confirmed!<br><br>Looking forward to it!</div>`,
            podiatrist: `<div class="sms-content">🦶 Appointment confirmed!<br><br>Your visit to <strong>${businessName}</strong> is booked!<br><br>We'll have you walking happy!</div>`,
            massage: `<div class="sms-content">💆 Relax & unwind!<br><br>Your massage at <strong>${businessName}</strong> is confirmed!<br><br>Bliss awaits...</div>`,
            nailsalon: `<div class="sms-content">💅 Gorgeous nails incoming!<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you soon!</div>`,
            // SERVICES
            garage: `<div class="sms-content">G'day mate! 🔧<br><br>Your service at <strong>${businessName}</strong> is confirmed!<br><br>She'll be right! 🚗</div>`,
            cleaning: `<div class="sms-content">✨ Sparkle incoming!<br><br>Your cleaning service from <strong>${businessName}</strong> is confirmed!<br><br>Your place will shine!</div>`,
            electrician: `<div class="sms-content">⚡ Sparky's coming!<br><br>Your job with <strong>${businessName}</strong> is confirmed!<br><br>We'll get you powered up!</div>`,
            plumber: `<div class="sms-content">🔧 Help is coming!<br><br>Your job with <strong>${businessName}</strong> is confirmed!<br><br>We'll fix it right!</div>`,
            landscaping: `<div class="sms-content">🌳 Garden time!<br><br>Your service with <strong>${businessName}</strong> is confirmed!<br><br>Your yard will look amazing!</div>`,
            moving: `<div class="sms-content">🚚 Moving day booked!<br><br>Your move with <strong>${businessName}</strong> is confirmed!<br><br>Stress-free relocation ahead!</div>`,
            locksmith: `<div class="sms-content">🔐 Help is on the way!<br><br><strong>${businessName}</strong> has dispatched a locksmith!<br><br>ETA: 15-30 minutes</div>`,
            // PROFESSIONAL
            hotel: `<div class="sms-content">Welcome! 🏨<br><br>Your reservation at <strong>${businessName}</strong> is confirmed!<br><br>Safe travels! ✨</div>`,
            gym: `<div class="sms-content">Let's go! 💪<br><br>You're all set at <strong>${businessName}</strong>!<br><br>See you at the gym! 🏋️</div>`,
            lawyer: `<div class="sms-content">Good day,<br><br>Your consultation at <strong>${businessName}</strong> is confirmed.<br><br>Kind regards ⚖️</div>`,
            realestate: `<div class="sms-content">Exciting news! 🏠<br><br>Your property viewing with <strong>${businessName}</strong> is confirmed!<br><br>See you there! 🔑</div>`,
            // LIFESTYLE
            florist: `<div class="sms-content">🌹 Beautiful blooms!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br>Blooming lovely!</div>`,
            photography: `<div class="sms-content">📸 Say cheese!<br><br>Your session at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to capture the magic!</div>`,
            tattoo: `<div class="sms-content">🎨 Let's create art!<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Get ready for something amazing!</div>`,
            petgrooming: `<div class="sms-content">🐩 Pamper time!<br><br>Your pet's grooming at <strong>${businessName}</strong> is confirmed!<br><br>They'll look fabulous!</div>`,
            petboarding: `<div class="sms-content">🐾 Holiday booked!<br><br>Your pet's stay at <strong>${businessName}</strong> is confirmed!<br><br>They'll have a blast!</div>`,
            daycare: `<div class="sms-content">👶 Enrollment confirmed!<br><br>Your child's spot at <strong>${businessName}</strong> is reserved!<br><br>Welcome to the family!</div>`,
            wedding: `<div class="sms-content">💍 Congratulations!<br><br>Your consultation with <strong>${businessName}</strong> is confirmed!<br><br>Let's plan your dream day! 💒</div>`,
            eventvenue: `<div class="sms-content">🎭 Event booked!<br><br>Your viewing at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to show you around!</div>`,
            // OTHER
            drivingschool: `<div class="sms-content">🚗 Lesson booked!<br><br>Your driving lesson with <strong>${businessName}</strong> is confirmed!<br><br>You'll be cruising soon!</div>`,
            tutoring: `<div class="sms-content">📚 Learning awaits!<br><br>Your tutoring session with <strong>${businessName}</strong> is confirmed!<br><br>Success is ahead!</div>`
        };
        return templates[industry] || templates.restaurant;
    },

    getTicket(industry, orderNum, total, currency) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
        
        const icons = {
            // Food
            restaurant: '🍽️', pizza: '🍕', bakery: '🥐', coffeeshop: '☕', sushi: '🍣', fastfood: '🍔', icecream: '🍦',
            // Health
            salon: '💇', medical: '🏥', dental: '🦷', vet: '🐾', spa: '🧘', pharmacy: '💊', optician: '👁️', podiatrist: '🦶', massage: '💆', nailsalon: '💅',
            // Services
            garage: '🔧', cleaning: '✨', electrician: '⚡', plumber: '🔧', landscaping: '🌳', moving: '🚚', locksmith: '🔐',
            // Professional
            hotel: '🏨', gym: '🏋️', lawyer: '⚖️', realestate: '🏠',
            // Lifestyle
            florist: '💐', photography: '📷', tattoo: '🎨', petgrooming: '🐩', petboarding: '🐈', daycare: '👶', wedding: '💒', eventvenue: '🎭',
            // Other
            drivingschool: '🚗', tutoring: '📚'
        };
        const icon = icons[industry] || '📋';
        
        // Customize ticket label based on industry type
        const isBooking = ['salon', 'medical', 'dental', 'vet', 'spa', 'massage', 'nailsalon', 'optician', 'podiatrist', 'hotel', 'gym', 'lawyer', 'photography', 'tattoo', 'petgrooming', 'wedding', 'eventvenue', 'drivingschool', 'tutoring', 'daycare', 'petboarding'].includes(industry);
        const isService = ['cleaning', 'electrician', 'plumber', 'landscaping', 'moving', 'locksmith', 'garage', 'realestate'].includes(industry);
        
        let ticketType = 'ORDER';
        if (isBooking) ticketType = 'BOOKING';
        if (isService) ticketType = 'JOB';
        if (industry === 'locksmith') ticketType = 'DISPATCH';
        
        return `<div class="ticket-content">
            <h4>${icon} ${ticketType} #${orderNum}</h4>
            <p style="text-align:center;color:#666;font-size:0.75rem;">${time}</p>
            <div class="ticket-item"><span>${isBooking ? 'Appointment:' : 'Items:'}</span><span>✓</span></div>
            ${total > 0 ? `<div class="ticket-item"><span>Total:</span><span>${currency}${total}</span></div>` : ''}
            <p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p>
        </div>`;
    }
};

// ============================================
// TIMER
// ============================================
const Timer = {
    start() {
        State.callStartTime = Date.now();
        if (DOM.callStatus) DOM.callStatus.textContent = t('onCall');
        
        State.callTimerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - State.callStartTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
            if (DOM.callTimer) DOM.callTimer.textContent = timeStr;
            if (DOM.callDurationEl) DOM.callDurationEl.textContent = timeStr;
        }, 1000);
    },

    stop() {
        if (State.callTimerInterval) {
            clearInterval(State.callTimerInterval);
            State.callTimerInterval = null;
        }
    }
};

// ============================================
// SPEECH RECOGNITION
// ============================================
const SpeechManager = {
    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            State.recognition = new SR();
            State.recognition.continuous = false;
            State.recognition.interimResults = true;
            State.recognition.lang = 'en-AU';

            State.recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                if (DOM.userInput) DOM.userInput.value = transcript;
                
                if (event.results[event.results.length - 1].isFinal) {
                    Demo.handleUserMessage(transcript.trim());
                    if (DOM.userInput) DOM.userInput.value = '';
                }
            };

            State.recognition.onend = () => {
                State.isListening = false;
                DOM.voiceBtn?.classList.remove('listening');
            };

            State.recognition.onerror = () => {
                State.isListening = false;
                DOM.voiceBtn?.classList.remove('listening');
            };
        }
    },

    toggle() {
        if (State.isListening) {
            State.recognition?.stop();
            State.isListening = false;
            DOM.voiceBtn?.classList.remove('listening');
        } else if (State.recognition && !State.isSpeaking) {
            State.recognition.start();
            State.isListening = true;
            DOM.voiceBtn?.classList.add('listening');
        }
    }
};

// ============================================
// DEMO CONTROLLER
// ============================================
const Demo = {
    async handleUserMessage(text) {
        if (!text.trim()) return;
        
        UI.addMessage(text, false, false);
        
        if (State.isAutoDemoMode) {
            await AudioManager.speakAsCustomer(text);
        }
        
        if (State.currentStep < 2) UI.updateProcessStep(2);
        await API.sendMessage(text);
    },

    async runAutoDemo() {
        State.isAutoDemoMode = true;
        State.sessionStats.totalCalls++;
        
        await API.resetConversation();
        UI.resetUI();
        Timer.start();
        
        await API.sendMessage(null);
        
        const ind = getIndustry();
        const indLang = getIndustryLang();
        
        for (let i = 0; i < ind.demoScript.length && State.isAutoDemoMode; i++) {
            await new Promise(r => setTimeout(r, ind.demoScript[i].delay));
            
            while (State.isSpeaking) {
                await new Promise(r => setTimeout(r, 100));
            }
            
            if (!State.isAutoDemoMode) break;
            
            const responseType = ind.demoScript[i].type;
            const response = indLang.responses[responseType] || "Yes";
            await this.handleUserMessage(response);
            
            if (!State.isAutoDemoMode) break;
            await new Promise(r => setTimeout(r, 500));
        }
    },

    async startInteractive() {
        State.isAutoDemoMode = false;
        State.sessionStats.totalCalls++;
        
        await API.resetConversation();
        UI.resetUI();
        Timer.start();
        
        await API.sendMessage(null);
        document.querySelector('.demo-section')?.scrollIntoView({ behavior: 'smooth' });
    }
};

// ============================================
// ROI CALCULATOR
// ============================================
const ROI = {
    calculate() {
        const missed = parseInt(document.getElementById('missedCalls')?.value) || 0;
        const avgOrder = parseInt(document.getElementById('avgOrder')?.value) || 0;
        const hourly = parseInt(document.getElementById('hourlyRate')?.value) || 0;
        
        const revenue = missed * avgOrder * 30;
        const labour = hourly * 4 * 30;
        const total = revenue + labour;
        
        const revenueEl = document.getElementById('revenueRecovered');
        const labourEl = document.getElementById('labourSaved');
        const totalEl = document.getElementById('totalSavings');
        const resultsEl = document.getElementById('roiResults');
        
        if (revenueEl) revenueEl.textContent = '$' + revenue.toLocaleString();
        if (labourEl) labourEl.textContent = '$' + labour.toLocaleString();
        if (totalEl) totalEl.textContent = '$' + total.toLocaleString();
        resultsEl?.classList.remove('hidden');
    }
};

// ============================================
// EXPORT
// ============================================
const Export = {
    conversation() {
        const messages = DOM.conversation?.querySelectorAll('.message');
        if (!messages?.length) {
            alert(t('noConversation'));
            return;
        }
        
        const indLang = getIndustryLang();
        let transcript = `AI RECEPTIONIST CONVERSATION TRANSCRIPT\n`;
        transcript += `========================================\n`;
        transcript += `Industry: ${indLang.name}\n`;
        transcript += `AI: ${indLang.aiName}\n`;
        transcript += `Date: ${new Date().toLocaleString()}\n`;
        transcript += `========================================\n\n`;
        
        messages.forEach(msg => {
            const isAI = msg.classList.contains('ai');
            const text = msg.querySelector('.msg-bubble')?.textContent || '';
            const speaker = isAI ? indLang.aiName : 'Customer';
            transcript += `${speaker}: ${text}\n\n`;
        });
        
        transcript += `========================================\n`;
        transcript += `Total Messages: ${State.messageCount}\n`;
        transcript += `Order Total: ${getCurrency()}${State.orderTotal}\n`;
        
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `conversation-${State.currentIndustry}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

// ============================================
// PAGE NAVIGATION
// ============================================
const Navigation = {
    goToDemo(industry) {
        State.currentIndustry = industry;
        
        // Update current industry badge
        const indLang = getIndustryLang();
        const ind = getIndustry();
        document.getElementById('currentIndustryIcon').textContent = ind.icon;
        document.getElementById('currentIndustryName').textContent = indLang.name;
        
        // Fade out landing, fade in demo
        const landing = document.getElementById('landingPage');
        const demo = document.getElementById('demoPage');
        
        landing.classList.add('fade-out');
        
        setTimeout(() => {
            landing.classList.remove('active');
            landing.classList.remove('fade-out');
            demo.classList.add('active');
            
            // Initialize demo page
            UI.updateCardTitles();
            UI.updateProcessStep(0);
            UI.resetUI();
            API.resetConversation();
            
            State.sessionStats.totalCalls++;
            State.sessionStats.industries[industry] = (State.sessionStats.industries[industry] || 0) + 1;
        }, 300);
    },
    
    goToLanding() {
        const landing = document.getElementById('landingPage');
        const demo = document.getElementById('demoPage');
        
        // Stop any ongoing demo
        Timer.stop();
        State.isAutoDemoMode = false;
        AudioManager.stopCurrent();
        
        demo.classList.add('fade-out');
        
        setTimeout(() => {
            demo.classList.remove('active');
            demo.classList.remove('fade-out');
            landing.classList.add('active');
        }, 300);
    }
};

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Preload voices
    if (window.speechSynthesis) speechSynthesis.getVoices();
    
    // Init speech recognition
    SpeechManager.init();
    
    // ========== LANDING PAGE ==========
    // Sales Pitch Button
    const pitchBtn = document.getElementById('playPitchBtn');
    let pitchAudio = null;
    let isPitchPlaying = false;
    
    const salesPitchText = `Hey there! Welcome to AI Receptionist, the future of business communication!

Imagine never missing a customer call again. Our AI receptionist answers every single call instantly, 24 hours a day, 7 days a week, even on Christmas!

Here's what makes us incredible: We save businesses up to 80% on reception costs. No salaries, no sick days, no training required.

Your customers get zero wait time. The moment they call, they're greeted by a friendly, professional voice that sounds completely natural.

And the best part? Our AI never makes mistakes. Perfect order accuracy, every single time. No mishearing, no forgotten details.

During peak hours, we can handle hundreds of calls simultaneously. Your busiest days become your most profitable days.

From restaurants to medical clinics, from hair salons to law firms - we're customized for YOUR specific business.

Ready to see it in action? Pick your industry below and watch the magic happen!`;

    pitchBtn?.addEventListener('click', async () => {
        if (isPitchPlaying) {
            // Stop playing
            if (pitchAudio) {
                pitchAudio.pause();
                pitchAudio.currentTime = 0;
            }
            speechSynthesis.cancel();
            pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
            pitchBtn.classList.remove('playing');
            isPitchPlaying = false;
            return;
        }
        
        // Start playing
        pitchBtn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Presentation</span>';
        pitchBtn.classList.add('playing');
        isPitchPlaying = true;
        
        try {
            // Try OpenAI TTS first
            const response = await fetch('/api/chat/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: salesPitchText,
                    voice: 'onyx', // Deep, professional male voice
                    speed: 1.0
                })
            });
            
            const data = await response.json();
            
            if (data.audio) {
                pitchAudio = new Audio('data:audio/mp3;base64,' + data.audio);
                pitchAudio.onended = () => {
                    pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
                    pitchBtn.classList.remove('playing');
                    isPitchPlaying = false;
                };
                await pitchAudio.play();
            } else {
                throw new Error('No audio data');
            }
        } catch (error) {
            console.log('TTS API not available, using browser speech');
            // Fallback to browser speech synthesis
            const utterance = new SpeechSynthesisUtterance(salesPitchText);
            utterance.rate = 0.95;
            utterance.pitch = 0.9;
            utterance.lang = 'en-AU';
            
            const voices = speechSynthesis.getVoices();
            const maleVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.toLowerCase().includes('male'));
            if (maleVoice) utterance.voice = maleVoice;
            
            utterance.onend = () => {
                pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
                pitchBtn.classList.remove('playing');
                isPitchPlaying = false;
            };
            
            speechSynthesis.speak(utterance);
        }
    });
    
    // Industry cards on landing page
    document.querySelectorAll('.industry-card').forEach(card => {
        card.addEventListener('click', () => {
            const industry = card.dataset.industry;
            // Stop pitch if playing
            if (isPitchPlaying) {
                if (pitchAudio) {
                    pitchAudio.pause();
                    pitchAudio.currentTime = 0;
                }
                speechSynthesis.cancel();
                pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
                pitchBtn.classList.remove('playing');
                isPitchPlaying = false;
            }
            Navigation.goToDemo(industry);
        });
    });
    
    // ========== DEMO PAGE ==========
    // Back to landing
    document.getElementById('backToLanding')?.addEventListener('click', () => {
        Navigation.goToLanding();
    });
    
    // Change industry button
    document.getElementById('changeIndustryBtn')?.addEventListener('click', () => {
        Navigation.goToLanding();
    });
    
    // Industry selector (old - keep for compatibility)
    DOM.industryBtns?.forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.industryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            State.currentIndustry = btn.dataset.industry;
            API.resetConversation();
            UI.resetUI();
            UI.updateCardTitles();
            State.sessionStats.industries[State.currentIndustry] = (State.sessionStats.industries[State.currentIndustry] || 0) + 1;
        });
    });
    
    // Demo buttons
    document.getElementById('startInteractive')?.addEventListener('click', () => Demo.startInteractive());
    document.getElementById('startAutoDemo')?.addEventListener('click', () => Demo.runAutoDemo());
    
    // Send message
    DOM.sendBtn?.addEventListener('click', () => {
        const text = DOM.userInput?.value?.trim();
        if (text) {
            Demo.handleUserMessage(text);
            DOM.userInput.value = '';
        }
    });
    
    // Enter key
    DOM.userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = DOM.userInput.value.trim();
            if (text) {
                Demo.handleUserMessage(text);
                DOM.userInput.value = '';
            }
        }
    });
    
    // Voice
    DOM.voiceBtn?.addEventListener('click', () => SpeechManager.toggle());
    
    // Quick actions
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.text;
            if (text) Demo.handleUserMessage(text);
        });
    });
    
    // Menu toggle
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('menuSection')?.classList.toggle('hidden');
    });
    
    // ROI Modal
    document.getElementById('roiBtn')?.addEventListener('click', () => {
        document.getElementById('roiModal')?.classList.add('visible');
    });
    document.getElementById('closeModal')?.addEventListener('click', () => {
        document.getElementById('roiModal')?.classList.remove('visible');
    });
    document.getElementById('roiModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'roiModal') e.target.classList.remove('visible');
    });
    document.getElementById('calculateROI')?.addEventListener('click', () => ROI.calculate());
    
    // Theme Toggle (both pages)
    const toggleTheme = () => {
        State.isDarkMode = !State.isDarkMode;
        document.body.classList.toggle('dark-mode', State.isDarkMode);
        document.body.classList.toggle('light-mode', !State.isDarkMode);
        document.querySelectorAll('#themeToggle i, #themeToggle2 i').forEach(icon => {
            icon.className = State.isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
        });
    };
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggle2')?.addEventListener('click', toggleTheme);
    
    // Fullscreen
    document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
    
    // Stats Modal
    document.getElementById('statsBtn')?.addEventListener('click', () => {
        document.getElementById('statsModal')?.classList.add('visible');
    });
    document.getElementById('closeStatsModal')?.addEventListener('click', () => {
        document.getElementById('statsModal')?.classList.remove('visible');
    });
    document.getElementById('statsModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'statsModal') e.target.classList.remove('visible');
    });
    
    // Scenario buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            State.currentScenario = btn.dataset.scenario;
        });
    });
    
    // Export
    document.getElementById('exportBtn')?.addEventListener('click', () => Export.conversation());
    
    // ========== LANDING PAGE SECTIONS ==========
    
    // ROI Calculator on Landing Page (with sliders)
    const callsPerDaySlider = document.getElementById('callsPerDay');
    const hourlyRateSlider = document.getElementById('hourlyRate');
    const hoursPerDaySlider = document.getElementById('hoursPerDay');
    const callsValue = document.getElementById('callsValue');
    const rateValue = document.getElementById('rateValue');
    const hoursValue = document.getElementById('hoursValue');
    const currentCostEl = document.getElementById('currentCost');
    const aiCostEl = document.getElementById('aiCost');
    const savingsEl = document.getElementById('savings');
    const roiPercentEl = document.getElementById('roiPercent');
    
    const calculateLandingROI = () => {
        const calls = parseInt(callsPerDaySlider?.value) || 50;
        const rate = parseInt(hourlyRateSlider?.value) || 22;
        const hours = parseInt(hoursPerDaySlider?.value) || 8;
        
        // Update display values
        if (callsValue) callsValue.textContent = calls;
        if (rateValue) rateValue.textContent = rate;
        if (hoursValue) hoursValue.textContent = hours;
        
        const workingDays = 260; // Working days per year
        const dailyHumanCost = rate * hours;
        const annualHumanCost = dailyHumanCost * workingDays;
        const annualAICost = Math.round(69.90 * 52); // $69.90/week = ~$3,635/year
        const annualSavings = annualHumanCost - annualAICost;
        const roiPercent = Math.round((annualSavings / annualAICost) * 100);
        
        if (currentCostEl) currentCostEl.textContent = `$${annualHumanCost.toLocaleString()}`;
        if (aiCostEl) aiCostEl.textContent = `$${annualAICost.toLocaleString()}`;
        if (savingsEl) savingsEl.textContent = `$${annualSavings.toLocaleString()}`;
        if (roiPercentEl) roiPercentEl.textContent = `${roiPercent}%`;
    };
    
    // Add event listeners to sliders
    callsPerDaySlider?.addEventListener('input', calculateLandingROI);
    hourlyRateSlider?.addEventListener('input', calculateLandingROI);
    hoursPerDaySlider?.addEventListener('input', calculateLandingROI);
    
    // Initial calculation
    if (callsPerDaySlider) calculateLandingROI();
    
    // CTA Buttons
    document.getElementById('ctaDemo')?.addEventListener('click', () => {
        document.querySelector('.industry-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    document.getElementById('ctaContact')?.addEventListener('click', () => {
        // Open contact or calendar
        window.open('mailto:contact@aireceptionist.com?subject=Free Consultation Request', '_blank');
    });
    
    // Pricing CTA Button
    document.getElementById('pricingCta')?.addEventListener('click', () => {
        // Scroll to demo section or open contact
        document.querySelector('.industry-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    // ========== CATEGORY FILTERS ==========
    const categoryBtns = document.querySelectorAll('.category-btn');
    const industryCards = document.querySelectorAll('.industry-card[data-category]');
    const industrySearch = document.getElementById('industrySearch');
    const searchCount = document.getElementById('searchCount');
    const industryGrid = document.querySelector('.industry-grid');
    
    // Current filter state
    let currentCategory = 'all';
    let currentSearch = '';
    
    // Filter function
    const filterIndustries = () => {
        let visibleCount = 0;
        
        industryCards.forEach(card => {
            const matchesCategory = currentCategory === 'all' || card.dataset.category === currentCategory;
            const cardName = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const cardDesc = card.querySelector('p')?.textContent.toLowerCase() || '';
            const matchesSearch = !currentSearch || 
                cardName.includes(currentSearch) || 
                cardDesc.includes(currentSearch) ||
                card.dataset.industry.includes(currentSearch);
            
            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Update count
        if (searchCount) {
            searchCount.textContent = `${visibleCount} industr${visibleCount === 1 ? 'y' : 'ies'}`;
        }
        
        // Show/hide no results message
        let noResults = industryGrid?.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = '<i class="fas fa-search"></i><p>No industries found. Try a different search.</p>';
                industryGrid?.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    };
    
    // Category filter click
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterIndustries();
        });
    });
    
    // Search input with debounce
    let searchTimeout;
    industrySearch?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = e.target.value.toLowerCase().trim();
            // Reset category to "All" when searching
            if (currentSearch) {
                categoryBtns.forEach(b => b.classList.remove('active'));
                categoryBtns[0]?.classList.add('active');
                currentCategory = 'all';
            }
            filterIndustries();
        }, 150); // Debounce 150ms
    });
    
    // Clear search on Escape
    industrySearch?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            industrySearch.value = '';
            currentSearch = '';
            filterIndustries();
        }
    });
});

