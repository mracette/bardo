import { drawTiles } from '../drawing/drawTiles';
import { drawUi } from '../drawing/drawUi';
import { cache } from '../entities/sprites';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { player } from '../globals/player';

export const handleResize = () => {
  drawTiles(graphics.map);
  for (const key in cache.sprites) {
    // setting length = 0 will trigger garbage collection
    cache.sprites[key].length = 0;
  }
  if (state.gameState === GameState.Upgrade) {
    drawUi();
  }
};
