import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { palette } from '../globals/palette';

export const drawExperience = () => {
  const progress =
    (state.experience.current - state.experience.last) /
    (state.experience.next - state.experience.last);
  graphics.ui.clear();
  graphics.ui.rect(-1, -1, 1, 1, { fill: false, roughness: 0, stroke: true });
  graphics.ui.rect(-1, -1, progress, 1, {
    fill: true,
    roughness: 0,
    styles: { fillStyle: palette.seafoam }
  });
};
