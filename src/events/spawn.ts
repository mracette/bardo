import { Vector2 } from 'crco-utils';
import { Enemy } from '../entities/enemy';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, STATE } from '../globals/game';

export const spawnEnemy = (elapsed: number) => {
  console.log(
    elapsed,
    STATE.timestamp.lastEnemyGenerated,
    elapsed - STATE.timestamp.lastEnemyGenerated
  );
  if (elapsed - STATE.timestamp.lastEnemyGenerated > 1000) {
    STATE.timestamp.lastEnemyGenerated = elapsed;
    const x = Math.random() * MAP_DIMENSIONS.x;
    const y = Math.random() * MAP_DIMENSIONS.y;
    STATE.enemies.push(new Enemy(GRAPHICS.player, new Vector2(x, y)));
  }
};
