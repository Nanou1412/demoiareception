// ============================================
// AI RECEPTIONIST - ENHANCED DEMO
// With customer voice simulation & improved flow
// ============================================

const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// DOM Elements
const conversation = document.getElementById('conversation');
const userInput = document.getElementById('userInput');
const voiceBtn = document.getElementById('voiceBtn');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const callStatus = document.getElementById('callStatus');
const callTimer = document.getElementById('callTimer');

// Process elements
const processSteps = document.querySelectorAll('.process-step');
const processLines = document.querySelectorAll('.process-line');

// Stats
const messageCountEl = document.getElementById('messageCount');
const orderTotalEl = document.getElementById('orderTotal');
const callDurationEl = document.getElementById('callDuration');

// Info
const stepInfoEl = document.getElementById('stepInfo');

// Cards
const smsCard = document.getElementById('smsCard');
const ticketCard = document.getElementById('ticketCard');
const smsPreview = document.getElementById('smsPreview');
const ticketPreview = document.getElementById('ticketPreview');
const smsStatus = document.getElementById('smsStatus');
const ticketStatus = document.getElementById('ticketStatus');

// Industry selector
const industryBtns = document.querySelectorAll('.industry-btn');
let currentIndustry = 'restaurant';

// State
let messageCount = 0;
let callStartTime = null;
let callTimerInterval = null;
let currentStep = 0;
let isAutoDemoMode = false;
let isSpeaking = false;
let currentAudio = null;
let orderTotal = 0;

// ============================================
// INDUSTRY CONFIGURATION
// ============================================
const industryConfig = {
    restaurant: {
        name: 'Aussie Bites Cafe',
        aiName: 'Emma',
        aiAvatar: '👩‍🍳',
        customerAvatar: '👤',
        aiVoice: 'shimmer',
        stepLabels: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        confirmCard: 'Kitchen Ticket',
        color: '#ef4444',
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
        responses: {
            greeting: ["Hi, I'd like to place an order for pickup please"],
            orderItem: ["I'll have the Halloumi Salad please"],
            moreItems: ["Yeah, add some Onion Rings too"],
            noMore: ["That's all thanks"],
            pickupTime: ["About 20 minutes"],
            name: ["Sarah"],
            phone: ["0412 345 678"],
            confirm: ["Yep, perfect!"]
        }
    },
    salon: {
        name: 'Luxe Hair Studio',
        aiName: 'Sophie',
        aiAvatar: '💇‍♀️',
        customerAvatar: '👤',
        aiVoice: 'nova',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Service',
        confirmCard: 'Appointment',
        color: '#ec4899',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'stylist' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Hi, I'd like to book an appointment please"],
            service: ["I need a cut and colour"],
            stylist: ["Anyone available is fine"],
            datetime: ["This Saturday afternoon if possible"],
            name: ["Jessica"],
            phone: ["0423 456 789"],
            confirm: ["That sounds perfect, thanks!"]
        }
    },
    medical: {
        name: 'Wellness Medical Centre',
        aiName: 'Rachel',
        aiAvatar: '👩‍⚕️',
        customerAvatar: '👤',
        aiVoice: 'alloy',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Consult',
        confirmCard: 'Appointment',
        color: '#06b6d4',
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
        responses: {
            greeting: ["Hi, I'd like to book an appointment with a GP"],
            service: ["Just a general checkup"],
            doctor: ["Any doctor available is fine"],
            datetime: ["Tomorrow morning if you have anything"],
            name: ["Michael Thompson"],
            dob: ["15th of March 1985"],
            phone: ["0434 567 890"],
            confirm: ["Yes, that's all correct"]
        }
    },
    garage: {
        name: 'Aussie Auto Care',
        aiName: 'Mike',
        aiAvatar: '🔧',
        customerAvatar: '👤',
        aiVoice: 'onyx',
        stepLabels: ['Call', 'Service', 'Confirm', 'Done'],
        totalLabel: 'Service',
        confirmCard: 'Job Card',
        color: '#f59e0b',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'vehicle' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["G'day, I need to book my car in for a service"],
            service: ["Just a basic service and maybe check the brakes"],
            vehicle: ["It's a 2019 Toyota Camry"],
            datetime: ["Can I bring it in Monday morning?"],
            name: ["Dave Wilson"],
            phone: ["0445 678 901"],
            confirm: ["Yeah, all good mate!"]
        }
    },
    hotel: {
        name: 'Harbour View Hotel',
        aiName: 'Claire',
        aiAvatar: '🏨',
        customerAvatar: '👤',
        aiVoice: 'shimmer',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Booking',
        confirmCard: 'Reservation',
        color: '#8b5cf6',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'roomType' },
            { delay: 2500, type: 'dates' },
            { delay: 2500, type: 'guests' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Hi, I'd like to book a room please"],
            roomType: ["A double room with ocean view if available"],
            dates: ["From the 15th to the 18th of January"],
            guests: ["Just two adults"],
            name: ["Robert Chen"],
            phone: ["0456 789 012"],
            confirm: ["That's perfect, thank you!"]
        }
    },
    pizza: {
        name: 'Mario\'s Pizzeria',
        aiName: 'Tony',
        aiAvatar: '🍕',
        customerAvatar: '👤',
        aiVoice: 'echo',
        stepLabels: ['Call', 'Order', 'Confirm', 'Done'],
        totalLabel: 'Order Total',
        confirmCard: 'Kitchen Order',
        color: '#dc2626',
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
        responses: {
            greeting: ["Hey, I'd like to order some pizza for delivery"],
            orderItem: ["Can I get a large Margherita"],
            moreItems: ["And a garlic bread too"],
            noMore: ["That's everything"],
            delivery: ["Delivery please"],
            address: ["42 Smith Street, Richmond"],
            phone: ["0467 890 123"],
            confirm: ["Yep, all good!"]
        }
    },
    gym: {
        name: 'FitLife Gym',
        aiName: 'Jake',
        aiAvatar: '🏋️',
        customerAvatar: '👤',
        aiVoice: 'onyx',
        stepLabels: ['Call', 'Enquire', 'Confirm', 'Done'],
        totalLabel: 'Membership',
        confirmCard: 'Trial Pass',
        color: '#22c55e',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'interest' },
            { delay: 2500, type: 'experience' },
            { delay: 2500, type: 'trialTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Hi, I'm interested in joining the gym"],
            interest: ["I'm looking to get fit and maybe do some weights"],
            experience: ["I've been to gyms before, intermediate level"],
            trialTime: ["This weekend would be great"],
            name: ["Alex Murphy"],
            phone: ["0478 901 234"],
            confirm: ["Sounds great, see you then!"]
        }
    },
    vet: {
        name: 'Happy Paws Vet Clinic',
        aiName: 'Dr. Sarah',
        aiAvatar: '🐕',
        customerAvatar: '👤',
        aiVoice: 'nova',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Consult',
        confirmCard: 'Appointment',
        color: '#14b8a6',
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
        responses: {
            greeting: ["Hi, I need to book an appointment for my pet"],
            petType: ["It's a dog, a golden retriever"],
            reason: ["Just the annual checkup and vaccinations"],
            datetime: ["Thursday afternoon if possible"],
            petName: ["His name is Max"],
            ownerName: ["I'm Emma Wilson"],
            phone: ["0489 012 345"],
            confirm: ["Perfect, we'll be there!"]
        }
    },
    dental: {
        name: 'Smile Bright Dental',
        aiName: 'Grace',
        aiAvatar: '🦷',
        customerAvatar: '👤',
        aiVoice: 'nova',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Treatment',
        confirmCard: 'Appointment',
        color: '#0ea5e9',
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
        responses: {
            greeting: ["Hi, I'd like to book a dental appointment"],
            reason: ["Just a regular checkup and clean"],
            dentist: ["Anyone available is fine"],
            datetime: ["Next Tuesday morning"],
            name: ["Jennifer Brown"],
            insurance: ["Yes, I have Medibank"],
            phone: ["0490 123 456"],
            confirm: ["That's all correct, thanks!"]
        }
    },
    lawyer: {
        name: 'Harper & Associates',
        aiName: 'Victoria',
        aiAvatar: '⚖️',
        customerAvatar: '👤',
        aiVoice: 'onyx',
        stepLabels: ['Call', 'Consult', 'Confirm', 'Done'],
        totalLabel: 'Consultation',
        confirmCard: 'Appointment',
        color: '#64748b',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'matter' },
            { delay: 2500, type: 'lawyer' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Hi, I need to speak with a lawyer about a property matter"],
            matter: ["It's regarding a property settlement"],
            lawyer: ["Whoever is available for this type of case"],
            datetime: ["Early next week if possible"],
            name: ["David Richardson"],
            phone: ["0401 234 567"],
            confirm: ["Yes, that's confirmed, thank you"]
        }
    },
    realestate: {
        name: 'Prestige Properties',
        aiName: 'Marcus',
        aiAvatar: '🏠',
        customerAvatar: '👤',
        aiVoice: 'echo',
        stepLabels: ['Call', 'Enquire', 'Confirm', 'Done'],
        totalLabel: 'Inspection',
        confirmCard: 'Viewing Booked',
        color: '#059669',
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
        responses: {
            greeting: ["Hi, I'm looking to buy a property in the area"],
            interest: ["Looking to buy, a family home"],
            requirements: ["3 bedrooms, ideally with a backyard"],
            budget: ["Around 800k to 950k"],
            datetime: ["Saturday afternoon would be great"],
            name: ["Sophie Anderson"],
            phone: ["0412 345 678"],
            confirm: ["Perfect, I'll be there!"]
        }
    },
    spa: {
        name: 'Tranquil Waters Spa',
        aiName: 'Serena',
        aiAvatar: '🧘',
        customerAvatar: '👤',
        aiVoice: 'shimmer',
        stepLabels: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Treatment',
        confirmCard: 'Spa Booking',
        color: '#a855f7',
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
        responses: {
            greeting: ["Hi, I'd like to book a spa treatment"],
            treatment: ["A Swedish massage please"],
            duration: ["90 minutes would be lovely"],
            datetime: ["This Sunday morning if possible"],
            therapist: ["Female therapist please"],
            name: ["Michelle Taylor"],
            phone: ["0423 456 789"],
            confirm: ["Wonderful, thank you so much!"]
        }
    }
};

