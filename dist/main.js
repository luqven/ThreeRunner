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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Bubble\", function() { return Bubble; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n// bubble.js\n// exports Bubble class\n\n\n\n// point values of each color\nconst BUBBLE_VALUES = {\n  \"rgba(255, 0, 0)\": 1,\n  blue: 1,\n  green: 1,\n  yellow: 1\n};\n\nclass Bubble {\n  constructor(props) {\n    this.x = props.x;\n    this.y = props.y;\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.ctx;\n    this.width = 35;\n    this.height = 35;\n    this.radius = 35;\n    this.color = props.color;\n    this.value = BUBBLE_VALUES[props.color];\n    this.deltaX = props.deltaX ? props.deltaX : 0;\n    this.deltaY = props.deltaY ? props.deltaY : 0;\n    this.collided = false;\n    this.eliminated = false;\n  }\n\n  // returns null\n  reverseDeltaX() {\n    this.deltaX = this.deltaX * -1;\n  }\n  // returns null\n  reverseDeltaY() {\n    this.deltaY = this.deltaY * -1;\n  }\n  // returns [x, y]\n  getCoordinates() {\n    return [this.x, this.y];\n  }\n  // returns null\n  setCoordinates(newX, newY) {\n    this.x = newX;\n    this.y = newY;\n    this.update();\n  }\n  // returns null\n  updateCoords(newX, newY) {\n    this.ctx.save();\n    this.ctx.translate(newX, newY);\n    this.update();\n    this.ctx.translate(-newX, -newY);\n    this.ctx.restore();\n  }\n\n  // returns [w, h]\n  getDimensions() {\n    return [this.width, this.height];\n  }\n  // returns null\n  setDimensions(newW, newH) {\n    this.width = newW;\n    this.height = newH;\n  }\n  // returns [[x, y], [w, h]]\n  getAttributes() {\n    return [getCoordinates(), getDimensions()];\n  }\n  // returns null\n  updateAttributes(newCoords, newDims) {\n    let newX, newY, newW, newH;\n    if (newCoords) {\n      newX = newCoords[0];\n      newY = newCoords[1];\n      this.setCoordinates(newX, newY);\n    }\n    if (newDims) {\n      newW = newDims[0];\n      newH = newDims[1];\n      this.setDimensions(newW, newH);\n    }\n  }\n  // returns bool\n  isOfColor(otherColor) {\n    return this.color === otherColor;\n  }\n  // returns null\n  fall() {\n    this.deltaX = 0;\n    this.deltaY = -1;\n    while (!this.hitWalls(0, this.canvas.width, 0, this.canvas.height)) {\n      let newX = this.x + this.deltaX;\n      let newY = this.y + this.deltaY;\n      this.updateCoords(newX, newY);\n    }\n  }\n  // returns null\n  fireAt(bubbles, dX, dY) {\n    // debugger;\n    this.deltaX = dX;\n    this.deltaY = dY;\n    let loops = 0;\n    while (!this.collided && loops < 6) {\n      loops++;\n      // handle bubble collisions\n      this.hitBubble(bubbles, [this.x, this.y]);\n      // handle wall collisions\n      this.hitWalls(0, this.canvas.width, 0, this.canvas.height);\n      let newX = this.x + this.deltaX;\n      let newY = this.y + this.deltaY;\n      this.updateCoords(newX, newY);\n    }\n  }\n\n  // bubbles =  [ BubbleObject, ... ]\n  // currentPos = [ x, y ]\n  hitBubble(bubbles, currentPos) {\n    let hit = false;\n    bubbles.forEach(bubble => {\n      let bubbleMidpoint = [bubble.x, bubble.y];\n      if (_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getDistanceBetween(bubbleMidpoint, currentPos) < 1) {\n        if (this.isOfColor(bubble.color)) {\n          console.log(\"hit same color\");\n        }\n        console.log(\"bubble hit\");\n        hit = true;\n        this.collided = true;\n        // debugger;\n      }\n    });\n    return hit;\n  }\n\n  // helper hat saves array of walls hit\n  // returns bool\n  hitWalls(leftWAll, rightWall, botWall, topWall) {\n    let midPoint = [this.x, this.y];\n    this.wallsHit = [];\n    // if midP +/- radius <=> wall -> wall hit\n    if (midPoint[0] - this.radius <= leftWAll[0]) {\n      this.wallsHit.push(2);\n      this.reverseDeltaX();\n    } else if (midPoint[0] + this.radius >= rightWall[0]) {\n      this.wallsHit.push(2);\n      this.reverseDeltaX();\n    }\n    if (midPoint[1] - this.radius <= topWall[1]) {\n      this.wallsHit.push(0);\n      this.reverseDeltaY();\n    } else if (midPoint[1] + this.radius >= botWall[1]) {\n      this.wallsHit.push(0);\n      this.reverseDeltaY();\n    }\n    if (this.wallsHit.length < 1) {\n      return false;\n    }\n    if (this.wallsHit.length > 1) {\n      return true;\n    }\n  }\n\n  update() {\n    this.render();\n  }\n\n  render() {\n    this.ctx.beginPath();\n    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n    this.ctx.fillStyle = this.color;\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/bubble.js?");

