import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { canvasElements } from '../globals/dom';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { registerEvent, Trigger, unregisterEvent } from '../util/eventRegister';
import { zzfxX } from '../zzfx';

let uiResizeEvent: number;

export const handleStateChange = (next: GameState) => {
  switch (next) {
    case GameState.Upgrade: {
      state.upgradeSelected = 0;
      drawUpgradeUi();
      uiResizeEvent = registerEvent(Trigger.CanvasResize, drawUpgradeUi);
      break;
    }
    case GameState.Gameplay: {
      zzfxX.resume();
      canvasElements.map.style.border = '2px solid white';
      graphics.map.clear();
      graphics.ui.clear();
      graphics.upgrade.clear();
      drawTiles();
      drawUi();
      break;
    }
    case GameState.Lottery: {
      state.timestamp.lotteryStart = state.time.elapsed;
      break;
    }
    case GameState.Reincarnation: {
      graphics.ui.clear();
      break;
    }
  }
  if (next !== GameState.Upgrade) {
    unregisterEvent(uiResizeEvent);
  }
  state.gameState = next;
};
