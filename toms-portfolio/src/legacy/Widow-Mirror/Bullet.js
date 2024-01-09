// Bullet class
//-Bullets are shot by the widows and deal damage

// Movement Variables
let bulletSpeed = 8;
let hit = false;
let bulletDamageToSelf = 1;
let bulletTimer = 0;
let bulletDelay = 120;

class Bullet {
  constructor(xPos, yPos, facingRight, side) {
    this.x = xPos;
    this.y = yPos - 15;
    this.size = 5;
    this.xVel = 0;
    this.yVel = 0;
    this.side = side;
    this.state = IDLE;
    this.hit = hit;

    if (facingRight) {
      this.direction = 1;
    } else if (!facingRight) {
      this.direction = -1;
    }
  }

  update() {
    // Move
    this.xVel = bulletSpeed * this.direction;
    this.x += this.xVel;
    this.y += this.yVel;

    // Boundaries
    // Left X Bounds
    if (this.side == 0) {
      if (this.x <= 0 + 2) {
        // Ensure final position is correct
        if (this.x >= width / 2) {
          this.x = width / 2;
        }

        this.collide(normalSpark);
      }
    }
    // Right X Bounds
    else if (this.x >= width - 2) {
      // Ensure final position is correct
      if (this.x <= width / 2) {
        this.x = width / 2;
      }
      this.collide(normalSpark);
    }
    
    // Hit Detection - Enemies
    for (let i = 0; i < enemies.length; i++) {
      // Detect the distance of all enemies
      let enemy = enemies[i];
      let d = dist(this.x, this.y, enemy.x, enemy.y);

      // If the bullet hits the enemy
      if (d < enemy.size / 2) {
        enemy.takeDamage(10);
        this.collide(bloodSpark);
      }
    }

    // Hit Detection - Other Bullets
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      if (bullet != this) {
        let d = dist(this.x, this.y, bullet.x, bullet.y);

        // Collide if the bullet hits another bullet
        if (d < bullet.size) {
          this.collide(normalSpark);
          bullet.collide(normalSpark);
        }
      }
    }
    
    // Hit Detection - Widows
    let d = dist(this.x, this.y, widow.x, widow.y);
    let d2 = dist(this.x, this.y, widow2.x, widow2.y);
    
    if (d < widow.size / 2 || d2 < widow.size / 2) {
       this.collide(bloodSpark);
       widow.takeDamage(bulletDamageToSelf);
    }
  }

  show() {
    fill(0);
    circle(this.x, this.y, this.size);
  }
  
  collide(type) {
    this.xVel = 0;
    if (type == normalSpark) {
      sparks.push(new Spark(this.x, this.y, sparkSize, normalSpark));
    } else {
      sparks.push(new Spark(this.x, this.y, bloodSparkSize, bloodSpark));
    }
    this.hit = true;
  }
}