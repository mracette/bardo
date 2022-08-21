import { Enemy } from '../entities/enemies/enemy';
import { Goat } from '../entities/enemies/goat';
import { Tragedy } from '../entities/enemies/tragedy';
import { Wrestler } from '../entities/enemies/wrestler';
import { Item } from '../entities/items/item';
import { StarLarge, StarMedium, StarSmall } from '../entities/items/stars';
import { Weapon } from '../entities/weapons/weapon';

export enum GameState {
  Gameplay = 'gameplay',
  Intro = 'intro',
  Paused = 'paused',
  Upgrade = 'upgrade'
}

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
  items: [] as Item<any>[],
  gameState: GameState.Intro,
  upgradeOptionCount: 4,
  upgradeSelected: 0,
  spriteIndex: 0
};
