import { Canvas2DGraphicsOptions, Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { palette } from '../../globals/palette';
import { Behaviors } from '../behaviors/behaviors';
import { Collectible } from '../behaviors/collectible';
import { CircularBounding } from '../bounding/circular';
import { Item } from './item';

export abstract class Star extends Item<Pick<Behaviors, 'collectible'>> {
  radius = 0.25;
  size = 0.25;
  spriteCoordinateBounds = [-1, 1];

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
    graphics.star(0, 0, this.size, 5, 0.4, this.options);
  };
}

export class StarSmall extends Star {
  points = 1;
  options: Canvas2DGraphicsOptions = {
    styles: { fillStyle: palette.yellow, strokeStyle: palette.yellow },
    fill: true
  };
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
    this.generateSprites();
  }
}

export class StarMedium extends Star {
  points = 5;
  options: Canvas2DGraphicsOptions = {
    styles: { fillStyle: palette.teal, strokeStyle: palette.teal },
    fill: true
  };
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
    this.generateSprites();
  }
}

export class StarLarge extends Star {
  points = 25;
  options: Canvas2DGraphicsOptions = {
    styles: { fillStyle: palette.violet, strokeStyle: palette.violet },
    fill: true
  };
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
    this.generateSprites();
  }
}
