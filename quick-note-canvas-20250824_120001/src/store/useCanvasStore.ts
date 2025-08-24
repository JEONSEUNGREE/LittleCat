import { create } from 'zustand';
import { Note, Connection, CanvasState } from '../types';

interface CanvasStore {
  notes: Note[];
  connections: Connection[];
  canvasState: CanvasState;
  selectedNoteId: string | null;
  nextZIndex: number;
  
  addNote: (x: number, y: number) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string | null) => void;
  moveNote: (id: string, x: number, y: number) => void;
  bringToFront: (id: string) => void;
  
  addConnection: (fromId: string, toId: string) => void;
  deleteConnection: (id: string) => void;
  
  updateCanvasState: (updates: Partial<CanvasState>) => void;
  clearCanvas: () => void;
}

const useCanvasStore = create<CanvasStore>((set, get) => ({
  notes: [],
  connections: [],
  canvasState: {
    scale: 1,
    offsetX: 0,
    offsetY: 0
  },
  selectedNoteId: null,
  nextZIndex: 1,
  
  addNote: (x, y) => {
    const colors: Note['color'][] = ['yellow', 'blue', 'green', 'pink'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const { nextZIndex } = get();
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: '',
      x,
      y,
      width: 200,
      height: 150,
      color: randomColor,
      createdAt: new Date(),
      updatedAt: new Date(),
      zIndex: nextZIndex
    };
    
    set(state => ({
      notes: [...state.notes, newNote],
      selectedNoteId: newNote.id,
      nextZIndex: nextZIndex + 1
    }));
  },
  
  updateNote: (id, updates) => {
    set(state => ({
      notes: state.notes.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    }));
  },
  
  deleteNote: (id) => {
    set(state => ({
      notes: state.notes.filter(note => note.id !== id),
      connections: state.connections.filter(
        conn => conn.fromId !== id && conn.toId !== id
      ),
      selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId
    }));
  },
  
  selectNote: (id) => {
    set({ selectedNoteId: id });
  },
  
  moveNote: (id, x, y) => {
    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, x, y } : note
      )
    }));
  },
  
  bringToFront: (id) => {
    const { nextZIndex } = get();
    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, zIndex: nextZIndex } : note
      ),
      nextZIndex: nextZIndex + 1
    }));
  },
  
  addConnection: (fromId, toId) => {
    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      fromId,
      toId,
      type: 'arrow'
    };
    
    set(state => ({
      connections: [...state.connections, newConnection]
    }));
  },
  
  deleteConnection: (id) => {
    set(state => ({
      connections: state.connections.filter(conn => conn.id !== id)
    }));
  },
  
  updateCanvasState: (updates) => {
    set(state => ({
      canvasState: { ...state.canvasState, ...updates }
    }));
  },
  
  clearCanvas: () => {
    set({
      notes: [],
      connections: [],
      selectedNoteId: null,
      nextZIndex: 1
    });
  }
}));

export default useCanvasStore;