import { Canvas2DGraphicsRough, circleCircleCollision, TAU, Vector2 } from 'crco-utils';
import { state } from '../globals/game';
import { player } from '../globals/player';
import { CircularBounding } from './bounding/circlular';
import { CachedEntity } from './entity';

export class Weapon extends CachedEntity implements CircularBounding {
  size = 0.25;
  speed = 0.0005;
  spinRadius = 1.5;
  radius = 0.25;
  spriteCoordinateBounds = [-1, 1];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
    this.generateSprites();
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.circle(0, 0, this.radius);
  };

  update(elapsed: number, delta: number) {
    this.positionPrevious.set(this.position);
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
    this.checkCollisions();
  }

  checkCollisions() {
    for (let i = 0; i < state.enemies.length; i++) {
      const enemy = state.enemies[i];
      // console.log(
      //   circleCircleCollision(
      //     this.position.x,
      //     this.position.y,
      //     this.radius,
      //     enemy.position.x,
      //     enemy.position.y,
      //     enemy.radius
      //   )
      // );
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

  updatePosition(elapsed: number, delta: number) {
    this.positionPrevious.set(this.position);
    const angle = TAU * elapsed * this.speed;
    this.position.x = player.position.x + Math.cos(angle) * this.spinRadius;
    this.position.y = player.position.y + Math.sin(angle) * this.spinRadius;
  }
}
