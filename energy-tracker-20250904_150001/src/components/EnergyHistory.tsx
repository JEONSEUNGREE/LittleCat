import { Trash2, Clock, Activity, MessageSquare } from 'lucide-react'
import { useEnergyStore } from '../store/useEnergyStore'

export default function EnergyHistory() {
  const { entries, deleteEntry } = useEnergyStore()
  
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const formatTime = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (d.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (d.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: d.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  const getEnergyColor = (level: number) => {
    if (level <= 3) return 'text-energy-low'
    if (level <= 6) return 'text-energy-medium'
    if (level <= 8) return 'text-energy-high'
    return 'text-energy-peak'
  }

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'break': return '☕'
      case 'deep-work': return '🧠'
      case 'exercise': return '💪'
      case 'learning': return '📚'
      case 'social': return '❤️'
      default: return '📝'
    }
  }

  const groupEntriesByDate = () => {
    const grouped: { [key: string]: typeof sortedEntries } = {}
    
    sortedEntries.forEach(entry => {
      const dateKey = formatDate(new Date(entry.timestamp))
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(entry)
    })
    
    return grouped
  }

  const groupedEntries = groupEntriesByDate()

  if (entries.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-12 text-center">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          No Energy Records Yet
        </h3>
        <p className="text-slate-500 dark:text-slate-400">
          Start tracking your energy levels to build your history
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([date, dateEntries]) => (
        <div key={date} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
            <h3 className="font-medium text-slate-900 dark:text-white">{date}</h3>
          </div>
          
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {dateEntries.map((entry) => (
              <div
                key={entry.id}
                className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {formatTime(new Date(entry.timestamp))}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-slate-400" />
                        <span className={`font-semibold ${getEnergyColor(entry.energyLevel)}`}>
                          {entry.energyLevel}/10
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <span className="text-lg">{getActivityIcon(entry.activity)}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                          {entry.activity.replace('-', ' ')}
                        </span>
                      </div>

                      <span className="text-sm">{entry.mood}</span>
                    </div>
                    
                    {entry.notes && (
                      <div className="flex items-start space-x-2 mt-2">
                        <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {entry.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="ml-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Statistics Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          History Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Entries</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {entries.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Avg Energy</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {entries.length > 0
                ? (entries.reduce((sum, e) => sum + e.energyLevel, 0) / entries.length).toFixed(1)
                : '0'
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Days Tracked</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {Object.keys(groupedEntries).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Most Common</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {entries.length > 0
                ? (() => {
                    const counts = entries.reduce((acc, e) => {
                      acc[e.activity] = (acc[e.activity] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                    const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                    return getActivityIcon(mostCommon)
                  })()
                : 'N/A'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}