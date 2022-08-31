import { boundedSine } from 'bounded-sine';
import {
  Canvas2DGraphicsOptions,
  Canvas2DGraphics,
  star,
  Vector2
} from 'crco-utils';
import { state } from '../../globals/game';
import { coordinates } from '../../globals/graphics';
import { origin } from '../../globals/map';
import { palette } from '../../globals/palette';
import { Enemy } from '../enemies/enemy';
import { CachedEntity } from '../entity';
import { spriteCoordinateSystem } from '../sprites';

const sine = boundedSine({ yStart: 0.5, yMax: 1, yMin: 0.2, period: 2 });

export class DamageOverlay extends CachedEntity {
  start: number;
  text: string;
  target: Enemy<any>;

  radius = 0.5;
  spriteSize = 1;
  duration = 500;
  scaleOptions: Canvas2DGraphicsOptions = {
    styles: {
      scale: {
        origin: origin,
        scale: new Vector2(1, 1)
      }
    }
  };

  options = undefined;
  coordinateSystem = spriteCoordinateSystem.internal;

  constructor(target: Enemy<any>, text: string, start: number) {
    super(DamageOverlay.setPositionFromTarget(target.center.clone(), target));
    this.target = target;
    this.spriteKey = text;
    this.text = text;
    this.start = start;
  }

  static setPositionFromTarget(position: Vector2, target: CachedEntity) {
    // hardcoded sprite size
    position.x = target.center.x - 1 / 2;
    position.y = target.center.y - 1.5;
    return position;
  }

  draw = (alpha: number) => {
    super.draw(alpha, this.scaleOptions);
  };

  drawSprite = (graphics: Canvas2DGraphics) => {
    graphics.text(this.text, 0, 0, {
      fill: true,
      styles: {
        fontSize: (coords) => coords.width(0.35),
        textBaseline: 'top'
      },
      roughness: 0.3
    });
  };

  update(elapsed: number, index: number) {
    super.update(elapsed, 0, index);
    const amount = sine((elapsed - this.start) / this.duration);
    // @ts-ignore
    this.scaleOptions.styles.scale.origin = this.center;
    // @ts-ignore
    this.scaleOptions.styles.scale.scale.x = amount;
    // @ts-ignore
    this.scaleOptions.styles.scale.scale.y = amount;
    DamageOverlay.setPositionFromTarget(this.position, this.target);
    if (elapsed - this.start >= this.duration) {
      this.shouldDestroy = true;
    }
  }
}
