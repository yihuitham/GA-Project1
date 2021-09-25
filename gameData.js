let $start = $("#start-btn");
let $next = $(".next");
let $previous = $(".previous");
let $close = $(".close-button");
let $restart = $("#reset-btn");
let countdown;
let timeLeft = 300 / reduceTimeScale / 10;

function updateTime() {
  $(".time-left").text(timeLeft);
}

function updateCash() {
  $(".cash").text(`$ ${character.cash}`);
}

function updateSeeds() {
  $(".seeds").text(character.seeds);
}

function updateGrapes() {
  $(".display-no-grapes").text(character.grapes);
}

function updateBottles() {
  $(".display-no-bottles").text(character.bottles);
}

function timer() {
  if (timeLeft > 0) {
    timeLeft--;
    $(".time-left").text(timeLeft);
  } else {
    clearInterval(timeCounter);
    timeLeft = 60;
    console.log("times up");
    startGame = false;
    $("#overlay").css("opacity", "1");
    openModal($(".game-over-modal"));
  }
}

function startButton() {
  startGame = true;
  closeModal($(".instructions-modal"));
  $("#overlay").css("opacity", "0");
  timeCounter = setInterval(timer, 1000);
}

function closeModal(modal) {
  if (modal == null) return;
  modal.css("transform", "scale(0)");
}

function openModal(modal) {
  if (modal == null) return;
  modal.css("transform", "translate(-50%, -50%) scale(1)");
}

$start.on("click", startButton);

$close.each(function () {
  $(this).on("click", function () {
    const modal = $(this).closest(".modal");
    closeModal(modal);
  });
});

$next.on("click", function () {
  const page1 = $(".page1");
  closeModal(page1);
});

$previous.on("click", function () {
  const page1 = $(".page1");
  openModal(page1);
});

$restart.on("click", function () {
  const gameOver = $(".game-over-modal modal");
  closeModal(gameOver);
  location.reload();
});

updateTime();
updateCash();
updateSeeds();
updateGrapes();
updateBottles();
