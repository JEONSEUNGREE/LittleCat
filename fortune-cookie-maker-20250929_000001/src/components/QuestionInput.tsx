import React, { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { useFortuneStore } from '../store/useFortuneStore'

export const QuestionInput: React.FC = () => {
  const { userQuestion, setUserQuestion, isCracked } = useFortuneStore()
  const [localQuestion, setLocalQuestion] = useState(userQuestion)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localQuestion.trim()) {
      setUserQuestion(localQuestion)
    }
  }
  
  if (isCracked) return null
  
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-2">
          <label htmlFor="question" className="text-fortune-dark font-medium flex items-center justify-center gap-2">
            <MessageCircle size={18} />
            Ask your question (optional)
          </label>
        </div>
        
        <div className="relative">
          <input
            type="text"
            id="question"
            value={localQuestion}
            onChange={(e) => setLocalQuestion(e.target.value)}
            placeholder="What does the future hold for me?"
            className="w-full px-4 py-3 pr-12 rounded-full border-2 border-fortune-gold focus:border-fortune-red focus:outline-none text-fortune-dark placeholder-gray-400"
            maxLength={100}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-fortune-gold hover:text-fortune-red transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        
        <p className="text-center text-xs text-gray-500">
          Your question helps personalize your fortune
        </p>
      </form>
    </div>
  )
}