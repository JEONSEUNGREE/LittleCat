import React, { useState, useEffect } from 'react'
import { Plus, Sparkles, Filter, RefreshCw } from 'lucide-react'
import { useQuestStore, Quest } from './store/questStore'
import PlayerStats from './components/PlayerStats'
import QuestCard from './components/QuestCard'
import AddQuestForm from './components/AddQuestForm'

function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterCategory, setFilterCategory] = useState<'all' | Quest['category']>('all')
  const [showCompleted, setShowCompleted] = useState(false)
  
  const { quests, addQuest, completeQuest, deleteQuest, resetDailyQuests, checkStreak } = useQuestStore()

  useEffect(() => {
    checkStreak()
    // Check if it's a new day and reset daily quests
    const checkDailyReset = () => {
      const lastReset = localStorage.getItem('lastDailyReset')
      const today = new Date().toISOString().split('T')[0]
      
      if (lastReset !== today) {
        resetDailyQuests()
        localStorage.setItem('lastDailyReset', today)
      }
    }
    
    checkDailyReset()
  }, [checkStreak, resetDailyQuests])

  const filteredQuests = quests.filter(quest => {
    const categoryMatch = filterCategory === 'all' || quest.category === filterCategory
    const completedMatch = showCompleted || !quest.completed
    return categoryMatch && completedMatch
  })

  const activeQuests = filteredQuests.filter(q => !q.completed)
  const completedQuests = filteredQuests.filter(q => q.completed)

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-quest-gold" />
            <h1 className="text-4xl font-bold text-white">Daily Quest Tracker</h1>
            <Sparkles className="w-8 h-8 text-quest-gold" />
          </div>
          <p className="text-quest-light/80">Transform your tasks into epic adventures!</p>
        </header>

        {/* Player Stats */}
        <div className="mb-6">
          <PlayerStats />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="quest-button bg-quest-success hover:bg-green-600 text-white flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Quest
          </button>

          <div className="flex gap-2 flex-1">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-quest-primary"
            >
              <option value="all">All Categories</option>
              <option value="daily">Daily Quests</option>
              <option value="main">Main Quests</option>
              <option value="side">Side Quests</option>
            </select>

            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`quest-button px-4 py-2 ${
                showCompleted 
                  ? 'bg-quest-primary text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>

            <button
              onClick={resetDailyQuests}
              className="quest-button bg-white/10 text-white/70 hover:bg-white/20 px-4 py-2"
              title="Reset Daily Quests"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quest Lists */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Quests */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-quest-primary/30 px-3 py-1 rounded-lg">
                Active Quests ({activeQuests.length})
              </span>
            </h2>
            <div className="space-y-3">
              {activeQuests.length > 0 ? (
                activeQuests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={completeQuest}
                    onDelete={deleteQuest}
                  />
                ))
              ) : (
                <div className="quest-card text-center py-8">
                  <p className="text-white/60">No active quests. Create your first quest!</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Quests */}
          {showCompleted && completedQuests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="bg-quest-success/30 px-3 py-1 rounded-lg">
                  Completed ({completedQuests.length})
                </span>
              </h2>
              <div className="space-y-3">
                {completedQuests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={completeQuest}
                    onDelete={deleteQuest}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Quest Form Modal */}
        {showAddForm && (
          <AddQuestForm
            onAdd={addQuest}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App