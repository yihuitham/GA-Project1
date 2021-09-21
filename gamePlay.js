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
          targetCrop.growGrapes();
          console.log(targetCrop);
        } else {
          console.log(targetCrop.grapesCount);
          character.grapes += targetCrop.grapesCount;
          $(".display-no-grapes").text(character.grapes);
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
    console.log("im in the oak!");
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
  }
}
