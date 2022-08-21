import { state } from '../../globals/game';
import { player } from '../../globals/player';
import { CachedEntity } from '../entity';

export abstract class WeaponInstance<T extends Weapon<any>> extends CachedEntity {
  size = 0.25;
  speed = 0.0005;

  abstract updatePosition: (elapsed: number, delta: number) => void;
  abstract handleCollisions: () => void;

  parent: T;

  constructor(parent: T) {
    super(player.position.clone());
    this.parent = parent;
  }

  update(elapsed: number, delta: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
    this.handleCollisions();
  }
}

export abstract class Weapon<T extends WeaponInstance<any>> {
  instances: T[] = [];

  abstract upgrade: () => void;

  constructor() {
    state.weapons.push(this);
  }

  draw(alpha: number) {
    for (let i = 0; i < this.instances.length; i++) {
      this.instances[i].draw(alpha);
    }
  }

  update(elapsed: number, delta: number) {
    for (let i = 0; i < this.instances.length; i++) {
      this.instances[i].update(elapsed, delta);
    }
  }
}
