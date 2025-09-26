
import { Clock, Brain, Target, Flame } from 'lucide-react';
import useTimerStore from '../store/useTimerStore';

const TimerDisplay: React.FC = () => {
  const { timerState } = useTimerStore();
  const { currentTime, totalTime, sessionType, sessionsCompleted, dailyGoal } = timerState;
  
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const progress = totalTime > 0 ? ((totalTime - currentTime) / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getSessionColor = () => {
    switch (sessionType) {
      case 'focus':
        return 'text-primary-600';
      case 'break':
        return 'text-green-600';
      case 'longBreak':
        return 'text-purple-600';
      default:
        return 'text-primary-600';
    }
  };
  
  const getSessionBgColor = () => {
    switch (sessionType) {
      case 'focus':
        return 'from-primary-400 to-primary-600';
      case 'break':
        return 'from-green-400 to-green-600';
      case 'longBreak':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-primary-400 to-primary-600';
    }
  };
  
  const getSessionIcon = () => {
    switch (sessionType) {
      case 'focus':
        return <Brain className="w-6 h-6" />;
      case 'break':
        return <Clock className="w-6 h-6" />;
      case 'longBreak':
        return <Target className="w-6 h-6" />;
      default:
        return <Brain className="w-6 h-6" />;
    }
  };
  
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Session Type Indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full glass-effect ${getSessionColor()}`}>
          {getSessionIcon()}
          <span className="font-medium capitalize">{sessionType === 'longBreak' ? 'Long Break' : sessionType}</span>
        </div>
      </div>
      
      {/* Timer Circle */}
      <div className="relative w-64 h-64 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress Circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${getSessionBgColor().split(' ')[0].replace('from-', 'text-')}`} />
              <stop offset="100%" className={`${getSessionBgColor().split(' ')[1].replace('to-', 'text-')}`} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-slate-900 tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-slate-600 mt-2">
            {sessionType === 'focus' ? 'Stay focused!' : 'Take a break'}
          </div>
        </div>
      </div>
      
      {/* Session Progress */}
      <div className="mt-8 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-sm text-slate-600">
            {sessionsCompleted}/{dailyGoal} sessions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < (sessionsCompleted % 4)
                    ? 'bg-primary-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;