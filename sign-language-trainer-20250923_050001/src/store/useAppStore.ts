import { create } from 'zustand';

interface Lesson {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  signs: Sign[];
  completed: boolean;
  progress: number;
}

interface Sign {
  id: string;
  word: string;
  description: string;
  emoji: string;
  learned: boolean;
}

interface UserProgress {
  totalLessons: number;
  completedLessons: number;
  currentStreak: number;
  totalPracticeTime: number;
  level: number;
  xp: number;
}

interface AppState {
  currentLesson: Lesson | null;
  lessons: Lesson[];
  userProgress: UserProgress;
  isLearning: boolean;
  currentSignIndex: number;
  setCurrentLesson: (lesson: Lesson | null) => void;
  markSignAsLearned: (signId: string) => void;
  nextSign: () => void;
  previousSign: () => void;
  updateProgress: () => void;
  resetLesson: () => void;
}

const initialLessons: Lesson[] = [
  {
    id: '1',
    title: '기본 인사',
    category: '일상',
    difficulty: 'beginner',
    completed: false,
    progress: 0,
    signs: [
      { id: 's1', word: '안녕하세요', description: '손을 들어 좌우로 흔들기', emoji: '👋', learned: false },
      { id: 's2', word: '감사합니다', description: '손을 입술에서 밖으로', emoji: '🙏', learned: false },
      { id: 's3', word: '미안합니다', description: '주먹을 가슴에 대고 원 그리기', emoji: '😔', learned: false },
    ],
  },
  {
    id: '2',
    title: '숫자',
    category: '기초',
    difficulty: 'beginner',
    completed: false,
    progress: 0,
    signs: [
      { id: 's4', word: '1', description: '검지 하나 펴기', emoji: '☝️', learned: false },
      { id: 's5', word: '2', description: '검지와 중지 펴기', emoji: '✌️', learned: false },
      { id: 's6', word: '3', description: '검지, 중지, 약지 펴기', emoji: '🤟', learned: false },
    ],
  },
  {
    id: '3',
    title: '가족',
    category: '일상',
    difficulty: 'beginner',
    completed: false,
    progress: 0,
    signs: [
      { id: 's7', word: '엄마', description: '엄지를 턱에 대기', emoji: '👩', learned: false },
      { id: 's8', word: '아빠', description: '엄지를 이마에 대기', emoji: '👨', learned: false },
      { id: 's9', word: '가족', description: '양손으로 원 만들기', emoji: '👨‍👩‍👧‍👦', learned: false },
    ],
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  currentLesson: null,
  lessons: initialLessons,
  userProgress: {
    totalLessons: initialLessons.length,
    completedLessons: 0,
    currentStreak: 0,
    totalPracticeTime: 0,
    level: 1,
    xp: 0,
  },
  isLearning: false,
  currentSignIndex: 0,

  setCurrentLesson: (lesson) =>
    set({ currentLesson: lesson, isLearning: !!lesson, currentSignIndex: 0 }),

  markSignAsLearned: (signId) =>
    set((state) => {
      const updatedLessons = state.lessons.map((lesson) => {
        if (lesson.id === state.currentLesson?.id) {
          const updatedSigns = lesson.signs.map((sign) =>
            sign.id === signId ? { ...sign, learned: true } : sign
          );
          const learnedCount = updatedSigns.filter((s) => s.learned).length;
          const progress = (learnedCount / updatedSigns.length) * 100;
          return {
            ...lesson,
            signs: updatedSigns,
            progress,
            completed: progress === 100,
          };
        }
        return lesson;
      });

      const currentLesson = updatedLessons.find((l) => l.id === state.currentLesson?.id) || null;
      return { lessons: updatedLessons, currentLesson };
    }),

  nextSign: () =>
    set((state) => {
      const maxIndex = state.currentLesson?.signs.length || 0;
      return {
        currentSignIndex: Math.min(state.currentSignIndex + 1, maxIndex - 1),
      };
    }),

  previousSign: () =>
    set((state) => ({
      currentSignIndex: Math.max(state.currentSignIndex - 1, 0),
    })),

  updateProgress: () =>
    set((state) => {
      const completedLessons = state.lessons.filter((l) => l.completed).length;
      const totalXP = state.lessons.reduce((acc, lesson) => {
        return acc + lesson.signs.filter((s) => s.learned).length * 10;
      }, 0);
      const level = Math.floor(totalXP / 100) + 1;

      return {
        userProgress: {
          ...state.userProgress,
          completedLessons,
          xp: totalXP,
          level,
        },
      };
    }),

  resetLesson: () =>
    set((state) => {
      const updatedLessons = state.lessons.map((lesson) => {
        if (lesson.id === state.currentLesson?.id) {
          return {
            ...lesson,
            signs: lesson.signs.map((sign) => ({ ...sign, learned: false })),
            progress: 0,
            completed: false,
          };
        }
        return lesson;
      });
      
      return {
        lessons: updatedLessons,
        currentSignIndex: 0,
      };
    }),
}));