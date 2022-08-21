import { Canvas2DGraphicsOptions, random, Vector2 } from 'crco-utils';
import { state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { addAttraction } from '../behaviors/attraction';
import { Behaviors } from '../behaviors/behaviors';
import { addGuarding } from '../behaviors/guarding';
import { CachedEntity } from '../entity';
import { StarLarge, StarMedium, StarSmall } from '../items/stars';

export abstract class Enemy<T extends Partial<Behaviors>> extends CachedEntity {
  /**
   * Required for circular collision detection
   */
  abstract radius: number;
  /**
   * The base speed, used by updatePosition
   */
  abstract speed: number;

  options: Canvas2DGraphicsOptions = { styles: { fillStyle: palette.black }, fill: true };
  behaviors: T;

  constructor(position: Vector2, behaviors: T) {
    super(position);
    this.behaviors = behaviors;
  }

  destroy(index: number) {
    state.enemies.splice(index, 1);
    const Star = random([StarSmall, StarMedium, StarLarge]);
    state.items.push(new Star(this.center.clone()));
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
