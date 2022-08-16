import { Canvas2DGraphics, Canvas2DGraphicsRough, clamp, Vector2 } from 'crco-utils';
import { mapCenter, mapDimensions, state, tileWidth } from '../globals/game';
import { SQRT_2_2 } from '../globals/math';
import { CachedEntity } from './entity';

export class Player extends CachedEntity {
  size = 0.5;
  speed = 0.005;
  spriteCoordinateBounds = [-1, 1];

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
    const moveAmount = delta * this.speed;
    const diagonalAmount = SQRT_2_2 * moveAmount;
    let deltaX = 0;
    let deltaY = 0;
    if (state.move.left && state.move.up) {
      deltaX = -diagonalAmount;
      deltaY = -diagonalAmount;
    } else if (state.move.left && state.move.down) {
      deltaX = -diagonalAmount;
      deltaY = diagonalAmount;
    } else if (state.move.right && state.move.up) {
      deltaX = diagonalAmount;
      deltaY = -diagonalAmount;
    } else if (state.move.right && state.move.down) {
      deltaX = diagonalAmount;
      deltaY = diagonalAmount;
    } else if (state.move.up) {
      deltaY = -moveAmount;
    } else if (state.move.down) {
      deltaY = moveAmount;
    } else if (state.move.left) {
      deltaX = -moveAmount;
    } else if (state.move.right) {
      deltaX = moveAmount;
    }
    this.position.x = clamp(this.position.x + deltaX, 0, mapDimensions.x - 1);
    this.position.y = clamp(this.position.y + deltaY, 0, mapDimensions.y - 1);
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
