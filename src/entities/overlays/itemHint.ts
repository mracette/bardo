import { Canvas2DGraphics, PI, star, TAU, Vector2 } from '../../crco';
import { SpawnType } from '../../events/spawn';
import { state } from '../../globals/game';
import { origin } from '../../globals/map';
import { palette } from '../../globals/palette';
import { CachedEntity } from '../entity';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';

const width = 0.1;

export class ItemHint extends CachedEntity {
  start: number;
  spriteKey = EntityType.HeartHint;
  shouldDestroy = false;
  radius = 1.5;
  spriteSize = 3;
  duration = 2500;
  flashing = state.spritePeriod / 2;

  options = undefined;
  coordinateSystem = spriteCoordinateSystem.internal;
  spawnType: SpawnType;

  constructor(position: Vector2, start: number, type: SpawnType) {
    super(position);
    this.spawnType = type;
    this.start = start;
  }

  static duration = 2500;

  drawSprite = (graphics: Canvas2DGraphics) => {
    graphics.rect(-width * 12, -width, width * 6, width, {
      styles: {
        fillStyle: palette.seafoam
      },
      fill: true,
      stroke: false
    });
    graphics.rect(-width * 6, -width, width * 3, width, {
      styles: {
        rotation: { origin: origin, rotation: -TAU / 8 },
        fillStyle: palette.seafoam
      },
      fill: true,
      stroke: false
    });
    graphics.rect(-width * 6, -width, width * 3, width, {
      styles: {
        rotation: { origin: origin, rotation: TAU / 8 },
        fillStyle: palette.seafoam
      },
      fill: true,
      stroke: false
    });
  };

  update() {
    super.update();
    if (state.time.elapsedInGame - this.start > ItemHint.duration) {
      this.shouldDestroy = true;
    }
  }
}
