import * as THREE from 'three';

const createFloor = () => {
  const geometry = new THREE.PlaneGeometry(1000, 1000);
  const material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    side: THREE.FrontSide,
  });
  const floor = new THREE.Mesh(geometry, material);

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1;

  return floor;
};

export { createFloor };
