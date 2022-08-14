import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { state } from '../globals/game';
import { addAttraction } from './behaviors/attraction';
import { Behaviors } from './behaviors/behaviors';
import { CircularBounding } from './bounding/circlular';
import { CachedEntity } from './entity';

export abstract class Enemy<T extends Partial<Behaviors>>
  extends CachedEntity
  implements CircularBounding
{
  abstract radius: number;
  abstract size: number;
  abstract speed: number;
  abstract behaviors: T;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
    this.generateSprites();
  }

  destroy(index: number) {
    state.enemies.splice(index, 1);
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.star(0, 0, this.size, 5);
  };

  update(elapsed: number, delta: number) {
    this.positionPrevious.set(this.position);
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
  }

  updatePosition(elapsed: number, delta: number) {
    const movement = delta * this.speed;
    if (this.behaviors.attraction) {
      addAttraction(this.position, movement, this.behaviors.attraction);
    }
  }
}
