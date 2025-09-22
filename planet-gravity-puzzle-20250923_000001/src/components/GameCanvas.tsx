import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Circle } from 'lucide-react';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const {
    spaceship,
    planets,
    level,
    isPlaying,
    isPaused,
    updateSpaceship,
    togglePlanetGravity,
  } = useGameStore();

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (isPlaying && !isPaused) {
        updateSpaceship(deltaTime);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isPaused, updateSpaceship]);

  if (!level) return null;

  const transformPosition = (pos: { x: number; y: number }) => ({
    x: pos.x + 300,
    y: pos.y + 250,
  });

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-br from-space-dark via-gray-900 to-space-dark overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-30 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-60 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-80 right-80 w-1 h-1 bg-white rounded-full"></div>
      </div>

      {spaceship.trail.map((point, index) => {
        const pos = transformPosition(point);
        return (
          <div
            key={index}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              opacity: index / spaceship.trail.length,
            }}
          />
        );
      })}

      {planets.map(planet => {
        const pos = transformPosition(planet.position);
        return (
          <button
            key={planet.id}
            className={`absolute rounded-full transition-all duration-300 ${
              planet.isActive ? 'planet-glow' : 'opacity-50'
            } ${!spaceship.isLaunched ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
            style={{
              left: `${pos.x - planet.radius}px`,
              top: `${pos.y - planet.radius}px`,
              width: `${planet.radius * 2}px`,
              height: `${planet.radius * 2}px`,
              backgroundColor: planet.color,
            }}
            onClick={() => !spaceship.isLaunched && togglePlanetGravity(planet.id)}
            disabled={spaceship.isLaunched}
          >
            {planet.isActive && (
              <div
                className="absolute inset-0 rounded-full animate-gravity-pulse"
                style={{
                  backgroundColor: planet.color,
                  opacity: 0.3,
                  transform: 'scale(1.5)',
                }}
              />
            )}
          </button>
        );
      })}

      {(() => {
        const targetPos = transformPosition(level.target.position);
        return (
          <div
            className="absolute rounded-full border-4 border-green-400 bg-green-400/20 animate-pulse-slow"
            style={{
              left: `${targetPos.x - level.target.radius}px`,
              top: `${targetPos.y - level.target.radius}px`,
              width: `${level.target.radius * 2}px`,
              height: `${level.target.radius * 2}px`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Circle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        );
      })()}

      {(() => {
        const shipPos = transformPosition(spaceship.position);
        return (
          <div
            className="absolute w-6 h-6 transition-all duration-100"
            style={{
              left: `${shipPos.x - 12}px`,
              top: `${shipPos.y - 12}px`,
            }}
          >
            <div
              className={`w-6 h-6 bg-blue-500 rounded-sm transform rotate-45 ${
                spaceship.isLaunched ? 'glow' : ''
              }`}
            >
              {spaceship.isLaunched && (
                <div className="absolute inset-0 bg-blue-400 rounded-sm animate-ping" />
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}