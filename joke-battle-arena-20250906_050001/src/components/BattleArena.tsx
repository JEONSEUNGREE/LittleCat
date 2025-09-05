import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { Swords, Timer, Send, ThumbsUp, Crown, AlertCircle } from 'lucide-react'

function BattleArena() {
  const { currentBattle, currentPlayer, startBattle, submitJoke, voteForJoke, endBattle } = useGameStore()
  const [jokeInput, setJokeInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (currentBattle?.status === 'active' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [currentBattle, timeLeft])

  useEffect(() => {
    if (currentBattle?.status === 'finished') {
      setShowResult(true)
      setTimeout(() => {
        endBattle()
        setShowResult(false)
      }, 5000)
    }
  }, [currentBattle?.status, endBattle])

  const handleStartBattle = () => {
    const opponent = {
      id: Date.now().toString(),
      name: `상대${Math.floor(Math.random() * 999)}`,
      avatar: '🤖',
      score: Math.floor(Math.random() * 2000),
      jokes: []
    }
    startBattle(opponent)
    setTimeLeft(30)
  }

  const handleSubmitJoke = () => {
    if (jokeInput.trim()) {
      submitJoke(jokeInput)
      setJokeInput('')
      setTimeLeft(30)
      
      // Simulate opponent joke
      if (currentBattle?.currentTurn === 'player2') {
        setTimeout(() => {
          const opponentJokes = [
            "왜 프로그래머는 어두운 테마를 좋아할까요? 라이트 모드는 버그를 못 찾거든요!",
            "개발자가 가장 좋아하는 음료는? Java!",
            "404 에러가 뭔지 아세요? 페이지가 집을 나간 거예요!",
            "Git이 뭔지 아세요? 개발자의 타임머신이죠!",
            "버그가 뭔지 아세요? 기능이라고 우기면 되는 거예요!"
          ]
          const randomJoke = opponentJokes[Math.floor(Math.random() * opponentJokes.length)]
          submitJoke(randomJoke)
        }, 2000)
      }
    }
  }

  const handleVote = (playerId: 'player1' | 'player2') => {
    voteForJoke(playerId)
  }

  if (!currentBattle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
        <div className="text-center">
          <Swords className="text-yellow-400 mx-auto mb-6 animate-pulse" size={80} />
          <h2 className="text-4xl font-bold mb-4">배틀 준비</h2>
          <p className="text-white/70 mb-8">상대를 찾아 농담 배틀을 시작하세요!</p>
          <button
            onClick={handleStartBattle}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            매칭 시작
          </button>
        </div>
        
        <div className="mt-12 bg-white/10 rounded-2xl p-6 max-w-md w-full">
          <h3 className="font-bold text-lg mb-4">📝 배틀 규칙</h3>
          <ul className="space-y-2 text-white/80">
            <li>• 각 라운드마다 30초 안에 농담 작성</li>
            <li>• 총 3라운드 진행</li>
            <li>• 관객 투표로 승자 결정</li>
            <li>• 승리 시 100포인트 획득</li>
          </ul>
        </div>
      </div>
    )
  }

  if (showResult) {
    const isWinner = currentBattle.winner === currentPlayer?.name
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
        <div className="text-center">
          {isWinner ? (
            <>
              <Crown className="text-yellow-400 mx-auto mb-4 animate-bounce" size={80} />
              <h2 className="text-4xl font-bold mb-4 text-yellow-400">승리!</h2>
              <p className="text-2xl mb-4">+100 포인트</p>
            </>
          ) : (
            <>
              <AlertCircle className="text-red-400 mx-auto mb-4" size={80} />
              <h2 className="text-4xl font-bold mb-4 text-red-400">패배</h2>
              <p className="text-xl mb-4">다음엔 더 재밌는 농담으로!</p>
            </>
          )}
          <p className="text-white/70">
            최종 점수: {currentBattle.votes.player1} - {currentBattle.votes.player2}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 animate-fadeIn">
      {/* Battle Header */}
      <div className="bg-white/10 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentBattle.player1.avatar}</span>
            <div>
              <p className="font-bold">{currentBattle.player1.name}</p>
              <p className="text-sm text-white/70">{currentBattle.player1.score} pts</p>
            </div>
          </div>
          
          <div className="text-center">
            <Swords className="text-yellow-400 mb-1" size={32} />
            <p className="text-sm font-bold">Round {currentBattle.roundNumber}/{currentBattle.maxRounds}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold">{currentBattle.player2.name}</p>
              <p className="text-sm text-white/70">{currentBattle.player2.score} pts</p>
            </div>
            <span className="text-3xl">{currentBattle.player2.avatar}</span>
          </div>
        </div>
        
        {/* Timer */}
        {currentBattle.status === 'active' && (
          <div className="bg-black/20 rounded-lg p-2 flex items-center justify-center gap-2">
            <Timer size={20} />
            <span className="font-mono text-lg">{timeLeft}s</span>
          </div>
        )}
      </div>

      {/* Jokes Display */}
      <div className="space-y-4 mb-6">
        {currentBattle.player1.jokes.map((joke, index) => (
          <div key={joke.id} className="space-y-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-2xl p-4 border border-blue-400/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currentBattle.player1.avatar}</span>
                <span className="font-bold">{currentBattle.player1.name}</span>
              </div>
              <p className="text-lg">{joke.text}</p>
            </div>
            
            {currentBattle.player2.jokes[index] && (
              <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-2xl p-4 border border-purple-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{currentBattle.player2.avatar}</span>
                  <span className="font-bold">{currentBattle.player2.name}</span>
                </div>
                <p className="text-lg">{currentBattle.player2.jokes[index].text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Area */}
      {currentBattle.status === 'active' && currentBattle.currentTurn === 'player1' && (
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-center mb-3 font-bold">당신의 차례입니다!</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={jokeInput}
              onChange={(e) => setJokeInput(e.target.value)}
              placeholder="재밌는 농담을 입력하세요..."
              className="flex-1 bg-black/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitJoke()}
            />
            <button
              onClick={handleSubmitJoke}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-3 rounded-lg hover:scale-105 transition-transform"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      )}

      {currentBattle.status === 'voting' && (
        <div className="bg-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-center mb-4">투표 시간! 🗳️</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleVote('player1')}
              className="bg-blue-600/30 hover:bg-blue-600/50 rounded-xl p-4 transition-all flex flex-col items-center gap-2"
            >
              <span className="text-3xl">{currentBattle.player1.avatar}</span>
              <span className="font-bold">{currentBattle.player1.name}</span>
              <div className="flex items-center gap-1">
                <ThumbsUp size={20} />
                <span>{currentBattle.votes.player1}</span>
              </div>
            </button>
            
            <button
              onClick={() => handleVote('player2')}
              className="bg-purple-600/30 hover:bg-purple-600/50 rounded-xl p-4 transition-all flex flex-col items-center gap-2"
            >
              <span className="text-3xl">{currentBattle.player2.avatar}</span>
              <span className="font-bold">{currentBattle.player2.name}</span>
              <div className="flex items-center gap-1">
                <ThumbsUp size={20} />
                <span>{currentBattle.votes.player2}</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BattleArena