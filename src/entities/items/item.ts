import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { CircularBounding } from '../bounding/circular';
import { CachedEntity } from '../entity';

export abstract class Item extends CachedEntity implements CircularBounding {
  abstract radius: number;
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
  }
}
