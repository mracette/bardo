import { Canvas2DGraphics, circleCircleCollision, lerp, TAU } from 'crco-utils';
import { state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { player } from '../../globals/player';
import { stats } from '../../globals/stats';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Weapon, WeaponInstance } from './weapon';

export class OrbInstance extends WeaponInstance<Orb> {
  coordinateSystem = spriteCoordinateSystem.internal;
  spriteSize = 1;
  spriteKey = EntityType.Orb;
  radius = 0.25;
  offset = 0;
  options = undefined;

  constructor(parent: Orb) {
    super(parent);
  }

  static staticDraw(graphics: Canvas2DGraphics, radius: number) {
    graphics.circle(0, 0, radius, {
      styles: { fillStyle: palette.violet },
      fill: true
    });
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    OrbInstance.staticDraw(graphics, this.radius);
  };

  updatePosition = (elapsed: number, delta: number) => {
    const angle = this.offset + TAU * (elapsed / this.parent.period);
    const x = player.center.x + Math.cos(angle) * this.parent.range - this.spriteSize / 2;
    const y = player.center.y + Math.sin(angle) * this.parent.range - this.spriteSize / 2;
    this.position.x = lerp(1 - this.parent.drag, this.positionPrevious.x, x);
    this.position.y = lerp(1 - this.parent.drag, this.positionPrevious.y, y);
  };
}

export class Orb extends Weapon<OrbInstance> {
  level = 1;
  drag = 0.33;
  period = 2000;
  type = EntityType.Orb;

  constructor(equipped?: boolean) {
    super(equipped);
    this.instances.push(new OrbInstance(this));
  }

  get stats() {
    return stats[EntityType.Orb];
  }

  get orbs() {
    return this.stats.Orbs[this.level - 1];
  }

  get range() {
    return this.stats.Range[this.level - 1];
  }

  get damage() {
    return this.stats.Damage[this.level - 1];
  }

  upgrade = () => {
    if (this.canUpgrade()) {
      this.level++;
      while (this.instances.length < this.orbs) {
        this.instances.push(new OrbInstance(this));
        this.instances.forEach(
          (orb, i) => (orb.offset = (TAU * i) / this.instances.length)
        );
      }
    }
  };
}
