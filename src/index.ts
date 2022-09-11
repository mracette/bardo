// import Stats from 'stats.js';
import { aspectRatioResize, Vector2 } from './crco';
import './dom/styles.css';
import { drawLottery, LOTTERY_DURATION } from './drawing/drawLottery';
import { drawThirdEye } from './drawing/drawThirdEye';
import { drawUi } from './drawing/drawUi';
import { Player } from './entities/player';
import { handleInitialize } from './events/initialize';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { handleLevelUp } from './events/levelUp';
import { handleResize } from './events/resize';
import { handleStateChange } from './events/stateChange';
import { handleWindowResize } from './events/windowResize';
import { canvasElements } from './globals/dom';
import { GameState, state } from './globals/game';
import { graphics } from './globals/graphics';
import { mapDimensions } from './globals/map';
import { player } from './globals/player';
import { thirdEye } from './globals/thirdEye';
import { registerEvent, Trigger, triggerEvent } from './util/eventRegister';

// const stats = new Stats();
// const updateStats = stats.addPanel(new Stats.Panel('phys', '#0ff', '#002'));
// stats.dom.id = 'stats';
// document.body.appendChild(stats.dom);

const fps = 60;
const deltaTimeFixed = 1000 / fps;

const main = (clockTime = 0) => {
  // stats.begin();
  const isPaused = state.gameState === GameState.Paused;
  const deltaTimeClock = isPaused ? 0 : clockTime - state.time.clockTimePrevious;
  state.time.clockTimePrevious = clockTime;

  state.time.slowdown =
    player.lastDamaged === 0
      ? 1
      : Math.min(1, (state.time.elapsed - player.lastDamaged) / Player.damageCooldown);

  // clamp for extra long frames
  state.time.accumulator += Math.min(deltaTimeClock, 50) * state.time.slowdown;

  while (state.time.accumulator >= deltaTimeFixed) {
    update();
    state.time.accumulator -= deltaTimeFixed;
    state.time.elapsed += deltaTimeFixed;
  }

  render(state.time.accumulator / deltaTimeFixed);
  // stats.end();
  window.requestAnimationFrame(main);
};

const update = () => {
  // updateStats.update(deltaTimeFixed ? 1000 / deltaTimeFixed : 0, 200);

  if (state.gameState === GameState.Intro) {
    thirdEye.update();
  }

  if (state.gameState === GameState.Gameplay) {
    player.update();
    for (let i = state.weapons.length - 1; i >= 0; i--) {
      state.weapons[i].update();
    }
    for (let i = state.enemies.length - 1; i >= 0; i--) {
      if (state.enemies[i].shouldDestroy) {
        state.enemies.splice(i, 1);
      } else {
        state.enemies[i].update();
      }
    }
    for (let i = state.items.length - 1; i >= 0; i--) {
      if (state.items[i].shouldDestroy) {
        state.items.splice(i, 1);
      } else {
        state.items[i].update();
      }
    }
    for (let i = state.overlays.length - 1; i >= 0; i--) {
      if (state.overlays[i].shouldDestroy) {
        state.overlays.splice(i, 1);
      } else {
        state.overlays[i].update();
      }
    }
    for (let i = state.hints.length - 1; i >= 0; i--) {
      if (state.hints[i].shouldDestroy) {
        triggerEvent(Trigger.Spawn, state.hints[i]);
        state.hints.splice(i, 1);
      } else {
        state.hints[i].update();
      }
    }
    triggerEvent(Trigger.Tick);
  }

  if (state.gameState === GameState.Lottery) {
    if (state.time.elapsed - state.timestamp.lotteryStart > LOTTERY_DURATION) {
      graphics.lottery.clear();
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
    }
  }
};

const render = (alpha: number) => {
  graphics.gameplay.clear();

  if (state.gameState === GameState.Intro) {
    thirdEye.draw(alpha);
  }

  if (state.gameState === GameState.Gameplay || state.gameState === GameState.Paused) {
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
    for (let i = 0; i < state.hints.length; i++) {
      state.hints[i].draw(alpha);
    }

    player.draw(alpha);

    if (state.time.slowdown < 1) {
      graphics.gameplay.rect(0, 0, mapDimensions.x, mapDimensions.y, {
        roughness: 0,
        fill: true,
        styles: {
          fillStyle: 'red',
          alpha: (1 - state.time.slowdown) * 0.33
        }
      });
    }

    // this could be drawn a fraction of the time
    drawUi();
  }

  if (state.gameState === GameState.Lottery) {
    drawLottery(alpha);
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
// triggerEvent(Trigger.StateChange, GameState.Intro);
// triggerEvent(Trigger.StateChange, GameState.Lottery);

window.requestAnimationFrame(main);
