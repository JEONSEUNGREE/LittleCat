import { useEffect, useRef } from 'react';
import { useTimerStore } from '../stores/useTimerStore';

export const useTimer = () => {
  const { isRunning, tick, updateFocusScore, timeRemaining } = useTimerStore();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        tick();

        // Simulate focus score based on session progress
        const totalDuration = useTimerStore.getState().sessionType === 'short' ? 25 * 60 :
                             useTimerStore.getState().sessionType === 'medium' ? 45 * 60 :
                             useTimerStore.getState().sessionType === 'long' ? 60 * 60 : 90 * 60;
        const progress = (totalDuration - timeRemaining) / totalDuration;

        // Focus score peaks in the middle of the session
        const focusScore = Math.sin(progress * Math.PI) * 100;
        updateFocusScore(Math.round(focusScore));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, tick, updateFocusScore, timeRemaining]);

  return { isRunning };
};
