import { Answer } from '../store/questionStore'
import { useQuestionStore } from '../store/questionStore'
import { Heart, User, UserX, Clock } from 'lucide-react'

interface AnswerListProps {
  answers: Answer[]
}

export default function AnswerList({ answers }: AnswerListProps) {
  const { likeAnswer } = useQuestionStore()
  
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}일 전`
    if (hours > 0) return `${hours}시간 전`
    if (minutes > 0) return `${minutes}분 전`
    return '방금 전'
  }
  
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        모든 답변 ({answers.length})
      </h3>
      
      {answers.map((answer) => (
        <div
          key={answer.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${answer.isAnonymous ? 'bg-gray-200 dark:bg-gray-700' : 'bg-purple-100 dark:bg-purple-900'}`}>
              {answer.isAnonymous ? (
                <UserX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {answer.author}
                </span>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(answer.timestamp)}</span>
                </div>
              </div>
              
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {answer.text}
              </p>
              
              <button
                onClick={() => likeAnswer(answer.id)}
                className="mt-3 flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>{answer.likes}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {answers.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          아직 답변이 없습니다. 첫 번째 답변을 남겨보세요!
        </div>
      )}
    </div>
  )
}