// ============================================
// FRENCH INDUSTRY CONFIGURATION
// ============================================
const industryConfigFr = {
    restaurant: {
        name: 'Le Petit Bistro',
        aiName: 'Marie',
        aiAvatar: '👩‍🍳',
        customerAvatar: '👤',
        aiVoice: 'shimmer',
        stepLabels: ['Appel', 'Commande', 'Confirmer', 'Terminé'],
        totalLabel: 'Total',
        confirmCard: 'Ticket Cuisine',
        color: '#ef4444',
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
        responses: {
            greeting: ["Bonjour, je voudrais passer une commande à emporter s'il vous plaît"],
            orderItem: ["Je vais prendre la Salade César s'il vous plaît"],
            moreItems: ["Oui, ajoutez aussi des frites"],
            noMore: ["Ce sera tout, merci"],
            pickupTime: ["Dans environ 20 minutes"],
            name: ["Sophie"],
            phone: ["06 12 34 56 78"],
            confirm: ["Oui, c'est parfait !"]
        }
    },
    salon: {
        name: 'Salon Élégance',
        aiName: 'Camille',
        aiAvatar: '💇‍♀️',
        customerAvatar: '👤',
        aiVoice: 'nova',
        stepLabels: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
        totalLabel: 'Service',
        confirmCard: 'Rendez-vous',
        color: '#ec4899',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'stylist' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Bonjour, je voudrais prendre rendez-vous s'il vous plaît"],
            service: ["J'aimerais une coupe et une couleur"],
            stylist: ["Peu importe, celui qui est disponible"],
            datetime: ["Samedi après-midi si possible"],
            name: ["Isabelle"],
            phone: ["06 23 45 67 89"],
            confirm: ["C'est parfait, merci beaucoup !"]
        }
    },
    medical: {
        name: 'Centre Médical Santé Plus',
        aiName: 'Claire',
        aiAvatar: '👩‍⚕️',
        customerAvatar: '👤',
        aiVoice: 'alloy',
        stepLabels: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
        totalLabel: 'Consultation',
        confirmCard: 'Rendez-vous',
        color: '#06b6d4',
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
        responses: {
            greeting: ["Bonjour, je voudrais prendre rendez-vous avec un médecin"],
            service: ["C'est pour un bilan de santé général"],
            doctor: ["N'importe quel médecin disponible"],
            datetime: ["Demain matin si vous avez quelque chose"],
            name: ["Jean-Pierre Dubois"],
            dob: ["15 mars 1985"],
            phone: ["06 34 56 78 90"],
            confirm: ["Oui, c'est bien noté"]
        }
    },
    garage: {
        name: 'Garage Auto Plus',
        aiName: 'Marc',
        aiAvatar: '🔧',
        customerAvatar: '👤',
        aiVoice: 'onyx',
        stepLabels: ['Appel', 'Service', 'Confirmer', 'Terminé'],
        totalLabel: 'Service',
        confirmCard: 'Ordre de Réparation',
        color: '#f59e0b',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'service' },
            { delay: 2500, type: 'vehicle' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Bonjour, je voudrais faire réviser ma voiture"],
            service: ["Une révision complète et vérifier les freins"],
            vehicle: ["C'est une Peugeot 308 de 2019"],
            datetime: ["Lundi matin, ça serait possible ?"],
            name: ["Pierre Martin"],
            phone: ["06 45 67 89 01"],
            confirm: ["Parfait, c'est noté !"]
        }
    },
    hotel: {
        name: 'Hôtel Belle Vue',
        aiName: 'Juliette',
        aiAvatar: '🏨',
        customerAvatar: '👤',
        aiVoice: 'shimmer',
        stepLabels: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
        totalLabel: 'Réservation',
        confirmCard: 'Réservation',
        color: '#8b5cf6',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'roomType' },
            { delay: 2500, type: 'dates' },
            { delay: 2500, type: 'guests' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Bonjour, je voudrais réserver une chambre"],
            roomType: ["Une chambre double avec vue sur mer si possible"],
            dates: ["Du 15 au 18 janvier"],
            guests: ["Nous serons deux adultes"],
            name: ["Robert Lefèvre"],
            phone: ["06 56 78 90 12"],
            confirm: ["C'est parfait, merci !"]
        }
    },
    pizza: {
        name: 'Pizza Napoli',
        aiName: 'Antonio',
        aiAvatar: '🍕',
        customerAvatar: '👤',
        aiVoice: 'echo',
        stepLabels: ['Appel', 'Commande', 'Confirmer', 'Terminé'],
        totalLabel: 'Total',
        confirmCard: 'Commande Cuisine',
        color: '#dc2626',
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
        responses: {
            greeting: ["Bonsoir, je voudrais commander des pizzas en livraison"],
            orderItem: ["Une grande Margherita s'il vous plaît"],
            moreItems: ["Et aussi du pain à l'ail"],
            noMore: ["Ce sera tout"],
            delivery: ["En livraison s'il vous plaît"],
            address: ["42 rue de la Paix, Paris"],
            phone: ["06 67 89 01 23"],
            confirm: ["Oui, c'est bon !"]
        }
    },
    gym: {
        name: 'Fitness Club',
        aiName: 'Lucas',
        aiAvatar: '🏋️',
        customerAvatar: '👤',
        aiVoice: 'onyx',
        stepLabels: ['Appel', 'Info', 'Confirmer', 'Terminé'],
        totalLabel: 'Abonnement',
        confirmCard: 'Pass Essai',
        color: '#22c55e',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'interest' },
            { delay: 2500, type: 'experience' },
            { delay: 2500, type: 'trialTime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Bonjour, je suis intéressé par un abonnement"],
            interest: ["Je veux me remettre en forme, faire de la musculation"],
            experience: ["J'ai déjà fait de la salle, niveau intermédiaire"],
            trialTime: ["Ce weekend serait parfait"],
            name: ["Alexandre Martin"],
            phone: ["06 78 90 12 34"],
            confirm: ["Super, à bientôt alors !"]
        }
    },
    vet: {
        name: 'Clinique Vétérinaire des Animaux',
        aiName: 'Dr. Sophie',
        aiAvatar: '🐕',
        customerAvatar: '👤',
        aiVoice: 'nova',
        stepLabels: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
        totalLabel: 'Consultation',
        confirmCard: 'Rendez-vous',
        color: '#14b8a6',
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
        responses: {
            greeting: ["Bonjour, je voudrais prendre rendez-vous pour mon animal"],
            petType: ["C'est un chien, un labrador"],
            reason: ["Pour le bilan annuel et les vaccins"],
            datetime: ["Jeudi après-midi si possible"],
            petName: ["Il s'appelle Oscar"],
            ownerName: ["Je suis Marie Dupont"],
            phone: ["06 89 01 23 45"],
            confirm: ["Parfait, on sera là !"]
        }
    },
    dental: {
        name: 'Cabinet Dentaire du Sourire',
        aiName: 'Nathalie',
        aiAvatar: '🦷',
        customerAvatar: '👤',
        aiVoice: 'nova',
        stepLabels: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
        totalLabel: 'Soin',
        confirmCard: 'Rendez-vous',
        color: '#0ea5e9',
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
        responses: {
            greeting: ["Bonjour, je voudrais prendre rendez-vous chez le dentiste"],
            reason: ["Pour un détartrage et un contrôle"],
            dentist: ["Peu importe le praticien"],
            datetime: ["Mardi prochain le matin"],
            name: ["Catherine Bernard"],
            insurance: ["Oui, j'ai une mutuelle"],
            phone: ["06 90 12 34 56"],
            confirm: ["C'est noté, merci !"]
        }
    },
    lawyer: {
        name: 'Cabinet Juridique Conseil',
        aiName: 'Maître Laurent',
        aiAvatar: '⚖️',
        customerAvatar: '👤',
        aiVoice: 'onyx',
        stepLabels: ['Appel', 'Consulter', 'Confirmer', 'Terminé'],
        totalLabel: 'Consultation',
        confirmCard: 'Rendez-vous',
        color: '#64748b',
        demoScript: [
            { delay: 2000, type: 'greeting' },
            { delay: 2500, type: 'matter' },
            { delay: 2500, type: 'lawyer' },
            { delay: 2500, type: 'datetime' },
            { delay: 2000, type: 'name' },
            { delay: 2000, type: 'phone' },
            { delay: 2000, type: 'confirm' }
        ],
        responses: {
            greeting: ["Bonjour, j'aurais besoin de consulter un avocat"],
            matter: ["C'est concernant un litige immobilier"],
            lawyer: ["Celui qui est spécialisé dans ce domaine"],
            datetime: ["Début de semaine prochaine si possible"],
            name: ["François Moreau"],
            phone: ["06 01 23 45 67"],
            confirm: ["Très bien, c'est confirmé"]
        }
    },
    realestate: {
        name: 'Immobilier Prestige',
        aiName: 'Philippe',
        aiAvatar: '🏠',
        customerAvatar: '👤',
        aiVoice: 'echo',
        stepLabels: ['Appel', 'Info', 'Confirmer', 'Terminé'],
        totalLabel: 'Visite',
        confirmCard: 'Visite Programmée',
        color: '#059669',
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
        responses: {
            greeting: ["Bonjour, je cherche à acheter un bien immobilier"],
            interest: ["Je souhaite acheter une maison familiale"],
            requirements: ["3 chambres minimum, avec jardin"],
            budget: ["Entre 400 000 et 500 000 euros"],
            datetime: ["Samedi après-midi serait idéal"],
            name: ["Émilie Rousseau"],
            phone: ["06 12 34 56 78"],
            confirm: ["Parfait, j'y serai !"]
        }
    },
    spa: {
        name: 'Spa Sérénité',
        aiName: 'Léa',
        aiAvatar: '🧘',
        customerAvatar: '👤',
        aiVoice: 'shimmer',
        stepLabels: ['Appel', 'Réserver', 'Confirmer', 'Terminé'],
        totalLabel: 'Soin',
        confirmCard: 'Réservation Spa',
        color: '#a855f7',
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
        responses: {
            greeting: ["Bonjour, je voudrais réserver un soin"],
            treatment: ["Un massage relaxant s'il vous plaît"],
            duration: ["90 minutes ce serait parfait"],
            datetime: ["Dimanche matin si possible"],
            therapist: ["Une masseuse de préférence"],
            name: ["Aurélie Petit"],
            phone: ["06 23 45 67 89"],
            confirm: ["Merveilleux, merci beaucoup !"]
        }
    }
};

