import { graphics } from '../globals/graphics';

export const drawExperience = () => {
  graphics.ui.rect(-1, -1, 1, 1, { fill: false, roughness: 0 });
  graphics.ui.rect(-1, -1, 0.9, 1, { fill: true, roughness: 0 });
};
