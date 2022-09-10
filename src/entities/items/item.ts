import { Vector2 } from '../../crco';
import { state } from '../../globals/game';
import { Behaviors } from '../behaviors/behaviors';
import { addCollectible } from '../behaviors/collectible';
import { CachedEntity } from '../entity';

export abstract class Item<
  T extends Partial<Pick<Behaviors, 'collectible'>>
> extends CachedEntity {
  abstract radius: number;

  behaviors: T;

  constructor(position: Vector2, behaviors: T) {
    super(position);
    this.behaviors = behaviors;
  }

  update() {
    super.update();
    this.updatePosition();
    this.updateCenterFromPosition();
  }

  updatePosition() {
    if (this.behaviors.collectible) {
      addCollectible(this.position, this.behaviors.collectible);
    }
  }
}
