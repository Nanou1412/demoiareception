// ============================================
// TIMER
// ============================================
const Timer = {
    start() {
        const { State, DOM } = window.AppState;
        State.callStartTime = Date.now();
        if (DOM.callStatus) DOM.callStatus.textContent = 'On Call';

        State.callTimerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - State.callStartTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
            if (DOM.callTimer) DOM.callTimer.textContent = timeStr;
            if (DOM.callDurationEl) DOM.callDurationEl.textContent = timeStr;
        }, 1000);
    },

    stop() {
        const { State } = window.AppState;
        if (State.callTimerInterval) {
            clearInterval(State.callTimerInterval);
            State.callTimerInterval = null;
        }
    }
};

// ============================================
// SPEECH RECOGNITION
// ============================================
const SpeechManager = {
    init() {
        const { State, DOM } = window.AppState;
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            State.recognition = new SR();
            State.recognition.continuous = false;
            State.recognition.interimResults = true;
            State.recognition.lang = 'en-AU';

            State.recognition.onresult = event => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                if (DOM.userInput) DOM.userInput.value = transcript;

                if (event.results[event.results.length - 1].isFinal) {
                    Demo.handleUserMessage(transcript.trim());
                    if (DOM.userInput) DOM.userInput.value = '';
                }
            };

            State.recognition.onend = () => {
                State.isListening = false;
                DOM.voiceBtn?.classList.remove('listening');
            };

            State.recognition.onerror = () => {
                State.isListening = false;
                DOM.voiceBtn?.classList.remove('listening');
            };
        }
    },

    toggle() {
        const { State, DOM } = window.AppState;
        if (State.isListening) {
            State.recognition?.stop();
            State.isListening = false;
            DOM.voiceBtn?.classList.remove('listening');
        } else if (State.recognition && !State.isSpeaking) {
            State.recognition.start();
            State.isListening = true;
            DOM.voiceBtn?.classList.add('listening');
        }
    }
};

window.Timer = Timer;
window.SpeechManager = SpeechManager;
