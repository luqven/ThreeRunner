import * as THREE from "./three";

// setup the bubble attributes
const RADIUS = 5,
  SEGMENTS = 6,
  RINGS = 6;

// create the bubble's materials
const bubbleMaterial = new THREE.MeshLambertMaterial({
  color: 0xd43001
});

// create a bubble with sphere geometry
export const bubble = new THREE.Mesh(
  new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),
  bubbleMaterial
);
