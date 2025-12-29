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
    currentLanguage: 'en',
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
        },
        fr: {
            name: 'Le Petit Bistro',
            aiName: 'Marie',
            steps: ['Appel', 'Commande', 'Confirmer', 'Terminé'],
            totalLabel: 'Total',
            cardTitle: 'Ticket Cuisine',
            responses: {
                greeting: "Bonjour, je voudrais passer une commande à emporter s'il vous plaît",
                orderItem: "Je vais prendre la Salade César s'il vous plaît",
                moreItems: "Oui, ajoutez aussi des frites",
                noMore: "Ce sera tout, merci",
                pickupTime: "Dans environ 20 minutes",
                name: "Sophie",
                phone: "06 12 34 56 78",
                confirm: "Oui, c'est parfait !"
            }
        }
    },
    pizza: {
        icon: '🍕',
        customerIcon: '👤',
        voice: 'echo',
        color: '#dc2626',
        cardIcon: 'fa-pizza-slice',
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
        },
        fr: {
            name: 'Pizza Napoli',
            aiName: 'Antonio',
            steps: ['Appel', 'Commande', 'Confirmer', 'Terminé'],
            totalLabel: 'Total',
            cardTitle: 'Commande Cuisine',
            responses: {
                greeting: "Bonsoir, je voudrais commander des pizzas en livraison",
                orderItem: "Une grande Margherita s'il vous plaît",
                moreItems: "Et aussi du pain à l'ail",
                noMore: "Ce sera tout",
                delivery: "En livraison s'il vous plaît",
                address: "42 rue de la Paix, Paris",
                phone: "06 67 89 01 23",
                confirm: "Oui, c'est bon !"
            }
        }
    },
    salon: {
        icon: '💇‍♀️',
        customerIcon: '👤',
        voice: 'nova',
        color: '#ec4899',
        cardIcon: 'fa-calendar-check',
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
        },
        fr: {
            name: 'Salon Élégance',
            aiName: 'Camille',
            steps: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
            totalLabel: 'Service',
            cardTitle: 'Fiche Rendez-vous',
            responses: {
                greeting: "Bonjour, je voudrais prendre rendez-vous s'il vous plaît",
                service: "J'aimerais une coupe et une couleur",
                stylist: "Peu importe, celui qui est disponible",
                datetime: "Samedi après-midi si possible",
                name: "Isabelle",
                phone: "06 23 45 67 89",
                confirm: "C'est parfait, merci beaucoup !"
            }
        }
    },
    medical: {
        icon: '👩‍⚕️',
        customerIcon: '👤',
        voice: 'alloy',
        color: '#06b6d4',
        cardIcon: 'fa-notes-medical',
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
        },
        fr: {
            name: 'Centre Médical Santé Plus',
            aiName: 'Claire',
            steps: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
            totalLabel: 'Consultation',
            cardTitle: 'Fiche Patient',
            responses: {
                greeting: "Bonjour, je voudrais prendre rendez-vous avec un médecin",
                service: "C'est pour un bilan de santé général",
                doctor: "N'importe quel médecin disponible",
                datetime: "Demain matin si vous avez quelque chose",
                name: "Jean-Pierre Dubois",
                dob: "15 mars 1985",
                phone: "06 34 56 78 90",
                confirm: "Oui, c'est bien noté"
            }
        }
    },
    dental: {
        icon: '🦷',
        customerIcon: '👤',
        voice: 'nova',
        color: '#0ea5e9',
        cardIcon: 'fa-tooth',
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
        },
        fr: {
            name: 'Cabinet Dentaire du Sourire',
            aiName: 'Nathalie',
            steps: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
            totalLabel: 'Soin',
            cardTitle: 'RDV Dentaire',
            responses: {
                greeting: "Bonjour, je voudrais prendre rendez-vous chez le dentiste",
                reason: "Pour un détartrage et un contrôle",
                dentist: "Peu importe le praticien",
                datetime: "Mardi prochain le matin",
                name: "Catherine Bernard",
                insurance: "Oui, j'ai une mutuelle",
                phone: "06 90 12 34 56",
                confirm: "C'est noté, merci !"
            }
        }
    },
    vet: {
        icon: '🐕',
        customerIcon: '👤',
        voice: 'nova',
        color: '#14b8a6',
        cardIcon: 'fa-paw',
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
        },
        fr: {
            name: 'Clinique Vétérinaire des Animaux',
            aiName: 'Dr. Sophie',
            steps: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
            totalLabel: 'Consultation',
            cardTitle: 'Fiche Visite',
            responses: {
                greeting: "Bonjour, je voudrais prendre rendez-vous pour mon animal",
                petType: "C'est un chien, un labrador",
                reason: "Pour le bilan annuel et les vaccins",
                datetime: "Jeudi après-midi si possible",
                petName: "Il s'appelle Oscar",
                ownerName: "Je suis Marie Dupont",
                phone: "06 89 01 23 45",
                confirm: "Parfait, on sera là !"
            }
        }
    },
    garage: {
        icon: '🔧',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#f59e0b',
        cardIcon: 'fa-car',
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
        },
        fr: {
            name: 'Garage Auto Plus',
            aiName: 'Marc',
            steps: ['Appel', 'Service', 'Confirmer', 'Terminé'],
            totalLabel: 'Service',
            cardTitle: 'Ordre Réparation',
            responses: {
                greeting: "Bonjour, je voudrais faire réviser ma voiture",
                service: "Une révision complète et vérifier les freins",
                vehicle: "C'est une Peugeot 308 de 2019",
                datetime: "Lundi matin, ça serait possible ?",
                name: "Pierre Martin",
                phone: "06 45 67 89 01",
                confirm: "Parfait, c'est noté !"
            }
        }
    },
    hotel: {
        icon: '🏨',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#8b5cf6',
        cardIcon: 'fa-bed',
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
        },
        fr: {
            name: 'Hôtel Belle Vue',
            aiName: 'Juliette',
            steps: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
            totalLabel: 'Réservation',
            cardTitle: 'Réservation',
            responses: {
                greeting: "Bonjour, je voudrais réserver une chambre",
                roomType: "Une chambre double avec vue sur mer si possible",
                dates: "Du 15 au 18 janvier",
                guests: "Nous serons deux adultes",
                name: "Robert Lefèvre",
                phone: "06 56 78 90 12",
                confirm: "C'est parfait, merci !"
            }
        }
    },
    gym: {
        icon: '🏋️',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#22c55e',
        cardIcon: 'fa-dumbbell',
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
        },
        fr: {
            name: 'Fitness Club',
            aiName: 'Lucas',
            steps: ['Appel', 'Info', 'Confirmer', 'Terminé'],
            totalLabel: 'Abonnement',
            cardTitle: 'Pass Essai',
            responses: {
                greeting: "Bonjour, je suis intéressé par un abonnement",
                interest: "Je veux me remettre en forme, faire de la musculation",
                experience: "J'ai déjà fait de la salle, niveau intermédiaire",
                trialTime: "Ce weekend serait parfait",
                name: "Alexandre Martin",
                phone: "06 78 90 12 34",
                confirm: "Super, à bientôt alors !"
            }
        }
    },
    spa: {
        icon: '🧘',
        customerIcon: '👤',
        voice: 'shimmer',
        color: '#a855f7',
        cardIcon: 'fa-spa',
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
        },
        fr: {
            name: 'Spa Sérénité',
            aiName: 'Léa',
            steps: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
            totalLabel: 'Soin',
            cardTitle: 'Réservation Spa',
            responses: {
                greeting: "Bonjour, je voudrais réserver un soin",
                treatment: "Un massage relaxant s'il vous plaît",
                duration: "90 minutes ce serait parfait",
                datetime: "Dimanche matin si possible",
                therapist: "Une masseuse de préférence",
                name: "Aurélie Petit",
                phone: "06 23 45 67 89",
                confirm: "Merveilleux, merci beaucoup !"
            }
        }
    },
    lawyer: {
        icon: '⚖️',
        customerIcon: '👤',
        voice: 'onyx',
        color: '#64748b',
        cardIcon: 'fa-gavel',
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
        },
        fr: {
            name: 'Cabinet Juridique Conseil',
            aiName: 'Maître Laurent',
            steps: ['Appel', 'Consulter', 'Confirmer', 'Terminé'],
            totalLabel: 'Consultation',
            cardTitle: 'Consultation',
            responses: {
                greeting: "Bonjour, j'aurais besoin de consulter un avocat",
                matter: "C'est concernant un litige immobilier",
                lawyer: "Celui qui est spécialisé dans ce domaine",
                datetime: "Début de semaine prochaine si possible",
                name: "François Moreau",
                phone: "06 01 23 45 67",
                confirm: "Très bien, c'est confirmé"
            }
        }
    },
    realestate: {
        icon: '🏠',
        customerIcon: '👤',
        voice: 'echo',
        color: '#059669',
        cardIcon: 'fa-home',
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
        },
        fr: {
            name: 'Immobilier Prestige',
            aiName: 'Philippe',
            steps: ['Appel', 'Info', 'Confirmer', 'Terminé'],
            totalLabel: 'Visite',
            cardTitle: 'Visite Programmée',
            responses: {
                greeting: "Bonjour, je cherche à acheter un bien immobilier",
                interest: "Je souhaite acheter une maison familiale",
                requirements: "3 chambres minimum, avec jardin",
                budget: "Entre 400 000 et 500 000 euros",
                datetime: "Samedi après-midi serait idéal",
                name: "Émilie Rousseau",
                phone: "06 12 34 56 78",
                confirm: "Parfait, j'y serai !"
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
        stepInfos: [
            "📞 The AI answers the call instantly and greets the customer naturally.",
            "🍽️ The AI is taking the order, asking questions and building the cart.",
            "✅ Confirming order details, pickup time, and customer information.",
            "🎉 Order complete! SMS sent to customer, ticket printed in kitchen."
        ],
        smsPlaceholder: 'SMS appears after confirmation',
        ticketPlaceholder: 'Confirmation appears after booking',
        noConversation: 'No conversation to export. Start a demo first!'
    },
    fr: {
        title: 'Réceptionniste IA',
        subtitle: 'Découvrez comment notre réceptionniste IA gère les appels naturellement - avec voix, personnalité et zéro attente.',
        tryIt: 'Essayez vous-même',
        watchDemo: 'Voir la démo',
        messages: 'Messages',
        callTime: 'Durée',
        customerSMS: 'SMS Client',
        pending: 'En attente',
        sent: '✓ Envoyé',
        done: '✓ Fait',
        incomingCall: 'Appel entrant...',
        onCall: 'En ligne',
        callEnded: 'Appel terminé',
        typeOrSpeak: 'Tapez ou parlez...',
        whatHappening: 'Ce qui se passe',
        stepInfos: [
            "📞 L'IA répond à l'appel instantanément et accueille le client naturellement.",
            "🍽️ L'IA prend la commande, pose des questions et construit le panier.",
            "✅ Confirmation des détails, heure de retrait et informations client.",
            "🎉 Commande terminée ! SMS envoyé au client, ticket imprimé en cuisine."
        ],
        smsPlaceholder: 'SMS apparaît après confirmation',
        ticketPlaceholder: 'Confirmation apparaît après réservation',
        noConversation: 'Aucune conversation à exporter. Lancez une démo !'
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const t = (key) => Translations[State.currentLanguage]?.[key] || Translations.en[key] || key;

const getIndustry = () => Industries[State.currentIndustry] || Industries.restaurant;

const getIndustryLang = () => {
    const ind = getIndustry();
    return ind[State.currentLanguage] || ind.en;
};

const getCurrency = () => State.currentLanguage === 'fr' ? '€' : '$';

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
                || voices.find(v => v.lang.startsWith(State.currentLanguage === 'fr' ? 'fr' : 'en'));
            
            if (voice) utterance.voice = voice;
            utterance.lang = State.currentLanguage === 'fr' ? 'fr-FR' : 'en-AU';
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
                    industry: State.currentIndustry,
                    language: State.currentLanguage
                })
            });
            
            const data = await response.json();
            UI.hideTyping();
            
            if (data.error) {
                const errorMsg = State.currentLanguage === 'fr' 
                    ? 'Désolé, problème technique. Réessayez ?' 
                    : 'Sorry, having technical difficulties. Try again?';
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
        const customerLabel = State.currentLanguage === 'fr' ? 'Client' : 'Customer';
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
        
        const infos = t('stepInfos');
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
        
        // Update CSS variables for industry color
        this.updateIndustryColor();
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

    updateLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (Translations[State.currentLanguage]?.[key]) {
                el.textContent = Translations[State.currentLanguage][key];
            }
        });
        this.updateCardTitles();
    }
};

