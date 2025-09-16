import { useState, useEffect } from 'react'
import { useQuestionStore } from './store/questionStore'
import Header from './components/Header'
import QuestionCard from './components/QuestionCard'
import AnswerInput from './components/AnswerInput'
import AnswerList from './components/AnswerList'
import FloatingButton from './components/FloatingButton'
import './App.css'

function App() {
  const { 
    currentQuestion, 
    answers, 
    isAnonymous,
    fetchDailyQuestion,
    setAnonymous 
  } = useQuestionStore()
  
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    fetchDailyQuestion()
  }, [fetchDailyQuestion])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {currentQuestion && (
          <>
            <QuestionCard question={currentQuestion} />
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  답변하기
                </h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    익명 답변
                  </span>
                </label>
              </div>
              
              <AnswerInput questionId={currentQuestion.id} />
              
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transform transition-all hover:scale-105"
              >
                {showAnswers ? '답변 숨기기' : `다른 답변 보기 (${answers.length})`}
              </button>
              
              {showAnswers && <AnswerList answers={answers} />}
            </div>
          </>
        )}
      </main>
      
      <FloatingButton />
    </div>
  )
}