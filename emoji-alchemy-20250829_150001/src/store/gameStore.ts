import { create } from 'zustand';
import { Recipe, GameElement } from '../types/game';

const baseElements: GameElement[] = [
  { id: 'fire', emoji: '🔥', name: 'Fire', isBase: true },
  { id: 'water', emoji: '💧', name: 'Water', isBase: true },
  { id: 'earth', emoji: '🌍', name: 'Earth', isBase: true },
  { id: 'air', emoji: '💨', name: 'Air', isBase: true },
];

const recipes: Recipe[] = [
  { id: 'steam', emoji1: '🔥', emoji2: '💧', result: '☁️', name: 'Steam', discovered: false },
  { id: 'mud', emoji1: '💧', emoji2: '🌍', result: '🟫', name: 'Mud', discovered: false },
  { id: 'lava', emoji1: '🔥', emoji2: '🌍', result: '🌋', name: 'Lava', discovered: false },
  { id: 'storm', emoji1: '💨', emoji2: '💧', result: '⛈️', name: 'Storm', discovered: false },
  { id: 'dust', emoji1: '💨', emoji2: '🌍', result: '🌪️', name: 'Dust Storm', discovered: false },
  { id: 'energy', emoji1: '🔥', emoji2: '💨', result: '⚡', name: 'Energy', discovered: false },
  { id: 'plant', emoji1: '💧', emoji2: '🟫', result: '🌱', name: 'Plant', discovered: false },
  { id: 'tree', emoji1: '🌱', emoji2: '🌍', result: '🌳', name: 'Tree', discovered: false },
  { id: 'flower', emoji1: '🌱', emoji2: '☀️', result: '🌸', name: 'Flower', discovered: false },
  { id: 'sun', emoji1: '🔥', emoji2: '⚡', result: '☀️', name: 'Sun', discovered: false },
  { id: 'moon', emoji1: '🌍', emoji2: '⚡', result: '🌙', name: 'Moon', discovered: false },
  { id: 'star', emoji1: '☀️', emoji2: '🌙', result: '⭐', name: 'Star', discovered: false },
  { id: 'galaxy', emoji1: '⭐', emoji2: '⭐', result: '🌌', name: 'Galaxy', discovered: false },
  { id: 'rainbow', emoji1: '☀️', emoji2: '💧', result: '🌈', name: 'Rainbow', discovered: false },
  { id: 'snow', emoji1: '💧', emoji2: '❄️', result: '☃️', name: 'Snow', discovered: false },
  { id: 'ice', emoji1: '💧', emoji2: '🌙', result: '❄️', name: 'Ice', discovered: false },
  { id: 'ocean', emoji1: '💧', emoji2: '💧', result: '🌊', name: 'Ocean', discovered: false },
  { id: 'volcano', emoji1: '🌋', emoji2: '🌍', result: '🗻', name: 'Mountain', discovered: false },
  { id: 'desert', emoji1: '☀️', emoji2: '🌍', result: '🏜️', name: 'Desert', discovered: false },
  { id: 'forest', emoji1: '🌳', emoji2: '🌳', result: '🌲', name: 'Forest', discovered: false },
];

interface GameState {
  elements: GameElement[];
  recipes: Recipe[];
  selectedElements: string[];
  score: number;
  discoveredCount: number;
  hint: string;
  selectElement: (emoji: string) => void;
  clearSelection: () => void;
  tryRecipe: () => string | null;
  getHint: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  elements: baseElements,
  recipes: recipes,
  selectedElements: [],
  score: 0,
  discoveredCount: 0,
  hint: '',

  selectElement: (emoji: string) => {
    const { selectedElements } = get();
    if (selectedElements.length < 2) {
      set({ selectedElements: [...selectedElements, emoji] });
    }
  },

  clearSelection: () => {
    set({ selectedElements: [], hint: '' });
  },

  tryRecipe: () => {
    const { selectedElements, recipes, elements, score, discoveredCount } = get();
    
    if (selectedElements.length !== 2) return null;

    const [elem1, elem2] = selectedElements;
    
    const recipe = recipes.find(
      r => (r.emoji1 === elem1 && r.emoji2 === elem2) ||
           (r.emoji1 === elem2 && r.emoji2 === elem1)
    );

    if (recipe && !recipe.discovered) {
      const newRecipes = recipes.map(r => 
        r.id === recipe.id ? { ...r, discovered: true } : r
      );
      
      const newElement: GameElement = {
        id: recipe.id,
        emoji: recipe.result,
        name: recipe.name,
        isBase: false
      };

      const elementExists = elements.some(e => e.id === recipe.id);
      const newElements = elementExists ? elements : [...elements, newElement];

      set({
        recipes: newRecipes,
        elements: newElements,
        score: score + 100,
        discoveredCount: discoveredCount + 1,
        selectedElements: [],
        hint: `✨ Discovered ${recipe.name}!`
      });

      return recipe.result;
    } else if (recipe && recipe.discovered) {
      set({ hint: `You already discovered ${recipe.name}!` });
    } else {
      set({ hint: 'No recipe found. Try different combinations!' });
    }

    setTimeout(() => {
      set({ hint: '' });
    }, 2000);

    return null;
  },

  getHint: () => {
    const { recipes } = get();
    const undiscovered = recipes.filter(r => !r.discovered);
    
    if (undiscovered.length > 0) {
      const randomRecipe = undiscovered[Math.floor(Math.random() * undiscovered.length)];
      set({ hint: `Try combining ${randomRecipe.emoji1} with ${randomRecipe.emoji2}` });
      
      setTimeout(() => {
        set({ hint: '' });
      }, 3000);
    } else {
      set({ hint: 'You discovered everything! Amazing!' });
    }
  },

  resetGame: () => {
    set({
      elements: baseElements,
      recipes: recipes.map(r => ({ ...r, discovered: false })),
      selectedElements: [],
      score: 0,
      discoveredCount: 0,
      hint: ''
    });
  }
}));