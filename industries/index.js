// ============================================
// INDUSTRIES INDEX - Central Registry
// ============================================

// Food & Beverage
const restaurant = require('./restaurant');
const pizza = require('./pizza');
const bakery = require('./bakery');
const coffeeshop = require('./coffeeshop');
const sushi = require('./sushi');
const fastfood = require('./fastfood');
const icecream = require('./icecream');

// Health & Wellness
const medical = require('./medical');
const dental = require('./dental');
const salon = require('./salon');
const spa = require('./spa');
const massage = require('./massage');
const nailsalon = require('./nailsalon');
const optician = require('./optician');
const podiatrist = require('./podiatrist');
const pharmacy = require('./pharmacy');
const vet = require('./vet');

// Home Services
const cleaning = require('./cleaning');
const electrician = require('./electrician');
const plumber = require('./plumber');
const landscaping = require('./landscaping');
const locksmith = require('./locksmith');
const moving = require('./moving');
const garage = require('./garage');

// Professional Services
const lawyer = require('./lawyer');
const realestate = require('./realestate');
const tutoring = require('./tutoring');
const drivingschool = require('./drivingschool');

// Lifestyle & Events
const hotel = require('./hotel');
const gym = require('./gym');
const florist = require('./florist');
const photography = require('./photography');
const tattoo = require('./tattoo');
const petgrooming = require('./petgrooming');
const petboarding = require('./petboarding');
const daycare = require('./daycare');
const wedding = require('./wedding');
const eventvenue = require('./eventvenue');

// ============================================
// ALL INDUSTRIES OBJECT
// ============================================
const INDUSTRIES = {
    // Food & Beverage
    restaurant,
    pizza,
    bakery,
    coffeeshop,
    sushi,
    fastfood,
    icecream,

    // Health & Wellness
    medical,
    dental,
    salon,
    spa,
    massage,
    nailsalon,
    optician,
    podiatrist,
    pharmacy,
    vet,

    // Home Services
    cleaning,
    electrician,
    plumber,
    landscaping,
    locksmith,
    moving,
    garage,

    // Professional Services
    lawyer,
    realestate,
    tutoring,
    drivingschool,

    // Lifestyle & Events
    hotel,
    gym,
    florist,
    photography,
    tattoo,
    petgrooming,
    petboarding,
    daycare,
    wedding,
    eventvenue
};

// ============================================
// CATEGORIES
// ============================================
const CATEGORIES = {
    food: {
        name: 'Food & Beverage',
        icon: '🍽️',
        industries: ['restaurant', 'pizza', 'bakery', 'coffeeshop', 'sushi', 'fastfood', 'icecream']
    },
    health: {
        name: 'Health & Wellness',
        icon: '💆',
        industries: [
            'medical',
            'dental',
            'salon',
            'spa',
            'massage',
            'nailsalon',
            'optician',
            'podiatrist',
            'pharmacy',
            'vet'
        ]
    },
    services: {
        name: 'Home Services',
        icon: '🔧',
        industries: [
            'cleaning',
            'electrician',
            'plumber',
            'landscaping',
            'locksmith',
            'moving',
            'garage'
        ]
    },
    professional: {
        name: 'Professional',
        icon: '💼',
        industries: ['lawyer', 'realestate', 'tutoring', 'drivingschool']
    },
    lifestyle: {
        name: 'Lifestyle & Events',
        icon: '🎉',
        industries: [
            'hotel',
            'gym',
            'florist',
            'photography',
            'tattoo',
            'petgrooming',
            'petboarding',
            'daycare',
            'wedding',
            'eventvenue'
        ]
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get an industry by ID
 * @param {string} id - Industry ID
 * @returns {object} Industry configuration
 */
function getIndustry(id) {
    return INDUSTRIES[id] || INDUSTRIES.restaurant;
}

/**
 * Get system prompt for an industry
 * @param {string} id - Industry ID
 * @returns {string} System prompt
 */
function getSystemPrompt(id) {
    const industry = getIndustry(id);
    return industry.prompt;
}

/**
 * Get all industries as an array
 * @returns {array} Array of industry configurations
 */
function getAllIndustries() {
    return Object.values(INDUSTRIES);
}

/**
 * Get industries by category
 * @param {string} category - Category name
 * @returns {array} Array of industry configurations
 */
function getIndustriesByCategory(category) {
    const cat = CATEGORIES[category];
    if (!cat) return [];
    return cat.industries.map(id => INDUSTRIES[id]);
}

/**
 * Get all industry IDs
 * @returns {array} Array of industry IDs
 */
function getIndustryIds() {
    return Object.keys(INDUSTRIES);
}

/**
 * Get voice for an industry
 * @param {string} id - Industry ID
 * @returns {string} Voice name
 */
function getVoice(id) {
    const industry = getIndustry(id);
    return industry.voice || 'shimmer';
}

// ============================================
// EXPORTS
// ============================================
module.exports = {
    INDUSTRIES,
    CATEGORIES,
    getIndustry,
    getSystemPrompt,
    getAllIndustries,
    getIndustriesByCategory,
    getIndustryIds,
    getVoice
};
