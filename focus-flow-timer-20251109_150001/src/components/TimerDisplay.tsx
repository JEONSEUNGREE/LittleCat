import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTimerStore } from '../stores/useTimerStore';

export const TimerDisplay = () => {
  const {
    timeRemaining,
    isRunning,
    isPaused,
    currentFocusScore,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimerStore();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const progress = (() => {
    const sessionType = useTimerStore.getState().sessionType;
    const totalSeconds = sessionType === 'short' ? 25 * 60 :
                        sessionType === 'medium' ? 45 * 60 :
                        sessionType === 'long' ? 60 * 60 : 90 * 60;
    return ((totalSeconds - timeRemaining) / totalSeconds) * 100;
  })();

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Circular Timer */}
      <div className="relative">
        <svg className="transform -rotate-90 w-80 h-80">
          {/* Background Circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 opacity-30"
          />
          {/* Progress Circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-gradient">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Focus Score: {currentFocusScore}%
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={resetTimer}
          className="p-4 rounded-full glass-effect hover:bg-white/60 transition-all"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-6 h-6 text-primary-600" />
        </button>

        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className="p-6 rounded-full bg-gradient-to-r from-primary-500 to-focus-500 hover:from-primary-600 hover:to-focus-600 shadow-lg hover:shadow-xl transition-all"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>

        <button
          onClick={() => useTimerStore.getState().updateFocusScore(currentFocusScore + 10)}
          className="p-4 rounded-full glass-effect hover:bg-white/60 transition-all opacity-0 pointer-events-none"
          aria-label="Placeholder"
        >
          <div className="w-6 h-6" />
        </button>
      </div>

      {/* Status Indicator */}
      {(isRunning || isPaused) && (
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isRunning ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
            }`}
          />
          <span className="text-sm text-gray-600">
            {isRunning ? 'Focusing...' : 'Paused'}
          </span>
        </div>
      )}
    </div>
  );
};
