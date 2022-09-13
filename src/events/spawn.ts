import { random, TAU, Vector2 } from '../crco';
import { EnemyEntityType, enemyTypeToClass } from '../entities/enemies/enemyTypes';
import { Goat } from '../entities/enemies/goat';
import { EntityType } from '../entities/entityType';
import { Heart } from '../entities/items/heart';
import { Mushroom } from '../entities/items/mushroom';
import { Treasure } from '../entities/items/treasure';
import { EnemyHint } from '../entities/overlays/enemyHint';
import { ItemHint } from '../entities/overlays/itemHint';
import { state } from '../globals/game';
import { mapDimensions } from '../globals/map';
import { player } from '../globals/player';
import { registerEvent, Trigger, triggerEvent } from '../util/eventRegister';

export const enum SpawnType {
  GuardedTreasure,
  Mushroom,
  Heart
}

const TARGET_ENEMY_COUNT = 30;
const MIN_SPAWN_TIME = 250;
const SPAWN_POSITIONS = [0, 1, 2, 3];
const ENEMY_TYPES_SPAWN = Object.keys(enemyTypeToClass).filter(
  (key) => Number(key) !== EntityType.Goat
) as unknown as EnemyEntityType[];

const getEnemyHealth = (type: EnemyEntityType) => {
  const Entity = enemyTypeToClass[type];
  return Entity.baseHealth * state.experience.level * 0.5;
};

export const spawn = () => {
  // const seconds = Math.max(0, elapsed) / 100;
  const target = TARGET_ENEMY_COUNT + state.experience.level * 7;
  const completeRandom = Math.random();
  const weightedRandom = Math.random() * (1 - state.enemies.length / target);

  if (weightedRandom > 0.33 || completeRandom > 0.98) {
    if (state.time.elapsedInGame - state.timestamp.lastEnemySpawned < MIN_SPAWN_TIME) {
      return;
    }

    state.timestamp.lastEnemySpawned = state.time.elapsedInGame;
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
  if (
    state.time.elapsedInGame - state.timestamp.spawn[SpawnType.GuardedTreasure] >=
    spawnFunctions[SpawnType.GuardedTreasure].frequency
  ) {
    triggerEvent(Trigger.PreSpawn, SpawnType.GuardedTreasure, state.time.elapsedInGame);
  }
  if (
    state.time.elapsedInGame - state.timestamp.spawn[SpawnType.Heart] >=
    spawnFunctions[SpawnType.Heart].frequency
  ) {
    triggerEvent(Trigger.PreSpawn, SpawnType.Heart, state.time.elapsedInGame);
  }
  if (
    state.time.elapsedInGame - state.timestamp.spawn[SpawnType.Mushroom] >=
    spawnFunctions[SpawnType.Mushroom].frequency
  ) {
    triggerEvent(Trigger.PreSpawn, SpawnType.Mushroom, state.time.elapsedInGame);
  }
};

const spawnFunctions = {
  [SpawnType.Heart]: {
    frequency: 1000 * 60 * 1,
    preSpawn: () => {
      state.timestamp.spawn[SpawnType.Heart] = state.time.elapsedInGame;
      const x = random(mapDimensions.x * 0.8, 0.1);
      const y = random(mapDimensions.y * 0.8, 0.1);
      const hint = new ItemHint(
        new Vector2(x, y),
        state.time.elapsedInGame,
        SpawnType.Heart
      );
      state.hints.push(hint);
    },
    spawn: (hint: ItemHint) => {
      // hardcoded sprite size
      state.items.push(new Heart(hint.center.clone().add(-0.5, -0.5)));
    }
  },
  [SpawnType.Mushroom]: {
    frequency: 1000 * 60 * 3,
    preSpawn: () => {
      state.timestamp.spawn[SpawnType.Mushroom] = state.time.elapsedInGame;
      const x = random(mapDimensions.x * 0.8, 0.1);
      const y = random(mapDimensions.y * 0.8, 0.1);
      const hint = new ItemHint(
        new Vector2(x, y),
        state.time.elapsedInGame,
        SpawnType.Mushroom
      );
      state.hints.push(hint);
    },
    spawn: (hint: ItemHint) => {
      state.items.push(new Mushroom(hint.center.clone().add(-0.5, -0.5)));
    }
  },
  [SpawnType.GuardedTreasure]: {
    frequency: 1000 * 60 * 3,
    preSpawn: () => {
      state.timestamp.spawn[SpawnType.GuardedTreasure] = state.time.elapsedInGame;
      const x = random(mapDimensions.x * 0.8, 0.1);
      const y = random(mapDimensions.y * 0.8, 0.1);
      const hint = new EnemyHint(new Vector2(x, y), state.time.elapsedInGame);
      state.hints.push(hint);
    },
    spawn: (hint: EnemyHint) => {
      const count = 12;
      state.items.push(
        // hardcoded sprite size
        new Treasure(hint.center.clone().add(-0.5, -0.5))
      );
      for (let i = 0; i < count; i++) {
        // hardcoded sprite size
        const x = hint.center.x - 0.5 + Math.cos((TAU * i) / count) * 1.5;
        const y = hint.center.y - 0.5 + Math.sin((TAU * i) / count) * 1.5;
        state.enemies.push(new Goat(new Vector2(x, y), 5));
      }
    }
  }
};

registerEvent(Trigger.PreSpawn, (type: SpawnType) => {
  spawnFunctions[type].preSpawn();
});

registerEvent(Trigger.Spawn, (hint: EnemyHint) => {
  spawnFunctions[hint.spawnType].spawn(hint);
});
