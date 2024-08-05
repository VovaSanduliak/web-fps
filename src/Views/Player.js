import * as THREE from 'three';
import { UNIT_ACTIONS } from '../Enums/UnitActions';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import FirstPersonCamera from './FirstPersonCamera';
import PlayerController from '../Controllers/PlayerController';

const playerModel3DUrl = '../../assets/models/Steve.glb';

export default class Player extends THREE.Object3D {
  camera = null;
  skin = null;
  animationMixer = null;
  animationsMap = new Map();
  controller = null;
  currActionName = UNIT_ACTIONS.Idle;

  jawObject = null;

  constructor() {
    super();
    this._init();
    this._setupCamera();
    this.controller = new PlayerController(this);
  }

  _init = async () => {
    await this._loadModel();
  };

  _setupCamera = () => {
    this.camera = new FirstPersonCamera();

    this.jawObject = new THREE.Object3D();
    this.add(this.jawObject);
    this.jawObject.add(this.camera);
    this.camera.position.set(0, 1.6, -0.09);

    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
  };

  _loadModel = async () => {
    const gltfLoader = new GLTFLoader();

    const gltf = await gltfLoader.loadAsync(playerModel3DUrl);
    this.skin = gltf.scene.children[0];
    this.add(this.skin);

    this.skin.traverse((obj) => {
      if (obj.isMesh) obj.castShadow = true;
    });

    this.animationMixer = new THREE.AnimationMixer(this.skin);

    const clips = gltf.animations;
    clips
      .filter((clip) => clip.name != 'TPose')
      .forEach((clip) =>
        this.animationsMap.set(clip.name, this.animationMixer.clipAction(clip))
      );

    this.animationsMap.get(UNIT_ACTIONS.Idle).play();
  };

  update = (deltaTime) => {
    this.controller && this.controller.update(deltaTime);
    this.animationMixer && this.animationMixer.update(deltaTime);
  };

  move = (direction) => {
    this.translateX(direction.x);
    this.translateY(direction.y);
    this.translateZ(direction.z);

    if (direction.x !== 0 || direction.z !== 0)
      this.playAnimation(UNIT_ACTIONS.Walk);
    else if (direction.x === 0 || direction.z === 0)
      this.playAnimation(UNIT_ACTIONS.Idle);
  };

  lookVertical = (angle) => {
    this.euler.x = Math.min(
      Math.max(this.euler.x + angle, -Math.PI / 3),
      Math.PI / 3
    );
    this.camera.rotation.set(this.euler.x, this.euler.y, this.euler.z);
  };

  lookHorizontal = (angle) => {
    this.rotateY(angle);
  };

  playAnimation(actionName) {
    if (this.currActionName === actionName) return;

    const prevAction = this.animationsMap.get(this.currActionName);
    const nextAction = this.animationsMap.get(actionName);

    prevAction.fadeOut(0.2);
    nextAction.reset().fadeIn(0.2).play();
    this.currActionName = actionName;
  }
}
