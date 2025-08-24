import React from 'react'
import { X, BookOpen, Lightbulb, Target } from 'lucide-react'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Math Visual Lab 소개</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <BookOpen className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">개념 학습</h3>
              <p className="text-sm text-gray-600">
                일차, 이차, 삼각, 지수 함수의 그래프를 실시간으로 시각화하여 
                수학 개념을 직관적으로 이해할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">인터랙티브 학습</h3>
              <p className="text-sm text-gray-600">
                파라미터를 직접 조정하면서 그래프의 변화를 관찰하고, 
                각 계수가 함수에 미치는 영향을 실시간으로 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">학습 목표</h3>
              <p className="text-sm text-gray-600">
                추상적인 수학 함수를 시각적으로 이해하고, 
                방정식과 그래프 사이의 관계를 명확하게 파악할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-lg">
            <p className="text-white text-sm">
              💡 팁: 애니메이션 버튼을 눌러 그래프의 동적 변화를 관찰해보세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal