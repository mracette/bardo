import { heart } from '../../../svg/heart';
import { mushroom } from '../../../svg/mushroom';
import { treasure } from '../../../svg/treasure';
import { Canvas2DGraphicsOptions, Canvas2DGraphics, Vector2 } from '../../crco';
import { drawUi } from '../../drawing/drawUi';
import { GameState, state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { player } from '../../globals/player';
import { Trigger, triggerEvent } from '../../util/eventRegister';
import { zzfx } from '../../zzfx';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Item } from './item';

export class Heart extends Item<Pick<Behaviors, 'collectible'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  radius = 0.25;
  spriteKey = EntityType.Heart;
  options: Canvas2DGraphicsOptions = {
    fill: true,
    styles: {
      fillStyle: palette.red
    }
  };

  constructor(position: Vector2) {
    super(position, {
      collectible: {
        distance: 1,
        initialPosition: position.clone(),
        onCollected: () => {
          zzfx(...[, , 20, 0.04, , 0.6, , 1.31, , , -990, 0.06, 0.17, , , 0.04, 0.07]);
          state.health = Math.min(state.maxHealth, state.health + 20);
          this.shouldDestroy = true;
        }
      }
    });
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    heart.forEach((lines) => {
      graphics.lineSegments(lines, this.options);
    });
  };
}
