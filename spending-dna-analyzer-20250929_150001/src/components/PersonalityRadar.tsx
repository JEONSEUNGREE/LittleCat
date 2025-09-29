import { useEffect } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';

const PersonalityRadar: React.FC = () => {
  const { personalityTraits, calculatePersonalityTraits } = useStore();

  useEffect(() => {
    calculatePersonalityTraits();
  }, [calculatePersonalityTraits]);

  if (!personalityTraits) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
            <p className="text-gray-600">성격 분석 중...</p>
          </div>
        </div>
      </div>
    );
  }

  const traits = [
    { name: '충동성', value: personalityTraits.impulsiveness, color: 'from-red-400 to-pink-500' },
    { name: '계획성', value: personalityTraits.planning, color: 'from-blue-400 to-indigo-500' },
    { name: '절약성', value: personalityTraits.frugality, color: 'from-green-400 to-teal-500' },
    { name: '투자성향', value: personalityTraits.investment, color: 'from-yellow-400 to-orange-500' },
    { name: '관대함', value: personalityTraits.generosity, color: 'from-purple-400 to-pink-500' },
  ];

  const getPersonalityDescription = () => {
    const dominant = traits.reduce((prev, current) => 
      prev.value > current.value ? prev : current
    );

    const descriptions: Record<string, string> = {
      '충동성': '순간의 감정에 따라 소비하는 경향이 있습니다. 계획적인 소비 습관을 기르면 좋겠네요!',
      '계획성': '체계적으로 재정을 관리하는 타입입니다. 미래를 위한 준비가 잘 되어있어요!',
      '절약성': '알뜰한 소비 습관을 가지고 있습니다. 저축왕이 될 수 있는 잠재력이 있어요!',
      '투자성향': '미래 가치를 중시하는 투자형 인재입니다. 리스크 관리도 함께 고려해보세요!',
      '관대함': '나눔의 미덕을 아는 따뜻한 마음의 소유자입니다. 자신을 위한 투자도 잊지 마세요!',
    };

    return descriptions[dominant.name] || '균형잡힌 소비 성향을 가지고 있습니다.';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">소비 성격 분석</h3>
        <Sparkles className="w-5 h-5 text-yellow-500" />
      </div>

      <div className="space-y-4 mb-6">
        {traits.map((trait) => (
          <div key={trait.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{trait.name}</span>
              <span className="text-sm font-bold text-gray-900">{trait.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${trait.color} transition-all duration-700 ease-out`}
                style={{ width: `${trait.value}%` }}
              >
                <div className="h-full bg-white bg-opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold text-purple-700">💡 AI 분석 결과:</span> {getPersonalityDescription()}
        </p>
      </div>

      {/* Personality Badge */}
      <div className="mt-4 flex flex-wrap gap-2">
        {traits.filter(t => t.value > 60).map((trait) => (
          <span
            key={trait.name}
            className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold rounded-full"
          >
            {trait.name} 강함
          </span>
        ))}
      </div>
    </div>
  );
};

export default PersonalityRadar;