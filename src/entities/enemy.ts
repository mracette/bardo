import { Canvas2DGraphics, Canvas2DGraphicsRough, clamp, Vector2 } from 'crco-utils';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, STATE, TILE_WIDTH } from '../globals/game';
import { SQRT_2_2 } from '../globals/math';
import { makeSprites } from '../util/makeSprites';
import { addAttraction } from './behaviors/attraction';
import { Behaviors } from './behaviors/behaviors';
import { PLAYER } from './player';

export abstract class Enemy<T extends Partial<Behaviors>> {
  graphics: Canvas2DGraphicsRough;
  position: Vector2;
  spriteCount: number;
  spriteCycleTime: number;

  abstract size: number;
  abstract speed: number;
  abstract sprites: HTMLCanvasElement[];
  abstract behaviors: T;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    this.graphics = graphics;
    this.position = position;
    this.spriteCount = 4;
    this.spriteCycleTime = 1550;
    this.makeSprites();
  }

  // TODO: add to crco-utils
  collides(
    x: number,
    y: number,
    positionX: number = this.position.x,
    positionY: number = this.position.y
  ) {
    return (positionX - x) ** 2 + (positionY - y) ** 2 <= this.size ** 2;
  }

  updatePosition(elapsed: number) {
    const movement = elapsed * this.speed;
    if (this.behaviors.attraction) {
      addAttraction(this.position, movement, this.behaviors.attraction);
    }
  }

  draw = (graphics: Canvas2DGraphics | Canvas2DGraphicsRough) => {
    graphics.star(0, 0, this.size, 5);
  };

  drawSprite(time: number) {
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
  }

  makeSprites() {
    this.sprites = makeSprites(
      this.graphics,
      this.graphics.coords.width(TILE_WIDTH),
      this.draw
    );
  }
}
