import { useState, useEffect } from 'react';
import { Play, Square, X, Check } from 'lucide-react';
import { useFocusStore } from '../store/focusStore';

export function SessionTracker() {
  const { currentSession, isTracking, startSession, endSession, cancelSession } = useFocusStore();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTracking && currentSession) {
      interval = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - new Date(currentSession.startTime).getTime()) / 1000
        );
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, currentSession]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopClick = () => {
    setShowRating(true);
  };

  const handleRating = (level: 'high' | 'medium' | 'low') => {
    endSession(level, notes || undefined);
    setShowRating(false);
    setNotes('');
    setElapsedTime(0);
  };

  const handleCancel = () => {
    cancelSession();
    setShowRating(false);
    setNotes('');
    setElapsedTime(0);
  };

  if (showRating) {
    return (
      <div className="focus-card">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          이번 세션의 집중도는?
        </h3>

        <div className="space-y-3 mb-4">
          <button
            onClick={() => handleRating('high')}
            className="w-full py-3 px-4 rounded-xl bg-focus-high/10 text-focus-high font-medium hover:bg-focus-high/20 transition-colors flex items-center justify-between"
          >
            <span>🔥 높음 - 매우 집중했어요</span>
            <Check size={20} />
          </button>

          <button
            onClick={() => handleRating('medium')}
            className="w-full py-3 px-4 rounded-xl bg-focus-medium/10 text-focus-medium font-medium hover:bg-focus-medium/20 transition-colors flex items-center justify-between"
          >
            <span>⚡ 보통 - 적당히 집중했어요</span>
            <Check size={20} />
          </button>

          <button
            onClick={() => handleRating('low')}
            className="w-full py-3 px-4 rounded-xl bg-focus-low/10 text-focus-low font-medium hover:bg-focus-low/20 transition-colors flex items-center justify-between"
          >
            <span>😔 낮음 - 집중하기 어려웠어요</span>
            <Check size={20} />
          </button>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="메모 (선택사항)"
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 placeholder-slate-400 resize-none text-sm"
          rows={2}
        />
      </div>
    );
  }

  return (
    <div className="focus-card">
      <div className="text-center">
        {isTracking ? (
          <>
            <div className="mb-4">
              <span className="text-5xl font-mono font-bold text-primary-500">
                {formatTime(elapsedTime)}
              </span>
            </div>

            <p className="text-sm text-slate-500 mb-6">집중 세션 진행 중...</p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleStopClick}
                className="focus-button-primary flex items-center gap-2"
              >
                <Square size={18} />
                세션 종료
              </button>

              <button
                onClick={handleCancel}
                className="focus-button-secondary flex items-center gap-2"
              >
                <X size={18} />
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              집중 세션 시작
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              지금 집중 시간을 추적하고 패턴을 분석해보세요
            </p>

            <button
              onClick={startSession}
              className="focus-button-primary flex items-center gap-2 mx-auto"
            >
              <Play size={18} />
              시작하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
