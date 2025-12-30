/**
 * Templates HTML
 * ===============
 *
 * Fonctions pour générer le HTML des composants
 */

import { escapeHtml, formatNumber } from '../core/utils.js';

// ============================================
// Industry Cards
// ============================================

/**
 * Générer une carte d'industrie
 * @param {Object} industry - Configuration de l'industrie
 * @returns {string} HTML
 */
export function industryCard(industry) {
    return `
        <article class="industry-card" data-industry="${industry.id}" data-category="${industry.category}">
            <div class="card-icon">${industry.icon}</div>
            <h3 class="card-title">${escapeHtml(industry.name)}</h3>
            <p class="card-description">${escapeHtml(industry.description || '')}</p>
            <div class="card-footer">
                <span class="card-badge">${escapeHtml(industry.category)}</span>
                <button class="btn btn-demo" data-demo="${industry.id}">
                    Tester <span class="arrow">→</span>
                </button>
            </div>
        </article>
    `;
}

/**
 * Générer la grille d'industries
 * @param {Object[]} industries - Liste des industries
 * @returns {string} HTML
 */
export function industryGrid(industries) {
    if (!industries.length) {
        return `
            <div class="empty-state">
                <span class="empty-icon">🔍</span>
                <p>Aucune industrie trouvée</p>
            </div>
        `;
    }

    return `
        <div class="industry-grid">
            ${industries.map(industryCard).join('')}
        </div>
    `;
}

// ============================================
// Category Filters
// ============================================

/**
 * Générer les filtres de catégories
 * @param {Object[]} categories - Liste des catégories
 * @param {string} activeId - ID de la catégorie active
 * @returns {string} HTML
 */
export function categoryFilters(categories, activeId = 'all') {
    return `
        <div class="category-filters">
            ${categories.map(cat => `
                <button class="category-btn ${cat.id === activeId ? 'active' : ''}" 
                        data-category="${cat.id}">
                    <span class="cat-icon">${cat.icon}</span>
                    <span class="cat-label">${escapeHtml(cat.label)}</span>
                    <span class="cat-count">${cat.count}</span>
                </button>
            `).join('')}
        </div>
    `;
}

// ============================================
// Benefit Cards
// ============================================

/**
 * Générer une carte de bénéfice
 * @param {Object} benefit - Données du bénéfice
 * @returns {string} HTML
 */
export function benefitCard(benefit) {
    return `
        <div class="benefit-card">
            <div class="benefit-icon">${benefit.icon}</div>
            <h3 class="benefit-title">${escapeHtml(benefit.title)}</h3>
            <p class="benefit-description">${escapeHtml(benefit.description)}</p>
        </div>
    `;
}

// ============================================
// Stats
// ============================================

/**
 * Générer une stat
 * @param {Object} stat - Données de la stat
 * @returns {string} HTML
 */
export function statItem(stat) {
    return `
        <div class="stat-item">
            <span class="stat-value">${formatNumber(stat.value)}${stat.suffix || ''}</span>
            <span class="stat-label">${escapeHtml(stat.label)}</span>
        </div>
    `;
}

/**
 * Générer la ligne de stats
 * @param {Object[]} stats - Liste des stats
 * @returns {string} HTML
 */
export function statsRow(stats) {
    return `
        <div class="stats-row">
            ${stats.map(statItem).join('')}
        </div>
    `;
}

// ============================================
// Scenario Selector
// ============================================

/**
 * Générer le sélecteur de scénarios
 * @param {Object} scenarios - Scénarios disponibles
 * @param {string} activeId - ID du scénario actif
 * @returns {string} HTML
 */
