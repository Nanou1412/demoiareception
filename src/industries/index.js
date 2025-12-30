/**
 * Industries Index v2.0
 * ======================
 * Exports all available industries for the AI receptionist demo
 */

// Restaurant & Food
import restaurant from './restaurant.js';
import pizza from './pizza.js';
import sushi from './sushi.js';
import coffeeshop from './coffeeshop.js';
import fastfood from './fastfood.js';
import icecream from './icecream.js';
import bakery from './bakery.js';

// Beauty & Wellness
import salon from './salon.js';
import spa from './spa.js';
import massage from './massage.js';
import nailsalon from './nailsalon.js';
import tattoo from './tattoo.js';

// Health & Medical
import dental from './dental.js';
import medical from './medical.js';
import vet from './vet.js';
import pharmacy from './pharmacy.js';
import optician from './optician.js';
import podiatrist from './podiatrist.js';

// Services & Trades
import hotel from './hotel.js';
import garage from './garage.js';
import gym from './gym.js';
import plumber from './plumber.js';
import electrician from './electrician.js';
import cleaning from './cleaning.js';
import landscaping from './landscaping.js';
import locksmith from './locksmith.js';
import moving from './moving.js';

// Professional Services
import lawyer from './lawyer.js';
import realestate from './realestate.js';
import drivingschool from './drivingschool.js';
import tutoring from './tutoring.js';
import photography from './photography.js';

// Pet Services
import petgrooming from './petgrooming.js';
import petboarding from './petboarding.js';

// Family & Events
import daycare from './daycare.js';
import wedding from './wedding.js';
import eventvenue from './eventvenue.js';

// Commerce
import florist from './florist.js';

/**
 * All industries organized by category
 */
export const industriesByCategory = {
    restaurant: [
        restaurant,
        pizza,
        sushi,
        coffeeshop,
        fastfood,
        icecream
    ],
    commerce: [
        bakery,
        florist
    ],
    beauty: [
        salon,
        spa,
        massage,
        nailsalon,
        tattoo
    ],
    health: [
        dental,
        medical,
        vet,
        pharmacy,
        optician,
        podiatrist
    ],
    services: [
        hotel,
        garage,
        gym,
        plumber,
        electrician,
        cleaning,
        landscaping,
        locksmith,
        moving,
        lawyer,
        realestate,
        drivingschool,
        tutoring,
        photography,
        petgrooming,
        petboarding,
        daycare,
        wedding,
        eventvenue
    ]
};

/**
 * All industries as a flat array
 */
export const industries = [
    // Restaurant & Food
    restaurant,
    pizza,
    sushi,
    coffeeshop,
    fastfood,
    icecream,
    bakery,

    // Beauty & Wellness
    salon,
    spa,
    massage,
    nailsalon,
    tattoo,

    // Health & Medical
    dental,
    medical,
    vet,
    pharmacy,
    optician,
    podiatrist,

    // Services & Trades
    hotel,
    garage,
    gym,
    plumber,
    electrician,
    cleaning,
    landscaping,
    locksmith,
    moving,

    // Professional Services
    lawyer,
    realestate,
    drivingschool,
    tutoring,
    photography,

    // Pet Services
    petgrooming,
    petboarding,

    // Family & Events
    daycare,
    wedding,
    eventvenue,

    // Commerce
    florist
];

/**
 * Get industry by ID
 * @param {string} id - Industry ID
 * @returns {Object|undefined} Industry object or undefined
 */
export function getIndustryById(id) {
    return industries.find(industry => industry.id === id);
}

/**
 * Get industries by category
 * @param {string} category - Category name
 * @returns {Array} Array of industries in that category
 */
export function getIndustriesByCategory(category) {
    return industriesByCategory[category] || [];
}

/**
 * Get all category names
 * @returns {Array} Array of category names
 */
export function getCategories() {
    return Object.keys(industriesByCategory);
}

/**
 * Search industries by keyword
 * @param {string} keyword - Search keyword
 * @returns {Array} Matching industries
 */
export function searchIndustries(keyword) {
    const term = keyword.toLowerCase();
    return industries.filter(industry =>
        industry.name.toLowerCase().includes(term) ||
        industry.keywords?.some(k => k.toLowerCase().includes(term)) ||
        industry.description?.toLowerCase().includes(term)
    );
}

/**
 * Get random industry
 * @returns {Object} Random industry
 */
export function getRandomIndustry() {
    return industries[Math.floor(Math.random() * industries.length)];
}

/**
 * Get industry count
 * @returns {number} Total number of industries
 */
export function getIndustryCount() {
    return industries.length;
}

// Default export
export default {
    industries,
    industriesByCategory,
    getIndustryById,
    getIndustriesByCategory,
    getCategories,
    searchIndustries,
    getRandomIndustry,
    getIndustryCount
};
