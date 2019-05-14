// index js file
import { Util } from "./utils/globals";
import { Canvas } from "./utils/canvas";
import { Board } from "./gameBoard";
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
  // create the game board
  const board = new Board();
  board.init();
  // create the player

  const draw = () => {
    window.requestAnimationFrame(draw);
    // handle game logic
    canvas.render();
  };

  window.requestAnimationFrame(draw);
});
