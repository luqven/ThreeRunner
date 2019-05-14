import THREE from "./utils/globals";
import COLORS from "./utils/colors";

function createTree() {
  let sides = 8;
  let tiers = 6;
  let scalarMultiplier = Math.random() * (0.25 - 0.1) + 0.05;
  let midPointVector = new THREE.Vector3();
  let vertexVector = new THREE.Vector3();

  // top green part of the tree
  let treeGeometry = new THREE.ConeGeometry(0.5, 1, sides, tiers);
  let treeMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.limeGreen,
    shading: THREE.FlatShading
  });
  let offset;
  midPointVector = treeGeometry.vertices[0].clone();
  let currentTier = 0;
  let vertexIndex;

  // for each each tier of the tree, expand or contract that tier
  blowUpTree(treeGeometry.vertices, sides, 0, scalarMultiplier);
  tightenTree(treeGeometry.vertices, sides, 1);
  blowUpTree(treeGeometry.vertices, sides, 2, scalarMultiplier * 1.1, true);
  tightenTree(treeGeometry.vertices, sides, 3);
  blowUpTree(treeGeometry.vertices, sides, 4, scalarMultiplier * 1.2);
  tightenTree(treeGeometry.vertices, sides, 5);
  let treeTop = new THREE.Mesh(treeGeometry, treeMaterial);
  treeTop.castShadow = true;
  treeTop.receiveShadow = false;
  treeTop.position.y = 0.9;
  treeTop.rotation.y = Math.random() * Math.PI;

  // bottom trunk part of the tree
  let treeTrunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
  let trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x886633,
    shading: THREE.FlatShading
  });
  let treeTrunk = new THREE.Mesh(treeTrunkGeometry, trunkMaterial);
  treeTrunk.position.y = 0.25;
  let tree = new THREE.Object3D();
  tree.add(treeTrunk);
  tree.add(treeTop);

  return tree;
}

// helper that expands alternating sides of the tree branch
function blowUpTree(vertices, sides, currentTier, scalarMultiplier, odd) {
  let vertexIndex;
  let vertexVector = new THREE.Vector3();
  let midPointVector = vertices[0].clone();
  let offset;

  // for each side of the tree
  for (let i = 0; i < sides; i++) {
    vertexIndex = currentTier * sides + 1;
    vertexVector = vertices[i + vertexIndex].clone();
    midPointVector.y = vertexVector.y;
    offset = vertexVector.sub(midPointVector);

    // expand alternating ring vertices
    if (odd) {
      if (i % 2 === 0) {
        offset.normalize().multiplyScalar(scalarMultiplier / 6);
        vertices[i + vertexIndex].add(offset);
      } else {
        offset.normalize().multiplyScalar(scalarMultiplier);
        vertices[i + vertexIndex].add(offset);
        vertices[i + vertexIndex].y =
          vertices[i + vertexIndex + sides].y + 0.05;
      }
    } else {
      if (i % 2 !== 0) {
        offset.normalize().multiplyScalar(scalarMultiplier / 6);
        vertices[i + vertexIndex].add(offset);
      } else {
        offset.normalize().multiplyScalar(scalarMultiplier);
        vertices[i + vertexIndex].add(offset);
        vertices[i + vertexIndex].y =
          vertices[i + vertexIndex + sides].y + 0.05;
      }
    }
  }
}

// helper that contracts alternating rings of the tree branch
function tightenTree(vertices, sides, currentTier) {
  let vertexIndex;
  let vertexVector = new THREE.Vector3();
  let midPointVector = vertices[0].clone();
  let offset;

  // contract alternating ring vertices
  for (let i = 0; i < sides; i++) {
    vertexIndex = currentTier * sides + 1;
    vertexVector = vertices[i + vertexIndex].clone();
    midPointVector.y = vertexVector.y;
    offset = vertexVector.sub(midPointVector);
    offset.normalize().multiplyScalar(0.06);
    vertices[i + vertexIndex].sub(offset);
  }
}

let newTree = createTree();

newTree.castShadow = true;
newTree.receiveShadow = false;
newTree.position.y = 10;
newTree.position.z = 20;

export default newTree;
