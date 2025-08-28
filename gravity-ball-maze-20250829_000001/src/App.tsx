import { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import GameHeader from './components/GameHeader';
import GameControls from './components/GameControls';
import LevelSelector from './components/LevelSelector';
import { useGameStore } from './store/gameStore';
import { requestOrientationPermission } from './utils/deviceOrientation';
import { Smartphone, AlertCircle } from 'lucide-react';

function App() {
  const { 
    currentLevel, 
    isPlaying, 
    resetLevel,
    showLevelSelect,
    setShowLevelSelect,
    hasOrientation,
    setHasOrientation
  } = useGameStore();
  
  const [permissionStatus, setPermissionStatus] = useState<'pending' | 'granted' | 'denied'>('pending');

  useEffect(() => {
    // Check if device orientation is available
    if (typeof window.DeviceOrientationEvent !== 'undefined') {
      const checkOrientation = async () => {
        const hasPermission = await requestOrientationPermission();
        setHasOrientation(hasPermission);
        setPermissionStatus(hasPermission ? 'granted' : 'denied');
      };
      checkOrientation();
    } else {
      setHasOrientation(false);
      setPermissionStatus('denied');
    }

    // Prevent screen sleep
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').catch(() => {
        console.log('Wake Lock request failed');
      });
    }
  }, [setHasOrientation]);

  if (showLevelSelect) {
    return <LevelSelector />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      <GameHeader />
      
      {!hasOrientation && permissionStatus !== 'pending' && (
        <div className="px-4 py-2 bg-amber-900/50 backdrop-blur-sm border-b border-amber-700">
          <div className="flex items-center justify-center gap-2 text-amber-200 text-sm">
            <AlertCircle size={16} />
            <span className="font-medium">Using touch controls (tilt not available)</span>
          </div>
        </div>
      )}

      <main className="flex-1 relative overflow-hidden">
        <GameBoard />
        
        {!isPlaying && currentLevel > 0 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="bg-slate-800 rounded-2xl p-6 m-4 max-w-sm w-full shadow-2xl border border-slate-700">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Smartphone className="text-white" size={32} />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Level {currentLevel}
              </h2>
              
              <p className="text-slate-300 mb-6 text-sm">
                {hasOrientation 
                  ? "Tilt your device to guide the ball to the goal!"
                  : "Use the on-screen controls to guide the ball!"}
              </p>
              
              <button
                onClick={resetLevel}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg transform transition-all hover:scale-105 active:scale-95"
              >
                Start Level
              </button>
              
              <button
                onClick={() => setShowLevelSelect(true)}
                className="w-full mt-3 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-lg transition-colors"
              >
                Choose Different Level
              </button>
            </div>
          </div>
        )}
      </main>
      
      {!hasOrientation && <GameControls />}
    </div>
  );
}

export default App;