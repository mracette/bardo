import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { anger } from '../../../svg/anger';
import { Behaviors } from '../behaviors/behaviors';
import { Enemy } from './enemy';

export class BasicAttracting extends Enemy<Pick<Behaviors, 'attraction'>> {
  radius = 0.5;
  size = 0.5;
  speed = 0.002;
  spriteCoordinateBounds = [0, 100];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position, {
      attraction: { amount: 0.002 }
    });
    this.generateSprites();
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    anger.forEach((lines) => graphics.lineSegments(lines));
  };
}