// ============================================
// TEMPLATES - SMS and Tickets
// ============================================
const Templates = {
    getSMS(industry, businessName, total, currency) {
        const lang = State.currentLanguage;
        const templates = {
            restaurant: lang === 'fr' 
                ? `<div class="sms-content">Bonjour ! 🎉<br><br>Votre commande chez <strong>${businessName}</strong> est confirmée !<br><br><strong>Total :</strong> ${total}${currency}<br><br>Merci et à bientôt ! 🙏</div>`
                : `<div class="sms-content">G'day! 🎉<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Thanks mate! See you soon! 🙏</div>`,
            pizza: lang === 'fr'
                ? `<div class="sms-content">Bellissimo ! 🍕<br><br>Votre commande chez <strong>${businessName}</strong> est confirmée !<br><br><strong>Total :</strong> ${total}${currency}<br><br>Votre pizza arrive ! 🛵</div>`
                : `<div class="sms-content">Bellissimo! 🍕<br><br>Your pizza order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Your delicious pizza is on its way! 🛵</div>`,
            salon: lang === 'fr'
                ? `<div class="sms-content">Bonjour ! 💇‍♀️<br><br>Votre rendez-vous chez <strong>${businessName}</strong> est confirmé !<br><br>Vous allez être magnifique ! ✨</div>`
                : `<div class="sms-content">Hey gorgeous! 💇‍♀️<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to make you look fabulous! ✨</div>`,
            medical: lang === 'fr'
                ? `<div class="sms-content">Bonjour,<br><br>Votre rendez-vous au <strong>${businessName}</strong> est confirmé.<br><br>Merci d'arriver 10 minutes en avance. 🏥</div>`
                : `<div class="sms-content">Hello,<br><br>Your appointment at <strong>${businessName}</strong> is confirmed.<br><br>Please arrive 10 minutes early. 🏥</div>`,
            dental: lang === 'fr'
                ? `<div class="sms-content">Bonjour ! 🦷<br><br>Votre rendez-vous chez <strong>${businessName}</strong> est confirmé !<br><br>À bientôt !</div>`
                : `<div class="sms-content">Hello! 🦷<br><br>Your dental appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you soon!</div>`,
            vet: lang === 'fr'
                ? `<div class="sms-content">Bonjour ! 🐾<br><br>Le rendez-vous chez <strong>${businessName}</strong> est confirmé !<br><br>À bientôt ! 🐕</div>`
                : `<div class="sms-content">Hello! 🐾<br><br>Your pet's appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you soon! 🐕</div>`,
            garage: lang === 'fr'
                ? `<div class="sms-content">Bonjour ! 🔧<br><br>Votre rendez-vous chez <strong>${businessName}</strong> est confirmé !<br><br>À bientôt ! 🚗</div>`
                : `<div class="sms-content">G'day mate! 🔧<br><br>Your service at <strong>${businessName}</strong> is confirmed!<br><br>She'll be right! 🚗</div>`,
            hotel: lang === 'fr'
                ? `<div class="sms-content">Bienvenue ! 🏨<br><br>Votre réservation à <strong>${businessName}</strong> est confirmée !<br><br>Bon voyage ! ✨</div>`
                : `<div class="sms-content">Welcome! 🏨<br><br>Your reservation at <strong>${businessName}</strong> is confirmed!<br><br>Safe travels! ✨</div>`,
            gym: lang === 'fr'
                ? `<div class="sms-content">C'est parti ! 💪<br><br>Vous êtes inscrit chez <strong>${businessName}</strong> !<br><br>À très vite ! 🏋️</div>`
                : `<div class="sms-content">Let's go! 💪<br><br>You're all set at <strong>${businessName}</strong>!<br><br>See you at the gym! 🏋️</div>`,
            spa: lang === 'fr'
                ? `<div class="sms-content">Namaste 🧘<br><br>Votre soin chez <strong>${businessName}</strong> est confirmé !<br><br>Détente garantie... ✨</div>`
                : `<div class="sms-content">Namaste 🧘<br><br>Your relaxation awaits at <strong>${businessName}</strong>!<br><br>Pure bliss awaits... ✨</div>`,
            lawyer: lang === 'fr'
                ? `<div class="sms-content">Bonjour,<br><br>Votre consultation chez <strong>${businessName}</strong> est confirmée.<br><br>Cordialement ⚖️</div>`
                : `<div class="sms-content">Good day,<br><br>Your consultation at <strong>${businessName}</strong> is confirmed.<br><br>Regards ⚖️</div>`,
            realestate: lang === 'fr'
                ? `<div class="sms-content">Bonne nouvelle ! 🏠<br><br>Votre visite avec <strong>${businessName}</strong> est confirmée !<br><br>À bientôt ! 🔑</div>`
                : `<div class="sms-content">Exciting news! 🏠<br><br>Your property viewing with <strong>${businessName}</strong> is confirmed!<br><br>See you there! 🔑</div>`
        };
        return templates[industry] || templates.restaurant;
    },

    getTicket(industry, orderNum, total, currency) {
        const lang = State.currentLanguage;
        const now = new Date();
        const locale = lang === 'fr' ? 'fr-FR' : 'en-AU';
        const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString(locale);
        
        const icons = { restaurant: '🍽️', pizza: '🍕', salon: '💇', medical: '🏥', dental: '🦷', vet: '🐾', garage: '🔧', hotel: '🏨', gym: '🏋️', spa: '🧘', lawyer: '⚖️', realestate: '🏠' };
        const icon = icons[industry] || '📋';
        
        const labels = lang === 'fr' 
            ? { order: 'COMMANDE', items: 'Articles', total: 'Total', confirmed: 'CONFIRMÉ', pickup: 'À EMPORTER', delivery: 'LIVRAISON' }
            : { order: 'ORDER', items: 'Items', total: 'Total', confirmed: 'CONFIRMED', pickup: 'PICKUP', delivery: 'DELIVERY' };
        
        const totalDisplay = lang === 'fr' ? `${total}${currency}` : `${currency}${total}`;
        
        return `<div class="ticket-content">
            <h4>${icon} ${labels.order} #${orderNum}</h4>
            <p style="text-align:center;color:#666;font-size:0.75rem;">${time}</p>
            <div class="ticket-item"><span>${labels.items}:</span><span>✓</span></div>
            <div class="ticket-item"><span>${labels.total}:</span><span>${totalDisplay}</span></div>
            <p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** ${labels.confirmed} ***</p>
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
            State.recognition.lang = State.currentLanguage === 'fr' ? 'fr-FR' : 'en-AU';

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
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Preload voices
    if (window.speechSynthesis) speechSynthesis.getVoices();
    
    // Init speech recognition
    SpeechManager.init();
    
    // Industry selector
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
    
    // Initialize
    UI.updateCardTitles();
    UI.updateProcessStep(0);
    
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
    
    // Theme Toggle
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        State.isDarkMode = !State.isDarkMode;
        document.body.classList.toggle('dark-mode', State.isDarkMode);
        document.body.classList.toggle('light-mode', !State.isDarkMode);
        const icon = document.querySelector('#themeToggle i');
        if (icon) icon.className = State.isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // Language Toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            State.currentLanguage = btn.dataset.lang;
            UI.updateLanguage();
            if (State.recognition) State.recognition.lang = State.currentLanguage === 'fr' ? 'fr-FR' : 'en-AU';
        });
    });
    
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
});

