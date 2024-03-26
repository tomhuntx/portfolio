// Enemy Class
//-Enemies that fight the player

// Starting Variables
let enemySpawnRate = 5000;
let spawnTime = 0;
let enAccel = 3;
let enSpeed = 3;
let enemyHealth = 20;

// Dealing damage
let enemyDamage = 1;
let enemyDamageDelay = 1500;
let enemyTimer = 0;
let arrowFireDelay = 2000;
let arrowTimer = 0;

// Sprites
let enemyChar;
let bossChar;

class Enemy {
  constructor(xPos, yPos, size, health, boss) {
    this.x = xPos;
    this.y = yPos;
    this.size = size;
    this.health = health;
    this.boss = boss;
    this.attacking = false;

    this.xVel = 0;
    this.yVel = 0;
    this.animTime = 0;
    this.facingRight = true;
    
    // Create enemy sprites with unique sprite for boss
    if (this.boss) {
      bossChar = createSprite(this.x, this.y, this.size, this.size);
      bossChar.scale = 1.8;
      bossSprite.offY = -7;
      bossSprite.offX = 2;
      bossChar.addAnimation("boss", bossSprite);
      this.char = bossChar;
      this.sprite = bossSprite;
    }
    else {
      enemyChar = createSprite(this.x, this.y, this.size, this.size);
      enemyChar.scale = 1.6;
      enemySprite.offY = -10;
      enemySprite.offX = -2;
      enemyChar.addAnimation("boss", enemySprite);
      this.char = enemyChar;
      this.sprite = enemySprite;
    }
  }

  update() {
    // Move
    this.x += this.xVel;
    this.y += this.yVel;

    // Randomly choose which widow to favour if spawned in the middle
    let randomOffset = random(-1, 1);

    let distA = dist(this.x, this.y, widow.x + randomOffset, widow.y);
    let distB = dist(this.x, this.y, widow2.x, widow2.y);
    let moveTo;
    let target;

    // Decide on closest widow
    if (distA < distB) {
      moveTo = createVector(widow.x, widow.y);
      target = widow;
    } else {
      moveTo = createVector(widow2.x, widow2.y);
      target = widow2;
    }
    let stopZone = this.size / 2 + target.size / 2;

    // Move to the nearest widow (positive x)
    if (this.x < moveTo.x + stopZone) {
      this.xVel += 0.001 * enAccel * deltaTime;
    }
    // Stop and attack
    else if (this.x < moveTo.x - stopZone &&
      this.y <= moveTo.y) {
      this.xVel = 0;

      // Try to hit the player
      this.attack();
    }
    // Move to the nearest widow (negative x)
    if (this.x > moveTo.x + stopZone) {
      this.xVel -= 0.001 * enAccel * deltaTime;
    }
    // Stop and attack
    else if (this.x > moveTo.x - stopZone &&
      this.y <= moveTo.y) {
      this.xVel = 0;

      // Try to hit the player
      this.attack();
    }

    // Ensure the enemies don't go over their max speed
    if (this.xVel > enSpeed) {
      this.xVel = enSpeed;
    } else if (this.xVel < -enSpeed) {
      this.xVel = -enSpeed;
    }

    // Store moving direction based on velocity
    if (this.xVel < 0) {
      this.facingRight = false;
    } else if (this.xVel > 0) {
      this.facingRight = true;
    }

    // Y Boundaries
    if (this.y + this.size / 2 >= floorHeight) {
      this.y = floorHeight - this.size / 2;
      this.yVel = 0;
    }
    // Gravity
    else if (this.y + this.size / 2 < floorHeight) {
      this.yVel += gravity;
    }
    
    // Turn model around
    if (this.xVel > 0.2) {
      this.char.mirrorX(-1);
    } 
    else if (this.xVel < -0.2) {
      this.char.mirrorX(1);
    }
    
    // Move model & apply walking "animation"
    if (millis() > this.animTime + animDelay) {
      this.char.position.y = this.y - stepHeight;
      this.animTime = millis();
    } else {
      this.char.position.y = this.y;
    }
    this.char.position.x = this.x;
  }

  bossUpdate() { // Boss just has gravity
    // Move
    this.x += this.xVel;
    this.y += this.yVel;
    // Y Boundaries
    if (this.y + this.size / 2 >= floorHeight) {
      this.y = floorHeight - this.size / 2;
      this.yVel = 0;
    }
    // Gravity
    else if (this.y + this.size / 2 < floorHeight) {
      this.yVel += gravity;
    }
    
    // Move model
    this.char.position.y = this.y;
    this.char.position.x = this.x;
  }

  show() {
    fill(0);
    // Debug circle - shows hitbox
    //circle(this.x, this.y, this.size);
    
    // Draw p5.play sprite
    drawSprite(this.char);
  }
  
  turnBoss(direction) { // Turns boss around when shooting
    
    // Turn model around
    if (direction == right) {
      this.char.mirrorX(-1);
    } 
    else if (direction == left) {
      this.char.mirrorX(1);
    }
  }

  attack() {
    // Deal damage to the player every few seconds
    if (millis() > enemyTimer + enemyDamageDelay) {

      // Delay first hit by a further 500ms
      if (this.attacking) {
        widow.takeDamage(enemyDamage);
        enemyDamageDelay = 1500;
      } else {
        enemyDamageDelay = 500;
      }
      this.attacking = true;
      enemyTimer = millis();
    }
  }

  bossShoot() {
    // Spawn arrows every few seconds
    if (millis() > arrowTimer + arrowFireDelay) {
      arrows.push(new BossArrow(this.x, this.y));
      arrowTimer = millis();
      arrowFireDelay = 1500;

      // Randomise delay
      arrowFireDelay += random(-500, 500);
    }
  }

  takeDamage(damage) {
    this.health -= damage;

    // Die if health gets below 0
    if (this.health <= 0) {
      totalKills++;
      
      // Move sprite far away in case it is not removed
      this.char.position.y = 10000;
      
      // Attempt to remove sprite - did not always work
      this.char.remove();
      
      if (this.boss) {
        pauseMode = VICTORY;
      } else {
        print(totalKills + "/" + requiredKills + " Kills");
      }
      enemies.splice(this, 1);
    }
  }
}