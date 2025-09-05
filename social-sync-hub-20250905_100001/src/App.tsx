import React, { useState, useEffect } from 'react'
import { Plus, Home, Bell, User, TrendingUp } from 'lucide-react'
import { useSyncStore } from './store/useSyncStore'
import DecisionCard from './components/DecisionCard'
import VotingPanel from './components/VotingPanel'
import CreateDecision from './components/CreateDecision'

function App() {
  const { 
    currentUser, 
    decisions, 
    activeDecisionId,
    setCurrentUser,
    setActiveDecision,
    addDecision
  } = useSyncStore()
  
  const [showCreate, setShowCreate] = useState(false)
  const [activeTab, setActiveTab] = useState<'active' | 'trending' | 'my'>('active')

  useEffect(() => {
    // Initialize user if not set
    if (!currentUser) {
      const names = ['지민', '서연', '민준', '하윤', '도윤', '서준', '은우', '시우']
      const randomName = names[Math.floor(Math.random() * names.length)]
      const colors = ['#6B5B95', '#FF6F61', '#88D8B0', '#FFD662', '#6BA292']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      
      setCurrentUser({
        id: Date.now().toString(),
        name: randomName,
        avatar: randomColor,
        hasVoted: false
      })
    }

    // Add sample decisions if none exist
    if (decisions.length === 0 && currentUser) {
      const sampleDecisions = [
        {
          id: '1',
          title: '오늘 점심 뭐 먹을까요?',
          description: '회사 근처에서 점심 메뉴를 정해요! 다수결로 결정합니다.',
          options: [
            { id: 'opt1', text: '한식', votes: 5, voters: [], color: '#FF6F61' },
            { id: 'opt2', text: '중식', votes: 3, voters: [], color: '#88D8B0' },
            { id: 'opt3', text: '일식', votes: 7, voters: [], color: '#6B5B95' },
            { id: 'opt4', text: '양식', votes: 2, voters: [], color: '#FFD662' }
          ],
          createdBy: 'user1',
          createdAt: new Date(Date.now() - 3600000),
          expiresAt: new Date(Date.now() + 3600000),
          participants: [
            { id: 'user1', name: '민지', avatar: '#FF6F61', hasVoted: true },
            { id: 'user2', name: '준호', avatar: '#88D8B0', hasVoted: true },
            { id: 'user3', name: '수아', avatar: '#6B5B95', hasVoted: false },
            currentUser
          ],
          status: 'active'
        },
        {
          id: '2',
          title: '주말 모임 장소 투표',
          description: '토요일 오후 2시 모임 장소를 정해주세요',
          options: [
            { id: 'opt1', text: '강남역', votes: 8, voters: [], color: '#FF6F61' },
            { id: 'opt2', text: '홍대입구', votes: 12, voters: [], color: '#88D8B0' },
            { id: 'opt3', text: '성수동', votes: 6, voters: [], color: '#6B5B95' }
          ],
          createdBy: 'user2',
          createdAt: new Date(Date.now() - 7200000),
          expiresAt: new Date(Date.now() + 86400000),
          participants: [
            { id: 'user4', name: '지훈', avatar: '#FFD662', hasVoted: true },
            { id: 'user5', name: '예진', avatar: '#6BA292', hasVoted: true },
            currentUser
          ],
          status: 'active'
        },
        {
          id: '3',
          title: '팀 회식 날짜 정하기',
          description: '이번 달 회식 날짜를 투표로 정해봐요',
          options: [
            { id: 'opt1', text: '첫째주 금요일', votes: 4, voters: [], color: '#FF6F61' },
            { id: 'opt2', text: '둘째주 금요일', votes: 6, voters: [], color: '#88D8B0' },
            { id: 'opt3', text: '셋째주 금요일', votes: 3, voters: [], color: '#6B5B95' },
            { id: 'opt4', text: '넷째주 금요일', votes: 5, voters: [], color: '#FFD662' }
          ],
          createdBy: 'user3',
          createdAt: new Date(Date.now() - 10800000),
          expiresAt: new Date(Date.now() + 172800000),
          participants: [
            { id: 'user6', name: '태현', avatar: '#FF8A65', hasVoted: false },
            { id: 'user7', name: '나연', avatar: '#9CCC65', hasVoted: true },
            { id: 'user8', name: '승민', avatar: '#4FC3F7', hasVoted: true },
            currentUser
          ],
          status: 'active'
        }
      ]

      sampleDecisions.forEach(decision => addDecision(decision as any))
    }
  }, [currentUser, decisions.length, setCurrentUser, addDecision])

  const activeDecision = decisions.find(d => d.id === activeDecisionId)

  const getFilteredDecisions = () => {
    switch (activeTab) {
      case 'active':
        return decisions.filter(d => d.status === 'active')
      case 'trending':
        return [...decisions].sort((a, b) => b.participants.length - a.participants.length)
      case 'my':
        return decisions.filter(d => 
          currentUser && (d.createdBy === currentUser.id || d.participants.some(p => p.id === currentUser.id))
        )
      default:
        return decisions
    }
  }

  if (activeDecision) {
    return <VotingPanel decision={activeDecision} onBack={() => setActiveDecision(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sync-light to-white">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-sync-dark">Social Sync Hub</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-white/50 transition-colors relative">
              <Bell className="w-5 h-5 text-sync-dark" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-sync-secondary rounded-full" />
            </button>
            {currentUser && (
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: currentUser.avatar }}
              >
                {currentUser.name[0]}
              </div>
            )}
          </div>
        </header>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-xl p-1 flex">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'active' 
                  ? 'bg-sync-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              진행중
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'trending' 
                  ? 'bg-sync-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              인기
            </button>
            <button
              onClick={() => setActiveTab('my')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'my' 
                  ? 'bg-sync-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              내 결정
            </button>
          </div>
        </div>

        {/* Decision List */}
        <div className="px-4 pb-24">
          {getFilteredDecisions().length > 0 ? (
            getFilteredDecisions().map(decision => (
              <DecisionCard
                key={decision.id}
                decision={decision}
                onSelect={() => setActiveDecision(decision.id)}
                isActive={false}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500">아직 결정할 일이 없어요</p>
              <p className="text-sm text-gray-400 mt-2">새로운 결정을 만들어보세요!</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto px-4 py-2">
            <div className="flex items-center justify-around">
              <button className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Home className="w-6 h-6 text-sync-primary" />
              </button>
              <button className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <TrendingUp className="w-6 h-6 text-gray-400" />
              </button>
              <button 
                onClick={() => setShowCreate(true)}
                className="p-3 bg-sync-primary rounded-full text-white hover:bg-sync-secondary transition-colors shadow-lg"
              >
                <Plus className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-6 h-6 text-gray-400" />
              </button>
              <button className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <User className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCreate && <CreateDecision onClose={() => setShowCreate(false)} />}
    </div>
  )
}

export default App