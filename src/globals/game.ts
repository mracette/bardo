import { Enemy } from '../entities/enemies/enemy';
import { EntityType } from '../entities/entityType';
import { Item } from '../entities/items/item';
import { DamageOverlay } from '../entities/overlays/damage';
import { EnemyHint } from '../entities/overlays/enemyHint';
import { ItemHint } from '../entities/overlays/itemHint';
import { Weapon } from '../entities/weapons/weapon';
import { SpawnType } from '../events/spawn';
import { UpgradeOption } from '../util/getRandomUpgrade';

export enum GameState {
  Exposition,
  Reincarnation,
  Gameover,
  Gameplay,
  Intro,
  Paused,
  Upgrade,
  Lottery
}

export interface LotteryOption {
  draw: () => void;
  collect: () => void;
}

export const state = {
  move: {
    up: false,
    down: false,
    left: false,
    right: false
  },
  timestamp: {
    lastDamageSoundPlayed: 0,
    lastEnemySpawned: 0,
    spawn: {
      [SpawnType.GuardedTreasure]: -1000 * 100,
      [SpawnType.Heart]: 0,
      [SpawnType.Mushroom]: -1000 * 30
    },
    lotteryStart: 0
  },
  isPaused: false,
  shroomed: {
    active: false,
    start: 0,
    duration: 10 * 1000
  },
  health: 100,
  maxHealth: 100,
  experience: {
    current: 0,
    level: 0,
    next: 0,
    last: 0
  },
  time: {
    clockTime: 0,
    runTime: 1000 * 60 * 10,
    elapsedInGame: 0,
    elapsed: 0,
    clockTimePrevious: 0,
    accumulator: 0,
    slowdown: 0
  },
  stats: {
    total: 0,
    weapons: {
      [EntityType.Arrow]: 0,
      [EntityType.Axe]: 0,
      [EntityType.MagicCircle]: 0,
      [EntityType.Orb]: 0
    },
    hallucinationsBanished: 0,
    damageTaken: 0,
    mushroomsEaten: 0,
    chestsUnlocked: 0
  },
  lottery: {
    starsToCollect: 0,
    heartsToCollect: 0,
    lastCollected: 0,
    interval: 100,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    collect: () => {}
  },
  batchInProgress: false as EnemyHint | false,
  enemies: [] as Enemy<any>[],
  weapons: [] as Weapon<any>[],
  items: [] as Item<any>[],
  overlays: [] as DamageOverlay[],
  hints: [] as (EnemyHint | ItemHint)[],
  gameState: GameState.Exposition,
  upgradeOptions: [] as UpgradeOption[],
  upgradeSelected: 0,
  spritePeriod: 1550
};
