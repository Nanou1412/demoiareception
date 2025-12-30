/**
 * Main Application Entry Point
 * ============================
 *
 * Point d'entrée principal pour la page d'accueil
 */

// ============================================
// Imports
// ============================================

// Styles
import '../css/main.css';

// Core
import {
    $,
    domReady,
    debounce,
    toggleTheme
} from './core/index.js';

// Services
import {
    industryManager,
    getIndustryCategories,
    getIndustriesByCategory,
    searchIndustries
} from './services/index.js';

// UI - toast sera utilisé pour les notifications
import './ui/index.js';

// ============================================
// Application State
// ============================================

const appState = {
    currentCategory: 'all',
    searchQuery: '',
    isInitialized: false
};

// ============================================
// DOM Elements
// ============================================

let elements = {};

// ============================================
// Initialization
// ============================================

async function init() {
    await domReady();

    // Cache DOM elements
    elements = {
        industryGrid: $('#industryGrid'),
        categoryFilters: $('#categoryFilters'),
        industrySearch: $('#industrySearch'),
        themeToggle: $('#themeToggle')
    };

    // Initialize industry manager with built-in industries
    await loadBuiltInIndustries();

    // Render initial UI
    renderCategories();
    renderIndustries();

    // Bind events
    bindEvents();

    // Apply saved theme
    applyTheme();

    appState.isInitialized = true;
    console.log('IA Réceptionniste initialized');
}

// ============================================
// Industry Loading
// ============================================

async function loadBuiltInIndustries() {
    // Built-in industries - will be replaced by dynamic import
    const industries = [
        { id: 'restaurant', name: 'Restaurant', icon: '🍽️', category: 'restaurant', description: 'Reservations and restaurant information' },
        { id: 'salon', name: 'Hair Salon', icon: '💇', category: 'beauty', description: 'Appointments and hair services' },
        { id: 'dental', name: 'Dental Clinic', icon: '🦷', category: 'health', description: 'Dental appointments and care' },
        { id: 'medical', name: 'Medical Practice', icon: '👨‍⚕️', category: 'health', description: 'Medical consultations and appointments' },
        { id: 'spa', name: 'Spa', icon: '🧖', category: 'beauty', description: 'Wellness treatments and bookings' },
        { id: 'gym', name: 'Fitness Centre', icon: '🏋️', category: 'services', description: 'Memberships and class schedules' },
        { id: 'hotel', name: 'Hotel', icon: '🏨', category: 'services', description: 'Room bookings and services' },
        { id: 'garage', name: 'Auto Service', icon: '🚗', category: 'services', description: 'Repair and service appointments' },
        { id: 'pizza', name: 'Pizzeria', icon: '🍕', category: 'restaurant', description: 'Pizza orders and delivery' },
        { id: 'sushi', name: 'Sushi Restaurant', icon: '🍣', category: 'restaurant', description: 'Reservations and takeaway orders' },
        { id: 'bakery', name: 'Bakery', icon: '🥐', category: 'commerce', description: 'Orders and information' },
        { id: 'florist', name: 'Florist', icon: '💐', category: 'commerce', description: 'Bouquet orders and delivery' },
        { id: 'vet', name: 'Veterinary Clinic', icon: '🐕', category: 'animals', description: 'Pet appointments' },
        { id: 'pharmacy', name: 'Pharmacy', icon: '💊', category: 'health', description: 'Medication information and availability' },
        { id: 'lawyer', name: 'Law Firm', icon: '⚖️', category: 'services', description: 'Legal appointments' },
        { id: 'realestate', name: 'Real Estate Agency', icon: '🏠', category: 'services', description: 'Property inspections and enquiries' },
        { id: 'plumber', name: 'Plumber', icon: '🔧', category: 'services', description: 'Plumbing repairs and callouts' },
        { id: 'electrician', name: 'Electrician', icon: '⚡', category: 'services', description: 'Electrical services' },
        { id: 'nailsalon', name: 'Nail Salon', icon: '💅', category: 'beauty', description: 'Manicure and pedicure appointments' },
        { id: 'massage', name: 'Massage Clinic', icon: '💆', category: 'beauty', description: 'Massage bookings' },
        { id: 'tattoo', name: 'Tattoo Studio', icon: '🎨', category: 'beauty', description: 'Tattoo appointments and quotes' },
        { id: 'photography', name: 'Photographer', icon: '📸', category: 'events', description: 'Photo session bookings' },
        { id: 'wedding', name: 'Wedding Planner', icon: '💒', category: 'events', description: 'Wedding planning services' },
        { id: 'eventvenue', name: 'Event Venue', icon: '🎉', category: 'events', description: 'Venue hire and bookings' },
        { id: 'tutoring', name: 'Tutoring', icon: '📚', category: 'education', description: 'Tutoring session appointments' },
        { id: 'drivingschool', name: 'Driving School', icon: '🚗', category: 'education', description: 'Driving lessons and enrolment' },
        { id: 'daycare', name: 'Childcare', icon: '👶', category: 'education', description: 'Enrolment and information' },
        { id: 'petgrooming', name: 'Pet Grooming', icon: '🐩', category: 'animals', description: 'Pet grooming appointments' },
        { id: 'petboarding', name: 'Pet Boarding', icon: '🏡', category: 'animals', description: 'Pet boarding bookings' },
        { id: 'optician', name: 'Optometrist', icon: '👓', category: 'health', description: 'Eye exams and appointments' },
        { id: 'podiatrist', name: 'Podiatrist', icon: '🦶', category: 'health', description: 'Foot care appointments' },
        { id: 'coffeeshop', name: 'Coffee Shop', icon: '☕', category: 'restaurant', description: 'Reservations and events' },
        { id: 'icecream', name: 'Ice Cream Parlour', icon: '🍦', category: 'commerce', description: 'Orders and information' },
        { id: 'fastfood', name: 'Fast Food', icon: '🍔', category: 'restaurant', description: 'Orders and delivery' },
        { id: 'cleaning', name: 'Cleaning Service', icon: '🧹', category: 'services', description: 'Cleaning quotes and bookings' },
        { id: 'locksmith', name: 'Locksmith', icon: '🔐', category: 'services', description: 'Emergency lockout services' },
        { id: 'landscaping', name: 'Landscaping', icon: '🌳', category: 'services', description: 'Garden design and maintenance' },
        { id: 'moving', name: 'Removalist', icon: '📦', category: 'services', description: 'Moving quotes and bookings' }
    ];

    industries.forEach(industry => {
        industryManager.register({
            ...industry,
            businessName: `Demo ${industry.name}`,
            version: '1.0'
        });
    });
}

