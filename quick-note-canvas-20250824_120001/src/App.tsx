import { useEffect } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import useCanvasStore from './store/useCanvasStore';

function App() {
  const { addNote } = useCanvasStore();

  useEffect(() => {
    // 초기 샘플 노트 생성
    const timer = setTimeout(() => {
      addNote(100, 100);
      addNote(350, 150);
      addNote(200, 300);
      
      // 첫 번째 노트에 내용 추가
      const firstNote = useCanvasStore.getState().notes[0];
      if (firstNote) {
        useCanvasStore.getState().updateNote(firstNote.id, {
          content: '🎯 Quick Note Canvas\n\n공간적 메모 캔버스에 오신 것을 환영합니다!'
        });
      }
      
      // 두 번째 노트에 내용 추가
      const secondNote = useCanvasStore.getState().notes[1];
      if (secondNote) {
        useCanvasStore.getState().updateNote(secondNote.id, {
          content: '💡 사용 팁:\n• Shift+클릭으로 노트 추가\n• 더블클릭으로 편집\n• 드래그로 이동'
        });
      }
      
      // 세 번째 노트에 내용 추가
      const thirdNote = useCanvasStore.getState().notes[2];
      if (thirdNote) {
        useCanvasStore.getState().updateNote(thirdNote.id, {
          content: '🔗 Ctrl+C로 연결 모드\n노트 간 연결을 만들 수 있습니다'
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [addNote]);

  return (
    <div className="w-full h-screen overflow-hidden">
      <Canvas />
      <Toolbar />
      <div className="fixed bottom-4 left-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        Quick Note Canvas v1.0
      </div>
    </div>
  );
}

export default App;