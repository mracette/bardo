import { aspectRatioResize } from 'crco-utils';
import Stats from 'stats.js';
import './dom/styles.css';
import { anger } from '../svg/anger';
import { goat } from '../svg/goat';
import { heart } from '../svg/heart';
import { mask } from '../svg/mask';
import { meditator } from '../svg/meditator';
import { mind } from '../svg/mind';
import { mushroom } from '../svg/mushroom';
import { pinhead } from '../svg/pinhead';
import { reaper } from '../svg/reaper';
import { thirdEye } from '../svg/thirdEye';
import { thirdEyeDark } from '../svg/thirdEyeDark';
import { thirdEyeLight } from '../svg/thirdEyeLight';
import { treasure } from '../svg/treasure';
import { initialize } from './events/initialize';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { handleResize } from './events/resize';
import { spawnEnemy } from './events/spawn';
import { handleStateChange } from './events/stateChange';
import { canvasElements } from './globals/dom';
import { GameState, mapDimensions, state } from './globals/game';
import { graphics } from './globals/graphics';
import { player } from './globals/player';
import { registerEvent, Trigger, triggerEvent } from './util/eventRegister';

const stats = new Stats();
const updateStats = stats.addPanel(new Stats.Panel('phys', '#0ff', '#002'));
stats.dom.id = 'stats';
document.body.appendChild(stats.dom);

const fps = 60;
const deltaTimeFixed = 1000 / fps;

let elapsedTime = 0;
let clockTimePrevious = 0;
let accumulator = 0;

const main = (clockTime = 0) => {
  stats.begin();
  const isPaused = state.gameState !== GameState.Gameplay;
  const deltaTimeClock = isPaused ? 0 : clockTime - clockTimePrevious;
  clockTimePrevious = clockTime;

  [
    anger,
    goat,
    heart,
    mask,
    meditator,
    mind,
    mushroom,
    pinhead,
    reaper,
    thirdEye,
    thirdEyeDark,
    thirdEyeLight,
    treasure
  ].forEach(() => null);

  // clamp for extra long frames
  accumulator += Math.min(deltaTimeClock, 50);

  while (accumulator >= deltaTimeFixed) {
    update();
    accumulator -= deltaTimeFixed;
    elapsedTime += deltaTimeFixed;
  }

  render(accumulator / deltaTimeFixed);
  stats.end();
  window.requestAnimationFrame(main);
};

const update = () => {
  updateStats.update(deltaTimeFixed ? 1000 / deltaTimeFixed : 0, 200);
  player.update(elapsedTime, deltaTimeFixed);
  for (let i = 0; i < state.weapons.length; i++) {
    state.weapons[i].update(elapsedTime, deltaTimeFixed);
  }
  for (let i = 0; i < state.enemies.length; i++) {
    state.enemies[i].update(elapsedTime, deltaTimeFixed);
  }
  for (let i = 0; i < state.items.length; i++) {
    state.items[i].update(elapsedTime, deltaTimeFixed);
  }
  spawnEnemy(elapsedTime);
};

const render = (alpha: number) => {
  graphics.gameplay.clear();
  player.draw(alpha);
  for (let i = 0; i < state.weapons.length; i++) {
    state.weapons[i].draw(alpha);
  }
  for (let i = 0; i < state.enemies.length; i++) {
    state.enemies[i].draw(alpha);
  }
  for (let i = 0; i < state.items.length; i++) {
    state.items[i].draw(alpha);
  }
};

aspectRatioResize(canvasElements.map, mapDimensions);
aspectRatioResize(canvasElements.gameplay, mapDimensions);
aspectRatioResize(canvasElements.ui, mapDimensions);

registerEvent(Trigger.KeyDown, handleKeyDown);
registerEvent(Trigger.KeyUp, handleKeyUp);
registerEvent(Trigger.CanvasResize, handleResize);
registerEvent(Trigger.StateChange, handleStateChange);
registerEvent(Trigger.Initialize, initialize);

triggerEvent(Trigger.Initialize);
triggerEvent(Trigger.StateChange, GameState.Gameplay);

window.requestAnimationFrame(main);
