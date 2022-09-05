import { circleCircleCollision, Vector2 } from 'crco-utils';
import { state } from '../../globals/game';
import { player } from '../../globals/player';
import { CachedEntity } from '../entity';
import { EntityType } from '../entityType';
import { Arrow } from './arrow';
import { Axe } from './axe';
import { MagicCircle } from './circle';
import { Orb } from './orb';

export type WeaponType = typeof Orb | typeof Arrow | typeof Axe | typeof MagicCircle;

export abstract class WeaponInstance<T extends Weapon<any>> extends CachedEntity {
  size = 0.25;
  destroyOnCollide = false;

  abstract updatePosition: (elapsed: number, delta: number, index: number) => void;

  parent: T;

  constructor(parent: T, position = player.center.clone()) {
    super(position);
    this.parent = parent;
  }

  handleCollisions = (damage: number, index: number, elapsed: number) => {
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
        enemy.damage(damage, index, elapsed, this.spriteKey as EntityType);
        if (this.destroyOnCollide) {
          this.shouldDestroy = true;
        }
      }
    }
  };

  update(elapsed: number, delta: number, index: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta, index);
    this.updateCenterFromPosition();
    this.handleCollisions(this.parent.damage, index, elapsed);
  }
}

export abstract class Weapon<T extends WeaponInstance<any>> {
  instances: T[] = [];

  abstract type: EntityType;
  abstract upgrade: () => void;
  abstract level: number;
  abstract damage: number;

  constructor() {
    state.weapons.push(this);
  }

  canUpgrade() {
    return this.level < 7;
  }

  draw(alpha: number) {
    for (let i = 0; i < this.instances.length; i++) {
      this.instances[i].draw(alpha);
    }
  }

  update(elapsed: number, delta: number) {
    for (let i = 0; i < this.instances.length; i++) {
      if (this.instances[i].shouldDestroy) {
        this.instances.splice(i, 1);
      } else {
        this.instances[i].update(elapsed, delta, i);
      }
    }
  }
}
