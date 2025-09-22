import { create } from 'zustand'

interface Word {
  text: string
  player: 'user' | 'ai'
  timestamp: number
}

interface GameState {
  words: Word[]
  currentWord: string
  inputValue: string
  isPlayerTurn: boolean
  score: { player: number; ai: number }
  gameStatus: 'waiting' | 'playing' | 'gameOver'
  difficulty: 'easy' | 'medium' | 'hard'
  timer: number
  usedWords: Set<string>
  
  // Actions
  setInputValue: (value: string) => void
  submitWord: (word: string) => void
  aiTurn: () => void
  startGame: () => void
  resetGame: () => void
  setDifficulty: (level: 'easy' | 'medium' | 'hard') => void
  updateTimer: () => void
}

// Simple Korean word database
const koreanWords = [
  '사과', '과일', '일본', '본능', '능력', '력사', '사람', '람보', '보물', '물고기',
  '기차', '차량', '량산', '산책', '책상', '상자', '자리', '리본', '본부', '부모',
  '모자', '자동차', '차고', '고양이', '이야기', '기계', '계란', '란색', '색깔', '깔끔',
  '김치', '치과', '과학', '학교', '교실', '실력', '력도', '도시', '시장', '장미',
  '미소', '소리', '리듬', '듬직', '직업', '업무', '무지개', '개미', '미술', '술집',
  '집안', '안경', '경찰', '찰흙', '흙길', '길이', '이름', '름달', '달빛', '빛나다',
  '나무', '무릎', '릎관절', '절약', '약속', '속도', '도로', '로봇', '봇짐', '짐승',
  '수박', '박물관', '관광', '광고', '고민', '민주', '주말', '말하다', '다리', '리더'
]

const useGameStore = create<GameState>((set, get) => ({
  words: [],
  currentWord: '',
  inputValue: '',
  isPlayerTurn: true,
  score: { player: 0, ai: 0 },
  gameStatus: 'waiting',
  difficulty: 'medium',
  timer: 30,
  usedWords: new Set(),

  setInputValue: (value) => set({ inputValue: value }),

  submitWord: (word) => {
    const state = get()
    if (state.gameStatus !== 'playing' || !state.isPlayerTurn) return
    
    // Validate word
    if (word.length < 2) return
    if (state.usedWords.has(word)) return
    if (state.currentWord && !word.startsWith(state.currentWord[state.currentWord.length - 1])) return

    // Add word
    const newWords = [...state.words, { text: word, player: 'user', timestamp: Date.now() }]
    const newUsedWords = new Set(state.usedWords)
    newUsedWords.add(word)
    
    set({ 
      words: newWords,
      currentWord: word,
      inputValue: '',
      isPlayerTurn: false,
      score: { ...state.score, player: state.score.player + word.length },
      usedWords: newUsedWords,
      timer: 30
    })

    // Trigger AI turn
    setTimeout(() => get().aiTurn(), 1500)
  },

  aiTurn: () => {
    const state = get()
    if (state.gameStatus !== 'playing' || state.isPlayerTurn) return

    const lastChar = state.currentWord[state.currentWord.length - 1]
    const possibleWords = koreanWords.filter(
      w => w.startsWith(lastChar) && !state.usedWords.has(w)
    )

    if (possibleWords.length === 0) {
      // AI loses
      set({ 
        gameStatus: 'gameOver',
        score: { ...state.score, player: state.score.player + 10 }
      })
      return
    }

    // Select word based on difficulty
    let selectedWord: string
    if (state.difficulty === 'easy') {
      selectedWord = possibleWords[0]
    } else if (state.difficulty === 'medium') {
      selectedWord = possibleWords[Math.floor(Math.random() * Math.min(3, possibleWords.length))]
    } else {
      selectedWord = possibleWords[possibleWords.length - 1]
    }

    const newWords = [...state.words, { text: selectedWord, player: 'ai', timestamp: Date.now() }]
    const newUsedWords = new Set(state.usedWords)
    newUsedWords.add(selectedWord)

    set({ 
      words: newWords,
      currentWord: selectedWord,
      isPlayerTurn: true,
      score: { ...state.score, ai: state.score.ai + selectedWord.length },
      usedWords: newUsedWords,
      timer: 30
    })
  },

  startGame: () => {
    const firstWord = koreanWords[Math.floor(Math.random() * koreanWords.length)]
    set({ 
      gameStatus: 'playing',
      words: [{ text: firstWord, player: 'ai', timestamp: Date.now() }],
      currentWord: firstWord,
      isPlayerTurn: true,
      score: { player: 0, ai: firstWord.length },
      usedWords: new Set([firstWord]),
      timer: 30
    })
  },

  resetGame: () => set({
    words: [],
    currentWord: '',
    inputValue: '',
    isPlayerTurn: true,
    score: { player: 0, ai: 0 },
    gameStatus: 'waiting',
    timer: 30,
    usedWords: new Set()
  }),

  setDifficulty: (level) => set({ difficulty: level }),

  updateTimer: () => {
    const state = get()
    if (state.gameStatus !== 'playing' || !state.isPlayerTurn) return
    
    const newTimer = state.timer - 1
    if (newTimer <= 0) {
      set({ 
        gameStatus: 'gameOver',
        score: { ...state.score, ai: state.score.ai + 10 }
      })
    } else {
      set({ timer: newTimer })
    }
  }
}))