// ============================================
// Rendering
// ============================================

function renderCategories() {
    const categories = getIndustryCategories();

    if (elements.categoryFilters) {
        elements.categoryFilters.innerHTML = categories.map(cat => `
            <button class="category-btn ${cat.id === appState.currentCategory ? 'active' : ''}" 
                    data-category="${cat.id}">
                <span class="cat-icon">${cat.icon}</span>
                <span class="cat-label">${cat.label}</span>
                <span class="cat-count">${cat.count}</span>
            </button>
        `).join('');
    }
}

function renderIndustries() {
    let industries;

    if (appState.searchQuery) {
        industries = searchIndustries(appState.searchQuery);
    } else {
        industries = getIndustriesByCategory(appState.currentCategory);
    }

    if (elements.industryGrid) {
        if (industries.length === 0) {
            elements.industryGrid.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🔍</span>
                    <p>Aucune industrie trouvée</p>
                    <button class="btn btn-outline" id="resetFilters">
                        Réinitialiser les filtres
                    </button>
                </div>
            `;

            const resetBtn = $('#resetFilters');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    appState.currentCategory = 'all';
                    appState.searchQuery = '';
                    if (elements.industrySearch) {
                        elements.industrySearch.value = '';
                    }
                    renderCategories();
                    renderIndustries();
                });
            }
        } else {
            elements.industryGrid.innerHTML = industries.map(ind => `
                <article class="industry-card" data-industry="${ind.id}">
                    <div class="card-icon">${ind.icon}</div>
                    <h3 class="card-title">${ind.name}</h3>
                    <p class="card-description">${ind.description || ''}</p>
                    <button class="btn btn-demo" data-demo="${ind.id}">
                        Tester <span class="arrow">→</span>
                    </button>
                </article>
            `).join('');
        }
    }
}

// ============================================
// Event Handlers
// ============================================

function bindEvents() {
    // Category filter clicks
    if (elements.categoryFilters) {
        elements.categoryFilters.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (btn) {
                const category = btn.dataset.category;
                appState.currentCategory = category;
                appState.searchQuery = '';
                if (elements.industrySearch) {
                    elements.industrySearch.value = '';
                }
                renderCategories();
                renderIndustries();
            }
        });
    }

    // Industry card clicks
    if (elements.industryGrid) {
        elements.industryGrid.addEventListener('click', (e) => {
            const demoBtn = e.target.closest('[data-demo]');
            const card = e.target.closest('.industry-card');

            if (demoBtn || card) {
                const industryId = demoBtn?.dataset.demo || card?.dataset.industry;
                if (industryId) {
                    navigateToDemo(industryId);
                }
            }
        });
    }

    // Search input
    if (elements.industrySearch) {
        const handleSearch = debounce((e) => {
            appState.searchQuery = e.target.value.trim();
            renderIndustries();
        }, 300);

        elements.industrySearch.addEventListener('input', handleSearch);
    }

    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            toggleTheme();
            updateThemeButton();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// Navigation
// ============================================

function navigateToDemo(industryId) {
    // Save selected industry
    localStorage.setItem('ia-receptionist-last-industry', industryId);

    // Navigate to demo page
    window.location.href = `/demo.html?industry=${industryId}`;
}

// ============================================
// Theme
// ============================================

function applyTheme() {
    const savedTheme = localStorage.getItem('ia-receptionist-theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    updateThemeButton();
}

function updateThemeButton() {
    if (elements.themeToggle) {
        const isLight = document.body.classList.contains('light-mode');
        elements.themeToggle.textContent = isLight ? '☀️' : '🌙';
    }
}

// ============================================
// Start Application
// ============================================

init().catch(console.error);
