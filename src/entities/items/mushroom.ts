import { boundedSine } from 'bounded-sine';
import { mushroom } from '../../../svg/mushroom';
import { treasure } from '../../../svg/treasure';
import { Canvas2DGraphicsOptions, Canvas2DGraphics, Vector2 } from '../../crco';
import { drawUi } from '../../drawing/drawUi';
import { GameState, state } from '../../globals/game';
import { graphics } from '../../globals/graphics';
import { palette } from '../../globals/palette';
import { Trigger, triggerEvent } from '../../util/eventRegister';
import { zzfx } from '../../zzfx';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Item } from './item';

const period = 2500;
const duration = 10 * 1000;

export const sineFunctions = {
  r: boundedSine({ yMin: 0, yMax: 255, period }),
  g: boundedSine({ yMin: 0, yMax: 255, period, translateX: period * 0.33 }),
  b: boundedSine({ yMin: 0, yMax: 255, period, translateX: period * 0.66 })
};

export class Mushroom extends Item<Pick<Behaviors, 'collectible'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  radius = 0.25;
  spriteKey = EntityType.Mushroom;

  static options: Canvas2DGraphicsOptions = {
    fill: true,
    styles: {
      fillStyle: palette.blue
    }
  };

  static staticDraw = (graphics: Canvas2DGraphics) => {
    mushroom.forEach((lines) => {
      graphics.lineSegments(lines, this.options);
    });
  };

  constructor(position: Vector2) {
    super(position, {
      collectible: {
        distance: 1,
        initialPosition: position.clone(),
        onCollected: () => {
          // zzfx(...[, , 20, 0.04, , 0.6, , 1.31, , , -990, 0.06, 0.17, , , 0.04, 0.07]);
          state.stats.mushroomsEaten++;
          state.shroomed.active = true;
          state.shroomed.start = state.time.elapsedInGame;
          this.shouldDestroy = true;
        }
      }
    });
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    Mushroom.staticDraw(graphics);
  };
}
