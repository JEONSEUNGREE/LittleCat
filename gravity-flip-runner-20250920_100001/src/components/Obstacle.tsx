
import { Triangle, Square, Coins } from 'lucide-react';
import { Obstacle as ObstacleType } from '../types/game';

interface ObstacleProps {
  obstacle: ObstacleType;
}

const Obstacle: React.FC<ObstacleProps> = ({ obstacle }) => {
  const getObstacleIcon = () => {
    switch (obstacle.type) {
      case 'spike':
        return <Triangle size={32} className="text-red-500 fill-red-500" />;
      case 'block':
        return <Square size={40} className="text-gray-700 fill-gray-700" />;
      case 'coin':
        return <Coins size={28} className="text-yellow-400 animate-pulse" />;
      default:
        return null;
    }
  };

  const obstacleStyle = {
    right: `${obstacle.position}px`,
    width: `${obstacle.width}px`,
    height: `${obstacle.height}px`,
  };

  return (
    <div
      className={`absolute ${obstacle.isTop ? 'top-12' : 'bottom-12'} flex items-center justify-center`}
      style={obstacleStyle}
    >
      <div className={`${obstacle.isTop ? 'rotate-180' : ''} ${obstacle.type === 'coin' ? 'animate-float' : ''}`}>
        {getObstacleIcon()}
      </div>
    </div>
  );
};

export default Obstacle;