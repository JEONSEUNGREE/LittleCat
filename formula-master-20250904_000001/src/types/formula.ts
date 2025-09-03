export interface Formula {
  id: string;
  category: 'math' | 'physics' | 'chemistry';
  subcategory: string;
  name: string;
  formula: string;
  description: string;
  example?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
  lastReviewed?: Date;
  reviewCount: number;
}