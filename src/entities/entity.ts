import { Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { TILE_WIDTH } from '../globals/game';
import { makeSprites } from '../util/makeSprites';

export abstract class CachedEntity {
  graphics: Canvas2DGraphicsRough;
  position: Vector2;
  sprites: HTMLCanvasElement[] = [];
  spriteCount: number;
  spriteCycleTime: number;

  abstract draw: (graphics: Canvas2DGraphicsRough) => void;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    this.graphics = graphics;
    this.position = position;
    this.spriteCount = 4;
    this.spriteCycleTime = 1550;
  }

  drawSprite = (time: number) => {
    const spriteIndex = Math.floor(
      ((time / this.spriteCycleTime) % 1) * this.sprites.length
    );
    for (let i = 0; i < this.sprites.length; i++) {
      this.graphics.drawImage(
        this.sprites[spriteIndex],
        this.position.x,
        this.position.y
      );
    }
  };

  generateSprites = () => {
    this.sprites = this.getSprites();
  };

  getSprites = () => {
    return makeSprites(this.graphics, this.graphics.coords.width(TILE_WIDTH), this.draw);
  };
}