// Current language
let currentLanguage = 'en';

// Translations
const translations = {
    en: {
        title: 'AI Receptionist',
        subtitle: 'Experience how our AI receptionist handles calls naturally - with voice, personality, and zero wait times.',
        tryIt: 'Try It Yourself',
        watchDemo: 'Watch Demo',
        call: 'Call',
        confirm: 'Confirm',
        done: 'Done',
        messages: 'Messages',
        callTime: 'Call Time',
        customerSMS: 'Customer SMS',
        pending: 'Pending',
        sent: 'Sent',
        incomingCall: 'Incoming Call...',
        onCall: 'On Call',
        callEnded: 'Call Ended',
        typeOrSpeak: 'Type or speak...',
        whatHappening: "What's Happening",
        stepInfo: 'The AI is ready to answer the call and greet the customer naturally.'
    },
    fr: {
        title: 'Réceptionniste IA',
        subtitle: 'Découvrez comment notre réceptionniste IA gère les appels naturellement - avec voix, personnalité et zéro attente.',
        tryIt: 'Essayez vous-même',
        watchDemo: 'Voir la démo',
        call: 'Appel',
        confirm: 'Confirmer',
        done: 'Terminé',
        messages: 'Messages',
        callTime: 'Durée',
        customerSMS: 'SMS Client',
        pending: 'En attente',
        sent: 'Envoyé',
        incomingCall: 'Appel entrant...',
        onCall: 'En ligne',
        callEnded: 'Appel terminé',
        typeOrSpeak: 'Tapez ou parlez...',
        whatHappening: 'Ce qui se passe',
        stepInfo: "L'IA est prête à répondre et accueillir le client naturellement."
    }
};

