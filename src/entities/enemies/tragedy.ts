import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { mask } from '../../../svg/mask';
import { Behaviors } from '../behaviors/behaviors';
import { spriteCoordinateSystem, SpriteKey } from '../sprites';
import { Enemy } from './enemy';

export class Tragedy extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 2;
  spriteKey = SpriteKey.Tragedy;
  radius = 1;
  speed = 0.002;

  constructor(position: Vector2) {
    super(position, {
      attraction: { amount: 0.002 }
    });
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    mask.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
