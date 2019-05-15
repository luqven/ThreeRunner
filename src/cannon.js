// cannon.js
// export Cannon class
import { Util } from "./utils/globals";

export class Cannon {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.width = 50;
    this.height = 180;
    this.x = props.canvas.width / 2 - this.width / 2;
    this.y = props.canvas.height - 80;
    this.color = "brown";
  }

  init() {
    this.render();
  }

  update(mouseX, mouseY) {
    let angle = this.mousePosToDegrees(mouseX, mouseY);
    this.ctx.save();
    let newCenterX = this.x + 0.5 * this.width;
    let newCenterY = this.y + 0.5 * this.height;
    this.ctx.translate(newCenterX, newCenterY);
    this.ctx.rotate(angle);
    this.ctx.translate(-newCenterX, -newCenterY);
    this.render();
    this.ctx.restore();
  }

  mousePosToDegrees(mouseX, mouseY) {
    let centerX = this.x + 6;
    let centerY = this.y;
    let maxY = 11;
    // console.log(newMouseY / 30);
    let midpoint = [centerX - centerX / 2, centerY];
    let angle = Util.arcTangent(midpoint[0], midpoint[1], mouseX / 35, maxY);
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
