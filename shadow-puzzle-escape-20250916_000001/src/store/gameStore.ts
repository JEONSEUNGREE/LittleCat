import { create } from 'zustand';
import { GameState, Level, LightSource, ShadowObject } from '../types/game';
import { levels } from '../data/levels';

interface GameStore extends GameState {
  levels: Level[];
  currentLevelData: Level | null;
  lightSources: LightSource[];
  objects: ShadowObject[];
  selectedItem: string | null;
  isDragging: boolean;
  
  // Actions
  initLevel: (levelId: number) => void;
  selectItem: (itemId: string | null) => void;
  updateLightSource: (id: string, updates: Partial<LightSource>) => void;
  updateObject: (id: string, updates: Partial<ShadowObject>) => void;
  incrementMove: () => void;
  checkWinCondition: () => boolean;
  completeLevel: (stars: number) => void;
  useHint: () => string | null;
  resetLevel: () => void;
  nextLevel: () => void;
  setDragging: (dragging: boolean) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  currentLevel: 1,
  moves: 0,
  isComplete: false,
  stars: 0,
  hintsUsed: 0,
  totalScore: 0,
  levels: levels,
  currentLevelData: null,
  lightSources: [],
  objects: [],
  selectedItem: null,
  isDragging: false,

  // Actions
  initLevel: (levelId) => {
    const level = levels.find(l => l.id === levelId);
    if (level) {
      set({
        currentLevel: levelId,
        currentLevelData: level,
        lightSources: [...level.lightSources],
        objects: [...level.objects],
        moves: 0,
        isComplete: false,
        stars: 0,
        hintsUsed: 0,
        selectedItem: null,
      });
    }
  },

  selectItem: (itemId) => set({ selectedItem: itemId }),

  updateLightSource: (id, updates) => {
    set((state) => ({
      lightSources: state.lightSources.map(light =>
        light.id === id ? { ...light, ...updates } : light
      ),
    }));
    get().incrementMove();
  },

  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map(obj =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    }));
    get().incrementMove();
  },

  incrementMove: () => {
    set((state) => ({ moves: state.moves + 1 }));
  },

  checkWinCondition: () => {
    // Simplified win condition - check if shadow matches target
    // In a real game, this would involve complex shadow calculation
    const { moves, currentLevelData } = get();
    if (!currentLevelData) return false;
    
    // Simple win condition based on moves
    if (moves >= 5) {
      let stars = 0;
      if (moves <= currentLevelData.stars.three) stars = 3;
      else if (moves <= currentLevelData.stars.two) stars = 2;
      else if (moves <= currentLevelData.stars.one) stars = 1;
      
      get().completeLevel(stars);
      return true;
    }
    return false;
  },

  completeLevel: (stars) => {
    set((state) => ({
      isComplete: true,
      stars,
      totalScore: state.totalScore + (stars * 100),
    }));
  },

  useHint: () => {
    const { currentLevelData, hintsUsed } = get();
    if (!currentLevelData || hintsUsed >= currentLevelData.hints.length) {
      return null;
    }
    
    const hint = currentLevelData.hints[hintsUsed];
    set((state) => ({ hintsUsed: state.hintsUsed + 1 }));
    return hint;
  },

  resetLevel: () => {
    const { currentLevel } = get();
    get().initLevel(currentLevel);
  },

  nextLevel: () => {
    const { currentLevel, levels } = get();
    const nextLevelId = currentLevel + 1;
    if (nextLevelId <= levels.length) {
      get().initLevel(nextLevelId);
    }
  },

  setDragging: (dragging) => set({ isDragging: dragging }),
}))