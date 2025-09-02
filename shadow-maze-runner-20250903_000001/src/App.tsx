
import { useGameStore } from './store/gameStore';
import { GameMenu } from './components/GameMenu';
import { GameBoard } from './components/GameBoard';
import { GameHUD } from './components/GameHUD';
import { LevelComplete } from './components/LevelComplete';
import { GameWon } from './components/GameWon';
import { PauseMenu } from './components/PauseMenu';

function App() {
  const { gameState } = useGameStore();

  return (
    <div className="min-h-screen bg-black">
      {gameState === 'menu' && <GameMenu />}
      
      {gameState === 'playing' && (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
          <GameHUD />
          <GameBoard />
        </div>
      )}
      
      {gameState === 'paused' && (
        <>
          <div className="min-h-screen flex flex-col items-center justify-center relative">
            <GameHUD />
            <GameBoard />
          </div>
          <PauseMenu />
        </>
      )}
      
      {gameState === 'levelComplete' && <LevelComplete />}
      
      {gameState === 'won' && <GameWon />}
    </div>
  );
}

export default App;