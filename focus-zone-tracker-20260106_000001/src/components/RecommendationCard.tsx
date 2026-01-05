import { Lightbulb, Sun, Moon, Coffee, Zap } from 'lucide-react';
import type { TimeSlot } from '../types';

interface RecommendationCardProps {
  slots: TimeSlot[];
  bestHours: number[];
}

export function RecommendationCard({ slots, bestHours }: RecommendationCardProps) {
  const getTimeOfDay = (hour: number) => {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const getRecommendation = () => {
    if (bestHours.length === 0) {
      return {
        icon: <Lightbulb className="text-focus-medium" size={24} />,
        title: '첫 세션을 시작해보세요!',
        description: '집중 세션을 기록하면 당신만의 최적 시간대를 찾아드려요.',
        tips: [
          '하루 중 가장 맑은 정신일 때 시작해보세요',
          '최소 25분 이상 집중해보세요',
          '집중 후 짧은 휴식을 취하세요',
        ],
      };
    }

    const dominantTime = getTimeOfDay(bestHours[0]);
    const morningCount = bestHours.filter((h) => getTimeOfDay(h) === 'morning').length;
    const afternoonCount = bestHours.filter((h) => getTimeOfDay(h) === 'afternoon').length;
    const eveningCount = bestHours.filter((h) => getTimeOfDay(h) === 'evening').length;

    if (morningCount >= afternoonCount && morningCount >= eveningCount) {
      return {
        icon: <Sun className="text-focus-high" size={24} />,
        title: '당신은 아침형 집중러!',
        description: '오전 시간대에 가장 높은 집중력을 보여주고 있어요.',
        tips: [
          '중요한 작업은 오전에 배치하세요',
          '아침 루틴을 일정하게 유지하세요',
          '오후에는 가벼운 작업을 진행하세요',
        ],
      };
    }

    if (afternoonCount >= morningCount && afternoonCount >= eveningCount) {
      return {
        icon: <Coffee className="text-focus-medium" size={24} />,
        title: '당신은 오후형 집중러!',
        description: '오후 시간대에 집중력이 피크에 달해요.',
        tips: [
          '점심 후 가벼운 산책으로 활력을 충전하세요',
          '핵심 업무는 오후에 집중하세요',
          '오전에는 미팅이나 소통 업무를 진행하세요',
        ],
      };
    }

    return {
      icon: <Moon className="text-primary-500" size={24} />,
      title: '당신은 저녁형 집중러!',
      description: '저녁 시간대에 창의력과 집중력이 높아져요.',
      tips: [
        '저녁에 딥워크 시간을 확보하세요',
        '수면 2시간 전에는 작업을 마무리하세요',
        '블루라이트 차단으로 수면 질을 유지하세요',
      ],
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="focus-card">
      <div className="flex items-center gap-3 mb-4">
        {recommendation.icon}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {recommendation.title}
          </h3>
          <p className="text-sm text-slate-500">{recommendation.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendation.tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
          >
            <Zap className="text-primary-400 mt-0.5 flex-shrink-0" size={16} />
            <span className="text-sm text-slate-600 dark:text-slate-300">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
