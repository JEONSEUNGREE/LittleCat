import { useState } from 'react'
import { Trash2, Save, RefreshCw, Share2 } from 'lucide-react'
import useStoryStore from '../store/useStoryStore'

const StoryCanvas: React.FC = () => {
  const { currentStory, removeEmoji, clearCurrentStory, saveStory } = useStoryStore()
  const [title, setTitle] = useState('')
  const [storyText, setStoryText] = useState('')
  const [showSaveModal, setShowSaveModal] = useState(false)

  const generateStoryPrompt = () => {
    if (currentStory.length === 0) return ''
    
    const prompts = [
      '어느 날,',
      '그리고 나서',
      '갑자기',
      '그 순간',
      '결국',
      '마침내'
    ]
    
    return `${prompts[Math.floor(Math.random() * prompts.length)]} ${currentStory.join(' ')}...`
  }

  const handleSave = () => {
    if (title && currentStory.length > 0) {
      saveStory(title, storyText)
      setTitle('')
      setStoryText('')
      setShowSaveModal(false)
    }
  }

  const handleShare = () => {
    const shareText = `내가 만든 이모지 스토리: ${currentStory.join('')}\n\n${storyText}`
    if (navigator.share) {
      navigator.share({
        title: title || '이모지 스토리',
        text: shareText
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('클립보드에 복사되었습니다!')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">스토리 캔버스</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSaveModal(true)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled={currentStory.length === 0}
          >
            <Save size={20} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            disabled={currentStory.length === 0}
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={clearCurrentStory}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            disabled={currentStory.length === 0}
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 overflow-auto">
        {currentStory.length === 0 ? (
          <p className="text-gray-400 text-center">이모지를 선택하여 스토리를 시작하세요!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {currentStory.map((emoji, index) => (
              <div
                key={index}
                className="relative group animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-4xl sm:text-5xl cursor-pointer hover:scale-110 transition-transform">
                  {emoji}
                </span>
                <button
                  onClick={() => removeEmoji(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {currentStory.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600 italic">{generateStoryPrompt()}</p>
        </div>
      )}

      <div className="mt-auto">
        <textarea
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
          placeholder="이모지로 만든 스토리를 텍스트로 설명해보세요..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
        />
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">스토리 저장</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="스토리 제목을 입력하세요"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                저장
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default StoryCanvas