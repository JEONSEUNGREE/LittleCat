import { Brain } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white/10 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-white" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            소비 심리 분석기
          </h1>
        </div>
        <p className="text-center text-white/80 text-sm mt-2">
          감정과 소비의 상관관계를 분석하세요
        </p>
      </div>
    </header>
  )
}
