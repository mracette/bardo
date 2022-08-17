import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { goat } from '../../../svg/goat';
import { mask } from '../../../svg/mask';
import { state } from '../../globals/game';
import { addAttraction } from '../behaviors/attraction';
import { Behaviors } from '../behaviors/behaviors';
import { addGuarding } from '../behaviors/guarding';
import { CircularBounding } from '../bounding/circular';
import { CachedEntity } from '../entity';

export abstract class Enemy<T extends Partial<Behaviors>>
  extends CachedEntity
  implements CircularBounding
{
  /**
   * Required for circular collision detection
   */
  abstract radius: number;
  abstract size: number;
  abstract speed: number;

  behaviors: T;

  spriteCoordinateBounds = [0, 100];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2, behaviors: T) {
    super(graphics, position);
    this.behaviors = behaviors;
  }

  destroy(index: number) {
    state.enemies.splice(index, 1);
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.star(0, 0, this.size, 5);
  };

  update(elapsed: number, delta: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
  }

  updatePosition(elapsed: number, delta: number) {
    if (this.behaviors.attraction) {
      addAttraction(this.position, delta, this.behaviors.attraction);
    }
    if (this.behaviors.guarding) {
      addGuarding(this.position, delta, this.behaviors.guarding);
    }
  }
}