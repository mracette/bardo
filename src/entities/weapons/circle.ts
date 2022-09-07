import { state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { player } from '../../globals/player';
import { stats } from '../../globals/stats';
import {
  Canvas2DGraphics,
  circleCircleCollision,
  lerp,
  TAU,
  distance,
  Vector2,
  Canvas2DGraphicsOptions,
  PI
} from '../../crco';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Weapon, WeaponInstance } from './weapon';

export class MagicCircleInstance extends WeaponInstance<MagicCircle> {
  coordinateSystem = spriteCoordinateSystem.internal;
  spriteKey = EntityType.MagicCircle;
  options = undefined;
  scaleOptions: Canvas2DGraphicsOptions;
  start: number;

  constructor(parent: MagicCircle, start: number) {
    super(parent);
    this.start = start;
    this.scaleOptions = {
      styles: { scale: new Vector2(this.parent.area, this.parent.area) }
    };
    this.positionPrevious.add(-this.radius, -this.radius);
    this.position.add(-this.radius, -this.radius);
  }

  static staticDraw(graphics: Canvas2DGraphics) {
    graphics.circle(0, 0, 0.5, {
      styles: { fillStyle: palette.violet, alpha: 0.1 },
      fill: true
    });
    graphics.circle(0, 0, 0.5, {
      styles: { strokeStyle: palette.violet }
    });
    graphics.circle(0, 0, 0.4, { styles: { strokeStyle: palette.violet } });
    for (let i = 0; i < 5; i++) {
      const x = 0.3 * Math.cos((TAU * i) / 5);
      const y = 0.3 * Math.sin((TAU * i) / 5);
      graphics.circle(x, y, 0.2, { styles: { strokeStyle: palette.violet } });
    }
  }

  get radius() {
    return this.parent.area;
  }

  get spriteSize() {
    return this.radius * 2;
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    MagicCircleInstance.staticDraw(graphics);
  };

  updatePosition = (elapsed: number, delta: number) => {
    void 0;
  };
}

export class MagicCircle extends Weapon<MagicCircleInstance> {
  level = 1;
  range = 5;
  speed = 0.1;
  lastFired = 0;
  frequency = 1500;
  duration = 1500;
  type = EntityType.MagicCircle;

  constructor(equipped?: boolean) {
    super(equipped);
  }

  get stats() {
    return stats[EntityType.MagicCircle];
  }

  get area() {
    return this.stats.Area[this.level - 1];
  }

  get damage() {
    return this.stats.Damage[this.level - 1];
  }

  update(elapsed: number, delta: number): void {
    super.update(elapsed, delta);

    if (elapsed - this.lastFired > this.frequency) {
      this.lastFired = elapsed;
      this.instances.push(new MagicCircleInstance(this, elapsed));
    }

    for (let i = 0; i < this.instances.length; i++) {
      const instance = this.instances[i];
      instance.update(elapsed, delta, i);
      if (elapsed - instance.start > this.duration) {
        instance.shouldDestroy = true;
      }
    }
  }

  upgrade = () => {
    if (this.canUpgrade()) {
      this.level++;
    }
  };
}
