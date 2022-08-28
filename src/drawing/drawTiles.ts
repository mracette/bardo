import { graphics } from '../globals/graphics';
import { mapDimensions } from '../globals/map';

export const drawTiles = () => {
  for (let i = 0; i < mapDimensions.x; i++) {
    for (let j = 0; j < mapDimensions.y; j++) {
      graphics.map.rect(i, j, 1 / mapDimensions.x, 1 / mapDimensions.y, {
        styles: {
          strokeStyle: 'rgba(255,255,255,0.1)'
        }
      });
    }
  }
};
