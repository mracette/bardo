import { Canvas2DGraphics, Vector2, Canvas2DGraphicsOptions, PI } from '../../crco';
import { state } from '../../globals/game';
import { player } from '../../globals/player';
import { stats } from '../../globals/stats';
import { EntityType } from '../entityType';
import { spriteCoordinateSystem } from '../sprites';
import { Weapon, WeaponInstance } from './weapon';

export class ArrowInstance extends WeaponInstance<Arrow> {
  coordinateSystem = spriteCoordinateSystem.internal;
  spriteSize = 1;
  radius = 0.05;
  spriteKey = EntityType.Arrow;
  options = undefined;
  targetNormalized: Vector2;
  targetAngle: number;
  rotationOptions: Canvas2DGraphicsOptions;
  destroyOnCollide = true;

  constructor(parent: Arrow, target: Vector2) {
    super(parent, player.position.clone());
    this.targetNormalized = Vector2.from(target, this.center).normalize();
    this.targetAngle = this.targetNormalized.angle() + PI;
    this.rotationOptions = {
      styles: { rotation: { origin: this.centerAlpha, rotation: this.targetAngle } }
    };
  }

  static staticDraw(graphics: Canvas2DGraphics) {
    graphics.lineSegments([
      [-1, 0],
      [1, 0]
    ]);
    graphics.lineSegments([
      [-0.75, -0.4],
      [-1, 0],
      [-0.75, 0.4]
    ]);
  }

  draw(alpha: number) {
    this.preDraw(alpha);
    super.draw(alpha, this.rotationOptions, false);
  }

  drawSprite = (graphics: Canvas2DGraphics) => {
    ArrowInstance.staticDraw(graphics);
  };

  updatePosition = () => {
    this.position.x += this.targetNormalized.x * this.parent.speed;
    this.position.y += this.targetNormalized.y * this.parent.speed;
  };
}

export class Arrow extends Weapon<ArrowInstance> {
  level = 1;
  range = 5;
  speed = 0.1;
  lastFired = 0;
  type = EntityType.Arrow;

  constructor(equipped?: boolean) {
    super(equipped);
  }

  get stats() {
    return stats[EntityType.Arrow];
  }

  get frequency() {
    const multiplier = state.shroomed.active ? 1 / 10 : 1;
    return (multiplier * 1000) / this.stats['Firing Rate'][this.level - 1];
  }

  get damage() {
    return this.stats.Damage[this.level - 1];
  }

  update(): void {
    super.update();

    if (state.time.elapsed - this.lastFired > this.frequency) {
      this.lastFired = state.time.elapsed;
      const nearestEnemy = this.findNearestEnemy();
      if (nearestEnemy) {
        this.instances.push(new ArrowInstance(this, nearestEnemy.center));
      }
    }

    for (let i = 0; i < this.instances.length; i++) {
      const arrow = this.instances[i];
      arrow.update();
      if (arrow.center.distanceTo(player.center) > this.range) {
        arrow.shouldDestroy = true;
      }
    }
  }

  // TODO: inefficient. improve this?
  findNearestEnemy() {
    let shortestDistance = Infinity;
    let enemy;
    for (let i = 0; i < state.enemies.length; i++) {
      const enemyDistance = player.center.distanceTo(state.enemies[i].center);
      if (enemyDistance < shortestDistance) {
        shortestDistance = enemyDistance;
        enemy = state.enemies[i];
      }
    }
    return enemy;
  }

  upgrade = () => {
    if (this.canUpgrade()) {
      this.level++;
    }
  };
}
