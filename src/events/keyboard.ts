import { mod } from 'crco-utils';
import { drawUi } from '../drawing/drawUi';
import { GameState, state } from '../globals/game';
import { Trigger, triggerEvent } from '../util/eventRegister';

export const handleKeyDown = (key: string) => {
  if (key === 'ArrowLeft' || key === 'a') {
    if (state.gameState === GameState.Gameplay) {
      state.move.left = true;
    }
    if (state.gameState === GameState.Upgrade) {
      state.upgradeSelected = mod(state.upgradeSelected - 1, state.upgradeOptionCount);
      drawUi();
    }
  }
  if (key === 'ArrowRight' || key === 'd') {
    if (state.gameState === GameState.Gameplay) {
      state.move.right = true;
    }
    if (state.gameState === GameState.Upgrade) {
      state.upgradeSelected = mod(state.upgradeSelected + 1, state.upgradeOptionCount);
      drawUi();
    }
  }
  if (key === 'ArrowUp' || key === 'w') {
    state.move.up = true;
  }
  if (key === 'ArrowDown' || key === 's') {
    state.move.down = true;
  }
  if (key === 'Escape') {
    if (state.gameState === GameState.Gameplay) {
      triggerEvent(Trigger.StateChange, GameState.Paused);
    }
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
