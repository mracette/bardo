import { Canvas2DGraphicsOptions, Canvas2DGraphics, Vector2 } from 'crco-utils';
import { drawExperience } from '../../drawing/drawExperience';
import { state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { Trigger, triggerEvent } from '../../util/eventRegister';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Item } from './item';

const enum StarSize {
  Small,
  Medium,
  Large
}
export class Star extends Item<Pick<Behaviors, 'collectible'>> {
  coordinateSystem = spriteCoordinateSystem.internal;
  spriteSize = 1;
  radius = 0.25;
  spriteKey = EntityType.Star;
  experience: number;
  options: Canvas2DGraphicsOptions;

  static styles: Record<StarSize, Canvas2DGraphicsOptions['styles']> = {
    [StarSize.Small]: { fillStyle: palette.yellow, strokeStyle: palette.yellow },
    [StarSize.Medium]: { fillStyle: palette.teal, strokeStyle: palette.teal },
    [StarSize.Large]: { fillStyle: palette.violet, strokeStyle: palette.violet }
  };

  constructor(position: Vector2, experience: number) {
    super(position, {
      collectible: {
        distance: 2,
        initialPosition: position.clone(),
        onCollected: (index: number) => {
          state.experience.current += experience;
          if (state.experience.current > state.experience.next) {
            triggerEvent(Trigger.LevelUp);
          }
          drawExperience();
          this.destroy(index);
        }
      }
    });

    this.experience = experience;

    let size: StarSize;

    if (this.experience < 20) {
      size = StarSize.Small;
    } else if (this.experience < 50) {
      size = StarSize.Medium;
    } else {
      size = StarSize.Large;
    }

    this.options = {
      styles: Star.styles[size],
      fill: true
    };
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    graphics.star(0, 0, this.radius, 5, 0.4, this.options);
  };
}
