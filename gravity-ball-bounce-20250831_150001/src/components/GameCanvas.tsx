import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Star, Target, AlertCircle } from 'lucide-react';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const {
    ballPosition,
    ballVelocity,
    gravity,
    levels,
    currentLevel,
    collectedStars,
    isPlaying,
    updateBallPosition,
    updateBallVelocity,
    setGravity,
    collectStar,
    nextLevel,
    resetLevel,
  } = useGameStore();

  const level = levels[currentLevel];

  // Physics simulation
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = () => {
      // Apply gravity
      let newVx = ballVelocity.vx + gravity.x;
      let newVy = ballVelocity.vy + gravity.y;
      
      // Apply gravity zones
      level.gravityZones.forEach((zone) => {
        const dx = zone.position.x - ballPosition.x;
        const dy = zone.position.y - ballPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < zone.radius) {
          const force = zone.strength / (distance * distance);
          newVx += (dx / distance) * force * 0.01;
          newVy += (dy / distance) * force * 0.01;
        }
      });
      
      // Apply damping
      newVx *= 0.99;
      newVy *= 0.99;
      
      // Update position
      let newX = ballPosition.x + newVx;
      let newY = ballPosition.y + newVy;
      
      // Boundary collisions
      if (newX < 20 || newX > 380) {
        newVx = -newVx * 0.8;
        newX = newX < 20 ? 20 : 380;
      }
      if (newY < 20 || newY > 480) {
        newVy = -newVy * 0.8;
        newY = newY < 20 ? 20 : 480;
      }
      
      // Check obstacle collisions
      let collision = false;
      level.obstacles.forEach((obstacle) => {
        const dx = obstacle.x - newX;
        const dy = obstacle.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 35) {
          collision = true;
        }
      });
      
      if (collision) {
        resetLevel();
        return;
      }
      
      // Check star collection
      level.stars.forEach((star, index) => {
        const starId = `${currentLevel}-${index}`;
        if (!collectedStars.has(starId)) {
          const dx = star.x - newX;
          const dy = star.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 25) {
            collectStar(starId);
          }
        }
      });
      
      // Check target reached
      const targetDx = level.target.x - newX;
      const targetDy = level.target.y - newY;
      const targetDistance = Math.sqrt(targetDx * targetDx + targetDy * targetDy);
      
      if (targetDistance < 30 && Math.abs(newVx) < 2 && Math.abs(newVy) < 2) {
        setTimeout(() => {
          if (currentLevel < levels.length - 1) {
            nextLevel();
          } else {
            // Game won
            alert('Congratulations! You completed all levels!');
          }
        }, 500);
      }
      
      updateBallPosition({ x: newX, y: newY });
      updateBallVelocity({ vx: newVx, vy: newVy });
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [ballPosition, ballVelocity, gravity, isPlaying, currentLevel]);

  // Handle gravity control
  const handlePointerDown = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const dx = (currentX - dragStart.x) / 100;
    const dy = (currentY - dragStart.y) / 100;
    
    setGravity({ x: dx, y: dy });
  };
  
  const handlePointerUp = () => {
    setIsDragging(false);
    setGravity({ x: 0, y: 0.5 });
  };

  return (
    <div
      ref={canvasRef}
      className="relative w-full max-w-md h-[500px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden shadow-2xl touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Gravity zones */}
      {level.gravityZones.map((zone, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${
            zone.strength > 0 ? 'bg-purple-500' : 'bg-orange-500'
          } opacity-20 animate-pulse-slow`}
          style={{
            left: `${zone.position.x - zone.radius}px`,
            top: `${zone.position.y - zone.radius}px`,
            width: `${zone.radius * 2}px`,
            height: `${zone.radius * 2}px`,
          }}
        />
      ))}
      
      {/* Obstacles */}
      {level.obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
          style={{
            left: `${obstacle.x - 16}px`,
            top: `${obstacle.y - 16}px`,
          }}
        >
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
      ))}
      
      {/* Stars */}
      {level.stars.map((star, index) => {
        const starId = `${currentLevel}-${index}`;
        const isCollected = collectedStars.has(starId);
        
        return (
          <div
            key={index}
            className={`absolute w-8 h-8 flex items-center justify-center transition-all ${
              isCollected ? 'scale-0' : 'animate-pulse'
            }`}
            style={{
              left: `${star.x - 16}px`,
              top: `${star.y - 16}px`,
            }}
          >
            <Star
              className={`w-6 h-6 ${
                isCollected ? 'text-gray-500' : 'text-yellow-400'
              } fill-current`}
            />
          </div>
        );
      })}
      
      {/* Target */}
      <div
        className="absolute w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg"
        style={{
          left: `${level.target.x - 24}px`,
          top: `${level.target.y - 24}px`,
        }}
      >
        <Target className="w-6 h-6 text-white" />
      </div>
      
      {/* Ball */}
      <div
        className="absolute w-8 h-8 bg-blue-500 rounded-full shadow-lg transition-none"
        style={{
          left: `${ballPosition.x - 16}px`,
          top: `${ballPosition.y - 16}px`,
          transform: `translate3d(0, 0, 0)`,
        }}
      />
      
      {/* Gravity indicator */}
      {isDragging && (
        <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          Gravity: X={gravity.x.toFixed(2)}, Y={gravity.y.toFixed(2)}
        </div>
      )}
    </div>
  );
};