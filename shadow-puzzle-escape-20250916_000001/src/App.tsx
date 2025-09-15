import { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import GameCanvas from './components/GameCanvas';
import LevelSelector from './components/LevelSelector';
import GameHeader from './components/GameHeader';
import WinModal from './components/WinModal';
import HintButton from './components/HintButton';

function App() {
  const { initLevel, isComplete, currentLevel } = useGameStore();
  const [showLevelSelector, setShowLevelSelector] = useState(true);
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    if (showLevelSelector) {
      initLevel(1);
    }
  }, []);

  useEffect(() => {
    if (isComplete) {
      setShowWinModal(true);
    }
  }, [isComplete]);

  const handleStartGame = (levelId: number) => {
    initLevel(levelId);
    setShowLevelSelector(false);
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel <= 3) {
      initLevel(nextLevel);
      setShowWinModal(false);
    } else {
      setShowWinModal(false);
      setShowLevelSelector(true);
    }
  };

  const handleBackToMenu = () => {
    setShowLevelSelector(true);
    setShowWinModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-shadow-dark via-shadow to-gray-900 overflow-hidden">
      {showLevelSelector ? (
        <LevelSelector onSelectLevel={handleStartGame} />
      ) : (
        <>
          <GameHeader onBackToMenu={handleBackToMenu} />
          <GameCanvas />
          <HintButton />
          {showWinModal && (
            <WinModal 
              onNextLevel={handleNextLevel}
              onBackToMenu={handleBackToMenu}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;