
import { X, Clock, Volume2, Vibrate, Brain } from 'lucide-react';
import useTimerStore from '../store/useTimerStore';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { preferences, updatePreferences } = useTimerStore();
  
  if (!isOpen) return null;
  
  const handleDurationChange = (key: keyof typeof preferences, value: string) => {
    const minutes = parseInt(value) || 0;
    updatePreferences({ [key]: minutes * 60 });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-slate-900">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        
        {/* Settings Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Timer Durations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary-600" />
              <h3 className="font-medium text-slate-800">Timer Durations</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-600 block mb-1">Focus Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={Math.floor(preferences.focusDuration / 60)}
                  onChange={(e) => handleDurationChange('focusDuration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="text-sm text-slate-600 block mb-1">Short Break (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={Math.floor(preferences.shortBreakDuration / 60)}
                  onChange={(e) => handleDurationChange('shortBreakDuration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="text-sm text-slate-600 block mb-1">Long Break (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={Math.floor(preferences.longBreakDuration / 60)}
                  onChange={(e) => handleDurationChange('longBreakDuration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="text-sm text-slate-600 block mb-1">Sessions Before Long Break</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={preferences.sessionsBeforeLongBreak}
                  onChange={(e) => updatePreferences({ sessionsBeforeLongBreak: parseInt(e.target.value) || 4 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="space-y-3">
            <h3 className="font-medium text-slate-800 mb-3">Notifications</h3>
            
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-700">Sound Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.soundEnabled}
                onChange={(e) => updatePreferences({ soundEnabled: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
            
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Vibrate className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-700">Vibration</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.vibrationEnabled}
                onChange={(e) => updatePreferences({ vibrationEnabled: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          </div>
          
          {/* Smart Features */}
          <div className="space-y-3">
            <h3 className="font-medium text-slate-800 mb-3">Smart Features</h3>
            
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-slate-600" />
                <div>
                  <span className="text-sm text-slate-700 block">Adaptive Mode</span>
                  <span className="text-xs text-slate-500">AI adjusts timer based on your patterns</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.adaptiveMode}
                onChange={(e) => updatePreferences({ adaptiveMode: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full button-primary"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;