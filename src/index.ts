import { aspectRatioResize, Vector2 } from 'crco-utils';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { drawTiles } from './drawing/drawTiles';
import { PLAYER } from './entities/player';
import { WEAPON } from './entities/weapon';
import { CANVAS_ELEMENTS, GRAPHICS } from './globals/dom';
import { MAP_DIMENSIONS, STATE } from './globals/game';
import { registerEvent, Trigger, triggerEvents } from './registerEvent';
import { setAllCanvasDimensions } from './util/setCanvasDimensions';
import './styles.css';
import { Enemy } from './entities/enemy';
import { spawnEnemy } from './events/spawn';

let previousTime = 0;

const render = (elapsed: number) => {
  console.log({ elapsed, delta: elapsed - previousTime });
  triggerEvents(Trigger.Tick, elapsed, elapsed - previousTime);
  previousTime = elapsed;
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
   * generate sprites when the canvas resizes
   */
  registerEvent(
    Trigger.CanvasResize,
    () => {
      STATE.enemies.forEach((enemy) => enemy.makeSprites()); // TODO: make these shared sprites
      WEAPON.makeSprites();
      PLAYER.makeSprites();
    },
    true
  );

  /**
   * spawn new enemies
   */
  registerEvent(Trigger.Tick, (elapsed: number, delta: number) => spawnEnemy(elapsed));

  /**
   * calculate new positions
   */
  registerEvent(Trigger.Tick, (elapsed: number, delta: number) => {
    PLAYER.updatePosition(delta);
    STATE.enemies.forEach((enemy) => enemy.updatePosition(delta));
  });

  /**
   * redraw the canvas
   */
  registerEvent(Trigger.Tick, (elapsed: number, delta: number) => {
    PLAYER.graphics.clear();
    STATE.enemies.forEach((enemy) => enemy.drawSprite(elapsed));
    PLAYER.drawSprite(elapsed);
    WEAPON.drawSprite(elapsed);
  });

  registerEvent(Trigger.KeyDown, handleKeyDown);
  registerEvent(Trigger.KeyUp, handleKeyUp);

  window.requestAnimationFrame(render);
};

setup();
