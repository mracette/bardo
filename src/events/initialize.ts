import { Orb } from '../entities/weapons/orb';
import { canvasElements } from '../globals/dom';
import { graphics } from '../globals/graphics';
import { palette } from '../globals/palette';

export const initialize = () => {
  document.body.style.backgroundColor = palette.background;
  canvasElements.map.style.zIndex = '-1';
  new Orb(graphics.gameplay);
};
