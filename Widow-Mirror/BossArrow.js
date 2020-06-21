// Boss Arrow Class
//-Arrows shot by boss

// Movement Variables
let arrowSpeed = 5.5;
let arrowDrop = 2;
let arrowDamage = 1.5;

// Use to turn boss sprite
const left = 0;
const right = 1;

class BossArrow {
  constructor(xPos, yPos) {
    this.x = xPos;
    this.y = yPos - 15;
    this.size = 5;
    this.xVel = 0;
    this.yVel = 0;
    this.hit = false;
    this.rotation = 0;

    // Pick a random starting velocity
    /*
    this.xVel = random(-1, 1);
    this.yVel = random(-1, 1);
    this.xVel *= arrowSpeed;
    */

    // Get the random distance from both widows
    let randomOffset = random(-1, 1);
    let distA = dist(this.x, this.y, widow.x + randomOffset, widow.y);
    let distB = dist(this.x, this.y, widow2.x, widow2.y);

    // Decide on closest widow
    if (distA < distB) {
      this.target = createVector(widow.x, widow.y);
      
      // Turn boss left when shooting left
      boss.turnBoss(left);
    } else {
      this.target = createVector(widow2.x, widow2.y);
      
      // Turn boss right when shooting right
      boss.turnBoss(right);
    }
    let target = this.target;

    // angle in degrees
    //Thanks to: https://gist.github.com/conorbuck/2606166
    this.rotation = Math.atan2(target.y - this.y, target.x - this.x) * 180 / Math.PI;

    // Aim roughly for the head (and acount for gravity)
    target.y -= random(25, 35);

    // Get the direction from the boss to the target
    var direction = createVector(target.x - this.x, target.y - this.y);

    // Normalize the direction
    direction.normalize();

    // Apply the velocity in the direction
    this.xVel = arrowSpeed * direction.x * 0.1 * deltaTime;
    this.yVel = arrowSpeed * direction.y * 0.1 * deltaTime;
    
  }

  update() {
    // Move
    this.x += this.xVel;
    this.y += this.yVel;

    this.yVel += 0.001 * arrowDrop * deltaTime;

    // Hit Detection - Widows
    let d = dist(this.x, this.y, widow.x, widow.y);
    let d2 = dist(this.x, this.y, widow2.x, widow2.y);

    if (d < widow.size / 2 || d2 < widow.size / 2) {
      this.collide(bloodSpark);
      widow.takeDamage(arrowDamage);
    }

    // Boundaries
    // Left X Bounds
    if (this.x <= 0 + 2) {
      // Ensure final position is correct
      if (this.x >= width / 2) {
        this.x = width / 2;
      }
      this.collide(normalSpark);
    }
    // Right X Bounds
    if (this.x >= width - 2) {
      // Ensure final position is correct
      if (this.x <= width / 2) {
        this.x = width / 2;
      }
      this.collide(normalSpark);
    }
    // Floor Bounds
    if (this.y >= floorHeight) {
      // Ensure final position is correct
      this.y = floorHeight;
      this.collide(normalSpark);
    }
  }

  show() {
    push();
    fill(0);
    // Arrow's hitbox
    //circle(this.x, this.y, this.size);

    translate(this.x, this.y);

    // Rotate the arrow
    if (this.xVel < 0) {
      rotate(radians(this.rotation - PI));
    } else {
      rotate(radians(this.rotation));
    }
    // Center image
    imageMode(CENTER);

    // Draw arrow
    image(arrowimg, 0, 0);
    pop();
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