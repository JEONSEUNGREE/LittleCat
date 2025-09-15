import { useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Lightbulb, Square, Circle, Triangle, Hexagon } from 'lucide-react';
import { ShadowObject, LightSource } from '../types/game';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    lightSources,
    objects,
    selectedItem,
    selectItem,
    updateLightSource,
    updateObject,
    checkWinCondition,
    setDragging,
    isDragging,
    currentLevelData,
  } = useGameStore();

  const handleDragStart = (itemId: string, type: 'light' | 'object') => {
    selectItem(itemId);
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
    selectItem(null);
    setTimeout(() => {
      checkWinCondition();
    }, 500);
  };

  const handleDrag = (
    e: React.MouseEvent | React.TouchEvent,
    itemId: string,
    type: 'light' | 'object'
  ) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    if (type === 'light') {
      updateLightSource(itemId, { position: { x, y } });
    } else {
      updateObject(itemId, { position: { x, y } });
    }
  };

  const renderShape = (shape: ShadowObject['shape'], size: number) => {
    const iconProps = {
      size,
      className: 'fill-current',
    };

    switch (shape) {
      case 'circle':
        return <Circle {...iconProps} />;
      case 'triangle':
        return <Triangle {...iconProps} />;
      case 'hexagon':
        return <Hexagon {...iconProps} />;
      case 'square':
      default:
        return <Square {...iconProps} />;
    }
  };

  const renderTargetShape = () => {
    if (!currentLevelData) return null;
    
    const targetIconProps = {
      size: 60,
      className: 'text-light-warm opacity-30',
    };

    switch (currentLevelData.targetShape) {
      case 'circle':
        return <Circle {...targetIconProps} />;
      case 'triangle':
        return <Triangle {...targetIconProps} />;
      case 'hexagon':
        return <Hexagon {...targetIconProps} />;
      case 'square':
      default:
        return <Square {...targetIconProps} />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div 
        ref={canvasRef}
        className="relative w-full max-w-lg aspect-square bg-gradient-to-br from-gray-900 to-shadow-dark rounded-2xl shadow-2xl overflow-hidden"
        style={{ touchAction: 'none' }}
      >
        {/* Target shape indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-pulse-slow">
            {renderTargetShape()}
          </div>
        </div>

        {/* Light sources */}
        {lightSources.map((light) => (
          <div
            key={light.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move transition-all duration-200 ${
              selectedItem === light.id ? 'scale-110 z-20' : 'z-10'
            } ${isDragging && selectedItem === light.id ? 'opacity-80' : ''}`}
            style={{
              left: `${light.position.x}%`,
              top: `${light.position.y}%`,
            }}
            onMouseDown={() => handleDragStart(light.id, 'light')}
            onMouseMove={(e) => selectedItem === light.id && isDragging && handleDrag(e, light.id, 'light')}
            onMouseUp={handleDragEnd}
            onTouchStart={() => handleDragStart(light.id, 'light')}
            onTouchMove={(e) => selectedItem === light.id && isDragging && handleDrag(e, light.id, 'light')}
            onTouchEnd={handleDragEnd}
          >
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full animate-glow"
                style={{
                  background: `radial-gradient(circle, ${light.color} 0%, transparent 70%)`,
                  width: '80px',
                  height: '80px',
                  transform: 'translate(-50%, -50%)',
                  left: '50%',
                  top: '50%',
                  opacity: light.intensity * 0.5,
                }}
              />
              <Lightbulb
                size={32}
                className="relative"
                style={{ color: light.color }}
              />
            </div>
          </div>
        ))}

        {/* Shadow objects */}
        {objects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move transition-all duration-200 ${
              selectedItem === obj.id ? 'scale-110 z-20' : 'z-15'
            } ${isDragging && selectedItem === obj.id ? 'opacity-80' : ''}`}
            style={{
              left: `${obj.position.x}%`,
              top: `${obj.position.y}%`,
              transform: `translate(-50%, -50%) rotate(${obj.rotation}deg)`,
            }}
            onMouseDown={() => handleDragStart(obj.id, 'object')}
            onMouseMove={(e) => selectedItem === obj.id && isDragging && handleDrag(e, obj.id, 'object')}
            onMouseUp={handleDragEnd}
            onTouchStart={() => handleDragStart(obj.id, 'object')}
            onTouchMove={(e) => selectedItem === obj.id && isDragging && handleDrag(e, obj.id, 'object')}
            onTouchEnd={handleDragEnd}
          >
            <div className="text-gray-700 hover:text-gray-600 transition-colors">
              {renderShape(obj.shape, obj.width)}
            </div>
            
            {/* Shadow effect */}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
              style={{
                width: `${obj.width}px`,
                height: `${obj.height * 0.5}px`,
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCanvas;