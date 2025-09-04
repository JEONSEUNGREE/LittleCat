// Simulated sound generation utilities
export class SoundGenerator {
  private audioContext: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  playBeat(frequency: number, duration: number, volume: number) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume / 100, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);

    this.oscillators.push(oscillator);
    this.gainNodes.push(gainNode);

    // Cleanup after sound finishes
    setTimeout(() => {
      const index = this.oscillators.indexOf(oscillator);
      if (index > -1) {
        this.oscillators.splice(index, 1);
        this.gainNodes.splice(index, 1);
      }
    }, duration * 1000);
  }

  generateMoodFrequency(moodIntensity: number, baseFreq: number = 440): number {
    return baseFreq * (1 + moodIntensity * 0.5);
  }

  stop() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    this.oscillators = [];
    this.gainNodes = [];
  }
}

export const soundGenerator = new SoundGenerator();