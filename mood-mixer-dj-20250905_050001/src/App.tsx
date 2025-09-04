import React from 'react';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { MusicVisualizer } from './components/MusicVisualizer';
import { Controls } from './components/Controls';

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 md:py-8">
          <div className="space-y-6 md:space-y-8">
            {/* Mood Selection */}
            <section className="bg-white/5 backdrop-blur-sm rounded-2xl">
              <MoodSelector />
            </section>

            {/* Music Visualizer */}
            <section>
              <MusicVisualizer />
            </section>

            {/* Playback Controls */}
            <section className="bg-white/5 backdrop-blur-sm rounded-2xl">
              <Controls />
            </section>
          </div>
        </main>

        <footer className="text-center p-4 text-white/50 text-xs md:text-sm">
          <p>© 2025 Mood Mixer DJ - Mix your emotions into beats</p>
        </footer>
      </div>
    </div>
  );
}

export default App;