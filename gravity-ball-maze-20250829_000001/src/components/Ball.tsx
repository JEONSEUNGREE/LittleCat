interface BallProps {
  ball: {
    x: number;
    y: number;
    radius: number;
  };
}

const Ball = ({ ball }: BallProps) => {
  return (
    <div
      className="absolute bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse-slow"
      style={{
        left: `${ball.x - ball.radius}px`,
        top: `${ball.y - ball.radius}px`,
        width: `${ball.radius * 2}px`,
        height: `${ball.radius * 2}px`,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
      }}
    >
      <div className="absolute inset-1 bg-white/30 rounded-full" />
    </div>
  );
};

export default Ball;