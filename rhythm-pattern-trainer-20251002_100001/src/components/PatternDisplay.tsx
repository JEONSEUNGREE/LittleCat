import React from 'react';
import { Music, Pause } from 'lucide-react';
import { Pattern, Note } from '../types';

interface PatternDisplayProps {
  pattern: Pattern | null;
  currentNoteIndex?: number;
}

export const PatternDisplay: React.FC<PatternDisplayProps> = ({ pattern, currentNoteIndex = -1 }) => {
  if (!pattern) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white text-center">
        <p className="text-lg">Select a pattern to begin</p>
      </div>
    );
  }

  const getNoteWidth = (duration: string): string => {
    switch (duration) {
      case 'whole': return 'w-32';
      case 'half': return 'w-24';
      case 'quarter': return 'w-16';
      case 'eighth': return 'w-12';
      case 'sixteenth': return 'w-8';
      default: return 'w-16';
    }
  };

  const getNoteHeight = (duration: string): string => {
    switch (duration) {
      case 'whole': return 'h-16';
      case 'half': return 'h-14';
      case 'quarter': return 'h-12';
      case 'eighth': return 'h-10';
      case 'sixteenth': return 'h-8';
      default: return 'h-12';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-white text-xl font-semibold mb-2">{pattern.name}</h3>
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <span>Tempo: {pattern.tempo} BPM</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            pattern.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
            pattern.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {pattern.difficulty}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-black/20 rounded-xl overflow-x-auto">
        {pattern.notes.map((note, index) => (
          <div
            key={note.id}
            className={`flex items-center justify-center transition-all duration-300 ${
              index === currentNoteIndex ? 'animate-bounce-note' : ''
            }`}
          >
            {note.isRest ? (
              <div className={`${getNoteWidth(note.duration)} ${getNoteHeight(note.duration)} 
                bg-gray-600/50 rounded-lg flex items-center justify-center
                ${index === currentNoteIndex ? 'ring-2 ring-yellow-400 bg-gray-600' : ''}`}>
                <Pause className="w-6 h-6 text-gray-400" />
              </div>
            ) : (
              <div className={`${getNoteWidth(note.duration)} ${getNoteHeight(note.duration)}
                bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg
                flex items-center justify-center shadow-lg
                ${index === currentNoteIndex ? 'ring-4 ring-yellow-400 scale-110' : ''}`}>
                <Music className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};