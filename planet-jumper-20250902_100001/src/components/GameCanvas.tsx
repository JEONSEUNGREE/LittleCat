import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Planet } from './Planet';
import { Player } from './Player';
import { updatePlayerPhysics, checkCollision, jump } from '../utils/physics';
import { generateLevel } from '../utils/levels';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const [scale, setScale] = useState(1);
  
  const {
    level,
    isPlaying,
    planets,
    player,
    jumps,
    maxJumps,
    setPlanets,
    setPlayer,
    incrementJumps,
    setIsVictory,
    setIsGameOver,
  } = useGameStore();
  
  // Initialize level
  useEffect(() => {
    const newPlanets = generateLevel(level);
    setPlanets(newPlanets);
    setPlayer({
      x: 100,
      y: 200,
      vx: 0,
      vy: 0,
      radius: 10,
      jumping: false,
      onPlanet: null,
    });
  }, [level, setPlanets, setPlayer]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const newScale = Math.min(width / 600, height / 400, 1.5);
        setScale(newScale);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Game loop
  useEffect(() => {
    if (!isPlaying) return;
    
    const gameLoop = (timestamp: number) => {
      const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;
      
      // Update physics
      const updatedPlayer = updatePlayerPhysics(player, planets, deltaTime);
      
      // Check collisions
      let landed = false;
      for (const planet of planets) {
        if (checkCollision(updatedPlayer, planet)) {
          if (planet.isGoal) {
            setIsVictory(true);
            return;
          }
          
          if (updatedPlayer.jumping && updatedPlayer.onPlanet !== planet.id) {
            updatedPlayer.jumping = false;
            updatedPlayer.onPlanet = planet.id;
            updatedPlayer.vx = 0;
            updatedPlayer.vy = 0;
            landed = true;
          }
        }
      }
      
      // Check if player is out of bounds
      if (
        updatedPlayer.x < -50 ||
        updatedPlayer.x > 650 ||
        updatedPlayer.y < -50 ||
        updatedPlayer.y > 450
      ) {
        setIsGameOver(true);
        return;
      }
      
      setPlayer(updatedPlayer);
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, player, planets, setPlayer, setIsVictory, setIsGameOver]);
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying || player.jumping || jumps >= maxJumps) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    const newPlayer = jump(player, x, y);
    setPlayer(newPlayer);
    incrementJumps();
    
    if (jumps + 1 >= maxJumps) {
      setTimeout(() => {
        setIsGameOver(true);
      }, 3000);
    }
  };
  
  return (
    <div
      ref={canvasRef}
      className="relative bg-gradient-to-b from-gray-900 via-purple-900 to-black overflow-hidden cursor-crosshair"
      style={{
        width: `${600 * scale}px`,
        height: `${400 * scale}px`,
        margin: '0 auto',
      }}
      onClick={handleClick}
    >
      {/* Stars background */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      
      {/* Planets */}
      {planets.map((planet) => (
        <Planet key={planet.id} planet={planet} scale={scale} />
      ))}
      
      {/* Player */}
      <Player player={player} scale={scale} />
      
      {/* Jump trajectory preview on hover */}
      {!player.jumping && jumps < maxJumps && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="rgba(255, 255, 255, 0.5)"
                />
              </marker>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};