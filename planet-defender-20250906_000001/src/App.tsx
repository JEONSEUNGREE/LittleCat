
import { useGameStore } from './store/gameStore';
import { MainMenu } from './components/MainMenu';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { GameOver } from './components/GameOver';

function App() {
  const { gameStatus } = useGameStore();

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {gameStatus === 'menu' && <MainMenu />}
      
      {(gameStatus === 'playing' || gameStatus === 'paused') && (
        <>
          <GameCanvas />
          <HUD />
          {gameStatus === 'paused' && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-15">
              <div className="bg-black/70 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-white text-center">PAUSED</h2>
              </div>
            </div>
          )}
        </>
      )}
      
      {gameStatus === 'gameOver' && <GameOver />}
    </div>
  );
}

export default App;