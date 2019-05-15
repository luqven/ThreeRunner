// cannon.js
// export Cannon class
import { Util } from "./utils/globals";

export class Cannon {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.width = 50;
    this.height = 80;
    this.x = props.canvas.width / 2 - this.width / 2;
    this.y = props.canvas.height - this.height;
    this.color = "brown";
  }

  init() {
    this.render();
  }

  update(mouseX, mouseY) {
    let angle = this.mousePosToDegrees(mouseX, mouseY);
    this.ctx.save();
    this.ctx.rotate(angle);
    this.render();
    this.ctx.restore();
  }

  mousePosToDegrees(mouseX, mouseY) {
    let centerX = this.canvas.width / 2;
    let centerY = this.canvas.height;
    let centerPoint = [centerX, centerY];
    let currentPoint = [mouseX, mouseY];
    let midpoint;
    // determine which side of the board mouse is on
    if (mouseX < centerX) {
      midpoint = [centerX - centerX / 2, centerY];
    } else if (mouseX > centerX) {
      midpoint = [centerX + centerX / 2, centerY];
    }

    let angle = Util.arcTangent(midpoint[0], midpoint[1], mouseX, mouseY);
    return angle;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
