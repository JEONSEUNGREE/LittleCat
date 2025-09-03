import { Formula } from '../types/formula';

export const formulas: Formula[] = [
  // Math formulas
  {
    id: 'math-1',
    category: 'math',
    subcategory: 'Algebra',
    name: 'Quadratic Formula',
    formula: 'x = (-b ± √(b² - 4ac)) / 2a',
    description: 'Solves quadratic equations of the form ax² + bx + c = 0',
    example: 'For x² + 5x + 6 = 0: x = -2 or x = -3',
    difficulty: 'medium',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'math-2',
    category: 'math',
    subcategory: 'Geometry',
    name: 'Pythagorean Theorem',
    formula: 'a² + b² = c²',
    description: 'Relates the sides of a right triangle',
    example: 'If a=3, b=4, then c=5',
    difficulty: 'easy',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'math-3',
    category: 'math',
    subcategory: 'Trigonometry',
    name: 'Sine Rule',
    formula: 'a/sin(A) = b/sin(B) = c/sin(C)',
    description: 'Relates sides and angles in any triangle',
    difficulty: 'medium',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'math-4',
    category: 'math',
    subcategory: 'Calculus',
    name: 'Derivative Power Rule',
    formula: 'd/dx(xⁿ) = n·xⁿ⁻¹',
    description: 'Finds the derivative of power functions',
    example: 'd/dx(x³) = 3x²',
    difficulty: 'medium',
    mastered: false,
    reviewCount: 0
  },
  
  // Physics formulas
  {
    id: 'physics-1',
    category: 'physics',
    subcategory: 'Mechanics',
    name: 'Newton\'s Second Law',
    formula: 'F = ma',
    description: 'Force equals mass times acceleration',
    example: 'F = 10kg × 2m/s² = 20N',
    difficulty: 'easy',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'physics-2',
    category: 'physics',
    subcategory: 'Kinematics',
    name: 'Equation of Motion',
    formula: 'v² = u² + 2as',
    description: 'Relates velocity, acceleration, and displacement',
    difficulty: 'medium',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'physics-3',
    category: 'physics',
    subcategory: 'Energy',
    name: 'Kinetic Energy',
    formula: 'KE = ½mv²',
    description: 'Energy of a moving object',
    example: 'KE = ½ × 2kg × (3m/s)² = 9J',
    difficulty: 'easy',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'physics-4',
    category: 'physics',
    subcategory: 'Waves',
    name: 'Wave Speed',
    formula: 'v = fλ',
    description: 'Wave speed equals frequency times wavelength',
    difficulty: 'easy',
    mastered: false,
    reviewCount: 0
  },
  
  // Chemistry formulas
  {
    id: 'chem-1',
    category: 'chemistry',
    subcategory: 'Gases',
    name: 'Ideal Gas Law',
    formula: 'PV = nRT',
    description: 'Relates pressure, volume, moles, and temperature',
    example: 'P = 1atm, V = 22.4L, n = 1mol, T = 273K',
    difficulty: 'medium',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'chem-2',
    category: 'chemistry',
    subcategory: 'Solutions',
    name: 'Molarity',
    formula: 'M = n/V',
    description: 'Concentration in moles per liter',
    example: 'M = 0.5mol / 1L = 0.5M',
    difficulty: 'easy',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'chem-3',
    category: 'chemistry',
    subcategory: 'Acids & Bases',
    name: 'pH Formula',
    formula: 'pH = -log[H⁺]',
    description: 'Measures acidity/basicity of a solution',
    example: '[H⁺] = 10⁻⁷ → pH = 7',
    difficulty: 'medium',
    mastered: false,
    reviewCount: 0
  },
  {
    id: 'chem-4',
    category: 'chemistry',
    subcategory: 'Thermodynamics',
    name: 'Gibbs Free Energy',
    formula: 'ΔG = ΔH - TΔS',
    description: 'Determines spontaneity of reactions',
    difficulty: 'hard',
    mastered: false,
    reviewCount: 0
  }
];