
import { useGameStore } from '../store/gameStore';
import { PlantConfig } from '../types/game';

const PLANT_EMOJIS: Record<string, Record<string, string>> = {
  seed: { default: '🌰' },
  sprout: { default: '🌱' },
  growing: {
    tomato: '🍃',
    carrot: '🥕',
    sunflower: '🌻',
    corn: '🌽',
    pumpkin: '🎃',
  },
  mature: {
    tomato: '🍅',
    carrot: '🥕',
    sunflower: '🌻',
    corn: '🌽',
    pumpkin: '🎃',
  },
  harvestable: {
    tomato: '🍅',
    carrot: '🥕',
    sunflower: '🌻',
    corn: '🌽',
    pumpkin: '🎃',
  },
};

const Garden: React.FC = () => {
  const { plants, currentTool, selectedSeed, addPlant, waterPlant, harvestPlant, season } = useGameStore();
  
  const gardenGrid = Array.from({ length: 5 }, () => Array(5).fill(null));
  
  plants.forEach((plant) => {
    gardenGrid[plant.position.y][plant.position.x] = plant;
  });

  const handleCellClick = (x: number, y: number) => {
    const existingPlant = gardenGrid[y][x];
    
    if (currentTool === 'seed' && !existingPlant) {
      addPlant({
        type: selectedSeed,
        stage: 'seed',
        waterLevel: 0,
        growthTime: 0,
        position: { x, y },
      });
    } else if (currentTool === 'water' && existingPlant) {
      waterPlant(existingPlant.id);
    } else if (currentTool === 'harvest' && existingPlant?.stage === 'harvestable') {
      harvestPlant(existingPlant.id);
    }
  };

  const getSeasonBackground = () => {
    const seasonColors = {
      spring: 'from-green-100 to-blue-200',
      summer: 'from-yellow-100 to-green-200',
      autumn: 'from-orange-100 to-yellow-200',
      winter: 'from-gray-100 to-blue-100',
    };
    return seasonColors[season];
  };

  const getPlantEmoji = (plant: any) => {
    const stageEmojis = PLANT_EMOJIS[plant.stage];
    return stageEmojis[plant.type] || stageEmojis.default || '🌱';
  };

  return (
    <div className={`flex-1 p-4 bg-gradient-to-b ${getSeasonBackground()} overflow-hidden`}>
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-2 bg-garden-soil/20 p-4 rounded-lg">
          {gardenGrid.map((row, y) => (
            row.map((cell, x) => (
              <button
                key={`${x}-${y}`}
                onClick={() => handleCellClick(x, y)}
                className={`
                  aspect-square bg-garden-soil rounded-lg border-2 border-amber-900/30
                  flex items-center justify-center text-3xl
                  transform transition-all duration-200
                  ${!cell && currentTool === 'seed' ? 'hover:scale-110 hover:bg-garden-soil/80' : ''}
                  ${cell && currentTool === 'water' ? 'hover:scale-110' : ''}
                  ${cell?.stage === 'harvestable' ? 'animate-grow' : ''}
                  pixel-art
                `}
              >
                {cell && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span className={cell.stage === 'harvestable' ? 'animate-pulse' : ''}>
                      {getPlantEmoji(cell)}
                    </span>
                    {cell.waterLevel < 3 && cell.stage !== 'harvestable' && (
                      <span className="absolute top-0 right-0 text-xs">💧</span>
                    )}
                  </div>
                )}
              </button>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Garden;