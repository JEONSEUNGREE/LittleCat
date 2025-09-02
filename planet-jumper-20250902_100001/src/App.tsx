
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { Instructions } from './components/Instructions';

function App() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <div className="relative w-full h-full flex items-center justify-center">
        <GameCanvas />
      </div>
      
      <HUD />
      <Instructions />
      
      {/* Mobile optimized title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Planet Jumper
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Navigate through gravity fields
        </p>
      </div>
    </div>
  );
}

export default App;