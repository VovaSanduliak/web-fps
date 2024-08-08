import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { createScene } from './Scene';
import { createFloor } from './Floor';
import { createAmbientLight, createDirectionalLight } from './Lights';

export default class World {
  scene = null;
  floor = null;
  physicsWorld = null;

  worldObjects = [];
  physicsObjects = [];

  constructor() {
    this.scene = createScene();
    this.physicsWorld = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0),
    });
    this._setupFloor();
    this._setupLights();
  }

  _setupFloor = () => {
    const floor = createFloor();
    this.scene.add(floor);
    this.physicsWorld.addBody(floor.physicsComponent);
  };

  _setupLights = () => {
    const ambientLight = createAmbientLight();
    const directionalLight = createDirectionalLight();
    this.scene.add(ambientLight, directionalLight);
  };

  add = (threeObject) => {
    console.log(threeObject);
    this.scene.add(threeObject);
    this.physicsWorld.addBody(threeObject.physicsComponent);

    this.worldObjects.push(threeObject);
    this.physicsObjects.push(threeObject.physicsComponent);

    return threeObject;
  };

  remove = () => {};
  update = (deltaTime) => {
    this.worldObjects.forEach((worldObj) => {
      worldObj.update(deltaTime);
    });
  };
}
