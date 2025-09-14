import { Home, Trophy, Users, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: 'today' | 'challenges' | 'friends' | 'stats';
  onTabChange: (tab: 'today' | 'challenges' | 'friends' | 'stats') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'today' as const, label: '오늘', icon: Home },
    { id: 'challenges' as const, label: '챌린지', icon: Trophy },
    { id: 'friends' as const, label: '친구', icon: Users },
    { id: 'stats' as const, label: '통계', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-40">
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-1 py-3 px-2 transition-all"
              >
                <Icon
                  size={22}
                  className={`transition-colors ${
                    isActive ? 'text-primary-500' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-primary-500' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}