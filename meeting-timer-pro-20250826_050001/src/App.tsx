import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import MeetingTimer from './components/MeetingTimer'
import ParticipantTracker from './components/ParticipantTracker'
import AgendaManager from './components/AgendaManager'
import { useMeetingStore } from './store'

function App() {
  const { 
    meetingTitle, 
    totalMeetingTime,
    setMeetingTitle, 
    setTotalMeetingTime 
  } = useMeetingStore()
  
  const [showSettings, setShowSettings] = useState(false)
  const [tempTitle, setTempTitle] = useState(meetingTitle)
  const [tempTime, setTempTime] = useState(Math.floor(totalMeetingTime / 60).toString())

  const handleSaveSettings = () => {
    setMeetingTitle(tempTitle)
    setTotalMeetingTime(parseInt(tempTime) * 60)
    setShowSettings(false)
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pt-4">
          <h1 className="text-3xl font-bold text-white">
            Meeting Timer Pro
          </h1>
          <button
            onClick={() => setShowSettings(true)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <MeetingTimer />
            <ParticipantTracker />
          </div>
          <div>
            <AgendaManager />
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-effect rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">회의 설정</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-white hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    회의 제목
                  </label>
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    전체 회의 시간 (분)
                  </label>
                  <input
                    type="number"
                    value={tempTime}
                    onChange={(e) => setTempTime(e.target.value)}
                    min="5"
                    max="180"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveSettings}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App