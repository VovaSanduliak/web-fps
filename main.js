import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { CharacterControls } from './src/CharacterControls';

import { createScene } from './src/models/Scene';
import { createCamera } from './src/models/Camera';
import { createRenderer } from './src/models/Renderer';

import { createFloor } from './src/models/Floor';
import { createAmbientLight, createDirectionalLight } from './src/models/Light';

import './style.css';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

const floor = createFloor();
const ambientLight = createAmbientLight();
const directionalLight = createDirectionalLight();
scene.add(floor, ambientLight, directionalLight);

// CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.minDistance = 5;
orbitControls.maxDistance = 7;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
orbitControls.update();
// END CONTROLS

// MODEL WITH ANIMATIONS
let characterControls = null;
new GLTFLoader().load('Steve.glb', (gltf) => {
  console.log(gltf);
  const model = gltf.scene;
  model.traverse((object) => {
    if (object.isMesh) object.castShadow = true;
  });
  scene.add(model);

  const gltfAnimations = gltf.animations;
  const mixer = new THREE.AnimationMixer(model);
  const animationsMap = new Map();
  gltfAnimations
    .filter((a) => a.name != 'TPose')
    .forEach((a) => animationsMap.set(a.name, mixer.clipAction(a)));

  characterControls = new CharacterControls(
    model,
    mixer,
    animationsMap,
    orbitControls,
    camera,
    'Idle'
  );
});

// END MODEL WITH ANIMATIONS

// CONTROL KEYS
const keysPressed = {};

document.addEventListener(
  'keydown',
  (event) => {
    if (event.shiftKey && characterControls) {
      characterControls.switchRunToggle();
    } else {
      keysPressed[event.key.toLocaleLowerCase()] = true;
    }
  },
  false
);
document.addEventListener(
  'keyup',
  (event) => {
    keysPressed[event.key.toLocaleLowerCase()] = false;
  },
  false
);

// END CONTROL KEYSj

const clock = new THREE.Clock();
function animate() {
  let mixerUpdateDelta = clock.getDelta();
  if (characterControls) {
    characterControls.update(mixerUpdateDelta, keysPressed);
  }

  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
