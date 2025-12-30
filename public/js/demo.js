// ============================================
// DEMO CONTROLLER
// ============================================
const Demo = {
    async handleUserMessage(text) {
        const { State } = window.AppState;
        if (!text.trim()) return;
        
        UI.addMessage(text, false, false);
        
        if (State.isAutoDemoMode) {
            await AudioManager.speakAsCustomer(text);
        }
        
        if (State.currentStep < 2) UI.updateProcessStep(2);
        await API.sendMessage(text);
    },

    async runAutoDemo() {
        const { State } = window.AppState;
        State.isAutoDemoMode = true;
        State.sessionStats.totalCalls++;
        
        await API.resetConversation();
        UI.resetUI();
        Timer.start();
        
        await API.sendMessage(null);
        
        const ind = getIndustry();
        const indLang = getIndustryLang();
        
        for (let i = 0; i < ind.demoScript.length && State.isAutoDemoMode; i++) {
            await new Promise(r => setTimeout(r, ind.demoScript[i].delay));
            
            while (State.isSpeaking) {
                await new Promise(r => setTimeout(r, 100));
            }
            
            if (!State.isAutoDemoMode) break;
            
            const responseType = ind.demoScript[i].type;
            const response = indLang.responses[responseType] || "Yes";
            await this.handleUserMessage(response);
            
            if (!State.isAutoDemoMode) break;
            await new Promise(r => setTimeout(r, 500));
        }
    },

    async startInteractive() {
        const { State } = window.AppState;
        State.isAutoDemoMode = false;
        State.sessionStats.totalCalls++;
        
        await API.resetConversation();
        UI.resetUI();
        Timer.start();
        
        await API.sendMessage(null);
        document.querySelector('.demo-section')?.scrollIntoView({ behavior: 'smooth' });
    }
};

// ============================================
// ROI CALCULATOR
// ============================================
const ROI = {
    calculate() {
        const missed = parseInt(document.getElementById('missedCalls')?.value) || 0;
        const avgOrder = parseInt(document.getElementById('avgOrder')?.value) || 0;
        const hourly = parseInt(document.getElementById('hourlyRate')?.value) || 0;
        
        const revenue = missed * avgOrder * 30;
        const labour = hourly * 4 * 30;
        const total = revenue + labour;
        
        const revenueEl = document.getElementById('revenueRecovered');
        const labourEl = document.getElementById('labourSaved');
        const totalEl = document.getElementById('totalSavings');
        const resultsEl = document.getElementById('roiResults');
        
        if (revenueEl) revenueEl.textContent = '$' + revenue.toLocaleString();
        if (labourEl) labourEl.textContent = '$' + labour.toLocaleString();
        if (totalEl) totalEl.textContent = '$' + total.toLocaleString();
        resultsEl?.classList.remove('hidden');
    }
};

// ============================================
// EXPORT
// ============================================
const Export = {
    conversation() {
        const { State, DOM } = window.AppState;
        const messages = DOM.conversation?.querySelectorAll('.message');
        if (!messages?.length) {
            alert('No conversation to export. Start a demo first!');
            return;
        }
        
        const indLang = getIndustryLang();
        let transcript = `AI RECEPTIONIST CONVERSATION TRANSCRIPT\n`;
        transcript += `========================================\n`;
        transcript += `Industry: ${indLang.name}\n`;
        transcript += `AI: ${indLang.aiName}\n`;
        transcript += `Date: ${new Date().toLocaleString()}\n`;
        transcript += `========================================\n\n`;
        
        messages.forEach(msg => {
            const isAI = msg.classList.contains('ai');
            const text = msg.querySelector('.msg-bubble')?.textContent || '';
            const speaker = isAI ? indLang.aiName : 'Customer';
            transcript += `${speaker}: ${text}\n\n`;
        });
        
        transcript += `========================================\n`;
        transcript += `Total Messages: ${State.messageCount}\n`;
        transcript += `Order Total: $${State.orderTotal}\n`;
        
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `conversation-${State.currentIndustry}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

window.Demo = Demo;
window.ROI = ROI;
window.Export = Export;
