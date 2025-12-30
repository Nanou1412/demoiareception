/**
 * Core Module - Point d'entrée
 * ============================
 *
 * Exporte tous les modules core
 */

// Configuration
export * from './config.js';

// Événements
export { eventBus, EventEmitter, emitLoading, emitToast, emitError } from './events.js';

// État
export {
    store,
    Store,
    addMessage,
    setCurrentIndustry,
    setCurrentScenario,
    updateDemoStats,
    toggleTheme
} from './state.js';

// Utilitaires
export * from './utils.js';
