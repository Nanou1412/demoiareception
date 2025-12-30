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
    // Industries intégrées - sera remplacé par import dynamique
    const industries = [
        { id: 'restaurant', name: 'Restaurant', icon: '🍽️', category: 'restaurant', description: 'Réservations et informations pour restaurants' },
        { id: 'salon', name: 'Salon de coiffure', icon: '💇', category: 'beauty', description: 'Prise de rendez-vous et services de coiffure' },
        { id: 'dental', name: 'Cabinet dentaire', icon: '🦷', category: 'health', description: 'Rendez-vous et soins dentaires' },
        { id: 'medical', name: 'Cabinet médical', icon: '👨‍⚕️', category: 'health', description: 'Consultations et rendez-vous médicaux' },
        { id: 'spa', name: 'Spa', icon: '🧖', category: 'beauty', description: 'Réservations de soins et bien-être' },
        { id: 'gym', name: 'Salle de sport', icon: '🏋️', category: 'services', description: 'Inscriptions et horaires de cours' },
        { id: 'hotel', name: 'Hôtel', icon: '🏨', category: 'services', description: 'Réservations de chambres et services' },
        { id: 'garage', name: 'Garage auto', icon: '🚗', category: 'services', description: 'Rendez-vous pour réparations et entretien' },
        { id: 'pizza', name: 'Pizzeria', icon: '🍕', category: 'restaurant', description: 'Commandes et livraisons de pizzas' },
        { id: 'sushi', name: 'Restaurant sushi', icon: '🍣', category: 'restaurant', description: 'Réservations et commandes à emporter' },
        { id: 'bakery', name: 'Boulangerie', icon: '🥐', category: 'commerce', description: 'Commandes et informations' },
        { id: 'florist', name: 'Fleuriste', icon: '💐', category: 'commerce', description: 'Commandes de bouquets et livraisons' },
        { id: 'vet', name: 'Clinique vétérinaire', icon: '🐕', category: 'animals', description: 'Rendez-vous pour animaux de compagnie' },
        { id: 'pharmacy', name: 'Pharmacie', icon: '💊', category: 'health', description: 'Informations et disponibilité de médicaments' },
        { id: 'lawyer', name: 'Cabinet d\'avocat', icon: '⚖️', category: 'services', description: 'Prises de rendez-vous juridiques' },
        { id: 'realestate', name: 'Agence immobilière', icon: '🏠', category: 'services', description: 'Visites et renseignements immobiliers' },
        { id: 'plumber', name: 'Plombier', icon: '🔧', category: 'services', description: 'Interventions et dépannages' },
        { id: 'electrician', name: 'Électricien', icon: '⚡', category: 'services', description: 'Interventions électriques' },
        { id: 'nailsalon', name: 'Salon de manucure', icon: '💅', category: 'beauty', description: 'Rendez-vous manucure et pédicure' },
        { id: 'massage', name: 'Salon de massage', icon: '💆', category: 'beauty', description: 'Réservations de massages' },
        { id: 'tattoo', name: 'Salon de tatouage', icon: '🎨', category: 'beauty', description: 'Rendez-vous et devis tatouages' },
        { id: 'photography', name: 'Photographe', icon: '📸', category: 'events', description: 'Réservations de séances photo' },
        { id: 'wedding', name: 'Wedding planner', icon: '💒', category: 'events', description: 'Organisation de mariages' },
        { id: 'eventvenue', name: 'Salle de réception', icon: '🎉', category: 'events', description: 'Réservation de salles' },
        { id: 'tutoring', name: 'Cours particuliers', icon: '📚', category: 'education', description: 'Prise de rendez-vous pour cours' },
        { id: 'drivingschool', name: 'Auto-école', icon: '🚗', category: 'education', description: 'Inscriptions et leçons de conduite' },
        { id: 'daycare', name: 'Crèche', icon: '👶', category: 'education', description: 'Inscriptions et informations' },
        { id: 'petgrooming', name: 'Toilettage', icon: '🐩', category: 'animals', description: 'Rendez-vous toilettage animaux' },
        { id: 'petboarding', name: 'Pension animaux', icon: '🏡', category: 'animals', description: 'Réservations pension' },
        { id: 'optician', name: 'Opticien', icon: '👓', category: 'health', description: 'Rendez-vous et examens de vue' },
        { id: 'podiatrist', name: 'Podologue', icon: '🦶', category: 'health', description: 'Rendez-vous soins des pieds' },
        { id: 'coffeeshop', name: 'Café', icon: '☕', category: 'restaurant', description: 'Réservations et événements' },
        { id: 'icecream', name: 'Glacier', icon: '🍦', category: 'commerce', description: 'Commandes et informations' },
        { id: 'fastfood', name: 'Fast-food', icon: '🍔', category: 'restaurant', description: 'Commandes et livraisons' },
        { id: 'cleaning', name: 'Nettoyage', icon: '🧹', category: 'services', description: 'Devis et interventions ménage' },
        { id: 'locksmith', name: 'Serrurier', icon: '🔐', category: 'services', description: 'Dépannages et interventions' },
        { id: 'landscaping', name: 'Paysagiste', icon: '🌳', category: 'services', description: 'Devis et entretien jardins' },
        { id: 'moving', name: 'Déménagement', icon: '📦', category: 'services', description: 'Devis et planification déménagements' }
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
