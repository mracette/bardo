import { Canvas2DGraphicsRough, circleCircleCollision, TAU, Vector2 } from 'crco-utils';
import { state } from '../../globals/game';
import { player } from '../../globals/player';
import { CircularBounding } from '../bounding/circular';
import { CachedEntity } from '../entity';

export abstract class Weapon extends CachedEntity implements CircularBounding {
  size = 0.25;
  speed = 0.0005;
  spriteCoordinateBounds = [-1, 1];

  abstract radius: number; // required for circular collision checks
  abstract updatePosition: (elapsed: number, delta: number) => void;

  constructor(graphics: Canvas2DGraphicsRough) {
    super(graphics, player.position.clone());
    state.weapons.push(this);
  }

  update(elapsed: number, delta: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
    this.checkCollisions();
  }

  checkCollisions() {
    for (let i = 0; i < state.enemies.length; i++) {
      const enemy = state.enemies[i];
      if (
        circleCircleCollision(
          this.position.x,
          this.position.y,
          this.radius,
          enemy.position.x,
          enemy.position.y,
          enemy.radius
        )
      ) {
        enemy.destroy(i);
      }
    }
  }
}
