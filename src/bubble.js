// bubble.js
// exports Bubble class

import { Util } from "./utils/globals";

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
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.width = 35;
    this.height = 35;
    this.radius = 35;
    this.color = props.color;
    this.value = BUBBLE_VALUES[props.color];
    this.deltaX = props.deltaX ? props.deltaX : 0;
    this.deltaY = props.deltaY ? props.deltaY : 0;
    this.collided = false;
    this.eliminated = false;
  }

  // returns null
  reverseDeltaX() {
    this.deltaX = this.deltaX * -1;
  }
  // returns null
  reverseDeltaY() {
    this.deltaY = this.deltaY * -1;
  }
  // returns [x, y]
  getCoordinates() {
    return [this.x, this.y];
  }
  // returns null
  setCoordinates(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.update();
  }
  // returns null
  updateCoords(newX, newY) {
    this.ctx.save();
    this.ctx.translate(newX, newY);
    this.update();
    this.ctx.translate(-newX, -newY);
    this.ctx.restore();
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
  // returns null
  fall() {
    this.deltaX = 0;
    this.deltaY = -1;
    while (!this.hitWalls(0, this.canvas.width, 0, this.canvas.height)) {
      let newX = this.x + this.deltaX;
      let newY = this.y + this.deltaY;
      this.updateCoords(newX, newY);
    }
  }
  // returns null
  fireAt(bubbles, dX, dY) {
    debugger;
    this.deltaX = dX;
    this.deltaY = dY;
    let loops = 0;
    while (!this.collided && loops < 6) {
      loops++;
      // handle bubble collisions
      this.hitBubble(bubbles, [this.x, this.y]);
      // handle wall collisions
      this.hitWalls(0, this.canvas.width, 0, this.canvas.height);
      let newX = this.x + this.deltaX;
      let newY = this.y + this.deltaY;
      this.updateCoords(newX, newY);
    }
  }

  // bubbles =  [ BubbleObject, ... ]
  // currentPos = [ x, y ]
  hitBubble(bubbles, currentPos) {
    let hit = false;
    bubbles.forEach(bubble => {
      let bubbleMidpoint = [bubble.x, bubble.y];
      if (Util.getDistanceBetween(bubbleMidpoint, currentPos) < 1) {
        if (this.isOfColor(bubble.color)) {
          console.log("hit same color");
        }
        console.log("bubble hit");
        hit = true;
        this.collided = true;
        debugger;
      }
    });
    return hit;
  }

  // helper hat saves array of walls hit
  // returns bool
  hitWalls(leftWAll, rightWall, botWall, topWall) {
    let midPoint = [this.x, this.y];
    this.wallsHit = [];
    // if midP +/- radius <=> wall -> wall hit
    if (midPoint[0] - this.radius <= leftWAll[0]) {
      this.wallsHit.push(2);
      this.reverseDeltaX();
    } else if (midPoint[0] + this.radius >= rightWall[0]) {
      this.wallsHit.push(2);
      this.reverseDeltaX();
    }
    if (midPoint[1] - this.radius <= topWall[1]) {
      this.wallsHit.push(0);
      this.reverseDeltaY();
    } else if (midPoint[1] + this.radius >= botWall[1]) {
      this.wallsHit.push(0);
      this.reverseDeltaY();
    }
    if (this.wallsHit.length < 1) {
      return false;
    }
    if (this.wallsHit.length > 1) {
      return true;
    }
  }

  update() {
    this.render();
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
