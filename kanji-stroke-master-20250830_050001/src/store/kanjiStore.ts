import { create } from 'zustand'

export interface Kanji {
  id: string
  character: string
  meaning: string
  reading: string
  level: number
  strokes: string[]
  strokeCount: number
}

interface KanjiStore {
  kanjiList: Kanji[]
  currentKanji: Kanji | null
  currentLevel: number
  score: number
  completedKanji: string[]
  userStrokes: string[]
  
  initializeApp: () => void
  selectKanji: (kanji: Kanji) => void
  setLevel: (level: number) => void
  addScore: (points: number) => void
  markAsCompleted: (kanjiId: string) => void
  resetProgress: () => void
  addUserStroke: (stroke: string) => void
  clearUserStrokes: () => void
}

const sampleKanji: Kanji[] = [
  {
    id: '1',
    character: '一',
    meaning: '하나',
    reading: 'いち',
    level: 1,
    strokes: ['M 50 150 L 350 150'],
    strokeCount: 1
  },
  {
    id: '2',
    character: '二',
    meaning: '둘',
    reading: 'に',
    level: 1,
    strokes: ['M 50 100 L 350 100', 'M 50 200 L 350 200'],
    strokeCount: 2
  },
  {
    id: '3',
    character: '三',
    meaning: '셋',
    reading: 'さん',
    level: 1,
    strokes: ['M 50 75 L 350 75', 'M 50 150 L 350 150', 'M 50 225 L 350 225'],
    strokeCount: 3
  },
  {
    id: '4',
    character: '人',
    meaning: '사람',
    reading: 'ひと',
    level: 1,
    strokes: ['M 200 50 L 100 250', 'M 200 50 L 300 250'],
    strokeCount: 2
  },
  {
    id: '5',
    character: '大',
    meaning: '크다',
    reading: 'だい',
    level: 2,
    strokes: ['M 50 150 L 350 150', 'M 200 50 L 100 250', 'M 200 50 L 300 250'],
    strokeCount: 3
  },
  {
    id: '6',
    character: '小',
    meaning: '작다',
    reading: 'しょう',
    level: 2,
    strokes: ['M 200 50 L 200 250', 'M 150 150 L 100 200', 'M 250 150 L 300 200'],
    strokeCount: 3
  },
  {
    id: '7',
    character: '日',
    meaning: '해/날',
    reading: 'ひ',
    level: 2,
    strokes: [
      'M 100 50 L 100 250',
      'M 100 50 L 300 50',
      'M 300 50 L 300 250',
      'M 100 250 L 300 250',
      'M 100 150 L 300 150'
    ],
    strokeCount: 5
  },
  {
    id: '8',
    character: '月',
    meaning: '달',
    reading: 'つき',
    level: 3,
    strokes: [
      'M 100 50 L 100 250',
      'M 100 50 L 300 50',
      'M 300 50 L 300 250',
      'M 100 250 L 300 250',
      'M 100 120 L 300 120',
      'M 100 180 L 300 180'
    ],
    strokeCount: 6
  },
  {
    id: '9',
    character: '水',
    meaning: '물',
    reading: 'みず',
    level: 3,
    strokes: [
      'M 200 50 L 200 250',
      'M 150 100 L 100 150',
      'M 250 100 L 300 150',
      'M 150 200 L 100 250',
      'M 250 200 L 300 250'
    ],
    strokeCount: 5
  },
  {
    id: '10',
    character: '火',
    meaning: '불',
    reading: 'ひ',
    level: 3,
    strokes: [
      'M 150 100 L 100 150',
      'M 250 100 L 300 150',
      'M 200 50 L 200 250',
      'M 150 200 L 100 250',
      'M 250 200 L 300 250'
    ],
    strokeCount: 5
  }
]

export const useKanjiStore = create<KanjiStore>((set, get) => ({
  kanjiList: sampleKanji,
  currentKanji: null,
  currentLevel: 1,
  score: 0,
  completedKanji: [],
  userStrokes: [],
  
  initializeApp: () => {
    const { kanjiList, currentLevel } = get()
    const levelKanji = kanjiList.filter(k => k.level === currentLevel)
    if (levelKanji.length > 0) {
      set({ currentKanji: levelKanji[0] })
    }
  },
  
  selectKanji: (kanji) => set({ currentKanji: kanji, userStrokes: [] }),
  
  setLevel: (level) => {
    const { kanjiList } = get()
    const levelKanji = kanjiList.filter(k => k.level === level)
    set({ 
      currentLevel: level,
      currentKanji: levelKanji.length > 0 ? levelKanji[0] : null,
      userStrokes: []
    })
  },
  
  addScore: (points) => set((state) => ({ score: state.score + points })),
  
  markAsCompleted: (kanjiId) => set((state) => ({
    completedKanji: [...state.completedKanji, kanjiId],
    score: state.score + 10
  })),
  
  resetProgress: () => set({
    score: 0,
    completedKanji: [],
    currentLevel: 1,
    userStrokes: []
  }),
  
  addUserStroke: (stroke) => set((state) => ({
    userStrokes: [...state.userStrokes, stroke]
  })),
  
  clearUserStrokes: () => set({ userStrokes: [] })
}))