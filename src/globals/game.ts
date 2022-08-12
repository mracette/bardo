import { Vector2 } from 'crco-utils';
import { Enemy } from '../entities/enemy';
import { Weapon } from '../entities/weapon';

export enum GameState {
  Gameplay = 'gameplay',
  Intro = 'intro',
  Paused = 'paused',
  Upgrade = 'upgrade'
}

export const mapDimensions = new Vector2(32, 18);
export const mapCenter = new Vector2(mapDimensions.x / 2 - 1, mapDimensions.y / 2 - 1);
export const tileWidth = 1 / mapDimensions.x;
export const debug = true;
export const state = {
  move: {
    up: false,
    down: false,
    left: false,
    right: false
  },
  enemies: [] as Enemy<any>[],
  timestamp: {
    lastEnemyGenerated: 0
  },
  weapons: [] as Weapon[],
  gameState: GameState.Intro,
  upgradeOptionCount: 4,
  upgradeSelected: 0
};
