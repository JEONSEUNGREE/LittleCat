import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Volume2, Eye } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const LearningView: React.FC = () => {
  const {
    currentLesson,
    currentSignIndex,
    markSignAsLearned,
    nextSign,
    previousSign,
    updateProgress,
    resetLesson,
  } = useAppStore();

  const [showDescription, setShowDescription] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSign = currentLesson?.signs[currentSignIndex];
  const totalSigns = currentLesson?.signs.length || 0;

  useEffect(() => {
    updateProgress();
  }, [currentSign?.learned, updateProgress]);

  if (!currentLesson || !currentSign) {
    return null;
  }

  const handleLearnSign = () => {
    setIsAnimating(true);
    markSignAsLearned(currentSign.id);
    setTimeout(() => {
      setIsAnimating(false);
      if (currentSignIndex < totalSigns - 1) {
        nextSign();
      }
    }, 500);
  };

  const handleReset = () => {
    if (window.confirm('이 레슨의 진행 상황을 초기화하시겠습니까?')) {
      resetLesson();
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{currentLesson.title}</h2>
          <span className="text-sm text-gray-600">
            {currentSignIndex + 1} / {totalSigns}
          </span>
        </div>

        <div className="flex gap-1 mb-6">
          {currentLesson.signs.map((sign, index) => (
            <div
              key={sign.id}
              className={`flex-1 h-2 rounded-full transition-all ${
                sign.learned
                  ? 'bg-green-500'
                  : index === currentSignIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div
          className={`bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8 mb-6 flex flex-col items-center justify-center min-h-[250px] transition-all ${
            isAnimating ? 'scale-105' : ''
          }`}
        >
          <div className="text-8xl mb-4 animate-float">{currentSign.emoji}</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{currentSign.word}</h3>
          
          {currentSign.learned && (
            <CheckCircle2 className="w-8 h-8 text-green-500 animate-bounce" />
          )}
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            <Eye className="w-5 h-5" />
            {showDescription ? '설명 숨기기' : '동작 설명 보기'}
          </button>
          
          {showDescription && (
            <div className="mt-3 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700">{currentSign.description}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={previousSign}
            disabled={currentSignIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            이전
          </button>

          {!currentSign.learned ? (
            <button
              onClick={handleLearnSign}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              학습 완료
            </button>
          ) : (
            <button
              onClick={nextSign}
              disabled={currentSignIndex === totalSigns - 1}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
          >
            <Volume2 className="w-5 h-5" />
            발음 듣기
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            초기화
          </button>
        </div>

        {currentLesson.progress === 100 && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <h4 className="text-lg font-bold text-green-800">레슨 완료!</h4>
            <p className="text-sm text-green-700">
              축하합니다! {currentLesson.title} 레슨을 완료했습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningView;