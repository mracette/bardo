import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { mask } from '../../../svg/mask';
import { Behaviors } from '../behaviors/behaviors';
import { Enemy } from './enemy';

export class Tragedy extends Enemy<Pick<Behaviors, 'attraction'>> {
  radius = 1;
  size = 1; // is this used?
  speed = 0.002;
  spriteSize = 2;
  spriteCoordinateBounds = [0, 100];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position, {
      attraction: { amount: 0.002 }
    });
    this.generateSprites();
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    mask.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
