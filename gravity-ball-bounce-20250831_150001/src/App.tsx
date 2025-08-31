import React from 'react';
import { GameHeader } from './components/GameHeader';
import { GameCanvas } from './components/GameCanvas';
import { GameControls } from './components/GameControls';
import { useGameStore } from './store/gameStore';

function App() {
  const { isPlaying } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <GameHeader />
        {isPlaying && <GameCanvas />}
        <div className="mt-4">
          <GameControls />
        </div>
      </div>
    </div>
  );
}

export default App;