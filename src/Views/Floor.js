import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import floorTexture from '../../assets/textures/Plank/plank.jpg';

const createFloor = () => {
  const floorGeometry = new THREE.PlaneGeometry(256, 255, 256, 256);
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
    // color: '#ffaaff',
    metalness: 0.2,
    roughness: 0.6,
    envMapIntensity: 0.5,
    side: THREE.FrontSide,
    map: texture,
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow = true;
  floor.rotation.x = -Math.PI / 2;

  // floor.position.y -= 1;

  // add ground collision
  floor.physicsComponent = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
  });

  floor.physicsComponent.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

  return floor;
};

export { createFloor };
