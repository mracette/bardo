import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { cachedSprites } from '../entities/sprites';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { player } from '../globals/player';

export const handleResize = () => {
  drawTiles(graphics.map);
  for (const key in cachedSprites) {
    delete cachedSprites[key];
  }
  if (state.gameState === GameState.Upgrade) {
    drawUi();
  }
};
