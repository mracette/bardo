import { Canvas2DGraphics, Canvas2DGraphicsRough } from 'crco-utils';
import { mapDimensions } from '../globals/map';

export const drawTiles = (graphics: Canvas2DGraphics) => {
  for (let i = 0; i < mapDimensions.x; i++) {
    for (let j = 0; j < mapDimensions.y; j++) {
      graphics.rect(i, j, 1 / mapDimensions.x, 1 / mapDimensions.x, {
        styles: {
          strokeStyle: 'rgba(255,255,255,0.1)'
        }
      });
    }
  }
};
