import React from 'react'
import { Radio, Sparkles } from 'lucide-react'
import useCapsuleStore from '../store/useCapsuleStore'

const Header: React.FC = () => {
  const capsules = useCapsuleStore((state) => state.capsules)
  const availableCount = capsules.filter(c => new Date(c.scheduledFor) <= new Date() && !c.opened).length

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-b-3xl shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Radio size={28} className="animate-pulse" />
            <h1 className="text-2xl font-bold">Voice Time Capsule</h1>
          </div>
          <Sparkles size={24} className="animate-float" />
        </div>
        
        <p className="text-sm opacity-90">미래의 나에게 보내는 음성 메시지</p>
        
        <div className="mt-4 flex justify-between text-sm">
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
            전체 캡슐: {capsules.length}개
          </div>
          {availableCount > 0 && (
            <div className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full font-semibold animate-pulse">
              열 수 있는 캡슐: {availableCount}개
            </div>
          )}
        </div>
      </div>
    </header>
  )
}