
import { Clock, TrendingUp, Calendar } from 'lucide-react';
import { useMoodStore } from '../store/useMoodStore';
import { MoodVisualization } from './MoodVisualization';

export const MoodHistory: React.FC = () => {
  const recentMoods = useMoodStore(state => state.recentMoods);

  if (recentMoods.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Your Mood Journey
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No moods recorded yet. Share how you're feeling to start your journey!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Your Mood Journey
        </h3>
        <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentMoods.slice(0, 5).map((mood, index) => (
          <div
            key={mood.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-shrink-0">
              <MoodVisualization
                mood={mood}
                size="small"
                interactive={false}
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: mood.color }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Intensity: {Math.round(mood.intensity * 100)}%
                  </span>
                </div>
                {index === 0 && (
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
              
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {new Date(mood.timestamp).toLocaleDateString()} at{' '}
                {new Date(mood.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentMoods.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="font-medium">Mood Pattern:</span>
            <span>You've been feeling more energetic lately!</span>
          </div>
        </div>
      )}
    </div>
  );
};