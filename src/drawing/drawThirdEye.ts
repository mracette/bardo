import { Canvas2DGraphics } from 'crco-utils';
import { thirdEye } from '../../svg/thirdEye';
import { thirdEyeDark } from '../../svg/thirdEyeDark';
import { thirdEyeLight } from '../../svg/thirdEyeLight';
import { palette } from '../globals/palette';

export const drawThirdEye = (graphics: Canvas2DGraphics) => {
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
  // graphics.text('BARDO', 50, 55);
  // graphics.text('the intermediate existence between two lives on earth', 50, 95, {
  //   styles: { fontSize: (coords) => coords.width(0.04) }
  // });
};
