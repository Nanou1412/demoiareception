/**
 * Global Event System
 * ====================
 *
 * Lightweight EventEmitter for inter-module communication
 */

class EventEmitter {
    constructor() {
        this.events = new Map();
        this.onceEvents = new Map();
    }

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    /**
     * Subscribe to an event once
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    once(event, callback) {
        if (!this.onceEvents.has(event)) {
            this.onceEvents.set(event, new Set());
        }
        this.onceEvents.get(event).add(callback);
    }

    /**
     * Unsubscribe from an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback to remove
     */
    off(event, callback) {
        if (this.events.has(event)) {
            this.events.get(event).delete(callback);
        }
        if (this.onceEvents.has(event)) {
            this.onceEvents.get(event).delete(callback);
        }
    }

    /**
     * Emit an event
     * @param {string} event - Event name
     * @param {*} data - Data to transmit
     */
    emit(event, data) {
        // Execute regular callbacks
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }

        // Execute and remove "once" callbacks
        if (this.onceEvents.has(event)) {
            this.onceEvents.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in once handler for ${event}:`, error);
                }
            });
            this.onceEvents.delete(event);
        }
    }

    /**
     * Remove all listeners for an event
     * @param {string} event - Event name (optional, if absent removes all)
     */
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
            this.onceEvents.delete(event);
        } else {
            this.events.clear();
            this.onceEvents.clear();
        }
    }

    /**
     * Get listener count for an event
     * @param {string} event - Event name
     * @returns {number} Number of listeners
     */
    listenerCount(event) {
        const regular = this.events.has(event) ? this.events.get(event).size : 0;
        const once = this.onceEvents.has(event) ? this.onceEvents.get(event).size : 0;
        return regular + once;
    }

    /**
     * Get all events with listeners
     * @returns {string[]} List of events
     */
    eventNames() {
        const names = new Set([
            ...this.events.keys(),
            ...this.onceEvents.keys()
        ]);
        return Array.from(names);
    }
}

// Global instance
export const eventBus = new EventEmitter();

// Export class for creating local instances
export { EventEmitter };

// ============================================
// Helpers for common events
// ============================================

/**
 * Emit a loading event
 * @param {boolean} isLoading - Loading state
 */
export function emitLoading(isLoading) {
    eventBus.emit('ui:loading', { isLoading });
}

/**
 * Emit a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Notification type (success, error, warning, info)
 */
export function emitToast(message, type = 'info') {
    eventBus.emit('ui:toast', { message, type });
}

/**
 * Emit an error
 * @param {string} source - Error source
 * @param {Error|string} error - Error
 */
export function emitError(source, error) {
    eventBus.emit(`${source}:error`, {
        message: error instanceof Error ? error.message : error,
        error
    });
}
