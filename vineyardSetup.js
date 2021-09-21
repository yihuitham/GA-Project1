//crop variables
const cropRowCount = 2;
const cropColumnCount = 4;
const cropWidth = 100;
const cropHeight = 100;
const cropPadding = 15;
const cropOffsetTop = 297.5;
const cropOffsetLeft = 20;
const maxNoOfGrapesOnVine = 10;
let crops = [];
let crops1dArray = [];
const grapeGrowTime = 5000;

function setUpCropDiv(c, r, x, y) {
  let cropDiv = $("<div>").addClass(`crop ${c}${r}`);
  cropDiv.css({ left: x, top: y });
  $(".field").append(cropDiv);
  return cropDiv;
}

function setUpGrapesDiv(cropDiv) {
  for (let i = 0; i < maxNoOfGrapesOnVine; i++) {
    let grape = $("<img>").attr(
      "src",
      "https://image.flaticon.com/icons/png/512/2431/2431996.png"
    );
    grape.addClass("grape");
    cropDiv.append(grape);
  }
}

for (let c = 0; c < cropColumnCount; c++) {
  crops[c] = [];
  for (let r = 0; r < cropRowCount; r++) {
    let cropX = c * (cropWidth + cropPadding) + cropOffsetLeft;
    let cropY = r * (cropWidth + cropPadding) + cropOffsetTop;
    let cropDiv = setUpCropDiv(c, r, cropX, cropY);
    setUpGrapesDiv(cropDiv);
    crops[c][r] = {
      x: cropX,
      y: cropY,
      div: cropDiv,
      seed: false,
      grapesCount: 0,
      grapeInterval: function () {
        console.log("yayyyyy");
        grapeGrowInterval = setInterval(function () {
          if (this.seed && this.grapesCount < maxNoOfGrapesOnVine) {
            let grape = this.div.children().eq(this.grapesCount);
            grape.addClass("grown");
            this.grapesCount++;
            if (this.grapesCount === maxNoOfGrapesOnVine) {
              clearInterval(interval);
            }
          } else {
            clearInterval(grapeGrowInterval);
          }
        }, grapeGrowTime);
      },
    };
    crops1dArray.push(crops[c][r]);
  }
}
console.log("1d Array ", crops1dArray);

$(".crop").on("click", function (e) {
  console.log($(e.target).attr("class"));
}); //doesnt work because of canvas overlay
