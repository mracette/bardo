import { DPR } from 'crco-utils';
import { drawExperience } from '../drawing/drawExperience';
import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { cache } from '../entities/sprites';
import { canvasElements } from '../globals/dom';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { player } from '../globals/player';

export const handleResize = () => {
  drawTiles();
  const rect = canvasElements.map.getBoundingClientRect();
  canvasElements.ui.style.height = String(rect.height * 0.05);
  canvasElements.ui.style.left = String(rect.left);
  canvasElements.ui.style.top = String(rect.top - canvasElements.ui.clientHeight);
  canvasElements.ui.style.width = String(rect.width);
  canvasElements.ui.width = canvasElements.ui.clientWidth * DPR;
  canvasElements.ui.height = canvasElements.ui.clientHeight * DPR;
  drawExperience();
  for (const key in cache.sprites) {
    // setting length = 0 will trigger garbage collection
    cache.sprites[key].length = 0;
  }
  if (state.gameState === GameState.Upgrade) {
    drawUi();
  }
};
