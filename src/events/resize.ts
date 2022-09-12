import { mushroom } from '../../svg/mushroom';
import { Canvas2DGraphics, DPR, mulberry32 } from '../crco';
import { cacheLotteryGraphics } from '../drawing/drawLottery';
import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { cache, spriteCoordinateSystem } from '../entities/sprites';
import { canvasElements } from '../globals/dom';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { makeSprites } from '../util/makeSprites';

export const handleResize = () => {
  // setting length = 0 will trigger garbage collection
  for (const key in cache.sprites) {
    cache.sprites[key].length = 0;
  }

  // style the ui canvas
  const rect = canvasElements.map.getBoundingClientRect();
  canvasElements.ui.style.height = String(rect.height * 0.1);
  canvasElements.ui.style.left = String(rect.left);
  canvasElements.ui.style.top = String(rect.top - canvasElements.ui.clientHeight * 0.99);
  canvasElements.ui.style.width = String(rect.width);
  canvasElements.ui.width = canvasElements.ui.clientWidth * DPR;
  canvasElements.ui.height = canvasElements.ui.clientHeight * DPR;

  // style the lottery canvas
  canvasElements.lottery.width = canvasElements.gameplay.height;
  canvasElements.lottery.height = canvasElements.gameplay.height;
  canvasElements.lottery.style.width = canvasElements.gameplay.clientHeight + 'px';
  canvasElements.lottery.style.height = canvasElements.gameplay.clientHeight + 'px';

  if (
    state.gameState !== GameState.Intro &&
    state.gameState !== GameState.Reincarnation
  ) {
    drawTiles();
    drawUi();
  }
  if (state.gameState === GameState.Upgrade) {
    drawUpgradeUi();
  }
};
