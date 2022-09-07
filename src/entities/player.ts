import { meditator } from '../../svg/meditator';
import {
  Canvas2DGraphicsOptions,
  Canvas2DGraphics,
  clamp,
  Vector2,
  circleCircleCollision,
  lerp
} from '../crco';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { mapDimensions, tileWidth } from '../globals/map';
import { SQRT_2_2 } from '../globals/math';
import { palette } from '../globals/palette';
import { CachedEntity } from './entity';
import { EntityType } from './entityType';
import { spriteCoordinateSystem } from './sprites';

export class Player extends CachedEntity {
  lastDamaged = 0;
  maxHealth = 100;
  health = 100;
  radius = 0.6;
  spriteSize = 1.5;
  spriteKey = EntityType.Player;
  speed = 0.065;
  coordinateSystem = spriteCoordinateSystem.external;
  forwardDirection: 'left' | 'right' = 'right';
  mirrorImageOptions: Canvas2DGraphicsOptions = {
    styles: {
      scale: { origin: this.centerAlpha, scale: new Vector2(-1, 1) }
    }
  };
  options: Canvas2DGraphicsOptions = {
    styles: { fillStyle: palette.violet },
    fill: true
  };

  constructor(position: Vector2) {
    super(position);
  }

  static damageCooldown = 400;

  get quadrant() {
    const percent = 0.1;
    if (this.position.y < mapDimensions.y * percent) return 0; // top
    if (this.position.y > mapDimensions.y * (1 - percent)) return 1; // bottom
    if (this.position.x < mapDimensions.x * percent) return 2; // left
    if (this.position.x > mapDimensions.x * (1 - percent)) return 3; // right
    return false;
  }

  draw(alpha: number) {
    this.preDraw(alpha);
    super.draw(
      alpha,
      this.forwardDirection === 'left' ? this.mirrorImageOptions : undefined,
      false
    );
    graphics.gameplay.rect(
      this.centerAlpha.x - 0.5,
      this.centerAlpha.y + this.spriteSize / 2,
      (tileWidth * this.health) / this.maxHealth,
      tileWidth / 10,
      {
        fill: true,
        stroke: false,
        roughness: 0,
        styles: {
          fillStyle: palette.red
        }
      }
    );
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    meditator.forEach((lines) => {
      graphics.lineSegments(lines, this.options);
    });
  };

  update = (elapsed: number, delta: number) => {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
    this.updateCenterFromPosition();
    this.checkCollisions(elapsed);
  };

  checkCollisions(elapsed: number) {
    if (elapsed < this.lastDamaged + Player.damageCooldown) {
      return;
    }
    for (let i = 0; i < state.enemies.length; i++) {
      const enemy = state.enemies[i];
      if (
        circleCircleCollision(
          this.center.x,
          this.center.y,
          this.radius,
          enemy.center.x,
          enemy.center.y,
          enemy.radius
        )
      ) {
        this.takeDamage(enemy.damageInflicted, elapsed);
      }
    }
  }

  takeDamage(amount: number, elapsed: number) {
    this.lastDamaged = elapsed;
    this.health -= amount;
  }

  updatePosition = (elapsed: number, delta: number) => {
    const moveAmount = this.speed;
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
