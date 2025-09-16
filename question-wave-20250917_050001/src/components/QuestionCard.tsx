import { Question } from '../store/questionStore'
import { HelpCircle, Tag } from 'lucide-react'

interface QuestionCardProps {
  question: Question
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 card-shadow transform transition-all hover:scale-102">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-float">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {question.category}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 leading-relaxed">
            {question.text}
          </h2>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(question.date).toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}