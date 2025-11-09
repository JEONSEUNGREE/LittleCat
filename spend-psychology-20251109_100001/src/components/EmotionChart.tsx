import { useStore } from '../store/useStore'

const EMOTIONS = [
  { value: 'happy' as const, label: '😊 행복', color: 'bg-happy' },
  { value: 'neutral' as const, label: '😐 평온', color: 'bg-neutral' },
  { value: 'sad' as const, label: '😢 슬픔', color: 'bg-sad' },
  { value: 'angry' as const, label: '😡 분노', color: 'bg-angry' },
  { value: 'stressed' as const, label: '😰 스트레스', color: 'bg-stressed' },
]

export default function EmotionChart() {
  const getEmotionTotal = useStore((state) => state.getEmotionTotal)

  const emotionData = EMOTIONS.map((emotion) => ({
    ...emotion,
    total: getEmotionTotal(emotion.value),
  }))

  const maxTotal = Math.max(...emotionData.map((d) => d.total), 1)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        감정별 지출 분석
      </h2>

      <div className="space-y-4">
        {emotionData.map((emotion) => {
          const percentage = (emotion.total / maxTotal) * 100

          return (
            <div key={emotion.value}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  {emotion.label}
                </span>
                <span className="font-bold text-gray-900">
                  ₩{emotion.total.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`${emotion.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {emotionData.some((e) => e.total > 0) && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 심리 분석:</strong>{' '}
            {emotionData[0].total > emotionData[4].total
              ? '긍정적인 감정에서 더 많이 지출하고 있어요. 행복한 소비를 하고 계시네요!'
              : '스트레스나 부정적 감정에서 지출이 많습니다. 감정 소비를 줄여보세요.'}
          </p>
        </div>
      )}
    </div>
  )
}
