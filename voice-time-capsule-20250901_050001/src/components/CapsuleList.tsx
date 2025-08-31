import React, { useState, useEffect } from 'react'
import { Play, Pause, Gift, Lock, Calendar, User, Clock } from 'lucide-react'
import useCapsuleStore from '../store/useCapsuleStore'

const CapsuleList: React.FC = () => {
  const { capsules, openCapsule, getAvailableCapsules } = useCapsuleStore()
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({})
  const [availableCapsules, setAvailableCapsules] = useState<string[]>([])

  useEffect(() => {
    const checkAvailable = () => {
      const available = getAvailableCapsules().map(c => c.id)
      setAvailableCapsules(available)
    }
    
    checkAvailable()
    const interval = setInterval(checkAvailable, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [capsules, getAvailableCapsules])

  const isAvailable = (capsule: any) => {
    return new Date(capsule.scheduledFor) <= new Date() || capsule.opened
  }

  const playAudio = (capsule: any) => {
    if (!capsule.opened && isAvailable(capsule)) {
      openCapsule(capsule.id)
    }

    if (!audioElements[capsule.id] && capsule.audioUrl) {
      const audio = new Audio(capsule.audioUrl)
      audio.onended = () => setPlayingId(null)
      setAudioElements(prev => ({ ...prev, [capsule.id]: audio }))
      audio.play()
      setPlayingId(capsule.id)
    } else if (audioElements[capsule.id]) {
      if (playingId === capsule.id) {
        audioElements[capsule.id].pause()
        setPlayingId(null)
      } else {
        // Stop other audio
        Object.values(audioElements).forEach(audio => audio.pause())
        audioElements[capsule.id].play()
        setPlayingId(capsule.id)
      }
    }
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeRemaining = (scheduledFor: Date) => {
    const now = new Date()
    const scheduled = new Date(scheduledFor)
    const diff = scheduled.getTime() - now.getTime()
    
    if (diff <= 0) return '열 수 있음'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}일 ${hours}시간 남음`
    return `${hours}시간 남음`
  }

  const sortedCapsules = [...capsules].sort((a, b) => {
    // Available capsules first
    const aAvailable = isAvailable(a)
    const bAvailable = isAvailable(b)
    if (aAvailable !== bAvailable) return aAvailable ? -1 : 1
    
    // Then by scheduled date
    return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
  })

  if (capsules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Gift size={48} className="mb-4 opacity-50" />
        <p className="text-lg">아직 타임캡슐이 없어요</p>
        <p className="text-sm mt-2">첫 번째 음성 메시지를 녹음해보세요!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-24">
      {sortedCapsules.map((capsule) => {
        const available = isAvailable(capsule)
        const isPlaying = playingId === capsule.id

        return (
          <div
            key={capsule.id}
            className={`bg-white rounded-2xl shadow-lg p-4 transition-all duration-300 ${
              available ? 'hover:shadow-xl' : 'opacity-75'
            } ${capsule.opened ? 'border-2 border-purple-200' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <User size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    To: {capsule.recipient}
                  </span>
                  {capsule.opened && (
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                      열어봄
                    </span>
                  )}
                </div>

                {capsule.message && (
                  <p className="text-gray-600 text-sm mb-3 italic">"{capsule.message}"</p>
                )}

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{formatDate(capsule.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{Math.floor(capsule.duration / 60)}:{(capsule.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="mt-2 text-sm">
                  {available ? (
                    <span className="text-green-600 font-medium">
                      {capsule.opened ? '열어본 캡슐' : '🎁 열 수 있어요!'}
                    </span>
                  ) : (
                    <span className="text-orange-500 font-medium">
                      🔒 {getTimeRemaining(capsule.scheduledFor)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => available && playAudio(capsule)}
                disabled={!available}
                className={`ml-4 p-3 rounded-full transition-all ${
                  available
                    ? isPlaying
                      ? 'bg-purple-500 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {available ? (
                  isPlaying ? <Pause size={20} /> : <Play size={20} />
                ) : (
                  <Lock size={20} />
                )}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}