import { useEffect, useCallback } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameController: React.FC = () => {
  const {
    gameState,
    level,
    obstacles,
    setGameState,
    setJumping,
    addObstacle,
    increaseScore,
    nextLevel,
    score
  } = useGameStore()
  
  const [isMuted, setIsMuted] = React.useState(false)
  
  // Handle jump input
  const handleJump = useCallback(() => {
    if (gameState === 'playing') {
      setJumping(true)
    }
  }, [gameState, setJumping])
  
  // Handle pause/resume
  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused')
    } else if (gameState === 'paused') {
      setGameState('playing')
    }
  }, [gameState, setGameState])
  
  // Generate obstacles
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const obstacleInterval = setInterval(() => {
      const types: Array<'spike' | 'gap' | 'wave'> = ['spike', 'wave', 'spike']
      const randomType = types[Math.floor(Math.random() * types.length)]
      
      const newObstacle = {
        id: Date.now().toString(),
        position: 0,
        height: 30 + Math.random() * 50,
        type: randomType,
        speed: 3 + level * 0.5
      }
      
      addObstacle(newObstacle)
    }, 2000 - level * 100)
    
    return () => clearInterval(obstacleInterval)
  }, [gameState, level, addObstacle])
  
  // Update obstacles position
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const moveInterval = setInterval(() => {
      obstacles.forEach((obstacle) => {
        obstacle.position += obstacle.speed
      })
    }, 50)
    
    return () => clearInterval(moveInterval)
  }, [gameState, obstacles])
  
  // Score increment
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const scoreInterval = setInterval(() => {
      increaseScore(1)
    }, 100)
    
    return () => clearInterval(scoreInterval)
  }, [gameState, increaseScore])
  
  // Level progression
  useEffect(() => {
    if (score > 0 && score % 500 === 0) {
      nextLevel()
    }
  }, [score, nextLevel])
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
        handleJump()
      } else if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        togglePause()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleJump, togglePause])
  
  if (gameState !== 'playing' && gameState !== 'paused') {
    return null
  }
  
  return (
    <>
      {/* Touch control area */}
      <div
        className="absolute inset-0 z-10"
        onTouchStart={handleJump}
        onMouseDown={handleJump}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Control buttons */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        <button
          onClick={togglePause}
          className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"
        >
          {gameState === 'paused' ? (
            <Play className="w-5 h-5" />
          ) : (
            <Pause className="w-5 h-5" />
          )}
        </button>
        
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Pause overlay */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-game-dark/90 rounded-lg p-8 text-center space-y-4 animate-slide-up">
            <h2 className="text-3xl font-bold text-game-primary">일시 정지</h2>
            <p className="text-gray-400">게임을 계속하려면 재생 버튼을 누르세요</p>
            <button
              onClick={togglePause}
              className="game-button flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              계속하기
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default GameController