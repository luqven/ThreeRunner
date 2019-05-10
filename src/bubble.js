import { THREE } from "./utils/globals";

// // setup the bubble attributes
// const RADIUS = 5,
//   SEGMENTS = 32,
//   RINGS = 32;

// // create the bubble's materials
// let bubbleMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffff00
// });
// // create the bubbles geometry
// let bubbleGeometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);

// // create a bubble with sphere geometry
// export const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

var geometry = new THREE.SphereGeometry(5, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
export var bubble = new THREE.Mesh(geometry, material);
