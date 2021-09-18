var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//crop variables
var cropRowCount = 2;
var cropColumnCount = 4;
var cropWidth = 100;
var cropHeight = 100;
var cropPadding = 15;
var cropOffsetTop = 285;
var cropOffsetLeft = 35;
var crops = [];
for (var c = 0; c < cropColumnCount; c++) {
  crops[c] = [];
  for (var r = 0; r < cropRowCount; r++) {
    crops[c][r] = { x: 0, y: 0 };
    console.log(crops[c][r]);
  }
}

//character variables
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

const drawCrops = () => {
  for (var c = 0; c < cropColumnCount; c++) {
    for (var r = 0; r < cropRowCount; r++) {
      var cropX = c * (cropWidth + cropPadding) + cropOffsetLeft;
      var cropY = r * (cropWidth + cropPadding) + cropOffsetTop;
      crops[c][r].x = cropX;
      crops[c][r].y = cropY;
      ctx.beginPath();
      ctx.rect(cropX, cropY, cropWidth, cropHeight);
      ctx.fillStyle = "#9F2B68";
      ctx.fill();
      ctx.closePath();
    }
  }
};

// const draw = () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawCrops();
// };
// // var interval = setInterval(draw, 10);
// draw();

window.addEventListener("keydown", keyDownListener);
function keyDownListener(event) {
  keyPresses[event.key] = true;
  console.log(keyPresses);
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

loadImage();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCrops();

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
