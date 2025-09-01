import { useState, useRef, useEffect } from 'react'
import { Mic, Square, Send, Clock, X } from 'lucide-react'
import useCapsuleStore from '../store/useCapsuleStore'

const RecordButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showSchedule, setShowSchedule] = useState(false)
  const [scheduleTime, setScheduleTime] = useState('1')
  const [scheduleUnit, setScheduleUnit] = useState<'hours' | 'days' | 'weeks' | 'months'>('days')
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState('myself')
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  const { addCapsule, setCurrentRecording, currentRecording } = useCapsuleStore()

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      setRecordingTime(0)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setCurrentRecording(audioBlob)
        setShowSchedule(true)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('마이크 접근 오류:', error)
      alert('마이크에 접근할 수 없습니다. 권한을 확인해주세요.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const calculateScheduledTime = () => {
    const now = new Date()
    const value = parseInt(scheduleTime)
    
    switch (scheduleUnit) {
      case 'hours':
        now.setHours(now.getHours() + value)
        break
      case 'days':
        now.setDate(now.getDate() + value)
        break
      case 'weeks':
        now.setDate(now.getDate() + value * 7)
        break
      case 'months':
        now.setMonth(now.getMonth() + value)
        break
    }
    
    return now
  }

  const saveCapsule = () => {
    if (currentRecording) {
      const audioUrl = URL.createObjectURL(currentRecording)
      addCapsule({
        audioBlob: currentRecording,
        audioUrl,
        message,
        createdAt: new Date(),
        scheduledFor: calculateScheduledTime(),
        recipient,
        duration: recordingTime,
      })
      
      // Reset states
      setCurrentRecording(null)
      setShowSchedule(false)
      setMessage('')
      setRecipient('myself')
      setScheduleTime('1')
      setScheduleUnit('days')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        {!isRecording && !showSchedule && (
          <button
            onClick={startRecording}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-6 shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-slow"
          >
            <Mic size={32} />
          </button>
        )}

        {isRecording && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center space-y-4">
            <div className="text-2xl font-bold text-gray-800">{formatTime(recordingTime)}</div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-waveform"
                  style={{
                    height: `${20 + Math.random() * 30}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white rounded-full p-4 hover:bg-red-600 transition-colors"
            >
              <Square size={24} />
            </button>
          </div>
        )}
      </div>

      {showSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">타임캡슐 설정</h2>
              <button
                onClick={() => setShowSchedule(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  받는 사람
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="나에게 또는 친구 이름"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  메시지
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={3}
                  placeholder="미래의 당신에게 전하고 싶은 말..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline mr-2" size={16} />
                  언제 열어볼까요?
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    min="1"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select
                    value={scheduleUnit}
                    onChange={(e) => setScheduleUnit(e.target.value as any)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="hours">시간 후</option>
                    <option value="days">일 후</option>
                    <option value="weeks">주 후</option>
                    <option value="months">개월 후</option>
                  </select>
                </div>
              </div>

              <button
                onClick={saveCapsule}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>타임캡슐 보내기</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}