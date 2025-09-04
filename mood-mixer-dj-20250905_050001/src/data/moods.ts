import { Mood } from '../types';

export const MOODS: Mood[] = [
  {
    id: 'happy',
    name: 'Happy',
    color: '#FFD700',
    emoji: '😊',
    intensity: 0.8,
    beats: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
  },
  {
    id: 'sad',
    name: 'Sad',
    color: '#4169E1',
    emoji: '😢',
    intensity: 0.3,
    beats: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
  },
  {
    id: 'energetic',
    name: 'Energetic',
    color: '#FF4500',
    emoji: '⚡',
    intensity: 1.0,
    beats: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: 'calm',
    name: 'Calm',
    color: '#90EE90',
    emoji: '🧘',
    intensity: 0.2,
    beats: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  },
  {
    id: 'angry',
    name: 'Angry',
    color: '#DC143C',
    emoji: '😠',
    intensity: 0.9,
    beats: [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1]
  },
  {
    id: 'romantic',
    name: 'Romantic',
    color: '#FF69B4',
    emoji: '💕',
    intensity: 0.6,
    beats: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
  },
  {
    id: 'mysterious',
    name: 'Mysterious',
    color: '#9370DB',
    emoji: '🔮',
    intensity: 0.5,
    beats: [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1]
  },
  {
    id: 'focused',
    name: 'Focused',
    color: '#20B2AA',
    emoji: '🎯',
    intensity: 0.7,
    beats: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
  }
];