import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { goat } from '../../../svg/goat';
import { Behaviors } from '../behaviors/behaviors';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Goat extends Enemy<Pick<Behaviors, 'guarding'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  radius = 0.5;
  speed = 0.002;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position, {
      guarding: {
        attraction: 0.002,
        distance: 3,
        guardPosition: position.clone()
      }
    });
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    goat.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
