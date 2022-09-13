import { Canvas2DGraphics } from '../crco';
import { drawExposition } from '../drawing/drawExposition';
import { mapDimensions } from '../globals/map';
import { CachedEntity } from './entity';
import { spriteCoordinateSystem } from './sprites';

export const expositionSpriteSize = 1 * mapDimensions.y;

export class Exposition extends CachedEntity {
  coordinateSystem = spriteCoordinateSystem.external;
  options = undefined;
  radius = 1;
  spriteSize = expositionSpriteSize;
  spriteKey = 'expo';
  drawSprite = (graphics: Canvas2DGraphics) => {
    drawExposition(graphics);
  };
}
