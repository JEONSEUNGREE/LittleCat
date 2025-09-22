import { create } from 'zustand';
import { Planet, Spaceship, Level, GameState, Vector2D } from '../types/game';
import { levels } from '../data/levels';

interface GameStore extends GameState {
  level: Level | null;
  spaceship: Spaceship;
  planets: Planet[];
  isPlaying: boolean;
  isPaused: boolean;
  adjustmentsUsed: number;
  levelComplete: boolean;
  levelFailed: boolean;
  
  initLevel: (levelId: number) => void;
  launchSpaceship: () => void;
  updateSpaceship: (deltaTime: number) => void;
  togglePlanetGravity: (planetId: string) => void;
  adjustPlanetGravity: (planetId: string, strength: number) => void;
  resetLevel: () => void;
  nextLevel: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
}

const initialSpaceship: Spaceship = {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  trail: [],
  isLaunched: false,
};

export const useGameStore = create<GameStore>((set, get) => ({
  currentLevel: 1,
  completedLevels: [],
  stars: {},
  totalMoves: 0,
  bestScores: {},
  level: null,
  spaceship: { ...initialSpaceship },
  planets: [],
  isPlaying: false,
  isPaused: false,
  adjustmentsUsed: 0,
  levelComplete: false,
  levelFailed: false,

  initLevel: (levelId) => {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;

    set({
      level,
      planets: level.planets.map(p => ({ ...p })),
      spaceship: {
        ...initialSpaceship,
        position: { ...level.shipStart },
      },
      isPlaying: false,
      isPaused: false,
      adjustmentsUsed: 0,
      levelComplete: false,
      levelFailed: false,
      currentLevel: levelId,
    });
  },

  launchSpaceship: () => {
    const state = get();
    if (state.spaceship.isLaunched || !state.level) return;

    set({
      spaceship: {
        ...state.spaceship,
        velocity: { x: 50, y: 0 },
        isLaunched: true,
        trail: [],
      },
      isPlaying: true,
    });
  },

  updateSpaceship: (deltaTime) => {
    const state = get();
    if (!state.isPlaying || state.isPaused || !state.level) return;

    const ship = state.spaceship;
    const planets = state.planets;
    const target = state.level.target;

    let totalForce = { x: 0, y: 0 };

    planets.forEach(planet => {
      if (!planet.isActive) return;

      const dx = planet.position.x - ship.position.x;
      const dy = planet.position.y - ship.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < planet.radius) {
        set({ levelFailed: true, isPlaying: false });
        return;
      }

      const force = (planet.gravityStrength * 1000) / (distance * distance);
      totalForce.x += (dx / distance) * force;
      totalForce.y += (dy / distance) * force;
    });

    const newVelocity = {
      x: ship.velocity.x + totalForce.x * deltaTime,
      y: ship.velocity.y + totalForce.y * deltaTime,
    };

    const newPosition = {
      x: ship.position.x + newVelocity.x * deltaTime,
      y: ship.position.y + newVelocity.y * deltaTime,
    };

    const targetDist = Math.sqrt(
      Math.pow(target.position.x - newPosition.x, 2) +
      Math.pow(target.position.y - newPosition.y, 2)
    );

    if (targetDist < target.radius) {
      const stars = state.adjustmentsUsed <= 1 ? 3 : state.adjustmentsUsed <= 3 ? 2 : 1;
      set({
        levelComplete: true,
        isPlaying: false,
        stars: { ...state.stars, [state.currentLevel]: stars },
        completedLevels: [...new Set([...state.completedLevels, state.currentLevel])],
      });
      return;
    }

    if (Math.abs(newPosition.x) > 500 || Math.abs(newPosition.y) > 400) {
      set({ levelFailed: true, isPlaying: false });
      return;
    }

    const trail = [...ship.trail, ship.position].slice(-50);

    set({
      spaceship: {
        ...ship,
        position: newPosition,
        velocity: newVelocity,
        trail,
      },
    });
  },

  togglePlanetGravity: (planetId) => {
    const state = get();
    if (state.spaceship.isLaunched || !state.level) return;

    const planets = state.planets.map(p =>
      p.id === planetId ? { ...p, isActive: !p.isActive } : p
    );

    set({
      planets,
      adjustmentsUsed: state.adjustmentsUsed + 1,
    });
  },

  adjustPlanetGravity: (planetId, strength) => {
    const state = get();
    if (state.spaceship.isLaunched || !state.level) return;

    const planets = state.planets.map(p =>
      p.id === planetId ? { ...p, gravityStrength: strength } : p
    );

    set({
      planets,
      adjustmentsUsed: state.adjustmentsUsed + 1,
    });
  },

  resetLevel: () => {
    const state = get();
    if (state.level) {
      get().initLevel(state.level.id);
    }
  },

  nextLevel: () => {
    const state = get();
    const nextLevelId = state.currentLevel + 1;
    if (nextLevelId <= levels.length) {
      get().initLevel(nextLevelId);
    }
  },

  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
}))