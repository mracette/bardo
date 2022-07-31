import { MAP_DIMENSIONS } from "../globals/game";
import { Canvas2DGraphics } from "crco-utils";

export const drawTiles = (graphics: Canvas2DGraphics) => {
  for (let i = 0; i < MAP_DIMENSIONS.x; i++) {
    for (let j = 0; j < MAP_DIMENSIONS.y; j++) {
      graphics.rect(i, j, 1 / MAP_DIMENSIONS.x, 1 / MAP_DIMENSIONS.x, {
        styles: {
          strokeStyle: "rgba(255,255,255,0.1)"
        }
      });
    }
  }
};
