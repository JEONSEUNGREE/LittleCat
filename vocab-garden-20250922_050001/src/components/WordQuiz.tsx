import { useState, useEffect } from 'react'
import { BookOpen, Check, X, RefreshCw } from 'lucide-react'
import { useGardenStore, Word } from '../store/useGardenStore'

const WordQuiz: React.FC = () => {
  const { words, studyWord } = useGardenStore()
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const selectRandomWord = () => {
    const unlearnedWords = words.filter(w => !w.learned)
    const targetWords = unlearnedWords.length > 0 ? unlearnedWords : words
    const randomIndex = Math.floor(Math.random() * targetWords.length)
    return targetWords[randomIndex]
  }

  const generateOptions = (correctWord: Word) => {
    const allMeanings = words.map(w => w.meaning)
    const wrongMeanings = allMeanings.filter(m => m !== correctWord.meaning)
    const shuffled = wrongMeanings.sort(() => Math.random() - 0.5)
    const selectedWrong = shuffled.slice(0, 3)
    const allOptions = [...selectedWrong, correctWord.meaning]
    return allOptions.sort(() => Math.random() - 0.5)
  }

  const startNewQuiz = () => {
    const word = selectRandomWord()
    if (word) {
      setCurrentWord(word)
      setOptions(generateOptions(word))
      setShowAnswer(false)
      setSelectedAnswer(null)
      setIsCorrect(null)
    }
  }

  const handleAnswer = (answer: string) => {
    if (!currentWord || showAnswer) return
    
    setSelectedAnswer(answer)
    const correct = answer === currentWord.meaning
    setIsCorrect(correct)
    setShowAnswer(true)
    
    studyWord(currentWord.id, correct)
  }

  useEffect(() => {
    startNewQuiz()
  }, [])

  if (!currentWord) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <p className="text-gray-500">퀴즈를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          단어 퀴즈
        </h2>
        <button
          onClick={startNewQuiz}
          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <RefreshCw className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      <div className="mb-8 text-center">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {currentWord.word}
        </p>
        {currentWord.level > 0 && (
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < currentWord.level ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isThisCorrect = option === currentWord.meaning
          const isSelected = option === selectedAnswer
          
          let bgColor = 'bg-gray-50 hover:bg-gray-100'
          if (showAnswer) {
            if (isThisCorrect) {
              bgColor = 'bg-green-100 border-green-400'
            } else if (isSelected && !isCorrect) {
              bgColor = 'bg-red-100 border-red-400'
            }
          } else if (isSelected) {
            bgColor = 'bg-blue-100 border-blue-400'
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showAnswer}
              className={`p-4 rounded-lg border-2 ${bgColor} transition-all duration-300 text-left flex items-center justify-between`}
            >
              <span className="text-base md:text-lg font-medium text-gray-700">
                {option}
              </span>
              {showAnswer && isThisCorrect && (
                <Check className="w-5 h-5 text-green-600" />
              )}
              {showAnswer && isSelected && !isCorrect && (
                <X className="w-5 h-5 text-red-600" />
              )}
            </button>
          )
        })}
      </div>

      {showAnswer && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`text-center font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '정답입니다! 🌱' : '다시 시도해보세요!'}
          </p>
        </div>
      )}

      <button
        onClick={startNewQuiz}
        className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        다음 단어
      </button>
    </div>
  )
}

export default WordQuiz