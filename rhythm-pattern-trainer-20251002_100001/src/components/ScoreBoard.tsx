
import { Trophy, Zap, Target, TrendingUp } from 'lucide-react';
import { useRhythmStore } from '../store/useRhythmStore';

export const ScoreBoard: React.FC = () => {
  const { score, streak, userProgress, feedback } = useRhythmStore();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Performance</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-white/70">Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{score}</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-white/70">Streak</span>
          </div>
          <p className="text-2xl font-bold text-white">{streak}</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-white/70">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {userProgress.accuracy.toFixed(0)}%
          </p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white/70">Best Streak</span>
          </div>
          <p className="text-2xl font-bold text-white">{userProgress.bestStreak}</p>
        </div>
      </div>
      
      {feedback && (
        <div className={`p-3 rounded-lg text-center font-medium animate-slide-in ${
          feedback.includes('Perfect') || feedback.includes('Excellent')
            ? 'bg-green-500/20 text-green-300'
            : feedback.includes('Good')
            ? 'bg-blue-500/20 text-blue-300'
            : feedback.includes('Try')
            ? 'bg-red-500/20 text-red-300'
            : 'bg-yellow-500/20 text-yellow-300'
        }`}>
          {feedback}
        </div>
      )}
    </div>
  );
};