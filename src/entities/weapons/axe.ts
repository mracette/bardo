import {
  Canvas2DGraphics,
  Vector2,
  Canvas2DGraphicsOptions,
  PI,
  normalize
} from '../../crco';
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
  spriteSize = 3;
  radius = 0.75;
  spriteKey = EntityType.Axe;
  options = undefined;
  start: number;
  initialDirection: number;
  rotationOptions: Canvas2DGraphicsOptions;

  constructor(
    parent: Axe,
    position: Vector2,
    direction: 'left' | 'right',
    start: number
  ) {
    super(parent, position);
    this.start = start;
    this.initialDirection = direction === 'left' ? 1 : -1;
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

  static staticDraw(graphics: Canvas2DGraphics) {
    const startX = -1 / 3;
    const startY = 0;
    const options = {
      fill: true,
      styles: {
        fillStyle: palette.white
      }
    };
    graphics.lineSegments(
      [
        [startX, startY],
        [startX, startY - AXE_SEGMENT_HEIGHTS[0] / 2],
        [startX + AXE_SEGMENT_LENGTHS[1], startY - AXE_SEGMENT_HEIGHTS[1] / 2],
        [startX + AXE_SEGMENT_LENGTHS[2], startY - AXE_SEGMENT_HEIGHTS[2] / 2],
        [startX + AXE_SEGMENT_LENGTHS[2], startY + AXE_SEGMENT_HEIGHTS[2] / 2],
        [startX + AXE_SEGMENT_LENGTHS[1], startY + AXE_SEGMENT_HEIGHTS[1] / 2],
        [startX, startY + AXE_SEGMENT_HEIGHTS[0] / 2],
        [startX, startY]
      ],
      options
    );
    graphics.lineSegments(
      [
        [startX + AXE_SEGMENT_LENGTHS[1], 0.8],
        [startX + AXE_SEGMENT_LENGTHS[1], startY + startY + AXE_SEGMENT_HEIGHTS[0] / 2]
      ],
      options
    );
  }

  draw(alpha: number) {
    super.draw(alpha, this.rotationOptions);
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    AxeInstance.staticDraw(graphics);
  };

  updatePosition = () => {
    const n = normalize(
      state.time.elapsedInGame,
      this.start,
      this.start + this.parent.duration
    );
    const angle = -PI / 2 - n * PI;
    this.parent.setPositionFromAngle(this.position, angle, this.initialDirection);
    this.position.add(-this.spriteSize / 2, -this.spriteSize / 2);
  };
}

export class Axe extends Weapon<AxeInstance> {
  level = 1;
  range = 1.7;
  speed = 0.09;
  duration = 500;
  lastFired = 0;
  type = EntityType.Axe;

  constructor(equipped?: boolean) {
    super(equipped);
  }

  get stats() {
    return stats[EntityType.Axe];
  }

  get frequency() {
    const multiplier = state.shroomed.active ? 1 / 10 : 1;
    return (multiplier * 1000) / this.stats['Firing Rate'][this.level - 1];
  }

  setPositionFromAngle(position: Vector2, angle: number, direction: number) {
    position.x = player.center.x + direction * Math.cos(direction * angle) * this.range;
    position.y = player.center.y + direction * Math.sin(direction * angle) * this.range;
  }

  get damage() {
    return this.stats.Damage[this.level - 1];
  }

  update(): void {
    super.update();
    if (state.time.elapsedInGame - this.lastFired > this.frequency) {
      const nearestEnemy = this.findNearestEnemy();
      const enemyDirection =
        nearestEnemy && nearestEnemy.position.x < player.position.x ? 'left' : 'right';
      this.lastFired = state.time.elapsedInGame;
      const position = player.position.clone();
      this.setPositionFromAngle(position, -PI / 2, 1);
      // hardcoded sprite size
      position.add(-1 / 2, -1 / 2);
      this.instances.push(
        new AxeInstance(this, position, enemyDirection, state.time.elapsedInGame)
      );
    }

    for (let i = 0; i < this.instances.length; i++) {
      const instance = this.instances[i];
      instance.update();
      if (state.time.elapsedInGame - instance.start > this.duration) {
        instance.shouldDestroy = true;
      }
    }
  }

  upgrade = () => {
    if (this.canUpgrade()) {
      this.level++;
    }
  };
}