// Get translation
function t(key) {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
}

// Theme
let isDarkMode = true;

// Get current industry config based on language
function getConfig() {
    const configs = currentLanguage === 'fr' ? industryConfigFr : industryConfig;
    return configs[currentIndustry] || configs.restaurant;
}

// Update card titles based on industry and language
function updateCardTitles() {
    const config = getConfig();
    const ticketTitle = document.getElementById('ticketCardTitle');
    const ticketIcon = document.getElementById('ticketCardIcon');
    const smsCardTitle = document.getElementById('smsCardTitle');
    
    // Card titles per industry - English
    const cardTitlesEn = {
        restaurant: { title: 'Kitchen Ticket', icon: 'fa-receipt' },
        pizza: { title: 'Kitchen Order', icon: 'fa-pizza-slice' },
        salon: { title: 'Appointment Card', icon: 'fa-calendar-check' },
        medical: { title: 'Booking Slip', icon: 'fa-notes-medical' },
        dental: { title: 'Dental Appointment', icon: 'fa-tooth' },
        vet: { title: 'Pet Visit Card', icon: 'fa-paw' },
        garage: { title: 'Job Card', icon: 'fa-car' },
        hotel: { title: 'Reservation', icon: 'fa-bed' },
        gym: { title: 'Membership Card', icon: 'fa-dumbbell' },
        spa: { title: 'Spa Booking', icon: 'fa-spa' },
        lawyer: { title: 'Consultation', icon: 'fa-gavel' },
        realestate: { title: 'Viewing Booked', icon: 'fa-home' }
    };
    
    // Card titles per industry - French
    const cardTitlesFr = {
        restaurant: { title: 'Ticket Cuisine', icon: 'fa-receipt' },
        pizza: { title: 'Commande Cuisine', icon: 'fa-pizza-slice' },
        salon: { title: 'Fiche Rendez-vous', icon: 'fa-calendar-check' },
        medical: { title: 'Fiche Patient', icon: 'fa-notes-medical' },
        dental: { title: 'RDV Dentaire', icon: 'fa-tooth' },
        vet: { title: 'Fiche Visite', icon: 'fa-paw' },
        garage: { title: 'Ordre Réparation', icon: 'fa-car' },
        hotel: { title: 'Réservation', icon: 'fa-bed' },
        gym: { title: 'Carte Membre', icon: 'fa-dumbbell' },
        spa: { title: 'Réservation Spa', icon: 'fa-spa' },
        lawyer: { title: 'Consultation', icon: 'fa-gavel' },
        realestate: { title: 'Visite Programmée', icon: 'fa-home' }
    };
    
    const cardTitles = currentLanguage === 'fr' ? cardTitlesFr : cardTitlesEn;
    const cardInfo = cardTitles[currentIndustry] || cardTitles.restaurant;
    
    if (ticketTitle) ticketTitle.textContent = cardInfo.title;
    if (ticketIcon) {
        ticketIcon.className = `fas ${cardInfo.icon}`;
    }
    if (smsCardTitle) {
        smsCardTitle.textContent = currentLanguage === 'fr' ? 'SMS Client' : 'Customer SMS';
    }
}

// ============================================
// VOICE SYNTHESIS - Using OpenAI TTS
// ============================================

// Cache for customer voice audio
let customerVoiceEnabled = true;

async function speakAsCustomer(text) {
    if (!customerVoiceEnabled) return Promise.resolve();
    
    return new Promise(async (resolve) => {
        try {
            isSpeaking = true;
            
            // Use OpenAI TTS for customer voice (different voice)
            const response = await fetch('/api/chat/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text, 
                    voice: 'echo',  // Male voice for customer
                    speed: 1.0
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.audio) {
                    const audio = new Audio('data:audio/mp3;base64,' + data.audio);
                    audio.volume = 1.0;
                    
                    audio.onended = () => {
                        isSpeaking = false;
                        resolve();
                    };
                    audio.onerror = () => {
                        isSpeaking = false;
                        resolve();
                    };
                    
                    await audio.play();
                    return;
                }
            }
            
            // Fallback to browser TTS
            await speakWithBrowserTTS(text, 'customer');
            isSpeaking = false;
            resolve();
            
        } catch (error) {
            console.error('Customer TTS error:', error);
            isSpeaking = false;
            resolve();
        }
    });
}

async function speakWithBrowserTTS(text, role = 'ai') {
    return new Promise(async (resolve) => {
        const synthesis = window.speechSynthesis;
        if (!synthesis) {
            resolve();
            return;
        }
        
        synthesis.cancel();
        
        const voices = await getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        
        if (role === 'customer') {
            // Male voice for customer
            const voice = voices.find(v => 
                v.name.includes('Daniel') || 
                v.name.includes('Alex') ||
                (v.lang.includes('en') && v.name.toLowerCase().includes('male'))
            ) || voices.find(v => v.lang.startsWith('en'));
            if (voice) utterance.voice = voice;
            utterance.pitch = 0.9;
            utterance.rate = 1.0;
        } else {
            // Female voice for AI
            const voice = voices.find(v => 
                v.name.includes('Karen') || 
                v.name.includes('Samantha') ||
                (v.lang.includes('en') && v.name.toLowerCase().includes('female'))
            ) || voices.find(v => v.lang.startsWith('en'));
            if (voice) utterance.voice = voice;
            utterance.pitch = 1.1;
            utterance.rate = 1.05;
        }
        
        utterance.lang = 'en-AU';
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        
        synthesis.speak(utterance);
    });
}

function getVoices() {
    return new Promise(resolve => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
        } else {
            speechSynthesis.onvoiceschanged = () => {
                resolve(speechSynthesis.getVoices());
            };
        }
    });
}

async function speakAsAI(text) {
    return new Promise(async (resolve) => {
        const synthesis = window.speechSynthesis;
        if (!synthesis) {
            resolve();
            return;
        }
        
        synthesis.cancel();
        
        const voices = await getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find a natural female voice for AI
        const aiVoice = voices.find(v => 
            v.name.includes('Samantha') || 
            v.name.includes('Karen') ||
            v.name.includes('Tessa') ||
            (v.lang.includes('en-AU'))
        ) || voices.find(v => v.lang.startsWith('en'));
        
        if (aiVoice) utterance.voice = aiVoice;
        utterance.lang = 'en-AU';
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        
        isSpeaking = true;
        utterance.onend = () => {
            isSpeaking = false;
            resolve();
        };
        utterance.onerror = () => {
            isSpeaking = false;
            resolve();
        };
        
        synthesis.speak(utterance);
    });
}

// Play OpenAI TTS audio
async function playAIAudio(audioBase64) {
    return new Promise((resolve) => {
        if (!audioBase64) {
            resolve();
            return;
        }
        
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        const audio = new Audio('data:audio/mp3;base64,' + audioBase64);
        currentAudio = audio;
        isSpeaking = true;
        
        audio.onended = () => {
            isSpeaking = false;
            currentAudio = null;
            resolve();
        };
        
        audio.onerror = () => {
            isSpeaking = false;
            currentAudio = null;
            resolve();
        };
        
        audio.play().catch(() => {
            isSpeaking = false;
            resolve();
        });
    });
}

