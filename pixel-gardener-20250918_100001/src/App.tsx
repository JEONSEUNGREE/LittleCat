import React, { useEffect } from 'react';
import Header from './components/Header';
import Garden from './components/Garden';
import Toolbar from './components/Toolbar';
import Shop from './components/Shop';
import { useGameStore } from './store/gameStore';

function App() {
  const updatePlants = useGameStore((state) => state.updatePlants);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlants();
    }, 1000);

    return () => clearInterval(interval);
  }, [updatePlants]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <Garden />
      <Toolbar />
      <Shop />
    </div>
  );
}

export default App;