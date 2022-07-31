import { Vector2 } from 'crco-utils';

export const MAP_DIMENSIONS = new Vector2(32, 18);
export const TILE_WIDTH = 1 / MAP_DIMENSIONS.x;
export const ROUGH = true;
export const STATE = {
  move: {
    up: false,
    down: false,
    left: false,
    right: false
  }
};
