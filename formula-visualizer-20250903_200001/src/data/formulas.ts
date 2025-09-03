import { Formula } from '../store/useFormulaStore'

export const formulas: Formula[] = [
  // Math Formulas
  {
    id: 'linear',
    name: '일차 함수',
    expression: 'y = ax + b',
    description: '직선의 방정식. 기울기 a와 y절편 b로 결정됩니다.',
    category: 'math',
    graphType: 'linear',
    parameters: [
      { symbol: 'a', name: '기울기', value: 1, min: -5, max: 5, step: 0.1 },
      { symbol: 'b', name: 'y절편', value: 0, min: -10, max: 10, step: 0.5 }
    ]
  },
  {
    id: 'quadratic',
    name: '이차 함수',
    expression: 'y = ax² + bx + c',
    description: '포물선의 방정식. 이차항 계수 a가 곡선의 개방 방향을 결정합니다.',
    category: 'math',
    graphType: 'quadratic',
    parameters: [
      { symbol: 'a', name: '이차항 계수', value: 1, min: -3, max: 3, step: 0.1 },
      { symbol: 'b', name: '일차항 계수', value: 0, min: -5, max: 5, step: 0.2 },
      { symbol: 'c', name: '상수항', value: 0, min: -10, max: 10, step: 0.5 }
    ]
  },
  {
    id: 'sine',
    name: '사인 함수',
    expression: 'y = A·sin(Bx + C) + D',
    description: '주기적인 파동을 나타내는 삼각함수입니다.',
    category: 'math',
    graphType: 'trigonometric',
    parameters: [
      { symbol: 'A', name: '진폭', value: 1, min: 0.5, max: 3, step: 0.1 },
      { symbol: 'B', name: '주파수', value: 1, min: 0.5, max: 3, step: 0.1 },
      { symbol: 'C', name: '위상', value: 0, min: -3.14, max: 3.14, step: 0.1 },
      { symbol: 'D', name: '수직이동', value: 0, min: -2, max: 2, step: 0.1 }
    ]
  },
  {
    id: 'exponential',
    name: '지수 함수',
    expression: 'y = a·bˣ',
    description: '급격한 성장이나 감소를 나타내는 함수입니다.',
    category: 'math',
    graphType: 'exponential',
    parameters: [
      { symbol: 'a', name: '초기값', value: 1, min: 0.5, max: 3, step: 0.1 },
      { symbol: 'b', name: '밑', value: 2, min: 0.5, max: 3, step: 0.1 }
    ]
  },
  
  // Physics Formulas
  {
    id: 'projectile',
    name: '포물선 운동',
    expression: 'y = v₀t·sin(θ) - ½gt²',
    description: '중력장에서 물체의 포물선 운동을 나타냅니다.',
    category: 'physics',
    graphType: 'quadratic',
    parameters: [
      { symbol: 'v0', name: '초기속도(m/s)', value: 20, min: 10, max: 50, step: 1 },
      { symbol: 'theta', name: '발사각(도)', value: 45, min: 15, max: 75, step: 5 },
      { symbol: 'g', name: '중력가속도', value: 9.8, min: 9.8, max: 9.8, step: 0 }
    ]
  },
  {
    id: 'harmonic',
    name: '단진동',
    expression: 'x = A·cos(ωt + φ)',
    description: '스프링이나 진자의 단순 조화 운동을 나타냅니다.',
    category: 'physics',
    graphType: 'trigonometric',
    parameters: [
      { symbol: 'A', name: '진폭(m)', value: 1, min: 0.5, max: 2, step: 0.1 },
      { symbol: 'omega', name: '각속도(rad/s)', value: 2, min: 1, max: 5, step: 0.2 },
      { symbol: 'phi', name: '초기위상(rad)', value: 0, min: 0, max: 6.28, step: 0.2 }
    ]
  },
  
  // Chemistry Formulas
  {
    id: 'decay',
    name: '방사성 붕괴',
    expression: 'N = N₀·e^(-λt)',
    description: '시간에 따른 방사성 물질의 붕괴를 나타냅니다.',
    category: 'chemistry',
    graphType: 'exponential',
    parameters: [
      { symbol: 'N0', name: '초기 원자수', value: 100, min: 50, max: 200, step: 10 },
      { symbol: 'lambda', name: '붕괴상수', value: 0.1, min: 0.01, max: 0.5, step: 0.01 }
    ]
  },
  {
    id: 'ph',
    name: 'pH 농도',
    expression: 'pH = -log₁₀[H⁺]',
    description: '수소 이온 농도에 따른 pH 값을 계산합니다.',
    category: 'chemistry',
    graphType: 'exponential',
    parameters: [
      { symbol: 'H', name: '[H⁺] 농도', value: 0.0001, min: 0.0000001, max: 0.1, step: 0.0000001 }
    ]
  }
]