import { Canvas2DGraphics, Canvas2DGraphicsRough, clamp, Vector2 } from 'crco-utils';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, STATE, TILE_WIDTH } from '../globals/game';
import { SQRT_2_2 } from '../globals/math';
import { makeSprites } from '../util/makeSprites';
import { PLAYER } from './player';

export class Enemy {
  attraction: number;
  graphics: Canvas2DGraphicsRough;
  position: Vector2;
  size: number;
  speed: number;
  spriteCount: number;
  sprites: HTMLCanvasElement[];
  spriteCycleTime: number;

  constructor(graphics: Canvas2DGraphicsRough, position: Vector2) {
    this.graphics = graphics;
    this.position = position;
    this.size = 0.5;
    this.spriteCount = 4;
    this.spriteCycleTime = 1550;
    this.speed = 0.002;
    this.attraction = 1;
    this.makeSprites();
  }

  collides(
    x: number,
    y: number,
    positionX: number = this.position.x,
    positionY: number = this.position.y
  ) {
    return (positionX - x) ** 2 + (positionY - y) ** 2 <= this.size ** 2;
  }

  updatePosition(elapsed: number) {
    const movement = elapsed * this.speed * this.attraction;
    const vector = Vector2.from(PLAYER.position, this.position);
    const unit = vector.toUnitVector();
    this.position.x += unit.x * movement;
    this.position.y += unit.y * movement;
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
