import { Vector2 } from 'crco-utils';
import { Enemy } from '../entities/enemies/enemy';
import { Goat } from '../entities/enemies/goat';
import { Tragedy } from '../entities/enemies/tragedy';
import { Wrestler } from '../entities/enemies/wrestler';
import { Item } from '../entities/items/item';
import { DamageOverlay } from '../entities/overlays/damage';
import { EnemyHint } from '../entities/overlays/enemyHint';
import { Weapon } from '../entities/weapons/weapon';
import { UpgradeOption } from '../util/getRandomUpgrade';
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
  isPaused: false,
  health: 100,
  experience: {
    current: 0,
    level: 0,
    next: 0,
    last: 0
  },
  batchInProgress: false as EnemyHint | false,
  enemies: [] as Enemy<any>[],
  weapons: [] as Weapon<any>[],
  items: [] as Item<any>[],
  overlays: [] as (DamageOverlay | EnemyHint)[],
  gameState: GameState.Intro,
  upgradeOptionCount: 3,
  upgradeOptions: [] as UpgradeOption[],
  upgradeSelected: 0,
  spritePeriod: 1550
};
