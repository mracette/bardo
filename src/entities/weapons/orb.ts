import { Canvas2DGraphicsRough, circleCircleCollision, lerp, TAU } from 'crco-utils';
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

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.circle(0, 0, this.radius, {
      styles: { fillStyle: palette.violet },
      fill: true
    });
  };

  updatePosition = (elapsed: number, delta: number) => {
    this.positionPrevious.set(this.position);
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

  constructor() {
    super();
    this.instances.push(new OrbInstance(this));
  }

  get stats() {
    return stats[EntityType.Orb];
  }

  get orbs() {
    return this.stats.orbs[this.level - 1];
  }

  get range() {
    return this.stats.range[this.level - 1];
  }

  get damage() {
    return this.stats.damage[this.level - 1];
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
