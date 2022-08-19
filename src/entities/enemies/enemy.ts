import {
  Canvas2DGraphicsOptions,
  Canvas2DGraphicsRough,
  random,
  Vector2
} from 'crco-utils';
import { goat } from '../../../svg/goat';
import { mask } from '../../../svg/mask';
import { state } from '../../globals/game';
import { graphics } from '../../globals/graphics';
import { palette } from '../../globals/palette';
import { addAttraction } from '../behaviors/attraction';
import { Behaviors } from '../behaviors/behaviors';
import { addGuarding } from '../behaviors/guarding';
import { CircularBounding } from '../bounding/circular';
import { CachedEntity } from '../entity';
import { Star, StarSmall } from '../items/stars';

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

  options: Canvas2DGraphicsOptions = { styles: { fillStyle: palette.black }, fill: true };
  behaviors: T;
  spriteCoordinateBounds = [-1, 1];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2, behaviors: T) {
    super(graphics, position);
    this.behaviors = behaviors;
  }

  get center() {
    return new Vector2(
      this.position.x + this.radius / 2,
      this.position.y + this.radius / 2
    );
  }

  destroy(index: number) {
    state.enemies.splice(index, 1);
    const Star = random(state.starFactory);
    state.items.push(new Star(graphics.gameplay, this.center.clone()));
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
