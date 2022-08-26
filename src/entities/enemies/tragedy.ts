import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { mask } from '../../../svg/mask';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Tragedy extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 2;
  spriteKey = EntityType.Tragedy;
  radius = 1;
  speed = 0.002;
  health = 100;

  constructor(position: Vector2) {
    super(position, {
      attraction: { amount: 0.002 }
    });
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    mask.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
