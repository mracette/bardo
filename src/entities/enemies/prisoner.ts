import { prisoner } from '../../../svg/prisoner';
import { Canvas2DGraphics, Vector2 } from '../../crco';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Prisoner extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  spriteKey = EntityType.Prisoner;
  radius = 0.5;

  static baseHealth = 13;

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
    prisoner.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
