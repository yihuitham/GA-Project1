function plantOrHarvest() {
  for (let i = 0; i < crops1dArray.length; i++) {
    let targetCrop = crops1dArray[i];
    if (
      positionX > targetCrop.x &&
      positionX < targetCrop.x + cropWidth &&
      positionY > targetCrop.y &&
      positionY < targetCrop.y + cropHeight
    ) {
      if (character.seeds > 0) {
        if (!targetCrop.seed) {
          targetCrop.seed = true;
          character.seeds--;
          updateSeeds();
          targetCrop.growGrapes();
          console.log(targetCrop);
        } else {
          console.log("bla bla", targetCrop.grapesCount);
          character.grapes += targetCrop.grapesCount;
          updateGrapes();
          targetCrop.seed = false;
          targetCrop.removeGrapes();
          targetCrop.grapesCount = 0;
          console.log(targetCrop.grapesCount);
        }
      }
    }
  }
}

function ageOrBottleWine() {
  if (
    positionX > oakX &&
    positionX < oakX + amenitySize &&
    positionY > oakY &&
    positionY < oakY + amenitySize
  ) {
    if (character.grapes > 9) {
      console.log("processing grapes");
      let groupsofTen = Math.floor(character.grapes / 10);
      let grapesToProcess = groupsofTen * 10;
      character.grapes -= grapesToProcess;
      updateGrapes();
      $(".oaks").children().eq(groupsofTen).addClass("fill");
    }
  }
}

function takeBottles() {
  if (
    positionX > crateX &&
    positionX < crateX + amenitySize &&
    positionY > crateY &&
    positionY < crateY + amenitySize
  ) {
    console.log("im in the crate!");
  }
}

function buy() {
  if (
    positionX > buyX &&
    positionX < buyX + amenitySize &&
    positionY > buyY &&
    positionY < buyY + amenitySize
  ) {
    console.log("im shopping!");
    $(".buy-modal").css("transform", "translate(-50%, -50%) scale(1)");
    $("#buy-submit").on("click", function () {
      let buySeeds = parseInt($("#seeds-qty").val());
      if (buySeeds <= character.cash) {
        character.seeds += buySeeds;
        character.cash -= buySeeds;
        updateCash();
        updateSeeds();
        $(".buy-modal").css("transform", "scale(0)");
      } else {
        $("p").css("transform", "scale(1)");
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
    $(".sell-modal").css("transform", "translate(-50%, -50%) scale(1)");
    $("#sell-submit").on("click", function () {
      console.log("sell!!!");
      let sellGrapes = parseInt($("#grapes-qty").val() || 0);
      let sellBottles = parseInt($("#bottles-qty").val() || 0);
      console.log(sellGrapes, sellBottles);
      if (sellGrapes <= character.grapes && sellBottles <= character.bottles) {
        character.grapes -= sellGrapes;
        character.bottles -= sellBottles;
        console.log(sellGrapes, sellBottles);
        character.cash += sellGrapes * 2 + sellBottles * 30;
        updateCash();
        updateGrapes();
        updateBottles();
        $(".sell-modal").css("transform", "scale(0)");
      } else {
        $(".sell-p").css("transform", "scale(1)");
      }
    });
  }
}
