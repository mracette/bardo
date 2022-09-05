import { aspectRatioResize } from 'crco-utils';
import Stats from 'stats.js';
import './dom/styles.css';
import { Player } from './entities/player';
import { handleInitialize } from './events/initialize';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { handleLevelUp } from './events/levelUp';
import { handleResize } from './events/resize';
import { spawn } from './events/spawn';
import { handleStateChange } from './events/stateChange';
import { handleWindowResize } from './events/windowResize';
import { canvasElements } from './globals/dom';
import { GameState, state } from './globals/game';
import { graphics } from './globals/graphics';
import { mapDimensions } from './globals/map';
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
let slowdown = 0;

const main = (clockTime = 0) => {
  stats.begin();
  const isPaused = state.gameState !== GameState.Gameplay;
  const deltaTimeClock = isPaused ? 0 : clockTime - clockTimePrevious;
  clockTimePrevious = clockTime;

  slowdown =
    player.lastDamaged === 0
      ? 1
      : Math.min(1, (elapsedTime - player.lastDamaged) / Player.damageCooldown);

  // clamp for extra long frames
  accumulator += Math.min(deltaTimeClock, 50) * slowdown;

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
  for (let i = state.weapons.length - 1; i >= 0; i--) {
    state.weapons[i].update(elapsedTime, deltaTimeFixed);
  }
  for (let i = state.enemies.length - 1; i >= 0; i--) {
    if (state.enemies[i].shouldDestroy) {
      state.enemies.splice(i, 1);
    } else {
      state.enemies[i].update(elapsedTime, deltaTimeFixed);
    }
  }
  for (let i = state.items.length - 1; i >= 0; i--) {
    if (state.items[i].shouldDestroy) {
      state.items.splice(i, 1);
    } else {
      state.items[i].update(elapsedTime, deltaTimeFixed, i);
    }
  }
  for (let i = state.overlays.length - 1; i >= 0; i--) {
    if (state.overlays[i].shouldDestroy) {
      state.overlays.splice(i, 1);
    } else {
      state.overlays[i].update(elapsedTime, i);
    }
  }
  spawn(elapsedTime);
};

const render = (alpha: number) => {
  graphics.gameplay.clear();
  for (let i = 0; i < state.weapons.length; i++) {
    state.weapons[i].draw(alpha);
  }
  for (let i = 0; i < state.enemies.length; i++) {
    state.enemies[i].draw(alpha);
  }
  for (let i = 0; i < state.items.length; i++) {
    state.items[i].draw(alpha);
  }
  for (let i = 0; i < state.overlays.length; i++) {
    state.overlays[i].draw(alpha);
  }

  player.draw(alpha);
  if (slowdown < 1) {
    graphics.gameplay.rect(0, 0, mapDimensions.x, mapDimensions.y, {
      roughness: 0,
      fill: true,
      styles: {
        fillStyle: 'red',
        alpha: (1 - slowdown) * 0.33
      }
    });
  }
};

aspectRatioResize(canvasElements.map, mapDimensions);
aspectRatioResize(canvasElements.gameplay, mapDimensions);
aspectRatioResize(canvasElements.upgrades, mapDimensions);

// handlers
registerEvent(Trigger.KeyDown, handleKeyDown);
registerEvent(Trigger.KeyUp, handleKeyUp);
registerEvent(Trigger.CanvasResize, handleResize);
registerEvent(Trigger.WindowResize, handleWindowResize);
registerEvent(Trigger.StateChange, handleStateChange);
registerEvent(Trigger.LevelUp, handleLevelUp);

// initialize
registerEvent(Trigger.Initialize, handleInitialize);

triggerEvent(Trigger.Initialize);
triggerEvent(Trigger.StateChange, GameState.Gameplay);

window.requestAnimationFrame(main);
