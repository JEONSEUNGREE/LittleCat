import React, { useState } from 'react';
import { Heart, Sparkles, Cloud, Sun, Moon, Zap, Palette, Music } from 'lucide-react';
import { MOOD_COLORS, MoodType } from '../types';
import { useMoodStore } from '../store/useMoodStore';

const moodIcons: Record<MoodType, React.ReactNode> = {
  joy: <Sun className="w-6 h-6" />,
  calm: <Cloud className="w-6 h-6" />,
  energy: <Zap className="w-6 h-6" />,
  peaceful: <Moon className="w-6 h-6" />,
  melancholy: <Cloud className="w-6 h-6" />,
  anxious: <Sparkles className="w-6 h-6" />,
  content: <Heart className="w-6 h-6" />,
  creative: <Palette className="w-6 h-6" />,
  focused: <Music className="w-6 h-6" />,
  grateful: <Heart className="w-6 h-6" />,
  hopeful: <Sun className="w-6 h-6" />,
  neutral: <Cloud className="w-6 h-6" />
};

export const MoodSelector: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState(0.5);
  const setMood = useMoodStore(state => state.setMood);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleConfirm = () => {
    if (selectedMood) {
      setMood(selectedMood, intensity);
      setSelectedMood(null);
      setIntensity(0.5);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        How are you feeling?
      </h2>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
        {(Object.keys(MOOD_COLORS) as MoodType[]).map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
            className={`
              relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-110
              ${selectedMood === mood ? 'ring-4 ring-offset-2 ring-opacity-50 scale-110' : ''}
            `}
            style={{
              backgroundColor: MOOD_COLORS[mood],
              boxShadow: selectedMood === mood ? `0 10px 40px ${MOOD_COLORS[mood]}66` : '',
              ringColor: MOOD_COLORS[mood]
            }}
          >
            <div className="text-white flex items-center justify-center">
              {moodIcons[mood]}
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-300 capitalize whitespace-nowrap">
              {mood}
            </span>
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="mt-8 space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Intensity
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={intensity}
              onChange={(e) => setIntensity(parseFloat(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(to right, ${MOOD_COLORS[selectedMood]}33, ${MOOD_COLORS[selectedMood]})`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Subtle</span>
              <span>Intense</span>
            </div>
          </div>
          
          <button
            onClick={handleConfirm}
            className="w-full py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: MOOD_COLORS[selectedMood],
              boxShadow: `0 10px 30px ${MOOD_COLORS[selectedMood]}66`
            }}
          >
            Share My Mood
          </button>
        </div>
      )}
    </div>
  );
};