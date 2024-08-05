import { Vector3 } from 'three';
import { Keys } from '../Constants';

export default class PlayerController {
  _player = null;
  _mouseMovement = null;
  _keysPressed = null;

  _moveSpeed = 3;
  _turnSpeed = 10;

  constructor(player) {
    this._player = player;
    this._keysPressed = {};
    this._mouseMovement = {
      x: 0,
      y: 0,
    };

    this._setEventListeners();
  }

  update(deltaTime) {
    const pressedKeys = this._keysPressed;
    const mouseMovement = this._mouseMovement;

    const moveVector = new Vector3(0, 0, 0);

    if (pressedKeys[Keys.W]) moveVector.z -= 1;
    if (pressedKeys[Keys.S]) moveVector.z += 1;
    if (pressedKeys[Keys.A]) moveVector.x -= 1;
    if (pressedKeys[Keys.D]) moveVector.x += 1;

    moveVector.normalize().multiplyScalar(this._moveSpeed * deltaTime);
    this._player.move(moveVector);

    if (pressedKeys[Keys.Space]) this._player.jump();

    if (mouseMovement.x) {
      this._player.lookHorizontal(
        (-this._mouseMovement.x * deltaTime * this._turnSpeed * Math.PI) / 180
      );
    }
    if (mouseMovement.y) {
      this._player.lookVertical(
        (-this._mouseMovement.y * deltaTime * this._turnSpeed * Math.PI) / 180
      );
    }

    this._mouseMovement.x = 0;
    this._mouseMovement.y = 0;
  }

  _handleKeyDown(event) {
    this._keysPressed[event.code] = true;
  }
  _handleKeyUp(event) {
    this._keysPressed[event.code] = false;
  }

  _handleMouseMove = (event) => {
    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    this._mouseMovement.x = movementX;
    this._mouseMovement.y = movementY;
  };

  _setEventListeners() {
    document.addEventListener('keydown', (event) => this._handleKeyDown(event));
    document.addEventListener('keyup', (event) => this._handleKeyUp(event));

    document.body.addEventListener('click', () =>
      document.body.requestPointerLock()
    );

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === document.body)
        document.addEventListener('mousemove', this._handleMouseMove);
      else document.removeEventListener('mousemove', this._handleMouseMove);
    });
  }
}
