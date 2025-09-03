import { useState } from 'react'
import { Plus, Moon, Star, Heart, Info } from 'lucide-react'
import { WishWall } from './components/WishWall'
import { CreateWish } from './components/CreateWish'
import { useWishStore } from './store/wishStore'

function App() {
  const [showCreateWish, setShowCreateWish] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const { wishes, myWishes, starredWishes } = useWishStore()

  const stats = {
    totalWishes: wishes.length,
    myWishCount: myWishes.length,
    starredCount: starredWishes.length,
    totalStars: wishes.reduce((acc, wish) => acc + wish.stars, 0),
  }

  return (
    <div className="min-h-screen wish-gradient">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-400 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        <header className="glass-effect sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wish-purple to-wish-pink flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Secret Wish</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Moon className="w-4 h-4" />
                    <span>{stats.totalWishes} 소원</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{stats.totalStars} 별</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{stats.myWishCount} 내 소원</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Info className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {showInfo && (
          <div className="container mx-auto px-4 py-4">
            <div className="glass-effect rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Secret Wish란?</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                익명으로 소원을 공유하고 서로의 꿈을 응원하는 공간입니다. 
                당신의 소원을 적고, 다른 사람들의 소원에 별을 달아 응원해주세요. 
                모든 소원은 익명으로 공유되며, 서로의 꿈이 이루어지길 바라는 마음을 나눕니다.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">✨</div>
                  <div className="text-xs text-white/70">꿈</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">❤️</div>
                  <div className="text-xs text-white/70">사랑</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs text-white/70">성공</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🌱</div>
                  <div className="text-xs text-white/70">건강</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🕊️</div>
                  <div className="text-xs text-white/70">평화</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🌟</div>
                  <div className="text-xs text-white/70">기타</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="container mx-auto px-4 py-8">
          <WishWall />
        </main>

        <button
          onClick={() => setShowCreateWish(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-wish-purple to-wish-pink rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-30"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>

        {showCreateWish && (
          <CreateWish onClose={() => setShowCreateWish(false)} />
        )}
      </div>
    </div>
  )
}

export default App