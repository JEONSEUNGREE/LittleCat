import { create } from 'zustand';

export interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  dueDate?: string;
  completed: boolean;
  meetingId: string;
  createdAt: Date;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // in minutes
  participants: string[];
  agenda: string[];
  notes: string;
  actionItems: string[]; // ActionItem IDs
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: Date;
}

interface MeetingStore {
  meetings: Meeting[];
  actionItems: ActionItem[];
  currentMeetingId: string | null;
  
  // Meeting actions
  addMeeting: (meeting: Omit<Meeting, 'id' | 'createdAt' | 'actionItems' | 'status'>) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  setCurrentMeeting: (id: string | null) => void;
  
  // Action item actions
  addActionItem: (item: Omit<ActionItem, 'id' | 'createdAt'>) => void;
  toggleActionItem: (id: string) => void;
  updateActionItem: (id: string, updates: Partial<ActionItem>) => void;
  deleteActionItem: (id: string) => void;
  
  // Getters
  getMeetingById: (id: string) => Meeting | undefined;
  getActionItemsByMeeting: (meetingId: string) => ActionItem[];
  getUpcomingMeetings: () => Meeting[];
  getPendingActionItems: () => ActionItem[];
}

export const useMeetingStore = create<MeetingStore>((set, get) => ({
  meetings: [],
  actionItems: [],
  currentMeetingId: null,
  
  addMeeting: (meetingData) => {
    const newMeeting: Meeting = {
      ...meetingData,
      id: Date.now().toString(),
      createdAt: new Date(),
      actionItems: [],
      status: 'upcoming'
    };
    set((state) => ({
      meetings: [...state.meetings, newMeeting]
    }));
  },
  
  updateMeeting: (id, updates) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, ...updates } : meeting
      )
    }));
  },
  
  deleteMeeting: (id) => {
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
      actionItems: state.actionItems.filter((item) => item.meetingId !== id)
    }));
  },
  
  setCurrentMeeting: (id) => {
    set({ currentMeetingId: id });
  },
  
  addActionItem: (itemData) => {
    const newItem: ActionItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    set((state) => {
      const updatedActionItems = [...state.actionItems, newItem];
      const updatedMeetings = state.meetings.map((meeting) =>
        meeting.id === itemData.meetingId
          ? { ...meeting, actionItems: [...meeting.actionItems, newItem.id] }
          : meeting
      );
      return {
        actionItems: updatedActionItems,
        meetings: updatedMeetings
      };
    });
  },
  
  toggleActionItem: (id) => {
    set((state) => ({
      actionItems: state.actionItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  },
  
  updateActionItem: (id, updates) => {
    set((state) => ({
      actionItems: state.actionItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  },
  
  deleteActionItem: (id) => {
    set((state) => {
      const item = state.actionItems.find((i) => i.id === id);
      if (!item) return state;
      
      const updatedActionItems = state.actionItems.filter((i) => i.id !== id);
      const updatedMeetings = state.meetings.map((meeting) =>
        meeting.id === item.meetingId
          ? { ...meeting, actionItems: meeting.actionItems.filter((aid) => aid !== id) }
          : meeting
      );
      
      return {
        actionItems: updatedActionItems,
        meetings: updatedMeetings
      };
    });
  },
  
  getMeetingById: (id) => {
    return get().meetings.find((meeting) => meeting.id === id);
  },
  
  getActionItemsByMeeting: (meetingId) => {
    return get().actionItems.filter((item) => item.meetingId === meetingId);
  },
  
  getUpcomingMeetings: () => {
    const now = new Date();
    return get().meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.date + ' ' + meeting.time);
      return meetingDate > now && meeting.status === 'upcoming';
    }).sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA.getTime() - dateB.getTime();
    });
  },
  
  getPendingActionItems: () => {
    return get().actionItems.filter((item) => !item.completed)
      .sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return a.dueDate ? -1 : 1;
      });
  }
}));