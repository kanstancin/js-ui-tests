
function roundRect_(x:number, y:number, w:number, h:number, r:number, lw:number) {
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
export function imposeBBoxArray(context:CanvasRenderingContext2D, bBoxArray:number[][]) {
  const bBoxNum = bBoxArray.length;
  for (let i = 0; i < bBoxNum; i++) {
      let [x, y, w, h] = bBoxArray[i];
      roundRect_.call(context, x, y, w, h, 10, 5);
  }
}