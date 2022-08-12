import { Vector2 } from 'crco-utils';
import { Enemy } from '../entities/enemy';

export const MAP_DIMENSIONS = new Vector2(32, 18);
export const MAP_CENTER = new Vector2(MAP_DIMENSIONS.x / 2 - 1, MAP_DIMENSIONS.y / 2 - 1);
export const TILE_WIDTH = 1 / MAP_DIMENSIONS.x;
export const ROUGH = true;
export const STATE = {
  move: {
    up: false,
    down: false,
    left: false,
    right: false
  },
  enemies: [] as Enemy<any>[],
  timestamp: {
    lastEnemyGenerated: 0
  }
};
