import React, { useEffect, useState } from 'react';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import FlowInsights from './components/FlowInsights';
import Settings from './components/Settings';
import useTimerStore from './store/useTimerStore';
import { Brain, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const { tick } = useTimerStore();
  const [showSettings, setShowSettings] = useState(false);
  const [currentView, setCurrentView] = useState<'timer' | 'insights'>('timer');
  
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [tick]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <header className="text-center py-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Focus Flow Timer</h1>
          </div>
          <p className="text-sm text-slate-600">Smart productivity timer that learns your patterns</p>
        </header>
        
        {/* View Toggle */}
        <div className="flex items-center justify-center gap-1 mb-8">
          <button
            onClick={() => setCurrentView('timer')}
            className={`px-4 py-2 rounded-l-xl transition-all ${
              currentView === 'timer'
                ? 'bg-white shadow-md text-primary-600'
                : 'bg-white/50 text-slate-600 hover:bg-white/70'
            }`}
          >
            Timer
          </button>
          <button
            onClick={() => setCurrentView('insights')}
            className={`px-4 py-2 rounded-r-xl transition-all ${
              currentView === 'insights'
                ? 'bg-white shadow-md text-primary-600'
                : 'bg-white/50 text-slate-600 hover:bg-white/70'
            }`}
          >
            Insights
          </button>
        </div>
        
        {/* Main Content */}
        <main className="glass-effect rounded-2xl p-8 mb-8">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${currentView === 'timer' ? '0' : '-100%'})` }}
            >
              {/* Timer View */}
              <div className="w-full flex-shrink-0">
                <TimerDisplay />
              </div>
              
              {/* Insights View */}
              <div className="w-full flex-shrink-0 absolute left-full top-0">
                <FlowInsights />
              </div>
            </div>
          </div>
          
          {/* Controls - Only show on timer view */}
          {currentView === 'timer' && (
            <div className="mt-8">
              <TimerControls onSettingsClick={() => setShowSettings(true)} />
            </div>
          )}
        </main>
        
        {/* Quick Tips */}
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center px-4">
              <p className="text-xs text-slate-600">
                <span className="font-medium">Tip:</span> Your peak focus hours are typically in the morning and early afternoon
              </p>
            </div>
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Settings Modal */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

export default App;