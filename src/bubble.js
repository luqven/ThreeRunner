// bubble.js
// exports Bubble class

export class Bubble {
  constructor(props) {
    this.x = 0;
    this.y = 0;
    this.width = 5;
    this.height = 5;
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
}
