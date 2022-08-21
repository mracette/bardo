import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { state } from '../../globals/game';
import { Behaviors } from '../behaviors/behaviors';
import { addCollectible } from '../behaviors/collectible';
import { CircularBounding } from '../bounding/circular';
import { CachedEntity } from '../entity';

export abstract class Item<T extends Partial<Pick<Behaviors, 'collectible'>>>
  extends CachedEntity
  implements CircularBounding
{
  abstract radius: number;

  behaviors: T;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2, behaviors: T) {
    super(graphics, position);
    this.behaviors = behaviors;
  }

  destroy = (index: number) => {
    state.items.splice(index, 1);
  };

  update(elapsed: number, delta: number, index: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta, index);
  }

  updatePosition(elapsed: number, delta: number, index: number) {
    if (this.behaviors.collectible) {
      addCollectible(this.position, elapsed, this.behaviors.collectible, index);
    }
  }
}
