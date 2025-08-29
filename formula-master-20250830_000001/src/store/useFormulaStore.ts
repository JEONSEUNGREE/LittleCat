import { create } from 'zustand'

export interface Formula {
  id: string
  category: 'math' | 'physics' | 'chemistry'
  name: string
  expression: string
  variables: Variable[]
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Variable {
  symbol: string
  name: string
  value?: number
  unit?: string
}

interface FormulaState {
  formulas: Formula[]
  currentFormula: Formula | null
  selectedCategory: 'all' | 'math' | 'physics' | 'chemistry'
  quizScore: number
  quizMode: boolean
  setCurrentFormula: (formula: Formula | null) => void
  setSelectedCategory: (category: 'all' | 'math' | 'physics' | 'chemistry') => void
  toggleQuizMode: () => void
  incrementScore: () => void
  resetScore: () => void
}

const initialFormulas: Formula[] = [
  {
    id: '1',
    category: 'math',
    name: '이차방정식의 해',
    expression: 'x = (-b ± √(b² - 4ac)) / 2a',
    variables: [
      { symbol: 'a', name: '이차항 계수' },
      { symbol: 'b', name: '일차항 계수' },
      { symbol: 'c', name: '상수항' }
    ],
    description: '이차방정식 ax² + bx + c = 0의 근을 구하는 공식',
    difficulty: 'medium'
  },
  {
    id: '2',
    category: 'physics',
    name: '뉴턴의 제2법칙',
    expression: 'F = ma',
    variables: [
      { symbol: 'F', name: '힘', unit: 'N' },
      { symbol: 'm', name: '질량', unit: 'kg' },
      { symbol: 'a', name: '가속도', unit: 'm/s²' }
    ],
    description: '물체에 작용하는 힘은 질량과 가속도의 곱과 같다',
    difficulty: 'easy'
  },
  {
    id: '3',
    category: 'math',
    name: '피타고라스 정리',
    expression: 'a² + b² = c²',
    variables: [
      { symbol: 'a', name: '밑변' },
      { symbol: 'b', name: '높이' },
      { symbol: 'c', name: '빗변' }
    ],
    description: '직각삼각형에서 빗변의 제곱은 다른 두 변의 제곱의 합과 같다',
    difficulty: 'easy'
  },
  {
    id: '4',
    category: 'physics',
    name: '운동 에너지',
    expression: 'E = ½mv²',
    variables: [
      { symbol: 'E', name: '에너지', unit: 'J' },
      { symbol: 'm', name: '질량', unit: 'kg' },
      { symbol: 'v', name: '속도', unit: 'm/s' }
    ],
    description: '운동하는 물체가 가진 에너지',
    difficulty: 'medium'
  },
  {
    id: '5',
    category: 'chemistry',
    name: '이상기체 법칙',
    expression: 'PV = nRT',
    variables: [
      { symbol: 'P', name: '압력', unit: 'Pa' },
      { symbol: 'V', name: '부피', unit: 'L' },
      { symbol: 'n', name: '몰수', unit: 'mol' },
      { symbol: 'R', name: '기체상수', unit: 'J/(mol·K)' },
      { symbol: 'T', name: '온도', unit: 'K' }
    ],
    description: '이상기체의 압력, 부피, 온도 사이의 관계',
    difficulty: 'hard'
  },
  {
    id: '6',
    category: 'math',
    name: '원의 넓이',
    expression: 'A = πr²',
    variables: [
      { symbol: 'A', name: '넓이' },
      { symbol: 'r', name: '반지름' },
      { symbol: 'π', name: '원주율', value: 3.14159 }
    ],
    description: '원의 넓이를 구하는 공식',
    difficulty: 'easy'
  }
]

const useFormulaStore = create<FormulaState>((set) => ({
  formulas: initialFormulas,
  currentFormula: null,
  selectedCategory: 'all',
  quizScore: 0,
  quizMode: false,
  setCurrentFormula: (formula) => set({ currentFormula: formula }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  toggleQuizMode: () => set((state) => ({ quizMode: !state.quizMode, quizScore: state.quizMode ? 0 : state.quizScore })),
  incrementScore: () => set((state) => ({ quizScore: state.quizScore + 1 })),
  resetScore: () => set({ quizScore: 0 })
}))

export default useFormulaStore