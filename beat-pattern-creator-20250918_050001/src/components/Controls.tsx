
import { useBeatStore } from '../store/useBeatStore';
import { Play, Pause, RotateCcw, Plus, Save, Share2 } from 'lucide-react';
import { SoundType } from '../types';

export const Controls: React.FC = () => {
  const { 
    isPlaying, 
    bpm, 
    pattern,
    togglePlay, 
    setBPM, 
    clearPattern,
    addTrack 
  } = useBeatStore();

  const availableSounds: SoundType[] = ['clap', 'crash', 'ride', 'tom'];
  const currentSounds = pattern.tracks.map(t => t.sound);
  const soundsToAdd = availableSounds.filter(s => !currentSounds.includes(s));

  const handleSave = () => {
    const patternData = JSON.stringify(pattern);
    const blob = new Blob([patternData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beat-pattern-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My Beat Pattern',
      text: `Check out my beat pattern! BPM: ${bpm}`,
      url: window.location.href,
    };
    
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      const patternText = `Beat Pattern - BPM: ${bpm}\n${JSON.stringify(pattern.tracks.map(t => ({
        name: t.name,
        pattern: t.steps.map(s => s ? '■' : '□').join('')
      })), null, 2)}`;
      
      navigator.clipboard.writeText(patternText);
      alert('Pattern copied to clipboard!');
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Main controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={togglePlay}
          className="control-button flex items-center gap-2 px-6"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Play</span>
            </>
          )}
        </button>
        
        <button
          onClick={clearPattern}
          className="control-button flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Clear</span>
        </button>
        
        {soundsToAdd.length > 0 && (
          <button
            onClick={() => addTrack(soundsToAdd[0])}
            className="control-button flex items-center gap-2"
            disabled={pattern.tracks.length >= 8}
          >
            <Plus className="w-5 h-5" />
            <span>Add Track</span>
          </button>
        )}
      </div>
      
      {/* BPM control */}
      <div className="flex items-center gap-4 justify-center">
        <label className="text-white text-sm font-medium">BPM</label>
        <input
          type="range"
          min="60"
          max="200"
          value={bpm}
          onChange={(e) => setBPM(Number(e.target.value))}
          className="w-32 bpm-slider"
        />
        <span className="text-white font-mono text-sm w-10">{bpm}</span>
      </div>
      
      {/* Save/Share controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 
            text-white font-medium transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
        
        <button
          onClick={handleShare}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 
            text-white font-medium transition-colors flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};