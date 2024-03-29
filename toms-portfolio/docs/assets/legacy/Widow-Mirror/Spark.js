// Spark Class
//-Sparks are spawned by bullet collisions and are visual only

let sparkTime = 500;
const normalSpark = 0;
const bloodSpark = 1;

let sparkSize = 13;
let bloodSparkSize = 16;


class Spark {
  constructor(xPos, yPos, size, type) {
    this.x = xPos;
    this.y = yPos;
    this.size = size;
    this.timer = 0;
    this.type = type;
  }

  show() {
    this.timer += 1 * deltaTime;
    
    if (this.type == normalSpark) {
        fill(252, 211, 3);
    } else if (this.type == bloodSpark) {
      fill(194, 38, 27);
    }
    
    circle(this.x, this.y, this.size);
  }
}