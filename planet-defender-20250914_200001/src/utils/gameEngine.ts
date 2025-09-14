import { Enemy, Projectile, Explosion } from '../store/gameStore'

class GameEngine {
  private lastEnemySpawn = 0
  private stars: { x: number; y: number; size: number; brightness: number }[] = []
  
  constructor() {
    this.initStars()
  }
  
  private initStars() {
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.8 + 0.2
      })
    }
  }
  
  drawStars(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.stars.forEach(star => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
      ctx.beginPath()
      ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }
  
  drawPlanet(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const radius = 60
    
    // Planet gradient
    const gradient = ctx.createRadialGradient(x - 10, y - 10, 0, x, y, radius)
    gradient.addColorStop(0, '#34d399')
    gradient.addColorStop(0.5, '#10b981')
    gradient.addColorStop(1, '#047857')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    
    // Planet details
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.beginPath()
    ctx.arc(x + 15, y - 10, 15, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(x - 20, y + 15, 10, 0, Math.PI * 2)
    ctx.fill()
    
    // Shield effect
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y, radius + 10, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  drawCannon(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
    const cannonLength = 40
    const cannonWidth = 15
    
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    
    // Cannon barrel
    const gradient = ctx.createLinearGradient(60, 0, 60 + cannonLength, 0)
    gradient.addColorStop(0, '#475569')
    gradient.addColorStop(1, '#1e293b')
    
    ctx.fillStyle = gradient
    ctx.fillRect(60, -cannonWidth/2, cannonLength, cannonWidth)
    
    // Cannon tip
    ctx.fillStyle = '#60a5fa'
    ctx.fillRect(60 + cannonLength - 5, -cannonWidth/2, 5, cannonWidth)
    
    ctx.restore()
  }
  
  drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
    ctx.save()
    ctx.translate(enemy.x, enemy.y)
    
    if (enemy.type === 'asteroid') {
      ctx.fillStyle = '#78716c'
      ctx.beginPath()
      ctx.arc(0, 0, enemy.size, 0, Math.PI * 2)
      ctx.fill()
      
      // Asteroid texture
      ctx.fillStyle = '#57534e'
      ctx.beginPath()
      ctx.arc(-enemy.size/3, -enemy.size/3, enemy.size/3, 0, Math.PI * 2)
      ctx.fill()
    } else if (enemy.type === 'ship') {
      ctx.rotate(enemy.angle)
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.moveTo(enemy.size, 0)
      ctx.lineTo(-enemy.size/2, -enemy.size/2)
      ctx.lineTo(-enemy.size/2, enemy.size/2)
      ctx.closePath()
      ctx.fill()
      
      // Ship window
      ctx.fillStyle = '#60a5fa'
      ctx.beginPath()
      ctx.arc(0, 0, enemy.size/3, 0, Math.PI * 2)
      ctx.fill()
    } else if (enemy.type === 'bomber') {
      ctx.fillStyle = '#a855f7'
      ctx.fillRect(-enemy.size, -enemy.size/2, enemy.size * 2, enemy.size)
      
      // Wings
      ctx.fillStyle = '#7c3aed'
      ctx.beginPath()
      ctx.moveTo(-enemy.size, -enemy.size/2)
      ctx.lineTo(-enemy.size * 1.5, -enemy.size)
      ctx.lineTo(-enemy.size, 0)
      ctx.closePath()
      ctx.fill()
      
      ctx.beginPath()
      ctx.moveTo(-enemy.size, enemy.size/2)
      ctx.lineTo(-enemy.size * 1.5, enemy.size)
      ctx.lineTo(-enemy.size, 0)
      ctx.closePath()
      ctx.fill()
    }
    
    ctx.restore()
  }
  
  drawProjectile(ctx: CanvasRenderingContext2D, projectile: Projectile) {
    if (projectile.type === 'laser') {
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 3
      ctx.shadowBlur = 10
      ctx.shadowColor = '#fbbf24'
      
      const endX = projectile.x + Math.cos(projectile.angle) * 20
      const endY = projectile.y + Math.sin(projectile.angle) * 20
      
      ctx.beginPath()
      ctx.moveTo(projectile.x, projectile.y)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      
      ctx.shadowBlur = 0
    }
  }
  
  drawExplosion(ctx: CanvasRenderingContext2D, explosion: Explosion) {
    const alpha = explosion.duration / 30
    ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`
    ctx.beginPath()
    ctx.arc(explosion.x, explosion.y, explosion.size * (1 - alpha), 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.5})`
    ctx.beginPath()
    ctx.arc(explosion.x, explosion.y, explosion.size * 1.5 * (1 - alpha), 0, Math.PI * 2)
    ctx.fill()
  }
  
  shouldSpawnEnemy(timestamp: number, wave: number): boolean {
    const spawnInterval = Math.max(1000 - wave * 50, 300)
    if (timestamp - this.lastEnemySpawn > spawnInterval) {
      this.lastEnemySpawn = timestamp
      return true
    }
    return false
  }
  
  createEnemy(wave: number, width: number, height: number): Enemy {
    const types: Enemy['type'][] = ['asteroid', 'ship', 'bomber']
    const type = types[Math.floor(Math.random() * Math.min(wave, 3))]
    const angle = Math.random() * Math.PI * 2
    const distance = Math.max(width, height) / 2 + 100
    
    return {
      id: `enemy-${Date.now()}-${Math.random()}`,
      x: width/2 + Math.cos(angle) * distance,
      y: height/2 + Math.sin(angle) * distance,
      angle,
      speed: type === 'asteroid' ? 0.5 : type === 'ship' ? 0.8 : 0.6,
      health: type === 'asteroid' ? 1 : type === 'ship' ? 2 : 3,
      type,
      size: type === 'asteroid' ? 15 : type === 'ship' ? 12 : 18
    }
  }
  
  createProjectile(angle: number): Projectile {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const startDistance = 100
    
    return {
      id: `projectile-${Date.now()}-${Math.random()}`,
      x: centerX + Math.cos(angle) * startDistance,
      y: centerY + Math.sin(angle) * startDistance,
      angle,
      speed: 8,
      damage: 1,
      type: 'laser'
    }
  }
  
  createExplosion(x: number, y: number): Explosion {
    return {
      id: `explosion-${Date.now()}-${Math.random()}`,
      x,
      y,
      size: 30,
      duration: 30
    }
  }
  
  updateEnemies(enemies: Enemy[], centerX: number, centerY: number, deltaTime: number): Enemy[] {
    return enemies.map(enemy => {
      const dx = centerX - enemy.x
      const dy = centerY - enemy.y
      const angle = Math.atan2(dy, dx)
      
      const speed = enemy.speed * (deltaTime / 16)
      
      return {
        ...enemy,
        x: enemy.x + Math.cos(angle) * speed,
        y: enemy.y + Math.sin(angle) * speed,
        angle
      }
    })
  }
  
  updateProjectiles(projectiles: Projectile[], deltaTime: number): Projectile[] {
    return projectiles
      .map(projectile => ({
        ...projectile,
        x: projectile.x + Math.cos(projectile.angle) * projectile.speed * (deltaTime / 16),
        y: projectile.y + Math.sin(projectile.angle) * projectile.speed * (deltaTime / 16)
      }))
      .filter(projectile => {
        const distance = Math.sqrt(projectile.x ** 2 + projectile.y ** 2)
        return distance < 1000
      })
  }
  
  checkCollisions(projectiles: Projectile[], enemies: Enemy[], centerX: number, centerY: number) {
    const remainingProjectiles: Projectile[] = []
    const remainingEnemies: Enemy[] = []
    const destroyedEnemies: Enemy[] = []
    const hitPlanet: Enemy[] = []
    
    const usedProjectiles = new Set<string>()
    
    enemies.forEach(enemy => {
      const distanceToCenter = Math.sqrt((enemy.x - centerX) ** 2 + (enemy.y - centerY) ** 2)
      
      if (distanceToCenter < 70) {
        hitPlanet.push(enemy)
        return
      }
      
      let hit = false
      projectiles.forEach(projectile => {
        if (usedProjectiles.has(projectile.id)) return
        
        const distance = Math.sqrt((enemy.x - projectile.x) ** 2 + (enemy.y - projectile.y) ** 2)
        if (distance < enemy.size + 5) {
          enemy.health -= projectile.damage
          usedProjectiles.add(projectile.id)
          hit = true
        }
      })
      
      if (enemy.health <= 0) {
        destroyedEnemies.push(enemy)
      } else {
        remainingEnemies.push(enemy)
      }
    })
    
    projectiles.forEach(projectile => {
      if (!usedProjectiles.has(projectile.id)) {
        remainingProjectiles.push(projectile)
      }
    })
    
    return {
      remainingProjectiles,
      remainingEnemies,
      destroyedEnemies,
      hitPlanet
    }
  }
}

export const gameEngine = new GameEngine()