/**
 * WIDOW MIRROR
 *   by Tom Hunter 
 *
 * Black Widow is in cinemas 6th November 2020
 * Trailer: https://youtu.be/ybji16u608U
 * 
 * CONTROLS:
 * -Move with WASD or arrow-keys
 * -Jump with W or Up-Arrow
 * -Shoot with SPACE, S, or Down-Arrow
 *
 * REFERENCES:
 * -Title image and concept from https://youtu.be/RxAtuMu_ph4?t=45
 * -Font from 
 * https://www.dafont.com/retro-gaming.font?text=widow+%7C+mirror&back=bitmap
 * -Music from https://www.zapsplat.com/music/last-chance-heavy-weight-tension
 * fulled-music-bed-with-heavy-kick-drum-and-other-drums-dark-arpeggio-and-piano/
 * -Gun SFX from 
 * https://www.zapsplat.com/music/gun-pistol-single-shot-silenced-walther-pp7/
 * -Beep SFX http://freesoundeffect.net/sound/printerbutton-389-sound-effect
 * -Hit SFX from https://www.zapsplat.com/music/female-crying-of-pain-8/
 * -Vector angle formula (for arrows) from https://gist.github.com/conorbuck/2606166
 * -Character sprites from my talented partner Bec.
 *
 */

// Game states
const MENU = 0;
const PLAY = 1;
let gameMode;

// Play sub-states
const INTRO = 0;
const START = 1;
const BOSS = 2;
let playMode;

// Start sub-states
const UNPAUSED = 0;
const PAUSED = 1;
const GAMEOVER = 2;
const VICTORY = 3;
let pauseMode;

// Preloads
let bgImage;
let music;
let pistolSFX;
let hitSFX = [];
let arrowimg;
let enemySprite;
let bossSprite;

// Entities
let button;
let skipButton;
let resumeButton;
let menuButton;
let tryagainButton;
let speechBubbles;
let widow;
let widow2;
let bullets;
let sparks;
let enemies;
let boss;
let arrows;

// Enemy Variables 
let spawnPositions;
let maxEnemies = 3;
let randomSpawn = 0;
let spawnX;
let spawnY;
let enemySize = 60;
let bossSize = 75;
let bossHealth;

// Utility Variables
let health;
let totalKills;
let requiredKills;
let floorHeight = 60;
let speechBubbleNum;
let speechTime;
let speechDelay;

function preload() {
  // Load Images
  bgImage = loadImage("data/menubg.png");
  arrowimg = loadImage("data/arrow.png");

  // P5.play models
  standAnimA = loadAnimation('data/widowR.png');
  standAnimB = loadAnimation('data/widowB.png');
  enemySprite = loadAnimation('data/enemy.png');
  bossSprite = loadAnimation('data/taskmaster2.png');
  
  // Retro 8-Bit font
  font = loadFont("data/fonts/Retro_Gaming.ttf");

  // Audio
  music = loadSound('data/audio/music_zapsplat_last_chance.mp3');
  pistolSFX = loadSound('data/audio/silenced_pistol.mp3');
  beep = loadSound('data/audio/beep.mp3');
  hitSFX = [loadSound('data/audio/hit/hit1.mp3'),
    loadSound('data/audio/hit/hit2.mp3'),
    loadSound('data/audio/hit/hit3.mp3')
  ];
}

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textFont(font);

  // Instantiate Unchanged Variables
  floorHeight = height - floorHeight;
  spawnPositions = [
    createVector(-60, floorHeight),
    createVector(width / 2 + 75, -50),
    createVector(width / 2 - 75, -50),
    createVector(width + 60, floorHeight)
  ];

  // Set music volume
  music.amp(0.3);

  // Lower volume of SFX
  pistolSFX.amp(0.1);
  pistolSFX.rate(0.9);
  beep.rate(0.9);
  beep.amp(0.1);

  // Run reset function to prevent re-use of code
  reset();

  // Tidy up the console that prints many warnings
  print("\nPlease ignore these console warnings." +
    "\nThey were caused by p5.play, not me.\n\n\n\n\n\n");
}

