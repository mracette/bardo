import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { GameState, state } from '../globals/game';
import { registerEvent, Trigger, unregisterEvent } from '../util/eventRegister';

let uiResizeEvent: number;

export const handleStateChange = (next: GameState) => {
  switch (next) {
    case GameState.Upgrade: {
      state.upgradeSelected = 0;
      drawUpgradeUi();
      uiResizeEvent = registerEvent(Trigger.CanvasResize, drawUpgradeUi);
    }
  }
  if (next !== GameState.Upgrade) {
    unregisterEvent(uiResizeEvent);
  }
  state.gameState = next;
};