/***/ }),

/***/ "./src/cannon.js":
/*!***********************!*\
  !*** ./src/cannon.js ***!
  \***********************/
/*! exports provided: Cannon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cannon\", function() { return Cannon; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\");\n// cannon.js\n// export Cannon class\n\n\n\nclass Cannon {\n  constructor(props) {\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.ctx;\n    this.board = props.board;\n    this.width = 5;\n    this.height = 180;\n    this.x = props.canvas.width / 2 - this.width;\n    this.y = props.canvas.height - 80;\n    this.newX = this.x + this.width;\n    this.newY = this.y - this.height / 2;\n    this.color = \"brown\";\n  }\n\n  init() {}\n\n  // returns null\n  update() {\n    if (this.canvas.isDragging === true) {\n      // let dragDir = this.canvas.mousePos.dragDir;\n      // this.newX = this.newX + dragDir;\n      // this.newY = this.newY + dragDir;\n      this.newX = this.canvas.mousePos.x;\n      this.newY = this.canvas.mousePos.y;\n    }\n    this.render();\n  }\n\n  drawCannon(x, y) {\n    let newAngle = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getAngleFromPos([x, y], [this.newX, this.newY]);\n    let mult1 = Math.cos(_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].degToRadians(newAngle));\n    let mult2 = Math.sin(_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].degToRadians(newAngle));\n    let newX = x + 1.5 * this.width * mult1 * 50;\n    let newY = y + 1.5 * this.height * mult2;\n    // debugger;\n    //render the line from player to mouse\n    this.ctx.lineWidth = 2;\n    this.ctx.strokeStyle = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].colors[\"red\"];\n    this.ctx.beginPath();\n    this.ctx.moveTo(x, y);\n    this.ctx.lineTo(newX, newY);\n    this.ctx.stroke();\n  }\n\n  render() {\n    this.drawCannon(this.x, this.y);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/cannon.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _cannon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cannon */ \"./src/cannon.js\");\n// game.js file\n// exports Game class\n\n\n\n\n\nclass Game {\n  constructor(props) {\n    this.canvas = props.canvas;\n  }\n  init() {\n    // save the mouse position on the canvas\n    this.canvas.watchMouseDown();\n    this.canvas.watchMouseUp();\n    this.canvas.watchMouseMove();\n    // create the game board\n    this.board = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"Board\"]({ canvas: this.canvas });\n    // create the cannon\n    this.board.init();\n    this.cannon = new _cannon__WEBPACK_IMPORTED_MODULE_2__[\"Cannon\"]({ canvas: this.canvas, board: this.board });\n    this.cannon.init();\n    // add objects to the canvas\n    this.canvas.objects.push(this.cannon);\n    this.canvas.objects.push(this.board);\n  }\n  render() {\n    this.canvas.render();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\");\n// gameBoard.js\n// exports Board class\n\n\n\nclass Board {\n  constructor(props) {\n    this.rows = 5;\n    this.cols = 10;\n    this.pieceWidth = 35;\n    this.pieceHeight = 35;\n    this.pieces = [];\n    this.canvas = props.canvas;\n  }\n\n  init() {\n    this.createBoard();\n    this.populateBoard();\n  }\n\n  update() {\n    this.render();\n  }\n\n  createBoard() {\n    // create the rows\n    for (let j = 0; j < this.rows; j++) {\n      this.pieces.push([]);\n    }\n    // create the cols\n    this.pieces.forEach(row => {\n      for (let i = 0; i < this.cols; i++) {\n        row.push([]);\n      }\n    });\n  }\n\n  // make 2d array of row / cols\n  populateBoard() {\n    // add a bubble at every row, col\n    for (let row = 0; row < this.rows; row++) {\n      for (let col = 0; col < this.cols; col++) {\n        let pos = this.getBubbleLocAt(row, col);\n        this.pieces[row][col] = this.drawBubbleAt(pos.x, pos.y);\n      }\n    }\n  }\n\n  getBubbleLocAt(row, col) {\n    let tOffset = 1; // add spacer rows from the top\n    let lOffset = 1.5; // add spacer rows from the left\n    row += tOffset;\n    col += lOffset;\n    let offset = 5; // decrease gap between rows\n    let x = col * this.pieceWidth * 2;\n    // alternate offset on rows, creates shifted grid\n    if (row % 2 == 0) {\n      x += this.pieceWidth;\n    }\n    let y = row * (this.pieceHeight - offset) * 2;\n    return { x, y };\n  }\n\n  getBoardPosAt(bubbleCenter) {\n    let x = bubbleCenter[0];\n    let y = bubbleCenter[1];\n    let gridY = Math.floor(y / y);\n  }\n\n  drawBubbleAt(x, y) {\n    let bubble = new _bubble__WEBPACK_IMPORTED_MODULE_1__[\"Bubble\"]({\n      canvas: this.canvas,\n      color: _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getRandomColor(),\n      x: x,\n      y: y\n    });\n    return bubble;\n  }\n\n  render() {\n    for (let i = 0; i < this.rows; i++) {\n      let row = this.pieces[i];\n      for (let j = 0; j < this.cols; j++) {\n        let bubble = row[j];\n        bubble.render();\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _utils_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/canvas */ \"./src/utils/canvas.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n// index js file\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"webpack is running...\");\n  console.log(\"DOM fully loaded and parsed\");\n  window.requestAnimFrame = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].requestAnimFrame;\n  // create the game canvas\n  const canvas = new _utils_canvas__WEBPACK_IMPORTED_MODULE_1__[\"Canvas\"]({\n    canvas: document.getElementById(\"gameCanvas\"),\n    container: document.getElementById(\"gameContainer\"),\n    objects: []\n  });\n  // initialize the game\n  const game = new _game__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ canvas });\n  game.init();\n  // render the game\n  const render = () => {\n    window.requestAnimationFrame(render);\n    game.render();\n  };\n\n  window.requestAnimationFrame(render);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/canvas.js":
/*!*****************************!*\
  !*** ./src/utils/canvas.js ***!
  \*****************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Canvas\", function() { return Canvas; });\nclass Canvas {\n  constructor(props) {\n    this.colors = {\n      red: \"rgba(255, 0, 0)\",\n      blue: \"blue\",\n      green: \"green\",\n      yellow: \"yellow\"\n    };\n    this.gameOver = false;\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.getContext(\"2d\");\n    this.container = props.container; // the canvas's container div\n    this.x = 0;\n    this.y = 0;\n    this.width = this.container.offsetWidth;\n    this.height = this.container.offsetHeight;\n    this.mousePos = {\n      x: this.container.offsetWidth / 2,\n      y: this.container.offsetHeight / 2,\n      clickX: null,\n      clickY: null,\n      releaseX: null,\n      releaseY: null,\n      dragDir: 0,\n      dragDelta: 0\n    };\n    this.objects = props.objects; // objects that belong to this canvas\n    this.canvasDidMount = false; // bool turns true on first render\n    this.isDragging = false;\n\n    this.render = this.render.bind(this);\n    this.resize = this.resize.bind(this);\n    this.watchMouseMove = this.watchMouseMove.bind(this);\n    this.watchMouseClick = this.watchMouseClick.bind(this);\n    this.onCanvasDidMount = this.onCanvasDidMount.bind(this);\n  }\n\n  // change cursor pos when mouse moves over canvas container\n  watchMouseMove() {\n    // console.log(\"watching mouse movements\");\n    this.container.addEventListener(\"mousemove\", e => {\n      this.mousePos.x = e.offsetX;\n      // this.mousePos.y = e.offsetY / 1.2;\n      this.mousePos.y = e.offsetY;\n    });\n    // console.log(this.mousePos);\n  }\n\n  // save mouse click location on click\n  watchMouseClick() {\n    this.container.addEventListener(\"click\", e => {\n      this.mousePos.clickX = e.offsetX;\n      this.mousePos.clickY = e.offsetY;\n    });\n  }\n\n  watchMouseDown() {\n    this.container.addEventListener(\"mousedown\", e => {\n      this.mousePos.clickX = e.offsetX;\n      this.mousePos.clickY = e.offsetY;\n      this.isDragging = true;\n    });\n  }\n  watchMouseUp() {\n    this.container.addEventListener(\"mouseup\", e => {\n      this.mousePos.releaseX = e.offsetX;\n      this.mousePos.releaseY = e.offsetY;\n      this.isDragging = false;\n\n      let xDiff = this.mousePos.clickX - this.mousePos.releaseX;\n\n      if (xDiff < 0) {\n        this.mousePos.dragDir = 1;\n      } else if (xDiff > 0) {\n        this.mousePos.dragDir = -1;\n      } else {\n        this.mousePos.dragDir = 0;\n      }\n\n      // reverse xDiff to match mouse drag direction\n      this.mousePos.dragDelta = Math.abs(xDiff);\n      // console.log(this.mousePos.dragDir, this.mousePos.dragDelta);\n    });\n  }\n\n  // resize the canvas when it's container resizes\n  resize() {\n    this.container.addEventListener(\"resize\", () => {\n      this.width = this.container.offsetWidth;\n      this.height = this.container.offsetHeight;\n    });\n  }\n\n  // on first render, add event listeners\n  onCanvasDidMount() {\n    this.resize();\n  }\n\n  render() {\n    if (this.gameOver === true) {\n      return;\n    }\n    if (this.canvasDidMount === false) {\n      this.canvasDidMount = true;\n      this.onCanvasDidMount();\n    }\n    this.ctx.clearRect(0, 0, this.width, this.height);\n    this.objects.forEach(object => {\n      object.update();\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/utils/canvas.js?");

/***/ }),

