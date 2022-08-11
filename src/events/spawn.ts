import { Vector2 } from 'crco-utils';
import { BasicAttracting } from '../entities/enemies/basicAttracting';
import { BasicNonAttracting } from '../entities/enemies/basicNonAttracting';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, STATE } from '../globals/game';

export const spawnEnemy = (elapsed: number) => {
  if (elapsed - STATE.timestamp.lastEnemyGenerated > 1000) {
    STATE.timestamp.lastEnemyGenerated = elapsed;
    const x = Math.random() * MAP_DIMENSIONS.x;
    const y = Math.random() * MAP_DIMENSIONS.y;
    const position = new Vector2(x, y);
    const enemy =
      Math.random() > 0.5
        ? new BasicAttracting(GRAPHICS.player, position)
        : new BasicNonAttracting(GRAPHICS.player, position);
    enemy.generateSprites();
    STATE.enemies.push(enemy);
  }
};
