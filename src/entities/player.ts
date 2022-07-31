import {
  Canvas2DGraphics,
  Canvas2DGraphicsRough,
  CanvasCoordinates,
  Vector2
} from 'crco-utils';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, STATE, TILE_WIDTH } from '../globals/game';
import { SQRT_2_2 } from '../globals/math';

export class Player {
  graphics: Canvas2DGraphicsRough;
  position: Vector2;
  size: number;
  speed: number;
  spriteCount: number;
  sprites: HTMLCanvasElement[];
  spriteCycleTime: number;

  constructor(graphics) {
    this.graphics = graphics;
    this.position = new Vector2(MAP_DIMENSIONS.x / 2, MAP_DIMENSIONS.y / 2);
    this.size = TILE_WIDTH / 2;
    this.spriteCount = 4;
    this.spriteCycleTime = 1500;
    this.speed = 0.005;
  }

  updatePosition(elapsed: number) {
    const moveAmount = SQRT_2_2 * elapsed * this.speed;
    if (STATE.move.left && STATE.move.up) {
      this.position.x -= moveAmount;
      this.position.y -= moveAmount;
      return;
    }
    if (STATE.move.left && STATE.move.down) {
      this.position.x -= moveAmount;
      this.position.y += moveAmount;
      return;
    }
    if (STATE.move.right && STATE.move.up) {
      this.position.x += moveAmount;
      this.position.y -= moveAmount;
      return;
    }
    if (STATE.move.right && STATE.move.down) {
      this.position.x += moveAmount;
      this.position.y += moveAmount;
      return;
    }
    if (STATE.move.up) {
      this.position.y -= moveAmount;
      return;
    }
    if (STATE.move.down) {
      this.position.y += moveAmount;
      return;
    }
    if (STATE.move.left) {
      this.position.x -= moveAmount;
      return;
    }
    if (STATE.move.right) {
      this.position.x += moveAmount;
      return;
    }
  }

  draw(graphics: Canvas2DGraphics | Canvas2DGraphicsRough) {
    graphics.star(0, 0, 0.5, 5);
  }

  drawSprite(time: number) {
    const spriteIndex = Math.floor(
      ((time / this.spriteCycleTime) % 1) * this.spriteCount
    );
    this.graphics.clear();
    for (let i = 0; i < this.sprites.length; i++) {
      this.graphics.drawImage(
        this.sprites[spriteIndex],
        this.position.x,
        this.position.y
      );
    }
  }

  makeSprites() {
    const spriteSize = this.graphics.coords.width(TILE_WIDTH);
    const sprites = [];
    this.graphics.applyStyles(this.graphics.options.styles);
    for (let i = 0; i < this.spriteCount; i++) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const graphics = new Canvas2DGraphicsRough(context, {
        ...this.graphics.options,
        styles: {
          ...this.graphics.options.styles,
          lineWidth: this.graphics.context.lineWidth
        },
        coords: new CanvasCoordinates({ baseWidth: spriteSize, baseHeight: spriteSize })
      });
      canvas.width = spriteSize;
      canvas.height = spriteSize;
      this.draw(graphics);
      sprites.push(canvas);
    }
    this.sprites = sprites;
  }
}

export const PLAYER = new Player(GRAPHICS.player);
