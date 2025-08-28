import { useState, useEffect, useCallback, useRef } from 'react'
import { Heart, Zap, Music } from 'lucide-react'
import useGameStore, { wordBank } from '../store/gameStore'
import FallingWord from './FallingWord'

function GameScreen() {
  const {
    score,
    combo,
    currentWords,
    currentInput,
    gameState,
    addWord,
    updateWordPosition,
    removeWord,
    setCurrentInput,
    checkWord,
    incrementMissed,
    endGame
  } = useGameStore()
  
  const [lives, setLives] = useState(5)
  const [beatAnimation, setBeatAnimation] = useState(false)
  const gameLoopRef = useRef<number>()
  const wordSpawnRef = useRef<number>()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const spawnWord = useCallback(() => {
    const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)]
    const newWord = {
      id: Date.now() + Math.random(),
      text: randomWord,
      position: 0,
      speed: 1 + Math.random() * 2
    }
    addWord(newWord)
  }, [addWord])
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setCurrentInput(value)
    
    if (value.includes(' ')) {
      const word = value.trim()
      if (word) {
        checkWord(word)
      }
      setCurrentInput('')
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput) {
        checkWord(currentInput)
        setCurrentInput('')
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    }
  }
  
  useEffect(() => {
    setBeatAnimation(true)
    const timer = setTimeout(() => setBeatAnimation(false), 500)
    return () => clearTimeout(timer)
  }, [combo])
  
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const gameLoop = () => {
      currentWords.forEach((word) => {
        const newPosition = word.position + word.speed
        if (newPosition > 100) {
          removeWord(word.id)
          incrementMissed()
          setLives(prev => {
            const newLives = prev - 1
            if (newLives <= 0) {
              endGame()
            }
            return newLives
          })
        } else {
          updateWordPosition(word.id, newPosition)
        }
      })
    }
    
    gameLoopRef.current = window.setInterval(gameLoop, 50)
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [currentWords, gameState, removeWord, incrementMissed, updateWordPosition, endGame])
  
  useEffect(() => {
    if (gameState !== 'playing') return
    
    wordSpawnRef.current = window.setInterval(spawnWord, 2000)
    
    return () => {
      if (wordSpawnRef.current) {
        clearInterval(wordSpawnRef.current)
      }
    }
  }, [gameState, spawnWord])
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  
  if (lives <= 0) {
    return null
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-rhythm-purple" />
          <span className="text-white font-bold text-xl">{score}</span>
        </div>
        
        <div className={`flex items-center gap-2 ${beatAnimation ? 'animate-beat' : ''}`}>
          <Zap className="w-6 h-6 text-yellow-400" />
          <span className="text-white font-bold text-xl">x{combo}</span>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative h-96 bg-black/30 rounded-2xl overflow-hidden mb-4 border border-white/10">
        <div className="absolute inset-0">
          {currentWords.map((word) => (
            <FallingWord key={word.id} word={word} />
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rhythm-purple/50 to-transparent" />
      </div>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white placeholder-white/50 font-bold text-lg border border-white/30 focus:outline-none focus:border-rhythm-cyan focus:ring-2 focus:ring-rhythm-cyan/50"
          placeholder="단어를 입력하고 Space 또는 Enter"
          autoComplete="off"
          autoFocus
        />
        {currentInput && (
          <div className="absolute -top-8 left-4 text-white font-bold text-xl animate-pulse">
            {currentInput}
          </div>
        )}
      </div>
    </div>
  )
}

export default GameScreen