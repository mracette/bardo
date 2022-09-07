import { wrestler } from '../../../svg/wrestler';
import { Canvas2DGraphics, Vector2 } from '../../crco';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Wrestler extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  spriteKey = EntityType.Wrestler;
  radius = 0.5;

  static baseHealth = 5;

  constructor(position: Vector2, health: number) {
    super(
      position,
      {
        attraction: { amount: 0.002 }
      },
      health
    );
    this.options = {
      ...this.options,
      styles: { ...this.options.styles, lineWidth: (coords) => coords.width(0.025) }
    };
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    wrestler.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
