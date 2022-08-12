import { Vector2 } from 'crco-utils';
import { BasicAttracting } from '../entities/enemies/basicAttracting';
import { BasicNonAttracting } from '../entities/enemies/basicNonAttracting';
import { mapDimensions, state } from '../globals/game';
import { graphics } from '../globals/graphics';

export const spawnEnemy = (elapsed: number) => {
  if (elapsed - state.timestamp.lastEnemyGenerated > 1000) {
    state.timestamp.lastEnemyGenerated = elapsed;
    const x = Math.random() * mapDimensions.x;
    const y = Math.random() * mapDimensions.y;
    const position = new Vector2(x, y);
    const enemy =
      Math.random() > 0.5
        ? new BasicAttracting(graphics.player, position)
        : new BasicNonAttracting(graphics.player, position);
    enemy.generateSprites();
    state.enemies.push(enemy);
  }
};
