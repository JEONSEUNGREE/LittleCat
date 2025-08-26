import React, { useState } from 'react';
import { Heart, Cloud, Frown, AlertCircle, Flame, Sparkles, Circle } from 'lucide-react';
import { Mood } from '../types';
import { useMoodStore } from '../store/useMoodStore';

const moodIcons: Record<Mood, React.ReactNode> = {
  happy: <Heart className="w-8 h-8" />,
  calm: <Cloud className="w-8 h-8" />,
  sad: <Frown className="w-8 h-8" />,
  anxious: <AlertCircle className="w-8 h-8" />,
  angry: <Flame className="w-8 h-8" />,
  excited: <Sparkles className="w-8 h-8" />,
  neutral: <Circle className="w-8 h-8" />
};

const moodLabels: Record<Mood, string> = {
  happy: '행복',
  calm: '평온',
  sad: '슬픔',
  anxious: '불안',
  angry: '화남',
  excited: '신남',
  neutral: '보통'
};

export const MoodSelector: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [showIntensity, setShowIntensity] = useState(false);
  
  const addMoodEntry = useMoodStore((state) => state.addMoodEntry);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setShowIntensity(true);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood, intensity, note || undefined);
      setSelectedMood(null);
      setIntensity(3);
      setNote('');
      setShowIntensity(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">지금 기분은 어떠신가요?</h2>
      
      {!showIntensity ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {(Object.keys(moodIcons) as Mood[]).map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className={`
                p-4 rounded-xl transition-all duration-300 transform hover:scale-110
                ${selectedMood === mood ? 'bg-white/30' : 'bg-white/10'}
                hover:bg-white/20 text-white
              `}
              style={{
                borderColor: 'transparent',
                borderWidth: '2px'
              }}
            >
              <div className="flex flex-col items-center space-y-2">
                {moodIcons[mood]}
                <span className="text-xs font-medium">{moodLabels[mood]}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="text-center text-white">
            <div className="inline-flex items-center space-x-2 mb-4">
              {moodIcons[selectedMood!]}
              <span className="text-xl font-semibold">{moodLabels[selectedMood!]}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-white text-sm">감정의 강도</label>
            <input
              type="range"
              min="1"
              max="5"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-white"
            />
            <div className="flex justify-between text-xs text-white/70">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-white text-sm">메모 (선택)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="오늘의 기분을 기록해보세요..."
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowIntensity(false)}
              className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              뒤로
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40 transition-colors font-semibold"
            >
              기록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};