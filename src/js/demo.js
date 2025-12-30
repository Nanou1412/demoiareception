/**
 * Demo Page Entry Point
 * =====================
 *
 * Point d'entrée pour la page de démonstration
 */

// ============================================
// Imports
// ============================================

// Styles
import '../css/main.css';

// Core
import {
    store,
    eventBus,
    EVENTS,
    DEMO_SCENARIOS,
    $, $$,
    domReady,
    parseQueryParams,
    toggleTheme,
    debounce
} from './core/index.js';

// Services
import {
    industryManager,
    getIndustry,
    getAllIndustries,
    selectIndustry,
    searchIndustries,
    resetChat
} from './services/index.js';

// UI
import {
    phoneUI,
    toast
} from './ui/index.js';

// ============================================
// Demo State
// ============================================

const demoState = {
    autoSpeak: true,
    currentIndustryId: 'restaurant'
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
        phoneContainer: $('#phoneContainer'),
        currentIndustry: $('#currentIndustry'),
        industryIcon: $('#currentIndustry .industry-icon'),
        industryName: $('#currentIndustry .industry-name'),
        scenarioSelector: $('#scenarioSelector'),
        changeIndustryBtn: $('#changeIndustry'),
        resetBtn: $('#resetConversation'),
        autoSpeakBtn: $('#toggleAutoSpeak'),
        themeToggle: $('#themeToggle'),
        industryModal: $('#industryModal'),
        modalSearch: $('#modalIndustrySearch'),
        modalGrid: $('#modalIndustryGrid'),
        messageCount: $('#messageCount'),
        responseTime: $('#responseTime'),
        satisfaction: $('#satisfaction'),
        industryInfo: $('#industryInfo')
    };

    // Load industries
    await loadBuiltInIndustries();

    // Get industry from URL or localStorage
    const params = parseQueryParams();
    const savedIndustry = localStorage.getItem('ia-receptionist-last-industry');
    const industryId = params.industry || savedIndustry || 'restaurant';

    // Initialize industry
    const industry = getIndustry(industryId) || getIndustry('restaurant');
    if (industry) {
        selectIndustry(industry.id);
        demoState.currentIndustryId = industry.id;
    }

    // Initialize Phone UI
    phoneUI.init(elements.phoneContainer);

    // Update UI
    updateIndustryDisplay();
    updateStats();

    // Bind events
    bindEvents();
    subscribeToState();

    // Apply theme
    applyTheme();

    console.log('Demo initialized with industry:', demoState.currentIndustryId);
}

// ============================================
// Industry Loading
// ============================================

async function loadBuiltInIndustries() {
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
        { id: 'realestate', name: 'Agence immobilière', icon: '🏠', category: 'services', description: 'Visites et renseignements immobiliers' }
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
// Event Binding
// ============================================

function bindEvents() {
    // Scenario selection
    if (elements.scenarioSelector) {
        elements.scenarioSelector.addEventListener('click', (e) => {
            const btn = e.target.closest('.scenario-btn');
            if (btn) {
                const scenario = btn.dataset.scenario;
                selectScenario(scenario);
            }
        });
    }

    // Change industry
    if (elements.changeIndustryBtn) {
        elements.changeIndustryBtn.addEventListener('click', openIndustryModal);
    }

    // Reset conversation
    if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', handleReset);
    }

    // Auto speak toggle
    if (elements.autoSpeakBtn) {
        elements.autoSpeakBtn.addEventListener('click', toggleAutoSpeak);
    }

    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            toggleTheme();
            updateThemeButton();
        });
    }

    // Modal events
    if (elements.industryModal) {
        // Close on backdrop click
        elements.industryModal.addEventListener('click', (e) => {
            if (e.target === elements.industryModal) {
                closeIndustryModal();
            }
        });

        // Close button
        const closeBtn = elements.industryModal.querySelector('[data-close-modal]');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeIndustryModal);
        }

        // Search
        if (elements.modalSearch) {
            elements.modalSearch.addEventListener('input', debounce((e) => {
                renderModalIndustries(e.target.value);
            }, 300));
        }

        // Industry selection in modal
        if (elements.modalGrid) {
            elements.modalGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.industry-card');
                if (card) {
                    const industryId = card.dataset.industry;
                    handleIndustryChange(industryId);
                }
            });
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape to close modal
        if (e.key === 'Escape' && elements.industryModal?.classList.contains('active')) {
            closeIndustryModal();
        }
    });
}

