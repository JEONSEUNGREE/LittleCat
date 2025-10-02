export class AudioEngine {
  private audioContext: AudioContext;
  
  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  playNote(frequency: number = 440, duration: number = 200): void {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    const currentTime = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.3, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration / 1000);
    
    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration / 1000);
  }
  
  playClick(): void {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = 1000;
    oscillator.type = 'square';
    
    const currentTime = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.1, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.05);
    
    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.05);
  }
  
  playSuccess(): void {
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, index) => {
      setTimeout(() => this.playNote(freq, 150), index * 100);
    });
  }
  
  playError(): void {
    this.playNote(200, 300);
  }
}