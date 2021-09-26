let $start = $("#start-btn");
let $next = $(".next");
let $previous = $(".previous");
let $close = $(".close-button");
let $restart = $("#reset-btn");
let timeCounter;
let countdown;
let timeLeft = 300; //in seconds

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
    // console.log("timeLeft: ", timeLeft);
  } else {
    clearInterval(timeCounter);
    console.log("times up");
    startGame = false;
    $("#overlay").show();
    $("#points").text(`$ ${character.cash}`);
    compareScores();
    $("#highscore").text(`$ ${window.localStorage.highscore}`);
    $(".game-over-modal").show();
  }
}

function startButton() {
  startGame = true;
  $(".instructions-modal").hide();
  $("#overlay").hide();
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

function compareScores() {
  let highscore = window.localStorage.getItem("highscore");

  !highscore || character.cash > highscore
    ? window.localStorage.setItem("highscore", cash)
    : null;
}

$start.on("click", startButton);

$close.each(function () {
  $(this).on("click", function () {
    const modal = $(this).closest(".modal");
    modal.hide();
  });
});

$next.on("click", function () {
  $(".page1").hide();
  $(".page2").show();
});

$previous.on("click", function () {
  $(".page2").hide();
  $(".page1").show();
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
