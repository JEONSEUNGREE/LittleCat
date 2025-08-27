import { create } from 'zustand';
import { VoiceCapsule } from './types';

interface VoiceCapsuleStore {
  capsules: VoiceCapsule[];
  currentRecording: Blob | null;
  isRecording: boolean;
  addCapsule: (capsule: VoiceCapsule) => void;
  openCapsule: (id: string) => void;
  startRecording: () => void;
  stopRecording: (blob: Blob) => void;
  addReaction: (id: string, reaction: string) => void;
}

const useStore = create<VoiceCapsuleStore>((set) => ({
  capsules: [
    {
      id: 'demo-1',
      title: '첫 번째 타임캡슐',
      audioUrl: '',
      createdAt: new Date(2024, 7, 20),
      openAt: new Date(2024, 7, 27),
      isOpened: true,
      duration: 45,
      recipient: '미래의 나',
      message: '일주일 뒤 나에게 보내는 응원 메시지',
      isPublic: true,
      reactions: ['❤️', '👍', '🎉'],
    },
    {
      id: 'demo-2',
      title: '생일 축하 메시지',
      audioUrl: '',
      createdAt: new Date(2024, 7, 15),
      openAt: new Date(2024, 11, 25),
      isOpened: false,
      duration: 60,
      recipient: '친구',
      message: '크리스마스에 열어볼 특별한 메시지',
      isPublic: false,
      reactions: [],
    },
  ],
  currentRecording: null,
  isRecording: false,
  
  addCapsule: (capsule) =>
    set((state) => ({ capsules: [...state.capsules, capsule] })),
  
  openCapsule: (id) =>
    set((state) => ({
      capsules: state.capsules.map((c) =>
        c.id === id ? { ...c, isOpened: true } : c
      ),
    })),
  
  startRecording: () => set({ isRecording: true }),
  
  stopRecording: (blob) => set({ isRecording: false, currentRecording: blob }),
  
  addReaction: (id, reaction) =>
    set((state) => ({
      capsules: state.capsules.map((c) =>
        c.id === id
          ? { ...c, reactions: [...c.reactions, reaction] }
          : c
      ),
    })),
}));

export default useStore;