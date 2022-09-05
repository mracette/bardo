import { Canvas2DGraphicsOptions, random, Vector2 } from 'crco-utils';
import { drawExperience } from '../../drawing/drawExperience';
import { state } from '../../globals/game';
import { graphics } from '../../globals/graphics';
import { palette } from '../../globals/palette';
import { addAttraction } from '../behaviors/attraction';
import { Behaviors } from '../behaviors/behaviors';
import { addGuarding } from '../behaviors/guarding';
import { CachedEntity } from '../entity';
import { EntityType } from '../entityType';
import { Star } from '../items/stars';
import { DamageOverlay } from '../overlays/damage';
import { Goat } from './goat';
import { Prisoner } from './prisoner';
import { Reaper } from './reaper';
import { Tragedy } from './tragedy';
import { Wrestler } from './wrestler';

export abstract class Enemy<T extends Partial<Behaviors>> extends CachedEntity {
  abstract radius: number;

  damageInflicted = 5;
  maxHealth: number;
  health: number;
  speed = 0.025;
  cooldownPeriod = 1000;
  cooldowns: Partial<Record<EntityType, number>> = {};
  options: Canvas2DGraphicsOptions = { styles: { fillStyle: palette.black }, fill: true };
  behaviors: T;

  constructor(position: Vector2, behaviors: T, health: number) {
    super(position);
    this.behaviors = behaviors;
    this.health = health;
    this.maxHealth = health;
  }

  drawDamage(amount: number) {
    graphics.gameplay.text(
      String(amount),
      this.center.x,
      this.center.y - this.spriteSize / 2,
      {
        roughness: 0
      }
    );
  }

  damage(amount: number, index: number, elapsed: number, type: EntityType) {
    const cooldown = this.cooldowns[type];
    if (cooldown && elapsed - cooldown < this.cooldownPeriod) return;
    this.health -= amount;
    state.overlays.push(new DamageOverlay(this, String(amount), elapsed));
    if (this.health <= 0) {
      this.destroy();
    }
    this.cooldowns[type] = elapsed;
  }

  destroy() {
    const star = new Star(this.center.clone(), this.maxHealth);
    star.position.add(-star.spriteSize / 2, -star.spriteSize / 2);
    state.items.push(star);
    this.shouldDestroy = true;
  }

  update(elapsed: number, delta: number) {
    super.update(elapsed, delta);
    this.updatePosition(elapsed, delta);
    this.updateCenterFromPosition();
  }

  updatePosition(elapsed: number, delta: number) {
    if (this.behaviors.attraction) {
      addAttraction(this.position, this.speed);
    }
    if (this.behaviors.guarding) {
      addGuarding(this.position, delta, this.behaviors.guarding);
    }
  }
}
