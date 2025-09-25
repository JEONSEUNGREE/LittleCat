import React from 'react'
import { Trash2, Play, Clock } from 'lucide-react'
import useStoryStore from '../store/useStoryStore'

const SavedStories: React.FC = () => {
  const { stories, deleteStory, loadStory } = useStoryStore()

  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full overflow-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-800">저장된 스토리</h3>
      
      {stories.length === 0 ? (
        <p className="text-gray-400 text-center py-8">아직 저장된 스토리가 없습니다</p>
      ) : (
        <div className="space-y-3">
          {stories.map((story) => (
            <div
              key={story.id}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{story.title}</h4>
                <div className="flex gap-1">
                  <button
                    onClick={() => loadStory(story.id)}
                    className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                    title="불러오기"
                  >
                    <Play size={16} />
                  </button>
                  <button
                    onClick={() => deleteStory(story.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    title="삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {story.emojis.map((emoji, index) => (
                  <span key={index} className="text-xl">
                    {emoji}
                  </span>
                ))}
              </div>
              
              {story.text && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {story.text}
                </p>
              )}
              
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} />
                <span>{formatDate(story.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedStories