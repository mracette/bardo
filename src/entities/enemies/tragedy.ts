import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { mask } from '../../../svg/mask';
import { Behaviors } from '../behaviors/behaviors';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Tragedy extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 2;
  radius = 0.5;
  speed = 0.002;
  spriteCoordinateBounds = [0, 100];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position, {
      attraction: { amount: 0.002 }
    });
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    mask.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
