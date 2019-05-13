import THREE from "./utils/globals";

let heroGeometry = new THREE.BoxGeometry(1, 1, 1); //cube
let heroMaterial = new THREE.MeshStandardMaterial({ color: 0x883333 });
hero = new THREE.Mesh(heroGeometry, heroMaterial);
hero.castShadow = true;
hero.receiveShadow = false;
hero.position.y = 2;

export default hero;
