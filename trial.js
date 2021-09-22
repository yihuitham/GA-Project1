// let noOfCrops = 8;
// let maxNoOfGrapesOnVine = 10;
// let cropArray = [];

// $(() => {
//   function setUpCropsAndGrapes() {
//     for (let i = 0; i < noOfCrops; i++) {
//       let crop = $("<div>").addClass(`crop ${i}`);
//       $(".field").append(crop);
//       for (let i = 0; i < maxNoOfGrapesOnVine; i++) {
//         let grape = $("<img>").attr(
//           "src",
//           "https://image.flaticon.com/icons/png/512/2431/2431996.png"
//         );
//         grape.addClass("grape");
//         crop.append(grape);
//       }
//     }
//   }

//   // setUpCropsAndGrapes();

//   function putCropsIntoArray() {
//     for (i = 0; i < noOfCrops; i++) {
//       let getDiv = $(".field")
//         .children()
//         .eq(i + 1); // plus one, because first child is <canvas>
//       cropArray[i] = { div: getDiv, seed: false, grapesCount: 0 };
//     }
//   }
//   putCropsIntoArray();

//   $(".crop").on("click", function (e) {
//     console.log($(e.target).attr("class"));
//     let className = $(e.target).attr("class");
//     let getIndex = cropArray.findIndex(
//       (element) => element.div.attr("class") === className
//     );
//     cropArray[getIndex].seed = true;
//     console.log(cropArray[getIndex].seed);
//   });

//   console.log(cropArray);

//   for (let i = 0; i < noOfCrops; i++) {
//     let targetCrop = cropArray[i];
//     var interval = setInterval(function () {
//       if (
//         targetCrop.seed === true &&
//         targetCrop.grapesCount < maxNoOfGrapesOnVine
//       ) {
//         let grape = targetCrop.div.children().eq(targetCrop.grapesCount);
//         grape.addClass("grown");
//         targetCrop.grapesCount++;
//         if (targetCrop.grapesCount === maxNoOfGrapesOnVine) {
//           clearInterval(interval);
//         }
//         console.log(targetCrop.div.children());
//         console.log(targetCrop.grapesCount);
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000);
//   }
// });

class Person {
  constructor(name) {
    this.name = name;
  }

  greet(stranger) {
    console.log("Hi ", stranger.name);
  }
}

let me = new Person("yihui");
let someone = new Person("blabla");
console.log(me.greet(someone));
