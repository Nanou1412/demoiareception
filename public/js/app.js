// ============================================
// APP.JS - Main Application Entry Point
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Preload voices
    if (window.speechSynthesis) speechSynthesis.getVoices();
    
    // Init speech recognition
    SpeechManager.init();
    
    const { State, DOM } = window.AppState;
    
    // ========== LANDING PAGE ==========
    // Sales Pitch Button
    const pitchBtn = document.getElementById('playPitchBtn');
    let pitchAudio = null;
    let isPitchPlaying = false;
    
    const salesPitchText = `Hey there! Welcome to AI Receptionist, the future of business communication!

Imagine never missing a customer call again. Our AI receptionist answers every single call instantly, 24 hours a day, 7 days a week, even on Christmas!

Here's what makes us incredible: We save businesses up to 80% on reception costs. No salaries, no sick days, no training required.

Your customers get zero wait time. The moment they call, they're greeted by a friendly, professional voice that sounds completely natural.

And the best part? Our AI never makes mistakes. Perfect order accuracy every time. No mishearing, no forgotten details.

During peak hours, we can handle hundreds of calls simultaneously. Your busiest days become your most profitable days.

From restaurants to medical clinics, from hair salons to law firms - we're customized for YOUR specific business.

Ready to see it in action? Pick your industry below and watch the magic happen!`;

    pitchBtn?.addEventListener('click', async () => {
        if (isPitchPlaying) {
            if (pitchAudio) {
                pitchAudio.pause();
                pitchAudio.currentTime = 0;
            }
            speechSynthesis.cancel();
            pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
            pitchBtn.classList.remove('playing');
            isPitchPlaying = false;
            return;
        }
        
        pitchBtn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Presentation</span>';
        pitchBtn.classList.add('playing');
        isPitchPlaying = true;
        
        try {
            const response = await fetch('/api/chat/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: salesPitchText,
                    voice: 'onyx',
                    speed: 1.0
                })
            });
            
            const data = await response.json();
            
            if (data.audio) {
                pitchAudio = new Audio('data:audio/mp3;base64,' + data.audio);
                pitchAudio.onended = () => {
                    pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
                    pitchBtn.classList.remove('playing');
                    isPitchPlaying = false;
                };
                await pitchAudio.play();
            } else {
                throw new Error('No audio data');
            }
        } catch (error) {
            console.log('TTS API not available, using browser speech');
            const utterance = new SpeechSynthesisUtterance(salesPitchText);
            utterance.rate = 0.95;
            utterance.pitch = 0.9;
            utterance.lang = 'en-AU';
            
            const voices = speechSynthesis.getVoices();
            const maleVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.toLowerCase().includes('male'));
            if (maleVoice) utterance.voice = maleVoice;
            
            utterance.onend = () => {
                pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
                pitchBtn.classList.remove('playing');
                isPitchPlaying = false;
            };
            
            speechSynthesis.speak(utterance);
        }
    });
    
    // Industry cards on landing page
    document.querySelectorAll('.industry-card').forEach(card => {
        card.addEventListener('click', () => {
            const industry = card.dataset.industry;
            if (isPitchPlaying) {
                if (pitchAudio) {
                    pitchAudio.pause();
                    pitchAudio.currentTime = 0;
                }
                speechSynthesis.cancel();
                pitchBtn.innerHTML = '<i class="fas fa-play"></i><span>Hear Why Businesses Love Us</span>';
                pitchBtn.classList.remove('playing');
                isPitchPlaying = false;
            }
            Navigation.goToDemo(industry);
        });
    });
    
    // ========== DEMO PAGE ==========
    document.getElementById('backToLanding')?.addEventListener('click', () => {
        Navigation.goToLanding();
    });
    
    document.getElementById('changeIndustryBtn')?.addEventListener('click', () => {
        Navigation.goToLanding();
    });
    
    DOM.industryBtns?.forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.industryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            State.currentIndustry = btn.dataset.industry;
            API.resetConversation();
            UI.resetUI();
            UI.updateCardTitles();
            State.sessionStats.industries[State.currentIndustry] = (State.sessionStats.industries[State.currentIndustry] || 0) + 1;
        });
    });
    
    document.getElementById('startInteractive')?.addEventListener('click', () => Demo.startInteractive());
    document.getElementById('startAutoDemo')?.addEventListener('click', () => Demo.runAutoDemo());
    
    DOM.sendBtn?.addEventListener('click', () => {
        const text = DOM.userInput?.value?.trim();
        if (text) {
            Demo.handleUserMessage(text);
            DOM.userInput.value = '';
        }
    });
    
    DOM.userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = DOM.userInput.value.trim();
            if (text) {
                Demo.handleUserMessage(text);
                DOM.userInput.value = '';
            }
        }
    });
    
    DOM.voiceBtn?.addEventListener('click', () => SpeechManager.toggle());
    
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.text;
            if (text) Demo.handleUserMessage(text);
        });
    });
    
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('menuSection')?.classList.toggle('hidden');
    });
    
    // ROI Modal
    document.getElementById('roiBtn')?.addEventListener('click', () => {
        document.getElementById('roiModal')?.classList.add('visible');
    });
    document.getElementById('closeModal')?.addEventListener('click', () => {
        document.getElementById('roiModal')?.classList.remove('visible');
    });
    document.getElementById('roiModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'roiModal') e.target.classList.remove('visible');
    });
    document.getElementById('calculateROI')?.addEventListener('click', () => ROI.calculate());
    
    // Theme Toggle
    const toggleTheme = () => {
        State.isDarkMode = !State.isDarkMode;
        document.body.classList.toggle('dark-mode', State.isDarkMode);
        document.body.classList.toggle('light-mode', !State.isDarkMode);
        document.querySelectorAll('#themeToggle i, #themeToggle2 i').forEach(icon => {
            icon.className = State.isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
        });
    };
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggle2')?.addEventListener('click', toggleTheme);
    
    // Fullscreen
    document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
    
    // Stats Modal
    document.getElementById('statsBtn')?.addEventListener('click', () => {
        document.getElementById('statsModal')?.classList.add('visible');
    });
    document.getElementById('closeStatsModal')?.addEventListener('click', () => {
        document.getElementById('statsModal')?.classList.remove('visible');
    });
    document.getElementById('statsModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'statsModal') e.target.classList.remove('visible');
    });
    
    // Scenario buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            State.currentScenario = btn.dataset.scenario;
        });
    });
    
    // Export
    document.getElementById('exportBtn')?.addEventListener('click', () => Export.conversation());
    
    // ========== LANDING PAGE ROI CALCULATOR ==========
    const callsPerDaySlider = document.getElementById('callsPerDay');
    const hourlyRateSlider = document.getElementById('hourlyRate');
    const hoursPerDaySlider = document.getElementById('hoursPerDay');
    const callsValue = document.getElementById('callsValue');
    const rateValue = document.getElementById('rateValue');
    const hoursValue = document.getElementById('hoursValue');
    const currentCostEl = document.getElementById('currentCost');
    const aiCostEl = document.getElementById('aiCost');
    const savingsEl = document.getElementById('savings');
    const roiPercentEl = document.getElementById('roiPercent');
    
    const calculateLandingROI = () => {
        const calls = parseInt(callsPerDaySlider?.value) || 50;
        const rate = parseInt(hourlyRateSlider?.value) || 22;
        const hours = parseInt(hoursPerDaySlider?.value) || 8;
        
        if (callsValue) callsValue.textContent = calls;
        if (rateValue) rateValue.textContent = rate;
        if (hoursValue) hoursValue.textContent = hours;
        
        const workingDays = 260;
        const dailyHumanCost = rate * hours;
        const annualHumanCost = dailyHumanCost * workingDays;
        const annualAICost = Math.round(69.90 * 52);
        const annualSavings = annualHumanCost - annualAICost;
        const roiPercent = Math.round((annualSavings / annualAICost) * 100);
        
        if (currentCostEl) currentCostEl.textContent = `$${annualHumanCost.toLocaleString()}`;
        if (aiCostEl) aiCostEl.textContent = `$${annualAICost.toLocaleString()}`;
        if (savingsEl) savingsEl.textContent = `$${annualSavings.toLocaleString()}`;
        if (roiPercentEl) roiPercentEl.textContent = `${roiPercent}%`;
    };
    
    callsPerDaySlider?.addEventListener('input', calculateLandingROI);
    hourlyRateSlider?.addEventListener('input', calculateLandingROI);
    hoursPerDaySlider?.addEventListener('input', calculateLandingROI);
    
    if (callsPerDaySlider) calculateLandingROI();
    
    // CTA Buttons
    document.getElementById('ctaDemo')?.addEventListener('click', () => {
        document.querySelector('.industry-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    document.getElementById('ctaContact')?.addEventListener('click', () => {
        window.open('mailto:contact@aireceptionist.com?subject=Free Consultation Request', '_blank');
    });
    
    document.getElementById('pricingCta')?.addEventListener('click', () => {
        document.querySelector('.industry-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    // ========== CATEGORY FILTERS ==========
    const categoryBtns = document.querySelectorAll('.category-btn');
    const industryCards = document.querySelectorAll('.industry-card[data-category]');
    const industrySearch = document.getElementById('industrySearch');
    const searchCount = document.getElementById('searchCount');
    const industryGrid = document.querySelector('.industry-grid');
    
    let currentCategory = 'all';
    let currentSearch = '';
    
    const filterIndustries = () => {
        let visibleCount = 0;
        
        industryCards.forEach(card => {
            const matchesCategory = currentCategory === 'all' || card.dataset.category === currentCategory;
            const cardName = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const cardDesc = card.querySelector('p')?.textContent.toLowerCase() || '';
            const matchesSearch = !currentSearch || 
                cardName.includes(currentSearch) || 
                cardDesc.includes(currentSearch) ||
                card.dataset.industry.includes(currentSearch);
            
            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        if (searchCount) {
            searchCount.textContent = `${visibleCount} industr${visibleCount === 1 ? 'y' : 'ies'}`;
        }
        
        let noResults = industryGrid?.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = '<i class="fas fa-search"></i><p>No industries found. Try a different search.</p>';
                industryGrid?.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    };
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterIndustries();
        });
    });
    
    let searchTimeout;
    industrySearch?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = e.target.value.toLowerCase().trim();
            if (currentSearch) {
                categoryBtns.forEach(b => b.classList.remove('active'));
                categoryBtns[0]?.classList.add('active');
                currentCategory = 'all';
            }
            filterIndustries();
        }, 150);
    });
    
    industrySearch?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            industrySearch.value = '';
            currentSearch = '';
            filterIndustries();
        }
    });
});
