import React, { useEffect, useRef, useCallback } from 'react'
import { Heart, Pause, Play, X, Zap } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const GamePlay: React.FC = () => {
  const {
    gameState,
    score,
    combo,
    lives,
    typedWord,
    words,
    accuracy,
    pauseGame,
    resumeGame,
    endGame,
    typeChar,
    deleteChar,
    submitWord,
    updateWords,
    updateBeat
  } = useGameStore()

  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const gameLoop = useCallback((currentTime: number) => {
    if (gameState !== 'playing') return

    const deltaTime = currentTime - lastTimeRef.current
    lastTimeRef.current = currentTime

    updateWords(deltaTime)
    updateBeat(currentTime)

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, updateWords, updateBeat])

  useEffect(() => {
    if (gameState === 'playing') {
      lastTimeRef.current = performance.now()
      animationFrameRef.current = requestAnimationFrame(gameLoop)
      inputRef.current?.focus()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState, gameLoop])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitWord()
    } else if (e.key === 'Escape') {
      if (gameState === 'playing') {
        pauseGame()
      } else if (gameState === 'paused') {
        resumeGame()
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length > typedWord.length) {
      typeChar(newValue[newValue.length - 1])
    } else {
      deleteChar()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse bottom-0 right-0"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-white text-2xl font-bold">{score}</div>
              <div className="text-blue-200 text-sm">Score</div>
            </div>
            
            {combo > 0 && (
              <div className="bg-yellow-500/30 backdrop-blur-sm rounded-lg px-4 py-2 animate-pulse-fast">
                <div className="flex items-center gap-1">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-yellow-300 font-bold text-xl">{combo}x</span>
                </div>
              </div>
            )}

            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-white font-semibold">{accuracy}%</div>
              <div className="text-blue-200 text-sm">Accuracy</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 transition-all ${
                    i < lives
                      ? 'text-red-500 fill-red-500'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => gameState === 'playing' ? pauseGame() : resumeGame()}
              className="ml-4 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              {gameState === 'playing' ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={endGame}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative z-10 h-[calc(100vh-200px)]">
        {words.map(word => (
          <div
            key={word.id}
            className="absolute text-white font-bold text-2xl transition-all"
            style={{
              left: `${word.x}px`,
              top: `${word.y}px`,
              color: word.color,
              textShadow: `0 0 20px ${word.color}`,
            }}
          >
            {word.text.split('').map((char, i) => (
              <span
                key={i}
                className={`inline-block ${
                  typedWord[i] === char
                    ? 'text-green-400 scale-110'
                    : typedWord[i] && typedWord[i] !== char
                    ? 'text-red-400'
                    : ''
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-6">
        <div className="max-w-2xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={typedWord}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white text-2xl font-mono placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
            placeholder="Type the falling words..."
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <div className="mt-2 text-center text-white/60 text-sm">
            Press Enter to submit • Escape to pause
          </div>
        </div>
      </div>

      {/* Pause Overlay */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Game Paused</h2>
            <button
              onClick={resumeGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Resume
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePlay