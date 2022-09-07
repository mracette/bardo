import { Canvas2DGraphics } from '../crco';
import { drawThirdEye } from '../drawing/drawThirdEye';
import { coordinates } from '../globals/graphics';
import { mapDimensions } from '../globals/map';
import { CachedEntity } from './entity';
import { spriteCoordinateSystem } from './sprites';

export class ThirdEye extends CachedEntity {
  coordinateSystem = spriteCoordinateSystem.external;
  options = undefined;
  radius = 1;
  spriteSize = mapDimensions.y;
  spriteKey = 'third-eye';
  drawSprite = (graphics: Canvas2DGraphics) => {
    drawThirdEye(graphics);
  };
}
