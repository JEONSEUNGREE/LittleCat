import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { SessionSelector } from './components/SessionSelector';
import { SessionHistory } from './components/SessionHistory';
import { Brain } from 'lucide-react';

function App() {
  useTimer();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-2xl mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-primary-500 to-focus-500">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">
            Focus Flow Timer
          </h1>
        </div>
        <p className="text-gray-600 text-sm md:text-base">
          Brain wave rhythm-based productivity timer
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl space-y-8">
        {/* Timer Display */}
        <section className="flex justify-center">
          <TimerDisplay />
        </section>

        {/* Session Selector */}
        <section className="flex justify-center">
          <SessionSelector />
        </section>

        {/* Session History */}
        <section className="flex justify-center">
          <SessionHistory />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center text-xs text-gray-500">
        <p>© 2024 Focus Flow Timer. Designed for productivity.</p>
      </footer>
    </div>
  );
}

export default App;
