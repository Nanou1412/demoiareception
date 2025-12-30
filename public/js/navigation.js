// ============================================
// PAGE NAVIGATION
// ============================================
const Navigation = {
    goToDemo(industry) {
        const { State } = window.AppState;
        State.currentIndustry = industry;

        const indLang = getIndustryLang();
        const ind = getIndustry();
        document.getElementById('currentIndustryIcon').textContent = ind.icon;
        document.getElementById('currentIndustryName').textContent = indLang.name;

        const landing = document.getElementById('landingPage');
        const demo = document.getElementById('demoPage');

        landing.classList.add('fade-out');

        setTimeout(() => {
            landing.classList.remove('active');
            landing.classList.remove('fade-out');
            demo.classList.add('active');

            UI.updateCardTitles();
            UI.updateProcessStep(0);
            UI.resetUI();
            API.resetConversation();

            State.sessionStats.totalCalls++;
            State.sessionStats.industries[industry] =
                (State.sessionStats.industries[industry] || 0) + 1;
        }, 300);
    },

    goToLanding() {
        const { State } = window.AppState;
        const landing = document.getElementById('landingPage');
        const demo = document.getElementById('demoPage');

        Timer.stop();
        State.isAutoDemoMode = false;
        AudioManager.stopCurrent();

        demo.classList.add('fade-out');

        setTimeout(() => {
            demo.classList.remove('active');
            demo.classList.remove('fade-out');
            landing.classList.add('active');
        }, 300);
    }
};

window.Navigation = Navigation;
