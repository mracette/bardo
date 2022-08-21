import {
  Canvas2DGraphicsOptions,
  Canvas2DGraphicsRough,
  lerp,
  Vector2
} from 'crco-utils';
import { debug } from '../globals/debug';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { tileWidth } from '../globals/map';
import { makeSprites } from '../util/makeSprites';
import { EntityType } from './entityType';
import { cache, spriteCoordinateSystem } from './sprites';

export abstract class CachedEntity {
  positionPrevious: Vector2;
  position: Vector2;
  center: Vector2;

  abstract spriteSize: number;
  abstract radius: number;
  abstract spriteKey: EntityType;

  abstract coordinateSystem: typeof spriteCoordinateSystem[keyof typeof spriteCoordinateSystem];
  abstract options?: Canvas2DGraphicsOptions;
  abstract drawSprite: (graphics: Canvas2DGraphicsRough) => void;

  constructor(position: Vector2) {
    this.position = position;
    this.positionPrevious = position.clone();
    this.center = position.clone();
  }

  get key() {
    // TODO: cache this?
    return String(this.spriteKey) + String(this.radius) + JSON.stringify(this.options);
  }

  draw = (alpha: number) => {
    const key = this.key;
    const cached = key in cache.sprites && cache.sprites[key].length;

    if (!cached) {
      if (debug) {
        console.info('Cached sprite not found. Regenerating.');
      }
      cache.sprites[this.key] = makeSprites(
        graphics.gameplay,
        this.drawSprite,
        graphics.gameplay.coords.width(tileWidth * this.spriteSize),
        4,
        this.coordinateSystem
      );
    }

    const sprite = cache.sprites[key][state.spriteIndex];

    graphics.gameplay.drawImage(
      sprite,
      lerp(alpha, this.positionPrevious.x, this.position.x),
      lerp(alpha, this.positionPrevious.y, this.position.y)
    );

    if (debug) {
      graphics.gameplay.circle(this.center.x, this.center.y, this.radius * tileWidth, {
        styles: { strokeStyle: 'red' }
      });
    }
  };

  update(elapsed: number, delta: number, index?: number) {
    this.positionPrevious.set(this.position);
    this.center.x = this.position.x + this.spriteSize / 2;
    this.center.y = this.position.y + this.spriteSize / 2;
  }
}
