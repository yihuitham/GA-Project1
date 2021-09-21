let grapeGrowInterval;

function plantOrHarvest() {
  for (let i = 0; i < crops1dArray.length; i++) {
    let crop = crops1dArray[i];
    if (
      positionX + SCALED_WIDTH / 2 > crop.x &&
      positionX + SCALED_WIDTH / 2 < crop.x + cropWidth &&
      positionY + SCALED_HEIGHT > crop.y &&
      positionY + SCALED_HEIGHT < crop.y + cropHeight
    ) {
      crop.seed = true;
      // console.log(crop);
    }
  }
}

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
          targetCrop.grapeInterval();
          console.log(targetCrop);
        } else {
          targetCrop.grapeInterval();
          character.grapes += targetCrop.grapesCount;
          targetCrop.grapesCount = 0;
          targetCrop.seed = false;
          console.log(targetCrop.grapesCount);
        }

        // if (targetCrop.seed) {
        //   console.log(targetCrop.grapesCount);
        //   clearInterval(grapeGrowInterval);
        //   character.grapes += targetCrop.grapesCount;
        //   targetCrop.grapesCount = 0;
        //   targetCrop.seed = false;
        //   console.log(targetCrop.grapesCount);
        //   console.log(character);
        // } else {
        //   console.log(character.seeds);
        //   targetCrop.seed = true;
        //   character.seeds--;
        //   growGrapes(targetCrop);
        //   console.log(character.seeds);
        // }
      }
    }
  }
}

// function growGrapes(targetCrop) {
//   grapeGrowInterval = setInterval(function () {
//     if (targetCrop.grapesCount < maxNoOfGrapesOnVine) {
//       let grape = targetCrop.div.children().eq(targetCrop.grapesCount);
//       grape.addClass("grown");
//       targetCrop.grapesCount++;
//       if (targetCrop.grapesCount === maxNoOfGrapesOnVine) {
//         clearInterval(interval);
//       }
//       console.log(targetCrop);
//     } else {
//       clearInterval(grapeGrowInterval);
//     }
//   }, grapeGrowTime);
// }