/***/ "./src/utils/globals.js":
/*!******************************!*\
  !*** ./src/utils/globals.js ***!
  \******************************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Util\", function() { return Util; });\nconst Util = {\n  inherits: function inherits(childClass, parentClass) {\n    // TODO: allow classes to inherit\n  },\n  getRandom: function(min, max) {\n    return Math.floor(Math.random() * (max - min) + min);\n  },\n  getRandomFraction: function(min, max) {\n    return Math.random() * (max - min) + min;\n  },\n  getDistanceBetween: function(pos1, pos2) {\n    let xDiff = Math.round(pos2[0]) - Math.round(pos1[0]);\n    let yDiff = Math.round(pos2[1]) - Math.round(pos1[1]);\n    // a**2 + b**2 === c**2\n    let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));\n    return distance;\n  },\n  radiansToDeg(angle) {\n    return angle * (180 / Math.PI);\n  },\n  arcTangent: function(playerPos, newPos) {\n    // based off answers to:\n    // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points\n    let px = playerPos[0],\n      py = playerPos[1],\n      mx = newPos[0],\n      my = newPos[1],\n      dy = my - py,\n      dx = mx - px,\n      theta = Math.atan2(dy, dx); // range (-PI, PI]\n    theta = Util.radiansToDeg(theta); // range (0 -  360)\n    if (theta < 0) {\n      theta = 180 + (180 + theta);\n    }\n    return theta;\n  },\n  getAngleFromPos: function(playerPos, newPos) {\n    let angle = Util.arcTangent(playerPos, newPos);\n    // limit angle to always aim up\n    if (angle < 90 || angle > 350) {\n      angle = 350;\n    } else {\n      if (angle < 190) {\n        angle = 190;\n      }\n    }\n    return angle;\n  },\n  degToRadians: function(angle) {\n    return angle * (Math.PI / 180);\n  },\n  requestAnimFrame: (function() {\n    // shim layer with setTimeout fallback based on work by Paul Irish\n    return (\n      window.requestAnimationFrame ||\n      window.webkitRequestAnimationFrame ||\n      window.mozRequestAnimationFrame ||\n      window.oRequestAnimationFrame ||\n      window.msRequestAnimationFrame ||\n      function(callback) {\n        window.setTimeout(callback, 1000 / 60);\n      }\n    );\n  })(),\n  colors: {\n    red: \"rgba(255, 0, 0)\",\n    blue: \"blue\",\n    green: \"green\",\n    yellow: \"yellow\"\n  },\n  getRandomColor: function() {\n    let options = Object.keys(Util.colors);\n    let selectedColor = options[Util.getRandom(0, 4)];\n    return Util.colors[selectedColor];\n  }\n};\n\n\n//# sourceURL=webpack:///./src/utils/globals.js?");

/***/ })

/******/ });