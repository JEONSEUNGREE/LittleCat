import { useEffect, useRef } from 'react';
import Player from './Player';
import Obstacle from './Obstacle';
import { useGameStore } from '../store/gameStore';

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const obstacleTimerRef = useRef<number>();
  
  const {
    obstacles,
    isRunning,
    isGameOver,
    updateGame,
    addObstacle,
    removeObstacle,
    collectCoin,
    incrementScore,
    endGame,
    player,
  } = useGameStore();

  const generateObstacle = () => {
    const types: Array<'spike' | 'block' | 'coin'> = ['spike', 'block', 'coin'];
    const type = types[Math.floor(Math.random() * types.length)];
    const isTop = Math.random() > 0.5;
    
    const obstacle = {
      id: `obs-${Date.now()}-${Math.random()}`,
      position: -50,
      type,
      isTop,
      height: type === 'coin' ? 30 : 40,
      width: type === 'coin' ? 30 : 40,
    };
    
    addObstacle(obstacle);
  };

  const checkCollision = () => {
    const playerBox = {
      left: player.position,
      right: player.position + 40,
      top: player.isFlipped ? 48 : window.innerHeight - 88,
      bottom: player.isFlipped ? 88 : window.innerHeight - 48,
    };

    obstacles.forEach((obstacle) => {
      const obstacleLeft = window.innerWidth - obstacle.position - obstacle.width;
      const obstacleRight = window.innerWidth - obstacle.position;
      const obstacleTop = obstacle.isTop ? 48 : window.innerHeight - 88;
      const obstacleBottom = obstacle.isTop ? 88 : window.innerHeight - 48;

      if (
        playerBox.left < obstacleRight &&
        playerBox.right > obstacleLeft &&
        playerBox.top < obstacleBottom &&
        playerBox.bottom > obstacleTop
      ) {
        if (obstacle.type === 'coin') {
          collectCoin();
          removeObstacle(obstacle.id);
        } else if (!player.isJumping) {
          endGame();
        }
      }
    });
  };

  const gameLoop = () => {
    if (!isRunning || isGameOver) return;

    updateGame();
    incrementScore();
    
    obstacles.forEach((obstacle) => {
      const newPosition = obstacle.position + 5;
      if (newPosition > window.innerWidth + 100) {
        removeObstacle(obstacle.id);
      }
    });

    checkCollision();
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (isRunning && !isGameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
      obstacleTimerRef.current = window.setInterval(generateObstacle, 1500);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (obstacleTimerRef.current) {
        clearInterval(obstacleTimerRef.current);
      }
    };
  }, [isRunning, isGameOver, obstacles, player]);

  useEffect(() => {
    const moveObstacles = setInterval(() => {
      if (!isRunning || isGameOver) return;
      
      obstacles.forEach((obstacle) => {
        obstacle.position += 5;
      });
    }, 16);

    return () => clearInterval(moveObstacles);
  }, [isRunning, isGameOver, obstacles]);

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: player.isFlipped 
          ? 'linear-gradient(to top, #1e3a8a, #7c3aed, #ec4899)' 
          : 'linear-gradient(to bottom, #1e3a8a, #7c3aed, #ec4899)'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg"></div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-800 to-gray-700 shadow-lg"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-slide"></div>
      </div>

      <Player />
      
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} obstacle={obstacle} />
      ))}
    </div>
  );
};

export default GameCanvas;