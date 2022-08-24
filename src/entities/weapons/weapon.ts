import { Vector2 } from 'crco-utils';
import { state } from '../../globals/game';
import { player } from '../../globals/player';
import { CachedEntity } from '../entity';

export abstract class WeaponInstance<T extends Weapon<any>> extends CachedEntity {
  size = 0.25;

  abstract updatePosition: (elapsed: number, delta: number, index: number) => void;
  abstract handleCollisions: (index: number) => void;

  parent: T;

  constructor(parent: T, position = player.center.clone()) {
    super(position);
    this.parent = parent;
  }

  update(elapsed: number, delta: number, index: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta, index);
    this.handleCollisions(index);
  }
}

export abstract class Weapon<T extends WeaponInstance<any>> {
  instances: T[] = [];

  abstract upgrade: () => void;
  abstract level: number;

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
      this.instances[i].update(elapsed, delta, i);
    }
  }
}
