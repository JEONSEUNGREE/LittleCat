
import { Recipe } from '../types/game';
import { Lock, Unlock } from 'lucide-react';

interface DiscoveryListProps {
  recipes: Recipe[];
}

const DiscoveryList: React.FC<DiscoveryListProps> = ({ recipes }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white/90 flex items-center gap-2">
        <Unlock className="w-5 h-5 text-green-400" />
        Discoveries
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`
              flex items-center gap-2 p-2 rounded-lg transition-all
              ${recipe.discovered 
                ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20' 
                : 'bg-gray-700/30 opacity-50'
              }
            `}
          >
            {recipe.discovered ? (
              <>
                <span className="emoji-small">{recipe.emoji1}</span>
                <span className="text-white/50">+</span>
                <span className="emoji-small">{recipe.emoji2}</span>
                <span className="text-white/50">=</span>
                <span className="emoji-small">{recipe.result}</span>
                <span className="text-xs text-white/70 ml-auto">{recipe.name}</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">???</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoveryList;