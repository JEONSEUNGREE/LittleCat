import { RefreshCw } from 'lucide-react'
import { useQuestionStore } from '../store/questionStore'

export default function FloatingButton() {
  const { fetchDailyQuestion } = useQuestionStore()
  
  return (
    <button
      onClick={fetchDailyQuestion}
      className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transform transition-all hover:scale-110 active:scale-95"
      title="새로운 질문 가져오기"
    >
      <RefreshCw className="w-6 h-6" />
    </button>
  )
}