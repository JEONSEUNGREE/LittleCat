
import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';
import useTimerStore from '../store/useTimerStore';

interface TimerControlsProps {
  onSettingsClick: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ onSettingsClick }) => {
  const { timerState, startTimer, pauseTimer, resetTimer, skipSession } = useTimerStore();
  const { isRunning } = timerState;
  
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      {/* Main Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-white/80 hover:bg-white transition-all duration-200 hover:shadow-lg active:scale-95"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-5 h-5 text-slate-700" />
        </button>
        
        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className="p-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>
        
        <button
          onClick={skipSession}
          className="p-3 rounded-full bg-white/80 hover:bg-white transition-all duration-200 hover:shadow-lg active:scale-95"
          aria-label="Skip session"
        >
          <SkipForward className="w-5 h-5 text-slate-700" />
        </button>
      </div>
      
      {/* Settings Button */}
      <button
        onClick={onSettingsClick}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 mx-auto"
      >
        <Settings className="w-4 h-4 text-slate-600" />
        <span className="text-sm text-slate-600">Settings</span>
      </button>
    </div>
  );
};

export default TimerControls;