// ============================================
// SPEECH RECOGNITION
// ============================================
let recognition = null;
let isListening = false;
let autoListenEnabled = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-AU';

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        userInput.value = transcript;
        
        if (event.results[event.results.length - 1].isFinal) {
            handleUserMessage(transcript.trim());
            userInput.value = '';
        }
    };

    recognition.onend = () => {
        isListening = false;
        voiceBtn.classList.remove('listening');
    };

    recognition.onerror = () => {
        isListening = false;
        voiceBtn.classList.remove('listening');
    };
}

function toggleListening() {
    if (isListening) {
        recognition?.stop();
        isListening = false;
        voiceBtn.classList.remove('listening');
    } else if (recognition && !isSpeaking) {
        recognition.start();
        isListening = true;
        voiceBtn.classList.add('listening');
    }
}

// ============================================
// TIMER
// ============================================
function startCallTimer() {
    callStartTime = Date.now();
    callStatus.textContent = 'On Call';
    
    callTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
        callTimer.textContent = timeStr;
        callDurationEl.textContent = timeStr;
    }, 1000);
}

function stopCallTimer() {
    if (callTimerInterval) {
        clearInterval(callTimerInterval);
        callTimerInterval = null;
    }
}

// ============================================
// PROCESS STEPS
// ============================================
function updateProcessStep(step) {
    currentStep = step;
    
    processSteps.forEach((ps, i) => {
        ps.classList.remove('active', 'completed');
        if (i < step) ps.classList.add('completed');
        else if (i === step) ps.classList.add('active');
    });
    
    processLines.forEach((line, i) => {
        line.classList.toggle('active', i < step);
    });
    
    // Update info text based on language
    const infosEn = [
        "📞 The AI answers the call instantly and greets the customer naturally.",
        "🍽️ The AI is taking the order, asking questions and building the cart.",
        "✅ Confirming order details, pickup time, and customer information.",
        "🎉 Order complete! SMS sent to customer, ticket printed in kitchen."
    ];
    const infosFr = [
        "📞 L'IA répond à l'appel instantanément et accueille le client naturellement.",
        "🍽️ L'IA prend la commande, pose des questions et construit le panier.",
        "✅ Confirmation des détails, heure de retrait et informations client.",
        "🎉 Commande terminée ! SMS envoyé au client, ticket imprimé en cuisine."
    ];
    const infos = currentLanguage === 'fr' ? infosFr : infosEn;
    stepInfoEl.textContent = infos[step] || infos[0];
}

// ============================================
// CHAT UI
// ============================================
function addMessage(text, isAI = true, speakIt = true) {
    const config = getConfig();
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isAI ? 'ai' : 'user'}`;
    
    const avatar = isAI ? config.aiAvatar : config.customerAvatar;
    const customerLabel = currentLanguage === 'fr' ? 'Client' : 'Customer';
    const speaker = isAI ? `${config.aiName} - ${config.name}` : customerLabel;
    
    msgDiv.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div>
            <div class="msg-bubble">${text}</div>
            <div class="msg-speaker">
                <i class="fas fa-volume-up"></i>
                ${speaker}
            </div>
        </div>
    `;
    
    conversation.appendChild(msgDiv);
    conversation.scrollTop = conversation.scrollHeight;
    
    messageCount++;
    messageCountEl.textContent = messageCount;
    
    // Extract order total from conversation
    const totalMatch = text.match(/\$(\d+)/);
    if (totalMatch && isAI) {
        orderTotal = parseInt(totalMatch[1]);
        orderTotalEl.textContent = '$' + orderTotal;
    }
    
    return msgDiv;
}

function showTyping() {
    typingIndicator.classList.add('visible');
    conversation.scrollTop = conversation.scrollHeight;
}

function hideTyping() {
    typingIndicator.classList.remove('visible');
}

// ============================================
// API COMMUNICATION
// ============================================
async function sendToAI(message = null) {
    showTyping();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message, 
                sessionId, 
                industry: currentIndustry,
                language: currentLanguage 
            })
        });
        
        const data = await response.json();
        hideTyping();
        
        if (data.error) {
            const errorMsg = currentLanguage === 'fr' 
                ? 'Désolé, problème technique. Réessayez ?' 
                : 'Sorry, having technical difficulties. Try again?';
            addMessage(errorMsg, true, false);
            return null;
        }
        
        addMessage(data.response, true, false);
        
        // Update process step based on conversation
        if (currentStep === 0) updateProcessStep(1);
        
        // Play audio
        if (data.audio) {
            await playAIAudio(data.audio);
        } else {
            await speakAsAI(data.response);
        }
        
        // Handle confirmation
        if (data.isConfirmed) {
            handleOrderConfirmed();
        }
        
        return data;
        
    } catch (error) {
        hideTyping();
        console.error('API Error:', error);
        return null;
    }
}

async function resetConversation() {
    try {
        await fetch('/api/chat/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
        });
    } catch (e) {}
}

// ============================================
// USER MESSAGE HANDLING
// ============================================
async function handleUserMessage(text) {
    if (!text.trim()) return;
    
    // Add user message
    addMessage(text, false, false);
    
    // Speak as customer (in auto-demo mode)
    if (isAutoDemoMode) {
        await speakAsCustomer(text);
    }
    
    // Update process
    if (currentStep < 2) updateProcessStep(2);
    
    // Send to AI
    await sendToAI(text);
}

