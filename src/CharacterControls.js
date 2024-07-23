import * as THREE from 'three';
import { KEYS, DIRECTIONS, UNIT_ACTIONS } from './utils/Constants';

class CharacterControls {
  toggleRun = true;
  currentAction = '';

  // temporary data
  walkDirection = new THREE.Vector3();
  rotateAngle = new THREE.Vector3(0, 1, 0);
  rotateQuaternion = new THREE.Quaternion();
  cameraTarget = new THREE.Vector3();

  // constants
  fadeDuration = 0.2;
  walkVelocity = 2;
  runVelocity = 5;

  constructor(
    model,
    mixer,
    animationsMap,
    orbitControl,
    camera,
    currentAction
  ) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.currentAction = currentAction;

    this.animationsMap.forEach((value, key) => {
      if (key == currentAction) {
        value.play();
      }
    });

    this.orbitControl = orbitControl;
    this.camera = camera;
  }

  switchRunToggle() {
    this.toggleRun = !this.toggleRun;
  }

  update(delta, keysPressed) {
    const directionPressed = DIRECTIONS.some((key) => keysPressed[key] == true);

    let play = '';
    if (directionPressed && this.toggleRun) {
      play = UNIT_ACTIONS.Run;
    } else if (directionPressed) {
      play = UNIT_ACTIONS.Walk;
    } else {
      play = UNIT_ACTIONS.Idle;
    }

    if (this.currentAction != play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);

      current.fadeOut(this.fadeDuration);
      toPlay.reset().fadeIn(this.fadeDuration).play();

      this.currentAction = play;
    }

    this.mixer.update(delta);

    if (
      this.currentAction == UNIT_ACTIONS.Run ||
      this.currentAction == UNIT_ACTIONS.Walk
    ) {
      // calculate towards camera direction
      let angleYCameraDirection = Math.atan2(
        this.camera.position.x - this.model.position.x,
        this.camera.position.z - this.model.position.z
      );
      let directionOffset = this._directionOffset(keysPressed);

      // rotate model
      this.rotateQuaternion.setFromAxisAngle(
        this.rotateAngle,
        angleYCameraDirection + directionOffset
      );
      this.model.quaternion.rotateTowards(this.rotateQuaternion, 0.2);

      // calculate direction
      this.camera.getWorldDirection(this.walkDirection);
      this.walkDirection.y = 0;
      this.walkDirection.normalize();
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

      // run/walk velocity
      const velocity =
        this.currentAction == UNIT_ACTIONS.Run
          ? this.runVelocity
          : this.walkVelocity;

      // move model & camera
      const moveX = this.walkDirection.x * velocity * delta;
      const moveZ = this.walkDirection.z * velocity * delta;

      this.model.position.x += moveX;
      this.model.position.z += moveZ;
      this._updateCameraTarget(moveX, moveZ);
    }
  }

  _updateCameraTarget(moveX, moveZ) {
    // move camera
    this.camera.position.x += moveX;
    this.camera.position.z += moveZ;

    // update camera target
    this.cameraTarget.x = this.model.position.x;
    this.cameraTarget.y = this.model.position.y + 1;
    this.cameraTarget.z = this.model.position.z;
    this.orbitControl.target = this.cameraTarget;
  }

  _directionOffset(keysPressed) {
    var directionOffset = 0; // w

    if (keysPressed[KEYS.W]) {
      if (keysPressed[KEYS.A]) {
        directionOffset = Math.PI / 4; // w+a
      } else if (keysPressed[KEYS.D]) {
        directionOffset = -Math.PI / 4; // w+d
      }
    } else if (keysPressed[KEYS.S]) {
      if (keysPressed[KEYS.A]) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (keysPressed[KEYS.D]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (keysPressed[KEYS.A]) {
      directionOffset = Math.PI / 2;
    } else if (keysPressed[KEYS.D]) {
      directionOffset = -Math.PI / 2;
    }

    return directionOffset;
  }
}

export { CharacterControls };
