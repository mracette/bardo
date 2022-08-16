import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { Behaviors } from '../behaviors/behaviors';
import { Enemy } from '../enemy';
import { ExternalSprite } from '../externalSprite';

export class BasicGuarding extends Enemy<Pick<Behaviors, 'guarding'>> {
  radius = 0.5;
  size = 0.5;
  speed = 0.002;
  sprites = [];
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position, {
      guarding: {
        attraction: 0.002,
        distance: 3,
        guardPosition: position.clone()
      }
    });
    this.generateSprites();
  }
}
