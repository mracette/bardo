import {
  Canvas2DGraphicsRough,
  circleCircleCollision,
  lerp,
  TAU,
  distance,
  Vector2,
  Canvas2DGraphicsOptions,
  PI,
  normalize
} from 'crco-utils';
import { state } from '../../globals/game';
import { palette } from '../../globals/palette';
import { player } from '../../globals/player';
import { stats } from '../../globals/stats';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Weapon, WeaponInstance } from './weapon';

const AXE_SEGMENT_HEIGHTS = [0.4, 0.2, 0.6];
const AXE_SEGMENT_LENGTHS = [0, 0.2, 0.6];

export class AxeInstance extends WeaponInstance<Axe> {
  coordinateSystem = spriteCoordinateSystem.internal;
  spriteSize = 2;
  radius = 0.5;
  spriteKey = EntityType.Axe;
  options = undefined;
  start: number;
  initialDirection: number;
  rotationOptions: Canvas2DGraphicsOptions;

  constructor(parent: Axe, position: Vector2, start: number) {
    super(parent, position);
    this.start = start;
    this.initialDirection = player.forwardDirection === 'left' ? 1 : -1;
    this.rotationOptions = {
      styles: {
        rotation: {
          origin: this.center,
          rotation: (this.initialDirection * -Math.PI) / 4
        },
        scale: {
          origin: this.center,
          scale: new Vector2(-1 * this.initialDirection, 1)
        }
      }
    };
  }

  draw(alpha: number) {
    super.draw(alpha, this.rotationOptions);
  }

  drawSprite = (graphics: Canvas2DGraphicsRough) => {
    const startX = -1 / 3;
    const startY = 0;
    graphics.lineSegments([
      [startX, startY],
      [startX, startY - AXE_SEGMENT_HEIGHTS[0] / 2],
      [startX + AXE_SEGMENT_LENGTHS[1], startY - AXE_SEGMENT_HEIGHTS[1] / 2],
      [startX + AXE_SEGMENT_LENGTHS[2], startY - AXE_SEGMENT_HEIGHTS[2] / 2],
      [startX + AXE_SEGMENT_LENGTHS[2], startY + AXE_SEGMENT_HEIGHTS[2] / 2],
      [startX + AXE_SEGMENT_LENGTHS[1], startY + AXE_SEGMENT_HEIGHTS[1] / 2],
      [startX, startY + AXE_SEGMENT_HEIGHTS[0] / 2],
      [startX, startY]
    ]);
    graphics.lineSegments([
      [startX + AXE_SEGMENT_LENGTHS[1], 0.8],
      [startX + AXE_SEGMENT_LENGTHS[1], startY + startY + AXE_SEGMENT_HEIGHTS[0] / 2]
    ]);
  };

  updatePosition = (elapsed: number, delta: number) => {
    this.positionPrevious.set(this.position);
    const n = normalize(elapsed, this.start, this.start + this.parent.duration);
    const angle = -PI / 2 - n * PI;
    this.parent.setPositionFromAngle(this.position, angle, this.initialDirection);
    this.position.add(-this.spriteSize / 2, -this.spriteSize / 2);
  };
}

export class Axe extends Weapon<AxeInstance> {
  level = 1;
  range = 1.5;
  speed = 0.1;
  duration = 400;
  // duration = 1000;
  lastFired = 0;

  constructor() {
    super();
  }

  get stats() {
    return stats[EntityType.Axe];
  }

  get frequency() {
    // return 1000;
    return 1000 / this.stats.frequency[this.level - 1];
  }

  setPositionFromAngle(position: Vector2, angle: number, direction: number) {
    position.x = player.center.x + direction * Math.cos(direction * angle) * this.range;
    position.y = player.center.y + direction * Math.sin(direction * angle) * this.range;
  }

  get damage() {
    return this.stats.damage[this.level - 1];
  }

  update(elapsed: number, delta: number): void {
    super.update(elapsed, delta);
    if (elapsed - this.lastFired > this.frequency) {
      this.lastFired = elapsed;
      const position = player.position.clone();
      this.setPositionFromAngle(position, -PI / 2, 1);
      // hardcoded sprite size
      position.add(-1 / 2, -1 / 2);
      this.instances.push(new AxeInstance(this, position, elapsed));
    }

    for (let i = 0; i < this.instances.length; i++) {
      const instance = this.instances[i];
      instance.update(elapsed, delta, i);
      if (elapsed - instance.start > this.duration) {
        this.instances.splice(i, 1);
      }
    }
  }

  upgrade = () => {
    if (this.canUpgrade()) {
      this.level++;
    }
  };
}
