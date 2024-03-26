// Widow Copy class
//-Copies main widow's actions, states, and animations

let widowCharB;
let animTimeB = 0;

class WidowCopy {
  constructor(widow = new Widow()) {
    this.x = widow.x + 575;
    this.y = widow.y;
    this.size = 60;
    this.xVel = 0;
    this.yVel = 0;
    this.state = widow.state;

    // Remove past self (on reset)
    if (widowCharB) {
      widowCharB.remove();
    }

    // Initialise Character
    widowCharB = createSprite(this.x, this.y, this.size, this.size);
    widowCharB.scale = 1.4;
    standAnimB.offY = -6;
    standAnimB.offX = -2;
    widowCharB.addAnimation("stand", standAnimB);
    
    this.sprite = widowCharB;
  }

  update() {
    // Mirror main character's location
    this.x = -widow.x + 800;
    this.y = widow.y;

    // State is always the same as widow
    this.state = widow.state;

    // Move model & apply walking "animation"
    if (this.state == WALK && millis() > animTimeB + animDelay) {
      widowCharB.position.y = this.y - stepHeight;
      animTimeB = millis();
    } else {
      widowCharB.position.y = this.y;
    }
    widowCharB.position.x = this.x;
  }

  show() {
    fill(255);

    // Debug circle - represents hitbox
    //circle(this.x, this.y, this.size);
    
    // Draw p5.play sprite
    drawSprite(this.sprite);
  }

  shoot() {
    if (!facingMiddle) {
      bullets.push(new Bullet(this.x + bulletOffX,
        this.y + bulletOffY, !facingMiddle, 1));
    } else {
      bullets.push(new Bullet(this.x - bulletOffX,
        this.y + bulletOffY, !facingMiddle, 1));
    }
  }
}