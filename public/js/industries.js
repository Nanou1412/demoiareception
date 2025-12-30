// ============================================
// AUTO-GENERATED - DO NOT EDIT DIRECTLY
// Generated from /industries/*.js files
// Run: node scripts/build-industries.js
// ============================================

const Industries = {
    bakery: {
        icon: "🥐",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#f59e0b",
        cardIcon: "fa-bread-slice",
        quickActions: [
            {
                emoji: "🥖",
                label: "Order",
                text: "I'd like to order some bread"
            },
            {
                emoji: "🎂",
                label: "Cake",
                text: "I need a birthday cake"
            },
            {
                emoji: "⏰",
                label: "Pickup",
                text: "When can I pick up?"
            }
        ],
        menuItems: [
            {
                emoji: "🍞",
                name: "Sourdough Loaf",
                desc: "Fresh baked daily",
                price: 8
            },
            {
                emoji: "🥐",
                name: "Croissants (6)",
                desc: "Buttery & flaky",
                price: 15
            },
            {
                emoji: "🎂",
                name: "Birthday Cake",
                desc: "Custom decoration",
                price: 55
            },
            {
                emoji: "🧁",
                name: "Muffins (4)",
                desc: "Various flavors",
                price: 12
            }
        ],
        stepInfos: [
            "📞 Emma answers with bakery-fresh enthusiasm!",
            "🥐 Taking the order for breads, pastries or cakes.",
            "✅ Confirming pickup time and contact details.",
            "🎉 Order ready! Fresh from the oven soon."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "orderItem"
            },
            {
                delay: 2500,
                type: "moreItems"
            },
            {
                delay: 2000,
                type: "noMore"
            },
            {
                delay: 2500,
                type: "pickupTime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Golden Crust Bakery",
            aiName: "Emma",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order Total",
            cardTitle: "Bakery Order",
            responses: {
                greeting: "Hi, I'd like to place an order",
                orderItem: "I'll take a sourdough loaf please",
                moreItems: "And 6 croissants",
                noMore: "That's all",
                pickupTime: "In about an hour",
                name: "Emma",
                phone: "0445 678 901",
                confirm: "Perfect, thanks!"
            }
        }
    },
    cleaning: {
        icon: "🧹",
        customerIcon: "👤",
        voice: "nova",
        color: "#06b6d4",
        cardIcon: "fa-broom",
        quickActions: [
            {
                emoji: "🏠",
                label: "Book",
                text: "I need a house cleaning"
            },
            {
                emoji: "✨",
                label: "Deep",
                text: "I need a deep clean"
            },
            {
                emoji: "🔑",
                label: "Lease",
                text: "End of lease cleaning"
            }
        ],
        menuItems: [
            {
                emoji: "🏠",
                name: "Regular Clean",
                desc: "2-3 bedroom home",
                price: 120
            },
            {
                emoji: "✨",
                name: "Deep Clean",
                desc: "Thorough cleaning",
                price: 250
            },
            {
                emoji: "🔑",
                name: "End of Lease",
                desc: "Bond back guarantee",
                price: 350
            },
            {
                emoji: "🪟",
                name: "Windows",
                desc: "Interior & exterior",
                price: 80
            }
        ],
        stepInfos: [
            "📞 Maria answers ready to help you sparkle!",
            "🧹 Discussing cleaning type and property size.",
            "✅ Confirming date, time and address.",
            "🎉 Booked! Your home will be sparkling soon!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "serviceType"
            },
            {
                delay: 2500,
                type: "propertySize"
            },
            {
                delay: 2500,
                type: "frequency"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "address"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Sparkle Clean Co",
            aiName: "Maria",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Cleaning Booking",
            responses: {
                greeting: "Hi, I need to book a house cleaning",
                serviceType: "A deep clean please",
                propertySize: "3 bedroom house",
                frequency: "Just a one-time clean",
                datetime: "This Saturday morning",
                address: "45 Oak Street, Richmond",
                name: "Emma Watson",
                phone: "0423 456 789",
                confirm: "Yes, that's perfect"
            }
        }
    },
    coffeeshop: {
        icon: "☕",
        customerIcon: "👤",
        voice: "echo",
        color: "#78350f",
        cardIcon: "fa-mug-hot",
        quickActions: [
            {
                emoji: "☕",
                label: "Coffee",
                text: "I'd like to order a coffee"
            },
            {
                emoji: "🥛",
                label: "Milk",
                text: "What milk options do you have?"
            },
            {
                emoji: "🥐",
                label: "Food",
                text: "What food do you have?"
            }
        ],
        menuItems: [
            {
                emoji: "☕",
                name: "Flat White",
                desc: "Smooth espresso & milk",
                price: 5
            },
            {
                emoji: "🧋",
                name: "Chai Latte",
                desc: "Spiced chai with milk",
                price: 5.5
            },
            {
                emoji: "🍌",
                name: "Banana Bread",
                desc: "Fresh baked, toasted",
                price: 6
            },
            {
                emoji: "🌯",
                name: "Breakfast Wrap",
                desc: "Eggs, bacon, cheese",
                price: 12
            }
        ],
        stepInfos: [
            "📞 Joe answers, ready to brew your perfect cup!",
            "☕ Taking the coffee order with milk preferences.",
            "✅ Confirming pickup time and order details.",
            "🎉 Barista's on it! Coffee will be ready soon."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "orderItem"
            },
            {
                delay: 2500,
                type: "moreItems"
            },
            {
                delay: 2000,
                type: "noMore"
            },
            {
                delay: 2500,
                type: "pickupTime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Bean There Café",
            aiName: "Joe",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order Total",
            cardTitle: "Café Order",
            responses: {
                greeting: "Hi, I'd like to place an order for pickup",
                orderItem: "Can I get a large flat white with oat milk",
                moreItems: "And a banana bread please",
                noMore: "That's all",
                pickupTime: "In 10 minutes",
                name: "Chris",
                phone: "0456 789 012",
                confirm: "Yep, sounds good!"
            }
        }
    },
    daycare: {
        icon: "👶",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#fbbf24",
        cardIcon: "fa-baby",
        quickActions: [
            {
                emoji: "👶",
                label: "Enroll",
                text: "I'm looking for childcare"
            },
            {
                emoji: "📅",
                label: "Availability",
                text: "Do you have spots available?"
            },
            {
                emoji: "💰",
                label: "Fees",
                text: "What are your fees?"
            }
        ],
        menuItems: [
            {
                emoji: "☀️",
                name: "Full Day",
                desc: "7am to 6pm",
                price: 120
            },
            {
                emoji: "🌤️",
                name: "Half Day",
                desc: "4 hour session",
                price: 70
            },
            {
                emoji: "🌅",
                name: "Before School",
                desc: "Early care",
                price: 25
            },
            {
                emoji: "🌆",
                name: "After School",
                desc: "Afternoon care",
                price: 35
            }
        ],
        stepInfos: [
            "📞 Miss Jenny answers with warmth and care!",
            "👶 Discussing child's age and care needs.",
            "✅ Checking availability and special requirements.",
            "🎉 Enrolled! Your little star will love it here!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "child"
            },
            {
                delay: 2500,
                type: "days"
            },
            {
                delay: 2500,
                type: "startDate"
            },
            {
                delay: 2500,
                type: "specialNeeds"
            },
            {
                delay: 2000,
                type: "parentName"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Little Stars Daycare",
            aiName: "Jenny",
            steps: [
                "Call",
                "Enroll",
                "Confirm",
                "Done"
            ],
            totalLabel: "Care",
            cardTitle: "Enrollment",
            responses: {
                greeting: "Hi, I'm looking for daycare for my daughter",
                child: "She's 2 and a half years old",
                days: "Monday, Wednesday and Friday",
                startDate: "We'd like to start in February",
                specialNeeds: "She has a nut allergy",
                parentName: "Emma Watson",
                phone: "0467 890 123",
                confirm: "Yes, let's enroll her"
            }
        }
    },
    dental: {
        icon: "🦷",
        customerIcon: "👤",
        voice: "nova",
        color: "#0ea5e9",
        cardIcon: "fa-tooth",
        quickActions: [
            {
                emoji: "🦷",
                label: "Book",
                text: "I need a dental appointment"
            },
            {
                emoji: "😬",
                label: "Emergency",
                text: "I have a toothache, it's urgent"
            },
            {
                emoji: "💰",
                label: "Prices",
                text: "What are your prices?"
            }
        ],
        menuItems: [
            {
                emoji: "✨",
                name: "Check & Clean",
                desc: "Regular dental hygiene",
                price: 180
            },
            {
                emoji: "🦷",
                name: "Filling",
                desc: "Composite or amalgam",
                price: 200
            },
            {
                emoji: "😁",
                name: "Whitening",
                desc: "Professional whitening",
                price: 450
            },
            {
                emoji: "📸",
                name: "X-Ray",
                desc: "Digital dental x-ray",
                price: 95
            }
        ],
        stepInfos: [
            "📞 Grace answers with a reassuring, friendly tone.",
            "🦷 Discussing the dental issue and preferred times.",
            "✅ Confirming patient details and insurance info.",
            "🎉 Appointment booked! Smile bright soon!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "reason"
            },
            {
                delay: 2500,
                type: "dentist"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "insurance"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Smile Bright Dental",
            aiName: "Grace",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Treatment",
            cardTitle: "Dental Appointment",
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
    drivingschool: {
        icon: "🚗",
        customerIcon: "👤",
        voice: "echo",
        color: "#ef4444",
        cardIcon: "fa-car-side",
        quickActions: [
            {
                emoji: "🚗",
                label: "Lesson",
                text: "I want to book driving lessons"
            },
            {
                emoji: "📦",
                label: "Package",
                text: "What lesson packages do you have?"
            },
            {
                emoji: "📝",
                label: "Test",
                text: "I need a pre-test lesson"
            }
        ],
        menuItems: [
            {
                emoji: "🚗",
                name: "Single Lesson",
                desc: "1 hour session",
                price: 70
            },
            {
                emoji: "📦",
                name: "5 Lessons",
                desc: "Save $30",
                price: 320
            },
            {
                emoji: "🎯",
                name: "10 Lessons",
                desc: "Best value",
                price: 600
            },
            {
                emoji: "📝",
                name: "Test Day",
                desc: "Car for test",
                price: 150
            }
        ],
        stepInfos: [
            "📞 Booking team ready to get you on the road!",
            "🚗 Checking experience and learner permit.",
            "✅ Setting up lessons and pickup location.",
            "🎉 Lessons booked! You'll pass in no time!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "experience"
            },
            {
                delay: 2500,
                type: "license"
            },
            {
                delay: 2500,
                type: "package"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2500,
                type: "pickup"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Pass First Driving School",
            aiName: "Mike",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Lesson",
            cardTitle: "Lesson Booking",
            responses: {
                greeting: "Hi, I'd like to book driving lessons",
                experience: "I've had about 20 hours with my parents",
                license: "Yes, I have my learner's permit",
                package: "Maybe the 5 lesson package",
                datetime: "Weekends would work best",
                pickup: "From home, in Brunswick",
                name: "Jake Thompson",
                phone: "0423 456 789",
                confirm: "Yes, let's book it"
            }
        }
    },
    electrician: {
        icon: "⚡",
        customerIcon: "👤",
        voice: "onyx",
        color: "#eab308",
        cardIcon: "fa-bolt",
        quickActions: [
            {
                emoji: "⚡",
                label: "Book",
                text: "I need an electrician"
            },
            {
                emoji: "🚨",
                label: "Emergency",
                text: "I have an electrical emergency"
            },
            {
                emoji: "💡",
                label: "Lights",
                text: "I need lights installed"
            }
        ],
        menuItems: [
            {
                emoji: "🔌",
                name: "Powerpoint",
                desc: "Install or repair",
                price: 150
            },
            {
                emoji: "💡",
                name: "Light Fixture",
                desc: "Install new lights",
                price: 80
            },
            {
                emoji: "⚡",
                name: "Switchboard",
                desc: "Upgrade or repair",
                price: 500
            },
            {
                emoji: "🔍",
                name: "Safety Check",
                desc: "Full inspection",
                price: 200
            }
        ],
        stepInfos: [
            "📞 Dave answers ready to solve your electrical issues.",
            "⚡ Discussing the electrical problem and urgency.",
            "✅ Confirming address and appointment time.",
            "🎉 Electrician booked! We'll have it sorted."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "issue"
            },
            {
                delay: 2500,
                type: "urgency"
            },
            {
                delay: 2500,
                type: "address"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "PowerUp Electric",
            aiName: "Dave",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Job",
            cardTitle: "Service Call",
            responses: {
                greeting: "Hi, I need an electrician",
                issue: "Some power points have stopped working",
                urgency: "It's not urgent, but I'd like it fixed soon",
                address: "12 Pine Avenue, Carlton",
                datetime: "Tomorrow if possible",
                name: "Mike Stevens",
                phone: "0434 567 890",
                confirm: "Yep, that works"
            }
        }
    },
    eventvenue: {
        icon: "🎪",
        customerIcon: "👤",
        voice: "onyx",
        color: "#7c3aed",
        cardIcon: "fa-building-columns",
        quickActions: [
            {
                emoji: "🎪",
                label: "Book",
                text: "I need to book an event venue"
            },
            {
                emoji: "👀",
                label: "View",
                text: "Can I book a venue viewing?"
            },
            {
                emoji: "💰",
                label: "Pricing",
                text: "What are your venue prices?"
            }
        ],
        menuItems: [
            {
                emoji: "🏛️",
                name: "Main Hall",
                desc: "Up to 200 guests",
                price: 3000
            },
            {
                emoji: "🌿",
                name: "Garden Terrace",
                desc: "Up to 100 guests",
                price: 2000
            },
            {
                emoji: "🌆",
                name: "Rooftop",
                desc: "Up to 80 guests",
                price: 2500
            },
            {
                emoji: "💼",
                name: "Boardroom",
                desc: "Up to 30 guests",
                price: 500
            }
        ],
        stepInfos: [
            "📞 Victoria answers with professional elegance.",
            "🎪 Discussing event type, date and guest count.",
            "✅ Arranging venue viewing and requirements.",
            "🎉 Viewing booked! Can't wait to show you around!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "eventType"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2500,
                type: "guests"
            },
            {
                delay: 2500,
                type: "catering"
            },
            {
                delay: 2500,
                type: "viewing"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Grand Events Hall",
            aiName: "Victoria",
            steps: [
                "Call",
                "View",
                "Confirm",
                "Done"
            ],
            totalLabel: "Venue",
            cardTitle: "Viewing Booking",
            responses: {
                greeting: "Hi, I'm looking for a venue for an event",
                eventType: "It's a corporate conference",
                datetime: "March 15th, all day event",
                guests: "About 150 people",
                catering: "Yes, we'll need lunch and tea breaks",
                viewing: "Yes, I'd like to see the venue first",
                name: "David from TechCorp",
                phone: "0489 012 345",
                confirm: "Yes, book the viewing"
            }
        }
    },
    fastfood: {
        icon: "🍔",
        customerIcon: "👤",
        voice: "echo",
        color: "#ea580c",
        cardIcon: "fa-burger",
        quickActions: [
            {
                emoji: "🍔",
                label: "Order",
                text: "I'd like to order a burger"
            },
            {
                emoji: "🍟",
                label: "Combo",
                text: "What combos do you have?"
            },
            {
                emoji: "🛵",
                label: "Delivery",
                text: "Do you deliver?"
            }
        ],
        menuItems: [
            {
                emoji: "🍔",
                name: "Double Cheese",
                desc: "Two patties, extra cheese",
                price: 12
            },
            {
                emoji: "🐔",
                name: "Chicken Burger",
                desc: "Crispy chicken fillet",
                price: 10
            },
            {
                emoji: "🍟",
                name: "Large Fries",
                desc: "Crispy golden fries",
                price: 6
            },
            {
                emoji: "🥤",
                name: "Soft Drink",
                desc: "Various flavors",
                price: 3.5
            }
        ],
        stepInfos: [
            "📞 Billy answers, ready for your order!",
            "🍔 Taking your burger order with sides and drinks.",
            "✅ Confirming pickup/delivery and total.",
            "🎉 Order in! Burgers cooking now!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "orderItem"
            },
            {
                delay: 2500,
                type: "moreItems"
            },
            {
                delay: 2000,
                type: "noMore"
            },
            {
                delay: 2500,
                type: "pickupTime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Burger Barn",
            aiName: "Billy",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order Total",
            cardTitle: "Kitchen Order",
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
        }
    },
    florist: {
        icon: "💐",
        customerIcon: "👤",
        voice: "nova",
        color: "#ec4899",
        cardIcon: "fa-seedling",
        quickActions: [
            {
                emoji: "💐",
                label: "Order",
                text: "I need to order flowers"
            },
            {
                emoji: "🌹",
                label: "Roses",
                text: "I'd like a rose bouquet"
            },
            {
                emoji: "💒",
                label: "Wedding",
                text: "I need wedding flowers"
            }
        ],
        menuItems: [
            {
                emoji: "🌹",
                name: "Rose Bouquet",
                desc: "Classic elegance",
                price: 45
            },
            {
                emoji: "💐",
                name: "Mixed Seasonal",
                desc: "Fresh variety",
                price: 55
            },
            {
                emoji: "🪻",
                name: "Orchid Plant",
                desc: "Long lasting",
                price: 65
            },
            {
                emoji: "🤍",
                name: "Sympathy",
                desc: "Thoughtful tribute",
                price: 75
            }
        ],
        stepInfos: [
            "📞 Lily answers ready to create something beautiful!",
            "💐 Discussing occasion, colors and preferences.",
            "✅ Confirming delivery details and card message.",
            "🎉 Order created! Beautiful flowers on the way!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "occasion"
            },
            {
                delay: 2500,
                type: "preferences"
            },
            {
                delay: 2500,
                type: "budget"
            },
            {
                delay: 2500,
                type: "delivery"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "recipient"
            },
            {
                delay: 2000,
                type: "nameContact"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Bloom & Petal",
            aiName: "Lily",
            steps: [
                "Call",
                "Design",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order",
            cardTitle: "Flower Order",
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
        }
    },
    garage: {
        icon: "🚗",
        customerIcon: "👤",
        voice: "onyx",
        color: "#64748b",
        cardIcon: "fa-car",
        quickActions: [
            {
                emoji: "🔧",
                label: "Service",
                text: "I need to book a car service"
            },
            {
                emoji: "🛞",
                label: "Tyres",
                text: "I need my tyres checked"
            },
            {
                emoji: "💨",
                label: "Aircon",
                text: "My aircon needs a regas"
            }
        ],
        menuItems: [
            {
                emoji: "🔧",
                name: "Basic Service",
                desc: "Oil, filter, check",
                price: 189
            },
            {
                emoji: "⚙️",
                name: "Full Service",
                desc: "Complete service",
                price: 349
            },
            {
                emoji: "🛞",
                name: "Brake Check",
                desc: "Safety inspection",
                price: 49
            },
            {
                emoji: "❄️",
                name: "Aircon Regas",
                desc: "Full recharge",
                price: 120
            }
        ],
        stepInfos: [
            "📞 Mike answers like a true Aussie mechanic.",
            "🚗 Discussing service needs and vehicle details.",
            "✅ Confirming booking date and time.",
            "🎉 Booked in! We'll take good care of her."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "vehicle"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Aussie Auto Care",
            aiName: "Mike",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Service Booking",
            responses: {
                greeting: "Hi, I need to book my car in for a service",
                service: "Just a regular service, it's due",
                vehicle: "It's a 2019 Toyota Camry",
                datetime: "Next Monday morning if possible",
                name: "Sarah Collins",
                phone: "0489 012 345",
                confirm: "That's perfect, thanks"
            }
        }
    },
    gym: {
        icon: "💪",
        customerIcon: "👤",
        voice: "echo",
        color: "#f97316",
        cardIcon: "fa-dumbbell",
        quickActions: [
            {
                emoji: "💪",
                label: "Join",
                text: "I want to join the gym"
            },
            {
                emoji: "🎫",
                label: "Day Pass",
                text: "Can I get a day pass?"
            },
            {
                emoji: "🏋️",
                label: "PT",
                text: "Tell me about personal training"
            }
        ],
        menuItems: [
            {
                emoji: "🏃",
                name: "Basic",
                desc: "Gym access only",
                price: 45
            },
            {
                emoji: "⭐",
                name: "Premium",
                desc: "Gym + all classes",
                price: 65
            },
            {
                emoji: "👑",
                name: "VIP",
                desc: "All access + PT",
                price: 99
            },
            {
                emoji: "🎫",
                name: "Day Pass",
                desc: "Single visit",
                price: 25
            }
        ],
        stepInfos: [
            "📞 Alex answers with energy and motivation!",
            "💪 Discussing fitness goals and membership options.",
            "✅ Setting up your membership start date.",
            "🎉 Welcome to the team! Let's crush those goals!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "interest"
            },
            {
                delay: 2500,
                type: "goals"
            },
            {
                delay: 2500,
                type: "tour"
            },
            {
                delay: 2500,
                type: "membership"
            },
            {
                delay: 2500,
                type: "startDate"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "contact"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Peak Fitness Brisbane",
            aiName: "Alex",
            steps: [
                "Call",
                "Join",
                "Confirm",
                "Done"
            ],
            totalLabel: "Membership",
            cardTitle: "Member Card",
            responses: {
                greeting: "Hi, I'm interested in joining the gym",
                interest: "Looking for a full membership with classes",
                goals: "Mainly weight loss and general fitness",
                tour: "Yes, I'd like to see the facilities first",
                membership: "The Premium sounds good",
                startDate: "I'd like to start next Monday",
                name: "Chris Anderson",
                contact: "0412 345 678, chris.a@email.com",
                confirm: "Yes, sign me up!"
            }
        }
    },
    hotel: {
        icon: "🏨",
        customerIcon: "👤",
        voice: "onyx",
        color: "#7c3aed",
        cardIcon: "fa-hotel",
        quickActions: [
            {
                emoji: "🛏️",
                label: "Book",
                text: "I'd like to book a room"
            },
            {
                emoji: "📅",
                label: "Dates",
                text: "What's available next weekend?"
            },
            {
                emoji: "🍳",
                label: "Breakfast",
                text: "Is breakfast included?"
            }
        ],
        menuItems: [
            {
                emoji: "🛏️",
                name: "Standard Room",
                desc: "Comfortable stay",
                price: 189
            },
            {
                emoji: "✨",
                name: "Deluxe Room",
                desc: "City views",
                price: 259
            },
            {
                emoji: "👔",
                name: "Executive Suite",
                desc: "Luxury space",
                price: 399
            },
            {
                emoji: "🍳",
                name: "Breakfast",
                desc: "Per person",
                price: 35
            }
        ],
        stepInfos: [
            "📞 James answers with 5-star professionalism.",
            "🏨 Checking dates, room type and guests.",
            "✅ Confirming reservation details.",
            "🎉 Reservation confirmed! Welcome to The Grand."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "dates"
            },
            {
                delay: 2500,
                type: "roomType"
            },
            {
                delay: 2500,
                type: "guests"
            },
            {
                delay: 2500,
                type: "extras"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "contact"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "The Grand Melbourne Hotel",
            aiName: "James",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Stay",
            cardTitle: "Reservation",
            responses: {
                greeting: "Hi, I'd like to book a room",
                dates: "From the 15th to the 18th of January",
                roomType: "A deluxe room please",
                guests: "Just the two of us",
                extras: "Yes, breakfast would be great",
                name: "Robert and Sarah Williams",
                contact: "0401 234 567, robert.w@email.com",
                confirm: "Yes please, confirm the booking"
            }
        }
    },
    icecream: {
        icon: "🍦",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#f472b6",
        cardIcon: "fa-ice-cream",
        quickActions: [
            {
                emoji: "🍦",
                label: "Order",
                text: "I'd like to order ice cream"
            },
            {
                emoji: "🌈",
                label: "Flavors",
                text: "What flavors do you have?"
            },
            {
                emoji: "🍨",
                label: "Sundae",
                text: "Tell me about your sundaes"
            }
        ],
        menuItems: [
            {
                emoji: "🍫",
                name: "Double Scoop",
                desc: "Any two flavors",
                price: 7.5
            },
            {
                emoji: "🧇",
                name: "Waffle Cone",
                desc: "Fresh made cone",
                price: 2
            },
            {
                emoji: "🍨",
                name: "Sundae",
                desc: "With toppings & sauce",
                price: 12
            },
            {
                emoji: "🫙",
                name: "Take-home Tub",
                desc: "1 litre any flavor",
                price: 15
            }
        ],
        stepInfos: [
            "📞 Sunny answers with sweet enthusiasm!",
            "🍦 Choosing flavors, scoops and cone type.",
            "✅ Confirming the sweet order details.",
            "🎉 Scooping now! Your treat awaits!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "orderItem"
            },
            {
                delay: 2500,
                type: "moreItems"
            },
            {
                delay: 2000,
                type: "noMore"
            },
            {
                delay: 2500,
                type: "pickupTime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Scoops Delight",
            aiName: "Sunny",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order Total",
            cardTitle: "Ice Cream Order",
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
        }
    },
    landscaping: {
        icon: "🌿",
        customerIcon: "👤",
        voice: "echo",
        color: "#22c55e",
        cardIcon: "fa-leaf",
        quickActions: [
            {
                emoji: "🌿",
                label: "Book",
                text: "I need garden work done"
            },
            {
                emoji: "🌱",
                label: "Mowing",
                text: "I need lawn mowing"
            },
            {
                emoji: "🌳",
                label: "Trees",
                text: "I need tree pruning"
            }
        ],
        menuItems: [
            {
                emoji: "🌱",
                name: "Lawn Mow",
                desc: "Standard yard",
                price: 60
            },
            {
                emoji: "🌲",
                name: "Hedge Trim",
                desc: "Shape and trim",
                price: 80
            },
            {
                emoji: "🧹",
                name: "Garden Cleanup",
                desc: "Full tidy up",
                price: 200
            },
            {
                emoji: "📅",
                name: "Regular Care",
                desc: "Fortnightly visits",
                price: 120
            }
        ],
        stepInfos: [
            "📞 Tom answers with enthusiasm for gardens!",
            "🌿 Discussing garden work and yard size.",
            "✅ Confirming schedule and address.",
            "🎉 Booked! Your garden will look amazing!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "size"
            },
            {
                delay: 2500,
                type: "frequency"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "address"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Green Thumb Gardens",
            aiName: "Tom",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Garden Booking",
            responses: {
                greeting: "Hi, I need some gardening work done",
                service: "Lawn mowing and hedge trimming",
                size: "Medium sized yard, about 400 sqm",
                frequency: "Monthly would be great",
                datetime: "Next week sometime",
                address: "22 Garden Lane, Toorak",
                name: "Peter Green",
                phone: "0456 789 012",
                confirm: "Yes, that's great"
            }
        }
    },
    lawyer: {
        icon: "⚖️",
        customerIcon: "👤",
        voice: "onyx",
        color: "#1e3a5f",
        cardIcon: "fa-gavel",
        quickActions: [
            {
                emoji: "⚖️",
                label: "Consult",
                text: "I need legal advice"
            },
            {
                emoji: "🏠",
                label: "Property",
                text: "I have a property matter"
            },
            {
                emoji: "👨‍👩‍👧",
                label: "Family",
                text: "I need family law help"
            }
        ],
        menuItems: [
            {
                emoji: "💼",
                name: "Consultation",
                desc: "Initial 30 min meeting",
                price: 350
            },
            {
                emoji: "🏠",
                name: "Property Law",
                desc: "Conveyancing & disputes",
                price: 0
            },
            {
                emoji: "👨‍👩‍👧",
                name: "Family Law",
                desc: "Separation & custody",
                price: 0
            },
            {
                emoji: "📜",
                name: "Wills & Estates",
                desc: "Estate planning",
                price: 0
            }
        ],
        stepInfos: [
            "📞 Victoria answers professionally and discreetly.",
            "⚖️ Identifying the legal matter and needs.",
            "✅ Confirming solicitor and appointment time.",
            "🎉 Consultation booked! Confidential and secure."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "area"
            },
            {
                delay: 2500,
                type: "consultation"
            },
            {
                delay: 2500,
                type: "lawyer"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2500,
                type: "brief"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Harper & Associates Law",
            aiName: "Victoria",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Consultation",
            cardTitle: "Appointment",
            responses: {
                greeting: "Hi, I need to speak with a lawyer",
                area: "It's regarding a property matter",
                consultation: "Yes, I'd like to book a consultation",
                lawyer: "Anyone available is fine",
                datetime: "Early next week if possible",
                name: "Richard Thompson",
                phone: "0490 123 456",
                brief: "Property settlement dispute",
                confirm: "Yes, that's all correct"
            }
        }
    },
    locksmith: {
        icon: "🔐",
        customerIcon: "👤",
        voice: "onyx",
        color: "#f59e0b",
        cardIcon: "fa-key",
        quickActions: [
            {
                emoji: "🔐",
                label: "Lockout",
                text: "I'm locked out"
            },
            {
                emoji: "🚗",
                label: "Car",
                text: "I'm locked out of my car"
            },
            {
                emoji: "🔑",
                label: "Keys",
                text: "I need new keys cut"
            }
        ],
        menuItems: [
            {
                emoji: "🏠",
                name: "House Lockout",
                desc: "Emergency entry",
                price: 90
            },
            {
                emoji: "🚗",
                name: "Car Lockout",
                desc: "Vehicle entry",
                price: 80
            },
            {
                emoji: "🔒",
                name: "Lock Change",
                desc: "New locks installed",
                price: 150
            },
            {
                emoji: "🔑",
                name: "Key Cutting",
                desc: "Duplicates made",
                price: 15
            }
        ],
        stepInfos: [
            "📞 Frank answers calmly - help is on the way!",
            "🔐 Getting your location and situation details.",
            "✅ Dispatching the nearest locksmith.",
            "🎉 Locksmith en route! You'll be in soon."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "situation"
            },
            {
                delay: 2500,
                type: "location"
            },
            {
                delay: 2500,
                type: "urgency"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "KeyMaster Locksmiths",
            aiName: "Frank",
            steps: [
                "Call",
                "Dispatch",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Service Call",
            responses: {
                greeting: "Hi, I'm locked out of my house",
                situation: "I left my keys inside and the door slammed shut",
                location: "I'm at 15 Lock Street, Brunswick",
                urgency: "Yes, please come as soon as possible",
                name: "David Chen",
                phone: "0467 890 123",
                confirm: "Yes, thank you!"
            }
        }
    },
    massage: {
        icon: "💆",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#8b5cf6",
        cardIcon: "fa-hands",
        quickActions: [
            {
                emoji: "💆",
                label: "Book",
                text: "I'd like to book a massage"
            },
            {
                emoji: "💪",
                label: "Deep Tissue",
                text: "I need a deep tissue massage"
            },
            {
                emoji: "❓",
                label: "Types",
                text: "What types of massage do you offer?"
            }
        ],
        menuItems: [
            {
                emoji: "😌",
                name: "Relaxation",
                desc: "Gentle soothing massage",
                price: 90
            },
            {
                emoji: "💪",
                name: "Deep Tissue",
                desc: "Therapeutic pressure",
                price: 100
            },
            {
                emoji: "🔥",
                name: "Hot Stone",
                desc: "Heated stone therapy",
                price: 120
            },
            {
                emoji: "🏃",
                name: "Sports",
                desc: "Athletic recovery",
                price: 95
            }
        ],
        stepInfos: [
            "📞 Zen answers in a calm, peaceful voice.",
            "💆 Discussing massage type and duration.",
            "✅ Confirming therapist and time slot.",
            "🎉 Booked! Time to relax and unwind."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "duration"
            },
            {
                delay: 2500,
                type: "therapist"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Healing Hands Massage",
            aiName: "Zen",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Session",
            cardTitle: "Massage Booking",
            responses: {
                greeting: "Hi, I'd like to book a massage",
                service: "Deep tissue please, my back is killing me",
                duration: "60 minutes",
                therapist: "Anyone available is fine",
                datetime: "Tomorrow afternoon",
                name: "Marcus",
                phone: "0412 345 678",
                confirm: "Yes, that's perfect"
            }
        }
    },
    medical: {
        icon: "👩‍⚕️",
        customerIcon: "👤",
        voice: "nova",
        color: "#06b6d4",
        cardIcon: "fa-notes-medical",
        quickActions: [
            {
                emoji: "📅",
                label: "Book",
                text: "I'd like to book an appointment"
            },
            {
                emoji: "👨‍⚕️",
                label: "Doctor",
                text: "Which doctors are available?"
            },
            {
                emoji: "⏰",
                label: "Urgent",
                text: "I need an urgent appointment"
            }
        ],
        menuItems: [
            {
                emoji: "🩺",
                name: "General Consult",
                desc: "Standard GP visit",
                price: 75
            },
            {
                emoji: "💉",
                name: "Vaccination",
                desc: "Flu, travel, etc.",
                price: 45
            },
            {
                emoji: "🧪",
                name: "Blood Test",
                desc: "Pathology referral",
                price: 0
            },
            {
                emoji: "📝",
                name: "Health Check",
                desc: "Full assessment",
                price: 120
            }
        ],
        stepInfos: [
            "📞 Rachel answers professionally and warmly.",
            "🏥 Checking doctor availability and preferred times.",
            "✅ Confirming patient details and Medicare info.",
            "🎉 Appointment confirmed! Reminder SMS on the way."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "doctor"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "dob"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Wellness Medical Centre",
            aiName: "Rachel",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Consult",
            cardTitle: "Booking Slip",
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
    moving: {
        icon: "📦",
        customerIcon: "👤",
        voice: "echo",
        color: "#8b5cf6",
        cardIcon: "fa-truck-moving",
        quickActions: [
            {
                emoji: "📦",
                label: "Book",
                text: "I need to book a move"
            },
            {
                emoji: "💰",
                label: "Quote",
                text: "Can I get a quote?"
            },
            {
                emoji: "📅",
                label: "Date",
                text: "What dates are available?"
            }
        ],
        menuItems: [
            {
                emoji: "👥",
                name: "2 Movers + Truck",
                desc: "Standard move",
                price: 150
            },
            {
                emoji: "👥",
                name: "3 Movers + Truck",
                desc: "Larger move",
                price: 200
            },
            {
                emoji: "📦",
                name: "Packing Service",
                desc: "Per hour/packer",
                price: 50
            },
            {
                emoji: "🎹",
                name: "Piano Moving",
                desc: "Specialist move",
                price: 200
            }
        ],
        stepInfos: [
            "📞 Mark answers ready to plan your stress-free move.",
            "📦 Getting details on size and distance.",
            "✅ Confirming date, addresses and quote.",
            "🎉 Move booked! We've got you covered!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "moveType"
            },
            {
                delay: 2500,
                type: "size"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2500,
                type: "addresses"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Swift Movers",
            aiName: "Mark",
            steps: [
                "Call",
                "Quote",
                "Confirm",
                "Done"
            ],
            totalLabel: "Estimate",
            cardTitle: "Moving Booking",
            responses: {
                greeting: "Hi, I need to book a move",
                moveType: "It's a local move",
                size: "3 bedroom house",
                datetime: "End of the month, the 30th",
                addresses: "From Carlton to Fitzroy",
                name: "James Wilson",
                phone: "0478 901 234",
                confirm: "Yes, let's book it"
            }
        }
    },
    nailsalon: {
        icon: "💅",
        customerIcon: "👤",
        voice: "nova",
        color: "#f43f5e",
        cardIcon: "fa-hand-sparkles",
        quickActions: [
            {
                emoji: "💅",
                label: "Book",
                text: "I'd like a nail appointment"
            },
            {
                emoji: "✨",
                label: "Gel",
                text: "Do you do gel nails?"
            },
            {
                emoji: "🎨",
                label: "Art",
                text: "What nail art can you do?"
            }
        ],
        menuItems: [
            {
                emoji: "💅",
                name: "Gel Manicure",
                desc: "Long-lasting gel polish",
                price: 55
            },
            {
                emoji: "🦶",
                name: "Gel Pedicure",
                desc: "Luxurious foot treatment",
                price: 65
            },
            {
                emoji: "✨",
                name: "Mani + Pedi",
                desc: "Complete package",
                price: 75
            },
            {
                emoji: "🎨",
                name: "Nail Art",
                desc: "Custom designs",
                price: 10
            }
        ],
        stepInfos: [
            "📞 Kim answers ready to make your nails fab!",
            "💅 Choosing services - mani, pedi, gel or art.",
            "✅ Confirming appointment time and details.",
            "🎉 Booked! Get ready for gorgeous nails!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "extras"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Polished Nails Studio",
            aiName: "Kim",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Nail Appointment",
            responses: {
                greeting: "Hi, I'd like to book a nail appointment",
                service: "Gel manicure and pedicure please",
                extras: "Maybe some nail art on the ring fingers",
                datetime: "This Saturday morning",
                name: "Sophie",
                phone: "0423 456 789",
                confirm: "Perfect, thanks!"
            }
        }
    },
    optician: {
        icon: "👓",
        customerIcon: "👤",
        voice: "nova",
        color: "#3b82f6",
        cardIcon: "fa-glasses",
        quickActions: [
            {
                emoji: "👓",
                label: "Book",
                text: "I need an eye test"
            },
            {
                emoji: "📋",
                label: "Glasses",
                text: "I need new glasses"
            },
            {
                emoji: "👁️",
                label: "Contacts",
                text: "I want to try contact lenses"
            }
        ],
        menuItems: [
            {
                emoji: "👁️",
                name: "Eye Exam",
                desc: "Comprehensive test",
                price: 75
            },
            {
                emoji: "👶",
                name: "Children's Test",
                desc: "Kids eye assessment",
                price: 65
            },
            {
                emoji: "📱",
                name: "Contact Fitting",
                desc: "Lens fitting & trial",
                price: 50
            },
            {
                emoji: "👓",
                name: "Frames",
                desc: "Wide selection",
                price: 150
            }
        ],
        stepInfos: [
            "📞 Lisa answers ready to help with your eye care.",
            "👓 Discussing eye exam or glasses needs.",
            "✅ Confirming insurance and appointment time.",
            "🎉 Booked! See you soon for clearer vision."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "lastVisit"
            },
            {
                delay: 2500,
                type: "insurance"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Clear Vision Optometry",
            aiName: "Lisa",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Eye Appointment",
            responses: {
                greeting: "Hi, I need to book an eye test",
                service: "Just a general eye exam",
                lastVisit: "It's been about 2 years",
                insurance: "Yes, I have Bupa",
                datetime: "Next week sometime",
                name: "Robert Chen",
                phone: "0434 567 890",
                confirm: "Yes, that's great"
            }
        }
    },
    petboarding: {
        icon: "🏠",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#22c55e",
        cardIcon: "fa-house-chimney",
        quickActions: [
            {
                emoji: "🏠",
                label: "Board",
                text: "I need to board my pet"
            },
            {
                emoji: "☀️",
                label: "Daycare",
                text: "Do you do daycare?"
            },
            {
                emoji: "👑",
                label: "Luxury",
                text: "Tell me about the luxury suite"
            }
        ],
        menuItems: [
            {
                emoji: "🐕",
                name: "Dog Boarding",
                desc: "Per night",
                price: 50
            },
            {
                emoji: "🐈",
                name: "Cat Boarding",
                desc: "Per night",
                price: 35
            },
            {
                emoji: "👑",
                name: "Luxury Suite",
                desc: "Premium stay",
                price: 75
            },
            {
                emoji: "☀️",
                name: "Daycare",
                desc: "Daily care",
                price: 40
            }
        ],
        stepInfos: [
            "📞 Lucy answers ready to welcome your pet!",
            "🏠 Getting pet details and stay dates.",
            "✅ Noting special needs and confirming booking.",
            "🎉 Booked! Your pet will have a great stay!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "petInfo"
            },
            {
                delay: 2500,
                type: "dates"
            },
            {
                delay: 2500,
                type: "specialNeeds"
            },
            {
                delay: 2500,
                type: "vaccination"
            },
            {
                delay: 2000,
                type: "ownerName"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Happy Tails Pet Resort",
            aiName: "Lucy",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Stay",
            cardTitle: "Boarding Booking",
            responses: {
                greeting: "Hi, I need to board my dog",
                petInfo: "She's a border collie named Luna",
                dates: "From the 15th to the 22nd, a week",
                specialNeeds: "She takes medication in the morning",
                vaccination: "Yes, all up to date",
                ownerName: "Michelle",
                phone: "0456 789 012",
                confirm: "Yes please, book her in"
            }
        }
    },
    petgrooming: {
        icon: "🐩",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#f472b6",
        cardIcon: "fa-dog",
        quickActions: [
            {
                emoji: "🐕",
                label: "Book",
                text: "I need to book grooming for my dog"
            },
            {
                emoji: "🐈",
                label: "Cat",
                text: "Do you groom cats?"
            },
            {
                emoji: "✂️",
                label: "Nails",
                text: "Just a nail trim please"
            }
        ],
        menuItems: [
            {
                emoji: "✂️",
                name: "Full Groom",
                desc: "Wash, cut, style",
                price: 65
            },
            {
                emoji: "🛁",
                name: "Bath & Brush",
                desc: "Clean and tidy",
                price: 35
            },
            {
                emoji: "💅",
                name: "Nail Trim",
                desc: "Quick clip",
                price: 15
            },
            {
                emoji: "🐈",
                name: "Cat Groom",
                desc: "Feline pampering",
                price: 55
            }
        ],
        stepInfos: [
            "📞 Bella answers with love for all fur babies!",
            "🐕 Getting pet details and grooming needs.",
            "✅ Confirming appointment time and service.",
            "🎉 Booked! Your pet will look fabulous!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "petType"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "size"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "petName"
            },
            {
                delay: 2000,
                type: "ownerName"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Pampered Paws",
            aiName: "Bella",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Grooming Booking",
            responses: {
                greeting: "Hi, I need to book my dog for grooming",
                petType: "He's a golden retriever",
                service: "Full groom please, he's very fluffy",
                size: "Large, about 30 kilos",
                datetime: "This Saturday morning",
                petName: "Buddy",
                ownerName: "Lisa",
                phone: "0445 678 901",
                confirm: "Yes, book him in"
            }
        }
    },
    pharmacy: {
        icon: "💊",
        customerIcon: "👤",
        voice: "nova",
        color: "#22c55e",
        cardIcon: "fa-prescription-bottle",
        quickActions: [
            {
                emoji: "💊",
                label: "Script",
                text: "I need to fill a prescription"
            },
            {
                emoji: "💉",
                label: "Vaccine",
                text: "I need a flu vaccination"
            },
            {
                emoji: "❓",
                label: "Advice",
                text: "I need some health advice"
            }
        ],
        menuItems: [
            {
                emoji: "💊",
                name: "Prescription",
                desc: "Medication fill",
                price: 0
            },
            {
                emoji: "💉",
                name: "Vaccination",
                desc: "Flu, COVID etc.",
                price: 35
            },
            {
                emoji: "❤️",
                name: "Health Check",
                desc: "Quick assessment",
                price: 25
            },
            {
                emoji: "🩺",
                name: "BP Check",
                desc: "Blood pressure",
                price: 0
            }
        ],
        stepInfos: [
            "📞 Sarah answers ready to help with your health needs.",
            "💊 Checking prescription and medication details.",
            "✅ Confirming pickup time and patient info.",
            "🎉 Prescription ready! Come collect anytime."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "medication"
            },
            {
                delay: 2500,
                type: "doctor"
            },
            {
                delay: 2500,
                type: "pickupTime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "City Pharmacy",
            aiName: "Sarah",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Pharmacy Order",
            responses: {
                greeting: "Hi, I need to order a prescription",
                medication: "It's my blood pressure medication",
                doctor: "Yes, Dr. Smith sent it through",
                pickupTime: "In about an hour",
                name: "John Williams",
                phone: "0456 789 012",
                confirm: "Yes, that's all correct"
            }
        }
    },
    photography: {
        icon: "📷",
        customerIcon: "👤",
        voice: "onyx",
        color: "#6366f1",
        cardIcon: "fa-camera",
        quickActions: [
            {
                emoji: "📷",
                label: "Book",
                text: "I'd like to book a photo session"
            },
            {
                emoji: "👨‍👩‍👧‍👦",
                label: "Family",
                text: "I need family photos"
            },
            {
                emoji: "💼",
                label: "Headshots",
                text: "I need professional headshots"
            }
        ],
        menuItems: [
            {
                emoji: "🖼️",
                name: "Portrait",
                desc: "Individual session",
                price: 150
            },
            {
                emoji: "👨‍👩‍👧‍👦",
                name: "Family",
                desc: "Group package",
                price: 250
            },
            {
                emoji: "💼",
                name: "Headshots",
                desc: "Professional photos",
                price: 120
            },
            {
                emoji: "🎉",
                name: "Event",
                desc: "Full coverage",
                price: 400
            }
        ],
        stepInfos: [
            "📞 James answers ready to capture your moment!",
            "📷 Discussing shoot type, location and occasion.",
            "✅ Confirming date, people and package.",
            "🎉 Session booked! Get ready for amazing photos!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "type"
            },
            {
                delay: 2500,
                type: "occasion"
            },
            {
                delay: 2500,
                type: "location"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "people"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "contact"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Capture Studio",
            aiName: "James",
            steps: [
                "Call",
                "Plan",
                "Confirm",
                "Done"
            ],
            totalLabel: "Package",
            cardTitle: "Photo Session",
            responses: {
                greeting: "Hi, I'd like to book a photography session",
                type: "Family photos, we have two kids",
                occasion: "Just want some nice family portraits",
                location: "Outdoor would be lovely, maybe a park",
                datetime: "Next Saturday afternoon",
                people: "Four of us - two adults, two children",
                name: "The Johnson family",
                contact: "0423 456 789, sarah.j@email.com",
                confirm: "Yes, let's book it"
            }
        }
    },
    pizza: {
        icon: "🍕",
        customerIcon: "👤",
        voice: "echo",
        color: "#dc2626",
        cardIcon: "fa-pizza-slice",
        quickActions: [
            {
                emoji: "🍕",
                label: "Order",
                text: "I'd like to order a pizza"
            },
            {
                emoji: "🛵",
                label: "Delivery",
                text: "Do you deliver?"
            },
            {
                emoji: "🌶️",
                label: "Specials",
                text: "What are today's specials?"
            }
        ],
        menuItems: [
            {
                emoji: "🍕",
                name: "Margherita",
                desc: "Classic tomato & mozzarella",
                price: 18
            },
            {
                emoji: "🥓",
                name: "Meat Lovers",
                desc: "Pepperoni, bacon, sausage",
                price: 26
            },
            {
                emoji: "🧄",
                name: "Garlic Bread",
                desc: "With herbs & butter",
                price: 8
            },
            {
                emoji: "🥤",
                name: "Soft Drink",
                desc: "Can - various flavors",
                price: 4
            }
        ],
        stepInfos: [
            "📞 Tony answers with his famous Italian enthusiasm!",
            "🍕 Taking the pizza order, size and toppings.",
            "✅ Confirming delivery/pickup and payment details.",
            "🎉 Pizza's in the oven! Delivery on its way soon."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "orderItem"
            },
            {
                delay: 2500,
                type: "moreItems"
            },
            {
                delay: 2000,
                type: "noMore"
            },
            {
                delay: 2500,
                type: "delivery"
            },
            {
                delay: 2000,
                type: "address"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Tony's Famous Pizzeria",
            aiName: "Tony",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order Total",
            cardTitle: "Kitchen Order",
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
    plumber: {
        icon: "🔧",
        customerIcon: "👤",
        voice: "onyx",
        color: "#3b82f6",
        cardIcon: "fa-wrench",
        quickActions: [
            {
                emoji: "🔧",
                label: "Book",
                text: "I need a plumber"
            },
            {
                emoji: "🚨",
                label: "Emergency",
                text: "I have a plumbing emergency"
            },
            {
                emoji: "🚿",
                label: "Drain",
                text: "I have a blocked drain"
            }
        ],
        menuItems: [
            {
                emoji: "🚿",
                name: "Blocked Drain",
                desc: "Clear blockages",
                price: 150
            },
            {
                emoji: "🚰",
                name: "Leaking Tap",
                desc: "Repair or replace",
                price: 120
            },
            {
                emoji: "🔥",
                name: "Hot Water",
                desc: "Repair or install",
                price: 200
            },
            {
                emoji: "🚽",
                name: "Toilet Repair",
                desc: "All toilet issues",
                price: 150
            }
        ],
        stepInfos: [
            "📞 Steve answers ready to tackle your plumbing problem.",
            "🔧 Getting details on the plumbing issue.",
            "✅ Confirming address and arrival time.",
            "🎉 Plumber on the way! We'll fix it."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "issue"
            },
            {
                delay: 2500,
                type: "urgency"
            },
            {
                delay: 2500,
                type: "address"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Quick Flow Plumbing",
            aiName: "Steve",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Job",
            cardTitle: "Service Call",
            responses: {
                greeting: "Hi, I need a plumber",
                issue: "I've got a blocked drain in the kitchen",
                urgency: "It's pretty bad, water's backing up",
                address: "78 River Road, Southbank",
                datetime: "Today if possible",
                name: "Tom Bradley",
                phone: "0445 678 901",
                confirm: "Yep, see you then"
            }
        }
    },
    podiatrist: {
        icon: "🦶",
        customerIcon: "👤",
        voice: "nova",
        color: "#14b8a6",
        cardIcon: "fa-shoe-prints",
        quickActions: [
            {
                emoji: "🦶",
                label: "Book",
                text: "I need to see a podiatrist"
            },
            {
                emoji: "🩹",
                label: "Pain",
                text: "I have foot pain"
            },
            {
                emoji: "👟",
                label: "Orthotics",
                text: "I need orthotics"
            }
        ],
        menuItems: [
            {
                emoji: "🩺",
                name: "Consultation",
                desc: "Initial assessment",
                price: 90
            },
            {
                emoji: "🦶",
                name: "Treatment",
                desc: "General foot care",
                price: 70
            },
            {
                emoji: "👟",
                name: "Orthotics",
                desc: "Custom fitting",
                price: 350
            },
            {
                emoji: "🩹",
                name: "Diabetic Care",
                desc: "Specialist care",
                price: 80
            }
        ],
        stepInfos: [
            "📞 Kate's team answers with care and understanding.",
            "🦶 Discussing foot issues and concerns.",
            "✅ Confirming insurance and appointment time.",
            "🎉 Booked! We'll get you back on your feet."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "issue"
            },
            {
                delay: 2500,
                type: "firstVisit"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "insurance"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Happy Feet Podiatry",
            aiName: "Kate",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Consult",
            cardTitle: "Podiatry Appointment",
            responses: {
                greeting: "Hi, I need to see a podiatrist",
                issue: "I've got heel pain, it's quite painful",
                firstVisit: "Yes, first time",
                datetime: "As soon as possible please",
                name: "Andrew Miller",
                insurance: "Yes, I have HCF",
                phone: "0445 678 901",
                confirm: "That's perfect, thank you"
            }
        }
    },
    realestate: {
        icon: "🏠",
        customerIcon: "👤",
        voice: "echo",
        color: "#059669",
        cardIcon: "fa-home",
        quickActions: [
            {
                emoji: "🏠",
                label: "Buy",
                text: "I'm looking to buy a property"
            },
            {
                emoji: "💰",
                label: "Sell",
                text: "I want to sell my property"
            },
            {
                emoji: "🔑",
                label: "Rent",
                text: "I'm looking to rent"
            }
        ],
        menuItems: [
            {
                emoji: "🔍",
                name: "Inspection",
                desc: "Property viewing",
                price: 0
            },
            {
                emoji: "📊",
                name: "Appraisal",
                desc: "Market valuation",
                price: 0
            },
            {
                emoji: "📋",
                name: "Consultation",
                desc: "Buyer advice",
                price: 0
            },
            {
                emoji: "🏘️",
                name: "Management",
                desc: "Property rental",
                price: 0
            }
        ],
        stepInfos: [
            "📞 Marcus answers enthusiastically about property!",
            "🏠 Discussing requirements, area and budget.",
            "✅ Arranging property inspections.",
            "🎉 Inspections booked! Let's find your dream home!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "interest"
            },
            {
                delay: 2500,
                type: "area"
            },
            {
                delay: 2500,
                type: "requirements"
            },
            {
                delay: 2500,
                type: "budget"
            },
            {
                delay: 2500,
                type: "inspection"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "contact"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Prestige Properties",
            aiName: "Marcus",
            steps: [
                "Call",
                "Discuss",
                "Confirm",
                "Done"
            ],
            totalLabel: "Inspection",
            cardTitle: "Viewing Booking",
            responses: {
                greeting: "Hi, I'm looking to buy a property",
                interest: "Buying, looking for a family home",
                area: "South Yarra or Toorak area",
                requirements: "4 bedrooms, prefer a garden",
                budget: "Around 2 million",
                inspection: "This weekend would be great",
                name: "Amanda Roberts",
                contact: "0401 234 567, amanda@email.com",
                confirm: "Yes, please set that up"
            }
        }
    },
    restaurant: {
        icon: "👩‍🍳",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#ef4444",
        cardIcon: "fa-receipt",
        quickActions: [
            {
                emoji: "🍔",
                label: "Order Pickup",
                text: "I'd like to place a pickup order please"
            },
            {
                emoji: "📅",
                label: "Book Table",
                text: "I'd like to book a table please"
            },
            {
                emoji: "📋",
                label: "See Menu",
                text: "What's on the menu today?"
            },
            {
                emoji: "⏰",
                label: "Hours",
                text: "What are your opening hours?"
            },
            {
                emoji: "🥗",
                label: "Vegetarian",
                text: "What vegetarian options do you have?"
            },
            {
                emoji: "🎉",
                label: "Events",
                text: "Do you cater for private events?"
            }
        ],
        menuItems: [
            {
                emoji: "🍔",
                name: "Aussie Beef Burger",
                desc: "Wagyu, bacon, egg, beetroot, chips",
                price: 24
            },
            {
                emoji: "🐟",
                name: "Fish & Chips",
                desc: "Beer-battered barramundi",
                price: 26
            },
            {
                emoji: "🥩",
                name: "Scotch Fillet",
                desc: "300g grass-fed, choice of sauce",
                price: 42
            },
            {
                emoji: "🍝",
                name: "Prawn Linguine",
                desc: "Tiger prawns, garlic, chilli",
                price: 28
            },
            {
                emoji: "🥗",
                name: "Halloumi Salad",
                desc: "Fresh greens, lemon herb dressing",
                price: 17
            },
            {
                emoji: "🍫",
                name: "Chocolate Brownie",
                desc: "Warm with vanilla ice cream",
                price: 14
            }
        ],
        stepInfos: [
            "📞 Emma answers warmly - pickup order or table reservation?",
            "🍽️ Taking details - menu items or party size and date.",
            "✅ Confirming everything - time, contact details, special requests.",
            "🎉 All done! SMS confirmation sent, kitchen notified or table reserved."
        ],
        demoScript: [
            {
                delay: 1500,
                type: "greeting"
            },
            {
                delay: 2000,
                type: "orderItem"
            },
            {
                delay: 2000,
                type: "moreItems"
            },
            {
                delay: 1800,
                type: "drink"
            },
            {
                delay: 1500,
                type: "noMore"
            },
            {
                delay: 2000,
                type: "pickupTime"
            },
            {
                delay: 1500,
                type: "name"
            },
            {
                delay: 1500,
                type: "phone"
            },
            {
                delay: 1500,
                type: "confirm"
            }
        ],
        en: {
            name: "Aussie Bites Cafe",
            aiName: "Emma",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order Total",
            cardTitle: "Kitchen Ticket",
            responses: {
                greeting: "Hi, I'd like to place a pickup order please",
                orderItem: "I'll have the Aussie Beef Burger please",
                moreItems: "And some onion rings as a side",
                drink: "A lemon iced tea would be great",
                noMore: "That's everything thanks",
                pickupTime: "In about 25 minutes",
                name: "Sarah",
                phone: "0412 345 678",
                confirm: "Yep, perfect!",
                reserveGreeting: "Hi, I'd like to book a table please",
                partySize: "For 4 people",
                reserveDate: "This Saturday night",
                reserveTime: "Around 7pm if possible",
                reserveConfirm: "That sounds perfect, thanks!"
            }
        }
    },
    salon: {
        icon: "💇‍♀️",
        customerIcon: "👤",
        voice: "nova",
        color: "#ec4899",
        cardIcon: "fa-calendar-check",
        quickActions: [
            {
                emoji: "💇",
                label: "Book",
                text: "I'd like to book an appointment"
            },
            {
                emoji: "💅",
                label: "Services",
                text: "What services do you offer?"
            },
            {
                emoji: "📅",
                label: "Availability",
                text: "When are you available?"
            }
        ],
        menuItems: [
            {
                emoji: "✂️",
                name: "Haircut",
                desc: "Wash, cut & style",
                price: 85
            },
            {
                emoji: "🎨",
                name: "Full Colour",
                desc: "All-over colour",
                price: 120
            },
            {
                emoji: "✨",
                name: "Highlights",
                desc: "Foils & balayage",
                price: 150
            },
            {
                emoji: "💆",
                name: "Treatment",
                desc: "Deep conditioning",
                price: 40
            }
        ],
        stepInfos: [
            "📞 Sophie answers with style and enthusiasm!",
            "💇 Discussing services, stylist preferences and timing.",
            "✅ Confirming appointment details and contact info.",
            "🎉 Appointment booked! See you at the salon."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "stylist"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Luxe Hair Studio",
            aiName: "Sophie",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Service",
            cardTitle: "Appointment Card",
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
    spa: {
        icon: "🧖‍♀️",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#7c3aed",
        cardIcon: "fa-spa",
        quickActions: [
            {
                emoji: "💆",
                label: "Book",
                text: "I'd like to book a spa treatment"
            },
            {
                emoji: "💑",
                label: "Couples",
                text: "Do you have couples massages?"
            },
            {
                emoji: "🎁",
                label: "Packages",
                text: "What spa packages do you offer?"
            }
        ],
        menuItems: [
            {
                emoji: "💆",
                name: "Swedish Massage",
                desc: "Relaxation massage",
                price: 120
            },
            {
                emoji: "💪",
                name: "Deep Tissue",
                desc: "Therapeutic massage",
                price: 140
            },
            {
                emoji: "✨",
                name: "Facial",
                desc: "Rejuvenating treatment",
                price: 95
            },
            {
                emoji: "🌟",
                name: "Day Package",
                desc: "Full spa experience",
                price: 350
            }
        ],
        stepInfos: [
            "📞 Serena answers in a calm, soothing voice.",
            "🧖 Discussing treatments and preferences.",
            "✅ Confirming therapist and appointment details.",
            "🎉 Booking complete! Relaxation awaits."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "service"
            },
            {
                delay: 2500,
                type: "duration"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "therapist"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Tranquil Waters Day Spa",
            aiName: "Serena",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Treatment",
            cardTitle: "Spa Appointment",
            responses: {
                greeting: "Hi, I'd like to book a spa treatment",
                service: "I'd love a Swedish massage",
                duration: "90 minutes please",
                datetime: "This weekend if possible",
                therapist: "A female therapist please",
                name: "Amanda",
                phone: "0401 234 567",
                confirm: "That sounds heavenly, thank you"
            }
        }
    },
    sushi: {
        icon: "🍣",
        customerIcon: "👤",
        voice: "nova",
        color: "#dc2626",
        cardIcon: "fa-fish",
        quickActions: [
            {
                emoji: "🍣",
                label: "Order",
                text: "I'd like to order sushi"
            },
            {
                emoji: "🛵",
                label: "Delivery",
                text: "Do you deliver?"
            },
            {
                emoji: "📋",
                label: "Menu",
                text: "What's on the menu?"
            }
        ],
        menuItems: [
            {
                emoji: "🍣",
                name: "Salmon Sashimi",
                desc: "Fresh 6 pieces",
                price: 16
            },
            {
                emoji: "🌈",
                name: "Rainbow Roll",
                desc: "Assorted fish topping",
                price: 16
            },
            {
                emoji: "🍱",
                name: "Bento Box",
                desc: "Complete meal set",
                price: 22
            },
            {
                emoji: "🫛",
                name: "Edamame",
                desc: "Salted soybeans",
                price: 6
            }
        ],
        stepInfos: [
            "📞 Yuki answers with traditional Japanese hospitality.",
            "🍣 Taking the sushi order with care and precision.",
            "✅ Confirming items, pickup time and contact details.",
            "🎉 Itadakimasu! Your order is being prepared."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "orderItem"
            },
            {
                delay: 2500,
                type: "moreItems"
            },
            {
                delay: 2000,
                type: "noMore"
            },
            {
                delay: 2500,
                type: "pickupTime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Sakura Sushi",
            aiName: "Yuki",
            steps: [
                "Call",
                "Order",
                "Confirm",
                "Done"
            ],
            totalLabel: "Order Total",
            cardTitle: "Sushi Order",
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
        }
    },
    tattoo: {
        icon: "🎨",
        customerIcon: "👤",
        voice: "onyx",
        color: "#1f2937",
        cardIcon: "fa-pen-nib",
        quickActions: [
            {
                emoji: "🎨",
                label: "Book",
                text: "I want to get a tattoo"
            },
            {
                emoji: "🖼️",
                label: "Design",
                text: "I have a design idea"
            },
            {
                emoji: "🔄",
                label: "Cover-up",
                text: "I need a cover-up"
            }
        ],
        menuItems: [
            {
                emoji: "✨",
                name: "Small Tattoo",
                desc: "2-3 hour session",
                price: 200
            },
            {
                emoji: "🎨",
                name: "Medium Piece",
                desc: "4-5 hour session",
                price: 400
            },
            {
                emoji: "🖼️",
                name: "Large Piece",
                desc: "Per hour rate",
                price: 150
            },
            {
                emoji: "💬",
                name: "Consultation",
                desc: "Free design chat",
                price: 0
            }
        ],
        stepInfos: [
            "📞 Mike answers ready to create something awesome!",
            "🎨 Discussing design, size and placement.",
            "✅ Booking consultation or session time.",
            "🎉 Locked in! Get ready for some sick ink!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "type"
            },
            {
                delay: 2500,
                type: "design"
            },
            {
                delay: 2500,
                type: "sizePlacement"
            },
            {
                delay: 2500,
                type: "consultation"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Ink Masters Studio",
            aiName: "Mike",
            steps: [
                "Call",
                "Consult",
                "Confirm",
                "Done"
            ],
            totalLabel: "Session",
            cardTitle: "Tattoo Booking",
            responses: {
                greeting: "Hi, I'm looking to get a tattoo",
                type: "New tattoo, first one actually",
                design: "I'm thinking a small geometric design",
                sizePlacement: "About 3 inches, on my forearm",
                consultation: "Yeah, a consult would be good first",
                datetime: "This weekend if possible",
                name: "Tyler",
                phone: "0434 567 890",
                confirm: "Yeah, lock it in"
            }
        }
    },
    tutoring: {
        icon: "📚",
        customerIcon: "👤",
        voice: "nova",
        color: "#6366f1",
        cardIcon: "fa-graduation-cap",
        quickActions: [
            {
                emoji: "📚",
                label: "Tutor",
                text: "I need a tutor for my child"
            },
            {
                emoji: "🔢",
                label: "Maths",
                text: "We need maths tutoring"
            },
            {
                emoji: "📝",
                label: "Exam",
                text: "Help with exam preparation"
            }
        ],
        menuItems: [
            {
                emoji: "🧒",
                name: "Primary",
                desc: "Years 1-6",
                price: 50
            },
            {
                emoji: "👦",
                name: "High School",
                desc: "Years 7-10",
                price: 60
            },
            {
                emoji: "🎓",
                name: "VCE/HSC",
                desc: "Year 11-12 specialist",
                price: 75
            },
            {
                emoji: "👥",
                name: "Group Session",
                desc: "Max 4 students",
                price: 35
            }
        ],
        stepInfos: [
            "📞 Amy's team is ready to help your child succeed!",
            "📚 Discussing subject, level and learning goals.",
            "✅ Matching with the perfect tutor.",
            "🎉 Tutor matched! Learning journey begins!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "student"
            },
            {
                delay: 2500,
                type: "subject"
            },
            {
                delay: 2500,
                type: "level"
            },
            {
                delay: 2500,
                type: "goals"
            },
            {
                delay: 2500,
                type: "schedule"
            },
            {
                delay: 2000,
                type: "name"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "BrightMinds Tutoring",
            aiName: "Amy",
            steps: [
                "Call",
                "Match",
                "Confirm",
                "Done"
            ],
            totalLabel: "Session",
            cardTitle: "Tutoring Booking",
            responses: {
                greeting: "Hi, I'm looking for a tutor for my son",
                student: "He's in Year 10",
                subject: "Maths, he's struggling with algebra",
                level: "Year 10, VCE prep",
                goals: "We want him to improve his grades and confidence",
                schedule: "Twice a week, after school",
                name: "Karen Mitchell",
                phone: "0412 345 678",
                confirm: "Yes, please match us with a tutor"
            }
        }
    },
    vet: {
        icon: "🐕",
        customerIcon: "👤",
        voice: "shimmer",
        color: "#14b8a6",
        cardIcon: "fa-paw",
        quickActions: [
            {
                emoji: "🐾",
                label: "Book",
                text: "I need to book a vet appointment"
            },
            {
                emoji: "🚨",
                label: "Emergency",
                text: "My pet needs urgent care"
            },
            {
                emoji: "💉",
                label: "Vaccines",
                text: "I need to update vaccinations"
            }
        ],
        menuItems: [
            {
                emoji: "🩺",
                name: "Consultation",
                desc: "General checkup",
                price: 75
            },
            {
                emoji: "💉",
                name: "Vaccination",
                desc: "Annual vaccines",
                price: 95
            },
            {
                emoji: "✂️",
                name: "Desexing",
                desc: "Surgical procedure",
                price: 300
            },
            {
                emoji: "🦷",
                name: "Dental Clean",
                desc: "Pet dental care",
                price: 350
            }
        ],
        stepInfos: [
            "📞 Bella answers with love for all furry friends!",
            "🐾 Getting pet details, symptoms and urgency level.",
            "✅ Confirming owner details and pet information.",
            "🎉 Appointment booked! See you at the clinic."
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "petType"
            },
            {
                delay: 2500,
                type: "reason"
            },
            {
                delay: 2500,
                type: "datetime"
            },
            {
                delay: 2000,
                type: "petName"
            },
            {
                delay: 2000,
                type: "ownerName"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Paws & Claws Vet Clinic",
            aiName: "Bella",
            steps: [
                "Call",
                "Book",
                "Confirm",
                "Done"
            ],
            totalLabel: "Consult",
            cardTitle: "Vet Appointment",
            responses: {
                greeting: "Hi, I need to book an appointment for my dog",
                petType: "He's a golden retriever named Max",
                reason: "He's been scratching a lot and seems uncomfortable",
                datetime: "As soon as possible please",
                petName: "Max",
                ownerName: "Sarah Johnson",
                phone: "0412 345 678",
                confirm: "Yes, that's all correct"
            }
        }
    },
    wedding: {
        icon: "💒",
        customerIcon: "👤",
        voice: "nova",
        color: "#f43f5e",
        cardIcon: "fa-heart",
        quickActions: [
            {
                emoji: "💒",
                label: "Plan",
                text: "We need wedding planning help"
            },
            {
                emoji: "📅",
                label: "Date",
                text: "We have a date, need a planner"
            },
            {
                emoji: "💰",
                label: "Packages",
                text: "What packages do you offer?"
            }
        ],
        menuItems: [
            {
                emoji: "👑",
                name: "Full Planning",
                desc: "Complete service",
                price: 5000
            },
            {
                emoji: "📋",
                name: "Partial",
                desc: "Selected services",
                price: 2500
            },
            {
                emoji: "📅",
                name: "Day-of",
                desc: "Coordination only",
                price: 1500
            },
            {
                emoji: "💕",
                name: "Elopement",
                desc: "Intimate package",
                price: 800
            }
        ],
        stepInfos: [
            "📞 Grace answers with wedding excitement!",
            "💒 Discussing date, venue and vision.",
            "✅ Matching to the perfect planning package.",
            "🎉 Consultation booked! Let's plan your dream day!"
        ],
        demoScript: [
            {
                delay: 2000,
                type: "greeting"
            },
            {
                delay: 2500,
                type: "date"
            },
            {
                delay: 2500,
                type: "venue"
            },
            {
                delay: 2500,
                type: "guests"
            },
            {
                delay: 2500,
                type: "services"
            },
            {
                delay: 2500,
                type: "budget"
            },
            {
                delay: 2000,
                type: "coupleNames"
            },
            {
                delay: 2000,
                type: "phone"
            },
            {
                delay: 2000,
                type: "confirm"
            }
        ],
        en: {
            name: "Forever After Weddings",
            aiName: "Grace",
            steps: [
                "Call",
                "Plan",
                "Confirm",
                "Done"
            ],
            totalLabel: "Package",
            cardTitle: "Consultation",
            responses: {
                greeting: "Hi, we're getting married and need help planning",
                date: "We're looking at October next year",
                venue: "We have a venue, it's at the Grand Hotel",
                guests: "About 120 guests",
                services: "Full planning and coordination",
                budget: "Around $30,000 all up",
                coupleNames: "James and Emily",
                phone: "0478 901 234",
                confirm: "Yes, let's book a consultation"
            }
        }
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const getIndustry = () => Industries[window.AppState?.State?.currentIndustry] || Industries.restaurant;
const getIndustryLang = () => getIndustry().en;
const getCurrency = () => '$';

// Make available globally
window.Industries = Industries;
window.getIndustry = getIndustry;
window.getIndustryLang = getIndustryLang;
window.getCurrency = getCurrency;
