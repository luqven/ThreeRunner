// index js file
import { Util } from "./utils/globals";
import { Canvas } from "./utils/canvas";

document.addEventListener("DOMContentLoaded", () => {
  console.log("webpack is running...");
  console.log("DOM fully loaded and parsed");
  window.requestAnimFrame = Util.requestAnimFrame;

  const canvas = new Canvas({
    canvas: document.getElementById("gameCanvas"),
    container: document.getElementById("gameContainer")
  });

  const draw = () => {
    window.requestAnimationFrame(draw);
    canvas.render();
  };

  window.requestAnimationFrame(draw);
});
