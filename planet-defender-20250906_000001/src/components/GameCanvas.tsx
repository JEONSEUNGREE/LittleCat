import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Position } from '../types/game';
import { Zap, Rocket, CircleDot } from 'lucide-react';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  
  const { 
    enemies, 
    projectiles, 
    towers, 
    gameStatus,
    money,
    addTower,
    addEnemy,
    removeEnemy,
    updateScore,
    updateHealth,
    updateMoney
  } = useGameStore();

  // Spawn enemies periodically
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const spawnInterval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 350;
      const enemy = {
        id: `enemy-${Date.now()}-${Math.random()}`,
        position: {
          x: 200 + Math.cos(angle) * distance,
          y: 250 + Math.sin(angle) * distance
        },
        health: 100,
        maxHealth: 100,
        speed: 0.5,
        angle: angle + Math.PI,
        type: 'small' as const
      };
      addEnemy(enemy);
    }, 3000);

    return () => clearInterval(spawnInterval);
  }, [gameStatus, addEnemy]);

  // Move enemies towards planet
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const moveInterval = setInterval(() => {
      enemies.forEach(enemy => {
        const dx = 200 - enemy.position.x;
        const dy = 250 - enemy.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
          removeEnemy(enemy.id);
          updateHealth(10);
        } else {
          enemy.position.x += (dx / distance) * enemy.speed;
          enemy.position.y += (dy / distance) * enemy.speed;
        }
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameStatus, enemies, removeEnemy, updateHealth]);

  // Tower shooting logic
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const shootInterval = setInterval(() => {
      towers.forEach(tower => {
        const now = Date.now();
        if (now - tower.lastFired < 1000 / tower.fireRate) return;

        const nearbyEnemies = enemies.filter(enemy => {
          const dx = enemy.position.x - tower.position.x;
          const dy = enemy.position.y - tower.position.y;
          return Math.sqrt(dx * dx + dy * dy) <= tower.range;
        });

        if (nearbyEnemies.length > 0) {
          const target = nearbyEnemies[0];
          target.health -= tower.damage;
          tower.lastFired = now;

          if (target.health <= 0) {
            removeEnemy(target.id);
            updateScore(10);
            updateMoney(20);
          }
        }
      });
    }, 100);

    return () => clearInterval(shootInterval);
  }, [gameStatus, towers, enemies, removeEnemy, updateScore, updateMoney]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameStatus !== 'playing' || money < 100) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if position is valid (not too close to planet)
    const dx = x - 200;
    const dy = y - 250;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 80 || distance > 180) return;
    
    const tower = {
      id: `tower-${Date.now()}`,
      position: { x, y },
      type: 'laser' as const,
      level: 1,
      range: 100,
      damage: 25,
      fireRate: 2,
      lastFired: 0
    };
    
    addTower(tower);
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-b from-space-dark to-space-blue overflow-hidden"
      onClick={handleCanvasClick}
    >
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Planet */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-24 h-24 bg-gradient-to-br from-planet-green to-emerald-700 rounded-full animate-float glow">
          <div className="absolute inset-2 bg-gradient-to-tr from-transparent to-white/20 rounded-full" />
        </div>
      </div>

      {/* Towers */}
      {towers.map(tower => (
        <div
          key={tower.id}
          className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
          style={{ left: tower.position.x, top: tower.position.y }}
        >
          <div className="relative w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 rounded">
            <Zap className="w-6 h-6 text-laser-yellow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          {/* Range indicator */}
          <div 
            className="absolute rounded-full border border-cyan-400/20 pointer-events-none"
            style={{
              width: tower.range * 2,
              height: tower.range * 2,
              left: `calc(50% - ${tower.range}px)`,
              top: `calc(50% - ${tower.range}px)`
            }}
          />
        </div>
      ))}

      {/* Enemies */}
      {enemies.map(enemy => (
        <div
          key={enemy.id}
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2"
          style={{ left: enemy.position.x, top: enemy.position.y }}
        >
          <div className="relative w-full h-full">
            <Rocket className="w-6 h-6 text-enemy-red animate-spin-slow" />
            {/* Health bar */}
            <div className="absolute -top-2 left-0 w-full h-1 bg-gray-700 rounded">
              <div 
                className="h-full bg-red-500 rounded transition-all duration-200"
                style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Projectiles */}
      {projectiles.map(projectile => (
        <div
          key={projectile.id}
          className="absolute w-2 h-2 bg-laser-yellow rounded-full glow -translate-x-1/2 -translate-y-1/2"
          style={{ left: projectile.position.x, top: projectile.position.y }}
        />
      ))}
    </div>
  );
};