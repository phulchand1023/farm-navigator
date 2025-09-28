// Voice Assistant utility for multilingual text-to-speech
export class VoiceAssistant {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.isEnabled = true;
    
    // Load voices when they become available
    this.loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
  }

  // Get the best voice for a given language
  getVoiceForLanguage(language) {
    const languageMap = {
      'en': ['en-US', 'en-GB', 'en'],
      'hi': ['hi-IN', 'hi'],
      'pa': ['pa-IN', 'pa'],
      'te': ['te-IN', 'te'],
      'mr': ['mr-IN', 'mr'],
      'gu': ['gu-IN', 'gu'],
      'ml': ['ml-IN', 'ml'],
      'bn': ['bn-IN', 'bn'],
      'ta': ['ta-IN', 'ta'],
      'kn': ['kn-IN', 'kn'],
      'or': ['or-IN', 'or'],
      'as': ['as-IN', 'as'],
      'ur': ['ur-IN', 'ur'],
    };

    const preferredLangs = languageMap[language] || ['en-US'];
    
    for (const lang of preferredLangs) {
      const voice = this.voices.find(v => v.lang.startsWith(lang));
      if (voice) return voice;
    }
    
    // Fallback to English
    return this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
  }

  // Speak text in the specified language
  speak(text, language = 'en', options = {}) {
    if (!this.isEnabled || !text) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getVoiceForLanguage(language);
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    
    // Set speech parameters
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 0.8;
    
    // Add event listeners
    utterance.onstart = () => console.log('Voice: Started speaking');
    utterance.onend = () => console.log('Voice: Finished speaking');
    utterance.onerror = (e) => console.error('Voice error:', e);
    
    this.synth.speak(utterance);
  }

  // Stop current speech
  stop() {
    this.synth.cancel();
  }

  // Toggle voice assistant on/off
  toggle() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stop();
    }
    return this.isEnabled;
  }

  // Check if voice is currently speaking
  isSpeaking() {
    return this.synth.speaking;
  }
}

// Create a singleton instance
export const voiceAssistant = new VoiceAssistant();

// Voice feedback for form interactions
export const voiceFeedback = {
  // Speak when user focuses on an input
  onFocus: (text, language) => {
    voiceAssistant.speak(text, language, { rate: 1.0 });
  },

  // Speak when user selects an option
  onSelect: (text, language) => {
    voiceAssistant.speak(text, language, { rate: 1.1 });
  },

  // Speak validation messages
  onValidation: (text, language) => {
    voiceAssistant.speak(text, language, { rate: 0.8, pitch: 0.9 });
  },

  // Speak success messages
  onSuccess: (text, language) => {
    voiceAssistant.speak(text, language, { rate: 1.0, pitch: 1.1 });
  },

  // Speak page instructions
  onPageLoad: (text, language) => {
    setTimeout(() => {
      voiceAssistant.speak(text, language, { rate: 0.9 });
    }, 500);
  }
};