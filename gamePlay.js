let bottleAgingInterval;

function plantOrHarvest() {
  for (let i = 0; i < crops1dArray.length; i++) {
    let targetCrop = crops1dArray[i];
    if (
      positionX > targetCrop.x &&
      positionX < targetCrop.x + cropWidth &&
      positionY > targetCrop.y &&
      positionY < targetCrop.y + cropHeight
    ) {
      if (!targetCrop.seed && character.seeds > 0) {
        plantSeeds(targetCrop);
      } else {
        harvestGrapes(targetCrop);
      }
    }
  }
}

function plantSeeds(targetCrop) {
  targetCrop.seed = true;
  character.seeds--;
  updateSeeds();
  targetCrop.growGrapes();
  console.log(targetCrop);
}

function harvestGrapes(targetCrop) {
  console.log("bla bla", targetCrop.grapesCount);
  character.grapes += targetCrop.grapesCount;
  updateGrapes();
  targetCrop.seed = false;
  targetCrop.removeGrapes();
  targetCrop.grapesCount = 0;
  console.log(targetCrop.grapesCount);
}

function ageOrTakeWine() {
  if (
    positionX > oakX &&
    positionX < oakX + amenitySize &&
    positionY > oakY &&
    positionY < oakY + amenitySize
  ) {
    if (!oak.filled && character.grapes > 9) {
      ageGrapes();
    } else if (oak.aged) {
      takeWine();
    }
  }
}

function ageGrapes() {
  console.log("processing grapes");
  let amtOfGrapesToAge = character.grapes > 40 ? 40 : character.grapes;
  let groupsofTen = Math.floor(amtOfGrapesToAge / 10);
  let grapesToProcess = groupsofTen * 10;
  character.grapes -= grapesToProcess;
  updateGrapes();
  $(".oaks").children().eq(groupsofTen).addClass("fill");
  oak.filled = true;
  oak.wine = groupsofTen;
  setTimeout(function () {
    oak.aged = true;
  }, wineAgeTime);
}

function takeWine() {
  character.wine += oak.wine;
  oak.wine = 0;
  oak.filled = false;
  oak.aged = false;
  $(".oaks").children().removeClass("fill");
  console.log(character);
}

function bottleWineOrTake() {
  if (
    positionX > crateX &&
    positionX < crateX + amenitySize &&
    positionY > crateY &&
    positionY < crateY + amenitySize
  ) {
    console.log("im in the crate!");
    if (!crate.filled && character.wine > 0) {
      bottleWine();
    } else if (character.bottles === 0) {
      takeWineBottles();
    }
  }
}

function bottleWine() {
  console.log(crate);
  crate.filled = true;
  crate.bottles += character.wine;
  console.log(crate.bottles);
  character.wine = 0;
  $(".wine-crates").children().eq(crate.bottles).addClass("fill");
  bottleAgingInterval = setInterval(function () {
    crate.age++;
    // console.log(crate.age);
  }, bottleAgeTime);
}

function takeWineBottles() {
  clearInterval(bottleAgingInterval);
  console.log(crate.age);
  character.bottles += crate.bottles;
  character.bottleAge += crate.age;
  updateBottles();
  crate.bottles = 0;
  crate.age = 0;
  crate.filled = false;
  $(".wine-crates").children().removeClass("fill");
}

function buy() {
  if (
    positionX > buyX &&
    positionX < buyX + amenitySize &&
    positionY > buyY &&
    positionY < buyY + amenitySize
  ) {
    $(".buy-modal").show();
    $("#buy-submit").on("click", function () {
      console.log("im shopping!");
      console.log("Character's seeds before:", character.seeds);
      //get number of seeds player would like to buy
      let buySeeds = parseInt($("#seeds-qty").val());
      console.log("No. of seeds to buy:", buySeeds);
      console.log("Character's seeds before:", character.seeds);
      //if cash is sufficient, buy
      if (buySeeds <= character.cash) {
        //add seeds to character's inventory
        character.seeds += buySeeds;
        //deduct cash from character, 1 seed at $1
        character.cash -= buySeeds;
        updateCash();
        updateSeeds();
        console.log(`buySeeds ${buySeeds}`);
        console.log(`character.seeds ${character.seeds}`);
        $(".buy-modal").hide();
        $("#buy-submit").unbind("click");
      } else {
        //if cash is insufficient, pop up message
        $(".buy-p").show();
      }
    });
  }
}

function sell() {
  if (
    positionX > sellX &&
    positionX < sellX + amenitySize &&
    positionY > sellY &&
    positionY < sellY + amenitySize
  ) {
    console.log("im making money!");
    $(".sell-modal").show();
    $("#sell-submit").on("click", function () {
      console.log("sell!!!");
      let sellGrapes = parseInt($("#grapes-qty").val() || 0);
      let sellBottles = parseInt($("#bottles-qty").val() || 0);
      console.log(sellGrapes, sellBottles);
      if (sellGrapes <= character.grapes && sellBottles <= character.bottles) {
        character.grapes -= sellGrapes;
        character.bottles -= sellBottles;
        console.log(sellGrapes, sellBottles);
        character.cash +=
          sellGrapes * 2 + sellBottles * 30 + character.bottleAge * 5;
        updateCash();
        updateGrapes();
        updateBottles();
        $(".sell-modal").hide();
      } else {
        $(".sell-p").css("transform", "scale(1)");
      }
    });
  }
}
