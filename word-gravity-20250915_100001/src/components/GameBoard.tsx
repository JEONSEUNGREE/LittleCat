import { useEffect, useRef, useCallback } from 'react'
import { useGameStore, Letter } from '../store/gameStore'
import FallingLetter from './FallingLetter'

const GameBoard: React.FC = () => {
  const { 
    fallingLetters, 
    targetWord,
    gameStatus,
    addLetter,
    updatePhysics,
    updateTimeLeft,
    timeLeft,
    setGameStatus
  } = useGameStore()
  
  const boardRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(Date.now())
  const letterSpawnTimer = useRef<number>(0)

  const spawnLetter = useCallback(() => {
    if (gameStatus !== 'playing') return

    const targetLetters = targetWord.split('')
    const randomChar = Math.random() < 0.7
      ? targetLetters[Math.floor(Math.random() * targetLetters.length)]
      : String.fromCharCode(65 + Math.floor(Math.random() * 26))

    const newLetter: Letter = {
      id: `letter-${Date.now()}-${Math.random()}`,
      char: randomChar,
      x: Math.random() * (window.innerWidth - 40),
      y: -50,
      velocityY: 0,
      velocityX: (Math.random() - 0.5) * 2,
      isCollected: false,
      isFalling: true
    }

    addLetter(newLetter)
  }, [targetWord, gameStatus, addLetter])

  const gameLoop = useCallback(() => {
    if (gameStatus !== 'playing') return

    const currentTime = Date.now()
    const deltaTime = currentTime - lastTimeRef.current
    lastTimeRef.current = currentTime

    // Update physics
    updatePhysics()

    // Spawn letters periodically
    letterSpawnTimer.current += deltaTime
    if (letterSpawnTimer.current > 1500) {
      spawnLetter()
      letterSpawnTimer.current = 0
    }

    // Update timer
    const newTimeLeft = Math.max(0, timeLeft - deltaTime / 1000)
    updateTimeLeft(newTimeLeft)

    if (newTimeLeft <= 0) {
      setGameStatus('lost')
    }

    // Remove letters that fell off screen
    const lettersToRemove = fallingLetters.filter(
      letter => letter.y > window.innerHeight + 100
    )
    
    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [gameStatus, updatePhysics, spawnLetter, timeLeft, updateTimeLeft, setGameStatus, fallingLetters])

  useEffect(() => {
    if (gameStatus === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameLoop, gameStatus])

  // Initial spawn
  useEffect(() => {
    if (gameStatus === 'playing' && fallingLetters.length === 0) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnLetter(), i * 500)
      }
    }
  }, [gameStatus, fallingLetters.length, spawnLetter])

  return (
    <div 
      ref={boardRef}
      className="relative w-full h-full overflow-hidden"
    >
      {fallingLetters.map(letter => (
        <FallingLetter key={letter.id} letter={letter} />
      ))}
    </div>
  )
}

export default GameBoard