export function scenarioSelector(scenarios, activeId = 'reservation') {
    return `
        <div class="scenario-selector">
            <label class="scenario-label">Scénario :</label>
            <div class="scenario-buttons">
                ${Object.entries(scenarios).map(([id, scenario]) => `
                    <button class="scenario-btn ${id === activeId ? 'active' : ''}" 
                            data-scenario="${id}"
                            title="${escapeHtml(scenario.description)}">
                        <span class="scenario-icon">${scenario.icon}</span>
                        <span class="scenario-name">${escapeHtml(scenario.label)}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================
// Use Case Cards
// ============================================

/**
 * Générer une carte de cas d'usage
 * @param {Object} useCase - Données du cas d'usage
 * @returns {string} HTML
 */
export function useCaseCard(useCase) {
    return `
        <div class="use-case-card">
            <div class="use-case-header">
                <span class="use-case-icon">${useCase.icon}</span>
                <h4 class="use-case-title">${escapeHtml(useCase.title)}</h4>
            </div>
            <ul class="use-case-list">
                ${useCase.items.map(item => `
                    <li>${escapeHtml(item)}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

// ============================================
// Modal
// ============================================

/**
 * Générer un modal
 * @param {Object} options - Options du modal
 * @returns {string} HTML
 */
export function modal(options) {
    const { id, title, content, footer, size = 'medium' } = options;

    return `
        <div class="modal-backdrop" id="${id}Backdrop">
            <div class="modal modal-${size}" id="${id}" role="dialog" aria-modal="true">
                <div class="modal-header">
                    <h2 class="modal-title">${escapeHtml(title)}</h2>
                    <button class="modal-close" data-close-modal="${id}">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        </div>
    `;
}

// ============================================
// Toast Notifications
// ============================================

/**
 * Générer un toast
 * @param {Object} options - Options du toast
 * @returns {string} HTML
 */
export function toast(options) {
    const { message, type = 'info', id } = options;
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    return `
        <div class="toast toast-${type}" id="${id || ''}">
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${escapeHtml(message)}</span>
            <button class="toast-close">&times;</button>
        </div>
    `;
}

// ============================================
// Loading States
// ============================================

/**
 * Générer un spinner de chargement
 * @param {string} size - Taille (small, medium, large)
 * @returns {string} HTML
 */
export function spinner(size = 'medium') {
    return `<div class="spinner spinner-${size}"></div>`;
}

/**
 * Générer un skeleton loader
 * @param {string} type - Type de skeleton
 * @returns {string} HTML
 */
export function skeleton(type = 'text') {
    const types = {
        text: '<div class="skeleton skeleton-text"></div>',
        card: `
            <div class="skeleton-card">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
        `,
        grid: `
            <div class="skeleton-grid">
                ${Array(6).fill('<div class="skeleton skeleton-card"></div>').join('')}
            </div>
        `
    };

    return types[type] || types.text;
}

// ============================================
// Process Bar
// ============================================

/**
 * Générer la barre de processus
 * @param {Object[]} steps - Étapes du processus
 * @param {number} currentStep - Étape courante
 * @returns {string} HTML
 */
export function processBar(steps, currentStep = 0) {
    return `
        <div class="process-bar">
            ${steps.map((step, index) => `
                <div class="process-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-label">${escapeHtml(step.label)}</div>
                </div>
                ${index < steps.length - 1 ? '<div class="step-connector"></div>' : ''}
            `).join('')}
        </div>
    `;
}

// ============================================
// Header
// ============================================

/**
 * Générer le header
 * @param {Object} options - Options
 * @returns {string} HTML
 */
export function header(options = {}) {
    const { showMenu = true, showSearch = false, currentIndustry = null } = options;

    return `
        <header class="header">
            <div class="container">
                <a href="/" class="logo">
                    <span class="logo-icon">📞</span>
                    <span class="logo-text">IA Réceptionniste</span>
                </a>
                
                ${currentIndustry ? `
                    <div class="current-industry">
                        <span class="industry-icon">${currentIndustry.icon}</span>
                        <span class="industry-name">${escapeHtml(currentIndustry.name)}</span>
                    </div>
                ` : ''}
                
                <div class="header-actions">
                    ${showSearch ? `
                        <div class="search-bar">
                            <input type="search" placeholder="Rechercher..." id="searchInput">
                            <span class="search-icon">🔍</span>
                        </div>
                    ` : ''}
                    
                    ${showMenu ? `
                        <button class="btn btn-outline" id="menuBtn">
                            <span class="hamburger">☰</span>
                            Menu
                        </button>
                    ` : ''}
                </div>
            </div>
        </header>
    `;
}
