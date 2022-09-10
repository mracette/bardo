import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { registerEvent, Trigger, unregisterEvent } from '../util/eventRegister';

let uiResizeEvent: number;

export const handleStateChange = (next: GameState) => {
  switch (next) {
    case GameState.Upgrade: {
      state.upgradeSelected = 0;
      drawUpgradeUi();
      uiResizeEvent = registerEvent(Trigger.CanvasResize, drawUpgradeUi);
    }
    case GameState.Gameplay: {
      graphics.map.clear();
      graphics.ui.clear();
      drawTiles();
      drawUi();
    }
    case GameState.Lottery: {
      state.timestamp.lotteryStart = state.time.elapsed;
    }
  }
  if (next !== GameState.Upgrade) {
    unregisterEvent(uiResizeEvent);
  }
  state.gameState = next;
};
