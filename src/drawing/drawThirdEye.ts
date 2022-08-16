import { Canvas2DGraphicsRough } from 'crco-utils';
import { thirdEye } from '../../svg/thirdEye';
import { thirdEyeDark } from '../../svg/thirdEyeDark';
import { thirdEyeLight } from '../../svg/thirdEyeLight';
import { palette } from '../globals/palette';

export const drawThirdEye = (graphics: Canvas2DGraphicsRough) => {
  thirdEye.forEach((points) => {
    graphics.lineSegments(points);
  });
  thirdEyeLight.forEach((points) => {
    graphics.lineSegments(points, { fill: true, styles: { fillStyle: palette.violet } });
  });
  thirdEyeDark.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background }
    });
  });
  graphics.text('BARDO', 50, 88);
  graphics.text('press any key to start', 50, 95, {
    styles: { fontSize: (coords) => coords.width(0.04) }
  });
};
