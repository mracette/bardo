import { Canvas2DGraphicsOptions, Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { palette } from '../../globals/palette';
import { Behaviors } from '../behaviors/behaviors';
import { Collectible } from '../behaviors/collectible';
import { CircularBounding } from '../bounding/circular';
import { spriteCoordinateSystem } from '../sprites';
import { Item } from './item';

export abstract class Star extends Item<Pick<Behaviors, 'collectible'>> {
  coordinateSystem = spriteCoordinateSystem.internal;
  spriteSize = 1;
  radius = 0.25;

  abstract options: Canvas2DGraphicsOptions;
  abstract points: number;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position, {
      collectible: {
        distance: 3,
        initialPosition: position.clone(),
        onCollected: (index: number) => {
          this.destroy(index);
        }
      }
    });
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.star(0, 0, this.radius, 5, 0.4, this.options);
  };
}

export class StarSmall extends Star {
  points = 1;
  options = {
    styles: { fillStyle: palette.yellow, strokeStyle: palette.yellow },
    fill: true
  };
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
  }
}

export class StarMedium extends Star {
  points = 5;
  options = {
    styles: { fillStyle: palette.teal, strokeStyle: palette.teal },
    fill: true
  };
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
  }
}

export class StarLarge extends Star {
  points = 25;
  options = {
    styles: { fillStyle: palette.violet, strokeStyle: palette.violet },
    fill: true
  };
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
  }
}