// ============================================
// ORDER CONFIRMATION
// ============================================
function handleOrderConfirmed() {
    const config = getConfig();
    updateProcessStep(3);
    
    // Activate cards
    smsCard.classList.add('active');
    ticketCard.classList.add('active');
    smsStatus.textContent = currentLanguage === 'fr' ? '✓ Envoyé' : '✓ Sent';
    smsStatus.classList.add('sent');
    ticketStatus.textContent = currentLanguage === 'fr' ? '✓ Fait' : '✓ Done';
    ticketStatus.classList.add('sent');
    
    // Generate SMS based on industry and language
    const orderNum = Math.floor(Math.random() * 900) + 100;
    const now = new Date();
    const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-AU';
    const currency = currentLanguage === 'fr' ? '€' : '$';
    
    const smsTemplatesEn = {
        restaurant: `<div class="sms-content">G'day! 🎉<br><br>Your order from <strong>${config.name}</strong> is confirmed!<br><br><strong>Total:</strong> $${orderTotal}<br><strong>Pickup:</strong> As requested<br><br>Thanks mate! See you soon! 🙏</div>`,
        pizza: `<div class="sms-content">Bellissimo! 🍕<br><br>Your pizza order from <strong>${config.name}</strong> is confirmed!<br><br><strong>Total:</strong> $${orderTotal}<br><br>Your delicious pizza is on its way! 🛵</div>`,
        salon: `<div class="sms-content">Hey gorgeous! 💇‍♀️<br><br>Your appointment at <strong>${config.name}</strong> is confirmed!<br><br>We'll see you at your scheduled time.<br><br>Can't wait to make you look fabulous! ✨</div>`,
        medical: `<div class="sms-content">Hello,<br><br>Your appointment at <strong>${config.name}</strong> is confirmed.<br><br>Please arrive 10 minutes early with your Medicare card.<br><br>See you soon! 🏥</div>`,
        dental: `<div class="sms-content">Hello! 🦷<br><br>Your dental appointment at <strong>${config.name}</strong> is confirmed!<br><br>Remember to brush before your visit! 😊<br><br>See you soon!</div>`,
        vet: `<div class="sms-content">Hello! 🐾<br><br>Your pet's appointment at <strong>${config.name}</strong> is confirmed!<br><br>We can't wait to meet your furry friend! 🐕<br><br>See you soon!</div>`,
        garage: `<div class="sms-content">G'day mate! 🔧<br><br>Your service booking at <strong>${config.name}</strong> is confirmed!<br><br>Bring the car in at your scheduled time.<br><br>She'll be right! 🚗</div>`,
        hotel: `<div class="sms-content">Welcome! 🏨<br><br>Your reservation at <strong>${config.name}</strong> is confirmed!<br><br>Check-in from 2PM. We look forward to hosting you!<br><br>Safe travels! ✨</div>`,
        gym: `<div class="sms-content">Let's go! 💪<br><br>You're all set at <strong>${config.name}</strong>!<br><br>Get ready to crush your fitness goals!<br><br>See you at the gym! 🏋️</div>`,
        spa: `<div class="sms-content">Namaste 🧘<br><br>Your relaxation awaits at <strong>${config.name}</strong>!<br><br>Please arrive 15 minutes early to unwind.<br><br>Pure bliss awaits... ✨</div>`,
        lawyer: `<div class="sms-content">Good day,<br><br>Your consultation at <strong>${config.name}</strong> is confirmed.<br><br>Please bring any relevant documents.<br><br>Regards ⚖️</div>`,
        realestate: `<div class="sms-content">Exciting news! 🏠<br><br>Your property viewing with <strong>${config.name}</strong> is confirmed!<br><br>We can't wait to show you around!<br><br>See you there! 🔑</div>`
    };
    
    const smsTemplatesFr = {
        restaurant: `<div class="sms-content">Bonjour ! 🎉<br><br>Votre commande chez <strong>${config.name}</strong> est confirmée !<br><br><strong>Total :</strong> ${orderTotal}€<br><strong>Retrait :</strong> Comme convenu<br><br>Merci et à bientôt ! 🙏</div>`,
        pizza: `<div class="sms-content">Bellissimo ! 🍕<br><br>Votre commande de pizza chez <strong>${config.name}</strong> est confirmée !<br><br><strong>Total :</strong> ${orderTotal}€<br><br>Votre délicieuse pizza arrive ! 🛵</div>`,
        salon: `<div class="sms-content">Bonjour ! 💇‍♀️<br><br>Votre rendez-vous chez <strong>${config.name}</strong> est confirmé !<br><br>Nous vous attendons à l'heure prévue.<br><br>Vous allez être magnifique ! ✨</div>`,
        medical: `<div class="sms-content">Bonjour,<br><br>Votre rendez-vous au <strong>${config.name}</strong> est confirmé.<br><br>Merci d'arriver 10 minutes en avance avec votre carte vitale.<br><br>À bientôt ! 🏥</div>`,
        dental: `<div class="sms-content">Bonjour ! 🦷<br><br>Votre rendez-vous dentaire chez <strong>${config.name}</strong> est confirmé !<br><br>Pensez à vous brosser les dents avant ! 😊<br><br>À bientôt !</div>`,
        vet: `<div class="sms-content">Bonjour ! 🐾<br><br>Le rendez-vous de votre animal chez <strong>${config.name}</strong> est confirmé !<br><br>Nous avons hâte de rencontrer votre compagnon ! 🐕<br><br>À bientôt !</div>`,
        garage: `<div class="sms-content">Bonjour ! 🔧<br><br>Votre rendez-vous chez <strong>${config.name}</strong> est confirmé !<br><br>Amenez votre véhicule à l'heure convenue.<br><br>À bientôt ! 🚗</div>`,
        hotel: `<div class="sms-content">Bienvenue ! 🏨<br><br>Votre réservation à <strong>${config.name}</strong> est confirmée !<br><br>Arrivée à partir de 14h. Nous nous réjouissons de vous accueillir !<br><br>Bon voyage ! ✨</div>`,
        gym: `<div class="sms-content">C'est parti ! 💪<br><br>Vous êtes inscrit(e) chez <strong>${config.name}</strong> !<br><br>Préparez-vous à atteindre vos objectifs !<br><br>À très vite ! 🏋️</div>`,
        spa: `<div class="sms-content">Namaste 🧘<br><br>Votre moment de détente vous attend chez <strong>${config.name}</strong> !<br><br>Merci d'arriver 15 minutes en avance.<br><br>Relaxation garantie... ✨</div>`,
        lawyer: `<div class="sms-content">Bonjour,<br><br>Votre consultation chez <strong>${config.name}</strong> est confirmée.<br><br>Merci d'apporter les documents nécessaires.<br><br>Cordialement ⚖️</div>`,
        realestate: `<div class="sms-content">Bonne nouvelle ! 🏠<br><br>Votre visite avec <strong>${config.name}</strong> est confirmée !<br><br>Nous avons hâte de vous faire découvrir ce bien !<br><br>À bientôt ! 🔑</div>`
    };
    
    const smsTemplates = currentLanguage === 'fr' ? smsTemplatesFr : smsTemplatesEn;
    smsPreview.innerHTML = smsTemplates[currentIndustry] || smsTemplates.restaurant;
    
    // Generate ticket/confirmation based on industry and language
    const ticketTemplatesEn = {
        restaurant: `<div class="ticket-content"><h4>🍽️ ORDER #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</p><div class="ticket-item"><span>Items:</span><span>As ordered</span></div><div class="ticket-item"><span>Total:</span><span>$${orderTotal}</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** PICKUP ***</p></div>`,
        pizza: `<div class="ticket-content"><h4>🍕 PIZZA ORDER #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</p><div class="ticket-item"><span>Pizzas:</span><span>As ordered</span></div><div class="ticket-item"><span>Total:</span><span>$${orderTotal}</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** DELIVERY ***</p></div>`,
        salon: `<div class="ticket-content"><h4>💇 APPOINTMENT #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Service:</span><span>Cut & Style</span></div><div class="ticket-item"><span>Stylist:</span><span>Assigned</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p></div>`,
        medical: `<div class="ticket-content"><h4>🏥 BOOKING #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Type:</span><span>GP Consult</span></div><div class="ticket-item"><span>Doctor:</span><span>Assigned</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p></div>`,
        dental: `<div class="ticket-content"><h4>🦷 DENTAL APPT #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Treatment:</span><span>Check-up</span></div><div class="ticket-item"><span>Dentist:</span><span>Assigned</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p></div>`,
        vet: `<div class="ticket-content"><h4>🐾 VET VISIT #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Pet:</span><span>Registered</span></div><div class="ticket-item"><span>Reason:</span><span>Check-up</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p></div>`,
        garage: `<div class="ticket-content"><h4>🔧 JOB CARD #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Service:</span><span>As discussed</span></div><div class="ticket-item"><span>Vehicle:</span><span>Booked in</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** SERVICE BOOKED ***</p></div>`,
        hotel: `<div class="ticket-content"><h4>🏨 RESERVATION #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Room:</span><span>Reserved</span></div><div class="ticket-item"><span>Guests:</span><span>As booked</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p></div>`,
        gym: `<div class="ticket-content"><h4>🏋️ MEMBERSHIP #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Type:</span><span>Trial Pass</span></div><div class="ticket-item"><span>Access:</span><span>Full Gym</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** LET'S GO! ***</p></div>`,
        spa: `<div class="ticket-content"><h4>🧘 SPA BOOKING #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Treatment:</span><span>Massage</span></div><div class="ticket-item"><span>Duration:</span><span>As booked</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** RELAX & ENJOY ***</p></div>`,
        lawyer: `<div class="ticket-content"><h4>⚖️ CONSULT #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Matter:</span><span>As discussed</span></div><div class="ticket-item"><span>Solicitor:</span><span>Assigned</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p></div>`,
        realestate: `<div class="ticket-content"><h4>🏠 VIEWING #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Property:</span><span>Scheduled</span></div><div class="ticket-item"><span>Agent:</span><span>Assigned</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** SEE YOU THERE ***</p></div>`
    };
    
    const ticketTemplatesFr = {
        restaurant: `<div class="ticket-content"><h4>🍽️ COMMANDE #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</p><div class="ticket-item"><span>Articles :</span><span>Comme commandé</span></div><div class="ticket-item"><span>Total :</span><span>${orderTotal}€</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** À EMPORTER ***</p></div>`,
        pizza: `<div class="ticket-content"><h4>🍕 COMMANDE PIZZA #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</p><div class="ticket-item"><span>Pizzas :</span><span>Comme commandé</span></div><div class="ticket-item"><span>Total :</span><span>${orderTotal}€</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** LIVRAISON ***</p></div>`,
        salon: `<div class="ticket-content"><h4>💇 RENDEZ-VOUS #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Service :</span><span>Coupe & Couleur</span></div><div class="ticket-item"><span>Coiffeur :</span><span>Assigné</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMÉ ***</p></div>`,
        medical: `<div class="ticket-content"><h4>🏥 RENDEZ-VOUS #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Type :</span><span>Consultation</span></div><div class="ticket-item"><span>Médecin :</span><span>Assigné</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMÉ ***</p></div>`,
        dental: `<div class="ticket-content"><h4>🦷 RDV DENTAIRE #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Soin :</span><span>Contrôle</span></div><div class="ticket-item"><span>Dentiste :</span><span>Assigné</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMÉ ***</p></div>`,
        vet: `<div class="ticket-content"><h4>🐾 VISITE VÉTO #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Animal :</span><span>Enregistré</span></div><div class="ticket-item"><span>Motif :</span><span>Bilan</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMÉ ***</p></div>`,
        garage: `<div class="ticket-content"><h4>🔧 ORDRE RÉPARATION #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Service :</span><span>Comme convenu</span></div><div class="ticket-item"><span>Véhicule :</span><span>Enregistré</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** RDV CONFIRMÉ ***</p></div>`,
        hotel: `<div class="ticket-content"><h4>🏨 RÉSERVATION #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Chambre :</span><span>Réservée</span></div><div class="ticket-item"><span>Personnes :</span><span>Comme réservé</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMÉ ***</p></div>`,
        gym: `<div class="ticket-content"><h4>🏋️ ABONNEMENT #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Type :</span><span>Pass Essai</span></div><div class="ticket-item"><span>Accès :</span><span>Complet</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** C'EST PARTI ! ***</p></div>`,
        spa: `<div class="ticket-content"><h4>🧘 RÉSERVATION SPA #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Soin :</span><span>Massage</span></div><div class="ticket-item"><span>Durée :</span><span>Comme réservé</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** DÉTENTE ***</p></div>`,
        lawyer: `<div class="ticket-content"><h4>⚖️ CONSULTATION #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Affaire :</span><span>Comme discuté</span></div><div class="ticket-item"><span>Avocat :</span><span>Assigné</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMÉ ***</p></div>`,
        realestate: `<div class="ticket-content"><h4>🏠 VISITE #${orderNum}</h4><p style="text-align:center;color:#666;font-size:0.75rem;">${now.toLocaleDateString(locale)}</p><div class="ticket-item"><span>Bien :</span><span>Programmé</span></div><div class="ticket-item"><span>Agent :</span><span>Assigné</span></div><p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** À BIENTÔT ***</p></div>`
    };
    
    const ticketTemplates = currentLanguage === 'fr' ? ticketTemplatesFr : ticketTemplatesEn;
    ticketPreview.innerHTML = ticketTemplates[currentIndustry] || ticketTemplates.restaurant;
    
    // Stop call timer after a delay
    setTimeout(() => {
        callStatus.textContent = currentLanguage === 'fr' ? 'Appel terminé' : 'Call Ended';
        stopCallTimer();
    }, 2000);
    
    // Stop auto demo
    isAutoDemoMode = false;
}

