
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { Pattern } from '../types';
import { patterns } from '../data/patterns';
import { useRhythmStore } from '../store/useRhythmStore';

export const PatternSelector: React.FC = () => {
  const { setCurrentPattern, userProgress, resetGame } = useRhythmStore();
  
  const handleSelectPattern = (pattern: Pattern) => {
    resetGame();
    setCurrentPattern(pattern);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 border-green-500 text-green-300';
      case 'intermediate':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-300';
      case 'advanced':
        return 'bg-red-500/20 border-red-500 text-red-300';
      default:
        return 'bg-gray-500/20 border-gray-500 text-gray-300';
    }
  };

  const isPatternUnlocked = (pattern: Pattern, index: number): boolean => {
    if (index === 0) return true;
    if (pattern.difficulty === 'beginner') return true;
    
    const previousPattern = patterns[index - 1];
    return userProgress.completedPatterns.includes(previousPattern.id);
  };

  const isPatternCompleted = (patternId: string): boolean => {
    return userProgress.completedPatterns.includes(patternId);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Choose a Rhythm Pattern</h2>
      
      <div className="grid gap-3">
        {patterns.map((pattern, index) => {
          const unlocked = isPatternUnlocked(pattern, index);
          const completed = isPatternCompleted(pattern.id);
          
          return (
            <button
              key={pattern.id}
              onClick={() => unlocked && handleSelectPattern(pattern)}
              disabled={!unlocked}
              className={`flex items-center justify-between p-4 rounded-xl
                transition-all duration-200 ${
                unlocked
                  ? 'bg-white/10 hover:bg-white/20 cursor-pointer'
                  : 'bg-gray-800/50 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                  ${unlocked ? 'bg-purple-500/20' : 'bg-gray-700/50'}`}>
                  {completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : unlocked ? (
                    <span className="text-white font-bold">{index + 1}</span>
                  ) : (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                
                <div className="text-left">
                  <h3 className={`font-semibold ${
                    unlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {pattern.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      getDifficultyColor(pattern.difficulty)
                    }`}>
                      {pattern.difficulty}
                    </span>
                    <span className="text-xs text-gray-400">
                      {pattern.tempo} BPM
                    </span>
                  </div>
                </div>
              </div>
              
              {unlocked && (
                <ChevronRight className="w-5 h-5 text-white/60" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};