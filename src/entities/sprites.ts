import { heart } from '../../svg/heart';
import { mushroom } from '../../svg/mushroom';
import { Canvas2DGraphics } from '../crco';
import { coordinates, graphics } from '../globals/graphics';
import { tileWidth } from '../globals/map';
import { makeSprites } from '../util/makeSprites';
import { EntityType } from './entityType';
import { Heart } from './items/heart';
import { Mushroom } from './items/mushroom';
import { Player } from './player';

interface Cache {
  sprites: {
    [key: string]: HTMLCanvasElement[];
  };
}

export const spriteCoordinateSystem = {
  external: [0, 100] as [number, number],
  internal: [-1, 1] as [number, number]
};

export const cache: Cache = {
  sprites: {}
};
