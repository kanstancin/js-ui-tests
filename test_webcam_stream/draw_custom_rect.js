// import {imposeBBoxArray} from "../bounding_boxes";
function roundRect_(x, y, w, h, r, lw) {
    if (w < 2 * r)
        r = w / 2;
    if (h < 2 * r)
        r = h / 2;
    this.strokeStyle = "rgb(248,21,21)";
    // this.strokeStyle = "#0f0";
    this.fillStyle = "rgba(255, 0, 0, .15)";
    this.lineWidth = lw;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    this.stroke();
    //this.fill()
    return this;
}
function imposeBBoxArray(context, bBoxArray) {
    var bBoxNum = bBoxArray.length;
    for (var i = 0; i < bBoxNum; i++) {
        var _a = bBoxArray[i], x = _a[0], y = _a[1], w = _a[2], h = _a[3];
        roundRect_.call(context, x, y, w, h, 10, 5);
    }
}
var TestBoundingBoxes = /** @class */ (function () {
    // private canvas: HTMLCanvasElement;
    // private context: CanvasRenderingContext2D;
    function TestBoundingBoxes() {
        var img = new Image();
        img.src = 'http://10.0.0.77/webcam/?action=stream';
        // When the image is loaded, draw it on the canvas
        img.onload = function () {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext("2d");
            // this.context = context;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            var bBoxArray = [[400, 250, 400, 150], [300, 300, 70, 110]];
            imposeBBoxArray(context, bBoxArray);
            console.log('here');
            var base64Data = canvas.toDataURL('image/png');
            console.log(base64Data.slice(10));
            fetch('http://localhost:4030/Webcam/image-proc-canvas-api-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: base64Data,
            }).then(function (response) {
                console.log(response);
            });
        };
        //
    }
    return TestBoundingBoxes;
}());
new TestBoundingBoxes();
