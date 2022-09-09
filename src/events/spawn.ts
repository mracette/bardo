import { random, TAU, Vector2 } from '../crco';
import { EnemyEntityType, enemyTypeToClass } from '../entities/enemies/enemyTypes';
import { Goat } from '../entities/enemies/goat';
import { EntityType } from '../entities/entityType';
import { EnemyHint } from '../entities/overlays/enemyHint';
import { state } from '../globals/game';
import { mapDimensions } from '../globals/map';
import { player } from '../globals/player';

const MAX_SPAWN = Infinity;
let SPAWNED = 0;

const enum SpawnType {
  Flood,
  Appear
}

const TARGET_ENEMY_COUNT = 30;
const MIN_SPAWN_TIME = 250;
const RUN_TIME = 1000 * 60 * 15; // 15 minutes
const TREASURE_TIME = 1000 * 60 * 1; // 1 minute
const SPAWN_POSITIONS = [0, 1, 2, 3];
const ENEMY_TYPES_SPAWN = Object.keys(enemyTypeToClass).filter(
  (key) => Number(key) !== EntityType.Goat
) as unknown as EnemyEntityType[];

const ENEMY_TYPES = Object.keys(enemyTypeToClass) as unknown as EnemyEntityType[];

const getEnemyHealth = (type: EnemyEntityType) => {
  const Entity = enemyTypeToClass[type];
  return Entity.baseHealth * state.experience.level * 0.5;
};

export const spawn = (elapsed: number) => {
  // const seconds = Math.max(0, elapsed) / 100;
  const target = TARGET_ENEMY_COUNT + state.experience.level * 10;
  const completeRandom = Math.random();
  const weightedRandom = Math.random() * (1 - state.enemies.length / target);

  if (weightedRandom > 0.33 || completeRandom > 0.98) {
    if (elapsed - state.timestamp.lastEnemySpawned < MIN_SPAWN_TIME) {
      return;
    }

    state.timestamp.lastEnemySpawned = elapsed;
    const type = random(ENEMY_TYPES_SPAWN);

    let position = random(SPAWN_POSITIONS);
    const playerQuadrant = player.quadrant;

    // do not spawn on top of the player
    if (position === playerQuadrant) {
      position = (playerQuadrant + 1) % SPAWN_POSITIONS.length;
    }

    let x: number;
    let y: number;

    // top
    if (position === 0) {
      x = random(mapDimensions.x);
      y = 0;
    }
    // bottom
    if (position === 1) {
      x = random(mapDimensions.x);
      y = mapDimensions.y;
    }
    // left
    if (position === 2) {
      x = 0;
      y = random(mapDimensions.y);
    }
    // right
    if (position === 3) {
      x = 0;
      y = random(mapDimensions.y);
    }
    const Enemy = enemyTypeToClass[type];
    state.enemies.push(new Enemy(new Vector2(x!, y!), getEnemyHealth(type)));
  }
  // if (elapsed - state.timestamp.lastBatchSpawned >= TREASURE_TIME) {
  //   spawnTreasure(elapsed);
  // }
};

export const spawnTreasure = (elapsed: number) => {
  const batchElapsed =
    (elapsed - state.timestamp.lastBatchSpawned - TREASURE_TIME) / EnemyHint.duration;
  if (batchElapsed < 1 && !state.batchInProgress) {
    // batch leadup
    const x = random(mapDimensions.x * 0.8, 0.1);
    const y = random(mapDimensions.y * 0.8, 0.1);
    const hint = new EnemyHint(new Vector2(x, y), elapsed);
    state.batchInProgress = hint;
    state.overlays.push(hint);
  } else if (batchElapsed > 1 && state.batchInProgress) {
    // batch
    const count = 12;
    for (let i = 0; i < count; i++) {
      const x = state.batchInProgress.center.x + Math.cos((TAU * i) / count) * 1.5;
      const y = state.batchInProgress.center.y + Math.sin((TAU * i) / count) * 1.5;
      state.enemies.push(new Goat(new Vector2(x, y), 5));
    }
    state.timestamp.lastBatchSpawned = elapsed;
    state.batchInProgress = false;
  }
};
