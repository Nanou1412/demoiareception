/**
 * Industries Index
 * =================
 *
 * Central registry for all industries
 */

// Food & Beverage
import restaurant from './restaurant.js';
import pizza from './pizza.js';
import sushi from './sushi.js';
import bakery from './bakery.js';
import coffeeshop from './coffeeshop.js';
import fastfood from './fastfood.js';
import icecream from './icecream.js';

// Health & Wellness
import medical from './medical.js';
import dental from './dental.js';
import salon from './salon.js';
import spa from './spa.js';
import massage from './massage.js';
import nailsalon from './nailsalon.js';
import optician from './optician.js';
import podiatrist from './podiatrist.js';
import pharmacy from './pharmacy.js';
import vet from './vet.js';
import gym from './gym.js';

// Services
import cleaning from './cleaning.js';
import electrician from './electrician.js';
import plumber from './plumber.js';
import landscaping from './landscaping.js';
import locksmith from './locksmith.js';
import moving from './moving.js';
import garage from './garage.js';

// Professional
import lawyer from './lawyer.js';
import realestate from './realestate.js';
import tutoring from './tutoring.js';
import drivingschool from './drivingschool.js';

// Lifestyle
import hotel from './hotel.js';
import florist from './florist.js';
import photography from './photography.js';
import tattoo from './tattoo.js';
import petgrooming from './petgrooming.js';
import petboarding from './petboarding.js';
import daycare from './daycare.js';
import wedding from './wedding.js';
import eventvenue from './eventvenue.js';

// ============================================
// INDUSTRIES REGISTRY
// ============================================

export const industries = {
    // Food & Beverage
    restaurant,
    pizza,
    sushi,
    bakery,
    coffeeshop,
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
    gym,

    // Services
    cleaning,
    electrician,
    plumber,
    landscaping,
    locksmith,
    moving,
    garage,

    // Professional
    lawyer,
    realestate,
    tutoring,
    drivingschool,

    // Lifestyle
    hotel,
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

export const categories = {
    all: {
        id: 'all',
        name: 'All',
        icon: '🏢',
        industries: Object.keys(industries)
    },
    food: {
        id: 'food',
        name: 'Food & Drink',
        icon: '🍽️',
        industries: ['restaurant', 'pizza', 'sushi', 'bakery', 'coffeeshop', 'fastfood', 'icecream']
    },
    health: {
        id: 'health',
        name: 'Health & Wellness',
        icon: '💆',
        industries: ['medical', 'dental', 'salon', 'spa', 'massage', 'nailsalon', 'optician', 'podiatrist', 'pharmacy', 'vet', 'gym']
    },
    services: {
        id: 'services',
        name: 'Services',
        icon: '🔧',
        industries: ['cleaning', 'electrician', 'plumber', 'landscaping', 'locksmith', 'moving', 'garage']
    },
    professional: {
        id: 'professional',
        name: 'Professional',
        icon: '💼',
        industries: ['lawyer', 'realestate', 'tutoring', 'drivingschool']
    },
    lifestyle: {
        id: 'lifestyle',
        name: 'Lifestyle',
        icon: '🎉',
        industries: ['hotel', 'florist', 'photography', 'tattoo', 'petgrooming', 'petboarding', 'daycare', 'wedding', 'eventvenue']
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getIndustry(id) {
    return industries[id] || null;
}

export function getIndustryList() {
    return Object.values(industries);
}

export function getCategory(id) {
    return categories[id] || null;
}

export function getCategoryList() {
    return Object.values(categories);
}

export function searchIndustries(query) {
    const q = query.toLowerCase().trim();
    if (!q) return getIndustryList();

    return getIndustryList().filter(ind =>
        ind.name.toLowerCase().includes(q) ||
        ind.id.toLowerCase().includes(q) ||
        ind.description?.toLowerCase().includes(q) ||
        ind.keywords?.some(k => k.toLowerCase().includes(q))
    );
}

export function getIndustriesByCategory(categoryId) {
    if (categoryId === 'all') return getIndustryList();
    const category = categories[categoryId];
    if (!category) return [];
    return category.industries.map(id => industries[id]).filter(Boolean);
}

export default industries;
