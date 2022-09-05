import { Vector2 } from 'crco-utils';
import { ThirdEye } from '../entities/thirdEye';
import { mapDimensions } from './map';

export const thirdEye = new ThirdEye(
  new Vector2((mapDimensions.x - mapDimensions.y) / 2, 0)
);
