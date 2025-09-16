import { useState } from 'react'
import { useQuestionStore } from '../store/questionStore'
import { Send } from 'lucide-react'

interface AnswerInputProps {
  questionId: string
}

export default function AnswerInput({ questionId }: AnswerInputProps) {
  const [text, setText] = useState('')
  const { addAnswer, isAnonymous } = useQuestionStore()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addAnswer(text)
      setText('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isAnonymous ? "익명으로 답변을 남겨보세요..." : "당신의 생각을 공유해주세요..."}
          className="w-full p-4 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
          rows={3}
          maxLength={500}
        />
        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
          {text.length}/500
        </span>
      </div>
      
      <button
        type="submit"
        disabled={!text.trim()}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105 disabled:hover:scale-100"
      >
        <Send className="w-5 h-5" />
        <span>답변 보내기</span>
      </button>
    </form>
  )
}