// ============================================
// AUTO-DEMO
// ============================================

function getRandomResponse(type) {
    const config = getConfig();
    const responses = config.responses[type] || [];
    return responses[Math.floor(Math.random() * responses.length)] || "Yes";
}

// Track what stage we're at in the demo
let demoStage = 0;

async function runAutoDemo() {
    isAutoDemoMode = true;
    demoStage = 0;
    
    const config = getConfig();
    
    // Reset everything
    await resetConversation();
    conversation.innerHTML = '';
    messageCount = 0;
    orderTotal = 0;
    messageCountEl.textContent = '0';
    orderTotalEl.textContent = '$0';
    updateProcessStep(0);
    
    // Reset cards
    smsCard.classList.remove('active');
    ticketCard.classList.remove('active');
    smsStatus.textContent = 'Pending';
    smsStatus.classList.remove('sent');
    ticketStatus.textContent = 'Pending';
    ticketStatus.classList.remove('sent');
    smsPreview.innerHTML = '<div class="sms-placeholder"><i class="fas fa-message"></i><span>SMS appears after confirmation</span></div>';
    ticketPreview.innerHTML = '<div class="ticket-placeholder"><i class="fas fa-print"></i><span>Ticket prints after confirmation</span></div>';
    
    // Start call
    startCallTimer();
    
    // AI greeting
    await sendToAI(null);
    
    // Get demo sequence for current industry
    const demoSequence = config.demoScript;
    
    for (let i = 0; i < demoSequence.length && isAutoDemoMode; i++) {
        // Wait for delay
        await new Promise(resolve => setTimeout(resolve, demoSequence[i].delay));
        
        // Wait for AI to stop speaking
        while (isSpeaking) {
            await new Promise(r => setTimeout(r, 100));
        }
        
        if (!isAutoDemoMode) break;
        
        // Get appropriate response
        const response = getRandomResponse(demoSequence[i].type);
        await handleUserMessage(response);
        
        // Check if we're done (order confirmed)
        if (!isAutoDemoMode) break;
        
        // Wait a bit after AI responds
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// ============================================
// INTERACTIVE MODE
// ============================================
async function startInteractiveMode() {
    isAutoDemoMode = false;
    
    // Reset
    await resetConversation();
    conversation.innerHTML = '';
    messageCount = 0;
    orderTotal = 0;
    messageCountEl.textContent = '0';
    orderTotalEl.textContent = '$0';
    updateProcessStep(0);
    
    // Reset cards
    smsCard.classList.remove('active');
    ticketCard.classList.remove('active');
    smsStatus.textContent = 'Pending';
    smsStatus.classList.remove('sent');
    ticketStatus.textContent = 'Pending';
    ticketStatus.classList.remove('sent');
    smsPreview.innerHTML = '<div class="sms-placeholder"><i class="fas fa-message"></i><span>SMS appears after confirmation</span></div>';
    ticketPreview.innerHTML = '<div class="ticket-placeholder"><i class="fas fa-print"></i><span>Ticket prints after confirmation</span></div>';
    
    // Start call
    startCallTimer();
    
    // AI greeting
    await sendToAI(null);
    
    // Scroll to demo
    document.querySelector('.demo-section').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// ROI CALCULATOR
// ============================================
function calculateROI() {
    const missed = parseInt(document.getElementById('missedCalls').value) || 0;
    const avgOrder = parseInt(document.getElementById('avgOrder').value) || 0;
    const hourly = parseInt(document.getElementById('hourlyRate').value) || 0;
    
    const revenue = missed * avgOrder * 30;
    const labour = hourly * 4 * 30; // 4 hours/day
    const total = revenue + labour;
    
    document.getElementById('revenueRecovered').textContent = '$' + revenue.toLocaleString();
    document.getElementById('labourSaved').textContent = '$' + labour.toLocaleString();
    document.getElementById('totalSavings').textContent = '$' + total.toLocaleString();
    document.getElementById('roiResults').classList.remove('hidden');
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Preload voices
    if (window.speechSynthesis) {
        speechSynthesis.getVoices();
    }
    
    // Industry selector
    industryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            industryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update current industry
            currentIndustry = btn.dataset.industry;
            
            // Reset conversation for new industry
            resetConversation();
            conversation.innerHTML = '';
            messageCount = 0;
            orderTotal = 0;
            messageCountEl.textContent = '0';
            orderTotalEl.textContent = '$0';
            updateProcessStep(0);
            
            // Update UI for selected industry
            const config = getConfig();
            console.log(`Switched to ${config.name} (${currentIndustry})`);
            
            // Update card titles based on industry
            updateCardTitles();
            
            // Update stats
            sessionStats.industries[currentIndustry] = (sessionStats.industries[currentIndustry] || 0) + 1;
        });
    });
    
    // Initialize card titles
    updateCardTitles();
    
    // Demo buttons
    document.getElementById('startInteractive')?.addEventListener('click', startInteractiveMode);
    document.getElementById('startAutoDemo')?.addEventListener('click', runAutoDemo);
    
    // Send
    sendBtn?.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) {
            handleUserMessage(text);
            userInput.value = '';
        }
    });
    
    // Enter key
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = userInput.value.trim();
            if (text) {
                handleUserMessage(text);
                userInput.value = '';
            }
        }
    });
    
    // Voice
    voiceBtn?.addEventListener('click', toggleListening);
    
    // Quick actions
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.text;
            if (text) handleUserMessage(text);
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
        if (e.target.id === 'roiModal') {
            e.target.classList.remove('visible');
        }
    });
    
    document.getElementById('calculateROI')?.addEventListener('click', calculateROI);
    
    // ============================================
    // NEW FEATURES EVENT LISTENERS
    // ============================================
    
    // Theme Toggle
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
        const icon = document.querySelector('#themeToggle i');
        if (icon) icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // Language Toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLanguage = btn.dataset.lang;
            updateLanguage();
        });
    });
    
    // Fullscreen Toggle
    document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            document.body.classList.add('fullscreen-mode');
        } else {
            document.exitFullscreen();
            document.body.classList.remove('fullscreen-mode');
        }
    });
    
    // Stats Modal
    document.getElementById('statsBtn')?.addEventListener('click', () => {
        updateStatsDisplay();
        document.getElementById('statsModal')?.classList.add('visible');
    });
    
    document.getElementById('closeStatsModal')?.addEventListener('click', () => {
        document.getElementById('statsModal')?.classList.remove('visible');
    });
    
    document.getElementById('statsModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'statsModal') {
            e.target.classList.remove('visible');
        }
    });
    
    // Scenario Selector
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentScenario = btn.dataset.scenario;
            console.log(`Scenario: ${currentScenario}`);
        });
    });
    
    // Export Button
    document.getElementById('exportBtn')?.addEventListener('click', exportConversation);
    
    // Initialize
    updateProcessStep(0);
});

