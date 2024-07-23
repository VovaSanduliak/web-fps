import * as THREE from 'three';

const createAmbientLight = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.castShadow;
  return ambientLight;
};

const createDirectionalLight = () => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;

  return directionalLight;
};

export { createAmbientLight, createDirectionalLight };
