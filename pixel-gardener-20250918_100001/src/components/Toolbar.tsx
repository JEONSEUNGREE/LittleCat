
import { Droplets, Scissors, Sprout } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Toolbar: React.FC = () => {
  const { currentTool, selectTool, selectedSeed, selectSeed, seeds } = useGameStore();

  const tools = [
    { id: 'seed' as const, icon: Sprout, label: '씨앗' },
    { id: 'water' as const, icon: Droplets, label: '물주기' },
    { id: 'harvest' as const, icon: Scissors, label: '수확' },
  ];

  const seedTypes = [
    { id: 'tomato' as const, emoji: '🍅', label: '토마토' },
    { id: 'carrot' as const, emoji: '🥕', label: '당근' },
    { id: 'sunflower' as const, emoji: '🌻', label: '해바라기' },
    { id: 'corn' as const, emoji: '🌽', label: '옥수수' },
    { id: 'pumpkin' as const, emoji: '🎃', label: '호박' },
  ];

  return (
    <div className="bg-white border-t-2 border-gray-200">
      <div className="p-3">
        <div className="flex gap-2 justify-center mb-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => selectTool(tool.id)}
                className={`
                  flex flex-col items-center p-2 rounded-lg transition-all
                  ${currentTool === tool.id 
                    ? 'bg-green-500 text-white scale-110' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 pixel-text">{tool.label}</span>
              </button>
            );
          })}
        </div>
        
        {currentTool === 'seed' && (
          <div className="flex gap-2 justify-center">
            {seedTypes.map((seed) => (
              <button
                key={seed.id}
                onClick={() => selectSeed(seed.id)}
                className={`
                  flex flex-col items-center p-2 rounded-lg transition-all relative
                  ${selectedSeed === seed.id 
                    ? 'bg-amber-500 text-white scale-110' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                  ${seeds[seed.id] === 0 ? 'opacity-50' : ''}
                `}
                disabled={seeds[seed.id] === 0}
              >
                <span className="text-2xl">{seed.emoji}</span>
                <span className="text-xs mt-1 pixel-text">{seed.label}</span>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {seeds[seed.id]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;