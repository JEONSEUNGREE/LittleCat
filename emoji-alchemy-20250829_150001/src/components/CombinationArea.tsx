import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CombinationAreaProps {
  selectedElements: string[];
  onCombine: () => string | null;
  onClear: () => void;
  hint: string;
}

const CombinationArea: React.FC<CombinationAreaProps> = ({ 
  selectedElements, 
  onCombine, 
  onClear,
  hint 
}) => {
  const [showResult, setShowResult] = useState(false);
  const [resultEmoji, setResultEmoji] = useState<string | null>(null);

  const handleCombine = () => {
    const result = onCombine();
    if (result) {
      setResultEmoji(result);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setResultEmoji(null);
      }, 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow pointer-events-none" />
      
      <h2 className="text-xl font-semibold mb-4 text-white/90">Combination Lab</h2>
      
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className={`
          w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed 
          ${selectedElements[0] ? 'border-purple-400 bg-purple-500/20' : 'border-white/30'}
          flex items-center justify-center transition-all
        `}>
          {selectedElements[0] && (
            <span className="emoji-large animate-float">{selectedElements[0]}</span>
          )}
        </div>
        
        <Plus className="w-6 h-6 text-white/50" />
        
        <div className={`
          w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed 
          ${selectedElements[1] ? 'border-pink-400 bg-pink-500/20' : 'border-white/30'}
          flex items-center justify-center transition-all
        `}>
          {selectedElements[1] && (
            <span className="emoji-large animate-float">{selectedElements[1]}</span>
          )}
        </div>
      </div>

      {hint && (
        <div className="mb-4 p-3 bg-blue-500/20 rounded-lg text-sm text-blue-200 animate-pulse">
          {hint}
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={handleCombine}
          disabled={selectedElements.length !== 2}
          className={`
            px-6 py-3 rounded-xl font-semibold transition-all
            ${selectedElements.length === 2
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105 animate-glow'
              : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Combine Elements
        </button>
        
        <button
          onClick={onClear}
          disabled={selectedElements.length === 0}
          className={`
            px-4 py-3 rounded-xl transition-all
            ${selectedElements.length > 0
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
              : 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
            }
          `}
          aria-label="Clear selection"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {showResult && resultEmoji && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl animate-bounce-slow">
            <span className="text-6xl">{resultEmoji}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinationArea;