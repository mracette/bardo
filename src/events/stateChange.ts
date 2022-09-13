import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { canvasElements } from '../globals/dom';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { registerEvent, Trigger, unregisterEvent } from '../util/eventRegister';
import { zzfx, zzfxX } from '../zzfx';

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
      state.timestamp.lotteryStart = state.time.elapsedInGame;
      break;
    }
    case GameState.Reincarnation: {
      graphics.ui.clear();
      zzfx(
        ...[0.2, 0, 80, 0.3, 0.5, 1.25, 2, 0.1, -0.73, 3.42, -430, 0.09, 0.17, , , , 0.19]
      );
      break;
    }
    case GameState.Gameover: {
      zzfx(...[, , 333, 0.01, 0, 0.9, 4, 1.9, , , , , , 0.5, , 0.6]);
    }
  }
  if (next !== GameState.Upgrade) {
    unregisterEvent(uiResizeEvent);
  }
  state.gameState = next;
};
