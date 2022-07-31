import { Canvas2DGraphics, Canvas2DGraphicsRough, Vector2 } from 'crco-utils';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, TILE_WIDTH } from '../globals/game';

export class Player {
  position: Vector2;
  size: number;
  spriteCount: number;
  sprites: HTMLCanvasElement[];

  constructor() {
    this.position = new Vector2(MAP_DIMENSIONS.x / 2, MAP_DIMENSIONS.y / 2);
    this.size = TILE_WIDTH / 2;
    this.spriteCount = 4;
  }

  draw(graphics: Canvas2DGraphics | Canvas2DGraphicsRough) {
    const { x, y } = this.position;
    graphics.star(x, y, this.size, 3);
  }

  makeSprites() {
    for (let i = 0; i < this.spriteCount; i++) {}
  }
}

export const PLAYER = new Player();
