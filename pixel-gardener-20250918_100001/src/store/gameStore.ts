import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Plant, GameState } from '../types/game';

interface GameStore extends GameState {
  plants: Plant[];
  addPlant: (plant: Omit<Plant, 'id' | 'plantedAt'>) => void;
  waterPlant: (id: string) => void;
  harvestPlant: (id: string) => void;
  updatePlants: () => void;
  buySeed: (type: keyof GameState['seeds']) => void;
  selectTool: (tool: GameState['currentTool']) => void;
  selectSeed: (seed: keyof GameState['seeds']) => void;
  addExperience: (amount: number) => void;
  changeSeason: () => void;
  reset: () => void;
}

const initialState: GameState = {
  coins: 100,
  level: 1,
  experience: 0,
  seeds: {
    tomato: 5,
    carrot: 3,
    sunflower: 2,
    corn: 1,
    pumpkin: 1,
  },
  harvested: {
    tomato: 0,
    carrot: 0,
    sunflower: 0,
    corn: 0,
    pumpkin: 0,
  },
  currentTool: 'seed',
  selectedSeed: 'tomato',
  season: 'spring',
};

const PLANT_CONFIGS = {
  tomato: { growthTime: 30000, sellPrice: 10, seedCost: 5, waterNeeded: 3 },
  carrot: { growthTime: 45000, sellPrice: 15, seedCost: 8, waterNeeded: 4 },
  sunflower: { growthTime: 60000, sellPrice: 25, seedCost: 12, waterNeeded: 5 },
  corn: { growthTime: 75000, sellPrice: 35, seedCost: 18, waterNeeded: 6 },
  pumpkin: { growthTime: 90000, sellPrice: 50, seedCost: 25, waterNeeded: 7 },
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      plants: [],

      addPlant: (plantData) => {
        const state = get();
        if (state.seeds[plantData.type] <= 0) return;

        const newPlant: Plant = {
          ...plantData,
          id: Math.random().toString(36).substr(2, 9),
          plantedAt: Date.now(),
        };

        set((state) => ({
          plants: [...state.plants, newPlant],
          seeds: {
            ...state.seeds,
            [plantData.type]: state.seeds[plantData.type] - 1,
          },
        }));
      },

      waterPlant: (id) => {
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === id
              ? { ...plant, waterLevel: Math.min(plant.waterLevel + 1, 10) }
              : plant
          ),
        }));
      },

      harvestPlant: (id) => {
        const state = get();
        const plant = state.plants.find((p) => p.id === id);
        
        if (!plant || plant.stage !== 'harvestable') return;

        const config = PLANT_CONFIGS[plant.type];
        
        set((state) => ({
          plants: state.plants.filter((p) => p.id !== id),
          coins: state.coins + config.sellPrice,
          harvested: {
            ...state.harvested,
            [plant.type]: state.harvested[plant.type] + 1,
          },
        }));

        get().addExperience(10);
      },

      updatePlants: () => {
        const now = Date.now();
        
        set((state) => ({
          plants: state.plants.map((plant) => {
            const config = PLANT_CONFIGS[plant.type];
            const age = now - plant.plantedAt;
            const growthProgress = age / config.growthTime;
            
            let stage = plant.stage;
            
            if (growthProgress >= 1 && plant.waterLevel >= config.waterNeeded) {
              stage = 'harvestable';
            } else if (growthProgress >= 0.75) {
              stage = 'mature';
            } else if (growthProgress >= 0.5) {
              stage = 'growing';
            } else if (growthProgress >= 0.25) {
              stage = 'sprout';
            }
            
            return { ...plant, stage };
          }),
        }));
      },

      buySeed: (type) => {
        const state = get();
        const config = PLANT_CONFIGS[type];
        
        if (state.coins < config.seedCost) return;
        
        set((state) => ({
          coins: state.coins - config.seedCost,
          seeds: {
            ...state.seeds,
            [type]: state.seeds[type] + 1,
          },
        }));
      },

      selectTool: (tool) => set({ currentTool: tool }),
      
      selectSeed: (seed) => set({ selectedSeed: seed }),

      addExperience: (amount) => {
        set((state) => {
          const newExp = state.experience + amount;
          const expNeeded = state.level * 100;
          
          if (newExp >= expNeeded) {
            return {
              experience: newExp - expNeeded,
              level: state.level + 1,
            };
          }
          
          return { experience: newExp };
        });
      },

      changeSeason: () => {
        const seasons: GameState['season'][] = ['spring', 'summer', 'autumn', 'winter'];
        const state = get();
        const currentIndex = seasons.indexOf(state.season);
        const nextIndex = (currentIndex + 1) % seasons.length;
        
        set({ season: seasons[nextIndex] });
      },

      reset: () => {
        set({ ...initialState, plants: [] });
      },
    }),
    {
      name: 'pixel-gardener-storage',
    }
  )
);