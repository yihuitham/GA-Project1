$(".cash").text(`$ ${character.cash}`);
$(".display-no-grapes").text(character.grapes);
$(".display-no-bottles").text(character.bottles);

let $start = $("#start-button");
let timeCounter;
let time = 0;
let timeLimit = 3;

const timer = () => {
  if (time < timeLimit) {
    time++;
    $(".time-left").text(time);
  } else {
    clearInterval(timeCounter);
    time = 0;
    console.log("times up");
  }
};

const startButton = () => {
  timeCounter = setInterval(timer, 1000);
};

$start.on("click", startButton);
