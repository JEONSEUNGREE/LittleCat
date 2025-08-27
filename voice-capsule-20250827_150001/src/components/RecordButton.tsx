import { useState, useRef } from 'react';
import { Mic, Square, Send } from 'lucide-react';
import useStore from '../store';

const RecordButton: React.FC = () => {
  const { isRecording, startRecording, stopRecording } = useStore();
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        stopRecording(blob);
        stream.getTracks().forEach((track) => track.stop());
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setRecordingTime(0);
      };

      mediaRecorder.start();
      startRecording();

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('마이크 접근 실패:', error);
      alert('마이크를 사용할 수 없습니다. 권한을 확인해주세요.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 shadow-2xl">
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className="bg-gradient-to-r from-primary to-secondary p-6 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg animate-glow"
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
        ) : (
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-mono">{formatTime(recordingTime)}</span>
            </div>
            <button
              onClick={handleStopRecording}
              className="bg-red-500 p-4 rounded-full hover:bg-red-600 transition-colors"
            >
              <Square className="w-6 h-6 text-white fill-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordButton;