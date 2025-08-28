import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import Ball from './Ball';
import Goal from './Goal';
import Walls from './Walls';
import { checkCollision, checkGoalReached } from '../utils/physics';

const GameBoard = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  const {
    ball,
    levelData,
    isPlaying,
    gravity,
    hasWon,
    updateBall,
    completeLevel,
    updateTime,
    hasOrientation,
  } = useGameStore();

  useEffect(() => {
    if (!isPlaying || hasWon || !levelData) return;

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.016); // Cap at 60fps
      lastTimeRef.current = timestamp;

      // Update physics
      let newVx = ball.vx + gravity.x * deltaTime * 50;
      let newVy = ball.vy + gravity.y * deltaTime * 50;

      // Apply friction
      newVx *= 0.98;
      newVy *= 0.98;

      // Update position
      let newX = ball.x + newVx * deltaTime;
      let newY = ball.y + newVy * deltaTime;

      // Check wall collisions
      const collision = checkCollision(
        { x: newX, y: newY, radius: ball.radius },
        levelData.walls
      );

      if (collision) {
        // Bounce off walls
        if (collision.horizontal) {
          newVy = -newVy * 0.6; // Energy loss on bounce
          newY = ball.y;
        }
        if (collision.vertical) {
          newVx = -newVx * 0.6;
          newX = ball.x;
        }
      }

      // Check hazard collisions
      if (levelData.hazards) {
        const hazardHit = checkCollision(
          { x: newX, y: newY, radius: ball.radius },
          levelData.hazards
        );
        
        if (hazardHit) {
          // Reset to start position if hit hazard
          newX = levelData.start.x;
          newY = levelData.start.y;
          newVx = 0;
          newVy = 0;
        }
      }

      // Boundary checks
      newX = Math.max(ball.radius, Math.min(400 - ball.radius, newX));
      newY = Math.max(ball.radius, Math.min(600 - ball.radius, newY));

      // Update ball state
      updateBall({
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
      });

      // Check if goal reached
      if (checkGoalReached(
        { x: newX, y: newY, radius: ball.radius },
        levelData.goal
      )) {
        completeLevel();
        return;
      }

      // Update game time
      updateTime();

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimeRef.current = 0;
    };
  }, [isPlaying, ball, gravity, levelData, hasWon, updateBall, completeLevel, updateTime]);

  useEffect(() => {
    if (!hasOrientation) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!isPlaying) return;

      const { beta, gamma } = event;
      
      if (beta !== null && gamma !== null) {
        // Convert device orientation to gravity
        // Beta: front-to-back tilt (-180 to 180)
        // Gamma: left-to-right tilt (-90 to 90)
        const gravityX = (gamma / 90) * 0.5;
        const gravityY = (beta / 90) * 0.5;
        
        useGameStore.getState().setGravity(gravityX, gravityY);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isPlaying, hasOrientation]);

  if (!levelData) return null;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div 
        ref={gameRef}
        className="relative w-full max-w-[400px] h-[600px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-700"
        style={{ touchAction: 'none' }}
      >
        <Walls walls={levelData.walls} hazards={levelData.hazards} />
        <Goal goal={levelData.goal} />
        <Ball ball={ball} />
        
        {hasWon && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-30">
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center shadow-2xl transform scale-110 animate-bounce-slow">
              <h2 className="text-3xl font-bold mb-2">Level Complete!</h2>
              <p className="text-lg">Time: {useGameStore.getState().timeElapsed.toFixed(1)}s</p>
              <button
                onClick={() => {
                  const nextLevel = levelData.id + 1;
                  if (nextLevel <= 6) {
                    useGameStore.getState().setLevel(nextLevel);
                  } else {
                    useGameStore.getState().setShowLevelSelect(true);
                  }
                }}
                className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
              >
                {levelData.id < 6 ? 'Next Level' : 'Choose Level'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;