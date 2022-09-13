declare global {
  interface Window {
    zzfx: (...args: any[]) => void;
  }
}

import { aspectRatioResize } from './crco';
import './dom/styles.css';
import { drawExposition } from './drawing/drawExposition';
import { drawLottery, LOTTERY_DURATION } from './drawing/drawLottery';
import { drawStats } from './drawing/drawStats';
import { drawUi } from './drawing/drawUi';
import { Heart } from './entities/items/heart';
import { sineFunctions } from './entities/items/mushroom';
import { Star } from './entities/items/star';
import { Player } from './entities/player';
import { handleInitialize } from './events/initialize';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { handleLevelUp } from './events/levelUp';
import { handleResize } from './events/resize';
import { handleStateChange } from './events/stateChange';
import { handleWindowResize } from './events/windowResize';
import { canvasElements } from './globals/dom';
import { exposition } from './globals/exposition';
import { GameState, state } from './globals/game';
import { graphics } from './globals/graphics';
import { mapDimensions } from './globals/map';
import { player } from './globals/player';
import { thirdEye } from './globals/thirdEye';
import { registerEvent, Trigger, triggerEvent } from './util/eventRegister';

const fps = 60;
const deltaTimeFixed = 1000 / fps;

const main = (clockTime = 0) => {
  state.time.clockTime = clockTime;
  const isPaused = state.gameState === GameState.Paused;
  const deltaTimeClock = isPaused ? 0 : clockTime - state.time.clockTimePrevious;
  state.time.clockTimePrevious = clockTime;

  state.time.slowdown =
    player.lastDamaged === 0
      ? 1
      : Math.min(
          1,
          (state.time.elapsedInGame - player.lastDamaged) / Player.damageCooldown
        );

  // clamp for extra long frames
  state.time.accumulator += Math.min(deltaTimeClock, 50) * state.time.slowdown;

  while (state.time.accumulator >= deltaTimeFixed) {
    update();
    state.time.accumulator -= deltaTimeFixed;
    state.time.elapsed += deltaTimeFixed;
    if (state.gameState === GameState.Gameplay) {
      state.time.elapsedInGame += deltaTimeFixed;
    }
  }

  render(state.time.accumulator / deltaTimeFixed);
  window.requestAnimationFrame(main);
};

const update = () => {
  if (state.time.elapsedInGame > state.time.runTime) {
    triggerEvent(Trigger.StateChange, GameState.Reincarnation);
  }

  if (state.gameState === GameState.Intro) {
    thirdEye.update();
  }

  if (state.gameState === GameState.Exposition) {
    exposition.update();
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
    if (state.time.clockTime - state.timestamp.lotteryStart > LOTTERY_DURATION) {
      graphics.lottery.clear();
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
      state.lottery.collect();
    }
  }
};

const render = (alpha: number) => {
  graphics.gameplay.clear();

  if (state.gameState === GameState.Intro) {
    thirdEye.draw(alpha);
  }

  if (state.gameState === GameState.Exposition) {
    exposition.draw(alpha);
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

    if (
      state.lottery.starsToCollect > 0 &&
      state.time.elapsedInGame - state.lottery.lastCollected > state.lottery.interval
    ) {
      state.items.push(
        new Star(player.center.clone().add(-0.75, -2), state.experience.level)
      );
      state.lottery.starsToCollect--;
      state.lottery.lastCollected = state.time.elapsedInGame;
    }

    if (
      state.lottery.heartsToCollect > 0 &&
      state.time.elapsedInGame - state.lottery.lastCollected > state.lottery.interval
    ) {
      state.items.push(new Heart(player.center.clone().add(-0.75, -1)));
      state.lottery.heartsToCollect--;
      state.lottery.lastCollected = state.time.elapsedInGame;
    }

    if (state.shroomed.active) {
      graphics.gameplay.rect(0, 0, mapDimensions.x, mapDimensions.y, {
        roughness: 0,
        fill: true,
        styles: {
          fillStyle: `rgba(${sineFunctions.r(state.time.elapsedInGame)},${sineFunctions.g(
            state.time.elapsedInGame
          )},${sineFunctions.b(state.time.elapsedInGame)})`,
          alpha: 0.25
        }
      });
      const elapsed = state.time.elapsedInGame - state.shroomed.start;
      if (elapsed > state.shroomed.duration) {
        state.shroomed.active = false;
      }
    }

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

  if (
    state.gameState === GameState.Paused ||
    state.gameState === GameState.Gameover ||
    state.gameState === GameState.Reincarnation
  ) {
    drawStats();
  }

  if (state.gameState === GameState.Lottery) {
    drawLottery(alpha);
  }
};

aspectRatioResize(canvasElements.map, mapDimensions);
aspectRatioResize(canvasElements.gameplay, mapDimensions);
aspectRatioResize(canvasElements.upgrades, mapDimensions);

registerEvent(Trigger.KeyDown, handleKeyDown);
registerEvent(Trigger.KeyUp, handleKeyUp);
registerEvent(Trigger.CanvasResize, handleResize);
registerEvent(Trigger.WindowResize, handleWindowResize);
registerEvent(Trigger.StateChange, handleStateChange);
registerEvent(Trigger.LevelUp, handleLevelUp);

registerEvent(Trigger.Initialize, handleInitialize);
triggerEvent(Trigger.Initialize);

// triggerEvent(Trigger.StateChange, GameState.Gameplay);
// triggerEvent(Trigger.StateChange, GameState.Intro);
// triggerEvent(Trigger.StateChange, GameState.Lottery);
// triggerEvent(Trigger.StateChange, GameState.Paused);

window.requestAnimationFrame(main);
