import { Vector2 } from 'crco-utils';
import { Enemy } from '../entities/enemies/enemy';
import { Goat } from '../entities/enemies/goat';
import { Tragedy } from '../entities/enemies/tragedy';
import { Wrestler } from '../entities/enemies/wrestler';
import { Item } from '../entities/items/item';
import { StarLarge, StarMedium, StarSmall } from '../entities/items/stars';
import { DamageOverlay } from '../entities/overlays/damage';
import { EnemyHint } from '../entities/overlays/enemyHint';
import { Weapon, WeaponInstance } from '../entities/weapons/weapon';
import { mapCenter } from './map';

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
  timestamp: {
    lastEnemySpawned: 0,
    lastBatchSpawned: -1000 * 58
  },
  batchInProgress: false as EnemyHint | false,
  enemies: [] as Enemy<any>[],
  weapons: [] as Weapon<any>[],
  items: [] as Item<any>[],
  overlays: [] as (DamageOverlay | EnemyHint)[],
  gameState: GameState.Intro,
  upgradeOptionCount: 4,
  upgradeSelected: 0,
  spritePeriod: 1550
};
