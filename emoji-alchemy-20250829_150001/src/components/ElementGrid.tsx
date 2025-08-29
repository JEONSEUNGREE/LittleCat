
import { GameElement } from '../types/game';

interface ElementGridProps {
  elements: GameElement[];
  selectedElements: string[];
  onElementClick: (emoji: string) => void;
}

const ElementGrid: React.FC<ElementGridProps> = ({ elements, selectedElements, onElementClick }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white/90">Your Elements</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
        {elements.map((element) => {
          const isSelected = selectedElements.includes(element.emoji);
          return (
            <button
              key={element.id}
              onClick={() => onElementClick(element.emoji)}
              className={`
                relative group p-3 sm:p-4 rounded-xl transition-all duration-200
                ${isSelected 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-110 animate-pulse' 
                  : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                }
                ${element.isBase ? 'ring-2 ring-yellow-400/30' : ''}
              `}
              aria-label={element.name}
            >
              <span className="emoji-medium sm:emoji-large block">{element.emoji}</span>
              <span className="absolute bottom-0 left-0 right-0 text-[10px] sm:text-xs text-white/70 
                             bg-black/30 rounded-b-xl py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {element.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ElementGrid;