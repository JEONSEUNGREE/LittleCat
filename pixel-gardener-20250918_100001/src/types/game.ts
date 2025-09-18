export interface Plant {
  id: string;
  type: 'tomato' | 'carrot' | 'sunflower' | 'corn' | 'pumpkin';
  stage: 'seed' | 'sprout' | 'growing' | 'mature' | 'harvestable';
  waterLevel: number;
  growthTime: number;
  position: { x: number; y: number };
  plantedAt: number;
}

export interface GameState {
  coins: number;
  level: number;
  experience: number;
  seeds: {
    tomato: number;
    carrot: number;
    sunflower: number;
    corn: number;
    pumpkin: number;
  };
  harvested: {
    tomato: number;
    carrot: number;
    sunflower: number;
    corn: number;
    pumpkin: number;
  };
  currentTool: 'seed' | 'water' | 'harvest';
  selectedSeed: keyof GameState['seeds'];
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface PlantConfig {
  name: string;
  growthTime: number;
  sellPrice: number;
  seedCost: number;
  waterNeeded: number;
  emoji: string;
  color: string;
}