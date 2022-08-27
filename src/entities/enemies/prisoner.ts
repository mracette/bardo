import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { prisoner } from '../../../svg/prisoner';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Prisoner extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  spriteKey = EntityType.Prisoner;
  radius = 0.5;
  speed = 0.002;

  constructor(position: Vector2, health: number) {
    super(
      position,
      {
        attraction: { amount: 0.002 }
      },
      health
    );
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    prisoner.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
