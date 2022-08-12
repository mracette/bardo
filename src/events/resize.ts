import { drawTiles } from '../drawing/drawTiles';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { player } from '../globals/player';

export const handleResize = () => {
  drawTiles(graphics.map);
  player.generateSprites();
  state.weapons.forEach((weapon) => weapon.generateSprites());
  state.enemies.forEach((enemy) => enemy.generateSprites());
  // weapon
};
