import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { useStore, Emotion } from '../store/useStore'

const EMOTIONS: { value: Emotion; label: string; color: string }[] = [
  { value: 'happy', label: '😊 행복', color: 'bg-happy' },
  { value: 'neutral', label: '😐 평온', color: 'bg-neutral' },
  { value: 'sad', label: '😢 슬픔', color: 'bg-sad' },
  { value: 'angry', label: '😡 분노', color: 'bg-angry' },
  { value: 'stressed', label: '😰 스트레스', color: 'bg-stressed' },
]

const CATEGORIES = ['식비', '쇼핑', '문화', '교통', '건강', '기타']

export default function TransactionForm() {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('식비')
  const [emotion, setEmotion] = useState<Emotion>('neutral')
  const [description, setDescription] = useState('')
  const addTransaction = useStore((state) => state.addTransaction)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) return

    addTransaction({
      amount: parseFloat(amount),
      category,
      emotion,
      description,
    })

    setAmount('')
    setDescription('')
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-purple-600" />
        새로운 지출 기록
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              금액
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            지출 당시 감정
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {EMOTIONS.map((emo) => (
              <button
                key={emo.value}
                type="button"
                onClick={() => setEmotion(emo.value)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  emotion === emo.value
                    ? `${emo.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {emo.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            메모 (선택)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="무엇을 샀나요?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
        >
          기록하기
        </button>
      </form>
    </div>
  )
}
