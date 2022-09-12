import { Canvas2DGraphics } from '../crco';
import { drawThirdEye } from '../drawing/drawThirdEye';
import { mapDimensions } from '../globals/map';
import { CachedEntity } from './entity';
import { spriteCoordinateSystem } from './sprites';

export const thirdEyeSpriteSize = 1 * mapDimensions.y;
export class ThirdEye extends CachedEntity {
  coordinateSystem = spriteCoordinateSystem.external;
  options = undefined;
  radius = 1;
  spriteSize = thirdEyeSpriteSize;
  spriteKey = 'third-eye';
  drawSprite = (graphics: Canvas2DGraphics) => {
    drawThirdEye(graphics);
  };
}
