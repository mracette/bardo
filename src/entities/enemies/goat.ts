import { Canvas2DGraphics, Vector2 } from 'crco-utils';
import { goat } from '../../../svg/goat';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Goat extends Enemy<Pick<Behaviors, 'guarding'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  spriteKey = EntityType.Goat;
  radius = 0.5;

  static baseHealth = 7;

  constructor(position: Vector2, health: number) {
    super(
      position,
      {
        guarding: {
          attraction: 0.002,
          distance: 3,
          guardPosition: position.clone()
        }
      },
      health
    );
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    goat.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
