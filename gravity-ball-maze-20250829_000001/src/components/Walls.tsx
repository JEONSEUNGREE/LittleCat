import { Wall } from '../data/levels';

interface WallsProps {
  walls: Wall[];
  hazards?: Wall[];
}

const Walls = ({ walls, hazards = [] }: WallsProps) => {
  return (
    <>
      {walls.map((wall, index) => (
        <div
          key={`wall-${index}`}
          className="absolute bg-gradient-to-br from-slate-600 to-slate-700 shadow-inner"
          style={{
            left: `${wall.x}px`,
            top: `${wall.y}px`,
            width: `${wall.width}px`,
            height: `${wall.height}px`,
            borderRadius: '2px',
          }}
        />
      ))}
      
      {hazards.map((hazard, index) => (
        <div
          key={`hazard-${index}`}
          className="absolute bg-gradient-to-br from-red-600 to-red-800 animate-pulse shadow-lg"
          style={{
            left: `${hazard.x}px`,
            top: `${hazard.y}px`,
            width: `${hazard.width}px`,
            height: `${hazard.height}px`,
            borderRadius: '4px',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)',
          }}
        >
          <div className="absolute inset-0 bg-red-500/20 rounded" />
        </div>
      ))}
    </>
  );
};

export default Walls;