// ============================================
// State Subscription
// ============================================

function subscribeToState() {
    // Update stats on state change
    store.subscribe((updates) => {
        if ('demoStats' in updates || 'messages' in updates) {
            updateStats();
        }
        if ('industryConfig' in updates && updates.industryConfig) {
            updateIndustryDisplay();
        }
    });

    // Listen for chat events
    eventBus.on(EVENTS.CHAT_RESPONSE, ({ responseTime }) => {
        if (elements.responseTime) {
            elements.responseTime.textContent = `${responseTime}ms`;
        }
    });
}

// ============================================
// Handlers
// ============================================

function selectScenario(scenarioId) {
    store.set({ currentScenario: scenarioId });

    // Update UI
    $$('.scenario-btn', elements.scenarioSelector).forEach(btn => {
        btn.classList.toggle('active', btn.dataset.scenario === scenarioId);
    });

    // Reset chat for new scenario
    resetChat();
    toast.info(`Scénario "${DEMO_SCENARIOS[scenarioId]?.label || scenarioId}" sélectionné`);
}

async function handleReset() {
    await resetChat();
    phoneUI.init(elements.phoneContainer);
    updateStats();
    toast.success('Conversation réinitialisée');
}

function toggleAutoSpeak() {
    demoState.autoSpeak = !demoState.autoSpeak;
    store.set({ isMuted: !demoState.autoSpeak });

    if (elements.autoSpeakBtn) {
        elements.autoSpeakBtn.textContent = `🔊 Lecture automatique: ${demoState.autoSpeak ? 'ON' : 'OFF'}`;
    }
}

function handleIndustryChange(industryId) {
    const industry = getIndustry(industryId);
    if (!industry) return;

    selectIndustry(industryId);
    demoState.currentIndustryId = industryId;

    // Save preference
    localStorage.setItem('ia-receptionist-last-industry', industryId);

    // Reset chat
    resetChat();
    phoneUI.init(elements.phoneContainer);

    // Update UI
    updateIndustryDisplay();
    closeIndustryModal();

    toast.success(`Industrie changée: ${industry.name}`);
}

// ============================================
// Modal
// ============================================

function openIndustryModal() {
    if (elements.industryModal) {
        elements.industryModal.classList.add('active');
        elements.industryModal.setAttribute('aria-hidden', 'false');
        renderModalIndustries();

        if (elements.modalSearch) {
            elements.modalSearch.value = '';
            elements.modalSearch.focus();
        }
    }
}

function closeIndustryModal() {
    if (elements.industryModal) {
        elements.industryModal.classList.remove('active');
        elements.industryModal.setAttribute('aria-hidden', 'true');
    }
}

function renderModalIndustries(query = '') {
    const industries = query ? searchIndustries(query) : getAllIndustries();

    if (elements.modalGrid) {
        elements.modalGrid.innerHTML = industries.map(ind => `
            <article class="industry-card ${ind.id === demoState.currentIndustryId ? 'active' : ''}" 
                     data-industry="${ind.id}">
                <div class="card-icon">${ind.icon}</div>
                <h3 class="card-title">${ind.name}</h3>
            </article>
        `).join('');
    }
}

// ============================================
// UI Updates
// ============================================

function updateIndustryDisplay() {
    const industry = store.get('industryConfig');
    if (!industry) return;

    if (elements.industryIcon) {
        elements.industryIcon.textContent = industry.icon;
    }
    if (elements.industryName) {
        elements.industryName.textContent = industry.name;
    }

    // Update page title
    document.title = `${industry.name} - Démo IA Réceptionniste`;

    // Update industry info card
    if (elements.industryInfo) {
        const description = elements.industryInfo.querySelector('.industry-description');
        if (description) {
            description.textContent = industry.description ||
                `Cette IA est configurée pour simuler un réceptionniste professionnel dans le secteur ${industry.name.toLowerCase()}.`;
        }
    }
}

function updateStats() {
    const stats = store.get('demoStats');
    const messages = store.get('messages');

    if (elements.messageCount) {
        elements.messageCount.textContent = messages?.length || 0;
    }
    if (elements.responseTime && stats?.responseTime) {
        elements.responseTime.textContent = `${stats.responseTime}ms`;
    }
    if (elements.satisfaction && stats?.satisfaction) {
        elements.satisfaction.textContent = `${stats.satisfaction}%`;
    }
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
