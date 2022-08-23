import {
  Canvas2DGraphicsRough,
  circleCircleCollision,
  lerp,
  TAU,
  distance,
  Vector2,
  Canvas2DGraphicsOptions,
  PI
} from 'crco-utils';
import { state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { player } from '../../globals/player';
import { stats } from '../../globals/stats';
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
  }

  get radius() {
    console.log(this.parent.area);
    return this.parent.area;
  }

  get spriteSize() {
    return this.radius * 2;
  }

  handleCollisions = () => {
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
        enemy.destroy(i);
      }
    }
  };

  // draw(alpha: number) {
  //   super.draw(alpha, this.scaleOptions);
  // }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.circle(0, 0, 0.5, {
      styles: { fillStyle: palette.violet, alpha: 0.2 },
      fill: true
    });
    graphics.circle(0, 0, 0.5, {
      styles: { strokeStyle: palette.violet }
    });
    graphics.circle(0, 0, 0.4, { styles: { strokeStyle: palette.violet } });
    graphics.star(0, 0, 0.5, 5, 0.4, { styles: { strokeStyle: palette.violet } });
    // graphics.rect(-0.5, -0.5, 0.5, 0.5, { styles: { strokeStyle: palette.violet } });
    // graphics.rect(-0.5, -0.5, 0.5, 0.5, {
    //   styles: {
    //     rotation: { origin: new Vector2(0, 0), rotation: PI / 4 },
    //     strokeStyle: palette.violet
    //   }
    // });
  };

  updatePosition = (elapsed: number, delta: number) => {
    this.positionPrevious.set(this.position);
  };
}

export class MagicCircle extends Weapon<MagicCircleInstance> {
  level = 1;
  range = 5;
  speed = 0.1;
  lastFired = 0;
  frequency = 2500;
  duration = 1500;

  constructor() {
    super();
  }

  get stats() {
    return stats[EntityType.MagicCircle];
  }

  get area() {
    return this.stats.area[this.level - 1];
  }

  // get damage() {
  //   return this.stats.damage[this.level - 1];
  // }

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
        this.instances.splice(i, 1);
      }
    }
  }

  upgrade = () => {
    if (this.canUpgrade()) {
      this.level++;
    }
  };
}
