// bubble.js
// exports Bubble class

// point values of each color
const BUBBLE_VALUES = {
  "rgba(255, 0, 0)": 1,
  blue: 1,
  green: 1,
  yellow: 1
};

export class Bubble {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.ctx = props.canvas.ctx;
    this.width = 40;
    this.height = 40;
    this.radius = 40;
    this.color = props.color;
    this.value = BUBBLE_VALUES[props.color];
  }

  // returns [x, y]
  getCoordinates() {
    return [this.x, this.y];
  }
  // returns null
  setCoordinates(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
  // returns [w, h]
  getDimensions() {
    return [this.width, this.height];
  }
  // returns null
  setDimensions(newW, newH) {
    this.width = newW;
    this.height = newH;
  }
  // returns [[x, y], [w, h]]
  getAttributes() {
    return [getCoordinates(), getDimensions()];
  }
  // returns null
  updateAttributes(newCoords, newDims) {
    let newX, newY, newW, newH;
    if (newCoords) {
      newX = newCoords[0];
      newY = newCoords[1];
      this.setCoordinates(newX, newY);
    }
    if (newDims) {
      newW = newDims[0];
      newH = newDims[1];
      this.setDimensions(newW, newH);
    }
  }
  // returns bool
  isOfColor(otherColor) {
    return this.color === otherColor;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
