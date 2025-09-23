
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import { useGameStore } from './store/gameStore';

function App() {
  const { isPlaying } = useGameStore();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Header />
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          {isPlaying && <GameBoard />}
          <Controls />
        </div>

        {/* Background decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 blur-3xl animate-bounce-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
        </div>
      </div>
    </div>
  );
}

export default App;