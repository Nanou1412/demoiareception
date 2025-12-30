// ============================================
// API MANAGER - Centralized API calls
// ============================================

const API = {
    async sendMessage(message = null) {
        const { State, sessionId } = window.AppState;

        UI.showTyping();
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    sessionId,
                    industry: State.currentIndustry
                })
            });

            const data = await response.json();
            UI.hideTyping();

            if (data.error) {
                const errorMsg = 'Sorry, having technical difficulties. Try again?';
                UI.addMessage(errorMsg, true, false);
                return null;
            }

            UI.addMessage(data.response, true, false);
            if (State.currentStep === 0) UI.updateProcessStep(1);

            if (data.audio) {
                await AudioManager.playAIAudio(data.audio);
            }

            if (data.isConfirmed) {
                UI.handleOrderConfirmed();
            }

            return data;
        } catch (error) {
            UI.hideTyping();
            console.error('API Error:', error);
            return null;
        }
    },

    async resetConversation() {
        const { sessionId } = window.AppState;
        try {
            await fetch('/api/chat/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });
        } catch (e) {
            console.error('Reset error:', e);
        }
    }
};

window.API = API;
