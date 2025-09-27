import React, { useEffect } from 'react'
import SoundPad from './SoundPad'
import WaveVisualizer from './WaveVisualizer'
import useGameStore from '../store/gameStore'
import { audioEngine } from '../utils/audioEngine'
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react'

const GameBoard: React.FC = () => {
  const {
    isPlaying,
    isShowingPattern,
    currentPattern,
    userPattern,
    level,
    startGame,
    generatePattern,
    checkPattern,
    nextLevel,
    loseLife,
    resetUserPattern,
    endGame
  } = useGameStore()
  
  const soundPads = [
    { frequency: 261.63, note: 'C4', color: '#ef4444' },
    { frequency: 293.66, note: 'D4', color: '#f97316' },
    { frequency: 329.63, note: 'E4', color: '#eab308' },
    { frequency: 349.23, note: 'F4', color: '#84cc16' },
    { frequency: 392.00, note: 'G4', color: '#22c55e' },
    { frequency: 440.00, note: 'A4', color: '#06b6d4' },
    { frequency: 493.88, note: 'B4', color: '#3b82f6' },
    { frequency: 523.25, note: 'C5', color: '#8b5cf6' }
  ]
  
  // Start new level
  useEffect(() => {
    if (isPlaying && currentPattern.length === 0) {
      setTimeout(() => generatePattern(), 1000)
    }
  }, [isPlaying, currentPattern])
  
  // Play pattern when showing
  useEffect(() => {
    if (isShowingPattern && currentPattern.length > 0) {
      audioEngine.init()
      audioEngine.playPattern(currentPattern)
    }
  }, [isShowingPattern, currentPattern])
  
  // Check user input when pattern is complete
  useEffect(() => {
    if (!isPlaying || isShowingPattern) return
    
    if (userPattern.length === currentPattern.length && currentPattern.length > 0) {
      const isCorrect = checkPattern()
      
      setTimeout(() => {
        if (isCorrect) {
          audioEngine.playSuccessSound()
          nextLevel()
        } else {
          audioEngine.playErrorSound()
          loseLife()
          resetUserPattern()
          
          // Show pattern again after mistake
          setTimeout(() => {
            if (isPlaying) {
              generatePattern()
            }
          }, 1500)
        }
      }, 500)
    }
  }, [userPattern, currentPattern, isPlaying])
  
  const handleStartGame = () => {
    audioEngine.init()
    startGame()
  }
  
  const handleReplay = () => {
    if (!isPlaying || isShowingPattern || currentPattern.length === 0) return
    resetUserPattern()
    audioEngine.playPattern(currentPattern)
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Wave Visualizer */}
      <WaveVisualizer isActive={isPlaying} pattern={currentPattern} />
      
      {/* Game Status */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-75">Pattern:</span>
            <span className="font-bold">{currentPattern.length} notes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-75">Your input:</span>
            <span className="font-bold">{userPattern.length}/{currentPattern.length}</span>
          </div>
        </div>
      )}
      
      {/* Sound Pads Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {soundPads.map((pad, index) => (
          <SoundPad
            key={index}
            frequency={pad.frequency}
            note={pad.note}
            color={pad.color}
            index={index}
            disabled={!isPlaying || isShowingPattern}
          />
        ))}
      </div>
      
      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {!isPlaying ? (
          <button onClick={handleStartGame} className="wave-button flex items-center gap-2">
            <Play className="w-5 h-5" />
            Start Game
          </button>
        ) : (
          <>
            <button 
              onClick={handleReplay} 
              disabled={isShowingPattern || currentPattern.length === 0}
              className="wave-button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-5 h-5" />
              Replay Pattern
            </button>
            <button onClick={endGame} className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-red-600 active:scale-95 shadow-lg">
              End Game
            </button>
          </>
        )}
      </div>
      
      {/* Instructions */}
      {!isPlaying && (
        <div className="text-center text-white/80 space-y-2 px-4">
          <h2 className="text-xl font-bold mb-3">How to Play</h2>
          <p className="text-sm">1. Listen carefully to the sound pattern</p>
          <p className="text-sm">2. Repeat the pattern by tapping the sound pads</p>
          <p className="text-sm">3. Each level adds more notes to memorize</p>
          <p className="text-sm">4. Don't lose all your lives!</p>
        </div>
      )}
    </div>
  )
}

export default GameBoard