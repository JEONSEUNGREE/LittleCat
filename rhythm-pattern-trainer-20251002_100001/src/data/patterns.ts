import { Pattern } from '../types';

export const patterns: Pattern[] = [
  {
    id: 'pattern-1',
    name: 'Basic Quarter Notes',
    tempo: 60,
    difficulty: 'beginner',
    notes: [
      { id: 'n1', duration: 'quarter', isRest: false },
      { id: 'n2', duration: 'quarter', isRest: false },
      { id: 'n3', duration: 'quarter', isRest: false },
      { id: 'n4', duration: 'quarter', isRest: false }
    ]
  },
  {
    id: 'pattern-2',
    name: 'Rest and Play',
    tempo: 70,
    difficulty: 'beginner',
    notes: [
      { id: 'n1', duration: 'quarter', isRest: false },
      { id: 'n2', duration: 'quarter', isRest: true },
      { id: 'n3', duration: 'quarter', isRest: false },
      { id: 'n4', duration: 'quarter', isRest: true }
    ]
  },
  {
    id: 'pattern-3',
    name: 'Mixed Notes',
    tempo: 80,
    difficulty: 'intermediate',
    notes: [
      { id: 'n1', duration: 'half', isRest: false },
      { id: 'n2', duration: 'quarter', isRest: false },
      { id: 'n3', duration: 'quarter', isRest: false }
    ]
  },
  {
    id: 'pattern-4',
    name: 'Eighth Note Rush',
    tempo: 90,
    difficulty: 'intermediate',
    notes: [
      { id: 'n1', duration: 'eighth', isRest: false },
      { id: 'n2', duration: 'eighth', isRest: false },
      { id: 'n3', duration: 'quarter', isRest: false },
      { id: 'n4', duration: 'eighth', isRest: false },
      { id: 'n5', duration: 'eighth', isRest: false },
      { id: 'n6', duration: 'quarter', isRest: false }
    ]
  },
  {
    id: 'pattern-5',
    name: 'Syncopation Challenge',
    tempo: 100,
    difficulty: 'advanced',
    notes: [
      { id: 'n1', duration: 'eighth', isRest: false },
      { id: 'n2', duration: 'sixteenth', isRest: false },
      { id: 'n3', duration: 'sixteenth', isRest: true },
      { id: 'n4', duration: 'quarter', isRest: false },
      { id: 'n5', duration: 'eighth', isRest: false },
      { id: 'n6', duration: 'quarter', isRest: true }
    ]
  },
  {
    id: 'pattern-6',
    name: 'Complex Rhythm',
    tempo: 110,
    difficulty: 'advanced',
    notes: [
      { id: 'n1', duration: 'sixteenth', isRest: false },
      { id: 'n2', duration: 'sixteenth', isRest: false },
      { id: 'n3', duration: 'eighth', isRest: false },
      { id: 'n4', duration: 'quarter', isRest: false },
      { id: 'n5', duration: 'eighth', isRest: true },
      { id: 'n6', duration: 'sixteenth', isRest: false },
      { id: 'n7', duration: 'sixteenth', isRest: false }
    ]
  }
];

export const getDurationInMs = (duration: string, tempo: number): number => {
  const beatDuration = 60000 / tempo;
  
  switch (duration) {
    case 'whole':
      return beatDuration * 4;
    case 'half':
      return beatDuration * 2;
    case 'quarter':
      return beatDuration;
    case 'eighth':
      return beatDuration / 2;
    case 'sixteenth':
      return beatDuration / 4;
    default:
      return beatDuration;
  }
};