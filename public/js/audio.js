// ============================================
// AUDIO MANAGER - Centralized TTS handling
// ============================================

const AudioManager = {
    async playAIAudio(audioBase64) {
        const { State } = window.AppState;
        return new Promise(resolve => {
            if (!audioBase64) return resolve();

            if (State.currentAudio) {
                State.currentAudio.pause();
                State.currentAudio = null;
            }

            const audio = new Audio('data:audio/mp3;base64,' + audioBase64);
            State.currentAudio = audio;
            State.isSpeaking = true;

            audio.onended = () => {
                State.isSpeaking = false;
                State.currentAudio = null;
                resolve();
            };
            audio.onerror = () => {
                State.isSpeaking = false;
                State.currentAudio = null;
                resolve();
            };
            audio.play().catch(() => {
                State.isSpeaking = false;
                resolve();
            });
        });
    },

    async speakAsCustomer(text) {
        const { State } = window.AppState;
        State.isSpeaking = true;
        try {
            const response = await fetch('/api/chat/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voice: 'echo', speed: 1.0 })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.audio) {
                    const audio = new Audio('data:audio/mp3;base64,' + data.audio);
                    await new Promise((resolve, reject) => {
                        audio.onended = resolve;
                        audio.onerror = reject;
                        audio.play().catch(reject);
                    });
                    State.isSpeaking = false;
                    return;
                }
            }
            await this.browserTTS(text, 'customer');
        } catch (error) {
            console.error('Customer TTS error:', error);
        }
        State.isSpeaking = false;
    },

    async browserTTS(text, role = 'ai') {
        const synthesis = window.speechSynthesis;
        if (!synthesis) return;

        synthesis.cancel();
        const voices = await this.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);

        const voiceSearch =
            role === 'customer' ? ['Daniel', 'Alex', 'male'] : ['Karen', 'Samantha', 'female'];

        const voice =
            voices.find(v =>
                voiceSearch.some(s => v.name.toLowerCase().includes(s.toLowerCase()))
            ) || voices.find(v => v.lang.startsWith('en'));

        if (voice) utterance.voice = voice;
        utterance.lang = 'en-AU';
        utterance.pitch = role === 'customer' ? 0.9 : 1.1;
        utterance.rate = role === 'customer' ? 1.0 : 1.05;

        return new Promise(resolve => {
            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();
            synthesis.speak(utterance);
        });
    },

    getVoices() {
        return new Promise(resolve => {
            let voices = speechSynthesis.getVoices();
            if (voices.length) return resolve(voices);
            speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
        });
    },

    stopCurrent() {
        const { State } = window.AppState;
        if (State.currentAudio) {
            State.currentAudio.pause();
            State.currentAudio = null;
        }
        State.isSpeaking = false;
        speechSynthesis.cancel();
    }
};

window.AudioManager = AudioManager;
