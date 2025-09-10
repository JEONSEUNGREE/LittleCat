import { useEffect, useRef } from 'react';
import { Shield, Zap, AlertCircle } from 'lucide-react';
import useGameStore from '../store/gameStore';
import Enemy from './Enemy';
import Turret from './Turret';

const GameBoard: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const {
    enemies,
    turrets,
    selectedCell,
    credits,
    gameStatus,
    placeTurret,
    selectCell,
    clearSelection,
    spawnEnemy,
    updateEnemy,
    removeEnemy,
    takeDamage,
    addScore,
    addCredits,
    wave,
    nextWave
  } = useGameStore();

  // Handle cell click
  const handleCellClick = (x: number, y: number) => {
    if (gameStatus !== 'playing') return;
    
    const hasTurret = turrets.some(t => t.x === x && t.y === y);
    
    if (hasTurret) {
      clearSelection();
    } else if (selectedCell?.x === x && selectedCell?.y === y) {
      if (credits >= 50) {
        placeTurret(x, y);
      }
    } else {
      selectCell(x, y);
    }
  };

  // Enemy spawning logic
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const spawnInterval = setInterval(() => {
      const enemyType = Math.random() > 0.8 ? 'alien' : 'asteroid';
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      
      switch(side) {
        case 0: // top
          x = Math.floor(Math.random() * 10);
          y = 0;
          break;
        case 1: // right
          x = 9;
          y = Math.floor(Math.random() * 10);
          break;
        case 2: // bottom
          x = Math.floor(Math.random() * 10);
          y = 9;
          break;
        case 3: // left
          x = 0;
          y = Math.floor(Math.random() * 10);
          break;
      }
      
      const enemy = {
        id: `enemy-${Date.now()}-${Math.random()}`,
        x,
        y,
        health: enemyType === 'alien' ? 30 : 20,
        maxHealth: enemyType === 'alien' ? 30 : 20,
        speed: enemyType === 'alien' ? 0.5 : 0.3,
        type: enemyType as 'asteroid' | 'alien'
      };
      
      spawnEnemy(enemy);
    }, 3000 - (wave * 200));

    return () => clearInterval(spawnInterval);
  }, [gameStatus, wave, spawnEnemy]);

  // Enemy movement and collision
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const moveInterval = setInterval(() => {
      enemies.forEach(enemy => {
        // Move towards center (planet at 4,4 to 5,5)
        const centerX = 4.5;
        const centerY = 4.5;
        const dx = centerX - enemy.x;
        const dy = centerY - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 1) {
          // Enemy reached the planet
          takeDamage(10);
          removeEnemy(enemy.id);
        } else {
          // Move enemy
          const moveX = (dx / distance) * enemy.speed;
          const moveY = (dy / distance) * enemy.speed;
          updateEnemy(enemy.id, {
            x: enemy.x + moveX,
            y: enemy.y + moveY
          });
        }
      });
    }, 100);

    return () => clearInterval(moveInterval);
  }, [enemies, gameStatus, updateEnemy, removeEnemy, takeDamage]);

  // Turret firing logic
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const fireInterval = setInterval(() => {
      const now = Date.now();
      
      turrets.forEach(turret => {
        if (now - turret.lastFired < turret.fireRate) return;
        
        // Find nearest enemy in range
        let nearestEnemy = null;
        let minDistance = turret.range;
        
        enemies.forEach(enemy => {
          const distance = Math.sqrt(
            Math.pow(enemy.x - turret.x, 2) + 
            Math.pow(enemy.y - turret.y, 2)
          );
          
          if (distance <= turret.range && distance < minDistance) {
            minDistance = distance;
            nearestEnemy = enemy;
          }
        });
        
        if (nearestEnemy) {
          // Fire at enemy
          turret.lastFired = now;
          const newHealth = nearestEnemy.health - turret.damage;
          
          if (newHealth <= 0) {
            removeEnemy(nearestEnemy.id);
            addScore(10);
            addCredits(5);
          } else {
            updateEnemy(nearestEnemy.id, { health: newHealth });
          }
        }
      });
    }, 100);

    return () => clearInterval(fireInterval);
  }, [turrets, enemies, gameStatus, updateEnemy, removeEnemy, addScore, addCredits]);

  // Wave management
  useEffect(() => {
    if (gameStatus === 'playing' && enemies.length === 0) {
      const timer = setTimeout(() => {
        nextWave();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [enemies.length, gameStatus, nextWave]);

  return (
    <div className="relative w-full h-full max-w-[600px] max-h-[600px] mx-auto p-2" ref={gameRef}>
      <div className="game-grid aspect-square bg-black/30 rounded-lg backdrop-blur-sm border border-neon-blue/30">
        {/* Grid cells */}
        {Array.from({ length: 100 }).map((_, index) => {
          const x = index % 10;
          const y = Math.floor(index / 10);
          const isCenter = (x === 4 || x === 5) && (y === 4 || y === 5);
          const isSelected = selectedCell?.x === x && selectedCell?.y === y;
          const hasTurret = turrets.some(t => t.x === x && t.y === y);
          
          return (
            <div
              key={index}
              className={`
                relative border border-gray-800/30 cursor-pointer
                transition-all duration-200
                ${isCenter ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30' : 'bg-gray-900/20'}
                ${isSelected ? 'bg-neon-green/20 border-neon-green' : ''}
                ${hasTurret ? 'cursor-not-allowed' : 'hover:bg-white/10'}
              `}
              onClick={() => handleCellClick(x, y)}
            >
              {isCenter && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-neon-blue animate-pulse-slow" />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Enemies */}
        {enemies.map(enemy => (
          <Enemy key={enemy.id} enemy={enemy} />
        ))}
        
        {/* Turrets */}
        {turrets.map(turret => (
          <Turret key={turret.id} turret={turret} />
        ))}
        
        {/* Selection indicator */}
        {selectedCell && credits >= 50 && (
          <div
            className="absolute pointer-events-none animate-pulse"
            style={{
              left: `${selectedCell.x * 10}%`,
              top: `${selectedCell.y * 10}%`,
              width: '10%',
              height: '10%',
            }}
          >
            <div className="w-full h-full border-2 border-neon-green rounded flex items-center justify-center">
              <Zap className="w-5 h-5 text-neon-green" />
            </div>
          </div>
        )}
        
        {/* Not enough credits warning */}
        {selectedCell && credits < 50 && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${selectedCell.x * 10}%`,
              top: `${selectedCell.y * 10}%`,
              width: '10%',
              height: '10%',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-danger-red animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;