import { mushroom } from '../../../svg/mushroom';
import { treasure } from '../../../svg/treasure';
import { Canvas2DGraphicsOptions, Canvas2DGraphics, Vector2 } from '../../crco';
import { drawUi } from '../../drawing/drawUi';
import { GameState, state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { Trigger, triggerEvent } from '../../util/eventRegister';
import { zzfx } from '../../zzfx';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Item } from './item';

export class Mushroom extends Item<Pick<Behaviors, 'collectible'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  radius = 0.25;
  spriteKey = EntityType.Mushroom;
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
          // zzfx(...[, , 20, 0.04, , 0.6, , 1.31, , , -990, 0.06, 0.17, , , 0.04, 0.07]);
          // triggerEvent(Trigger.StateChange, GameState.Lottery);
          this.shouldDestroy = true;
        }
      }
    });
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    mushroom.forEach((lines) => {
      graphics.lineSegments(lines, this.options);
    });
  };
}
