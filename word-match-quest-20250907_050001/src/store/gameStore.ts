import { create } from 'zustand';
import { GameState, Letter, Monster, Player } from '../types/game';
import { generateLetters, generateMonster, checkWord, VALID_WORDS } from '../utils/gameUtils';

interface GameStore extends GameState {
  initGame: () => void;
  selectLetter: (letter: Letter) => void;
  clearSelection: () => void;
  submitWord: () => void;
  attackMonster: (damage: number) => void;
  nextStage: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  setGameStatus: (status: GameState['gameStatus']) => void;
}

const initialPlayer: Player = {
  level: 1,
  exp: 0,
  maxExp: 100,
  hp: 100,
  maxHp: 100,
  attack: 10,
  coins: 0,
  wordsFound: [],
};

export const useGameStore = create<GameStore>((set, get) => ({
  player: initialPlayer,
  currentMonster: null,
  letters: [],
  selectedLetters: [],
  currentWord: '',
  score: 0,
  combo: 0,
  stage: 1,
  gameStatus: 'menu',
  message: '',
  validWords: VALID_WORDS,

  initGame: () => {
    set({
      player: initialPlayer,
      currentMonster: generateMonster(1),
      letters: generateLetters(),
      selectedLetters: [],
      currentWord: '',
      score: 0,
      combo: 0,
      stage: 1,
      gameStatus: 'playing',
      message: '게임 시작! 단어를 만들어 몬스터를 공격하세요!',
    });
  },

  selectLetter: (letter: Letter) => {
    const { selectedLetters, letters } = get();
    
    if (letter.isSelected) {
      const index = selectedLetters.findIndex(l => l.id === letter.id);
      if (index === selectedLetters.length - 1) {
        const newSelectedLetters = selectedLetters.slice(0, -1);
        const newLetters = letters.map(l => 
          l.id === letter.id ? { ...l, isSelected: false } : l
        );
        set({
          selectedLetters: newSelectedLetters,
          letters: newLetters,
          currentWord: newSelectedLetters.map(l => l.letter).join(''),
        });
      }
    } else {
      const newSelectedLetters = [...selectedLetters, letter];
      const newLetters = letters.map(l =>
        l.id === letter.id ? { ...l, isSelected: true } : l
      );
      set({
        selectedLetters: newSelectedLetters,
        letters: newLetters,
        currentWord: newSelectedLetters.map(l => l.letter).join(''),
      });
    }
  },

  clearSelection: () => {
    const { letters } = get();
    set({
      selectedLetters: [],
      letters: letters.map(l => ({ ...l, isSelected: false })),
      currentWord: '',
    });
  },

  submitWord: () => {
    const { currentWord, player, currentMonster, combo, score } = get();
    
    if (!currentMonster) return;
    
    if (checkWord(currentWord)) {
      const damage = currentWord.length * (player.attack + combo);
      const newCombo = combo + 1;
      const points = currentWord.length * 10 * newCombo;
      
      get().attackMonster(damage);
      
      set(state => ({
        score: score + points,
        combo: newCombo,
        message: `"${currentWord}" 공격! ${damage} 데미지!`,
        player: {
          ...state.player,
          wordsFound: [...state.player.wordsFound, currentWord],
        },
      }));
      
      get().clearSelection();
      
      setTimeout(() => {
        set({ letters: generateLetters() });
      }, 500);
    } else {
      set({
        combo: 0,
        message: `"${currentWord}"는 유효하지 않은 단어입니다!`,
      });
      get().clearSelection();
    }
  },

  attackMonster: (damage: number) => {
    const { currentMonster, player } = get();
    if (!currentMonster) return;

    const newHp = Math.max(0, currentMonster.hp - damage);
    
    if (newHp <= 0) {
      const expGain = currentMonster.reward;
      const newExp = player.exp + expGain;
      const shouldLevelUp = newExp >= player.maxExp;
      
      set({
        currentMonster: { ...currentMonster, hp: 0 },
        player: {
          ...player,
          exp: shouldLevelUp ? newExp - player.maxExp : newExp,
          level: shouldLevelUp ? player.level + 1 : player.level,
          maxExp: shouldLevelUp ? player.maxExp + 50 : player.maxExp,
          maxHp: shouldLevelUp ? player.maxHp + 20 : player.maxHp,
          hp: shouldLevelUp ? player.maxHp + 20 : player.hp,
          attack: shouldLevelUp ? player.attack + 5 : player.attack,
          coins: player.coins + currentMonster.reward * 10,
        },
        message: shouldLevelUp ? `레벨 업! Lv.${player.level + 1}` : '몬스터 처치!',
      });
      
      setTimeout(() => {
        get().nextStage();
      }, 1500);
    } else {
      set({
        currentMonster: { ...currentMonster, hp: newHp },
      });
      
      const monsterDamage = Math.max(1, currentMonster.attack - player.level);
      const newPlayerHp = Math.max(0, player.hp - monsterDamage);
      
      if (newPlayerHp <= 0) {
        set({
          player: { ...player, hp: 0 },
          gameStatus: 'gameOver',
          message: '게임 오버!',
        });
      } else {
        set({
          player: { ...player, hp: newPlayerHp },
        });
      }
    }
  },

  nextStage: () => {
    const { stage } = get();
    const newStage = stage + 1;
    
    if (newStage > 10) {
      set({
        gameStatus: 'victory',
        message: '축하합니다! 모든 스테이지를 클리어했습니다!',
      });
    } else {
      set({
        stage: newStage,
        currentMonster: generateMonster(newStage),
        letters: generateLetters(),
        selectedLetters: [],
        currentWord: '',
        message: `스테이지 ${newStage}!`,
      });
    }
  },

  pauseGame: () => {
    set({ gameStatus: 'paused' });
  },

  resumeGame: () => {
    set({ gameStatus: 'playing' });
  },

  resetGame: () => {
    set({
      player: initialPlayer,
      currentMonster: null,
      letters: [],
      selectedLetters: [],
      currentWord: '',
      score: 0,
      combo: 0,
      stage: 1,
      gameStatus: 'menu',
      message: '',
    });
  },

  setGameStatus: (status: GameState['gameStatus']) => {
    set({ gameStatus: status });
  },
}));