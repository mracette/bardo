import { Canvas2DGraphics, PI, star, Vector2 } from '../../crco';
import { state } from '../../globals/game';
import { origin } from '../../globals/map';
import { palette } from '../../globals/palette';
import { CachedEntity } from '../entity';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';

export class EnemyHint extends CachedEntity {
  start: number;

  shouldDestroy = false;
  spriteKey = EntityType.EnemyHint;
  radius = 1.5;
  spriteSize = 3;
  duration = 2500;
  flashing = state.spritePeriod / 2;

  options = undefined;
  coordinateSystem = spriteCoordinateSystem.internal;

  constructor(position: Vector2, start: number) {
    super(position);
    this.start = start;
  }

  static duration = 2500;

  drawSprite = (graphics: Canvas2DGraphics) => {
    graphics.rect(-0.2, -0.8, 0.2, 0.8, {
      styles: { rotation: { origin: origin, rotation: PI / 4 }, fillStyle: palette.red },
      fill: true,
      stroke: false
    });
    graphics.rect(-0.2, -0.8, 0.2, 0.8, {
      styles: { rotation: { origin: origin, rotation: -PI / 4 }, fillStyle: palette.red },
      fill: true,
      stroke: false
    });
  };

  update(elapsed: number, index: number) {
    super.update(elapsed, 0, index);
    if (elapsed - this.start > EnemyHint.duration) {
      this.shouldDestroy = true;
    }
  }
}
