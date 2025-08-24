import { useState, useRef, useCallback, useEffect } from 'react';
import { Trash2, Move, Link } from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
  isConnectionMode: boolean;
  isConnectionStart: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  isSelected, 
  onClick, 
  isConnectionMode,
  isConnectionStart 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { updateNote, deleteNote, moveNote, selectNote, bringToFront } = useCanvasStore();

  const colorClasses = {
    yellow: 'bg-note-yellow border-yellow-400',
    blue: 'bg-note-blue border-blue-400',
    green: 'bg-note-green border-green-400',
    pink: 'bg-note-pink border-pink-400'
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isEditing && !isConnectionMode) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - note.x,
        y: e.clientY - note.y
      });
      selectNote(note.id);
      bringToFront(note.id);
      e.stopPropagation();
    }
  }, [note, isEditing, isConnectionMode, selectNote, bringToFront]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      moveNote(note.id, newX, newY);
    }
  }, [isDragging, dragStart, note.id, moveNote]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleDoubleClick = useCallback(() => {
    if (!isConnectionMode) {
      setIsEditing(true);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [isConnectionMode]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNote(note.id, { content: e.target.value });
  }, [note.id, updateNote]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(note.id);
  }, [note.id, deleteNote]);

  const handleColorChange = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const colors: Note['color'][] = ['yellow', 'blue', 'green', 'pink'];
    const currentIndex = colors.indexOf(note.color);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    updateNote(note.id, { color: nextColor });
  }, [note, updateNote]);

  return (
    <div
      className={`note-card ${colorClasses[note.color]} rounded-lg shadow-md p-3 border-2 ${
        isSelected ? 'ring-2 ring-emerald-500' : ''
      } ${isConnectionStart ? 'ring-2 ring-blue-500 animate-pulse' : ''} ${
        isDragging ? 'opacity-80' : ''
      } hover:shadow-lg transition-shadow`}
      style={{
        left: `${note.x}px`,
        top: `${note.y}px`,
        width: `${note.width}px`,
        minHeight: `${note.height}px`,
        zIndex: note.zIndex,
        cursor: isDragging ? 'grabbing' : isConnectionMode ? 'pointer' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-1">
          <button
            onClick={handleColorChange}
            className="p-1 rounded hover:bg-white/50 transition-colors"
            title="색상 변경"
          >
            <div className={`w-4 h-4 rounded-full ${colorClasses[note.color]}`} />
          </button>
          {isConnectionMode && (
            <Link size={16} className="text-blue-600" />
          )}
        </div>
        <div className="flex gap-1">
          <Move size={16} className="text-gray-500" />
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="삭제"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={note.content}
          onChange={handleContentChange}
          onBlur={handleBlur}
          className="w-full h-full bg-transparent outline-none resize-none text-sm"
          placeholder="노트를 입력하세요..."
          style={{ minHeight: '100px' }}
        />
      ) : (
        <div
          className="whitespace-pre-wrap text-sm cursor-text min-h-[100px]"
          onDoubleClick={handleDoubleClick}
        >
          {note.content || <span className="text-gray-400">더블클릭하여 편집</span>}
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-2">
        {new Date(note.updatedAt).toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </div>
  );
};

export default NoteCard;