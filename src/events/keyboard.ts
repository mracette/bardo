import { mod } from '../crco';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { player } from '../globals/player';
import { playSound, Sounds } from '../globals/sounds';
import { Trigger, triggerEvent } from '../util/eventRegister';

const keys = {
  w: 87,
  a: 64,
  s: 83,
  d: 68,
  left: 37,
  down: 40,
  up: 38,
  right: 39,
  esc: 27,
  enter: 13
};

export const handleKeyDown = (key: number) => {
  if (key === keys.enter) {
    if (state.gameState === GameState.Intro) {
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
      playSound(Sounds.LevelUp);
      return;
    }
    if (state.gameState === GameState.Upgrade) {
      const selected = state.upgradeOptions[state.upgradeSelected];
      selected.onChooseUpgrade();
      state.upgradeSelected = 0;
      graphics.upgrade.clear();
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
    }
    if (state.gameState === GameState.Exposition) {
      graphics.map.clear();
      graphics.lottery.clear();
      graphics.ui.clear();
      graphics.upgrade.clear();
      triggerEvent(Trigger.StateChange, GameState.Intro);
    }
  }
  if (key === keys.esc) {
    if (state.gameState === GameState.Gameplay) {
      triggerEvent(Trigger.StateChange, GameState.Paused);
    }
  }
  if (key === keys.left || key === keys.a) {
    if (state.gameState === GameState.Gameplay) {
      state.move.left = true;
      player.forwardDirection = 'left';
    }
    if (state.gameState === GameState.Upgrade) {
      state.upgradeSelected = mod(state.upgradeSelected - 1, state.upgradeOptions.length);
      drawUpgradeUi();
    }
  }
  if (key === keys.right || key === keys.d) {
    if (state.gameState === GameState.Gameplay) {
      state.move.right = true;
      player.forwardDirection = 'right';
    }
    if (state.gameState === GameState.Upgrade) {
      state.upgradeSelected = mod(state.upgradeSelected + 1, state.upgradeOptions.length);
      drawUpgradeUi();
    }
  }
  if (key === keys.up || key === keys.w) {
    state.move.up = true;
  }
  if (key === keys.down || key === keys.s) {
    state.move.down = true;
  }
};

export const handleKeyUp = (key: number) => {
  if (key === keys.left || key === keys.a) {
    state.move.left = false;
  }
  if (key === keys.right || key === keys.d) {
    state.move.right = false;
  }
  if (key === keys.up || key === keys.w) {
    state.move.up = false;
  }
  if (key === keys.down || key === keys.s) {
    state.move.down = false;
  }
  if (key === keys.enter) {
    if (state.gameState === GameState.Paused) {
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
    }
  }
};
