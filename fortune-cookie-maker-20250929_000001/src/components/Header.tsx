import React from 'react'
import { Sparkles } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 mb-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-2">
          <Sparkles className="text-fortune-gold" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-fortune-dark">
            Fortune Cookie
          </h1>
          <Sparkles className="text-fortune-gold" size={32} />
        </div>
        <p className="text-gray-600 text-sm md:text-base">
          Discover your destiny with a tap
        </p>
      </div>
    </header>
  )
}