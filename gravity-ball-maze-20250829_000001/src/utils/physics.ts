import { Wall } from '../data/levels';

interface Ball {
  x: number;
  y: number;
  radius: number;
}

interface Goal {
  x: number;
  y: number;
  radius: number;
}

export const checkCollision = (
  ball: Ball,
  walls: Wall[]
): { horizontal: boolean; vertical: boolean } | null => {
  for (const wall of walls) {
    // Check if ball intersects with wall
    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;

    const wallLeft = wall.x;
    const wallRight = wall.x + wall.width;
    const wallTop = wall.y;
    const wallBottom = wall.y + wall.height;

    if (
      ballRight > wallLeft &&
      ballLeft < wallRight &&
      ballBottom > wallTop &&
      ballTop < wallBottom
    ) {
      // Determine collision direction
      const overlapLeft = ballRight - wallLeft;
      const overlapRight = wallRight - ballLeft;
      const overlapTop = ballBottom - wallTop;
      const overlapBottom = wallBottom - ballTop;

      const minOverlapX = Math.min(overlapLeft, overlapRight);
      const minOverlapY = Math.min(overlapTop, overlapBottom);

      return {
        horizontal: minOverlapY < minOverlapX,
        vertical: minOverlapX < minOverlapY,
      };
    }
  }

  return null;
};

export const checkGoalReached = (ball: Ball, goal: Goal): boolean => {
  const distance = Math.sqrt(
    Math.pow(ball.x - goal.x, 2) + Math.pow(ball.y - goal.y, 2)
  );
  
  return distance < goal.radius - ball.radius / 2;
};