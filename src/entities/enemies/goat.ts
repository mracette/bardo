import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { goat } from '../../../svg/goat';
import { Behaviors } from '../behaviors/behaviors';
import { spriteCoordinateSystem, SpriteKey } from '../sprites';
import { Enemy } from './enemy';

export class Goat extends Enemy<Pick<Behaviors, 'guarding'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  spriteKey = SpriteKey.Goat;
  radius = 0.5;
  speed = 0.002;

  constructor(position: Vector2) {
    super(position, {
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
