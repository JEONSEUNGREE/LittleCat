import React, { useState, useRef, useEffect } from 'react'
import { Volume2, Play, Pause, Mic, Music } from 'lucide-react'
import { AudioManager } from '../utils/audioUtils'
import { frequencyToColor, frequencyToNote } from '../utils/colorUtils'
import useColorVoiceStore from '../store/useColorVoiceStore'

const SoundController: React.FC = () => {
  const [frequency, setFrequency] = useState(440)
  const [waveform, setWaveform] = useState<OscillatorType>('sine')
  const [isRecording, setIsRecording] = useState(false)
  const audioManager = useRef(new AudioManager())
  const streamRef = useRef<MediaStream | null>(null)

  const { isPlaying, volume, setIsPlaying, setCurrentSound, addToHistory } = useColorVoiceStore()

  useEffect(() => {
    return () => {
      audioManager.current.stop()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handlePlaySound = () => {
    if (isPlaying) {
      audioManager.current.stop()
      setIsPlaying(false)
    } else {
      const noteData = frequencyToNote(frequency)
      const color = frequencyToColor(frequency)
      
      const soundData = {
        frequency,
        note: `${noteData.note}${noteData.octave}`,
        color,
        waveform,
      }
      
      setCurrentSound(soundData)
      addToHistory('sound', soundData)
      audioManager.current.playFrequency(frequency, volume, waveform)
      setIsPlaying(true)
      
      setTimeout(() => setIsPlaying(false), 2000)
    }
  }

  const handleMicrophoneInput = async () => {
    if (isRecording) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
      setIsRecording(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream
        setIsRecording(true)
        
        const detectedFreq = await audioManager.current.analyzeAudioInput(stream)
        setFrequency(Math.round(detectedFreq))
        
        const noteData = frequencyToNote(detectedFreq)
        const color = frequencyToColor(detectedFreq)
        
        const soundData = {
          frequency: detectedFreq,
          note: `${noteData.note}${noteData.octave}`,
          color,
          waveform,
        }
        
        setCurrentSound(soundData)
        addToHistory('sound', soundData)
        
        setTimeout(() => {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
          }
          setIsRecording(false)
        }, 3000)
      } catch (err) {
        console.error('Microphone error:', err)
        setIsRecording(false)
      }
    }
  }

  const waveforms: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth']
  const waveformIcons = {
    sine: '∿',
    square: '⊓',
    triangle: '△',
    sawtooth: '⋀',
  }

  const noteData = frequencyToNote(frequency)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Music className="w-6 h-6 text-purple-600" />
          소리 제어
        </h2>
        <button
          onClick={handleMicrophoneInput}
          className={`p-2 rounded-lg transition-colors ${
            isRecording 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
          }`}
          title="마이크로 소리 감지"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            주파수: {frequency} Hz
          </label>
          <span className="text-lg font-bold text-purple-600">
            {noteData.note}{noteData.octave}
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="2000"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          파형 선택
        </label>
        <div className="grid grid-cols-4 gap-2">
          {waveforms.map((wave) => (
            <button
              key={wave}
              onClick={() => setWaveform(wave)}
              className={`py-2 px-3 rounded-lg transition-all ${
                waveform === wave
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl">{waveformIcons[wave]}</div>
              <div className="text-xs mt-1 capitalize">{wave}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            볼륨: {Math.round(volume * 100)}%
          </label>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => useColorVoiceStore.setState({ volume: Number(e.target.value) / 100 })}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <button
        onClick={handlePlaySound}
        className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
          isPlaying
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5" />
            정지
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            재생
          </>
        )}
      </button>
    </div>
  )
}

export default SoundController