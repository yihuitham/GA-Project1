let noOfCrops = 8;
let maxNoOfGrapesOnVine = 10;

$(() => {
  function setUpCropsAndGrapes() {
    for (let i = 0; i < noOfCrops; i++) {
      let crop = $("<div>").addClass("crop");
      $(".field").append(crop);
      for (let i = 0; i < maxNoOfGrapesOnVine; i++) {
        let grape = $("<img>").attr(
          "src",
          "https://image.flaticon.com/icons/png/512/2431/2431996.png"
        );
        grape.addClass("grape");
        crop.append(grape);
      }
    }
  }

  setUpCropsAndGrapes();
  console.log("All crops?", $(".crop"));

  let grapesCount = 0;
  var interval = setInterval(function () {
    if (grapesCount === maxNoOfGrapesOnVine) {
      clearInterval(interval);
    }

    let crop = $(".field").children().eq(1);
    let grape = crop.children().eq(grapesCount);
    grape.addClass("grown");
    grapesCount += 1;
  }, 1000);
});
