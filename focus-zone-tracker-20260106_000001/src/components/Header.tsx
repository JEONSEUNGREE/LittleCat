import { Focus, Calendar } from 'lucide-react';

interface HeaderProps {
  todaySessionCount: number;
}

export function Header({ todaySessionCount }: HeaderProps) {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Focus size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Focus Zone</h1>
            <p className="text-primary-100 text-sm">집중 구역 추적기</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-100">
          <Calendar size={16} />
          <span className="text-sm">{today}</span>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full">
          <span className="text-sm font-medium">
            오늘 {todaySessionCount}세션
          </span>
        </div>
      </div>
    </header>
  );
}
