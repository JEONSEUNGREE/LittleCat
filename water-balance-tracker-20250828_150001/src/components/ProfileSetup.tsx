import { useState } from 'react'
import { User, Activity, ArrowRight } from 'lucide-react'
import { useWaterStore } from '../store/useWaterStore'

export const ProfileSetup: React.FC = () => {
  const setProfile = useWaterStore((state) => state.setProfile)
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && weight) {
      setProfile({
        name,
        weight: Number(weight),
        activityLevel
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full animate-drop">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-water-light to-water-dark rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">프로필 설정</h1>
          <p className="text-gray-600">맞춤형 수분 섭취량을 계산해드려요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-water-blue focus:border-transparent transition-all"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              체중 (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-water-blue focus:border-transparent transition-all"
              placeholder="체중을 입력하세요"
              min="30"
              max="200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Activity className="inline w-4 h-4 mr-1" />
              활동량
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'moderate', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setActivityLevel(level)}
                  className={`py-2 px-3 rounded-lg font-medium transition-all ${
                    activityLevel === level
                      ? 'bg-water-blue text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level === 'low' ? '낮음' : level === 'moderate' ? '보통' : '높음'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-water-blue to-water-dark text-white font-bold py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            시작하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}