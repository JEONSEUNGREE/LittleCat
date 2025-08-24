import { useRef, useState, useCallback, useEffect } from 'react';
import useCanvasStore from '../store/useCanvasStore';
import NoteCard from './NoteCard';
import ConnectionLine from './ConnectionLine';
import { Plus } from 'lucide-react';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  
  const {
    notes,
    connections,
    canvasState,
    addNote,
    updateCanvasState,
    addConnection,
    selectedNoteId
  } = useCanvasStore();

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current && !isPanning) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - canvasState.offsetX) / canvasState.scale;
        const y = (e.clientY - rect.top - canvasState.offsetY) / canvasState.scale;
        
        if (e.shiftKey) {
          addNote(x - 100, y - 75);
        }
      }
    }
  }, [addNote, canvasState, isPanning]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - canvasState.offsetX, y: e.clientY - canvasState.offsetY });
      e.preventDefault();
    }
  }, [canvasState]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      updateCanvasState({
        offsetX: e.clientX - panStart.x,
        offsetY: e.clientY - panStart.y
      });
    }
  }, [isPanning, panStart, updateCanvasState]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(canvasState.scale * delta, 0.5), 3);
      updateCanvasState({ scale: newScale });
    }
  }, [canvasState.scale, updateCanvasState]);

  const handleNoteClick = useCallback((noteId: string) => {
    if (isCreatingConnection && connectionStart && connectionStart !== noteId) {
      addConnection(connectionStart, noteId);
      setIsCreatingConnection(false);
      setConnectionStart(null);
    } else if (isCreatingConnection) {
      setConnectionStart(noteId);
    }
  }, [isCreatingConnection, connectionStart, addConnection]);

  const handleAddNote = useCallback(() => {
    const centerX = (window.innerWidth / 2 - canvasState.offsetX) / canvasState.scale;
    const centerY = (window.innerHeight / 2 - canvasState.offsetY) / canvasState.scale;
    addNote(centerX - 100, centerY - 75);
  }, [addNote, canvasState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
        setIsCreatingConnection(!isCreatingConnection);
        setConnectionStart(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreatingConnection]);

  return (
    <div className="relative w-full h-full bg-canvas-bg">
      <div
        ref={canvasRef}
        className="canvas-container"
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isPanning ? 'grabbing' : isCreatingConnection ? 'crosshair' : 'default' }}
      >
        <div
          style={{
            transform: `translate(${canvasState.offsetX}px, ${canvasState.offsetY}px) scale(${canvasState.scale})`,
            transformOrigin: '0 0',
            width: '5000px',
            height: '5000px',
            position: 'relative'
          }}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '5000px', height: '5000px' }}
          >
            {connections.map(conn => {
              const fromNote = notes.find(n => n.id === conn.fromId);
              const toNote = notes.find(n => n.id === conn.toId);
              if (fromNote && toNote) {
                return (
                  <ConnectionLine
                    key={conn.id}
                    from={fromNote}
                    to={toNote}
                    type={conn.type}
                  />
                );
              }
              return null;
            })}
          </svg>
          
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              isSelected={selectedNoteId === note.id}
              onClick={() => handleNoteClick(note.id)}
              isConnectionMode={isCreatingConnection}
              isConnectionStart={connectionStart === note.id}
            />
          ))}
        </div>
      </div>
      
      <button
        onClick={handleAddNote}
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-colors animate-bounce-in z-50"
        title="새 노트 추가 (Shift+클릭)"
      >
        <Plus size={24} />
      </button>
      
      {isCreatingConnection && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in z-50">
          연결 모드: 노트를 클릭하여 연결하세요
        </div>
      )}
    </div>
  );
};

export default Canvas;