import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { wrestler } from '../../../svg/wrestler';
import { Behaviors } from '../behaviors/behaviors';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Enemy } from './enemy';

export class Wrestler extends Enemy<Pick<Behaviors, 'attraction'>> {
  coordinateSystem = spriteCoordinateSystem.external;
  spriteSize = 1;
  spriteKey = EntityType.Wrestler;
  radius = 0.5;
  speed = 0.002;
  health = 100;

  constructor(position: Vector2) {
    super(position, {
      attraction: { amount: 0.002 }
    });
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    wrestler.forEach((lines) => graphics.lineSegments(lines, this.options));
  };
}
