import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Enemy } from '../types/game';

export const useGameLoop = () => {
  const lastTimeRef = useRef(0);
  const waveTimerRef = useRef(0);
  const enemySpawnTimerRef = useRef(0);
  const enemyIndexRef = useRef(0);
  
  useEffect(() => {
    let animationFrameId: number;
    
    const gameLoop = (currentTime: number) => {
      const {
        isPlaying,
        isPaused,
        gameSpeed,
        wave,
        enemies,
        towers,
        health,
        moveEnemies,
        spawnEnemy,
        damageEnemy,
        removeEnemy,
        nextWave,
        gameOver,
      } = useGameStore.getState();
      
      if (!isPlaying || isPaused) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }
      
      const deltaTime = (currentTime - lastTimeRef.current) * gameSpeed;
      lastTimeRef.current = currentTime;
      
      // Check game over
      if (health <= 0) {
        gameOver();
        return;
      }
      
      // Move enemies
      moveEnemies();
      
      // Spawn enemies
      waveTimerRef.current += deltaTime;
      if (waveTimerRef.current > 3000 && enemyIndexRef.current < wave * 3) {
        enemySpawnTimerRef.current += deltaTime;
        
        if (enemySpawnTimerRef.current > 1000) {
          const enemyTypes: Array<'asteroid' | 'alien' | 'meteor'> = ['asteroid', 'alien', 'meteor'];
          const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
          
          const newEnemy: Enemy = {
            id: `enemy-${Date.now()}-${enemyIndexRef.current}`,
            type: enemyType,
            position: { x: 0, y: 320 },
            health: 50 + wave * 10,
            maxHealth: 50 + wave * 10,
            speed: 0.5 + wave * 0.1,
            value: 10 + wave * 5,
            pathIndex: 0,
          };
          
          spawnEnemy(newEnemy);
          enemyIndexRef.current++;
          enemySpawnTimerRef.current = 0;
        }
      }
      
      // Tower shooting
      towers.forEach(tower => {
        if (currentTime - tower.lastFireTime > tower.fireRate / gameSpeed) {
          // Find nearest enemy in range
          const enemiesInRange = enemies.filter(enemy => {
            const dx = enemy.position.x - tower.position.x;
            const dy = enemy.position.y - tower.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= tower.range;
          });
          
          if (enemiesInRange.length > 0) {
            const target = enemiesInRange[0];
            damageEnemy(target.id, tower.damage);
            
            // Update last fire time
            const updatedTowers = useGameStore.getState().towers.map(t =>
              t.id === tower.id ? { ...t, lastFireTime: currentTime } : t
            );
            useGameStore.setState({ towers: updatedTowers });
          }
        }
      });
      
      // Remove dead enemies
      enemies.forEach(enemy => {
        if (enemy.health <= 0) {
          removeEnemy(enemy.id);
        }
      });
      
      // Check wave completion
      if (enemyIndexRef.current >= wave * 3 && enemies.length === 0) {
        nextWave();
        waveTimerRef.current = 0;
        enemyIndexRef.current = 0;
      }
      
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    animationFrameId = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
};