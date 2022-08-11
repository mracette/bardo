import { aspectRatioResize, Vector2 } from 'crco-utils';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { drawTiles } from './drawing/drawTiles';
import { CANVAS_ELEMENTS, GRAPHICS } from './globals/dom';
import { MAP_DIMENSIONS, STATE } from './globals/game';
import { registerEvent, Trigger, triggerEvent } from './registerEvent';
import './styles.css';
import { spawnEnemy } from './events/spawn';
import { Player } from './entities/player';
import { Weapon } from './entities/weapon';

const INITIAL_POSITION = new Vector2(0, 0);

export const PLAYER = new Player(GRAPHICS.player, INITIAL_POSITION);
export const WEAPON = new Weapon(GRAPHICS.player, INITIAL_POSITION);

let PREVIOUS_TIME = 0;

const render = (elapsed: number) => {
  triggerEvent(Trigger.Tick, elapsed, elapsed - PREVIOUS_TIME);
  PREVIOUS_TIME = elapsed;
  window.requestAnimationFrame(render);
};

const setup = () => {
  Object.values(CANVAS_ELEMENTS).forEach((element) =>
    aspectRatioResize(element, MAP_DIMENSIONS)
  );
  /**
   * draw the map when the canvas resizes
   */
  registerEvent(Trigger.CanvasResize, () => drawTiles(GRAPHICS.map));

  /**
   * generate sprites when the canvas resizes
   */
  registerEvent(Trigger.CanvasResize, () => {
    PLAYER.generateSprites();
    WEAPON.generateSprites();
    STATE.enemies.forEach((enemy) => enemy.generateSprites()); // TODO: make these shared sprites
  });

  /**
   * spawn new enemies
   */
  registerEvent(Trigger.Tick, (elapsed: number, delta: number) => spawnEnemy(elapsed));

  /**
   * calculate new positions
   */
  registerEvent(Trigger.Tick, (elapsed: number, delta: number) => {
    PLAYER.updatePosition(delta);
    WEAPON.updatePosition(elapsed);
    STATE.enemies.forEach((enemy) => enemy.updatePosition(delta));
  });

  /**
   * redraw the canvas
   */
  registerEvent(Trigger.Tick, (elapsed: number, delta: number) => {
    PLAYER.graphics.clear();
    PLAYER.drawSprite(elapsed);
    WEAPON.drawSprite(elapsed);
    STATE.enemies.forEach((enemy) => enemy.drawSprite(elapsed));
  });

  registerEvent(Trigger.KeyDown, handleKeyDown);
  registerEvent(Trigger.KeyUp, handleKeyUp);

  triggerEvent(Trigger.Init);
  window.requestAnimationFrame(render);
};

setup();
