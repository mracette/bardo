import { Canvas2DGraphics, Canvas2DGraphicsRough, clamp, Vector2 } from 'crco-utils';
import { MAP_CENTER, MAP_DIMENSIONS, STATE } from '../globals/game';
import { SQRT_2_2 } from '../globals/math';
import { CachedEntity } from './entity';

export class Player extends CachedEntity {
  size = 0.5;
  speed = 0.005;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
    this.generateSprites();
  }

  drawSprite = (graphics: Canvas2DGraphics | Canvas2DGraphicsRough) => {
    graphics.star(0, 0, this.size, 5);
  };

  update = (elapsed: number, delta: number) => {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
  };

  updatePosition = (elapsed: number, delta: number) => {
    this.position.x = MAP_CENTER.x + 1 * Math.cos(elapsed / 500);
    this.position.y = MAP_CENTER.y + 1 * Math.sin(elapsed / 500);
    // const moveAmount = delta * this.speed;
    // const diagonalAmount = SQRT_2_2 * moveAmount;
    // let deltaX = 0;
    // let deltaY = 0;
    // if (STATE.move.left && STATE.move.up) {
    //   deltaX = -diagonalAmount;
    //   deltaY = -diagonalAmount;
    // } else if (STATE.move.left && STATE.move.down) {
    //   deltaX = -diagonalAmount;
    //   deltaY = diagonalAmount;
    // } else if (STATE.move.right && STATE.move.up) {
    //   deltaX = diagonalAmount;
    //   deltaY = -diagonalAmount;
    // } else if (STATE.move.right && STATE.move.down) {
    //   deltaX = diagonalAmount;
    //   deltaY = diagonalAmount;
    // } else if (STATE.move.up) {
    //   deltaY = -moveAmount;
    // } else if (STATE.move.down) {
    //   deltaY = moveAmount;
    // } else if (STATE.move.left) {
    //   deltaX = -moveAmount;
    // } else if (STATE.move.right) {
    //   deltaX = moveAmount;
    // }
    // this.position.x = clamp(this.position.x + deltaX, 0, MAP_DIMENSIONS.x - 1);
    // this.position.y = clamp(this.position.y + deltaY, 0, MAP_DIMENSIONS.y - 1);
  };

  collides = (
    x: number,
    y: number,
    positionX: number = this.position.x,
    positionY: number = this.position.y
  ) => {
    return (positionX - x) ** 2 + (positionY - y) ** 2 <= this.size ** 2;
  };
}
