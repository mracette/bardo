import { Vector2 } from '../crco';
import { Exposition } from '../entities/exposition';
import { mapDimensions } from './map';

export const exposition = new Exposition(
  new Vector2((mapDimensions.x - mapDimensions.y) / 2, 0)
);
