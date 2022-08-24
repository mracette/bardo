import { Arrow } from '../entities/weapons/arrow';
import { Axe } from '../entities/weapons/axe';
import { MagicCircle } from '../entities/weapons/circle';
import { Orb, OrbInstance } from '../entities/weapons/orb';
import { canvasElements } from '../globals/dom';
import { palette } from '../globals/palette';

export const initialize = () => {
  document.body.style.backgroundColor = palette.background;
  canvasElements.map.style.zIndex = '-1';
  // new Orb();
  // new Arrow();
  // new MagicCircle();
  new Axe();
};
