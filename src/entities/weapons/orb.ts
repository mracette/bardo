import { Canvas2DGraphicsRough, circleCircleCollision, lerp, TAU } from 'crco-utils';
import { state } from '../../globals/game';
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

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.circle(0, 0, this.radius);
  };

  updatePosition = (elapsed: number, delta: number) => {
    this.positionPrevious.set(this.position);
    const angle = this.offset + TAU * elapsed * this.speed;
    const x =
      player.center.x + Math.cos(angle) * this.parent.stats.orbit - this.spriteSize / 2;
    const y =
      player.center.y + Math.sin(angle) * this.parent.stats.orbit - this.spriteSize / 2;
    this.position.x = lerp(1 - this.parent.stats.drag, this.positionPrevious.x, x);
    this.position.y = lerp(1 - this.parent.stats.drag, this.positionPrevious.y, y);
  };
}

export class Orb extends Weapon<OrbInstance> {
  level = 1;
  drag = 0.33;

  constructor() {
    super();
    this.instances.push(new OrbInstance(this));
  }

  get canUpgrade() {
    return stats[EntityType.Orb].length > this.level;
  }

  get stats() {
    return stats[EntityType.Orb][this.level - 1];
  }

  upgrade = () => {
    this.instances.push(new OrbInstance(this));
    this.instances.forEach((orb, i) => (orb.offset = (TAU * i) / this.instances.length));
  };
}
