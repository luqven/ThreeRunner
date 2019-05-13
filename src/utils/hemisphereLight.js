import THREE from "./globals";
import COLORS from "./colors";

let createHemisphereLight = (
  color1 = COLORS.lightPink,
  color2 = COLORS.black,
  amount = 0.9
) => {
  return new THREE.HemisphereLight(color1, color2, amount);
};

let hemisphereLight = createHemisphereLight(
  COLORS.lightPink,
  COLORS.black,
  0.9
);

export default hemisphereLight;
