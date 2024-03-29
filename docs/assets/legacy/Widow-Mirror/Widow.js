// Main Character class
//-Can move, shoot, display animations, and take damage

// Utility Variables
let widowChar;

// Offsets
let bulletOffX = 35;
let bulletOffY = 10;

// Movement Variables
let speed = 4;
let jumpForce = 16;
let gravity = 0.7;
let jumping = false;
let jumpOffset = 1;
let middleBounds = 35;
let facingMiddle;

// States for animations only
const IDLE = 0;
const WALK = 1;

// Custom animation variables
let animDelay = 200;
let animTime = 0;
let stepHeight = 4;

class Widow {
  constructor(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
    this.xVel = 0;
    this.yVel = 0;
    this.size = 60;
    this.state = IDLE;
    facingMiddle = true;

    // Remove past self (on reset)
    if (widowChar) {
      widowChar.remove();
    }

    // Initialise Character
    widowChar = createSprite(this.x, this.y, this.size, this.size);
    widowChar.scale = 1.4;
    standAnimA.offY = -6;
    standAnimA.offX = -2;
    widowChar.mirrorX(-1);
    widowChar.addAnimation("stand", standAnimA);
    
    this.sprite = widowChar;
  }

  update() {
    // Move 
    this.x += this.xVel;
    this.y += this.yVel;

    // Y Boundaries
    if (this.y + this.size / 2 >= floorHeight) {
      this.y = floorHeight - this.size / 2;
      this.yVel = 0;
      jumping = false;
    }
    // Gravity
    else if (this.y + this.size / 2 < floorHeight) {
      this.yVel += gravity;
    }
    // X Boundaries
    if (this.x - this.size / 2 < 0) {
      this.xVel = 0;
      this.x = 0 + this.size / 2;
    } else if (this.x + this.size / 2 > width / 2 - middleBounds) {
      this.xVel = 0;
      this.x = width / 2 - middleBounds - (this.size / 2);
    }

    // State changing
    if (!jumping) {
      if (this.xVel == 0) {
        this.state = IDLE;
      } else {
        this.state = WALK;
      }
    } else {
      this.state = IDLE;
    }

    // Move model & apply walking "animation"
    if (this.state == WALK && millis() > animTime + animDelay) {
      widowChar.position.y = this.y - stepHeight;
      animTime = millis();
    } else {
      widowChar.position.y = this.y;
    }
    widowChar.position.x = this.x;
  }

  move(dir) {
    this.xVel = dir * speed;
    if (dir == 1) {
      facingMiddle = true;
      widowChar.mirrorX(-1);
      widowCharB.mirrorX(1);
    } else if (dir == -1) {
      facingMiddle = false;
      widowChar.mirrorX(1);
      widowCharB.mirrorX(-1);
    }
  }

  jump() {
    if (!jumping) {
      this.yVel -= jumpForce * jumpOffset;
      this.y += this.yVel;
      jumping = true;
    }
  }

  shoot() {
    // Play SFX
    pistolSFX.play();
    
    if (facingMiddle) {
      bullets.push(new Bullet(this.x + bulletOffX,
        this.y + bulletOffY, facingMiddle, 0));
    } else {
      bullets.push(new Bullet(this.x - bulletOffX,
        this.y + bulletOffY, facingMiddle, 0));
    }
  }

  show() {
    fill(200, 0, 0);
    
    // Debug circle - represents hitbox
    //circle(this.x, this.y, this.size);
    
    // Draw p5.play sprite
    drawSprite(this.sprite);
  }

  takeDamage(damage) {
    // Deal damage to the global health value
    health -= damage;
    
    // Play a random hit sound effect
    var hit = random(hitSFX);
    hit.rate(random(1, 1.2));
    hit.amp(random(0.3, 0.6));
    
    
    // Ensure health does not drop below 0
    if (health <= 0) {
      health = 0;
      
      // Louder SFX on death
      hit.rate(1.1);
      hit.amp(1);
      hit.play();
    }
    else {
      // Play the SFX
      hit.play();
    }
  }
}