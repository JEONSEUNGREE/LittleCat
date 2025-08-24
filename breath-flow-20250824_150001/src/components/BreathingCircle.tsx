import React, { useEffect, useState } from 'react'
import { useBreathStore } from '../store/breathStore'

export const BreathingCircle: React.FC = () => {
  const { isBreathing, currentPhase, pattern } = useBreathStore()
  const [scale, setScale] = useState(1)
  const [instruction, setInstruction] = useState('준비하세요')

  const getPatternTiming = () => {
    const timings: Record<string, number[]> = {
      '4-4-4': [4, 4, 4, 0],
      '4-7-8': [4, 7, 8, 0],
      '5-5-5': [5, 5, 5, 0],
      'box': [4, 4, 4, 4],
    }
    return timings[pattern] || [4, 4, 4, 0]
  }

  useEffect(() => {
    if (!isBreathing) {
      setScale(1)
      setInstruction('시작 버튼을 눌러주세요')
      return
    }

    const phases: ('inhale' | 'hold' | 'exhale' | 'pause')[] = ['inhale', 'hold', 'exhale', 'pause']
    const phaseInstructions = {
      'inhale': '들이쉬기',
      'hold': '멈추기',
      'exhale': '내쉬기',
      'pause': '쉬기'
    }
    const timings = getPatternTiming()
    let phaseIndex = 0

    const runPhase = () => {
      const phase = phases[phaseIndex]
      const duration = timings[phaseIndex] * 1000

      if (duration === 0) {
        phaseIndex = (phaseIndex + 1) % phases.length
        if (phaseIndex === 0) phaseIndex = 0
        runPhase()
        return
      }

      setInstruction(phaseInstructions[phase])
      useBreathStore.getState().setPhase(phase)

      if (phase === 'inhale') {
        setScale(1.3)
      } else if (phase === 'exhale') {
        setScale(0.8)
      }

      setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % phases.length
        if (isBreathing) {
          runPhase()
        }
      }, duration)
    }

    runPhase()

    return () => {
      setScale(1)
    }
  }, [isBreathing, pattern])

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-breath-primary to-breath-secondary opacity-30 transition-transform ease-in-out`}
          style={{
            transform: `scale(${scale})`,
            transitionDuration: currentPhase === 'inhale' ? '4s' : currentPhase === 'exhale' ? '4s' : '0s'
          }}
        />
        <div
          className={`absolute inset-8 rounded-full bg-gradient-to-br from-breath-primary to-breath-secondary opacity-50 transition-transform ease-in-out`}
          style={{
            transform: `scale(${scale * 0.9})`,
            transitionDuration: currentPhase === 'inhale' ? '4s' : currentPhase === 'exhale' ? '4s' : '0s'
          }}
        />
        <div
          className={`absolute inset-16 rounded-full bg-gradient-to-br from-breath-primary to-breath-secondary transition-transform ease-in-out`}
          style={{
            transform: `scale(${scale * 0.8})`,
            transitionDuration: currentPhase === 'inhale' ? '4s' : currentPhase === 'exhale' ? '4s' : '0s'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {instruction}
          </span>
        </div>
      </div>
    </div>
  )
}