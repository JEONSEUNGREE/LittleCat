import { Fortune, FortuneHistory } from '../types';

const STORAGE_KEY = 'fortune_cookie_history';

export const storage = {
  getHistory: (): FortuneHistory => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { fortunes: [] };
    }
    try {
      return JSON.parse(stored);
    } catch {
      return { fortunes: [] };
    }
  },

  saveHistory: (history: FortuneHistory): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  },

  addFortune: (fortune: Fortune): void => {
    const history = storage.getHistory();
    history.fortunes.unshift(fortune);
    // Keep only last 50 fortunes
    if (history.fortunes.length > 50) {
      history.fortunes = history.fortunes.slice(0, 50);
    }
    storage.saveHistory(history);
  },

  getDailyFortune: (): Fortune | null => {
    const history = storage.getHistory();
    const today = new Date().toDateString();
    
    if (history.lastDailyDate === today && history.dailyFortune) {
      return history.dailyFortune;
    }
    
    return null;
  },

  setDailyFortune: (fortune: Fortune): void => {
    const history = storage.getHistory();
    history.dailyFortune = fortune;
    history.lastDailyDate = new Date().toDateString();
    storage.saveHistory(history);
  },

  clearHistory: (): void => {
    const history = storage.getHistory();
    history.fortunes = [];
    storage.saveHistory(history);
  }
};