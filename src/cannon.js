// cannon.js
// export Cannon class

export class Cannon {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 40;
    this.color = "brown";
  }
}
