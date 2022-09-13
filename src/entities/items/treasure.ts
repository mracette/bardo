import { treasure } from '../../../svg/treasure';
import { Canvas2DGraphicsOptions, Canvas2DGraphics, Vector2 } from '../../crco';
import { GameState, state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { playSound, Sounds } from '../../globals/sounds';
import { Trigger, triggerEvent } from '../../util/eventRegister';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Item } from './item';

export class Treasure extends Item<Pick<Behaviors, 'collectible'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  radius = 0.25;
  spriteKey = EntityType.Treasure;
  options: Canvas2DGraphicsOptions = {
    fill: true,
    styles: {
      fillStyle: palette.blue
    }
  };

  constructor(position: Vector2) {
    super(position, {
      collectible: {
        distance: 1,
        initialPosition: position.clone(),
        onCollected: () => {
          state.stats.chestsUnlocked++;
          playSound(Sounds.Heart);
          triggerEvent(Trigger.StateChange, GameState.Lottery);
          this.shouldDestroy = true;
        }
      }
    });
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    treasure.forEach((lines) => {
      graphics.lineSegments(lines, this.options);
    });
  };
}
