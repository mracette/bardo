import { Canvas2DGraphicsRough, lerp, Vector2 } from 'crco-utils';
import { tileWidth } from '../globals/game';
import { makeSprites } from '../util/makeSprites';

export abstract class CachedEntity {
  graphics: Canvas2DGraphicsRough;
  positionPrevious: Vector2;
  position: Vector2;
  sprites: HTMLCanvasElement[] = [];
  spriteCount: number;
  spriteCycleTime: number;
  spriteIndex: number;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    this.graphics = graphics;
    this.position = position;
    this.positionPrevious = position.clone();
    this.spriteCount = 4;
    this.spriteCycleTime = 1550;
    this.spriteIndex = 0;
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
    this.spriteIndex = Math.floor(
      ((elapsed / this.spriteCycleTime) % 1) * this.sprites.length
    );
  }

  generateSprites = () => {
    this.sprites = makeSprites(
      this.graphics,
      this.graphics.coords.width(tileWidth),
      this.drawSprite,
      this.spriteCount
    );
  };
}
