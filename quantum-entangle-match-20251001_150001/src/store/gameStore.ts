import { create } from 'zustand';
import { Particle, GameState } from '../types';

interface GameStore extends GameState {
  initGame: () => void;
  selectParticle: (id: string) => void;
  entangleParticles: (id1: string, id2: string) => void;
  collapseParticle: (id: string) => void;
  nextLevel: () => void;
  resetGame: () => void;
  setGameStatus: (status: GameState['gameStatus']) => void;
}

const generateParticles = (level: number): Particle[] => {
  const gridSize = Math.min(4 + Math.floor(level / 2), 8);
  const particles: Particle[] = [];
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (Math.random() > 0.3) {
        particles.push({
          id: `${i}-${j}`,
          x: i,
          y: j,
          state: Math.random() > 0.7 ? 'superposition' : Math.random() > 0.5 ? 'up' : 'down',
          color: colors[Math.floor(Math.random() * colors.length)],
          isSelected: false,
        });
      }
    }
  }
  
  return particles;
};

export const useGameStore = create<GameStore>((set, get) => ({
  particles: [],
  score: 0,
  level: 1,
  moves: 0,
  maxMoves: 20,
  gameStatus: 'menu',
  
  initGame: () => {
    set({
      particles: generateParticles(1),
      score: 0,
      level: 1,
      moves: 0,
      maxMoves: 20,
      gameStatus: 'playing',
    });
  },
  
  selectParticle: (id: string) => {
    set((state) => ({
      particles: state.particles.map(p => 
        p.id === id ? { ...p, isSelected: !p.isSelected } : p
      ),
    }));
  },
  
  entangleParticles: (id1: string, id2: string) => {
    set((state) => {
      const newParticles = state.particles.map(p => {
        if (p.id === id1) {
          return { ...p, entangledWith: id2, state: 'superposition' as const };
        }
        if (p.id === id2) {
          return { ...p, entangledWith: id1, state: 'superposition' as const };
        }
        return p;
      });
      
      return {
        particles: newParticles,
        score: state.score + 100,
        moves: state.moves + 1,
      };
    });
  },
  
  collapseParticle: (id: string) => {
    set((state) => {
      const particle = state.particles.find(p => p.id === id);
      if (!particle) return state;
      
      const newState = Math.random() > 0.5 ? 'up' : 'down';
      const newParticles = state.particles.map(p => {
        if (p.id === id) {
          return { ...p, state: newState as 'up' | 'down', entangledWith: undefined };
        }
        if (p.entangledWith === id) {
          return { ...p, state: newState === 'up' ? 'down' : 'up' as 'up' | 'down', entangledWith: undefined };
        }
        return p;
      });
      
      const matchingParticles = newParticles.filter(p => p.state === newState);
      const scoreBonus = matchingParticles.length * 50;
      
      return {
        particles: newParticles.filter(p => p.state !== newState || p.id === id),
        score: state.score + scoreBonus,
        moves: state.moves + 1,
      };
    });
  },
  
  nextLevel: () => {
    const currentLevel = get().level;
    set({
      particles: generateParticles(currentLevel + 1),
      level: currentLevel + 1,
      moves: 0,
      maxMoves: 20 + currentLevel * 2,
      gameStatus: 'playing',
    });
  },
  
  resetGame: () => {
    set({
      particles: [],
      score: 0,
      level: 1,
      moves: 0,
      maxMoves: 20,
      gameStatus: 'menu',
    });
  },
  
  setGameStatus: (status: GameState['gameStatus']) => {
    set({ gameStatus: status });
  },
}));