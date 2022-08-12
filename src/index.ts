import Stats from 'stats.js';
import { aspectRatioResize, DPR, Vector2 } from 'crco-utils';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { drawTiles } from './drawing/drawTiles';
import { CANVAS_ELEMENTS, GRAPHICS } from './globals/dom';
import { DEBUG, MAP_CENTER, MAP_DIMENSIONS, STATE } from './globals/game';
import { registerEvent, Trigger, triggerEvent } from './registerEvent';
import './styles.css';
import { Player } from './entities/player';

function wait(ms: number) {
  const start = new Date();
  //empty while loop until the required amount of time has passed
  // @ts-ignore
  while (new Date() - start < ms);
}

const stats = new Stats();
const physics = stats.addPanel(new Stats.Panel('phys', '#0ff', '#002'));
stats.dom.id = 'stats';
document.body.appendChild(stats.dom);

export const PLAYER = new Player(
  GRAPHICS.player,
  new Vector2(MAP_CENTER.x, MAP_CENTER.y)
);

// scenario 1: requestAnimationFrame render + update (120fps) - 93.6%,94.1% idle
// - smooth
// - fps always locked (performance degrades together)

// scenario 2: requestAnimationFrame render (120fps) + setTimeout update (60fps) - 92.5%, 93.5% idle
// - choppy but constant fps physics updates
// - fps always locked proportionally as performance degrades
// - phys fps falls when render is blocked

/**
 * scenario 3: semi-fixed timestamp (max dt)
 * - similar to 1 if monitor refresh is the greater than semi-fixed fps max
 * - alternating regular and super-fast updates if they are the same - bad
 */

const scenario = 4;

const main = (elapsed = 0) => {
  stats.begin();
  switch (String(scenario)) {
    case '1':
      update1(elapsed);
      render1(elapsed);
      break;
    case '2':
      render2(elapsed);
      break;
    case '3':
      render3(elapsed);
      break;
    case '4':
      render4(elapsed);
      break;
  }
  stats.end();
  window.requestAnimationFrame(main);
};

let PREVIOUS_UPDATE = 0;
let PREVIOUS_RENDER = 0;
let ELAPSED = 0;
let ACCUMULATOR = 0;
const FPS = 60;
const DELTA_TIME_FIXED = 1000 / FPS;

const update1 = (elapsed: number) => {
  const delta = elapsed - PREVIOUS_UPDATE;
  PREVIOUS_UPDATE = elapsed;
  physics.update(delta ? 1000 / delta : 0, 200);
  PLAYER.update(elapsed, delta);
};

const render1 = (elapsed: number) => {
  const delta = elapsed - PREVIOUS_RENDER;
  PREVIOUS_RENDER = elapsed;
  GRAPHICS.player.clear();
  PLAYER.draw();
};

const update2 = (elapsed: number) => {
  const delta = elapsed - PREVIOUS_UPDATE;
  PREVIOUS_UPDATE = elapsed;
  physics.update(delta ? 1000 / delta : 0, 200);
  PLAYER.update(elapsed, delta);
  setTimeout(update2, 1000 / 60);
};

const render2 = (elapsed: number) => {
  const delta = elapsed - PREVIOUS_RENDER;
  PREVIOUS_RENDER = elapsed;
  GRAPHICS.player.clear();
  PLAYER.draw();
};

const update3 = (elapsed: number, delta: number) => {
  physics.update(delta ? 1000 / delta : 0, 200);
  PLAYER.update(elapsed, delta);
};

const render3 = (elapsed: number) => {
  let delta = elapsed - PREVIOUS_RENDER;
  PREVIOUS_RENDER = elapsed;

  while (delta > 0) {
    const deltaClamped = Math.min(delta, DELTA_TIME_FIXED);
    delta -= deltaClamped;
    ELAPSED += deltaClamped;
    update3(ELAPSED, deltaClamped);
  }

  GRAPHICS.player.clear();
  PLAYER.draw();
};

const update4 = (elapsed: number, delta: number) => {
  physics.update(delta ? 1000 / delta : 0, 200);
  PLAYER.update(elapsed, delta);
  // wait(17);
};

const render4 = (elapsed: number) => {
  const delta = elapsed - PREVIOUS_RENDER;
  PREVIOUS_RENDER = elapsed;

  ACCUMULATOR += delta;

  while (ACCUMULATOR >= DELTA_TIME_FIXED) {
    update4(ELAPSED, DELTA_TIME_FIXED);
    ACCUMULATOR -= DELTA_TIME_FIXED;
    ELAPSED += DELTA_TIME_FIXED;
    console.log(ACCUMULATOR);
  }

  GRAPHICS.player.clear();
  PLAYER.draw();
};

aspectRatioResize(CANVAS_ELEMENTS.map, MAP_DIMENSIONS);
aspectRatioResize(CANVAS_ELEMENTS.player, MAP_DIMENSIONS);
registerEvent(Trigger.CanvasResize, () => drawTiles(GRAPHICS.map));
registerEvent(Trigger.CanvasResize, () => {
  PLAYER.generateSprites();
});

switch (String(scenario)) {
  case '2':
    update2(0);
    break;
}

window.requestAnimationFrame(main);
