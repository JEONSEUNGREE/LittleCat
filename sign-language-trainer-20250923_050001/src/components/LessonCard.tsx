import React from 'react';
import { BookOpen, Star, Lock, CheckCircle } from 'lucide-react';

interface LessonProps {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  completed: boolean;
  isLocked?: boolean;
  onClick: () => void;
}

const LessonCard: React.FC<LessonProps> = ({
  title,
  category,
  difficulty,
  progress,
  completed,
  isLocked = false,
  onClick,
}) => {
  const difficultyColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500',
  };

  const difficultyLabels = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
  };

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full p-4 rounded-xl transition-all duration-300 ${
        isLocked
          ? 'bg-gray-800/50 opacity-50 cursor-not-allowed'
          : 'bg-white/90 hover:bg-white hover:scale-105 hover:shadow-xl cursor-pointer'
      } card-shadow`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <Lock className="w-5 h-5 text-gray-500" />
          ) : completed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <BookOpen className="w-5 h-5 text-blue-500" />
          )}
          <span className="text-xs text-gray-600 font-medium">{category}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs text-white ${difficultyColors[difficulty]}`}>
          {difficultyLabels[difficulty]}
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">{title}</h3>

      {!isLocked && (
        <>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  progress >= (star * 100) / 3
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{Math.round(progress)}% 완료</p>
        </>
      )}
    </button>
  );
};

export default LessonCard;