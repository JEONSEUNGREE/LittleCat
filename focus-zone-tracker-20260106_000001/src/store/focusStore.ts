import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FocusSession, TimeSlot, DailyStats } from '../types';

interface FocusState {
  sessions: FocusSession[];
  currentSession: FocusSession | null;
  isTracking: boolean;

  // Actions
  startSession: () => void;
  endSession: (focusLevel: 'high' | 'medium' | 'low', notes?: string) => void;
  cancelSession: () => void;
  getTimeSlots: () => TimeSlot[];
  getDailyStats: (date: string) => DailyStats;
  getTodayStats: () => DailyStats;
  getBestHours: () => number[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSession: null,
      isTracking: false,

      startSession: () => {
        const newSession: FocusSession = {
          id: generateId(),
          startTime: new Date(),
          endTime: null,
          focusLevel: 'medium',
          duration: 0,
        };
        set({ currentSession: newSession, isTracking: true });
      },

      endSession: (focusLevel, notes) => {
        const { currentSession, sessions } = get();
        if (!currentSession) return;

        const endTime = new Date();
        const duration = Math.round(
          (endTime.getTime() - new Date(currentSession.startTime).getTime()) / 60000
        );

        const completedSession: FocusSession = {
          ...currentSession,
          endTime,
          focusLevel,
          duration,
          notes,
        };

        set({
          sessions: [...sessions, completedSession],
          currentSession: null,
          isTracking: false,
        });
      },

      cancelSession: () => {
        set({ currentSession: null, isTracking: false });
      },

      getTimeSlots: () => {
        const { sessions } = get();
        const slots: TimeSlot[] = Array.from({ length: 24 }, (_, hour) => ({
          hour,
          avgFocusLevel: 0,
          totalSessions: 0,
          totalMinutes: 0,
        }));

        sessions.forEach((session) => {
          const hour = new Date(session.startTime).getHours();
          const focusValue = session.focusLevel === 'high' ? 3 : session.focusLevel === 'medium' ? 2 : 1;

          slots[hour].totalSessions += 1;
          slots[hour].totalMinutes += session.duration;
          slots[hour].avgFocusLevel =
            (slots[hour].avgFocusLevel * (slots[hour].totalSessions - 1) + focusValue) /
            slots[hour].totalSessions;
        });

        return slots;
      },

      getDailyStats: (date) => {
        const { sessions } = get();
        const daySessions = sessions.filter(
          (s) => new Date(s.startTime).toDateString() === new Date(date).toDateString()
        );

        const totalFocusTime = daySessions.reduce((acc, s) => acc + s.duration, 0);
        const avgFocusLevel = daySessions.length
          ? daySessions.reduce((acc, s) => {
              const val = s.focusLevel === 'high' ? 3 : s.focusLevel === 'medium' ? 2 : 1;
              return acc + val;
            }, 0) / daySessions.length
          : 0;

        const hourCounts: Record<number, number> = {};
        daySessions.forEach((s) => {
          const hour = new Date(s.startTime).getHours();
          hourCounts[hour] = (hourCounts[hour] || 0) + s.duration;
        });

        const peakHours = Object.entries(hourCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([hour]) => parseInt(hour));

        return {
          date,
          totalFocusTime,
          peakHours,
          avgFocusLevel,
          sessionsCount: daySessions.length,
        };
      },

      getTodayStats: () => {
        return get().getDailyStats(new Date().toISOString());
      },

      getBestHours: () => {
        const slots = get().getTimeSlots();
        return slots
          .filter((s) => s.totalSessions > 0)
          .sort((a, b) => b.avgFocusLevel - a.avgFocusLevel)
          .slice(0, 3)
          .map((s) => s.hour);
      },
    }),
    {
      name: 'focus-zone-storage',
      partialize: (state) => ({ sessions: state.sessions }),
    }
  )
);
