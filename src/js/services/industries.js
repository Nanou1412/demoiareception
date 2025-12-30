/**
 * Service Industries
 * ===================
 *
 * Gestion du chargement et de la configuration des industries
 */

import { INDUSTRY_CATEGORIES, EVENTS } from '../core/config.js';
import { eventBus } from '../core/events.js';
import { setCurrentIndustry } from '../core/state.js';

// ============================================
// Registry des industries
// ============================================

const industryRegistry = new Map();

// ============================================
// Industry Manager
// ============================================

class IndustryManager {
    constructor() {
        this.loaded = false;
        this.industries = [];
    }

    /**
     * Enregistrer une industrie
     * @param {Object} config - Configuration de l'industrie
     */
    register(config) {
        if (!config.id) {
            console.error('Industry must have an id');
            return;
        }

        const industry = {
            // Valeurs par défaut
            version: '1.0',
            category: 'services',
            icon: '🏢',
            enabled: true,

            // Configuration fournie
            ...config,

            // Générer le système prompt si non fourni
            systemPrompt: config.systemPrompt || this._generateSystemPrompt(config)
        };

        industryRegistry.set(industry.id, industry);
        this.industries = Array.from(industryRegistry.values());
    }

    /**
     * Obtenir une industrie par ID
     * @param {string} id - ID de l'industrie
     * @returns {Object|null}
     */
    get(id) {
        return industryRegistry.get(id) || null;
    }

    /**
     * Obtenir toutes les industries
     * @returns {Object[]}
     */
    getAll() {
        return this.industries.filter(i => i.enabled);
    }

    /**
     * Obtenir les industries par catégorie
     * @param {string} category - Catégorie
     * @returns {Object[]}
     */
    getByCategory(category) {
        if (category === 'all') return this.getAll();
        return this.industries.filter(i => i.category === category && i.enabled);
    }

    /**
     * Obtenir les catégories avec compteur
     * @returns {Object[]}
     */
    getCategories() {
        const counts = {};

        this.industries.forEach(industry => {
            if (industry.enabled) {
                counts[industry.category] = (counts[industry.category] || 0) + 1;
            }
        });

        return Object.entries(INDUSTRY_CATEGORIES)
            .map(([id, config]) => ({
                id,
                ...config,
                count: id === 'all'
                    ? this.getAll().length
                    : (counts[id] || 0)
            }))
            .filter(cat => cat.id === 'all' || cat.count > 0)
            .sort((a, b) => a.order - b.order);
    }

    /**
     * Sélectionner une industrie
     * @param {string} id - ID de l'industrie
     */
    select(id) {
        const industry = this.get(id);
        if (industry) {
            setCurrentIndustry(industry);
            eventBus.emit(EVENTS.INDUSTRY_CHANGE, industry);
        }
    }

    /**
     * Rechercher des industries
     * @param {string} query - Recherche
     * @returns {Object[]}
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.getAll().filter(industry =>
            industry.name.toLowerCase().includes(lowerQuery) ||
            industry.description?.toLowerCase().includes(lowerQuery) ||
            industry.keywords?.some(k => k.toLowerCase().includes(lowerQuery))
        );
    }

    /**
     * Générer un prompt système de base
     * @param {Object} config - Configuration de l'industrie
     * @returns {string}
     */
    _generateSystemPrompt(config) {
        return `Tu es l'assistant virtuel intelligent de ${config.businessName || config.name}.

RÔLE:
- Tu es un réceptionniste professionnel et chaleureux
- Tu réponds aux appels téléphoniques de manière naturelle
- Tu aides les clients avec leurs demandes

INFORMATIONS SUR L'ÉTABLISSEMENT:
- Nom: ${config.businessName || config.name}
- Type: ${config.name}
${config.address ? `- Adresse: ${config.address}` : ''}
${config.phone ? `- Téléphone: ${config.phone}` : ''}
${config.hours ? `- Horaires: ${config.hours}` : ''}

CONSIGNES:
- Sois toujours poli et professionnel
- Réponds de manière concise mais complète
- Si tu ne sais pas, propose de prendre un message
- Confirme toujours les informations importantes`;
    }

    /**
     * Charger les industries depuis les modules
     * @returns {Promise<void>}
     */
    async loadAll() {
        if (this.loaded) return;

        try {
            // Import dynamique de toutes les industries
            const modules = import.meta.glob('/src/industries/*.js');

            for (const path in modules) {
                try {
                    const module = await modules[path]();
                    if (module.default) {
                        this.register(module.default);
                    }
                } catch (error) {
                    console.warn(`Could not load industry from ${path}:`, error);
                }
            }

            this.loaded = true;
        } catch (error) {
            console.error('Error loading industries:', error);
        }
    }
}

// Instance singleton
export const industryManager = new IndustryManager();

// ============================================
// Helpers exportés
// ============================================

export const getIndustry = (id) => industryManager.get(id);
export const getAllIndustries = () => industryManager.getAll();
export const getIndustriesByCategory = (cat) => industryManager.getByCategory(cat);
export const getIndustryCategories = () => industryManager.getCategories();
export const selectIndustry = (id) => industryManager.select(id);
export const searchIndustries = (query) => industryManager.search(query);
export const registerIndustry = (config) => industryManager.register(config);

// ============================================
// Export du registry pour les tests
// ============================================
export { industryRegistry };
