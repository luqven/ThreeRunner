import Canvas from "./utils/globals";

document.addEventListener("DOMContentLoaded", () => {
  console.log("webpack is running...");
  console.log("DOM fully loaded and parsed");

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
