import * as THREE from 'three';

const skyBoxPath = '/textures/Clear/';
const format = '.png';

const textureImages = [
  `rt${format}`,
  `lf${format}`,
  `up${format}`,
  `dn${format}`,
  `ft${format}`,
  `bk${format}`,
];

const createSkyBox = () => {
  const loader = new THREE.CubeTextureLoader();
  loader.setPath(skyBoxPath);

  const textureCube = loader.load(
    textureImages,
    () => {
      console.log('SkyBox images loaded successfully');
    },
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error('An error happened while loading SkyBox images: ', error);
    }
  );

  return textureCube;
};

export { createSkyBox };
