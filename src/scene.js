import * as THREE from "./three";
import { bubble } from "./bubble";

function animate() {
  draw();
}

// set the scene size to be the 1/2 entire page (increases performance)
const WIDTH = window.innerWidth / 2,
  HEIGHT = window.innerHeight / 2;

// set the camera attributes
const FIELD_OF_VIEW = 75,
  ASPECT_RATIO = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 1000;

// create a renderer, camera, and scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  FIELD_OF_VIEW,
  ASPECT_RATIO,
  NEAR,
  FAR
);
let renderer = new THREE.WebGLRenderer();
let canvas = document.getElementById("gameCanvas");

// give the camera a start position
camera.position.z = 5;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the renderer to the app canvas
canvas.appendChild(renderer.domElement);

// add objects to the scene
scene.add(bubble);

function draw() {
  // loop the draw() function
  requestAnimationFrame(draw);
  // draw THREE.JS scene
  renderer.render(scene, camera);
  // process game logic
}

animate();
