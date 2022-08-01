import {
  Canvas2DGraphics,
  Canvas2DGraphicsRough,
  CanvasCoordinates,
  TAU,
  Vector2
} from 'crco-utils';
import { GRAPHICS } from '../globals/dom';
import { MAP_DIMENSIONS, STATE, TILE_WIDTH } from '../globals/game';
import { SQRT_2_2 } from '../globals/math';
import { makeSprites } from '../util/makeSprites';
import { PLAYER } from './player';

export class Weapon {
  graphics: Canvas2DGraphicsRough;
  size: number;
  speed: number;
  radius: number;
  sprites: HTMLCanvasElement[];
  spriteCycleTime: number;

  constructor(graphics) {
    this.graphics = graphics;
    this.size = TILE_WIDTH / 2;
    this.spriteCycleTime = 1550;
    this.radius = 1.5;
    this.speed = 0.0009;
  }

  draw(graphics: Canvas2DGraphics | Canvas2DGraphicsRough) {
    // graphics.lineSegments([
    //   [0.25, 0],
    //   [0.75, 0]
    // ]);
    graphics.circle(0, 0, 0.125);
  }

  drawSprite(time: number) {
    const spriteIndex = Math.floor(
      ((time / this.spriteCycleTime) % 1) * this.sprites.length
    );
    const angle = TAU * time * this.speed;
    for (let i = 0; i < this.sprites.length; i++) {
      this.graphics.drawImage(
        this.sprites[spriteIndex],
        PLAYER.position.x + Math.cos(angle) * this.radius,
        PLAYER.position.y + Math.sin(angle) * this.radius
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

export const WEAPON = new Weapon(GRAPHICS.player);
