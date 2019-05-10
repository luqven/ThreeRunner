import { THREE } from "./utils/globals";
import bubble from "./bubble";

export function animate() {
  requestAnimationFrame(animate);

  shape.rotation.x += 0.01;
  shape.rotation.y += 0.01;

  renderer.render(scene, camera);
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
// start the renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);

// attach the renderer to the app canvas
let canvas = document.getElementById("gameCanvas");
canvas.appendChild(renderer.domElement);

// add the shape to the scene
let shape = bubble;
scene.add(shape);

// // create a point light
let pointLight = new THREE.PointLight(0xf8d898);

// set its position
pointLight.position.x = -1000;
pointLight.position.y = 0;
pointLight.position.z = 1000;
pointLight.intensity = 2.9;
pointLight.distance = 10000;

// add to the scene
scene.add(pointLight);

// give the camera a start position
camera.position.z = 20;
