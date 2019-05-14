// index js file
import { Util } from "./utils/globals";
import { Canvas } from "./utils/canvas";

document.addEventListener("DOMContentLoaded", () => {
  console.log("webpack is running...");
  console.log("DOM fully loaded and parsed");
  window.requestAnimFrame = Util.requestAnimFrame;
  // create the game canvas
  const canvas = new Canvas({
    canvas: document.getElementById("gameCanvas"),
    container: document.getElementById("gameContainer")
  });
  // create the game board
  // create the player

  const draw = () => {
    window.requestAnimationFrame(draw);
    // handle game logic
    canvas.render();
  };

  window.requestAnimationFrame(draw);
});
