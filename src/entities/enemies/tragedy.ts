import { Canvas2DGraphics, Vector2 } from 'crco-utils';
import { mask } from '../../../svg/mask';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Tragedy extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 2;
  spriteKey = EntityType.Tragedy;
  radius = 0.8;

  static baseHealth = 10;

  constructor(position: Vector2, health: number) {
    super(
      position,
      {
        attraction: { amount: 0.002 }
      },
      health
    );
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    mask.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
