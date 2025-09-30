import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserSettings, CalibrationData, PostureData, SessionData, Alert } from '../types';
import { generateMockPostureData, generateMockSessionData, generateMockAlerts } from '../utils/mockData';

interface AppContextType {
  // User Settings
  userSettings: UserSettings;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  
  // Calibration
  calibrationData: CalibrationData;
  updateCalibration: (data: CalibrationData) => void;
  
  // Posture Monitoring
  currentPosture: PostureData | null;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  
  // Session Management
  currentSession: SessionData | null;
  sessionHistory: SessionData[];
  
  // Alerts
  alerts: Alert[];
  dismissAlert: (id: string) => void;
  
  // Onboarding
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

const defaultSettings: UserSettings = {
  alertsEnabled: true,
  alertFrequency: 20,
  workHours: {
    start: '09:00',
    end: '18:00',
  },
  breakReminders: true,
  breakInterval: 30,
  soundEnabled: true,
  vibrationEnabled: false,
  targetScore: 80,
  sensitivity: 'medium',
};

const defaultCalibration: CalibrationData = {
  baseline: {
    neckAngle: 0,
    shoulderLevel: 0,
    backCurvature: 0,
    headPosition: 0,
  },
  isCalibrated: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userSettings, setUserSettings] = useState<UserSettings>(defaultSettings);
  const [calibrationData, setCalibrationData] = useState<CalibrationData>(defaultCalibration);
  const [currentPosture, setCurrentPosture] = useState<PostureData | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null);
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    const savedCalibration = localStorage.getItem('calibrationData');
    const savedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    const savedSessions = localStorage.getItem('sessionHistory');
    
    if (savedSettings) {
      setUserSettings(JSON.parse(savedSettings));
    }
    
    if (savedCalibration) {
      setCalibrationData(JSON.parse(savedCalibration));
    }
    
    if (savedOnboarding === 'true') {
      setHasCompletedOnboarding(true);
    }
    
    if (savedSessions) {
      setSessionHistory(JSON.parse(savedSessions));
    } else {
      // Generate mock session history
      setSessionHistory(generateMockSessionData(7));
    }
    
    // Generate initial mock alerts
    setAlerts(generateMockAlerts());
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  }, [userSettings]);

  // Save calibration to localStorage
  useEffect(() => {
    localStorage.setItem('calibrationData', JSON.stringify(calibrationData));
  }, [calibrationData]);

  // Save session history to localStorage
  useEffect(() => {
    localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  // Simulate posture monitoring
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        const newPostureData = generateMockPostureData(calibrationData);
        setCurrentPosture(newPostureData);
        
        // Update current session
        if (currentSession) {
          const updatedSession = {
            ...currentSession,
            averageScore: (currentSession.averageScore + newPostureData.score) / 2,
            duration: Math.floor((Date.now() - currentSession.startTime.getTime()) / 60000),
          };
          setCurrentSession(updatedSession);
        }
        
        // Check for poor posture alert
        if (newPostureData.score < 60 && userSettings.alertsEnabled) {
          const newAlert: Alert = {
            id: Date.now().toString(),
            type: 'posture',
            message: 'Your posture needs improvement. Try adjusting your position.',
            severity: 'warning',
            timestamp: new Date(),
            seen: false,
          };
          setAlerts(prev => [newAlert, ...prev]);
        }
        
        // Check for improvement
        if (currentPosture && newPostureData.score > currentPosture.score + 10) {
          const newAlert: Alert = {
            id: Date.now().toString(),
            type: 'improvement',
            message: 'Great job! Your posture has improved!',
            severity: 'success',
            timestamp: new Date(),
            seen: false,
          };
          setAlerts(prev => [newAlert, ...prev]);
        }
      }, 5000); // Update every 5 seconds
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isMonitoring, currentSession, currentPosture, calibrationData, userSettings.alertsEnabled]);

  const updateUserSettings = (settings: Partial<UserSettings>) => {
    setUserSettings(prev => ({ ...prev, ...settings }));
  };

  const updateCalibration = (data: CalibrationData) => {
    setCalibrationData(data);
    localStorage.setItem('calibrationData', JSON.stringify(data));
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    const newSession: SessionData = {
      id: Date.now().toString(),
      startTime: new Date(),
      averageScore: 0,
      duration: 0,
      alerts: 0,
      improvements: 0,
    };
    setCurrentSession(newSession);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    if (currentSession) {
      const endedSession = {
        ...currentSession,
        endTime: new Date(),
      };
      setSessionHistory(prev => [...prev, endedSession]);
      setCurrentSession(null);
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, seen: true } : alert
    ));
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  return (
    <AppContext.Provider
      value={{
        userSettings,
        updateUserSettings,
        calibrationData,
        updateCalibration,
        currentPosture,
        isMonitoring,
        startMonitoring,
        stopMonitoring,
        currentSession,
        sessionHistory,
        alerts,
        dismissAlert,
        hasCompletedOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};