// import { imposeBBoxArray } from "./bounding_boxes";
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
    function TestBoundingBoxes() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        // context.lineCap = 'round';
        // context.lineJoin = 'round';
        // context.strokeStyle = 'black';
        // context.lineWidth = 1;
        this.context = context;
        var bBoxArray = [[400, 88, 400, 30], [300, 300, 20, 70]];
        imposeBBoxArray(this.context, bBoxArray);
    }
    return TestBoundingBoxes;
}());
new TestBoundingBoxes();
