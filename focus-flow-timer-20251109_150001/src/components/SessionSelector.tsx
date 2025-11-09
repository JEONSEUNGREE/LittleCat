import { Brain, Zap, Activity, Waves } from 'lucide-react';
import { useTimerStore } from '../stores/useTimerStore';
import type { SessionType } from '../types';

const SESSION_OPTIONS = [
  {
    type: 'short' as SessionType,
    label: 'Short Focus',
    duration: '25 min',
    icon: Zap,
    rhythm: 'Beta (14-30 Hz)',
    description: 'Quick focus burst',
    color: 'from-blue-400 to-blue-600',
  },
  {
    type: 'medium' as SessionType,
    label: 'Medium Flow',
    duration: '45 min',
    icon: Activity,
    rhythm: 'Alpha (8-14 Hz)',
    description: 'Balanced productivity',
    color: 'from-purple-400 to-purple-600',
  },
  {
    type: 'long' as SessionType,
    label: 'Deep Work',
    duration: '60 min',
    icon: Brain,
    rhythm: 'Theta (4-8 Hz)',
    description: 'Deep concentration',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    type: 'ultra' as SessionType,
    label: 'Ultra Focus',
    duration: '90 min',
    icon: Waves,
    rhythm: 'Gamma (30+ Hz)',
    description: 'Peak performance',
    color: 'from-pink-400 to-pink-600',
  },
];

export const SessionSelector = () => {
  const { sessionType, setSessionType, isRunning } = useTimerStore();

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
        Select Your Brain Wave Rhythm
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SESSION_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = sessionType === option.type;
          const isDisabled = isRunning;

          return (
            <button
              key={option.type}
              onClick={() => !isDisabled && setSessionType(option.type)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-2xl transition-all duration-300
                ${isSelected
                  ? 'glass-effect ring-2 ring-primary-500 scale-105'
                  : 'glass-effect hover:scale-105 hover:ring-2 hover:ring-primary-300'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`p-3 rounded-full bg-gradient-to-br ${option.color}`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600">{option.duration}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {option.rhythm}
                  </div>
                </div>
              </div>
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