// ============================================
// SESSION STATISTICS
// ============================================
const sessionStats = {
    totalCalls: 0,
    completedCalls: 0,
    totalMessages: 0,
    totalCallTime: 0,
    industries: {}
};

function updateStats() {
    sessionStats.totalMessages = messageCount;
}

function updateStatsDisplay() {
    document.getElementById('totalCalls').textContent = sessionStats.totalCalls;
    document.getElementById('completedCalls').textContent = sessionStats.completedCalls;
    document.getElementById('totalMessages').textContent = sessionStats.totalMessages;
    
    // Calculate average time
    if (sessionStats.completedCalls > 0) {
        const avgSeconds = Math.floor(sessionStats.totalCallTime / sessionStats.completedCalls);
        const mins = Math.floor(avgSeconds / 60);
        const secs = avgSeconds % 60;
        document.getElementById('avgCallTime').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Industry breakdown
    const industryStatsEl = document.getElementById('industryStats');
    if (industryStatsEl) {
        industryStatsEl.innerHTML = Object.entries(sessionStats.industries)
            .map(([ind, count]) => {
                const config = industryConfig[ind];
                return `<div class="industry-stat-item">${config?.aiAvatar || '📞'} ${config?.name || ind}: ${count}</div>`;
            }).join('');
    }
}

// ============================================
// SCENARIO HANDLING
// ============================================
let currentScenario = 'normal';

// ============================================
// LANGUAGE UPDATE
// ============================================
function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[currentLanguage]?.[key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });
}

// ============================================
// WAVEFORM ANIMATION
// ============================================
const waveformOverlay = document.getElementById('waveformOverlay');
const waveformLabel = document.getElementById('waveformLabel');

function showWaveform(label = 'AI Speaking...') {
    if (waveformOverlay) {
        waveformLabel.textContent = label;
        waveformOverlay.classList.add('active');
    }
}

function hideWaveform() {
    waveformOverlay?.classList.remove('active');
}

// ============================================
// EXPORT CONVERSATION
// ============================================
function exportConversation() {
    const messages = conversation.querySelectorAll('.message');
    if (messages.length === 0) {
        alert('No conversation to export. Start a demo first!');
        return;
    }
    
    const config = getConfig();
    let transcript = `AI RECEPTIONIST CONVERSATION TRANSCRIPT\n`;
    transcript += `========================================\n`;
    transcript += `Industry: ${config.name}\n`;
    transcript += `AI: ${config.aiName}\n`;
    transcript += `Date: ${new Date().toLocaleString()}\n`;
    transcript += `========================================\n\n`;
    
    messages.forEach(msg => {
        const isAI = msg.classList.contains('ai');
        const text = msg.querySelector('.msg-bubble')?.textContent || '';
        const speaker = isAI ? config.aiName : 'Customer';
        transcript += `${speaker}: ${text}\n\n`;
    });
    
    transcript += `========================================\n`;
    transcript += `Total Messages: ${messageCount}\n`;
    transcript += `Order Total: $${orderTotal}\n`;
    
    // Download as text file
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${currentIndustry}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
