import { create } from 'zustand';

export type GameState = 'idle' | 'showing' | 'playing' | 'gameOver' | 'victory';
export type SoundNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' | 'C2';

interface GameStore {
  score: number;
  level: number;
  highScore: number;
  gameState: GameState;
  sequence: SoundNote[];
  playerSequence: SoundNote[];
  isShowingSequence: boolean;
  currentShowIndex: number;
  lives: number;
  combo: number;
  
  startGame: () => void;
  addToSequence: () => void;
  playSequence: () => void;
  handlePlayerInput: (note: SoundNote) => void;
  resetGame: () => void;
  nextLevel: () => void;
  setGameState: (state: GameState) => void;
}

const soundFrequencies: Record<SoundNote, number> = {
  'C': 261.63,
  'D': 293.66,
  'E': 329.63,
  'F': 349.23,
  'G': 392.00,
  'A': 440.00,
  'B': 493.88,
  'C2': 523.25,
};

const notes: SoundNote[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];

export const playSound = (note: SoundNote, duration: number = 400) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = soundFrequencies[note];
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
};

export const useGameStore = create<GameStore>((set, get) => ({
  score: 0,
  level: 1,
  highScore: parseInt(localStorage.getItem('memoryEchoHighScore') || '0'),
  gameState: 'idle',
  sequence: [],
  playerSequence: [],
  isShowingSequence: false,
  currentShowIndex: 0,
  lives: 3,
  combo: 0,
  
  startGame: () => {
    set({
      score: 0,
      level: 1,
      gameState: 'showing',
      sequence: [],
      playerSequence: [],
      lives: 3,
      combo: 0,
    });
    setTimeout(() => get().addToSequence(), 500);
  },
  
  addToSequence: () => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    const newSequence = [...get().sequence, randomNote];
    set({ sequence: newSequence });
    get().playSequence();
  },
  
  playSequence: () => {
    set({ isShowingSequence: true, currentShowIndex: 0, gameState: 'showing' });
    const sequence = get().sequence;
    
    sequence.forEach((note, index) => {
      setTimeout(() => {
        playSound(note);
        set({ currentShowIndex: index });
        
        if (index === sequence.length - 1) {
          setTimeout(() => {
            set({ 
              isShowingSequence: false, 
              gameState: 'playing',
              playerSequence: []
            });
          }, 600);
        }
      }, (index + 1) * 600);
    });
  },
  
  handlePlayerInput: (note: SoundNote) => {
    const { sequence, playerSequence, gameState, score, level, combo, lives } = get();
    
    if (gameState !== 'playing') return;
    
    playSound(note, 300);
    const newPlayerSequence = [...playerSequence, note];
    const currentIndex = newPlayerSequence.length - 1;
    
    if (sequence[currentIndex] === note) {
      // Correct input
      const newCombo = combo + 1;
      const points = 10 * level * (newCombo > 3 ? 2 : 1);
      
      if (newPlayerSequence.length === sequence.length) {
        // Completed sequence
        set({
          playerSequence: newPlayerSequence,
          score: score + points + 50 * level,
          combo: newCombo,
        });
        
        setTimeout(() => get().nextLevel(), 1000);
      } else {
        set({
          playerSequence: newPlayerSequence,
          score: score + points,
          combo: newCombo,
        });
      }
    } else {
      // Wrong input
      const newLives = lives - 1;
      
      if (newLives <= 0) {
        const highScore = get().highScore;
        const newHighScore = Math.max(score, highScore);
        localStorage.setItem('memoryEchoHighScore', newHighScore.toString());
        
        set({
          gameState: 'gameOver',
          lives: 0,
          combo: 0,
          highScore: newHighScore,
        });
      } else {
        set({
          lives: newLives,
          combo: 0,
          playerSequence: [],
        });
        
        setTimeout(() => get().playSequence(), 1500);
      }
    }
  },
  
  resetGame: () => {
    set({
      score: 0,
      level: 1,
      gameState: 'idle',
      sequence: [],
      playerSequence: [],
      isShowingSequence: false,
      lives: 3,
      combo: 0,
    });
  },
  
  nextLevel: () => {
    const newLevel = get().level + 1;
    
    if (newLevel > 20) {
      const { score, highScore } = get();
      const newHighScore = Math.max(score, highScore);
      localStorage.setItem('memoryEchoHighScore', newHighScore.toString());
      
      set({
        gameState: 'victory',
        level: newLevel,
        highScore: newHighScore,
      });
    } else {
      set({
        level: newLevel,
        playerSequence: [],
      });
      
      setTimeout(() => get().addToSequence(), 500);
    }
  },
  
  setGameState: (state: GameState) => set({ gameState: state }),
}));