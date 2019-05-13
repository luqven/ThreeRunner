import THREE from "./utils/globals";
import COLORS from "./utils/colors";

// ground placeholder

// let width = 50,
//   height = 50,
//   widthSegments = 4,
//   heightSegments = 4;

// let planeGeometry = new THREE.PlaneGeometry(
//   width,
//   height,
//   widthSegments,
//   heightSegments
// );
// let planeMaterial = new THREE.MeshStandardMaterial({ color: COLORS.green });

// let ground = new THREE.Mesh(planeGeometry, planeMaterial);

// ground.receiveShadow = true;
// ground.castShadow = false;
// ground.rotation.x = -Math.PI / 2;

// export default ground;

// rolling planet
let sides = 40;
let rings = 40;
let worldRadius = 24;
let sphereGeometry = new THREE.SphereGeometry(worldRadius, sides, rings);
let sphereMaterial = new THREE.MeshStandardMaterial({
  color: COLORS.lightPink,
  shading: THREE.FlatShading
});
let vertexIndex;
let vertexVector = new THREE.Vector3();
let nextVertexVector = new THREE.Vector3();
let firstVertexVector = new THREE.Vector3();
let offset = new THREE.Vector3();
let currentRing = 1;
let lerpValue = 0.5; // liner interpolation
let heightValue;
let maxHeight = 0.07;

// create illusion of mountainous terrain
// for every vertical segment
for (let j = 1; j < rings - 2; j++) {
  currentRing = j;
  // for every horizontal segment
  for (let i = 0; i < sides; i++) {
    vertexIndex = currentRing * sides + 1;
    vertexVector = sphereGeometry.vertices[i + vertexIndex].clone();
    // if an odd ring
    if (j % 2 !== 0) {
      if (i === 0) {
        firstVertexVector = vertexVector.clone();
      }
      nextVertexVector = sphereGeometry.vertices[i + vertexIndex + 1].clone();
      if (i == sides - 1) {
        nextVertexVector = firstVertexVector;
      }
      // rotate vertices to break surface uniformity
      lerpValue = Math.random() * (0.75 - 0.25) + 0.25;
      vertexVector.lerp(nextVertexVector, lerpValue);
    }
    // give each vertex a random height adjustment
    heightValue = Math.random() * maxHeight - maxHeight / 2;
    offset = vertexVector
      .clone()
      .normalize()
      .multiplyScalar(heightValue);
    sphereGeometry.vertices[i + vertexIndex] = vertexVector.add(offset);
  }
}
const rollingMountainTerrain = new THREE.Mesh(sphereGeometry, sphereMaterial);
export default rollingMountainTerrain;
