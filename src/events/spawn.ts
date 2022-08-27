import { random, TAU, Vector2 } from 'crco-utils';
import { Goat } from '../entities/enemies/goat';
import { Prisoner } from '../entities/enemies/prisoner';
import { Reaper } from '../entities/enemies/reaper';
import { Tragedy } from '../entities/enemies/tragedy';
import { Wrestler } from '../entities/enemies/wrestler';
import { EnemyHint } from '../entities/overlays/enemyHint';
import { debug } from '../globals/debug';
import { state } from '../globals/game';
import { mapDimensions } from '../globals/map';

const MAX_SPAWN = Infinity;
let SPAWNED = 0;

const enum SpawnType {
  Flood,
  Appear
}

const RUN_TIME = 1000 * 60 * 15; // 15 minutes
const BATCH_TIME = 1000 * 60 * 1; // 1 minute
const SPAWN_POSITION = [0, 1, 2, 3];

const appearingEnemies = [Wrestler, Tragedy, Prisoner, Reaper];
const batchEnemies = [Goat];

export const spawn = (elapsed: number) => {
  const seconds = Math.max(0, elapsed) / 1000;
  const spawnTime = (1000 * (RUN_TIME - seconds)) / 1000000;
  if (elapsed - state.timestamp.lastEnemySpawned >= spawnTime) {
    state.timestamp.lastEnemySpawned = elapsed;
    const Enemy = random(appearingEnemies);
    const position = random(SPAWN_POSITION);
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
    state.enemies.push(new Enemy(new Vector2(x!, y!), 5));
  }
  if (elapsed - state.timestamp.lastBatchSpawned >= BATCH_TIME) {
    spawnBatch(elapsed);
  }
};

export const spawnBatch = (elapsed: number) => {
  const batchElapsed =
    (elapsed - state.timestamp.lastBatchSpawned - BATCH_TIME) / EnemyHint.duration;
  if (batchElapsed < 1 && !state.batchInProgress) {
    // batch leadup
    const x = random(mapDimensions.x * 0.8, 0.1);
    const y = random(mapDimensions.y * 0.8, 0.1);
    const hint = new EnemyHint(new Vector2(x, y), elapsed);
    state.batchInProgress = hint;
    state.overlays.push(hint);
  } else if (batchElapsed > 1 && state.batchInProgress) {
    // batch
    const count = Math.floor(random(16, 12));
    for (let i = 0; i < count; i++) {
      const x = state.batchInProgress.center.x + Math.cos((TAU * i) / count) * 1.5;
      const y = state.batchInProgress.center.y + Math.sin((TAU * i) / count) * 1.5;
      state.enemies.push(new Goat(new Vector2(x, y), 5));
    }
    state.timestamp.lastBatchSpawned = elapsed;
    state.batchInProgress = false;
  }
};
