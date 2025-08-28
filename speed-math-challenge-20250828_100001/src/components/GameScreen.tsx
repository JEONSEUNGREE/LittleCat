import { useState, useEffect, useCallback } from 'react';
import { Clock, Zap, X, CheckCircle, XCircle, Pause, Play } from 'lucide-react';
import { Difficulty, MathProblem, GameStats } from '../types/game';
import { generateMathProblem, generateAnswerOptions } from '../utils/mathGenerator';
import { useGameTimer } from '../hooks/useGameTimer';
import { useSound } from '../hooks/useSound';

interface GameScreenProps {
  difficulty: Difficulty;
  onGameEnd: (stats: GameStats) => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ difficulty, onGameEnd, onBack }) => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalProblems: 0,
    correctAnswers: 0,
    averageTime: 0,
    level: 1,
  });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [problemStartTime, setProblemStartTime] = useState<number>(Date.now());
  
  const { timeLeft, isActive, isPaused, startTimer, pauseTimer, resumeTimer, resetTimer, addTime } = useGameTimer(60);
  const { playSound } = useSound();

  const generateNewProblem = useCallback(() => {
    const problem = generateMathProblem(difficulty, stats.level);
    setCurrentProblem(problem);
    setAnswerOptions(generateAnswerOptions(problem.answer));
    setProblemStartTime(Date.now());
    setFeedback(null);
  }, [difficulty, stats.level]);

  useEffect(() => {
    generateNewProblem();
    startTimer();
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      playSound('gameover');
      onGameEnd(stats);
    }
  }, [timeLeft, isActive, stats, onGameEnd, playSound]);

  useEffect(() => {
    if (stats.correctAnswers > 0 && stats.correctAnswers % 10 === 0) {
      setStats(prev => ({ ...prev, level: prev.level + 1 }));
      playSound('levelup');
    }
  }, [stats.correctAnswers, playSound]);

  const handleAnswer = (answer: number) => {
    if (!currentProblem || feedback || isPaused) return;

    const timeToSolve = (Date.now() - problemStartTime) / 1000;
    const isCorrect = answer === currentProblem.answer;

    if (isCorrect) {
      playSound('correct');
      const points = Math.max(10, Math.floor(100 / timeToSolve)) * stats.level;
      const newStreak = stats.streak + 1;
      
      setStats(prev => ({
        ...prev,
        score: prev.score + points,
        streak: newStreak,
        bestStreak: Math.max(newStreak, prev.bestStreak),
        totalProblems: prev.totalProblems + 1,
        correctAnswers: prev.correctAnswers + 1,
        averageTime: (prev.averageTime * prev.correctAnswers + timeToSolve) / (prev.correctAnswers + 1),
      }));
      
      // Bonus time for correct streaks
      if (newStreak % 5 === 0) {
        addTime(5);
      }
      
      setFeedback('correct');
    } else {
      playSound('wrong');
      setStats(prev => ({
        ...prev,
        streak: 0,
        totalProblems: prev.totalProblems + 1,
      }));
      setFeedback('wrong');
    }

    setTimeout(() => {
      generateNewProblem();
    }, 800);
  };

  const handlePauseToggle = () => {
    if (isPaused) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="text-white p-2 hover:bg-white/20 rounded-lg transition"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-bold">{timeLeft}초</span>
          </div>
          
          <button
            onClick={handlePauseToggle}
            className="bg-white/20 backdrop-blur rounded-lg p-2 text-white hover:bg-white/30 transition"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
          <p className="text-white/70 text-xs">점수</p>
          <p className="text-white font-bold text-xl">{stats.score}</p>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
          <p className="text-white/70 text-xs">연속 정답</p>
          <p className="text-white font-bold text-xl flex items-center justify-center gap-1">
            {stats.streak}
            {stats.streak >= 5 && <Zap className="w-4 h-4 text-yellow-300" />}
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
          <p className="text-white/70 text-xs">레벨</p>
          <p className="text-white font-bold text-xl">{stats.level}</p>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 flex flex-col justify-center">
        {isPaused ? (
          <div className="bg-white/90 backdrop-blur rounded-2xl p-8 text-center animate-pulse">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">일시정지</h2>
            <p className="text-gray-600">계속하려면 재생 버튼을 누르세요</p>
          </div>
        ) : currentProblem && (
          <div className="space-y-6">
            {/* Problem Display */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-8 text-center relative">
              {feedback && (
                <div className="absolute inset-0 bg-white/95 rounded-2xl flex items-center justify-center animate-slide-up">
                  {feedback === 'correct' ? (
                    <CheckCircle className="w-20 h-20 text-green-500" />
                  ) : (
                    <XCircle className="w-20 h-20 text-red-500" />
                  )}
                </div>
              )}
              
              <div className="text-5xl font-bold text-gray-800">
                {currentProblem.num1} {currentProblem.operation} {currentProblem.num2}
              </div>
              <div className="text-3xl text-gray-500 mt-2">= ?</div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                  className={`
                    bg-white hover:bg-gray-50 text-gray-800 font-bold py-6 rounded-xl
                    transform transition hover:scale-105 active:scale-95 shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${feedback && option === currentProblem.answer ? 'ring-4 ring-green-400' : ''}
                    ${feedback === 'wrong' && option !== currentProblem.answer ? 'opacity-30' : ''}
                  `}
                >
                  <span className="text-2xl">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-yellow-400 h-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;