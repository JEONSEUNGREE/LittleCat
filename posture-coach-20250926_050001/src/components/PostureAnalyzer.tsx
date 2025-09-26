import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, XCircle, Play, Pause, RefreshCw } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

const PostureAnalyzer: React.FC = () => {
  const { isMonitoring, setIsMonitoring, currentScore, setCurrentScore, addRecord } = usePostureStore()
  const [lastCheck, setLastCheck] = useState(new Date())
  const [issues, setIssues] = useState<string[]>([])
  
  const postureIssues = [
    { name: 'Head Forward', status: 'warning', recommendation: 'Align ears with shoulders' },
    { name: 'Rounded Shoulders', status: 'error', recommendation: 'Pull shoulders back and down' },
    { name: 'Slouched Back', status: 'warning', recommendation: 'Sit up straight, engage core' },
    { name: 'Neck Alignment', status: 'good', recommendation: 'Maintain neutral position' },
  ]
  
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate posture check
        const newScore = Math.floor(Math.random() * 30) + 70
        setCurrentScore(newScore)
        setLastCheck(new Date())
        
        if (newScore < 80) {
          setIssues(['Slouching detected', 'Adjust your sitting position'])
        } else {
          setIssues([])
        }
      }, 5000)
      
      return () => clearInterval(interval)
    }
  }, [isMonitoring, setCurrentScore])
  
  const handleStartMonitoring = () => {
    setIsMonitoring(!isMonitoring)
    if (!isMonitoring) {
      addRecord({
        timestamp: new Date(),
        score: currentScore,
        issues: issues,
        recommendations: postureIssues
          .filter(i => i.status !== 'good')
          .map(i => i.recommendation)
      })
    }
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Posture Analysis</h2>
          <button
            onClick={handleStartMonitoring}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isMonitoring
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {isMonitoring ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Stop Monitoring</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start Monitoring</span>
              </>
            )}
          </button>
        </div>
        
        <div className="text-center py-8">
          <div className={`text-6xl font-bold ${getScoreColor(currentScore)}`}>
            {currentScore}%
          </div>
          <p className="text-gray-600 mt-2">Current Posture Score</p>
          <p className="text-sm text-gray-500 mt-1">
            Last checked: {lastCheck.toLocaleTimeString()}
          </p>
        </div>
        
        {isMonitoring && issues.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">Posture Alert</p>
                {issues.map((issue, idx) => (
                  <p key={idx} className="text-sm text-yellow-700 mt-1">{issue}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Detailed Analysis */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Detailed Analysis</h3>
        <div className="space-y-4">
          {postureIssues.map((issue, idx) => (
            <div key={idx} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                {getStatusIcon(issue.status)}
                <div>
                  <p className="font-medium text-gray-800">{issue.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{issue.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="card flex items-center justify-center space-x-3 py-4 hover:bg-primary-50 transition-colors">
          <RefreshCw className="w-6 h-6 text-primary-600" />
          <span className="font-semibold">Recalibrate</span>
        </button>
        <button className="card flex items-center justify-center space-x-3 py-4 hover:bg-primary-50 transition-colors">
          <AlertCircle className="w-6 h-6 text-primary-600" />
          <span className="font-semibold">Set Reminder</span>
        </button>
      </div>
    </div>
  )
}

export default PostureAnalyzer