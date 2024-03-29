// Button class
//-Generic class for all buttons

// Button states
const READY = 0;
const HOVER = 1;

class Button {
  constructor(xPos, yPos, width, height, label) {
    this.x = xPos;
    this.y = yPos;
    this.w = width;
    this.h = height;
    this.label = label;
    this.state = READY;
    this.isShown = false;
  }

  handleMouseMoved(mx, my) {
    // Detect if mouse is hovering over button
    let isOver = (mx > this.x && mx < this.x + this.w &&
      my > this.y && my < this.y + this.h);

    if (this.state == READY && isOver && this.isShown) {
      // Don't allow hover on the skip button
      // if the user has paused during the intro
      if (pauseMode != PAUSED || this.label == "Resume") {
        this.state = HOVER;
      }

    } else if (this.state == HOVER && !isOver && this.isShown) {
      this.state = READY;
    }
  }

  handleMouseClicked() {
    if (this.state == HOVER && this.isShown) {
      // Start playing the game!
      if (this.label == "START") {
        gameMode = PLAY;
      }
      // Unpause
      else if (this.label == "Resume") {
        pauseMode = UNPAUSED;

        // Prevent resume from skipping speech
        speechBubbleNum--;
      }
      // Skip intro
      else if (this.label == "Skip") {
        // Start the game
        playMode = START;

        music.stop();
        music.loop();

        // Reset the spawn timer
        spawnTime = millis();
      }
      // Reset
      else if (this.label == "Return to\nMain Menu") {
        // Reset to main menu
        music.stop();
        reset();
        print("Game reset. Great work.");
      } else if (this.label == "Try Again") {
        // Reset to start of game
        music.stop();
        reset();
        gameMode = PLAY;
        playMode = INTRO;
        print("Game reset. Better luck this time.");
      }
    }
  }

  show() {
    push();
    this.isShown = true;
    textSize(20);
    // Draw button
    translate(this.x, this.y);
    fill(0);
    rect(0, 0, this.w, this.h);
    fill(200, 0, 0);
    // Green victory button
    if (pauseMode == VICTORY) {
      fill(0, 200, 0);
    }
    rect(5, 5, this.w - 10, this.h - 10);
    fill(0);

    // Change look of button on hover
    if (this.state == HOVER) {
      // Draw unique hover for start button
      if (this.label == "START") {
        fill(0);
        rect(0, 44, this.w, this.h / 2);
        fill(255);
        push();
        translate(this.w / 2, this.h / 2 + 16);
        rotate(PI);
        text("TRATS", 0, 0);
        pop();
        fill(0);
      }
      // Other buttons get white text
      else {
        fill(255);
      }
    }

    // Draw the main text
    text(this.label, this.w / 2, this.h / 2 - 5);
    pop();
  }
}