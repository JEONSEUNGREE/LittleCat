import { Sparkles, Zap, Users, Trophy, ArrowRight } from 'lucide-react'

interface HomePageProps {
  onNavigate: (page: 'home' | 'battle' | 'leaderboard' | 'profile') => void
}

function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    { icon: Zap, title: '실시간 배틀', desc: '전 세계 유저와 농담 대결' },
    { icon: Users, title: '투표 시스템', desc: '관객이 승자를 결정' },
    { icon: Trophy, title: '랭킹 시스템', desc: '최고의 코미디언이 되어보세요' },
    { icon: Sparkles, title: '일일 챌린지', desc: '매일 새로운 테마로 도전' },
  ]

  return (
    <div className="animate-fadeIn pb-20">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-5xl font-bold mb-4 animate-bounce-slow">
          🎪 웃음 배틀의 세계로!
        </h2>
        <p className="text-xl text-white/80 mb-8">
          당신의 유머 센스로 전 세계를 웃겨보세요
        </p>
        
        <button
          onClick={() => onNavigate('battle')}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
        >
          배틀 시작하기
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4 mt-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon className="text-yellow-400 mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Daily Challenge Card */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">오늘의 챌린지 🎯</h3>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            24:00:00 남음
          </span>
        </div>
        <p className="text-lg mb-4">테마: "아재개그 배틀"</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-white/80">참가자</p>
            <p className="text-2xl font-bold">1,234명</p>
          </div>
          <div>
            <p className="text-sm text-white/80">상금</p>
            <p className="text-2xl font-bold">🏆 500pts</p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-all">
            참가하기
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">5,432</p>
          <p className="text-sm text-white/70">활성 유저</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">123</p>
          <p className="text-sm text-white/70">진행중 배틀</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-400">98.7K</p>
          <p className="text-sm text-white/70">오늘의 웃음</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage