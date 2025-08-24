import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, RotateCw, Check, X } from 'lucide-react'
import useMemoryStore from '../store/memoryStore'

const CardDisplay: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null)
  const [beatIndex, setBeatIndex] = useState(0)
  
  const {
    getFilteredCards,
    currentCardIndex,
    isPlaying,
    currentBPM,
    setPlaying,
    nextCard,
    markCardAsCorrect,
    markCardAsIncorrect
  } = useMemoryStore()
  
  const cards = getFilteredCards()
  const currentCard = cards[currentCardIndex]
  
  useEffect(() => {
    if (!isPlaying || !currentCard) return
    
    const interval = setInterval(() => {
      setBeatIndex((prev) => (prev + 1) % currentCard.rhythm.length)
    }, (60 / currentBPM) * 1000)
    
    return () => clearInterval(interval)
  }, [isPlaying, currentBPM, currentCard])
  
  useEffect(() => {
    if (isPlaying && currentCard) {
      const beat = currentCard.rhythm[beatIndex]
      if (beat === 1) {
        // 비트 사운드 재생 (Web Audio API 사용 가능)
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 440
        oscillator.type = 'sine'
        gainNode.gain.value = 0.1
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.05)
      }
    }
  }, [beatIndex, isPlaying, currentCard])
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  
  const handleAnswer = (correct: boolean) => {
    if (!currentCard) return
    
    setShowResult(correct ? 'correct' : 'incorrect')
    
    if (correct) {
      markCardAsCorrect(currentCard.id)
    } else {
      markCardAsIncorrect(currentCard.id)
    }
    
    setTimeout(() => {
      setShowResult(null)
      setIsFlipped(false)
      nextCard()
    }, 1500)
  }
  
  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/10 backdrop-blur-lg rounded-2xl">
        <p className="text-white text-lg">카드를 추가해주세요!</p>
      </div>
    )
  }
  
  return (
    <div className="relative">
      {/* 리듬 비주얼라이저 */}
      <div className="flex justify-center gap-2 mb-6">
        {currentCard.rhythm.map((beat, index) => (
          <div
            key={index}
            className={`w-3 h-16 rounded-full transition-all duration-200 ${
              beat === 1 ? 'bg-white' : 'bg-white/20'
            } ${
              isPlaying && index === beatIndex
                ? 'scale-125 shadow-lg shadow-white/50'
                : ''
            }`}
            style={{
              transform: isPlaying && index === beatIndex ? 'scaleY(1.5)' : 'scaleY(1)',
            }}
          />
        ))}
      </div>
      
      {/* 카드 */}
      <div className="relative h-64 mb-6">
        <div
          className={`absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer transition-all duration-600 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onClick={handleFlip}
        >
          {/* 앞면 */}
          <div
            className={`absolute inset-0 p-8 flex flex-col items-center justify-center ${
              isFlipped ? 'invisible' : ''
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-white text-2xl font-bold text-center">
              {currentCard.front}
            </p>
            <p className="text-white/60 text-sm mt-4">탭하여 답 확인</p>
          </div>
          
          {/* 뒷면 */}
          <div
            className={`absolute inset-0 p-8 flex flex-col items-center justify-center ${
              !isFlipped ? 'invisible' : ''
            }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className="text-white text-3xl font-bold text-center">
              {currentCard.back}
            </p>
          </div>
        </div>
        
        {/* 결과 오버레이 */}
        {showResult && (
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-2xl animate-fade-in ${
              showResult === 'correct'
                ? 'bg-green-500/20 backdrop-blur-sm'
                : 'bg-red-500/20 backdrop-blur-sm'
            }`}
          >
            {showResult === 'correct' ? (
              <Check className="w-24 h-24 text-green-400" />
            ) : (
              <X className="w-24 h-24 text-red-400" />
            )}
          </div>
        )}
      </div>
      
      {/* 컨트롤 버튼 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPlaying(!isPlaying)}
          className="p-4 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors"
        >
          {isPlaying ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
        
        {isFlipped && (
          <>
            <button
              onClick={() => handleAnswer(false)}
              className="px-6 py-3 bg-red-500/80 backdrop-blur-lg rounded-full hover:bg-red-500 transition-colors text-white font-medium"
            >
              틀렸어요
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="px-6 py-3 bg-green-500/80 backdrop-blur-lg rounded-full hover:bg-green-500 transition-colors text-white font-medium"
            >
              맞았어요
            </button>
          </>
        )}
        
        {!isFlipped && (
          <button
            onClick={() => {
              setIsFlipped(false)
              nextCard()
            }}
            className="p-4 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors"
          >
            <RotateCw className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
      
      {/* 진행 상황 */}
      <div className="mt-6 text-center">
        <p className="text-white/80">
          {currentCardIndex + 1} / {cards.length}
        </p>
        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{
              width: `${((currentCardIndex + 1) / cards.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CardDisplay