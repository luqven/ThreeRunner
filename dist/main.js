/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bubble.js":
/*!***********************!*\
  !*** ./src/bubble.js ***!
  \***********************/
/*! exports provided: Bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Bubble\", function() { return Bubble; });\n// bubble.js\n// exports Bubble class\n\n// point values of each color\nconst BUBBLE_VALUES = {\n  \"rgba(255, 0, 0)\": 1,\n  blue: 1,\n  green: 1,\n  yellow: 1\n};\n\nclass Bubble {\n  constructor(props) {\n    this.x = props.x;\n    this.y = props.y;\n    this.ctx = props.canvas.ctx;\n    this.width = 35;\n    this.height = 35;\n    this.radius = 35;\n    this.color = props.color;\n    this.value = BUBBLE_VALUES[props.color];\n  }\n\n  // returns [x, y]\n  getCoordinates() {\n    return [this.x, this.y];\n  }\n  // returns null\n  setCoordinates(newX, newY) {\n    this.x = newX;\n    this.y = newY;\n  }\n  // returns [w, h]\n  getDimensions() {\n    return [this.width, this.height];\n  }\n  // returns null\n  setDimensions(newW, newH) {\n    this.width = newW;\n    this.height = newH;\n  }\n  // returns [[x, y], [w, h]]\n  getAttributes() {\n    return [getCoordinates(), getDimensions()];\n  }\n  // returns null\n  updateAttributes(newCoords, newDims) {\n    let newX, newY, newW, newH;\n    if (newCoords) {\n      newX = newCoords[0];\n      newY = newCoords[1];\n      this.setCoordinates(newX, newY);\n    }\n    if (newDims) {\n      newW = newDims[0];\n      newH = newDims[1];\n      this.setDimensions(newW, newH);\n    }\n  }\n  // returns bool\n  isOfColor(otherColor) {\n    return this.color === otherColor;\n  }\n\n  render() {\n    this.ctx.beginPath();\n    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n    this.ctx.fillStyle = this.color;\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/bubble.js?");

/***/ }),

/***/ "./src/bulletPath.js":
/*!***************************!*\
  !*** ./src/bulletPath.js ***!
  \***************************/
/*! exports provided: DashedLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DashedLine\", function() { return DashedLine; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n// bulletPath.js\n// exports DashedLine class\n\n\nclass DashedLine {\n  constructor(props) {\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.ctx;\n    this.board = props.board.board;\n    this.startX = props.x;\n    this.startY = props.y;\n    this.vertices = props.vertices ? props.vertices : [];\n  }\n\n  // checks if line has hit a bubble\n  // bubbles =  [ BubbleObject, ... ]\n  // currentPos = [ x, y ]\n  hitBubble(bubbles, currentPos) {\n    let hit = false;\n    bubbles.forEach(bubble => {\n      let bubbleMidpoint = [bubble.x, bubble.y];\n      if (_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getDistanceBetween(bubbleMidpoint, currentPos) < 1) {\n        console.log(\"bubble hit\");\n        hit = true;\n      }\n    });\n    return hit;\n  }\n\n  // helper that adds another point on the line\n  // returns null\n  addVertexAt(loc) {\n    let x = loc[0],\n      y = loc[1];\n    this.vertices.push(loc);\n  }\n\n  // helper that draws dotted line to each hit point\n  // vertices = [ [x, y], .. ]\n  drawLineTo(vertices) {\n    vertices.forEach(point => {\n      let x = point[0];\n      let y = point[1];\n      this.ctx.lineTo(x, y);\n    });\n  }\n\n  render() {\n    this.ctx.beginPath();\n    // set line as dashed line\n    this.ctx.setLineDash([5, 15]);\n    // set the line start point\n    this.ctx.moveTo(this.startX, this.startY);\n    // draw line to each vertex\n    this.drawLineTo(this.vertices);\n    // set the line color\n    this.ctx.strokeStyle = \"white\";\n    this.ctx.stroke();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/bulletPath.js?");

/***/ }),

/***/ "./src/cannon.js":
/*!***********************!*\
  !*** ./src/cannon.js ***!
  \***********************/
