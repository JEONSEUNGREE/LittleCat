import { useCallback } from 'react';

export const useSound = () => {
  const playSound = useCallback((type: 'correct' | 'wrong' | 'levelup' | 'gameover') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const currentTime = audioContext.currentTime;
    
    switch (type) {
      case 'correct':
        oscillator.frequency.setValueAtTime(523.25, currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.3);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.3);
        break;
        
      case 'wrong':
        oscillator.frequency.setValueAtTime(349.23, currentTime); // F4
        oscillator.frequency.setValueAtTime(293.66, currentTime + 0.1); // D4
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.2);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.2);
        break;
        
      case 'levelup':
        oscillator.frequency.setValueAtTime(440, currentTime); // A4
        oscillator.frequency.setValueAtTime(554.37, currentTime + 0.1); // C#5
        oscillator.frequency.setValueAtTime(659.25, currentTime + 0.2); // E5
        oscillator.frequency.setValueAtTime(880, currentTime + 0.3); // A5
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.5);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.5);
        break;
        
      case 'gameover':
        oscillator.frequency.setValueAtTime(440, currentTime); // A4
        oscillator.frequency.exponentialRampToValueAtTime(220, currentTime + 0.5); // A3
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.5);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.5);
        break;
    }
  }, []);
  
  return { playSound };
};