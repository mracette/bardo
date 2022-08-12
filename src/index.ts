import { aspectRatioResize, Vector2 } from 'crco-utils';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { drawTiles } from './drawing/drawTiles';
import { CANVAS_ELEMENTS, GRAPHICS } from './globals/dom';
import { MAP_CENTER, MAP_DIMENSIONS, STATE } from './globals/game';
import { registerEvent, Trigger, triggerEvent } from './registerEvent';
import './styles.css';
import { spawnEnemy } from './events/spawn';
import { Player } from './entities/player';
// import { Weapon } from './entities/weapon';

export const PLAYER = new Player(GRAPHICS.player, MAP_CENTER);
// export const WEAPON = new Weapon(GRAPHICS.player, INITIAL_POSITION);

let PREVIOUS_TIME = 0;

const main = (elapsed: number) => {
  const delta = elapsed - PREVIOUS_TIME;
  PREVIOUS_TIME = elapsed;
  update(elapsed, delta);
  render();
  window.requestAnimationFrame(main);
};

const update = (elapsed: number, delta: number) => {
  PLAYER.update(elapsed, delta);
};

const render = () => {
  GRAPHICS.player.clear();
  PLAYER.draw();
};

aspectRatioResize(CANVAS_ELEMENTS.map, MAP_DIMENSIONS);
aspectRatioResize(CANVAS_ELEMENTS.player, MAP_DIMENSIONS);
registerEvent(Trigger.CanvasResize, () => drawTiles(GRAPHICS.map));
registerEvent(Trigger.CanvasResize, () => {
  PLAYER.generateSprites();
});

window.requestAnimationFrame(main);
