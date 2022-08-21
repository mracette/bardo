import { Player } from './player';

interface Sprites {
  [key: string]: HTMLCanvasElement[];
}

export const spriteCoordinateSystem = {
  external: [0, 100] as [number, number],
  internal: [-1, 1] as [number, number]
};

export const cachedSprites: Sprites = {};
