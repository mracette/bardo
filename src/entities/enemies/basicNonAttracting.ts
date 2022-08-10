import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { Attraction } from '../behaviors/attraction';
import { Enemy } from '../enemy';

export class BasicNonAttracting extends Enemy<Record<string, never>> {
  behaviors = {};
  size = 0.5;
  speed = 0.002;
  sprites = [];
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
  }
}