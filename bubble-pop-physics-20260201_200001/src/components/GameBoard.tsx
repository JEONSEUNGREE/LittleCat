import React, { useEffect, useRef, useCallback } from 'react'
import { Bubble } from './Bubble'
import { useGameStore } from '../store/gameStore'

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD', '#FFD93D']

export const GameBoard: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const lastSpawnTime = useRef<number>(0)

  const {
    bubbles,
    level,
    isPlaying,
    isPaused,
    targetColor,
    addBubble,
    popBubble,
    incrementScore,
    incrementCombo,
    resetCombo,
    decrementLives,
  } = useGameStore()

  const getSpawnInterval = useCallback(() => {
    return Math.max(500, 2000 - level * 150)
  }, [level])

  const getBubbleSpeed = useCallback(() => {
    return 0.5 + level * 0.2
  }, [level])

  const spawnBubble = useCallback(() => {
    if (!boardRef.current) return

    const rect = boardRef.current.getBoundingClientRect()
    const size = Math.random() * 40 + 40
    const x = Math.random() * (rect.width - size) + size / 2
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]

    const newBubble = {
      id: `bubble-${Date.now()}-${Math.random()}`,
      x,
      y: rect.height + size,
      color,
      size,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: -getBubbleSpeed() - Math.random() * 0.5,
      isPopping: false,
    }

    addBubble(newBubble)
  }, [addBubble, getBubbleSpeed])

  const handleBubblePop = useCallback((bubbleId: string, bubbleColor: string) => {
    popBubble(bubbleId)

    if (bubbleColor === targetColor) {
      incrementCombo()
      const comboMultiplier = Math.min(useGameStore.getState().combo, 10)
      incrementScore(10 * comboMultiplier)
    } else {
      resetCombo()
      decrementLives()
    }

    setTimeout(() => {
      useGameStore.setState((state) => ({
        bubbles: state.bubbles.filter(b => b.id !== bubbleId)
      }))
    }, 300)
  }, [popBubble, targetColor, incrementScore, incrementCombo, resetCombo, decrementLives])

  useEffect(() => {
    if (!isPlaying || isPaused) return

    const gameLoop = (timestamp: number) => {
      if (!boardRef.current) return

      const rect = boardRef.current.getBoundingClientRect()

      // Spawn new bubbles
      if (timestamp - lastSpawnTime.current > getSpawnInterval()) {
        spawnBubble()
        lastSpawnTime.current = timestamp
      }

      // Update bubble positions
      useGameStore.setState((state) => ({
        bubbles: state.bubbles
          .map(bubble => {
            if (bubble.isPopping) return bubble

            let newX = bubble.x + bubble.velocityX
            let newVelocityX = bubble.velocityX

            // Bounce off walls
            if (newX < bubble.size / 2 || newX > rect.width - bubble.size / 2) {
              newVelocityX = -bubble.velocityX * 0.8
              newX = Math.max(bubble.size / 2, Math.min(rect.width - bubble.size / 2, newX))
            }

            return {
              ...bubble,
              x: newX,
              y: bubble.y + bubble.velocityY,
              velocityX: newVelocityX,
            }
          })
          .filter(bubble => {
            // Remove bubbles that went off screen
            if (!bubble.isPopping && bubble.y < -bubble.size) {
              return false
            }
            return true
          })
      }))

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, isPaused, getSpawnInterval, spawnBubble])

  return (
    <div
      ref={boardRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-950 rounded-xl"
    >
      {/* Target indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
        <span className="text-sm text-gray-300">Pop:</span>
        <div
          className="w-8 h-8 rounded-full animate-pulse-glow"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${targetColor}ee, ${targetColor}88)`,
          }}
        />
      </div>

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <Bubble
          key={bubble.id}
          bubble={bubble}
          onClick={() => handleBubblePop(bubble.id, bubble.color)}
        />
      ))}

      {/* Decorative background bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: 20 + Math.random() * 30,
              height: 20 + Math.random() * 30,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${COLORS[i % COLORS.length]}44, transparent)`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
