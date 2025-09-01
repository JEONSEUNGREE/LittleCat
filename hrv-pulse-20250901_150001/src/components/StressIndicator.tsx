import { AlertTriangle, Smile, Meh } from 'lucide-react'

interface StressIndicatorProps {
  stressLevel: 'low' | 'medium' | 'high'
}

export default function StressIndicator({ stressLevel }: StressIndicatorProps) {
  const getStressInfo = () => {
    switch (stressLevel) {
      case 'low':
        return {
          icon: <Smile className="w-16 h-16 text-green-500" />,
          color: 'from-green-400 to-green-600',
          bgColor: 'bg-green-50',
          text: '낮음',
          description: '당신의 자율신경계는 균형 잡힌 상태입니다. 현재 상태를 유지하세요!',
          tips: [
            '현재의 건강한 습관을 계속 유지하세요',
            '가벼운 운동이나 산책을 즐기기 좋은 상태입니다',
            '창의적인 활동이나 학습에 적합한 시간입니다'
          ]
        }
      case 'medium':
        return {
          icon: <Meh className="w-16 h-16 text-yellow-500" />,
          color: 'from-yellow-400 to-yellow-600',
          bgColor: 'bg-yellow-50',
          text: '보통',
          description: '약간의 스트레스가 감지됩니다. 휴식과 이완이 필요할 수 있습니다.',
          tips: [
            '5분간 심호흡 운동을 해보세요',
            '짧은 휴식이나 스트레칭이 도움이 됩니다',
            '물을 충분히 마시고 잠시 눈을 감고 쉬어보세요'
          ]
        }
      case 'high':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-red-500" />,
          color: 'from-red-400 to-red-600',
          bgColor: 'bg-red-50',
          text: '높음',
          description: '높은 스트레스 수준이 감지됩니다. 즉시 휴식과 이완이 필요합니다.',
          tips: [
            '10분 이상 깊은 호흡과 명상을 시도해보세요',
            '가능하다면 잠시 산책을 나가보세요',
            '충분한 수면과 휴식을 취하는 것이 중요합니다'
          ]
        }
    }
  }

  const info = getStressInfo()

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">스트레스 수준</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          stressLevel === 'low' ? 'bg-green-100 text-green-700' :
          stressLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {info.text}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center mb-6 animate-float`}>
          {info.icon}
        </div>

        <p className="text-gray-600 text-center mb-6">
          {info.description}
        </p>

        <div className={`w-full ${info.bgColor} rounded-lg p-4`}>
          <h3 className="font-semibold text-gray-700 mb-3">권장 활동</h3>
          <ul className="space-y-2">
            {info.tips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-sm text-gray-600">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 w-full">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>스트레스 지수</span>
            <span>{stressLevel === 'low' ? '20%' : stressLevel === 'medium' ? '60%' : '85%'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full bg-gradient-to-r ${info.color} transition-all duration-500`}
              style={{ 
                width: stressLevel === 'low' ? '20%' : stressLevel === 'medium' ? '60%' : '85%' 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}