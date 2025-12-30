// ============================================
// UI MANAGER - All UI updates centralized
// ============================================
const UI = {
    showTyping() {
        const { DOM } = window.AppState;
        DOM.typingIndicator?.classList.add('visible');
        DOM.conversation?.scrollTo(0, DOM.conversation.scrollHeight);
    },

    hideTyping() {
        const { DOM } = window.AppState;
        DOM.typingIndicator?.classList.remove('visible');
    },

    addMessage(text, isAI = true, speakIt = true) {
        const { State, DOM } = window.AppState;
        const ind = getIndustry();
        const indLang = getIndustryLang();
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isAI ? 'ai' : 'user'}`;
        
        const avatar = isAI ? ind.icon : ind.customerIcon;
        const customerLabel = 'Customer';
        const speaker = isAI ? `${indLang.aiName} - ${indLang.name}` : customerLabel;
        
        msgDiv.innerHTML = `
            <div class="msg-avatar">${avatar}</div>
            <div>
                <div class="msg-bubble">${text}</div>
                <div class="msg-speaker"><i class="fas fa-volume-up"></i> ${speaker}</div>
            </div>
        `;
        
        DOM.conversation?.appendChild(msgDiv);
        DOM.conversation?.scrollTo(0, DOM.conversation.scrollHeight);
        
        State.messageCount++;
        if (DOM.messageCountEl) DOM.messageCountEl.textContent = State.messageCount;
        
        const totalMatch = text.match(/[\$€](\d+)/);
        if (totalMatch && isAI) {
            State.orderTotal = parseInt(totalMatch[1]);
            if (DOM.orderTotalEl) DOM.orderTotalEl.textContent = '$' + State.orderTotal;
        }
        
        return msgDiv;
    },

    updateProcessStep(step) {
        const { State, DOM } = window.AppState;
        State.currentStep = step;
        
        DOM.processSteps?.forEach((ps, i) => {
            ps.classList.remove('active', 'completed');
            if (i < step) ps.classList.add('completed');
            else if (i === step) ps.classList.add('active');
        });
        
        DOM.processLines?.forEach((line, i) => {
            line.classList.toggle('active', i < step);
        });
        
        const ind = getIndustry();
        const infos = ind.stepInfos || [];
        if (DOM.stepInfoEl) DOM.stepInfoEl.textContent = infos[step] || infos[0] || '';
    },

    updateCardTitles() {
        const ind = getIndustry();
        const indLang = getIndustryLang();
        
        const ticketTitle = document.getElementById('ticketCardTitle');
        const ticketIcon = document.getElementById('ticketCardIcon');
        const smsCardTitle = document.getElementById('smsCardTitle');
        
        if (ticketTitle) ticketTitle.textContent = indLang.cardTitle;
        if (ticketIcon) ticketIcon.className = `fas ${ind.cardIcon}`;
        if (smsCardTitle) smsCardTitle.textContent = 'Customer SMS';
        
        this.updateProcessStepLabels();
        this.updateIndustryColor();
        this.updateQuickActions();
        this.updateMenuSection();
    },

    updateQuickActions() {
        const ind = getIndustry();
        const quickActionsContainer = document.querySelector('.quick-actions');
        
        if (!quickActionsContainer || !ind.quickActions) return;
        
        quickActionsContainer.innerHTML = ind.quickActions.map(action => 
            `<button class="quick-btn" data-text="${action.text}">${action.emoji} ${action.label}</button>`
        ).join('');
        
        quickActionsContainer.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.text;
                if (text) Demo.handleUserMessage(text);
            });
        });
    },

    updateMenuSection() {
        const { State } = window.AppState;
        const ind = getIndustry();
        const menuGrid = document.querySelector('.menu-grid');
        const menuTitle = document.querySelector('.menu-section h2');
        
        if (!menuGrid || !ind.menuItems) return;
        
        const isFood = ['restaurant', 'pizza', 'bakery', 'coffeeshop', 'icecream', 'sushi', 'fastfood'].includes(State.currentIndustry);
        const menuLabel = isFood ? 'Menu' : 'Services';
        const menuIcon = isFood ? 'fa-utensils' : 'fa-concierge-bell';
        if (menuTitle) menuTitle.innerHTML = `<i class="fas ${menuIcon}"></i> ${menuLabel}`;
        
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.innerHTML = `<i class="fas ${menuIcon}"></i> <span>${menuLabel}</span>`;
        }
        
        menuGrid.innerHTML = ind.menuItems.map(item => `
            <div class="menu-item">
                <span class="item-emoji">${item.emoji}</span>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                <span class="item-price">${item.price > 0 ? '$' + item.price.toLocaleString() : 'Free'}</span>
            </div>
        `).join('');
    },

    updateProcessStepLabels() {
        const { DOM } = window.AppState;
        const indLang = getIndustryLang();
        const steps = indLang.steps || ['Call', 'Order', 'Confirm', 'Done'];
        
        DOM.processSteps?.forEach((stepEl, i) => {
            const label = stepEl.querySelector('span');
            if (label && steps[i]) {
                label.textContent = steps[i];
            }
        });
    },

    updateIndustryColor() {
        const ind = getIndustry();
        const color = ind.color || '#6366f1';
        
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const glow = `rgba(${r}, ${g}, ${b}, 0.35)`;
        
        document.documentElement.style.setProperty('--industry-color', color);
        document.documentElement.style.setProperty('--industry-glow', glow);
    },

    handleOrderConfirmed() {
        const { State, DOM } = window.AppState;
        const indLang = getIndustryLang();
        this.updateProcessStep(3);
        
        DOM.smsCard?.classList.add('active');
        DOM.ticketCard?.classList.add('active');
        if (DOM.smsStatus) { DOM.smsStatus.textContent = '✓ Sent'; DOM.smsStatus.classList.add('sent'); }
        if (DOM.ticketStatus) { DOM.ticketStatus.textContent = '✓ Done'; DOM.ticketStatus.classList.add('sent'); }
        
        const orderNum = Math.floor(Math.random() * 900) + 100;
        
        if (DOM.smsPreview) {
            DOM.smsPreview.innerHTML = Templates.getSMS(State.currentIndustry, indLang.name, State.orderTotal, '$');
        }
        
        if (DOM.ticketPreview) {
            DOM.ticketPreview.innerHTML = Templates.getTicket(State.currentIndustry, orderNum, State.orderTotal, '$');
        }
        
        setTimeout(() => {
            if (DOM.callStatus) DOM.callStatus.textContent = 'Call Ended';
            Timer.stop();
        }, 2000);
        
        State.isAutoDemoMode = false;
        State.sessionStats.completedCalls++;
    },

    resetUI() {
        const { State, DOM } = window.AppState;
        if (DOM.conversation) DOM.conversation.innerHTML = '';
        State.messageCount = 0;
        State.orderTotal = 0;
        if (DOM.messageCountEl) DOM.messageCountEl.textContent = '0';
        if (DOM.orderTotalEl) DOM.orderTotalEl.textContent = '$0';
        this.updateProcessStep(0);
        
        DOM.smsCard?.classList.remove('active');
        DOM.ticketCard?.classList.remove('active');
        if (DOM.smsStatus) { DOM.smsStatus.textContent = 'Pending'; DOM.smsStatus.classList.remove('sent'); }
        if (DOM.ticketStatus) { DOM.ticketStatus.textContent = 'Pending'; DOM.ticketStatus.classList.remove('sent'); }
        if (DOM.smsPreview) DOM.smsPreview.innerHTML = `<div class="sms-placeholder"><i class="fas fa-message"></i><span>SMS appears after confirmation</span></div>`;
        if (DOM.ticketPreview) DOM.ticketPreview.innerHTML = `<div class="ticket-placeholder"><i class="fas fa-print"></i><span>Confirmation appears after booking</span></div>`;
    }
};

window.UI = UI;