function reset() {
  // Reset Variables
  bullets = [];
  sparks = [];
  enemies = [];
  arrows = [];
  gameMode = MENU;
  playMode = INTRO;
  pauseMode = UNPAUSED;
  health = 10;
  requiredKills = 15; // Adjust to get to boss easier
  totalKills = 0;
  bossHealth = 750;
  speechBubbleNum = 0;
  enemySpawnRate = 5000;
  speechDelay = 3000;
  speechTime = 0;
  spawnTime = 0;

  // (Re)Instantiate Entities
  widow = new Widow(75, 100);
  widow2 = new WidowCopy(725, height - 100);
  button = new Button(width / 2 - 100, height / 2 + 50, 200, 75, "START");
  skipButton = new Button(width - 150, height - 47.5, 125, 40, "Skip");
  resumeButton = new Button(width / 2 - 75, height / 2 - 20, 150, 60, "Resume");
  tryagainButton = new Button(width / 2 - 100, height / 2, 200, 75, "Try Again");
  menuButton = new Button(width / 2 - 100, height / 2, 200, 75,
    "Return to\nMain Menu");
  boss = new Enemy(width / 2, -50, bossSize,
    bossHealth, true);
  speechBubbles = [new SpeechBubble(50, 150, 350, 100, leftText,
      "So, are we going to\ntalk like grown-ups?"),
    new SpeechBubble(width / 2, 150, 350, 100, rightText,
      "Is zat what we are?"),
    new SpeechBubble(50, 150, 350, 100, leftText,
      "Wait. Did you hear\nthat!?"),
    new SpeechBubble(width / 2, 150, 350, 100, rightText,
      "Zey are coming."),
    new SpeechBubble(width / 2 - 250, 50, 500, 200, centreText,
      "WD or ARROWS to move.\nW/Up-Arrow to jump.\nSPACE to shoot.\nGood luck.")
  ];
}

function draw() {
  switch (gameMode) {
    case MENU:
      drawMenu();
      break;
    case PLAY:
      drawGame();
      break;
    case GAMEOVER:
      drawMenu();
      break;
    case VICTORY:
      break;
  }
}

function drawMenu() {
  background(230);
  textSize(50);
  image(bgImage, -40, 0, width + 40, height + 40);
  fill(255);
  text("widow | mirror", width / 2, height / 2 - 100);

  button.show();
}

function drawGame() {
  background(200);
  
  // Draw map
  strokeWeight(0);
  fill(210);
  rect(width / 2, 0, width, height);
  fill(235);
  strokeWeight(2);
  rect(1, floorHeight, width - 1, floorHeight - 2);

  // Draw and update widows
  if (pauseMode == UNPAUSED) {
    widow.update();
    widow2.update();
  }
  widow.show();
  widow2.show();

  if (playMode == INTRO) {
    skipButton.show();

    if (pauseMode == PAUSED) {
      speechTime = millis();
    }

    // Transition between speech bubbles
    if (millis() > speechTime + speechDelay) {
      speechBubbleNum++;
      speechTime = millis();
    }

    switch (speechBubbleNum) {
      //Always one click from start menu
      case 1:
        // Show the speech bubbles
        speechBubbles[0].show();
        // Move the widows
        widow.move(0.1);
        break;
      case 2:
        speechBubbles[1].show();
        speechDelay = 2000;
        widow.move(0.2);
        break;
      case 3:
        speechBubbles[2].show();
        // Stop moving
        widow.move(0);
        break;
      case 4:
        speechBubbles[3].show();
        break;
      case 5:
        // Give the player lots of time to digest the controls
        speechDelay = 7000;
        speechBubbles[4].show();
        break;
      case 6:
        // Start the game!
        playMode = START;
        spawnTime = millis();

        // Play music on loop
        music.loop();
        break;
    }

  } else {
    // Accept controls
    if (pauseMode == UNPAUSED) {
      moveControls();
    }

    // Draw Health-Bar
    let w = 250;
    let h = 10;
    let x = width / 2 - w / 2;
    let y = 20;
    let radius = 10;
    // Draw casing
    strokeWeight(2);
    fill(220, 0, 0);
    rect(x, y, w, h, radius);
    strokeWeight(1);
    //Draw health
    fill(0, 200, 0);
    if (health > 0) {
      rect(x, y, health * (w / 10) - 2, h - 1, radius, 0);
    }

    // Show Enemies
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].show();
      if (pauseMode == UNPAUSED) {
        if (!enemies[i].boss) {
          enemies[i].update();
        } else {
          enemies[i].bossShoot();
          enemies[i].bossUpdate();
        }
      }
    }

    // Show Bullets
    for (let i = 0; i < bullets.length; i++) {
      if (pauseMode == UNPAUSED) {
        bullets[i].update();
      }
      bullets[i].show();

      // Hit Detection - Destroy bullet if hit
      if (bullets[i].hit) {
        bullets.splice(i, 1);
      }
    }

    // Show Sparks
    for (let i = 0; i < sparks.length; i++) {
      sparks[i].show();

      // Destroy spark after time
      if (sparks[i].timer > sparkTime + second()) {
        sparks.splice(i, 1);
      }
    }

    // Spawn Enemies 
    //-Based on timer, enemy count, required kills, and states
    if (millis() > spawnTime + enemySpawnRate &&
      enemies.length < maxEnemies &&
      totalKills + enemies.length < requiredKills &&
      pauseMode == UNPAUSED && playMode == START) {
      // Select a random spawn position
      randomSpawn = floor(random(0, spawnPositions.length));
      spawnX = spawnPositions[randomSpawn].x;
      spawnY = spawnPositions[randomSpawn].y;

      // Spawn an enemy at this position
      enemies.push(new Enemy(spawnX, spawnY - enemySize / 2,
        enemySize, enemyHealth, false));

      // Spawn first enemy after longer period
      if (enemySpawnRate == 10000) {
        enemySpawnRate = 5000;
      }
      // Reduce the spawn rate with each spawn
      else if (enemySpawnRate > 2000) {
        enemySpawnRate -= 500;
      }
      spawnTime = millis();
    }

    // Show Boss Arrows
    for (let i = 0; i < arrows.length; i++) {
      if (pauseMode == UNPAUSED) {
        arrows[i].update();
      }
      arrows[i].show();

      // Hit Detection - Destroy arrow if hit
      if (arrows[i].hit) {
        arrows.splice(i, 1);
      }
    }

    // Game state changing
    if (health <= 0 && pauseMode != GAMEOVER) {
      pauseMode = GAMEOVER;
    }
    // Spawn the boss
    if (totalKills >= requiredKills && playMode != BOSS) {
      playMode = BOSS;
      enemies.push(boss);
    }
  }
  if (pauseMode == PAUSED) {
    fill(0);
    textSize(60);
    text("PAUSED", width / 2, height / 2 - 100);
    resumeButton.show();
  } else if (pauseMode == GAMEOVER) {
    fill(150, 0, 0);
    textSize(80);
    text("GAME OVER", width / 2, height / 2 - 100);
    tryagainButton.show();
  } else if (pauseMode == VICTORY) {
    fill(0, 150, 0);
    textSize(80);
    text("VICTORY", width / 2, height / 2 - 100);
    menuButton.show();
  }
}

