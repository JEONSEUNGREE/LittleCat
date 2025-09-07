import { QrCode, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <QrCode className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">QR Note Hub</h1>
              <p className="text-white/70 text-sm">빠른 QR 코드 생성기</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-300 animate-pulse-slow" size={24} />
            <span className="text-white/90 text-sm hidden sm:inline">v1.0</span>
          </div>
        </div>
      </div>
    </header>
  )
}