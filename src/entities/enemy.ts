import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { addAttraction } from './behaviors/attraction';
import { Behaviors } from './behaviors/behaviors';
import { CachedEntity } from './entity';

export abstract class Enemy<T extends Partial<Behaviors>> extends CachedEntity {
  abstract size: number;
  abstract speed: number;
  abstract behaviors: T;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
  }

  // TODO: add to crco-utils
  collides(
    x: number,
    y: number,
    positionX: number = this.position.x,
    positionY: number = this.position.y
  ) {
    return (positionX - x) ** 2 + (positionY - y) ** 2 <= this.size ** 2;
  }

  draw = (graphics: Canvas2DGraphicsRough) => {
    graphics.star(0, 0, this.size, 5);
  };

  updatePosition(elapsed: number) {
    const movement = elapsed * this.speed;
    if (this.behaviors.attraction) {
      addAttraction(this.position, movement, this.behaviors.attraction);
    }
  }
}
