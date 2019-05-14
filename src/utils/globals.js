export const Util = {
  inherits: function inherits(childClass, parentClass) {
    // TODO: allow classes to inherit
  },
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  getRandomFraction: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  // shim layer with setTimeout fallback based on work by Paul Irish
  requestAnimFrame: (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })(),
  colors: {
    red: "rgba(255, 0, 0)",
    blue: "blue",
    green: "green",
    yellow: "yellow"
  }
};
