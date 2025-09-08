import React from 'react'
import { Headphones, Zap } from 'lucide-react'
import { useSoundStore } from './store/useSoundStore'
import LoopPad from './components/LoopPad'
import TrackMixer from './components/TrackMixer'
import ControlPanel from './components/ControlPanel'
import Visualizer from './components/Visualizer'

function App() {
  const {
    isPlaying,
    bpm,
    masterVolume,
    loops,
    tracks,
    activeLoops,
    recordingTrack,
    togglePlay,
    setBpm,
    setMasterVolume,
    toggleLoop,
    setLoopVolume,
    addTrack,
    removeTrack,
    toggleTrackMute,
    setTrackVolume,
    startRecording,
    stopRecording,
    clearAll
  } = useSoundStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Headphones size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-300 
                               bg-clip-text text-transparent">
                  Sound Loop Mixer
                </h1>
                <p className="text-xs text-gray-400">Create beats with loops</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap size={16} className={isPlaying ? 'text-green-400 animate-pulse' : 'text-gray-600'} />
              <span className={isPlaying ? 'text-green-400' : 'text-gray-400'}>
                {isPlaying ? 'Playing' : 'Stopped'}
              </span>
            </div>
          </div>
        </header>

        {/* Visualizer */}
        <div className="mb-6">
          <Visualizer isPlaying={isPlaying} activeLoops={activeLoops} />
        </div>

        {/* Control Panel */}
        <div className="mb-6">
          <ControlPanel
            isPlaying={isPlaying}
            bpm={bpm}
            masterVolume={masterVolume}
            onTogglePlay={togglePlay}
            onBpmChange={setBpm}
            onMasterVolumeChange={setMasterVolume}
            onClearAll={clearAll}
            onAddTrack={addTrack}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Loop Pads */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                Loop Pads
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {loops.map((loop) => (
                  <LoopPad
                    key={loop.id}
                    loop={loop}
                    onToggle={() => toggleLoop(loop.id)}
                    onVolumeChange={(volume) => setLoopVolume(loop.id, volume)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Track Mixer */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                Track Mixer
              </h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {tracks.map((track) => (
                  <TrackMixer
                    key={track.id}
                    track={track}
                    isRecording={recordingTrack === track.id}
                    onMute={() => toggleTrackMute(track.id)}
                    onVolumeChange={(volume) => setTrackVolume(track.id, volume)}
                    onRemove={() => removeTrack(track.id)}
                    onStartRecording={() => startRecording(track.id)}
                    onStopRecording={stopRecording}
                  />
                ))}
                {tracks.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p className="text-sm mb-2">No tracks yet</p>
                    <button
                      onClick={addTrack}
                      className="text-purple-400 hover:text-purple-300 text-sm underline"
                    >
                      Add your first track
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Tap pads to activate loops • Adjust volumes with sliders • Mix tracks in real-time</p>
        </div>
      </div>
    </div>
  )
}

export default App