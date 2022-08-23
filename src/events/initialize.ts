import { Arrow } from '../entities/weapons/arrow';
import { Orb, OrbInstance } from '../entities/weapons/orb';
import { canvasElements } from '../globals/dom';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { palette } from '../globals/palette';

export const initialize = () => {
  document.body.style.backgroundColor = palette.background;
  canvasElements.map.style.zIndex = '-1';
  new Orb();
  // new Arrow();
};
