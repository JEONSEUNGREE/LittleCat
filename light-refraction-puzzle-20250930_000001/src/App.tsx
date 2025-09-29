import { useEffect } from 'react';
import GameGrid from './components/GameGrid';
import ToolBar from './components/ToolBar';
import LevelInfo from './components/LevelInfo';
import WinModal from './components/WinModal';
import { useGameStore } from './store/gameStore';

function App() {
  const { initLevel, levelComplete } = useGameStore();

  useEffect(() => {
    initLevel(1);
  }, []);

  return (
    <div className="min-h-screen bg-game-bg text-white flex flex-col">
      {/* 헤더 영역 */}
      <header className="bg-gradient-to-b from-black/50 to-transparent p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-laser-blue via-laser-green to-laser-yellow bg-clip-text text-transparent">
          Light Refraction Puzzle
        </h1>
      </header>

      {/* 메인 게임 영역 */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-7xl mx-auto w-full">
        <LevelInfo />
        
        <div className="mt-4 mb-6">
          <GameGrid />
        </div>
        
        <ToolBar />
      </main>

      {/* 승리 모달 */}
      {levelComplete && <WinModal />}
      
      {/* 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>
    </div>
  );
}

export default App;