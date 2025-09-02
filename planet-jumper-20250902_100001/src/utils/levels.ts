import { Planet } from '../types/game';

export const generateLevel = (level: number): Planet[] => {
  const planets: Planet[] = [];
  
  // Starting planet
  planets.push({
    id: 0,
    x: 100,
    y: 200,
    radius: 40,
    gravity: 1,
    color: 'bg-blue-500',
    name: 'Earth',
  });
  
  if (level === 1) {
    // Tutorial level
    planets.push({
      id: 1,
      x: 250,
      y: 200,
      radius: 35,
      gravity: 0.8,
      color: 'bg-gray-400',
      name: 'Moon',
    });
    
    planets.push({
      id: 2,
      x: 400,
      y: 200,
      radius: 45,
      gravity: 1.2,
      color: 'bg-green-500',
      name: 'Goal',
      isGoal: true,
    });
  } else if (level === 2) {
    // Introduce different gravity
    planets.push({
      id: 1,
      x: 200,
      y: 150,
      radius: 30,
      gravity: 0.5,
      color: 'bg-gray-400',
      name: 'Asteroid',
    });
    
    planets.push({
      id: 2,
      x: 300,
      y: 250,
      radius: 50,
      gravity: 2,
      color: 'bg-orange-500',
      name: 'Jupiter',
    });
    
    planets.push({
      id: 3,
      x: 450,
      y: 200,
      radius: 40,
      gravity: 1,
      color: 'bg-green-500',
      name: 'Goal',
      isGoal: true,
    });
  } else if (level === 3) {
    // Zigzag path
    planets.push({
      id: 1,
      x: 200,
      y: 100,
      radius: 35,
      gravity: 1,
      color: 'bg-red-500',
      name: 'Mars',
    });
    
    planets.push({
      id: 2,
      x: 300,
      y: 300,
      radius: 40,
      gravity: 1.5,
      color: 'bg-yellow-500',
      name: 'Venus',
    });
    
    planets.push({
      id: 3,
      x: 400,
      y: 150,
      radius: 35,
      gravity: 0.8,
      color: 'bg-purple-500',
      name: 'Neptune',
    });
    
    planets.push({
      id: 4,
      x: 500,
      y: 250,
      radius: 45,
      gravity: 1,
      color: 'bg-green-500',
      name: 'Goal',
      isGoal: true,
    });
  } else {
    // Random procedural generation for higher levels
    const planetCount = Math.min(3 + level, 8);
    const spacing = 400 / planetCount;
    
    for (let i = 1; i < planetCount - 1; i++) {
      planets.push({
        id: i,
        x: 100 + spacing * i + (Math.random() - 0.5) * 50,
        y: 200 + (Math.random() - 0.5) * 150,
        radius: 30 + Math.random() * 25,
        gravity: 0.5 + Math.random() * 1.5,
        color: ['bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'][Math.floor(Math.random() * 5)],
        name: `Planet ${i}`,
      });
    }
    
    // Goal planet
    planets.push({
      id: planetCount - 1,
      x: 450 + (Math.random() - 0.5) * 50,
      y: 200 + (Math.random() - 0.5) * 100,
      radius: 45,
      gravity: 1,
      color: 'bg-green-500',
      name: 'Goal',
      isGoal: true,
    });
  }
  
  return planets;
};