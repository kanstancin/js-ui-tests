var http = require('http');
var fs = require('fs');
const {formatTitle} = require("./utils/format-title");
const {createCanvas, loadImage} = require("canvas");

const PORT= 8080;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        const { createCanvas, loadImage } = require("canvas");
        const fs = require("fs");

        const { formatTitle } = require("./utils/format-title");

        const post = {
          title: "Draw and save images with Canvas and Node",
          author: "Sean C Davis",
        };
        // Move the title formatter up farther because we're going to
        // use it to set our Y values.
        const titleText = formatTitle(post.title);

        const width = 1200;
        const height = 627;
        const imagePosition = {
          w: 400,
          h: 88,
          x: 400,
            // Calculate the Y of the image based on the number of
            // lines in the title.
            y: titleText.length === 2 ? 75 : 100,
        };
        // Do the same with the title's Y value.
        const titleY = titleText.length === 2 ? 300 : 350;
        const titleLineHeight = 100;
        // And the author's Y value.
        const authorY = titleText.length === 2 ? 525 : 500;

        const canvas = createCanvas(width, height);
        const context = canvas.getContext("2d");

        context.fillStyle = "#764abc";
        context.fillRect(0, 0, width, height);

        context.font = "bold 70pt 'PT Sans'";
        context.textAlign = "center";
        context.fillStyle = "#fff";

        context.fillText(titleText[0], 600, titleY);
        if (titleText[1]) context.fillText(titleText[1], 600, titleY + titleLineHeight);

        context.font = "40pt 'PT Sans'";
        context.fillText(`by ${post.author}`, 600, authorY);


        // rect start
        const roundRect_ = function (x, y, w, h, r, lw) {
          if (w < 2 * r) r = w / 2;
          if (h < 2 * r) r = h / 2;
          this.lineWidth = lw;
          this.beginPath();
          this.moveTo(x+r, y);
          this.arcTo(x+w, y,   x+w, y+h, r);
          this.arcTo(x+w, y+h, x,   y+h, r);
          this.arcTo(x,   y+h, x,   y,   r);
          this.arcTo(x,   y,   x+w, y,   r);
          this.closePath();
          return this;
        }
        // Draw using 5px for border radius on all sides
        // stroke it but no fill
        const { w, h, x, y } = imagePosition;
        context.strokeStyle = "rgb(255, 0, 0)";
        // context.strokeStyle = "#0f0";
        context.fillStyle = "rgba(255, 0, 0, .15)";
        // context.beginPath();
        roundRect_.call(context, x, y, w, h, 10, 5);
        context.stroke();
        context.fill();

        loadImage("./assets/logo.png").then((image) => {
          const { w, h, x, y } = imagePosition;
          context.drawImage(image, x, y, w, h);

          const buffer = canvas.toBuffer("image/png");
          fs.writeFileSync("./image.png", buffer);
        });


        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(PORT);
});