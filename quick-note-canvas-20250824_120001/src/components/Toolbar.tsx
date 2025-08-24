import React from 'react';
import { 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Upload,
  HelpCircle 
} from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';

const Toolbar: React.FC = () => {
  const { 
    notes, 
    clearCanvas, 
    canvasState, 
    updateCanvasState 
  } = useCanvasStore();

  const handleZoomIn = () => {
    const newScale = Math.min(canvasState.scale * 1.2, 3);
    updateCanvasState({ scale: newScale });
  };

  const handleZoomOut = () => {
    const newScale = Math.max(canvasState.scale * 0.8, 0.5);
    updateCanvasState({ scale: newScale });
  };

  const handleReset = () => {
    updateCanvasState({ scale: 1, offsetX: 0, offsetY: 0 });
  };

  const handleExport = () => {
    const data = {
      notes,
      version: '1.0.0',
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quick-note-canvas-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            if (data.notes && Array.isArray(data.notes)) {
              clearCanvas();
              data.notes.forEach((note: any) => {
                useCanvasStore.getState().notes.push(note);
              });
            }
          } catch (error) {
            alert('파일을 읽을 수 없습니다.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const showHelp = () => {
    alert(`Quick Note Canvas 사용법:
    
• Shift + 클릭: 새 노트 추가
• 더블클릭: 노트 편집
• 드래그: 노트 이동
• Ctrl/Cmd + C: 연결 모드 토글
• Ctrl/Cmd + 휠: 확대/축소
• Alt + 드래그: 캔버스 이동
• 색상 버튼: 노트 색상 변경`);
  };

  return (
    <div className="fixed top-4 left-4 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2 z-40">
      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="확대"
      >
        <ZoomIn size={20} />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="축소"
      >
        <ZoomOut size={20} />
      </button>
      <button
        onClick={handleReset}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="초기화"
      >
        <RotateCcw size={20} />
      </button>
      <div className="border-t my-1" />
      <button
        onClick={handleExport}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="내보내기"
      >
        <Download size={20} />
      </button>
      <button
        onClick={handleImport}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="가져오기"
      >
        <Upload size={20} />
      </button>
      <div className="border-t my-1" />
      <button
        onClick={clearCanvas}
        className="p-2 hover:bg-red-100 text-red-500 rounded transition-colors"
        title="모두 삭제"
      >
        <Trash2 size={20} />
      </button>
      <button
        onClick={showHelp}
        className="p-2 hover:bg-blue-100 text-blue-500 rounded transition-colors"
        title="도움말"
      >
        <HelpCircle size={20} />
      </button>
      
      <div className="text-xs text-gray-500 text-center mt-2">
        {notes.length} 노트
      </div>
    </div>
  );
};

export default Toolbar;