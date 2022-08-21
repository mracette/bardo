import { random, Vector2 } from 'crco-utils';
import { Goat } from '../entities/enemies/goat';
import { Tragedy } from '../entities/enemies/tragedy';
import { Wrestler } from '../entities/enemies/wrestler';
import { debug } from '../globals/debug';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { mapDimensions } from '../globals/map';

const MAX_SPAWN = Infinity;
let SPAWNED = 0;

export const spawnBatch = (number = 1) => {
  for (let i = 0; i < number; i++) {
    const x = Math.random() * mapDimensions.x;
    const y = Math.random() * mapDimensions.y;
    const position = new Vector2(x, y);
    const enemy = new Tragedy(position);
    state.enemies.push(enemy);
  }
};

export const spawnEnemy = (elapsed: number) => {
  if (
    elapsed - state.timestamp.lastEnemyGenerated > 1000 &&
    (debug ? SPAWNED < MAX_SPAWN : true)
  ) {
    state.timestamp.lastEnemyGenerated = elapsed;
    const x = Math.random() * mapDimensions.x;
    const y = Math.random() * mapDimensions.y;
    const position = new Vector2(x, y);
    const Enemy = random([Goat, Tragedy, Wrestler]);
    state.enemies.push(new Enemy(position));
    SPAWNED++;
  }
};
