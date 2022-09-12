import { Canvas2DGraphicsOptions, random, Vector2 } from '../../crco';
import { drawUi } from '../../drawing/drawUi';
import { state } from '../../globals/game';
import { graphics } from '../../globals/graphics';
import { palette } from '../../globals/palette';
import { zzfx } from '../../zzfx';
import { addAttraction } from '../behaviors/attraction';
import { Behaviors } from '../behaviors/behaviors';
import { addGuarding } from '../behaviors/guarding';
import { CachedEntity } from '../entity';
import { EntityType } from '../entityType';
import { Star } from '../items/star';
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
  cooldownPeriod = {
    [EntityType.Axe]: 1000,
    [EntityType.MagicCircle]: 250,
    [EntityType.Orb]: 500,
    [EntityType.Arrow]: 1
  };
  cooldowns: Partial<Record<EntityType, number>> = {};
  options: Canvas2DGraphicsOptions = { styles: { fillStyle: palette.black }, fill: true };
  behaviors: T;

  constructor(position: Vector2, behaviors: T, health: number) {
    super(position);
    this.behaviors = behaviors;
    this.health = health;
    this.maxHealth = health;
  }

  get speed() {
    const multiplier = state.shroomed.active ? 0.1 : 1;
    return multiplier * 0.0185;
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

  damage(amount: number, type: EntityType) {
    const cooldown = this.cooldowns[type];
    // @ts-ignore
    const cooldownPeriod = type in this.cooldownPeriod ? this.cooldownPeriod[type] : 1000;
    if (cooldown && state.time.elapsed - cooldown < cooldownPeriod) return;
    zzfx(...[, , 129, 0.01, , , , , , , , , , 5, , , , 0.4]);
    this.health -= amount;
    // @ts-ignore
    state.stats.weapons[type] += amount;
    state.stats.total += amount;
    state.overlays.push(new DamageOverlay(this, String(amount), state.time.elapsed));
    if (this.health <= 0) {
      state.stats.hallucinationsBanished++;
      this.destroy();
    }
    this.cooldowns[type] = state.time.elapsed;
  }

  destroy() {
    const star = new Star(this.center.clone(), this.maxHealth);
    star.position.add(-star.spriteSize / 2, -star.spriteSize / 2);
    state.items.push(star);
    this.shouldDestroy = true;
  }

  update() {
    super.update();
    this.updatePosition();
    this.updateCenterFromPosition();
  }

  updatePosition() {
    if (this.behaviors.attraction) {
      addAttraction(this.position, this.speed);
    }
    if (this.behaviors.guarding) {
      addGuarding(this.position, this.behaviors.guarding);
    }
  }
}
