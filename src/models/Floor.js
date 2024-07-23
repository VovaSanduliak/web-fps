import * as THREE from 'three';
import floorTexture from '/textures/Plank/plank.jpg';

const createFloor = () => {
  const floorGeometry = new THREE.PlaneGeometry(500, 500, 256, 256);
  floorGeometry.attributes.uv2 = floorGeometry.attributes.uv;

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    floorTexture,
    undefined,
    undefined,
    (error) => console.log(error)
  );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50);
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const floorMaterial = new THREE.MeshStandardMaterial({
    // color: '#777777',
    metalness: 0.2,
    roughness: 0.6,
    envMapIntensity: 0.5,
    side: THREE.FrontSide,
    map: texture,
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow = true;
  floor.rotation.x = -Math.PI / 2;

  return floor;
};

export { createFloor };
