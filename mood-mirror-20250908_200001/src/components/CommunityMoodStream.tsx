import React, { useEffect } from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';
import { useMoodStore } from '../store/useMoodStore';
import { MoodVisualization } from './MoodVisualization';

export const CommunityMoodStream: React.FC = () => {
  const { communityMoods, fetchCommunityMoods, addReaction } = useMoodStore();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCommunityMoods();
    }, 10000); // Add new mood every 10 seconds

    return () => clearInterval(interval);
  }, [fetchCommunityMoods]);

  const handleReaction = (moodId: string, type: 'resonate' | 'support' | 'understand') => {
    addReaction(moodId, type);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6" />
          Community Vibes
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Sparkles className="w-4 h-4" />
          <span>Live emotions from around the world</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {communityMoods.map((mood) => (
          <div key={mood.id} className="relative group">
            <MoodVisualization
              mood={mood}
              size="small"
              interactive={true}
              onReact={() => handleReaction(mood.id, 'resonate')}
            />
            
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleReaction(mood.id, 'resonate')}
                className="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:scale-110 transition-transform"
                title="I feel this too"
              >
                <Heart className="w-3 h-3 text-red-500" />
              </button>
              <button
                onClick={() => handleReaction(mood.id, 'support')}
                className="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:scale-110 transition-transform"
                title="Sending support"
              >
                <Users className="w-3 h-3 text-blue-500" />
              </button>
              <button
                onClick={() => handleReaction(mood.id, 'understand')}
                className="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:scale-110 transition-transform"
                title="I understand"
              >
                <Sparkles className="w-3 h-3 text-purple-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {communityMoods.length} people sharing their emotions right now
        </p>
      </div>
    </div>
  );
};