/*! exports provided: Cannon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cannon\", function() { return Cannon; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\");\n/* harmony import */ var _bulletPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bulletPath */ \"./src/bulletPath.js\");\n// cannon.js\n// export Cannon class\n\n\n\n\nclass Cannon {\n  constructor(props) {\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.ctx;\n    this.board = props.board;\n    this.width = 50;\n    this.height = 180;\n    this.mouseX = null;\n    this.mouseY = null;\n    this.x = props.canvas.width / 2 - this.width / 2;\n    this.y = props.canvas.height - 80;\n    this.color = \"brown\";\n    this.ammunition = []; // array bubbles to be shot out\n    this.bullet = null; // current bubble to be fired\n    this.bulletPath = null; // dashed line tracing current angle path\n  }\n\n  // cannon shooting logic\n  init() {\n    // add bubble to ammunition array\n    this.addAmmunition();\n    // set the first bubble in ammunition as the bullet\n    this.bullet = this.ammunition.pop();\n    // create a dashed line to where the cannon is pointing\n  }\n\n  // adds bubble to ammunition array if empty\n  // returns null\n  addAmmunition() {\n    let cannonCenterX = this.x + this.width / 2;\n    let cannonCenterY = this.y - 35;\n    if (this.ammunition.length < 1) {\n      let bubbleY = this.canvas.height;\n      this.ammunition.push(\n        new _bubble__WEBPACK_IMPORTED_MODULE_1__[\"Bubble\"]({\n          canvas: this.canvas,\n          x: cannonCenterX,\n          y: bubbleY\n        })\n      );\n    }\n  }\n\n  // updates the rotation of the cannon\n  // returns null\n  update(mouseX, mouseY) {\n    this.mouseX = mouseX;\n    this.mouseY = mouseY;\n    let angle = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].mousePosToAngle(this.x + 6, this.y, mouseX, mouseY);\n    // save the current context\n    this.ctx.save();\n    // set the new center for the context\n    let newCenterX = this.x + 0.5 * this.width;\n    let newCenterY = this.y + 0.5 * this.height;\n    this.ctx.translate(newCenterX, newCenterY);\n    // rotate the context\n    this.ctx.rotate(angle);\n    // revert context center back to where it was\n    this.ctx.translate(-newCenterX, -newCenterY);\n    this.render();\n    // restore context to saved state\n    this.ctx.restore();\n    this.bullet.render();\n  }\n\n  render() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = \"lightBlue\";\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/cannon.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\");\n// gameBoard.js\n// exports Board class\n\n\n\nclass Board {\n  constructor(props) {\n    this.rows = 5;\n    this.cols = 5;\n    this.board = [];\n    this.pieces = null;\n    this.canvas = props.canvas;\n  }\n\n  init() {\n    this.populateBoard();\n    this.render();\n  }\n  // make 2d array of row / cols\n  populateBoard() {\n    let bubbleDiameter = 70;\n    let startX = this.canvas.width / 2 - bubbleDiameter * 2;\n    let startY = -bubbleDiameter / 2;\n    let gap = 70;\n    let currentX = startX;\n    let currentY = startY;\n    for (let i = 0; i < this.rows; i++) {\n      let row = [];\n      currentY += gap;\n      for (let j = 0; j < this.cols; j++) {\n        let bubbleX = currentX + j * gap;\n        let bubbleY = currentY;\n        let newBubble = new _bubble__WEBPACK_IMPORTED_MODULE_1__[\"Bubble\"]({\n          color: Object.values(_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].colors)[\n            _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getRandom(0, Object.values(_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].colors).length)\n          ],\n          x: bubbleX,\n          y: bubbleY,\n          canvas: this.canvas\n        });\n        newBubble.setCoordinates(bubbleX, bubbleY);\n        row.push(newBubble);\n      }\n      this.board.push(row);\n    }\n  }\n\n  // update() {}\n  render() {\n    for (let i = 0; i < this.rows; i++) {\n      let row = this.board[i];\n      for (let j = 0; j < this.cols; j++) {\n        let bubble = row[j];\n        bubble.render();\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _utils_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/canvas */ \"./src/utils/canvas.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _cannon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cannon */ \"./src/cannon.js\");\n// index js file\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"webpack is running...\");\n  console.log(\"DOM fully loaded and parsed\");\n  window.requestAnimFrame = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].requestAnimFrame;\n  // create the game canvas\n  const canvas = new _utils_canvas__WEBPACK_IMPORTED_MODULE_1__[\"Canvas\"]({\n    canvas: document.getElementById(\"gameCanvas\"),\n    container: document.getElementById(\"gameContainer\"),\n    objects: []\n  });\n  // save the mouse position on the canvas on mouse move\n  canvas.watchMouseMove();\n  // create the game board\n  const board = new _gameBoard__WEBPACK_IMPORTED_MODULE_2__[\"Board\"]({ canvas: canvas });\n  // create the cannon\n  const cannon = new _cannon__WEBPACK_IMPORTED_MODULE_3__[\"Cannon\"]({ canvas: canvas, board: board });\n  // render the canvas\n  const render = () => {\n    window.requestAnimationFrame(render);\n    // handle game logic\n    canvas.render();\n    board.init();\n    cannon.init();\n    cannon.update(canvas.mousePos.x, canvas.mousePos.y);\n  };\n\n  window.requestAnimationFrame(render);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/canvas.js":
/*!*****************************!*\
  !*** ./src/utils/canvas.js ***!
  \*****************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Canvas\", function() { return Canvas; });\nclass Canvas {\n  constructor(props) {\n    this.x = 0;\n    this.y = 0;\n    this.gameOver = false;\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.getContext(\"2d\");\n    // the canvas's container div or section in the html\n    this.container = props.container;\n    this.width = this.container.offsetWidth;\n    this.height = this.container.offsetHeight;\n    this.mousePos = {\n      x: this.container.offsetWidth / 2,\n      y: this.container.offsetHeight / 2\n    };\n    this.colors = {\n      red: \"rgba(255, 0, 0)\",\n      blue: \"blue\",\n      green: \"green\",\n      yellow: \"yellow\"\n    };\n    this.objects = props.objects; // objects that belong to this canvas\n    this.canvasDidMount = false; // bool turns true on first render\n\n    this.render = this.render.bind(this);\n    this.resize = this.resize.bind(this);\n    this.watchMouseMove = this.watchMouseMove.bind(this);\n    this.onMouseClick = this.onMouseClick.bind(this);\n    this.onCanvasDidMount = this.onCanvasDidMount.bind(this);\n  }\n\n  // change cursor pos when mouse moves over canvas container\n  watchMouseMove() {\n    // console.log(\"watching mouse movements\");\n    this.container.addEventListener(\"mousemove\", e => {\n      this.mousePos.x = e.offsetX;\n      // this.mousePos.y = e.offsetY / 1.2;\n      this.mousePos.y = e.offsetY;\n    });\n    // console.log(this.mousePos);\n  }\n\n  onMouseClick(callback) {\n    this.container.addEventListener(\"click\", callback);\n  }\n\n  // resize the canvas when it's container resizes\n  resize() {\n    this.container.addEventListener(\"resize\", () => {\n      this.width = this.container.offsetWidth;\n      this.height = this.container.offsetHeight;\n    });\n  }\n\n  // on first render, add event listeners\n  onCanvasDidMount() {\n    this.resize();\n  }\n\n  render() {\n    if (this.gameOver === true) {\n      return;\n    }\n    if (this.canvasDidMount === false) {\n      this.canvasDidMount = true;\n      this.onCanvasDidMount();\n    }\n    this.ctx.clearRect(0, 0, this.width, this.height);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/utils/canvas.js?");

/***/ }),

