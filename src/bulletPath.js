// bulletPath.js
// export DashedLine class
import { Util } from "./utils/globals";

export class DashedLine {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.x = props.x;
    this.y = props.y;
    this.cx = props.cx;
    this.cy = props.cy;
  }

  render() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.setLineDash([5, 15]);
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.cx, this.cy);
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
    this.ctx.restore();
  }
}
