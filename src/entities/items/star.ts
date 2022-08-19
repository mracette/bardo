import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { CircularBounding } from '../bounding/circular';
import { Item } from './item';

export class Star extends Item implements CircularBounding {
  radius = 0.25;
  size = 0.25;
  spriteCoordinateBounds = [-1, 1];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
    this.generateSprites();
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.star(0, 0, this.size);
  };
}
