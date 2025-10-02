import { useState, useEffect, useRef } from 'react';
import { Music2, Info } from 'lucide-react';
import { PatternSelector } from './components/PatternSelector';
import { PatternDisplay } from './components/PatternDisplay';
import { ControlPanel } from './components/ControlPanel';
import { ScoreBoard } from './components/ScoreBoard';
import { useRhythmStore } from './store/useRhythmStore';
import { AudioEngine } from './utils/audio';
import { getDurationInMs } from './data/patterns';

function App() {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [showInfo, setShowInfo] = useState(false);
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const playbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const {
    currentPattern,
    isPlaying,
    isListening,
    setPlaying,
    setListening,
    setFeedback,
    updateScore,
    updateStreak,
    addUserInput,
    clearUserInput,
    userInput
  } = useRhythmStore();

  useEffect(() => {
    audioEngineRef.current = new AudioEngine();
    return () => {
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
      }
    };
  }, []);

  const playPattern = () => {
    if (!currentPattern || !audioEngineRef.current) return;
    
    setPlaying(true);
    setCurrentNoteIndex(-1);
    
    let noteIndex = 0;
    let totalTime = 0;
    
    const playNextNote = () => {
      if (noteIndex >= currentPattern.notes.length) {
        setPlaying(false);
        setCurrentNoteIndex(-1);
        checkUserInput();
        return;
      }
      
      const note = currentPattern.notes[noteIndex];
      const duration = getDurationInMs(note.duration, currentPattern.tempo);
      
      setCurrentNoteIndex(noteIndex);
      
      if (!note.isRest) {
        audioEngineRef.current?.playNote(440 + noteIndex * 50, duration * 0.9);
      }
      
      noteIndex++;
      playbackTimeoutRef.current = setTimeout(playNextNote, duration);
    };
    
    playNextNote();
  };

  const stopPattern = () => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
    }
    setPlaying(false);
    setCurrentNoteIndex(-1);
  };

  const handleReset = () => {
    stopPattern();
    clearUserInput();
    setFeedback('');
    setCurrentNoteIndex(-1);
  };

  const handleToggleListening = () => {
    if (!isListening) {
      setListening(true);
      clearUserInput();
      setFeedback('Tap the spacebar to the rhythm!');
      
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.code === 'Space' && isListening) {
          e.preventDefault();
          audioEngineRef.current?.playClick();
          addUserInput({
            id: `user-${Date.now()}`,
            duration: 'quarter',
            isRest: false,
            timestamp: Date.now()
          });
        }
      };
      
      window.addEventListener('keydown', handleKeyPress);
      
      setTimeout(() => {
        window.removeEventListener('keydown', handleKeyPress);
        setListening(false);
        checkUserInput();
      }, 5000);
    } else {
      setListening(false);
    }
  };

  const checkUserInput = () => {
    if (!currentPattern) return;
    
    const patternNoteCount = currentPattern.notes.filter(n => !n.isRest).length;
    const userNoteCount = userInput.length;
    
    const accuracy = Math.max(0, 100 - Math.abs(patternNoteCount - userNoteCount) * 20);
    
    if (accuracy >= 80) {
      setFeedback('Perfect! Well done!');
      updateScore(100);
      updateStreak(true);
      audioEngineRef.current?.playSuccess();
    } else if (accuracy >= 60) {
      setFeedback('Good job! Keep practicing!');
      updateScore(50);
      updateStreak(true);
    } else {
      setFeedback('Try again! Listen carefully to the rhythm.');
      updateStreak(false);
      audioEngineRef.current?.playError();
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Music2 className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">
              Rhythm Pattern Trainer
            </h1>
          </div>
          <p className="text-white/70 text-lg">
            Learn and master musical rhythms interactively
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <PatternSelector />
            <ScoreBoard />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <PatternDisplay 
              pattern={currentPattern} 
              currentNoteIndex={currentNoteIndex}
            />
            
            <ControlPanel
              onPlay={playPattern}
              onStop={stopPattern}
              onReset={handleReset}
              onToggleListening={handleToggleListening}
            />
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center gap-2 text-white mb-3 hover:text-white/80"
              >
                <Info className="w-5 h-5" />
                <span className="font-semibold">How to Play</span>
              </button>
              
              {showInfo && (
                <div className="text-white/80 space-y-2 text-sm animate-slide-in">
                  <p>1. Select a rhythm pattern from the list</p>
                  <p>2. Click "Play" to hear the pattern</p>
                  <p>3. Click "Listen" and tap spacebar to match the rhythm</p>
                  <p>4. Get instant feedback on your performance</p>
                  <p>5. Complete patterns to unlock more challenging ones!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;