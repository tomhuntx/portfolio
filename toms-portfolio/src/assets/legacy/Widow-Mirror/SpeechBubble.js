// Button class
//-Generic class for speech bubbles
const leftText = 0;
const rightText = 1;
const centreText = 2;

// Text Timing Variables
let timer = 0;
let sentIndex = 0;
let textDelay = 60; // Delay between characters (ms)

class SpeechBubble {
  constructor(xPos, yPos, width, height, type, label) {
    this.x = xPos;
    this.y = yPos;
    this.w = width;
    this.h = height;
    this.toWrite = label;
    this.text = "";
    this.type = type;
  }

  show() {
    push();
    if (this.type == leftText) {
      textAlign(LEFT, CENTER);
    } else if (this.type == rightText) {
      textAlign(RIGHT, CENTER);
    } else if (this.type == centreText) {
      textAlign(CENTER, CENTER);
    }
    textSize(25);
    translate(this.x, this.y);
    fill(0);
    // Draw the main text
    //text(this.toWrite, 0, 0, this.w, this.h);

    // Reset the sentence index at the start of each text
    if (this.text == "") {
      sentIndex = 1;
    }

    // Pause timer when the game is paused
    if (pauseMode == PAUSED) {
      timer = millis();
    }
    // Heavily re-purposed char writer
    if (millis() >= timer + textDelay && sentIndex - 1 < this.toWrite.length) {
      // Reset timer
      timer = millis();
      this.text = this.toWrite.substr(0, sentIndex++);

      // Play a beep sound when all text but spaces are spoken
      if (this.toWrite.charAt(sentIndex) != " ") {
        beep.play();
      }
    }
    text(this.text, 0, 0, this.w, this.h);

    pop();
  }
}