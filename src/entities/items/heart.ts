import { heart } from '../../../svg/heart';
import { mushroom } from '../../../svg/mushroom';
import { treasure } from '../../../svg/treasure';
import { Canvas2DGraphicsOptions, Canvas2DGraphics, Vector2 } from '../../crco';
import { drawUi } from '../../drawing/drawUi';
import { GameState, state } from '../../globals/game';
import { graphics } from '../../globals/graphics';
import { palette } from '../../globals/palette';
import { player } from '../../globals/player';
import { playSound, Sounds } from '../../globals/sounds';
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

  static options: Canvas2DGraphicsOptions = {
    fill: true,
    styles: {
      fillStyle: palette.red
    }
  };

  static staticDraw = (graphics: Canvas2DGraphics) => {
    heart.forEach((lines) => {
      graphics.lineSegments(lines, Heart.options);
    });
  };

  constructor(position: Vector2) {
    super(position, {
      collectible: {
        distance: 1,
        initialPosition: position.clone(),
        onCollected: () => {
          playSound(Sounds.Heart);
          state.health = Math.min(state.maxHealth, state.health + 20);
          this.shouldDestroy = true;
        }
      }
    });
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    Heart.staticDraw(graphics);
  };
}
