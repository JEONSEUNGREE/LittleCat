import { Lock, QrCode } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <QrCode className="w-8 h-8 text-blue-500" />
              <Lock className="w-4 h-4 text-yellow-400 absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">QR Secret Notes</h1>
              <p className="text-xs text-slate-400">Your private message vault</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Secure • Private • Encrypted
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}