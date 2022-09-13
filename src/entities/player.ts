import { meditator } from '../../svg/meditator';
import {
  Canvas2DGraphicsOptions,
  Canvas2DGraphics,
  clamp,
  Vector2,
  circleCircleCollision,
  lerp
} from '../crco';
import { drawUi } from '../drawing/drawUi';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { mapDimensions, tileWidth } from '../globals/map';
import { SQRT_2_2 } from '../globals/math';
import { palette } from '../globals/palette';
import { Trigger, triggerEvent } from '../util/eventRegister';
import { zzfx } from '../zzfx';
import { CachedEntity } from './entity';
import { EntityType } from './entityType';
import { spriteCoordinateSystem } from './sprites';

export class Player extends CachedEntity {
  lastDamaged = 0;
  radius = 0.4;
  spriteSize = 1.5;
  spriteKey = EntityType.Player;
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

  get speed() {
    const multiplier = state.shroomed.active ? 2 : 1;
    return 0.065 * multiplier;
  }

  get quadrant() {
    const percent = 0.1;
    if (this.center.y < mapDimensions.y * percent) return 0; // top
    if (this.center.y > mapDimensions.y * (1 - percent)) return 1; // bottom
    if (this.center.x < mapDimensions.x * percent) return 2; // left
    if (this.center.x > mapDimensions.x * (1 - percent)) return 3; // right
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
      (tileWidth * state.health) / state.maxHealth,
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

  update = () => {
    super.update();
    this.updatePosition();
    this.updateCenterFromPosition();
    this.checkCollisions();
  };

  checkCollisions() {
    if (state.time.elapsedInGame < this.lastDamaged + Player.damageCooldown) {
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
        ) &&
        !state.shroomed.active
      ) {
        this.takeDamage(enemy.damageInflicted, state.time.elapsedInGame);
        // one damage per frame
        break;
      }
    }
  }

  takeDamage(amount: number, elapsed: number) {
    zzfx(...[, , 528, 0.01, , 0.48, , 0.6, -11.6, , , , 0.32, 4.2]);
    this.lastDamaged = elapsed;
    state.health -= amount;
    state.stats.damageTaken += amount;
    if (state.health <= 0) {
      triggerEvent(Trigger.StateChange, GameState.Gameover);
    }
    drawUi();
  }

  updatePosition = () => {
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
