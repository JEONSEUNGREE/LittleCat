import { Planet, Player } from '../types/game';

const GRAVITY_CONSTANT = 500;
const MAX_VELOCITY = 300;
const JUMP_FORCE = 200;
const DAMPING = 0.99;

export const calculateGravityForce = (
  player: Player,
  planet: Planet
): { fx: number; fy: number } => {
  const dx = planet.x - player.x;
  const dy = planet.y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < planet.radius + player.radius) {
    return { fx: 0, fy: 0 };
  }
  
  const force = (GRAVITY_CONSTANT * planet.gravity) / (distance * distance);
  const fx = (force * dx) / distance;
  const fy = (force * dy) / distance;
  
  return { fx, fy };
};

export const updatePlayerPhysics = (
  player: Player,
  planets: Planet[],
  deltaTime: number
): Player => {
  let totalFx = 0;
  let totalFy = 0;
  
  // Calculate gravity from all planets
  planets.forEach((planet) => {
    const { fx, fy } = calculateGravityForce(player, planet);
    totalFx += fx;
    totalFy += fy;
  });
  
  // Update velocity
  let newVx = (player.vx + totalFx * deltaTime) * DAMPING;
  let newVy = (player.vy + totalFy * deltaTime) * DAMPING;
  
  // Limit max velocity
  const speed = Math.sqrt(newVx * newVx + newVy * newVy);
  if (speed > MAX_VELOCITY) {
    newVx = (newVx / speed) * MAX_VELOCITY;
    newVy = (newVy / speed) * MAX_VELOCITY;
  }
  
  // Update position
  const newX = player.x + newVx * deltaTime;
  const newY = player.y + newVy * deltaTime;
  
  return {
    ...player,
    x: newX,
    y: newY,
    vx: newVx,
    vy: newVy,
  };
};

export const checkCollision = (
  player: Player,
  planet: Planet
): boolean => {
  const dx = player.x - planet.x;
  const dy = player.y - planet.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= planet.radius + player.radius;
};

export const jump = (
  player: Player,
  targetX: number,
  targetY: number
): Player => {
  const dx = targetX - player.x;
  const dy = targetY - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  const jumpVx = (dx / distance) * JUMP_FORCE;
  const jumpVy = (dy / distance) * JUMP_FORCE;
  
  return {
    ...player,
    vx: jumpVx,
    vy: jumpVy,
    jumping: true,
    onPlanet: null,
  };
};