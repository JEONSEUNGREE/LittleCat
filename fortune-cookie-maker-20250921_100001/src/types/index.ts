export type FortuneCategory = 'love' | 'career' | 'life' | 'funny' | 'custom';

export interface Fortune {
  id: string;
  text: string;
  category: FortuneCategory;
  timestamp: number;
  isCustom?: boolean;
}

export interface FortuneHistory {
  fortunes: Fortune[];
  dailyFortune?: Fortune;
  lastDailyDate?: string;
}