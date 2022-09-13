import { boundedSine } from 'bounded-sine';
import { Canvas2DGraphicsOptions, Canvas2DGraphics, Vector2 } from '../../crco';
import { state } from '../../globals/game';
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
    this.spriteKey = `text:${text}`; // avoid collisions with const enum values
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
    graphics.circle(0, 0, 0.4, {
      fill: true,
      styles: { fillStyle: palette.red }
    });
    graphics.text(this.text, 0, 0, {
      fill: true,
      styles: {
        fontSize: (coords) => coords.width(0.35),
        textBaseline: 'middle'
      },
      roughness: 0
    });
  };

  update() {
    super.update();
    const amount = sine((state.time.elapsed - this.start) / this.duration);
    // @ts-ignore
    this.scaleOptions.styles.scale.origin = this.center;
    // @ts-ignore
    this.scaleOptions.styles.scale.scale.x = amount;
    // @ts-ignore
    this.scaleOptions.styles.scale.scale.y = amount;
    DamageOverlay.setPositionFromTarget(this.position, this.target);
    if (state.time.elapsed - this.start >= this.duration) {
      this.shouldDestroy = true;
    }
  }
}
