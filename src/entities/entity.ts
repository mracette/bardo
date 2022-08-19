import { Canvas2DGraphicsRough, lerp, Vector2 } from 'crco-utils';
import { tileWidth } from '../globals/game';
import { makeSprites } from '../util/makeSprites';

export abstract class CachedEntity {
  graphics: Canvas2DGraphicsRough;
  positionPrevious: Vector2;
  position: Vector2;
  sprites: HTMLCanvasElement[] = [];
  spriteIndex = 0;
  spriteCount = 4;
  spriteCycleTime = 1550;

  /**
   * Size as a multiple of the tile width
   */
  spriteSize = 1;

  abstract spriteCoordinateBounds: number[];

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    this.graphics = graphics;
    this.position = position;
    this.positionPrevious = position.clone();
  }

  abstract drawSprite: (graphics: Canvas2DGraphicsRough) => void;

  draw = (alpha: number) => {
    this.graphics.drawImage(
      this.sprites[this.spriteIndex],
      lerp(alpha, this.positionPrevious.x, this.position.x),
      lerp(alpha, this.positionPrevious.y, this.position.y)
    );
  };

  update(elapsed: number, delta: number) {
    this.positionPrevious.set(this.position);
    this.spriteIndex = Math.floor(
      ((elapsed / this.spriteCycleTime) % 1) * this.sprites.length
    );
  }

  generateSprites = () => {
    this.sprites = makeSprites(
      this.graphics,
      this.drawSprite,
      this.graphics.coords.width(tileWidth * this.spriteSize),
      this.spriteCount,
      this.spriteCoordinateBounds as [number, number]
    );
  };
}
