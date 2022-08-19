import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { goat } from '../../../svg/goat';
import { mask } from '../../../svg/mask';
import { state } from '../../globals/game';
import { addAttraction } from '../behaviors/attraction';
import { Behaviors } from '../behaviors/behaviors';
import { addGuarding } from '../behaviors/guarding';
import { CircularBounding } from '../bounding/circular';
import { CachedEntity } from '../entity';
import { Star } from '../items/star';

export abstract class Enemy<T extends Partial<Behaviors>>
  extends CachedEntity
  implements CircularBounding
{
  /**
   * Required for circular collision detection
   */
  abstract radius: number;
  /**
   * The base size, used by the drawSprite function
   */
  abstract size: number;
  /**
   * The base speed, used by updatePosition
   */
  abstract speed: number;

  behaviors: T;

  spriteCoordinateBounds = [-1, 1];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2, behaviors: T) {
    super(graphics, position);
    this.behaviors = behaviors;
  }

  center() {
    return new Vector2(
      this.position.x + this.radius / 2,
      this.position.y + this.radius / 2
    );
  }

  destroy(index: number) {
    state.enemies.splice(index, 1);
    state.items.push(new Star(this.graphics, this.center().clone()));
  }

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
