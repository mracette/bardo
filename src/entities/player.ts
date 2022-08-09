import { Canvas2DGraphics, Canvas2DGraphicsRough, clamp, Vector2 } from 'crco-utils';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, STATE, TILE_WIDTH } from '../globals/game';
import { SQRT_2_2 } from '../globals/math';
import { makeSprites } from '../util/makeSprites';

export class Player {
  graphics: Canvas2DGraphicsRough;
  position: Vector2;
  size: number;
  speed: number;
  spriteCount: number;
  sprites: HTMLCanvasElement[];
  spriteCycleTime: number;

  constructor(graphics: Canvas2DGraphicsRough) {
    this.graphics = graphics;
    this.position = new Vector2(MAP_DIMENSIONS.x / 2, MAP_DIMENSIONS.y / 2);
    this.size = 0.5;
    this.spriteCount = 4;
    this.spriteCycleTime = 1550;
    this.speed = 0.005;
  }

  collides(
    x: number,
    y: number,
    positionX: number = this.position.x,
    positionY: number = this.position.y
  ) {
    return (positionX - x) ** 2 + (positionY - y) ** 2 <= this.size ** 2;
  }

  updatePosition(delta: number) {
    const moveAmount = delta * this.speed;
    const diagonalAmount = SQRT_2_2 * moveAmount;

    let deltaX = 0;
    let deltaY = 0;

    if (STATE.move.left && STATE.move.up) {
      deltaX = -diagonalAmount;
      deltaY = -diagonalAmount;
    } else if (STATE.move.left && STATE.move.down) {
      deltaX = -diagonalAmount;
      deltaY = diagonalAmount;
    } else if (STATE.move.right && STATE.move.up) {
      deltaX = diagonalAmount;
      deltaY = -diagonalAmount;
    } else if (STATE.move.right && STATE.move.down) {
      deltaX = diagonalAmount;
      deltaY = diagonalAmount;
    } else if (STATE.move.up) {
      deltaY = -moveAmount;
    } else if (STATE.move.down) {
      deltaY = moveAmount;
    } else if (STATE.move.left) {
      deltaX = -moveAmount;
    } else if (STATE.move.right) {
      deltaX = moveAmount;
    }

    this.position.x = clamp(this.position.x + deltaX, 0, MAP_DIMENSIONS.x - 1);
    this.position.y = clamp(this.position.y + deltaY, 0, MAP_DIMENSIONS.y - 1);
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

export const PLAYER = new Player(GRAPHICS.player);
