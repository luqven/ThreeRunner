export class Canvas {
  constructor(props) {
    this.x = 0;
    this.y = 0;
    this.gameOver = false;
    this.canvas = props.canvas;
    this.ctx = props.canvas.getContext("2d");
    // the canvas's container div or section in the html
    this.container = props.container;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.mousePos = {
      x: this.container.offsetWidth / 2,
      y: this.container.offsetHeight / 2
    };
    this.colors = {
      red: "rgba(255, 0, 0)",
      blue: "blue",
      green: "green",
      yellow: "yellow"
    };
    this.objects = props.objects; // objects that belong to this canvas
    this.canvasDidMount = false; // bool turns true on first render

    this.render = this.render.bind(this);
    this.resize = this.resize.bind(this);
    this.watchMouseMove = this.watchMouseMove.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.onCanvasDidMount = this.onCanvasDidMount.bind(this);
  }

  // change cursor pos when mouse moves over canvas container
  watchMouseMove() {
    // console.log("watching mouse movements");
    this.container.addEventListener("mousemove", e => {
      this.mousePos.x = e.offsetX;
      // this.mousePos.y = e.offsetY / 1.2;
      this.mousePos.y = e.offsetY;
    });
    // console.log(this.mousePos);
  }

  onMouseClick(callback) {
    this.container.addEventListener("click", callback);
  }

  // resize the canvas when it's container resizes
  resize() {
    this.container.addEventListener("resize", () => {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
    });
  }

  // on first render, add event listeners
  onCanvasDidMount() {
    this.resize();
  }

  render() {
    if (this.gameOver === true) {
      return;
    }
    if (this.canvasDidMount === false) {
      this.canvasDidMount = true;
      this.onCanvasDidMount();
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
