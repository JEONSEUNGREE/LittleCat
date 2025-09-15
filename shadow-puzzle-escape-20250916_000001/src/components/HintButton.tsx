import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const HintButton: React.FC = () => {
  const { useHint, currentLevelData, hintsUsed } = useGameStore();
  const [showHint, setShowHint] = useState(false);
  const [currentHintText, setCurrentHintText] = useState<string | null>(null);

  const handleUseHint = () => {
    const hint = useHint();
    if (hint) {
      setCurrentHintText(hint);
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
      }, 5000);
    }
  };

  const remainingHints = currentLevelData
    ? currentLevelData.hints.length - hintsUsed
    : 0;

  return (
    <>
      <button
        onClick={handleUseHint}
        disabled={remainingHints === 0}
        className={`fixed bottom-4 right-4 z-30 p-3 rounded-full shadow-lg transition-all ${
          remainingHints > 0
            ? 'bg-light-warm hover:bg-light hover:scale-110'
            : 'bg-gray-700 opacity-50 cursor-not-allowed'
        }`}
        aria-label="힌트 보기"
      >
        <div className="relative">
          <HelpCircle className="text-shadow-dark" size={24} />
          {remainingHints > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {remainingHints}
            </span>
          )}
        </div>
      </button>

      {showHint && currentHintText && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 animate-float">
          <div className="bg-shadow-dark/95 backdrop-blur-sm rounded-2xl p-4 max-w-xs shadow-2xl">
            <div className="flex items-start justify-between mb-2">
              <HelpCircle className="text-light-warm" size={20} />
              <button
                onClick={() => setShowHint(false)}
                className="text-light/60 hover:text-light transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-light text-sm leading-relaxed">{currentHintText}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HintButton;