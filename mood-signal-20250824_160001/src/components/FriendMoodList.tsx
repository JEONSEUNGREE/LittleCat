import React from 'react'
import { Clock, Heart, MessageCircle, TrendingUp, User } from 'lucide-react'
import { Friend, MoodEntry, MoodType } from '../store/useMoodStore'

interface FriendMoodListProps {
  friends: Friend[]
  friendMoods: MoodEntry[]
  onReaction: (entryId: string, reaction: string) => void
}

const moodColors: Record<MoodType, string> = {
  happy: 'bg-mood-happy',
  calm: 'bg-mood-calm',
  neutral: 'bg-mood-neutral',
  sad: 'bg-mood-sad',
  angry: 'bg-mood-angry',
  excited: 'bg-mood-excited',
  anxious: 'bg-mood-anxious',
  loved: 'bg-mood-loved',
}

const moodEmojis: Record<MoodType, string> = {
  happy: '😊',
  calm: '😌',
  neutral: '😐',
  sad: '😢',
  angry: '😠',
  excited: '🤩',
  anxious: '😰',
  loved: '🥰',
}

const reactions = ['❤️', '🤗', '💪', '🌟', '👍']

export const FriendMoodList: React.FC<FriendMoodListProps> = ({ friends, friendMoods, onReaction }) => {
  const [selectedTab, setSelectedTab] = React.useState<'friends' | 'timeline'>('friends')

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return '방금 전'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}분 전`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}시간 전`
    return `${Math.floor(hours / 24)}일 전`
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
      <div className="flex border-b border-white/20">
        <button
          onClick={() => setSelectedTab('friends')}
          className={`flex-1 py-3 px-4 font-medium transition-colors duration-200 ${
            selectedTab === 'friends' 
              ? 'bg-white/20 text-white' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          <User className="inline w-4 h-4 mr-2" />
          친구들
        </button>
        <button
          onClick={() => setSelectedTab('timeline')}
          className={`flex-1 py-3 px-4 font-medium transition-colors duration-200 ${
            selectedTab === 'timeline' 
              ? 'bg-white/20 text-white' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          <TrendingUp className="inline w-4 h-4 mr-2" />
          타임라인
        </button>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {selectedTab === 'friends' ? (
          <div className="space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${friend.currentMood ? moodColors[friend.currentMood] : 'bg-gray-400'} flex items-center justify-center text-xl`}>
                    {friend.currentMood ? moodEmojis[friend.currentMood] : '😶'}
                  </div>
                  <div>
                    <p className="text-white font-medium">{friend.name}</p>
                    <p className="text-white/60 text-sm flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {friend.lastUpdate ? getTimeAgo(friend.lastUpdate) : '오프라인'}
                    </p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {friendMoods.length === 0 ? (
              <p className="text-white/60 text-center py-8">아직 친구들의 기분 업데이트가 없어요</p>
            ) : (
              friendMoods.map((entry) => (
                <div key={entry.id} className="bg-white/10 rounded-lg p-4 space-y-3 animate-slide-up">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full ${moodColors[entry.mood]} flex items-center justify-center text-xl`}>
                        {moodEmojis[entry.mood]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{entry.userName}</p>
                        <p className="text-white/60 text-sm">{getTimeAgo(entry.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {entry.message && (
                    <p className="text-white/90 pl-13 flex items-start">
                      <MessageCircle className="w-4 h-4 mr-2 mt-0.5 text-white/60" />
                      {entry.message}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-2 pl-13">
                    {reactions.map((reaction) => (
                      <button
                        key={reaction}
                        onClick={() => onReaction(entry.id, reaction)}
                        className={`p-1.5 rounded-lg transition-all duration-200 ${
                          Object.values(entry.reactions).includes(reaction)
                            ? 'bg-white/30 scale-110'
                            : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                        }`}
                      >
                        <span className="text-lg">{reaction}</span>
                      </button>
                    ))}
                    {Object.keys(entry.reactions).length > 0 && (
                      <span className="text-white/60 text-sm ml-2">
                        {Object.keys(entry.reactions).length}명이 반응했어요
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}