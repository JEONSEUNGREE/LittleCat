export class AudioEngine {
  private audioContext: AudioContext | null = null
  private isInitialized = false
  
  constructor() {
    // Initialize on user interaction
  }
  
  init() {
    if (!this.isInitialized) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.isInitialized = true
    }
  }
  
  playTone(frequency: number, duration: number, startTime: number = 0) {
    if (!this.audioContext) {
      this.init()
    }
    
    if (!this.audioContext) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime + startTime / 1000)
    
    // Envelope
    const attackTime = 0.01
    const decayTime = 0.1
    const sustainLevel = 0.6
    const releaseTime = 0.1
    
    const now = this.audioContext.currentTime + startTime / 1000
    
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime)
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime)
    gainNode.gain.setValueAtTime(sustainLevel, now + duration / 1000 - releaseTime)
    gainNode.gain.linearRampToValueAtTime(0, now + duration / 1000)
    
    oscillator.start(now)
    oscillator.stop(now + duration / 1000)
  }
  
  playPattern(pattern: { frequency: number; duration: number; delay: number }[]) {
    pattern.forEach(note => {
      this.playTone(note.frequency, note.duration, note.delay)
    })
  }
  
  playSuccessSound() {
    this.playTone(523.25, 100, 0) // C5
    this.playTone(659.25, 100, 100) // E5
    this.playTone(783.99, 200, 200) // G5
  }
  
  playErrorSound() {
    this.playTone(200, 300, 0)
    this.playTone(150, 300, 150)
  }
  
  playClickSound() {
    this.playTone(800, 50, 0)
  }
}

export const audioEngine = new AudioEngine()