import { Canvas2DGraphicsOptions, Canvas2DGraphics, lerp, Vector2 } from '../crco';
import { debug } from '../globals/debug';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { tileWidth } from '../globals/map';
import { makeSprites } from '../util/makeSprites';
import { EntityType } from './entityType';
import { cache, spriteCoordinateSystem } from './sprites';

interface InstanceCache {
  key?: string;
  center?: Vector2;
  centerPrevious?: Vector2;
}
export abstract class CachedEntity {
  positionPrevious: Vector2;
  position: Vector2;
  spriteKey: EntityType | string = '';
  cache: InstanceCache = {};
  drawGraphics: Canvas2DGraphics;
  shouldDestroy = false;

  centerAlpha = new Vector2(0, 0);
  positionAlpha = new Vector2(0, 0);

  spriteCount = 4;
  spriteIndex = 0;

  abstract spriteSize: number;
  abstract radius: number;

  abstract coordinateSystem: typeof spriteCoordinateSystem[keyof typeof spriteCoordinateSystem];
  abstract options?: Canvas2DGraphicsOptions;
  abstract drawSprite: (graphics: Canvas2DGraphics) => void;

  constructor(position: Vector2, drawGraphics: Canvas2DGraphics = graphics.gameplay) {
    this.position = position;
    this.drawGraphics = drawGraphics;
    this.positionPrevious = position.clone();
  }

  get center() {
    if ('center' in this.cache) {
      return this.cache.center!;
    }
    const center = this.position.clone().add(this.spriteSize / 2, this.spriteSize / 2);
    this.cache.center = center;
    return center;
  }

  get centerPrevious() {
    if ('centerPrevious' in this.cache) {
      return this.cache.centerPrevious!;
    }
    const value = this.position.clone().add(this.spriteSize / 2, this.spriteSize / 2);
    this.cache.centerPrevious = value;
    return value;
  }

  get key() {
    if ('key' in this.cache) {
      return this.cache.key!;
    }
    const key = [
      String(this.spriteKey),
      String(this.radius),
      JSON.stringify(this.options)
    ].join('~');
    this.cache.key = key;
    return key;
  }

  preDraw(alpha: number) {
    this.positionAlpha.x = lerp(alpha, this.positionPrevious.x, this.position.x);
    this.positionAlpha.y = lerp(alpha, this.positionPrevious.y, this.position.y);

    this.centerAlpha.x = lerp(alpha, this.centerPrevious.x, this.center.x);
    this.centerAlpha.y = lerp(alpha, this.centerPrevious.y, this.center.y);
  }

  draw(alpha: number, options?: Canvas2DGraphicsOptions, preDraw = true) {
    const key = this.key;
    const cached = key in cache.sprites && cache.sprites[key].length;

    if (preDraw) {
      this.preDraw(alpha);
    }

    if (!cached) {
      if (debug) {
        console.info('Cached sprite not found. Regenerating. Key: ' + key);
      }
      cache.sprites[this.key] = makeSprites(
        this.drawGraphics,
        this.drawSprite,
        this.drawGraphics.coords.width(tileWidth * this.spriteSize),
        this.spriteCount,
        this.coordinateSystem
      );
    }

    const sprite = cache.sprites[key][this.spriteIndex];

    this.drawGraphics.drawImage(
      sprite,
      this.positionAlpha.x,
      this.positionAlpha.y,
      options
    );

    if (debug) {
      this.drawGraphics.circle(
        this.centerAlpha.x,
        this.centerAlpha.y,
        this.radius * tileWidth,
        {
          styles: { strokeStyle: 'red' },
          roughness: 0
        }
      );
    }
  }

  update() {
    this.positionPrevious.set(this.position);
    this.centerPrevious.set(this.center);
    this.spriteIndex = Math.floor(
      ((state.time.elapsed / state.spritePeriod) % 1) * this.spriteCount
    );
  }

  updateCenterFromPosition() {
    this.center.x = this.position.x + this.spriteSize / 2;
    this.center.y = this.position.y + this.spriteSize / 2;
  }
}
