import { create } from 'zustand';
import { GameState, GravityDirection, GameObject, Level } from '../types';
import { levels } from '../data/levels';

interface GameStore extends GameState {
  objects: GameObject[];
  setGravity: (direction: GravityDirection) => void;
  resetLevel: () => void;
  nextLevel: () => void;
  previousLevel: () => void;
  selectLevel: (levelId: number) => void;
  applyGravity: () => void;
  checkWinCondition: () => void;
  togglePause: () => void;
}

const initialState: GameState = {
  currentLevel: 1,
  moves: 0,
  gravity: 'down',
  isWon: false,
  isPaused: false,
  stars: 0,
  completedLevels: new Set(),
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  objects: [...levels[0].objects],

  setGravity: (direction: GravityDirection) => {
    const state = get();
    if (state.isWon || state.isPaused) return;
    
    set({ 
      gravity: direction, 
      moves: state.moves + 1 
    });
    
    // Apply gravity after direction change
    get().applyGravity();
  },

  applyGravity: () => {
    const { objects, gravity } = get();
    const newObjects = [...objects];
    
    // Sort objects based on gravity direction to process them in correct order
    const sortedIndices = [...Array(newObjects.length).keys()];
    
    if (gravity === 'down') {
      sortedIndices.sort((a, b) => newObjects[b].position.y - newObjects[a].position.y);
    } else if (gravity === 'up') {
      sortedIndices.sort((a, b) => newObjects[a].position.y - newObjects[b].position.y);
    } else if (gravity === 'right') {
      sortedIndices.sort((a, b) => newObjects[b].position.x - newObjects[a].position.x);
    } else if (gravity === 'left') {
      sortedIndices.sort((a, b) => newObjects[a].position.x - newObjects[b].position.x);
    }

    // Apply gravity to each movable object
    sortedIndices.forEach(index => {
      const obj = newObjects[index];
      if (!obj.isMovable) return;

      let newPos = { ...obj.position };
      let canMove = true;

      while (canMove) {
        const nextPos = { ...newPos };
        
        if (gravity === 'down') nextPos.y += 1;
        else if (gravity === 'up') nextPos.y -= 1;
        else if (gravity === 'right') nextPos.x += 1;
        else if (gravity === 'left') nextPos.x -= 1;

        // Check boundaries
        if (nextPos.x < 0 || nextPos.x >= 8 || nextPos.y < 0 || nextPos.y >= 8) {
          break;
        }

        // Check collision with other objects
        const collision = newObjects.some(other => 
          other.id !== obj.id &&
          other.position.x === nextPos.x &&
          other.position.y === nextPos.y &&
          (other.type === 'wall' || other.type === 'box' || other.type === 'player')
        );

        if (collision) {
          break;
        }

        newPos = nextPos;
      }

      newObjects[index] = { ...obj, position: newPos };
    });

    set({ objects: newObjects });
    get().checkWinCondition();
  },

  checkWinCondition: () => {
    const { objects, currentLevel, moves, completedLevels } = get();
    const level = levels.find(l => l.id === currentLevel);
    if (!level) return;

    const player = objects.find(obj => obj.type === 'player');
    const goal = objects.find(obj => obj.type === 'goal');

    if (player && goal && 
        player.position.x === goal.position.x && 
        player.position.y === goal.position.y) {
      
      // Calculate stars based on moves
      let stars = 0;
      if (moves <= level.stars.three) stars = 3;
      else if (moves <= level.stars.two) stars = 2;
      else if (moves <= level.stars.one) stars = 1;

      const newCompletedLevels = new Set(completedLevels);
      newCompletedLevels.add(currentLevel);

      set({ 
        isWon: true, 
        stars,
        completedLevels: newCompletedLevels
      });
    }
  },

  resetLevel: () => {
    const { currentLevel } = get();
    const level = levels.find(l => l.id === currentLevel);
    if (!level) return;

    set({
      objects: [...level.objects],
      moves: 0,
      gravity: 'down',
      isWon: false,
      stars: 0,
    });
  },

  nextLevel: () => {
    const { currentLevel } = get();
    const nextLevelIndex = levels.findIndex(l => l.id === currentLevel) + 1;
    
    if (nextLevelIndex < levels.length) {
      const nextLevel = levels[nextLevelIndex];
      set({
        currentLevel: nextLevel.id,
        objects: [...nextLevel.objects],
        moves: 0,
        gravity: 'down',
        isWon: false,
        stars: 0,
      });
    }
  },

  previousLevel: () => {
    const { currentLevel } = get();
    const prevLevelIndex = levels.findIndex(l => l.id === currentLevel) - 1;
    
    if (prevLevelIndex >= 0) {
      const prevLevel = levels[prevLevelIndex];
      set({
        currentLevel: prevLevel.id,
        objects: [...prevLevel.objects],
        moves: 0,
        gravity: 'down',
        isWon: false,
        stars: 0,
      });
    }
  },

  selectLevel: (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;

    set({
      currentLevel: level.id,
      objects: [...level.objects],
      moves: 0,
      gravity: 'down',
      isWon: false,
      stars: 0,
    });
  },

  togglePause: () => {
    set(state => ({ isPaused: !state.isPaused }));
  },
}));