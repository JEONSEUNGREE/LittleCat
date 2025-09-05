
import { MOODS } from '../data/moods';
import { useMixerStore } from '../store/useMixerStore';
import { Mood } from '../types';

export const MoodSelector: React.FC = () => {
  const { selectedMoods, addMood, removeMood } = useMixerStore();

  const handleMoodClick = (mood: Mood) => {
    const isSelected = selectedMoods.some(m => m.id === mood.id);
    if (isSelected) {
      removeMood(mood.id);
    } else {
      addMood(mood);
    }
  };

  const isMoodSelected = (moodId: string) => {
    return selectedMoods.some(m => m.id === moodId);
  };

  return (
    <div className="w-full p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white/90">
        Select Your Moods (Max 4)
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {MOODS.map((mood) => {
          const isSelected = isMoodSelected(mood.id);
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood)}
              className={`
                relative p-4 md:p-6 rounded-2xl transition-all duration-300 
                transform hover:scale-105 active:scale-95
                ${isSelected 
                  ? 'shadow-2xl ring-4 ring-white/50' 
                  : 'hover:shadow-xl'
                }
              `}
              style={{
                background: isSelected 
                  ? `linear-gradient(135deg, ${mood.color}CC, ${mood.color}99)`
                  : `linear-gradient(135deg, ${mood.color}66, ${mood.color}33)`,
                borderColor: mood.color,
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
            >
              <div className="text-3xl md:text-4xl mb-2">{mood.emoji}</div>
              <div className="text-sm md:text-base font-semibold text-white">
                {mood.name}
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <span className="text-white text-xs bg-white/20 px-2 py-1 rounded-full">
                    ✓
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {selectedMoods.length > 0 && (
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-sm text-white/80">
            Selected: {selectedMoods.map(m => m.emoji).join(' ')}
          </p>
        </div>
      )}
    </div>
  );
};