// Character Movement Controls
function moveControls() {
  // Move Right
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    widow.move(1);
  }
  // Move Left
  else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    widow.move(-1);
  }
  // Stop Moving
  else {
    widow.move(0);
    moving = false;
  }
}

// Character Jump and Shoot Controls
function keyPressed() {
  if (playMode != INTRO && pauseMode == UNPAUSED) {
    // Jump
    if (keyCode == 87 || keyCode == UP_ARROW) {
      widow.jump();
    }
    // Shoot
    if (keyCode == 32 || keyCode == 83 ||
      keyCode == DOWN_ARROW) {
      if (millis() > bulletTimer + bulletDelay) {
        widow.shoot();
        widow2.shoot();
        bulletTimer = millis();
      }
    }
  }

  // Pause
  if (keyCode == 27) {
    if (gameMode == PLAY) {
      if (pauseMode == PAUSED) {
        pauseMode = UNPAUSED;
      } else if (pauseMode == UNPAUSED) {
        pauseMode = PAUSED;
      }
    }
  }
}

function mouseMoved() {
  // Handle Mouse-Movements for Buttons 
  if (button) { // Ensures this does not run before reset()
    button.handleMouseMoved(mouseX, mouseY);
    skipButton.handleMouseMoved(mouseX, mouseY);
    resumeButton.handleMouseMoved(mouseX, mouseY);
    tryagainButton.handleMouseMoved(mouseX, mouseY);
    menuButton.handleMouseMoved(mouseX, mouseY);
  }
}

function mouseClicked() {
  // Handle Mouse-Clicks for Buttons 
  if (button) { // Ensures this does not run before reset()
    button.handleMouseClicked();
    skipButton.handleMouseClicked();
    resumeButton.handleMouseClicked();
    tryagainButton.handleMouseClicked();
    menuButton.handleMouseClicked();
  }

  // Also handle clicking through speech bubbles in intro
  if (gameMode == PLAY && playMode == INTRO && pauseMode == UNPAUSED) {
    speechBubbleNum++;

    // Reset speech time with each click
    speechTime = millis();
  }
}
// Made by Tom Hunter