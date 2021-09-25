let $start = $("#start-btn");
let countdown;
let timeLeft = 300 / reduceTimeScale;

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

const timer = () => {
  if (timeLeft > 0) {
    timeLeft--;
    $(".time-left").text(timeLeft);
  } else {
    clearInterval(timeCounter);
    timeLeft = 60;
    console.log("times up");
  }
};

const startButton = () => {
  startGame = true;
  closeModal($(".instructions-modal"));
  $("#overlay").css("opacity", "0");
  timeCounter = setInterval(timer, 1000);
};

$start.on("click", startButton);

$(".close-button").each(function () {
  $(this).on("click", function () {
    const modal = $(this).closest(".modal");
    closeModal(modal);
  });
});

$(".next").on("click", function () {
  const page1 = $(".page1");
  closeModal(page1);
});

$(".previous").on("click", function () {
  const page1 = $(".page1");
  openModal(page1);
});

function closeModal(modal) {
  if (modal == null) return;
  modal.css("transform", "scale(0)");
}

function openModal(modal) {
  if (modal == null) return;
  modal.css("transform", "translate(-50%, -50%) scale(1)");
}

updateTime();
updateCash();
updateSeeds();
updateGrapes();
updateBottles();
