import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { wrestler } from '../../../svg/wrestler';
import { Behaviors } from '../behaviors/behaviors';
import { Enemy } from './enemy';

export class Wrestler extends Enemy<Pick<Behaviors, 'attraction'>> {
  radius = 0.5;
  size = 0.5;
  speed = 0.002;
  spriteCoordinateBounds = [0, 100];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position, {
      attraction: { amount: 0.002 }
    });
    this.generateSprites();
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    wrestler.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
