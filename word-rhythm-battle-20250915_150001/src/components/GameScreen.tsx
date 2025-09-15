import { useEffect, useRef } from 'react'
import { Music, Pause, Play, RotateCcw } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import WordDisplay from './WordDisplay'
import RhythmIndicator from './RhythmIndicator'
import ScoreDisplay from './ScoreDisplay'

const GameScreen: React.FC = () => {
  const {
    isPlaying,
    isPaused,
    typedText,
    currentWord,
    wordQueue,
    score,
    combo,
    level,
    bpm,
    pauseGame,
    resumeGame,
    endGame,
    typeChar,
    clearTypedText,
    updateGameTime,
    nextWord
  } = useGameStore()

  const gameLoopRef = useRef<number>()
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    if (isPlaying && !isPaused) {
      const gameLoop = () => {
        updateGameTime(Date.now() - startTimeRef.current)
        
        // Check if current word expired
        if (currentWord && Date.now() > currentWord.targetTime + 500) {
          clearTypedText()
          nextWord()
        }
        
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    } else {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [isPlaying, isPaused, currentWord, updateGameTime, clearTypedText, nextWord])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused) return
      
      if (e.key === 'Escape') {
        pauseGame()
      } else if (e.key === 'Backspace') {
        const newText = typedText.slice(0, -1)
        clearTypedText()
        newText.split('').forEach(char => typeChar(char))
      } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        typeChar(e.key.toLowerCase())
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, isPaused, typedText, typeChar, clearTypedText, pauseGame])

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-purple-400" />
          <span className="text-xl font-bold">Level {level}</span>
        </div>
        
        <ScoreDisplay score={score} combo={combo} />
        
        <div className="flex gap-2">
          {isPaused ? (
            <button
              onClick={resumeGame}
              className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Play className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={pauseGame}
              className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Pause className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={endGame}
            className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Rhythm Indicator */}
      <RhythmIndicator bpm={bpm} isPlaying={isPlaying && !isPaused} />

      {/* Game Area */}
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        {/* Word Queue Display */}
        <div className="w-full max-w-4xl">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {currentWord && (
              <WordDisplay
                word={currentWord}
                isActive={true}
                typedText={typedText}
              />
            )}
            {wordQueue.slice(0, 3).map((word, index) => (
              <WordDisplay
                key={word.id}
                word={word}
                isActive={false}
                typedText=""
                opacity={1 - index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* Typing Input Display */}
        <div className="word-card px-8 py-6 min-w-[300px] text-center">
          <div className="text-3xl font-mono tracking-wider min-h-[40px]">
            {typedText || <span className="text-white/30">Type here...</span>}
          </div>
        </div>

        {/* Instructions */}
        {isPaused && (
          <div className="text-center animate-pulse">
            <p className="text-xl mb-2">Game Paused</p>
            <p className="text-white/70">Press Play to continue</p>
          </div>
        )}
      </div>

      {/* BPM Display */}
      <div className="text-center text-white/50 text-sm">
        BPM: {bpm} | Press ESC to pause
      </div>
    </div>
  )
}