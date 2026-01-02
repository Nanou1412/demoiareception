/**
 * HTML Templates
 * ===============
 *
 * Functions to generate component HTML
 */

import { escapeHtml, formatNumber } from '../core/utils.js';

// ============================================
// Industry Cards
// ============================================

/**
 * Generate an industry card
 * @param {Object} industry - Industry configuration
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
                    Try demo <span class="arrow">→</span>
                </button>
            </div>
        </article>
    `;
}

/**
 * Generate industry grid
 * @param {Object[]} industries - List of industries
 * @returns {string} HTML
 */
export function industryGrid(industries) {
    if (!industries.length) {
        return `
            <div class="empty-state">
                <span class="empty-icon">🔍</span>
                <p>No industries found</p>
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
 * Generate category filters
 * @param {Object[]} categories - List of categories
 * @param {string} activeId - Active category ID
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
 * Generate a benefit card
 * @param {Object} benefit - Benefit data
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
 * Generate a stat item
 * @param {Object} stat - Stat data
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
 * Generate stats row
 * @param {Object[]} stats - List of stats
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
 * Generate scenario selector
 * @param {Object} scenarios - Available scenarios
 * @param {string} activeId - Active scenario ID
 * @returns {string} HTML
 */
export function scenarioSelector(scenarios, activeId = 'reservation') {
    return `
        <div class="scenario-selector">
            <label class="scenario-label">Scenario:</label>
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
 * Generate a use case card
 * @param {Object} useCase - Use case data
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
 * Generate a modal
 * @param {Object} options - Modal options
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
 * Generate a toast
 * @param {Object} options - Toast options
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
 * Generate a loading spinner
 * @param {string} size - Size (small, medium, large)
 * @returns {string} HTML
 */
export function spinner(size = 'medium') {
    return `<div class="spinner spinner-${size}"></div>`;
}

/**
 * Generate a skeleton loader
 * @param {string} type - Skeleton type
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
 * Generate process bar
 * @param {Object[]} steps - Process steps
 * @param {number} currentStep - Current step
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
 * Generate header
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
                    <span class="logo-text">AI Receptionist</span>
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
                            <input type="search" placeholder="Search..." id="searchInput">
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
