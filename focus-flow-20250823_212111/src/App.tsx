import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Target, Timer } from 'lucide-react';

interface FocusSession {
  id: string;
  duration: number;
  completed: boolean;
  startTime: number;
}

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null);
  
  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            completeSession();
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (!currentSession) {
      const newSession: FocusSession = {
        id: Date.now().toString(),
        duration: 25 * 60,
        completed: false,
        startTime: Date.now()
      };
      setCurrentSession(newSession);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setCurrentSession(null);
  };

  const completeSession = () => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        completed: true
      };
      setSessions(prev => [...prev, completedSession]);
      setCurrentSession(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;
  const completedToday = sessions.filter(s => 
    s.completed && new Date(s.startTime).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Focus Flow</h1>
          <p className="text-gray-600">집중력과 생산성을 극대화하세요</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">오늘 완료</p>
                <p className="text-2xl font-bold text-blue-600">{completedToday}</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">총 세션</p>
                <p className="text-2xl font-bold text-green-600">{sessions.length}</p>
              </div>
              <Timer className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Main Timer */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="relative w-64 h-64 mx-auto">
            {/* Progress Circle */}
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Timer Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500">
                {isRunning ? '집중 중...' : '준비됨'}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={resetTimer}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={isRunning ? pauseTimer : startTimer}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isRunning ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            
            <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Recent Sessions */}
        {sessions.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">최근 세션</h3>
            <div className="space-y-3">
              {sessions.slice(-3).reverse().map((session) => (
                <div key={session.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm text-gray-600">
                      {new Date(session.startTime).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    25분 완료
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;