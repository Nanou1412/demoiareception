/**
 * Industry Service
 * ==================
 *
 * Industry loading and configuration management
 */

import { INDUSTRY_CATEGORIES, EVENTS } from '../core/config.js';
import { eventBus } from '../core/events.js';
import { setCurrentIndustry } from '../core/state.js';

// ============================================
// Industry Registry
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
     * Register an industry
     * @param {Object} config - Industry configuration
     */
    register(config) {
        if (!config.id) {
            console.error('Industry must have an id');
            return;
        }

        const industry = {
            // Default values
            version: '1.0',
            category: 'services',
            icon: '🏢',
            enabled: true,

            // Provided configuration
            ...config,

            // Generate system prompt if not provided
            systemPrompt: config.systemPrompt || this._generateSystemPrompt(config)
        };

        industryRegistry.set(industry.id, industry);
        this.industries = Array.from(industryRegistry.values());
    }

    /**
     * Get an industry by ID
     * @param {string} id - Industry ID
     * @returns {Object|null}
     */
    get(id) {
        return industryRegistry.get(id) || null;
    }

    /**
     * Get all industries
     * @returns {Object[]}
     */
    getAll() {
        return this.industries.filter(i => i.enabled);
    }

    /**
     * Get industries by category
     * @param {string} category - Category
     * @returns {Object[]}
     */
    getByCategory(category) {
        if (category === 'all') return this.getAll();
        return this.industries.filter(i => i.category === category && i.enabled);
    }

    /**
     * Get categories with count
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
     * Select an industry
     * @param {string} id - Industry ID
     */
    select(id) {
        const industry = this.get(id);
        if (industry) {
            setCurrentIndustry(industry);
            eventBus.emit(EVENTS.INDUSTRY_CHANGE, industry);
        }
    }

    /**
     * Search industries
     * @param {string} query - Search query
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
     * Generate a base system prompt
     * @param {Object} config - Industry configuration
     * @returns {string}
     */
    _generateSystemPrompt(config) {
        return `You are the intelligent virtual assistant for ${config.businessName || config.name}.

ROLE:
- You are a professional and friendly receptionist
- You answer phone calls in a natural manner
- You help customers with their enquiries

BUSINESS INFORMATION:
- Name: ${config.businessName || config.name}
- Type: ${config.name}
${config.address ? `- Address: ${config.address}` : ''}
${config.phone ? `- Phone: ${config.phone}` : ''}
${config.hours ? `- Hours: ${config.hours}` : ''}

GUIDELINES:
- Always be polite and professional
- Respond concisely but completely
- If you don't know, offer to take a message
- Always confirm important information`;
    }

    /**
     * Load industries from modules
     * @returns {Promise<void>}
     */
    async loadAll() {
        if (this.loaded) return;

        try {
            // Dynamic import of all industries
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

// Singleton instance
export const industryManager = new IndustryManager();

// ============================================
// Exported helpers
// ============================================

export const getIndustry = (id) => industryManager.get(id);
export const getAllIndustries = () => industryManager.getAll();
export const getIndustriesByCategory = (cat) => industryManager.getByCategory(cat);
export const getIndustryCategories = () => industryManager.getCategories();
export const selectIndustry = (id) => industryManager.select(id);
export const searchIndustries = (query) => industryManager.search(query);
export const registerIndustry = (config) => industryManager.register(config);

// ============================================
// Export registry for tests
// ============================================
export { industryRegistry };
