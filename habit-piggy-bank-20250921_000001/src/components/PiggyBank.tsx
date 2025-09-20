import React, { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

interface PiggyBankProps {
  totalSavings: number
  todaysSavings: number
}

const PiggyBank: React.FC<PiggyBankProps> = ({ totalSavings, todaysSavings }) => {
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (todaysSavings > 0) {
      setShake(true)
      const timer = setTimeout(() => setShake(false), 500)
      return () => clearTimeout(timer)
    }
  }, [todaysSavings])

  return (
    <div className="glass-card p-8 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center">
        <div className={`text-8xl mb-4 ${shake ? 'piggy-shake' : ''} inline-block`}>
          🐷
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">습관 저금통</h1>
        <p className="text-white/70 mb-6">나쁜 습관을 참으면 돈이 모여요!</p>
        
        <div className="flex justify-center items-center space-x-8">
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">총 저축액</p>
            <p className="text-4xl font-bold text-white">
              ₩{totalSavings.toLocaleString()}
            </p>
          </div>
          
          {todaysSavings > 0 && (
            <div className="text-center animate-bounce-slow">
              <p className="text-accent text-sm mb-1 flex items-center">
                <Sparkles size={16} className="mr-1" />
                오늘 저축
              </p>
              <p className="text-2xl font-bold text-accent">
                +₩{todaysSavings.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PiggyBank