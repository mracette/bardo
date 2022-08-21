import { Player } from './player';

export const enum SpriteKey {
  Player,
  Goat,
  Tragedy,
  Wrestler,
  Orb,
  Star
}
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
