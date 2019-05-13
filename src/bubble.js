import THREE from "./utils/globals";
import COLORS from "./utils/colors";

// lower 'segment' and 'ring' values will increase performance
let radius = 5,
  segments = 20,
  rings = 20;

// create the shape's material
// let shapeMaterial = new THREE.MeshLambertMaterial({
//   color: COLORS.red
// });

let shapeMaterial = new THREE.MeshStandardMaterial({
  color: COLORS.lightBlue,
  shading: THREE.FlatShading
});

// create the shape's geometry
// let shapeGeometry = new THREE.SphereGeometry(radius, segments, rings);
let shapeGeometry = new THREE.DodecahedronGeometry(radius, 1);

// Create a shape with shape geometry
const bubble = new THREE.Mesh(shapeGeometry, shapeMaterial);

bubble.castShadow = true;
bubble.receiveShadow = false;
bubble.position.y = 4.8;
bubble.position.x = 0;
bubble.position.z = 20;

export default bubble;
