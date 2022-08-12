import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { TILE_WIDTH } from '../globals/game';
import { makeSprites } from '../util/makeSprites';

export abstract class CachedEntity {
  graphics: Canvas2DGraphicsRough;
  position: Vector2;
  sprites: HTMLCanvasElement[] = [];
  spriteCount: number;
  spriteCycleTime: number;
  spriteIndex: number;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    this.graphics = graphics;
    this.position = position;
    this.spriteCount = 4;
    this.spriteCycleTime = 1550;
    this.spriteIndex = 0;
  }

  abstract drawSprite: (graphics: Canvas2DGraphicsRough) => void;

  draw = () => {
    for (let i = 0; i < this.sprites.length; i++) {
      this.graphics.drawImage(
        this.sprites[this.spriteIndex],
        this.position.x,
        this.position.y
      );
    }
  };

  update(elapsed: number, delta: number) {
    this.spriteIndex = Math.floor(
      ((elapsed / this.spriteCycleTime) % 1) * this.sprites.length
    );
  }

  generateSprites = () => {
    this.sprites = makeSprites(
      this.graphics,
      this.graphics.coords.width(TILE_WIDTH),
      this.drawSprite,
      this.spriteCount
    );
  };
}
