import { Vector2 } from '../crco';
import { ThirdEye, thirdEyeSpriteSize } from '../entities/thirdEye';
import { mapDimensions } from './map';

export const thirdEye = new ThirdEye(
  new Vector2((mapDimensions.x - mapDimensions.y) / 2, 0)
  // .add(
  //   thirdEyeSpriteSize / 2,
  //   thirdEyeSpriteSize / 2
  // )
);
