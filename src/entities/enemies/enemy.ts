import { Canvas2DGraphicsOptions, random, Vector2 } from 'crco-utils';
import { state } from '../../globals/game';
import { graphics } from '../../globals/graphics';
import { palette } from '../../globals/palette';
import { addAttraction } from '../behaviors/attraction';
import { Behaviors } from '../behaviors/behaviors';
import { addGuarding } from '../behaviors/guarding';
import { CachedEntity } from '../entity';
import { EntityType } from '../entityType';
import { StarLarge, StarMedium, StarSmall } from '../items/stars';
import { Overlay } from '../overlays/overlay';

export abstract class Enemy<T extends Partial<Behaviors>> extends CachedEntity {
  abstract radius: number;

  health: number;
  speed = 0.00175;
  cooldownPeriod = 1000;
  cooldowns: Partial<Record<EntityType, number>> = {};
  options: Canvas2DGraphicsOptions = { styles: { fillStyle: palette.black }, fill: true };
  behaviors: T;

  constructor(position: Vector2, behaviors: T, health: number) {
    super(position);
    this.behaviors = behaviors;
    this.health = health;
  }

  drawDamage(amount: number) {
    graphics.gameplay.text(
      String(amount),
      this.center.x,
      this.center.y - this.spriteSize / 2
    );
  }

  damage(amount: number, index: number, elapsed: number, type: EntityType) {
    const cooldown = this.cooldowns[type];
    if (cooldown && elapsed - cooldown < this.cooldownPeriod) return;
    this.health -= amount;
    state.overlays.push(new Overlay(this, String(amount), elapsed));
    if (this.health <= 0) {
      this.destroy();
    }
    this.cooldowns[type] = elapsed;
  }

  destroy() {
    const Star = random([StarSmall, StarMedium, StarLarge]);
    const star = new Star(this.center.clone());
    star.position.add(-star.spriteSize / 2, -star.spriteSize / 2);
    state.items.push(star);
    this.shouldDestroy = true;
  }

  update(elapsed: number, delta: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
  }

  updatePosition(elapsed: number, delta: number) {
    if (this.behaviors.attraction) {
      addAttraction(this.position, delta, this.behaviors.attraction);
    }
    if (this.behaviors.guarding) {
      addGuarding(this.position, delta, this.behaviors.guarding);
    }
  }
}
