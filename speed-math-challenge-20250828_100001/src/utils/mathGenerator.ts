import { Difficulty, MathProblem, Operation } from '../types/game';

export const generateMathProblem = (difficulty: Difficulty, level: number): MathProblem => {
  let num1: number, num2: number, operation: Operation, answer: number;
  
  const operations: Operation[] = ['+', '-'];
  if (difficulty === 'medium' || difficulty === 'hard' || difficulty === 'expert') {
    operations.push('*');
  }
  if (difficulty === 'hard' || difficulty === 'expert') {
    operations.push('/');
  }
  
  operation = operations[Math.floor(Math.random() * operations.length)];
  
  switch (difficulty) {
    case 'easy':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case 'medium':
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 20) + 1;
      break;
    case 'hard':
      num1 = Math.floor(Math.random() * 100) + 20;
      num2 = Math.floor(Math.random() * 50) + 1;
      break;
    case 'expert':
      num1 = Math.floor(Math.random() * 500) + 50 + (level * 10);
      num2 = Math.floor(Math.random() * 100) + 10 + (level * 5);
      break;
    default:
      num1 = 10;
      num2 = 5;
  }
  
  // For division, ensure clean division
  if (operation === '/') {
    num1 = num2 * (Math.floor(Math.random() * 10) + 2);
  }
  
  // For subtraction, ensure positive result
  if (operation === '-' && num1 < num2) {
    [num1, num2] = [num2, num1];
  }
  
  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = Math.round(num1 / num2);
      break;
  }
  
  return { num1, num2, operation, answer };
};

export const generateAnswerOptions = (correctAnswer: number): number[] => {
  const options = new Set<number>([correctAnswer]);
  
  while (options.size < 4) {
    const variance = Math.max(5, Math.floor(correctAnswer * 0.3));
    const wrongAnswer = correctAnswer + Math.floor((Math.random() - 0.5) * 2 * variance);
    if (wrongAnswer > 0 && wrongAnswer !== correctAnswer) {
      options.add(Math.round(wrongAnswer));
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5);
};