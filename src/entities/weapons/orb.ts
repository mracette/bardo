import { Canvas2DGraphicsRough, TAU } from 'crco-utils';
import { player } from '../../globals/player';
import { spriteCoordinateSystem } from '../sprites';
import { Weapon } from './weapon';

export class Orb extends Weapon {
  coordinateSystem = spriteCoordinateSystem.internal;
  spriteSize = 1;
  spinRadius = 1.5;
  radius = 0.25;
  options = undefined;

  constructor(graphics: Canvas2DGraphicsRough) {
    super(graphics);
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    graphics.circle(0, 0, this.radius);
  };

  updatePosition = (elapsed: number, delta: number) => {
    this.positionPrevious.set(this.position);
    const angle = TAU * elapsed * this.speed;
    this.position.x = player.position.x + Math.cos(angle) * this.spinRadius;
    this.position.y = player.position.y + Math.sin(angle) * this.spinRadius;
  };
}
