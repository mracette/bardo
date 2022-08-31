import { Canvas2DGraphicsOptions, Canvas2DGraphics, clamp, Vector2 } from 'crco-utils';
import { meditator } from '../../svg/meditator';
import { state } from '../globals/game';
import { mapDimensions } from '../globals/map';
import { SQRT_2_2 } from '../globals/math';
import { palette } from '../globals/palette';
import { CachedEntity } from './entity';
import { EntityType } from './entityType';
import { spriteCoordinateSystem } from './sprites';

export class Player extends CachedEntity {
  radius = 0.75;
  spriteSize = 1.5;
  spriteKey = EntityType.Player;
  speed = 0.005;
  coordinateSystem = spriteCoordinateSystem.external;
  forwardDirection: 'left' | 'right' = 'right';
  mirrorImageOptions: Canvas2DGraphicsOptions = {
    styles: {
      scale: { origin: this.center, scale: new Vector2(-1, 1) }
    }
  };
  options: Canvas2DGraphicsOptions = {
    styles: { fillStyle: palette.violet },
    fill: true
  };

  constructor(position: Vector2) {
    super(position);
  }

  draw(alpha: number) {
    super.draw(
      alpha,
      this.forwardDirection === 'left' ? this.mirrorImageOptions : undefined
    );
  }

  drawSprite = (graphics: Canvas2DGraphics | Canvas2DGraphics) => {
    meditator.forEach((lines) => {
      graphics.lineSegments(lines, this.options);
    });
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
}