/***/ "./src/utils/globals.js":
/*!******************************!*\
  !*** ./src/utils/globals.js ***!
  \******************************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Util\", function() { return Util; });\nconst Util = {\n  inherits: function inherits(childClass, parentClass) {\n    // TODO: allow classes to inherit\n  },\n  getRandom: function(min, max) {\n    return Math.floor(Math.random() * (max - min) + min);\n  },\n  getRandomFraction: function(min, max) {\n    return Math.random() * (max - min) + min;\n  },\n  getDistanceBetween: function(pos1, pos2) {\n    let xDiff = Math.round(pos2[0]) - Math.round(pos1[0]);\n    let yDiff = Math.round(pos2[1]) - Math.round(pos1[1]);\n    // a**2 + b**2 === c**2\n    let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));\n    return distance;\n  },\n  arcTangent: function(vertex1, vertex2) {\n    // based off answers to:\n    // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points\n    let cx = vertex1[0],\n      cy = vertex1[1],\n      ex = vertex2[0],\n      ey = vertex2[1],\n      dy = ey - cy,\n      dx = ex - cx,\n      theta = Math.atan2(dy, dx); // range (-PI, PI]\n    theta *= 180 / Math.PI; // radians to degrees, range (-180, 180]\n    return theta;\n  },\n  // only uses mouseX, but might use mouseY in future\n  // returns float\n  mousePosToAngle: function(x, y, mouseX, mouseY) {\n    let maxMouseY = 11;\n    let midpoint = [x - x / 2, y];\n    let target = [mouseX / 35, maxMouseY];\n    return Util.arcTangent(midpoint, target);\n  },\n  // shim layer with setTimeout fallback based on work by Paul Irish\n  requestAnimFrame: (function() {\n    return (\n      window.requestAnimationFrame ||\n      window.webkitRequestAnimationFrame ||\n      window.mozRequestAnimationFrame ||\n      window.oRequestAnimationFrame ||\n      window.msRequestAnimationFrame ||\n      function(callback) {\n        window.setTimeout(callback, 1000 / 60);\n      }\n    );\n  })(),\n  colors: {\n    red: \"rgba(255, 0, 0)\",\n    blue: \"blue\",\n    green: \"green\",\n    yellow: \"yellow\"\n  }\n};\n\n\n//# sourceURL=webpack:///./src/utils/globals.js?");

/***/ })

/******/ });