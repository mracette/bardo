import { DPR, mulberry32 } from '../crco';
import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { drawUpgradeUi } from '../drawing/drawUpgradeUi';
import { cache } from '../entities/sprites';
import { canvasElements } from '../globals/dom';
import { GameState, state } from '../globals/game';

export const handleResize = () => {
  // setting length = 0 will trigger garbage collection
  for (const key in cache.sprites) {
    cache.sprites[key].length = 0;
  }

  // style the ui canvas
  const rect = canvasElements.map.getBoundingClientRect();
  canvasElements.ui.style.height = String(rect.height * 0.1);
  canvasElements.ui.style.left = String(rect.left);
  canvasElements.ui.style.top = String(rect.top - canvasElements.ui.clientHeight);
  canvasElements.ui.style.width = String(rect.width);
  canvasElements.ui.width = canvasElements.ui.clientWidth * DPR;
  canvasElements.ui.height = canvasElements.ui.clientHeight * DPR;

  // if (state.gameState === GameState.Gameplay) {
  drawTiles();
  drawUi();
  // }
  if (state.gameState === GameState.Upgrade) {
    drawUpgradeUi();
  }
};
