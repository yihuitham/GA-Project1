var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//variables to draw and move character
const SCALE = 0.75;
const WIDTH = 64;
const HEIGHT = 64;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 2, 3];
const FACING_DOWN = 0;
const FACING_LEFT = 1;
const FACING_RIGHT = 2;
const FACING_UP = 3;
const FRAME_LIMIT = 12;
const MOVEMENT_SPEED = 2;
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;
let img = new Image();

//character properties
const character = {
  cash: 5,
  seeds: 3,
  grapes: 0,
  bottles: 0,
};

window.addEventListener("keydown", keyDownListener);
function keyDownListener(event) {
  if (event.which === 32) {
    plantOrHarvest();
  } else {
    keyPresses[event.key] = true;
    console.log(keyPresses);
  }
}

window.addEventListener("keyup", keyUpListener);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

function loadImage() {
  img.src = "character.png";
  img.onload = function () {
    window.requestAnimationFrame(gameLoop);
  };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    img,
    frameX * WIDTH,
    frameY * HEIGHT,
    WIDTH,
    HEIGHT,
    canvasX,
    canvasY,
    SCALED_WIDTH,
    SCALED_HEIGHT
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;

  if (keyPresses.w || keyPresses.ArrowUp) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  } else if (keyPresses.s || keyPresses.ArrowDown) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
  }

  if (keyPresses.a || keyPresses.ArrowLeft) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  } else if (keyPresses.d || keyPresses.ArrowRight) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }

  if (!hasMoved) {
    currentLoopIndex = 0;
  }

  drawFrame(
    CYCLE_LOOP[currentLoopIndex],
    currentDirection,
    positionX,
    positionY
  );
  window.requestAnimationFrame(gameLoop);
}
function moveCharacter(deltaX, deltaY, direction) {
  if (
    positionX + deltaX > 0 &&
    positionX + SCALED_WIDTH + deltaX < canvas.width
  ) {
    positionX += deltaX;
  }
  if (
    positionY + deltaY > 0 &&
    positionY + SCALED_HEIGHT + deltaY < canvas.height
  ) {
    positionY += deltaY;
  }
  currentDirection = direction;
}

loadImage();
