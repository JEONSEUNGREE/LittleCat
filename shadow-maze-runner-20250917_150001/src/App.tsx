import React, { useState } from 'react';
import { useGameStore } from './store/gameStore';
import { MainMenu } from './components/MainMenu';
import { GameBoard } from './components/GameBoard';
import { GameUI } from './components/GameUI';
import { GameOver } from './components/GameOver';

type GameScreen = 'menu' | 'playing' | 'gameover';

function App() {
  const { isPlaying, lives } = useGameStore();
  const [screen, setScreen] = useState<GameScreen>('menu');

  React.useEffect(() => {
    if (isPlaying) {
      setScreen('playing');
    } else if (screen === 'playing' && !isPlaying) {
      setScreen('gameover');
    }
  }, [isPlaying, screen]);

  React.useEffect(() => {
    if (lives === 0 && screen === 'playing') {
      setScreen('gameover');
    }
  }, [lives, screen]);

  const handleMainMenu = () => {
    setScreen('menu');
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {screen === 'menu' && <MainMenu />}
      {screen === 'playing' && (
        <>
          <GameBoard />
          <GameUI />
        </>
      )}
      {screen === 'gameover' && <GameOver onMainMenu={handleMainMenu} />}
    </div>
  );
}

export default App;