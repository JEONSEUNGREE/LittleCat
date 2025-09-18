import { useState } from 'react';
import { Mood } from '../types';
import { MOODS } from '../constants/moods';
import { useMoodStore } from '../store/useMoodStore';
import { Check, X } from 'lucide-react';

export const MoodSelector: React.FC = () => {
  const { selectedMood, selectMood, setUserMood } = useMoodStore();
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleMoodSelect = (mood: Mood) => {
    selectMood(mood);
    setIsExpanded(true);
  };
  
  const handleConfirm = () => {
    if (selectedMood) {
      setUserMood(selectedMood, message);
      setMessage('');
      setIsExpanded(false);
      selectMood(null);
    }
  };
  
  const handleCancel = () => {
    selectMood(null);
    setMessage('');
    setIsExpanded(false);
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl">
      <h2 className="text-white text-lg sm:text-xl font-bold mb-4 text-center">
        지금 당신의 기분은?
      </h2>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-4">
        {Object.values(MOODS).map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            className={`
              aspect-square rounded-xl p-2 sm:p-3 transition-all duration-300
              ${
                selectedMood?.id === mood.id
                  ? 'scale-110 shadow-lg ring-2 ring-white'
                  : 'hover:scale-105 hover:shadow-md'
              }
            `}
            style={{
              background: mood.gradient,
            }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
              <span className="text-white text-xs mt-1 font-medium">
                {mood.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {isExpanded && selectedMood && (
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 animate-mood-wave">
          <div
            className="w-full h-2 rounded-full mb-3"
            style={{ background: selectedMood.gradient }}
          />
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="친구들과 공유하고 싶은 메시지를 남겨주세요 (선택사항)"
            className="w-full bg-white/20 backdrop-blur text-white placeholder-white/60 
                     rounded-lg p-3 resize-none focus:outline-none focus:ring-2 
                     focus:ring-white/50 transition-all"
            rows={3}
          />
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium 
                       py-2 px-4 rounded-lg transition-all duration-200 
                       flex items-center justify-center gap-2"
            >
              <Check size={18} />
              공유하기
            </button>
            
            <button
              onClick={handleCancel}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white/80 font-medium 
                       py-2 px-4 rounded-lg transition-all duration-200 
                       flex items-center justify-center gap-2"
            >
              <X size={18} />
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};