import { Canvas2DGraphicsRough, TAU, Vector2 } from 'crco-utils';
import { PLAYER } from '..';
import { CachedEntity } from './entity';

// export class Weapon extends CachedEntity {
//   size = 0.25;
//   speed = 0.0009;
//   radius = 1.5;

//   constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
//     super(graphics, position);
//   }

//   draw = (graphics: Canvas2DGraphicsRough) => {
//     graphics.circle(0, 0, 0.125);
//   };

//   updatePosition(elapsed: number) {
//     const angle = TAU * elapsed * this.speed;
//     this.position.x = PLAYER.position.x + Math.cos(angle) * this.radius;
//     this.position.y = PLAYER.position.y + Math.sin(angle) * this.radius;
//   }
// }
