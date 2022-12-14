import { Canvas2DGraphics, circleCircleCollision, Vector2 } from '../../crco';
import { state } from '../../globals/game';
import { player } from '../../globals/player';
import { CachedEntity } from '../entity';
import { EntityType } from '../entityType';

export abstract class WeaponInstance<T extends Weapon<any>> extends CachedEntity {
  destroyOnCollide = false;

  abstract updatePosition: () => void;

  parent: T;

  constructor(parent: T, position = player.center.clone()) {
    super(position);
    this.parent = parent;
  }

  handleCollisions = (damage: number) => {
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
        enemy.damage(damage, this.spriteKey as EntityType);
        if (this.destroyOnCollide) {
          this.shouldDestroy = true;
        }
      }
    }
  };

  update() {
    super.update();
    this.updatePosition();
    this.updateCenterFromPosition();
    this.handleCollisions(this.parent.damage);
  }
}

export abstract class Weapon<T extends WeaponInstance<any>> {
  instances: T[] = [];

  abstract type: EntityType;
  abstract upgrade: () => void;
  abstract level: number;
  abstract damage: number;

  constructor(equipped = true) {
    if (equipped) {
      state.weapons.push(this);
    }
  }

  canUpgrade() {
    return this.level < 7;
  }

  draw(alpha: number, graphics?: Canvas2DGraphics) {
    for (let i = 0; i < this.instances.length; i++) {
      this.instances[i].draw(alpha, graphics);
    }
  }

  update() {
    for (let i = 0; i < this.instances.length; i++) {
      if (this.instances[i].shouldDestroy) {
        this.instances.splice(i, 1);
      } else {
        this.instances[i].update();
      }
    }
  }

  // TODO: inefficient. improve this?
  findNearestEnemy() {
    let shortestDistance = Infinity;
    let enemy;
    for (let i = 0; i < state.enemies.length; i++) {
      const enemyDistance = player.center.distanceTo(state.enemies[i].center);
      if (enemyDistance < shortestDistance) {
        shortestDistance = enemyDistance;
        enemy = state.enemies[i];
      }
    }
    return enemy;
  }
}
