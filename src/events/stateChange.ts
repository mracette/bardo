import { TAU } from '../crco';
import { lotteryArrowRotationOptions } from '../drawing/drawLottery';
import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { canvasElements } from '../globals/dom';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { playSound, Sounds } from '../globals/sounds';
import { registerEvent, Trigger, unregisterEvent } from '../util/eventRegister';

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
      canvasElements.map.style.border = '2px solid white';
      graphics.map.clear();
      graphics.ui.clear();
      graphics.upgrade.clear();
      drawTiles();
      drawUi();
      break;
    }
    case GameState.Lottery: {
      // @ts-ignore
      lotteryArrowRotationOptions.styles.rotation.rotation = Math.random() * TAU;
      state.timestamp.lotteryStart = state.time.clockTime;
      break;
    }
    case GameState.Reincarnation: {
      graphics.ui.clear();
      break;
    }
    case GameState.Gameover: {
      playSound(Sounds.GameOver);
    }
  }
  if (next !== GameState.Upgrade) {
    unregisterEvent(uiResizeEvent);
  }
  state.gameState = next;
};
