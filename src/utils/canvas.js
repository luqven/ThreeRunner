export class Canvas {
  constructor(props) {
    this.colors = {
      red: "rgba(255, 0, 0)",
      blue: "blue",
      green: "green",
      yellow: "yellow"
    };
    this.gameOver = false;
    this.canvas = props.canvas;
    this.ctx = props.canvas.getContext("2d");
    this.container = props.container; // the canvas's container div
    this.x = 0;
    this.y = 0;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.walls = {
      left: { x: 0, y: 0 },
      right: { x: this.width, y: 0 },
      bot: { x: 0, y: 0 },
      top: { x: 0, y: this.height }
    };
    this.mousePos = {
      x: this.container.offsetWidth / 2,
      y: this.container.offsetHeight / 2,
      clickX: null,
      clickY: null,
      releaseX: null,
      releaseY: null,
      dragDir: 0,
      dragDelta: 0
    };
    this.objects = props.objects; // objects that belong to this canvas
    this.canvasDidMount = false; // bool turns true on first render
    this.isDragging = false;
    this.pressedKey = null;

    this.render = this.render.bind(this);
    this.resize = this.resize.bind(this);
    this.watchMouseMove = this.watchMouseMove.bind(this);
    this.watchMouseClick = this.watchMouseClick.bind(this);
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

  // save mouse click location on click
  watchMouseClick() {
    this.container.addEventListener("click", e => {
      this.mousePos.clickX = e.offsetX;
      this.mousePos.clickY = e.offsetY;
    });
  }

  watchMouseDown() {
    this.container.addEventListener("mousedown", e => {
      this.mousePos.clickX = e.offsetX;
      this.mousePos.clickY = e.offsetY;
      this.isDragging = true;
    });
  }
  watchMouseUp() {
    this.container.addEventListener("mouseup", e => {
      this.mousePos.releaseX = e.offsetX;
      this.mousePos.releaseY = e.offsetY;
      this.isDragging = false;

      let xDiff = this.mousePos.clickX - this.mousePos.releaseX;

      if (xDiff < 0) {
        this.mousePos.dragDir = 1;
      } else if (xDiff > 0) {
        this.mousePos.dragDir = -1;
      } else {
        this.mousePos.dragDir = 0;
      }

      // reverse xDiff to match mouse drag direction
      this.mousePos.dragDelta = Math.abs(xDiff);
      // console.log(this.mousePos.dragDir, this.mousePos.dragDelta);
    });
  }

  watchKeyPress() {
    document.addEventListener("keydown", e => {
      this.pressedKey = e.key;
    });
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
    this.objects.forEach(object => {
      object.update();
    });
  }
}
