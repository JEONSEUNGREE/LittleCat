export interface Compliment {
  id: string;
  message: string;
  category: 'kindness' | 'achievement' | 'personality' | 'effort' | 'creativity';
  timestamp: number;
  reactions: number;
  color: string;
}

export interface UserStats {
  complimentsSent: number;
  complimentsReceived: number;
  chainLength: number;
  positivityScore: number;
  lastActiveDate: string;
}