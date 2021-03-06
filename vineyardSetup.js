//setting time intervals
let grapeGrowthTime = 5000; //in ms
let wineAgeTime = 20000; //in ms
let bottleAgeTime = 20000; //in ms

//amenities common variables
const amenitySize = 100; //width and height of amenities, 100x100

//buy shop variables
const buyX = 100;
const buyY = 0;

//sell shop variables
const sellX = 300;
const sellY = 0;

//wine crate variables
const crateX = 372.5;
const crateY = 100;
const crate = {
  filled: false,
  bottles: 0,
  age: 0,
};

//oak variables
const oakX = 372.5;
const oakY = 200;
const oak = {
  filled: false,
  wine: 0,
  aged: false,
};

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
//setting up the crops, aka brown background divs with grapes(hidden)
function setUpCropDiv(c, r, x, y) {
  let cropDiv = $('<div>').addClass(`crop ${c}${r}`);
  cropDiv.css({ left: x, top: y });
  $('.field').append(cropDiv);
  return cropDiv;
}

function setUpGrapesDiv(cropDiv) {
  for (let i = 0; i < maxNoOfGrapesOnVine; i++) {
    let grape = $('<img>').attr('src', 'img/grapes.png');
    grape.addClass('grape');
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
      growGrapes: function () {
        let grapeGrowInterval = setInterval(() => {
          if (this.seed && this.grapesCount < maxNoOfGrapesOnVine) {
            console.log('Lets grow some grapes!');
            let grape = this.div.children().eq(this.grapesCount);
            grape.addClass('grown');
            this.grapesCount++;
            if (this.grapesCount === maxNoOfGrapesOnVine) {
              clearInterval(grapeGrowInterval);
            }
          } else {
            clearInterval(grapeGrowInterval);
          }
        }, grapeGrowthTime);
      },
      removeGrapes: function () {
        console.log('Lets pick some grapes!', this);
        for (let i = 0; i < 10; i++) {
          let grape = this.div.children().eq(i);
          console.log('div', this.div);
          console.log('check', this.div.children().length);
          console.log(grape.attr('class'));
          grape.removeClass('grown');
        }
      },
    };
    crops1dArray.push(crops[c][r]);
  }
}
console.log('1d Array ', crops1dArray);
