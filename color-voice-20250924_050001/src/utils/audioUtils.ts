export class AudioManager {
  private audioContext: AudioContext | null = null
  private oscillator: OscillatorNode | null = null
  private gainNode: GainNode | null = null

  constructor() {
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new window.AudioContext()
    }
  }

  playFrequency(
    frequency: number,
    volume: number = 0.5,
    waveform: OscillatorType = 'sine',
    duration: number = 2000
  ): void {
    if (!this.audioContext) return

    this.stop()

    this.oscillator = this.audioContext.createOscillator()
    this.gainNode = this.audioContext.createGain()

    this.oscillator.type = waveform
    this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000)

    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.audioContext.destination)

    this.oscillator.start()
    this.oscillator.stop(this.audioContext.currentTime + duration / 1000)
  }

  stop(): void {
    if (this.oscillator) {
      try {
        this.oscillator.stop()
        this.oscillator.disconnect()
      } catch (e) {
        // Oscillator might have already stopped
      }
      this.oscillator = null
    }
    if (this.gainNode) {
      this.gainNode.disconnect()
      this.gainNode = null
    }
  }

  analyzeAudioInput(stream: MediaStream): Promise<number> {
    return new Promise((resolve) => {
      if (!this.audioContext) {
        resolve(440)
        return
      }

      const analyser = this.audioContext.createAnalyser()
      const source = this.audioContext.createMediaStreamSource(stream)
      
      analyser.fftSize = 2048
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      source.connect(analyser)
      
      setTimeout(() => {
        analyser.getByteFrequencyData(dataArray)
        
        let maxIndex = 0
        let maxValue = 0
        
        for (let i = 0; i < bufferLength; i++) {
          if (dataArray[i] > maxValue) {
            maxValue = dataArray[i]
            maxIndex = i
          }
        }
        
        const nyquist = this.audioContext!.sampleRate / 2
        const frequency = (maxIndex / bufferLength) * nyquist
        
        source.disconnect()
        resolve(frequency || 440)
      }, 100)
    })
  }
}