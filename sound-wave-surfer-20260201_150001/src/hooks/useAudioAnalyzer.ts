import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';

export const useAudioAnalyzer = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const {
    isListening,
    setListening,
    setAudioPermission,
    updateAudioData,
    updatePosition,
    isPlaying,
    isPaused,
  } = useGameStore();

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioPermission(true);

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;

      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      setListening(true);
    } catch (error) {
      console.error('Failed to access microphone:', error);
      setAudioPermission(false);
    }
  }, [setAudioPermission, setListening]);

  const stopListening = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setListening(false);
  }, [setListening]);

  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !isPlaying || isPaused) {
      animationRef.current = requestAnimationFrame(analyzeAudio);
      return;
    }

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Normalize data to 0-100 range
    const normalizedData = Array.from(dataArray).map((value) => (value / 255) * 100);
    updateAudioData(normalizedData);

    // Calculate average volume for surfer position
    const avgVolume = normalizedData.reduce((a, b) => a + b, 0) / normalizedData.length;
    const newPosition = 50 + (avgVolume - 50) * 0.8;
    updatePosition(newPosition);

    animationRef.current = requestAnimationFrame(analyzeAudio);
  }, [isPlaying, isPaused, updateAudioData, updatePosition]);

  useEffect(() => {
    if (isListening && isPlaying) {
      animationRef.current = requestAnimationFrame(analyzeAudio);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, isPlaying, analyzeAudio]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    startListening,
    stopListening,
  };
};
