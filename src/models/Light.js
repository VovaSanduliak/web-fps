import * as THREE from 'three';

const createAmbientLight = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  return ambientLight;
};

const createDirectionalLight = () => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);

  return directionalLight;
};

export { createAmbientLight, createDirectionalLight };
