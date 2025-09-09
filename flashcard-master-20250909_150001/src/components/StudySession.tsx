import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { 
  ChevronLeft, 
  RotateCw, 
  Check, 
  X, 
  Award, 
  TrendingUp,
  Brain,
  Target
} from 'lucide-react';

interface StudySessionProps {
  onBack: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ onBack }) => {
  const {
    currentDeck,
    currentCard,
    currentCardIndex,
    currentSession,
    showAnswer,
    userProgress,
    flipCard,
    markAnswer,
    nextCard,
    endSession,
  } = useStore();

  const [isFlipping, setIsFlipping] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!currentSession && currentDeck) {
      useStore.getState().startStudySession(currentDeck.id);
    }
  }, [currentDeck, currentSession]);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      flipCard();
      setIsFlipping(false);
    }, 300);
  };

  const handleAnswer = (correct: boolean) => {
    markAnswer(correct);
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
      const hasMoreCards = currentDeck && currentCardIndex < currentDeck.cards.length - 1;
      
      if (hasMoreCards) {
        nextCard();
      } else {
        // Show session complete
        endSession();
      }
    }, 1500);
  };

  if (!currentDeck || !currentCard || !currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">학습할 카드가 없습니다</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentCardIndex + 1) / currentDeck.cards.length) * 100;
  const accuracy = currentSession.cardsStudied > 0
    ? (currentSession.correctAnswers / currentSession.cardsStudied) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>뒤로</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium">{currentCardIndex + 1}/{currentDeck.cards.length}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">{Math.round(accuracy)}%</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        {/* Study Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-xs text-gray-500">레벨</p>
            <p className="text-lg font-bold text-indigo-600">{userProgress.level}</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-xs text-gray-500">연속 학습</p>
            <p className="text-lg font-bold text-green-600">{userProgress.studyStreak}일</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-xs text-gray-500">경험치</p>
            <p className="text-lg font-bold text-purple-600">{userProgress.experience}</p>
          </div>
        </div>

        {/* Flashcard */}
        <div className="relative h-80 mb-8">
          <div
            className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              isFlipping ? 'scale-95 opacity-50' : ''
            } ${showResult ? (currentSession.correctAnswers > currentSession.incorrectAnswers ? 'ring-4 ring-green-400' : 'ring-4 ring-red-400') : ''}`}
            onClick={!showAnswer ? handleFlip : undefined}
          >
            {/* Difficulty Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
              currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentCard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentCard.difficulty === 'easy' ? '쉬움' :
               currentCard.difficulty === 'medium' ? '보통' : '어려움'}
            </div>

            {/* Category */}
            <div className="absolute top-4 left-4 text-sm text-gray-500">
              {currentCard.category}
            </div>

            {/* Card Content */}
            <div className="text-center">
              {!showAnswer ? (
                <>
                  <p className="text-2xl font-bold text-gray-800 mb-4">{currentCard.question}</p>
                  <p className="text-gray-500 text-sm">탭하여 답 확인</p>
                  <RotateCw className="w-8 h-8 text-gray-400 mx-auto mt-4 animate-pulse" />
                </>
              ) : (
                <>
                  <p className="text-xl text-gray-600 mb-4">{currentCard.question}</p>
                  <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-indigo-600">{currentCard.answer}</p>
                </>
              )}
            </div>

            {/* Streak Indicator */}
            {currentCard.streak > 0 && (
              <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">{currentCard.streak} 연속</span>
              </div>
            )}
          </div>
        </div>

        {/* Answer Buttons */}
        {showAnswer && !showResult && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <X className="w-5 h-5" />
              <span>틀렸어요</span>
            </button>
            
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Check className="w-5 h-5" />
              <span>맞았어요</span>
            </button>
          </div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div className="text-center animate-fade-in">
            <p className="text-lg font-medium text-gray-700">
              {currentSession.correctAnswers > currentSession.incorrectAnswers 
                ? '잘하고 있어요! 계속 진행하세요!' 
                : '괜찮아요! 다음엔 더 잘할 수 있어요!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySession;