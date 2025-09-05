import { usePatternStore } from '../store/patternStore'
import { BookOpen, Calculator, Lightbulb } from 'lucide-react'

const patternInfo = {
  fibonacci: {
    title: '피보나치 수열',
    description: '각 수가 앞의 두 수를 더한 값이 되는 수열입니다. 0, 1, 1, 2, 3, 5, 8, 13...',
    formula: 'F(n) = F(n-1) + F(n-2)',
    nature: '해바라기 씨, 소라껍질, 은하수 등에서 발견됩니다.',
    fact: '피보나치 수열의 비율은 황금비(1.618...)에 수렴합니다.'
  },
  fractal: {
    title: '프랙탈',
    description: '자기 유사성을 가진 기하학적 패턴으로, 작은 부분이 전체와 닮은 형태입니다.',
    formula: 'z(n+1) = z(n)² + c',
    nature: '나무, 구름, 해안선, 산맥 등에서 발견됩니다.',
    fact: '프랙탈의 차원은 정수가 아닌 소수가 될 수 있습니다.'
  },
  'golden-ratio': {
    title: '황금비',
    description: '약 1.618의 비율로, 가장 아름답다고 여겨지는 수학적 비율입니다.',
    formula: 'φ = (1 + √5) / 2 ≈ 1.618',
    nature: '꽃잎, 나선 껍질, 인체 비율 등에서 발견됩니다.',
    fact: '파르테논 신전, 모나리자 등 많은 예술 작품에 사용되었습니다.'
  },
  spiral: {
    title: '나선 패턴',
    description: '중심에서 바깥으로 회전하며 확장하는 곡선 패턴입니다.',
    formula: 'r = a × e^(b×θ)',
    nature: '은하, 태풍, 달팽이 껍질 등에서 발견됩니다.',
    fact: '로그 나선은 성장 패턴을 나타내는 자연의 기본 형태입니다.'
  },
  mandelbrot: {
    title: '만델브로트 집합',
    description: '복소수 평면에서 발산하지 않는 점들의 집합으로 이루어진 프랙탈입니다.',
    formula: 'z(n+1) = z(n)² + c, z(0) = 0',
    nature: '번개, 강의 분기, 혈관 구조 등과 유사합니다.',
    fact: '무한히 확대해도 계속 새로운 디테일이 나타납니다.'
  }
}

const InfoDisplay = () => {
  const { currentPattern } = usePatternStore()
  const info = patternInfo[currentPattern]

  return (
    <div className="info-card animate-float">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-semibold">{info.title}</h3>
          </div>
          <p className="text-sm text-gray-300">{info.description}</p>
        </div>

        {/* Formula & Nature */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400">
            <Calculator className="w-5 h-5" />
            <h4 className="font-semibold">수식</h4>
          </div>
          <code className="text-xs bg-black/30 px-2 py-1 rounded block">{info.formula}</code>
          <p className="text-sm text-gray-300 mt-2">{info.nature}</p>
        </div>

        {/* Fun Fact */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-yellow-400">
            <Lightbulb className="w-5 h-5" />
            <h4 className="font-semibold">재미있는 사실</h4>
          </div>
          <p className="text-sm text-gray-300">{info.fact}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoDisplay