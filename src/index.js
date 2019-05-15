// index js file
import { Util } from "./utils/globals";
import { Canvas } from "./utils/canvas";
import { Board } from "./gameBoard";
import { Cannon } from "./cannon";
document.addEventListener("DOMContentLoaded", () => {
  console.log("webpack is running...");
  console.log("DOM fully loaded and parsed");
  window.requestAnimFrame = Util.requestAnimFrame;
  // create the game canvas
  const canvas = new Canvas({
    canvas: document.getElementById("gameCanvas"),
    container: document.getElementById("gameContainer"),
    objects: []
  });
  // save the mouse position on the canvas on mouse move
  canvas.onMouseMove();
  // create the game board
  const board = new Board({ canvas: canvas });
  // create the cannon
  const cannon = new Cannon({ canvas: canvas });
  // render the canvas
  const draw = () => {
    window.requestAnimationFrame(draw);
    // handle game logic
    canvas.render();
    board.init();
    cannon.update(canvas.mousePos.x, canvas.mousePos.y);
  };

  window.requestAnimationFrame(draw);
});
