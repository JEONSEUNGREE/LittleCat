import { SoundType } from '../types';

class WebAudioEngine {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;

  private frequencies: Record<SoundType, { freq: number; duration: number; type: OscillatorType }> = {
    kick: { freq: 60, duration: 0.5, type: 'sine' },
    snare: { freq: 200, duration: 0.15, type: 'triangle' },
    hihat: { freq: 800, duration: 0.05, type: 'square' },
    openhat: { freq: 800, duration: 0.2, type: 'square' },
    clap: { freq: 1500, duration: 0.03, type: 'sawtooth' },
    crash: { freq: 500, duration: 0.8, type: 'sawtooth' },
    ride: { freq: 400, duration: 0.3, type: 'triangle' },
    tom: { freq: 150, duration: 0.3, type: 'sine' },
  };

  async init() {
    if (this.isInitialized) return;
    
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.isInitialized = true;
  }

  playSound(sound: SoundType, volume: number = 0.5) {
    if (!this.audioContext) {
      this.init();
      return;
    }

    const now = this.audioContext.currentTime;
    const soundConfig = this.frequencies[sound];
    
    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Configure sound
    oscillator.type = soundConfig.type;
    oscillator.frequency.setValueAtTime(soundConfig.freq, now);
    
    // Configure envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + soundConfig.duration);
    
    // Add some noise for drums
    if (sound === 'snare' || sound === 'hihat' || sound === 'openhat' || sound === 'clap') {
      const noiseBuffer = this.createNoiseBuffer(soundConfig.duration);
      const noiseSource = this.audioContext.createBufferSource();
      const noiseGain = this.audioContext.createGain();
      
      noiseSource.buffer = noiseBuffer;
      noiseGain.gain.setValueAtTime(volume * 0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + soundConfig.duration);
      
      noiseSource.connect(noiseGain);
      noiseGain.connect(this.audioContext.destination);
      noiseSource.start(now);
      noiseSource.stop(now + soundConfig.duration);
    }
    
    // Connect and play
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + soundConfig.duration);
  }

  private createNoiseBuffer(duration: number): AudioBuffer {
    const bufferSize = this.audioContext!.sampleRate * duration;
    const buffer = this.audioContext!.createBuffer(1, bufferSize, this.audioContext!.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    return buffer;
  }

  resume() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

export const audioEngine = new WebAudioEngine();