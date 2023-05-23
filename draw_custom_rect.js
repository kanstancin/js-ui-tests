const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const { formatTitle } = require("./utils/format-title");

const width = 1200;
const height = 627;
const canvas = createCanvas(width, height);
// var canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");


context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

// rect start
const roundRect_ = function (x, y, w, h, r, lw) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.strokeStyle = "rgb(248,21,21)";
  // this.strokeStyle = "#0f0";
  this.fillStyle = "rgba(255, 0, 0, .15)";
  this.lineWidth = lw;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  this.stroke();
  //this.fill()
  return this;
}
const imposeBBoxArray = function (context, bBoxArray) {
  const bBoxNum = bBoxArray.length;
  for (let i = 0; i < bBoxNum; i++) {
      let [x, y, w, h] = bBoxArray[i];
      roundRect_.call(context, x, y, w, h, 10, 5);
  }
}

const testImagePath = '/Users/kanstantsin/Downloads/20230502_101904.jpg';
const jpgImageBase64 = fs.readFileSync(testImagePath, {
  encoding: 'base64',
});
loadImage('data:image/jpg;base64,' + jpgImageBase64).then((image) => {
  // p5.Image
  context.drawImage(image, 0,0, width, height);
  const bBoxArray = [[400, 88, 400, 30], [300, 300, 20, 70]];
  imposeBBoxArray(context, bBoxArray);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./image.png", buffer);
});



