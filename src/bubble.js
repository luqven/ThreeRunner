import THREE from "./utils/globals";

// lower 'segment' and 'ring' values will increase performance
let radius = 5,
  segments = 100,
  rings = 6;

// create the shape's material
let shapeMaterial = new THREE.MeshLambertMaterial({
  color: 0xd43001
});

// create the shape's geometry
let shapeGeometry = new THREE.SphereGeometry(radius, segments, rings);

// Create a shape with shape geometry
const bubble = new THREE.Mesh(shapeGeometry, shapeMaterial);

export default bubble;
