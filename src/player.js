import THREE from "./utils/globals";
import COLORS from "./utils/colors";
import * as MTLLoader from "./utils/mtlLoader";

let width = 10,
  height = 10,
  depth = 10;

let playerGeometry = new THREE.BoxGeometry(width, height, depth); //cube
let playerMaterial = new THREE.MeshStandardMaterial({ color: COLORS.magenta });

let player = new THREE.Mesh(playerGeometry, playerMaterial);

player.castShadow = true;
player.receiveShadow = false;
player.position.y = 10;

export default player;

export const ship = new THREE.MTLLoader()
  .setPath("../assets/objects/spaceship.obj")
  .load("male02_dds.mtl", function(materials) {
    materials.preload();
    new THREE.OBJLoader()
      .setMaterials(materials)
      .setPath("models/obj/male02/")
      .load(
        "male02.obj",
        function(object) {
          object.position.y = -95;
          scene.add(object);
        },
        onProgress,
        onError
      );
  });
