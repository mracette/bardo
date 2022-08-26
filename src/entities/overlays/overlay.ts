import { Canvas2DGraphicsRough, star, Vector2 } from 'crco-utils';
import { state } from '../../globals/game';
import { coordinates } from '../../globals/graphics';
import { palette } from '../../globals/palette';
import { Enemy } from '../enemies/enemy';
import { CachedEntity } from '../entity';
import { spriteCoordinateSystem } from '../sprites';

export class Overlay extends CachedEntity {
  start: number;
  text: string;
  target: Enemy<any>;

  radius = 0.5;
  spriteSize = 1;
  duration = 500;

  options = undefined;
  coordinateSystem = spriteCoordinateSystem.internal;

  constructor(target: Enemy<any>, text: string, start: number) {
    super(Overlay.setPositionFromTarget(target.center.clone(), target));
    this.target = target;
    this.spriteKey = text;
    this.text = text;
    this.start = start;
  }

  static setPositionFromTarget(position: Vector2, target: CachedEntity) {
    position.x = target.center.x - target.spriteSize / 2;
    position.y = target.center.y - 1 - target.spriteSize / 2;
    return position;
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
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
    // TODO: check if target was destroyed
    if (elapsed - this.start >= this.duration) {
      this.destroy(index);
    }
    Overlay.setPositionFromTarget(this.position, this.target);
  }

  destroy(index: number) {
    state.overlays.splice(index);
  }
}
