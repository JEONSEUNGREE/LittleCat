import { useState, useEffect } from 'react';
import useAudioStore from './store/audioStore';
import AudioVisualizer from './components/AudioVisualizer';
import ControlPanel from './components/ControlPanel';
import Header from './components/Header';
import { Mic, MicOff, Settings } from 'lucide-react';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { isRecording, setRecording, setAudioContext, setAnalyser, setSource, setStream, cleanup } = useAudioStore();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 2048;
      source.connect(analyser);
      
      setStream(stream);
      setAudioContext(audioContext);
      setAnalyser(analyser);
      setSource(source);
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    const { stream, audioContext } = useAudioStore.getState();
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    if (audioContext) {
      audioContext.close();
    }
    
    cleanup();
  };

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <div className="w-full max-w-6xl mx-auto">
          <AudioVisualizer />
        </div>
        
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`
              px-8 py-4 rounded-full font-semibold text-lg
              transition-all duration-300 transform hover:scale-105
              flex items-center gap-3
              ${isRecording 
                ? 'bg-red-500 hover:bg-red-600 glow-effect' 
                : 'bg-neon-blue hover:bg-blue-500 glass-effect'
              }
            `}
          >
            {isRecording ? (
              <>
                <MicOff size={24} />
                Stop Recording
              </>
            ) : (
              <>
                <Mic size={24} />
                Start Recording
              </>
            )}
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-4 rounded-full glass-effect hover:bg-white/10 transition-all duration-300"
          >
            <Settings size={24} />
          </button>
        </div>
        
        {showSettings && (
          <div className="fixed right-4 bottom-24 md:right-8 md:bottom-32">
            <ControlPanel onClose={() => setShowSettings(false)} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;