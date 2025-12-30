/**
 * UI Module - Point d'entrée
 * ==========================
 * 
 * Exporte tous les composants UI
 */

// Phone UI
export { phoneUI, PhoneUI } from './phone.js';

// Modal
export { modalManager, ModalManager, confirm, alert } from './modal.js';

// Toast
export { toastManager, ToastManager, showToast, hideToast, toast } from './toast.js';

// Templates
export * from './templates.js';
