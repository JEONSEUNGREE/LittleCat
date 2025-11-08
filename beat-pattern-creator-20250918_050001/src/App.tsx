import React from 'react';
import { useEffect } from 'react';
import { DrumPad } from './components/DrumPad';
import { Sequencer } from './components/Sequencer';
import { Controls } from './components/Controls';
import { PresetPatterns } from './components/PresetPatterns';
import { audioEngine } from './utils/audioEngine';
import { Music2, Headphones } from 'lucide-react';

function App() {
  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      audioEngine.init();
      audioEngine.resume();
    };
    
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-beat-primary to-purple-600">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Beat Pattern Creator</h1>
                <p className="text-xs text-gray-300">터치로 만드는 리듬 머신</p>
              </div>
            </div>
            <Headphones className="w-6 h-6 text-beat-accent" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Controls */}
          <section className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
            <Controls />
          </section>

          {/* Sequencer */}
          <section className="bg-black/20 backdrop-blur-sm rounded-xl p-4 overflow-x-auto">
            <Sequencer />
          </section>

          {/* Drum Pads */}
          <section className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
            <h2 className="text-white font-bold mb-3 text-center">Quick Play Pads</h2>
            <div className="grid grid-cols-4 gap-2">
              <DrumPad sound="kick" label="Kick" />
              <DrumPad sound="snare" label="Snare" />
              <DrumPad sound="hihat" label="Hi-Hat" />
              <DrumPad sound="openhat" label="Open" />
              <DrumPad sound="clap" label="Clap" />
              <DrumPad sound="crash" label="Crash" />
              <DrumPad sound="ride" label="Ride" />
              <DrumPad sound="tom" label="Tom" />
            </div>
          </section>

          {/* Preset Patterns */}
          <section className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
            <PresetPatterns />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs text-gray-400">
            🎵 Create, Play, Share Your Beats • Made with React + TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;