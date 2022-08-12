import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { CircularBounding } from '../bounding/circlular';
import { Enemy } from '../enemy';

export class BasicNonAttracting extends Enemy<Record<string, never>> {
  behaviors = {};
  radius = 0.5;
  size = 0.5;
  speed = 0.002;
  sprites = [];
  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    super(graphics, position);
  }
}
