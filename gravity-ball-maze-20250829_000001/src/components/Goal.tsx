interface GoalProps {
  goal: {
    x: number;
    y: number;
    radius: number;
  };
}

const Goal = ({ goal }: GoalProps) => {
  return (
    <div
      className="absolute rounded-full animate-spin-slow"
      style={{
        left: `${goal.x - goal.radius}px`,
        top: `${goal.y - goal.radius}px`,
        width: `${goal.radius * 2}px`,
        height: `${goal.radius * 2}px`,
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.6) 50%, rgba(5, 150, 105, 0.8) 100%)',
        boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
      }}
    >
      <div className="absolute inset-2 border-2 border-green-400 rounded-full animate-pulse" />
      <div className="absolute inset-4 bg-green-500/20 rounded-full" />
    </div>
  );
};

export default Goal;