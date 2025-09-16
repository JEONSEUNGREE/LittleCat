import { create } from 'zustand'

export interface Question {
  id: string
  text: string
  category: string
  date: string
}

export interface Answer {
  id: string
  questionId: string
  text: string
  author: string
  isAnonymous: boolean
  timestamp: Date
  likes: number
}

interface QuestionStore {
  currentQuestion: Question | null
  answers: Answer[]
  isAnonymous: boolean
  fetchDailyQuestion: () => void
  addAnswer: (text: string) => void
  setAnonymous: (value: boolean) => void
  likeAnswer: (answerId: string) => void
}

const dailyQuestions = [
  { text: "오늘 가장 감사했던 순간은 언제였나요?", category: "감사" },
  { text: "최근에 새로 도전해보고 싶은 것이 있나요?", category: "도전" },
  { text: "오늘 누군가에게 들려주고 싶은 이야기가 있나요?", category: "소통" },
  { text: "가장 행복했던 어린 시절 기억은 무엇인가요?", category: "추억" },
  { text: "만약 하루만 다른 사람이 될 수 있다면 누가 되고 싶나요?", category: "상상" },
  { text: "최근에 읽은 책이나 본 영화 중 추천하고 싶은 것은?", category: "문화" },
  { text: "오늘 하루를 색깔로 표현한다면 무슨 색일까요?", category: "감정" },
  { text: "가장 최근에 웃었던 일은 무엇인가요?", category: "일상" },
  { text: "미래의 나에게 하고 싶은 말이 있다면?", category: "미래" },
  { text: "오늘 배운 작은 교훈이 있다면 무엇인가요?", category: "성장" }
]

const mockAnswers = [
  { text: "아침에 따뜻한 커피를 마실 때 정말 감사했어요", author: "User1", isAnonymous: false },
  { text: "가족과 함께 저녁을 먹을 수 있어서 감사했습니다", author: "Anonymous", isAnonymous: true },
  { text: "오늘 날씨가 정말 좋아서 산책하며 감사함을 느꼈어요", author: "User2", isAnonymous: false }
]

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  currentQuestion: null,
  answers: [],
  isAnonymous: false,
  
  fetchDailyQuestion: () => {
    const today = new Date()
    const dayIndex = today.getDate() % dailyQuestions.length
    const question = dailyQuestions[dayIndex]
    
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: question.text,
      category: question.category,
      date: today.toISOString().split('T')[0]
    }
    
    const mockAnswersList = mockAnswers.map((answer, idx) => ({
      id: `a-${idx}`,
      questionId: newQuestion.id,
      text: answer.text,
      author: answer.author,
      isAnonymous: answer.isAnonymous,
      timestamp: new Date(Date.now() - Math.random() * 86400000),
      likes: Math.floor(Math.random() * 50)
    }))
    
    set({ 
      currentQuestion: newQuestion,
      answers: mockAnswersList
    })
  },
  
  addAnswer: (text: string) => {
    const { currentQuestion, isAnonymous, answers } = get()
    if (!currentQuestion || !text.trim()) return
    
    const newAnswer: Answer = {
      id: `a-${Date.now()}`,
      questionId: currentQuestion.id,
      text: text.trim(),
      author: isAnonymous ? 'Anonymous' : `User${Math.floor(Math.random() * 1000)}`,
      isAnonymous,
      timestamp: new Date(),
      likes: 0
    }
    
    set({ answers: [newAnswer, ...answers] })
  },
  
  setAnonymous: (value: boolean) => {
    set({ isAnonymous: value })
  },
  
  likeAnswer: (answerId: string) => {
    set(state => ({
      answers: state.answers.map(answer =>
        answer.id === answerId
          ? { ...answer, likes: answer.likes + 1 }
          : answer
      )
    }))
  }
}))