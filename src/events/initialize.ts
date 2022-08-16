import { Orb } from '../entities/weapons/orb';
import { graphics } from '../globals/graphics';
import { palette } from '../globals/palette';

export const initialize = () => {
  document.body.style.backgroundColor = palette.background;
  new Orb(graphics.gameplay);
};
