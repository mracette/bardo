import { mod } from '../crco';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { player } from '../globals/player';
import { Trigger, triggerEvent } from '../util/eventRegister';

export const handleKeyDown = (key: string) => {
  if (key === 'Enter') {
    if (state.gameState === GameState.Intro) {
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
      return;
    }
    if (state.gameState === GameState.Upgrade) {
      const selected = state.upgradeOptions[state.upgradeSelected];
      selected.onChooseUpgrade();
      state.upgradeSelected = 0;
      graphics.upgrade.clear();
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
    }
  }
  if (key === 'i') {
    state.experience.current = state.experience.next;
    triggerEvent(Trigger.LevelUp);
  }
  if (key === 'Escape') {
    if (state.gameState === GameState.Gameplay) {
      triggerEvent(Trigger.StateChange, GameState.Paused);
    }
  }
  if (key === 'ArrowLeft' || key === 'a') {
    if (state.gameState === GameState.Gameplay) {
      state.move.left = true;
      player.forwardDirection = 'left';
    }
    if (state.gameState === GameState.Upgrade) {
      state.upgradeSelected = mod(state.upgradeSelected - 1, state.upgradeOptionCount);
      drawUpgradeUi();
    }
  }
  if (key === 'ArrowRight' || key === 'd') {
    if (state.gameState === GameState.Gameplay) {
      state.move.right = true;
      player.forwardDirection = 'right';
    }
    if (state.gameState === GameState.Upgrade) {
      state.upgradeSelected = mod(state.upgradeSelected + 1, state.upgradeOptionCount);
      drawUpgradeUi();
    }
  }
  if (key === 'ArrowUp' || key === 'w') {
    state.move.up = true;
  }
  if (key === 'ArrowDown' || key === 's') {
    state.move.down = true;
  }
};

export const handleKeyUp = (key: string) => {
  if (key === 'ArrowLeft' || key === 'a') {
    state.move.left = false;
  }
  if (key === 'ArrowRight' || key === 'd') {
    state.move.right = false;
  }
  if (key === 'ArrowUp' || key === 'w') {
    state.move.up = false;
  }
  if (key === 'ArrowDown' || key === 's') {
    state.move.down = false;
  }
  if (key === 'Enter') {
    if (state.gameState === GameState.Paused) {
      triggerEvent(Trigger.StateChange, GameState.Gameplay);
    }
  }
};
