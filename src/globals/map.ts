import { Vector2 } from 'crco-utils';

export const mapDimensions = new Vector2(32, 18);
export const mapCenter = new Vector2(mapDimensions.x / 2 - 1, mapDimensions.y / 2 - 1);
export const tileWidth = 1 / mapDimensions.x;
