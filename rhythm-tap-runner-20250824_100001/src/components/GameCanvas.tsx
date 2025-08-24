import React, { useEffect, useRef } from 'react'
import { Music, Zap, Star } from 'lucide-react'
import useGameStore, { Lane } from '../store/gameStore'

const GameCanvas: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  
  const {
    gameState,
    playerLane,
    isJumping,
    obstacles,
    beats,
    particles,
    changeLane,
    jump,
    updateGame,
    hitBeat
  } = useGameStore()
  
  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }
    
    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      
      if (deltaTime < 100) { // Prevent huge jumps
        updateGame(deltaTime)
      }
      
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState, updateGame])
  
  // Touch/Click handlers
  const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
    if (gameState !== 'playing') return
    
    const rect = gameAreaRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const relativeX = x - rect.left
    const width = rect.width
    
    if (relativeX < width / 3) {
      changeLane(0)
    } else if (relativeX < (width * 2) / 3) {
      changeLane(1)
    } else {
      changeLane(2)
    }
  }
  
  const handleDoubleClick = () => {
    if (gameState === 'playing') {
      jump()
    }
  }
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
          changeLane(Math.max(0, playerLane - 1) as Lane)
          break
        case 'ArrowRight':
        case 'd':
          changeLane(Math.min(2, playerLane + 1) as Lane)
          break
        case ' ':
        case 'ArrowUp':
        case 'w':
          jump()
          break
        case '1':
          changeLane(0)
          break
        case '2':
          changeLane(1)
          break
        case '3':
          changeLane(2)
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, playerLane, changeLane, jump])
  
  const getLanePosition = (lane: Lane) => {
    const positions = ['left-[16.66%]', 'left-[50%]', 'left-[83.33%]']
    return positions[lane]
  }
  
  return (
    <div 
      ref={gameAreaRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-purple-900/20 to-pink-900/20"
      onTouchStart={handleTouch}
      onMouseDown={handleTouch}
      onDoubleClick={handleDoubleClick}
    >
      {/* Running lanes */}
      <div className="absolute inset-0">
        <div className="absolute left-[33.33%] top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute left-[66.66%] top-0 bottom-0 w-px bg-white/10" />
      </div>
      
      {/* Beat indicators */}
      {beats.map(beat => (
        <div
          key={beat.id}
          className={`absolute ${getLanePosition(beat.lane)} transform -translate-x-1/2 transition-opacity duration-200`}
          style={{ 
            bottom: `${100 - beat.position}%`,
            opacity: beat.hit ? 0 : 1
          }}
        >
          <div 
            className={`w-12 h-12 rounded-full ${
              beat.hit ? 'bg-green-400' : 'bg-game-secondary'
            } animate-pulse-fast flex items-center justify-center`}
            onClick={() => !beat.hit && beat.position > 70 && beat.position < 90 && hitBeat(beat.id)}
          >
            <Music className="w-6 h-6 text-white" />
          </div>
        </div>
      ))}
      
      {/* Obstacles */}
      {obstacles.map(obstacle => (
        <div
          key={obstacle.id}
          className={`absolute ${getLanePosition(obstacle.lane)} transform -translate-x-1/2`}
          style={{ bottom: `${100 - obstacle.position}%` }}
        >
          {obstacle.type === 'bonus' ? (
            <div className="w-10 h-10 bg-yellow-400 rounded-full animate-bounce-slow flex items-center justify-center obstacle-shadow">
              <Star className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className={`w-8 ${obstacle.type === 'double' ? 'h-16' : 'h-8'} bg-red-500 rounded obstacle-shadow`} />
          )}
        </div>
      ))}
      
      {/* Player character */}
      <div 
        className={`absolute ${getLanePosition(playerLane)} transform -translate-x-1/2 transition-all duration-200`}
        style={{ 
          bottom: isJumping ? '30%' : '20%',
        }}
      >
        <div className={`w-12 h-12 bg-game-primary rounded-full flex items-center justify-center neon-glow ${
          isJumping ? 'scale-125' : ''
        } transition-transform duration-200`}>
          <Zap className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Particle effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute animate-ping"
          style={{ 
            left: `${particle.x}%`,
            bottom: `${particle.y}%`,
            transform: 'translate(-50%, 50%)'
          }}
        >
          {particle.type === 'hit' && (
            <div className="w-8 h-8 bg-green-400 rounded-full opacity-60" />
          )}
          {particle.type === 'bonus' && (
            <Star className="w-10 h-10 text-yellow-400 animate-spin" />
          )}
        </div>
      ))}
      
      {/* Lane indicators at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex h-full">
          <div className="flex-1 border-r border-white/20" />
          <div className="flex-1 border-r border-white/20" />
          <div className="flex-1" />
        </div>
      </div>
    </div>
  )
}