import {
  Canvas2DGraphicsOptions,
  Canvas2DGraphicsRough,
  lerp,
  Vector2
} from 'crco-utils';
import { debug } from '../globals/debug';
import { state } from '../globals/game';
import { tileWidth } from '../globals/map';
import { makeSprites } from '../util/makeSprites';
import { cachedSprites, spriteCoordinateSystem } from './sprites';

export abstract class CachedEntity {
  graphics: Canvas2DGraphicsRough;
  positionPrevious: Vector2;
  position: Vector2;

  // sprites: HTMLCanvasElement[] = [];
  // spriteIndex = 0;
  // spriteCount = 4;
  // spriteCycleTime = 1550;

  abstract spriteSize: number;
  abstract radius: number;

  abstract coordinateSystem: typeof spriteCoordinateSystem[keyof typeof spriteCoordinateSystem];
  abstract options?: Canvas2DGraphicsOptions;
  abstract drawSprite: (graphics: Canvas2DGraphicsRough) => void;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    this.graphics = graphics;
    this.position = position;
    this.positionPrevious = position.clone();
  }

  get key() {
    // TODO: cache this?
    return String(this.draw) + String(this.radius) + JSON.stringify(this.options);
  }

  draw = (alpha: number) => {
    const key = this.key;
    const cached = key in cachedSprites;

    if (!cached) {
      if (debug) {
        console.info('Cached sprite not found. Regenerating.');
      }
      cachedSprites[this.key] = makeSprites(
        this.graphics,
        this.drawSprite,
        this.graphics.coords.width(tileWidth * this.spriteSize),
        4,
        this.coordinateSystem
      );
    }

    const sprite = cachedSprites[key][state.spriteIndex];

    this.graphics.drawImage(
      sprite,
      lerp(alpha, this.positionPrevious.x, this.position.x),
      lerp(alpha, this.positionPrevious.y, this.position.y)
    );
  };

  update(elapsed: number, delta: number, index?: number) {
    this.positionPrevious.set(this.position);
  }
}
