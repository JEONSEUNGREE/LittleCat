import { PostureData, SessionData, Alert, DailyStats, CalibrationData } from '../types';
import { subDays, subHours, startOfDay } from 'date-fns';

export const generateMockPostureData = (calibration: CalibrationData): PostureData => {
  const baseScore = 75;
  const variation = Math.random() * 30 - 15; // -15 to +15 variation
  const score = Math.max(0, Math.min(100, baseScore + variation));
  
  return {
    timestamp: new Date(),
    score: Math.round(score),
    neckAngle: calibration.baseline.neckAngle + (Math.random() * 20 - 10),
    shoulderLevel: calibration.baseline.shoulderLevel + (Math.random() * 10 - 5),
    backCurvature: calibration.baseline.backCurvature + (Math.random() * 15 - 7.5),
    headPosition: calibration.baseline.headPosition + (Math.random() * 10 - 5),
  };
};

export const generateMockSessionData = (days: number): SessionData[] => {
  const sessions: SessionData[] = [];
  
  for (let d = 0; d < days; d++) {
    const sessionsPerDay = Math.floor(Math.random() * 3) + 1; // 1-3 sessions per day
    
    for (let s = 0; s < sessionsPerDay; s++) {
      const startTime = subDays(subHours(new Date(), d * 24 + s * 4), d);
      const duration = Math.floor(Math.random() * 60) + 20; // 20-80 minutes
      
      sessions.push({
        id: `session-${d}-${s}`,
        startTime,
        endTime: new Date(startTime.getTime() + duration * 60000),
        averageScore: Math.floor(Math.random() * 30) + 65, // 65-95 score
        duration,
        alerts: Math.floor(Math.random() * 10),
        improvements: Math.floor(Math.random() * 5),
      });
    }
  }
  
  return sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
};

export const generateMockAlerts = (): Alert[] => {
  const alertMessages = [
    { type: 'posture' as const, message: 'Remember to sit up straight!', severity: 'warning' as const },
    { type: 'break' as const, message: 'Time for a 5-minute break', severity: 'info' as const },
    { type: 'improvement' as const, message: 'Your posture has improved by 15%!', severity: 'success' as const },
    { type: 'achievement' as const, message: 'You maintained good posture for 30 minutes!', severity: 'success' as const },
  ];
  
  return alertMessages.map((alert, index) => ({
    id: `alert-${index}`,
    type: alert.type,
    message: alert.message,
    severity: alert.severity,
    timestamp: subHours(new Date(), index * 2),
    seen: index > 1,
  }));
};

export const generateDailyStats = (days: number): DailyStats[] => {
  const stats: DailyStats[] = [];
  
  for (let d = 0; d < days; d++) {
    const date = startOfDay(subDays(new Date(), d));
    const sessions = generateMockSessionData(1).filter(s => 
      startOfDay(s.startTime).getTime() === date.getTime()
    );
    
    const scores = sessions.map(s => s.averageScore);
    const averageScore = scores.length > 0 
      ? scores.reduce((a, b) => a + b, 0) / scores.length 
      : 0;
    
    stats.push({
      date,
      sessions,
      totalTime: sessions.reduce((sum, s) => sum + s.duration, 0),
      averageScore: Math.round(averageScore),
      alerts: sessions.reduce((sum, s) => sum + s.alerts, 0),
      improvements: sessions.reduce((sum, s) => sum + s.improvements, 0),
      bestScore: scores.length > 0 ? Math.max(...scores) : 0,
      worstScore: scores.length > 0 ? Math.min(...scores) : 0,
    });
  }
  
  return stats;
};

export const calculatePostureScore = (data: {
  neckAngle: number;
  shoulderLevel: number;
  backCurvature: number;
  headPosition: number;
}): number => {
  // Simple scoring algorithm
  const neckScore = Math.max(0, 100 - Math.abs(data.neckAngle) * 2);
  const shoulderScore = Math.max(0, 100 - Math.abs(data.shoulderLevel) * 4);
  const backScore = Math.max(0, 100 - Math.abs(data.backCurvature) * 3);
  const headScore = Math.max(0, 100 - Math.abs(data.headPosition) * 4);
  
  // Weighted average
  const score = (neckScore * 0.25 + shoulderScore * 0.25 + backScore * 0.3 + headScore * 0.2);
  
  return Math.round(Math.max(0, Math.min(100, score)));
};