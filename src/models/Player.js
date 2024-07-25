import * as THREE from 'three';

import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { CharacterControls } from '../CharacterControls';

const playerModelUrl = 'Steve.glb';

class Player {
  constructor(scene, camera, renderer) {
    this.characterControls = null;
    this.model = null;
    this.mixer = null;
    this.animationsMap = new Map();
    this.keysPressed = {};

    // CONTROLS
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 7;
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
    orbitControls.update();
    // END CONTROLS

    const gltfLoader = new GLTFLoader().load(playerModelUrl, (gltf) => {
      this.model = gltf.scene;
      this.model.traverse((object) => {
        if (object.isMesh) object.castShadow = true;
      });

      scene.add(this.model);

      this.mixer = new THREE.AnimationMixer(this.model);
      const gltfAnimations = gltf.animations;
      gltfAnimations
        .filter((a) => a.name != 'TPose')
        .forEach((a) =>
          this.animationsMap.set(a.name, this.mixer.clipAction(a))
        );

      this.characterControls = new CharacterControls(
        this.model,
        this.mixer,
        this.animationsMap,
        orbitControls,
        camera,
        'Idle'
      );
    });

    document.addEventListener('keydown', (event) => this._handleKeyDown(event));
    document.addEventListener('keyup', (event) => this._handleKeyUp(event));
  }

  update = (deltaTime) => {
    if (this.characterControls) {
      this.characterControls.update(deltaTime, this.keysPressed);
    }
  };

  _handleKeyDown = (event) => {
    if (event.shiftKey && this.characterControls) {
      this.characterControls.switchRunToggle();
    } else {
      this.keysPressed[event.key.toLowerCase()] = true;
    }
  };

  _handleKeyUp = (event) => {
    this.keysPressed[event.key.toLowerCase()] = false;
  };
}

export { Player };
