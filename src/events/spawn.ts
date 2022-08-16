import { Vector2 } from 'crco-utils';
import { BasicAttracting } from '../entities/enemies/basicAttracting';
import { BasicGuarding } from '../entities/enemies/basicGuarding';
import { MaskedEnemy } from '../entities/enemies/maskedEnemy';
import { debug, mapDimensions, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { registerEvent, Trigger } from '../util/eventRegister';

const MAX_SPAWN = 0;
let SPAWNED = 0;

export const spawnBatch = (number = 1) => {
  for (let i = 0; i < number; i++) {
    const x = Math.random() * mapDimensions.x;
    const y = Math.random() * mapDimensions.y;
    const position = new Vector2(x, y);
    const enemy = new MaskedEnemy(graphics.gameplay, position);
    state.enemies.push(enemy);
  }
};

registerEvent(Trigger.Initialize, spawnBatch);

export const spawnEnemy = (elapsed: number) => {
  if (
    elapsed - state.timestamp.lastEnemyGenerated > 1000 &&
    (debug ? SPAWNED < MAX_SPAWN : true)
  ) {
    state.timestamp.lastEnemyGenerated = elapsed;
    const x = Math.random() * mapDimensions.x;
    const y = Math.random() * mapDimensions.y;
    const position = new Vector2(x, y);
    // const enemy =
    //   Math.random() > 0.5
    //     ? new BasicAttracting(graphics.gameplay, position)
    //     : new BasicGuarding(graphics.gameplay, position);
    const enemy = new BasicGuarding(graphics.gameplay, position);
    state.enemies.push(enemy);
    SPAWNED++;
  }
};
