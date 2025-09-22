import { useEffect, useState } from 'react';
import { Rocket, Menu, Volume2, VolumeX } from 'lucide-react';
import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';
import LevelSelector from './components/LevelSelector';
import { useGameStore } from './store/gameStore';

function App() {
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { initLevel, level } = useGameStore();

  useEffect(() => {
    initLevel(1);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-space-dark to-gray-900">
      <div className="relative w-full h-full flex flex-col">
        <header className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Rocket className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Planet Gravity Puzzle
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Toggle sound"
              >
                {soundEnabled ? (
                  <Volume2 className="w-6 h-6 text-white" />
                ) : (
                  <VolumeX className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={() => setShowLevelSelector(true)}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Open level selector"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </header>

        <main className="relative flex-1">
          {level ? (
            <>
              <GameCanvas />
              <GameControls />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Rocket className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-float" />
                <h2 className="text-2xl font-bold text-white mb-2">우주 중력 퍼즐에 오신 것을 환영합니다!</h2>
                <p className="text-gray-400 mb-6">행성의 중력을 조절하여 우주선을 목표 지점까지 안내하세요</p>
                <button
                  onClick={() => setShowLevelSelector(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  시작하기
                </button>
              </div>
            </div>
          )}
        </main>

        {showLevelSelector && (
          <LevelSelector onClose={() => setShowLevelSelector(false)} />
        )}
      </div>
    </div>
  );
}

export default App;