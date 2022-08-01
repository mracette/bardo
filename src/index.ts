import { aspectRatioResize } from 'crco-utils';
import { drawTiles } from './drawing/drawTiles';
import { PLAYER } from './entities/player';
import { CANVAS_ELEMENTS, GRAPHICS } from './globals/dom';
import { MAP_DIMENSIONS, STATE } from './globals/game';
import { registerEvent, Trigger, triggerEvents } from './registerEvent';
import { setAllCanvasDimensions } from './util/setCanvasDimensions';
import './styles.css';
import { WEAPON } from './entities/weapon';

let previousTime = 0;

const render = (time: number) => {
  triggerEvents(Trigger.Tick, time, time - previousTime);
  previousTime = time;
  window.requestAnimationFrame(render);
};

const setup = () => {
  Object.values(CANVAS_ELEMENTS).forEach((element) =>
    aspectRatioResize(element, MAP_DIMENSIONS)
  );

  /**
   * draw the map when the canvas resizes
   */
  registerEvent(Trigger.CanvasResize, () => drawTiles(GRAPHICS.map), true);

  /**
   * generate player sprites when the canvas resizes
   */
  registerEvent(
    Trigger.CanvasResize,
    () => {
      WEAPON.makeSprites();
      PLAYER.makeSprites();
    },
    true
  );

  /**
   * draw the player on every tick
   */
  registerEvent(Trigger.Tick, (time: number, elapsed: number) => {
    PLAYER.updatePosition(elapsed);
    PLAYER.graphics.clear();
    PLAYER.drawSprite(time);
    WEAPON.drawSprite(time);
  });

  /**
   * update the players position on keydown
   */
  registerEvent(Trigger.KeyDown, (key: string) => {
    if (key === 'ArrowLeft' || key === 'a') {
      STATE.move.left = true;
    }
    if (key === 'ArrowRight' || key === 'd') {
      STATE.move.right = true;
    }
    if (key === 'ArrowUp' || key === 'w') {
      STATE.move.up = true;
    }
    if (key === 'ArrowDown' || key === 's') {
      STATE.move.down = true;
    }
  });

  /**
   * update the players position on keydown
   */
  registerEvent(Trigger.KeyUp, (key: string) => {
    if (key === 'ArrowLeft' || key === 'a') {
      STATE.move.left = false;
    }
    if (key === 'ArrowRight' || key === 'd') {
      STATE.move.right = false;
    }
    if (key === 'ArrowUp' || key === 'w') {
      STATE.move.up = false;
    }
    if (key === 'ArrowDown' || key === 's') {
      STATE.move.down = false;
    }
  });

  window.requestAnimationFrame(render);
};

setup();
