import { thirdEye } from '../../svg/thirdEye';
import { thirdEyeDark } from '../../svg/thirdEyeDark';
import { thirdEyeDarkMoons } from '../../svg/thirdEyeDarkMoons';
import { thirdEyeLight } from '../../svg/thirdEyeLight';
import { Canvas2DGraphics } from '../crco';
import { palette } from '../globals/palette';

const roughness = 0.2;
const circleRoughness = roughness * 200;
const startText = 'Press any key to start';

export const drawThirdEye = (graphics: Canvas2DGraphics) => {
  thirdEyeDark.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background },
      roughness
    });
  });
  thirdEye.forEach((points) => {
    graphics.lineSegments(points, { roughness });
  });
  graphics.circle(50, 50, 0.09, {
    roughness
  });
  graphics.circle(50, 50, 0.06, {
    roughness
  });
  graphics.circle(50, 65, 0.01, {
    roughness
  });
  graphics.circle(50, 70, 0.0125, {
    roughness
  });
  graphics.circle(50, 75, 0.015, {
    roughness
  });
  thirdEyeLight.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.violet },
      roughness
    });
  });
  thirdEyeDarkMoons.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background },
      roughness
    });
  });
  graphics.text('BARDO', 50, 23, { roughness: 0 });
  graphics.text('The journey between', 50, 30, {
    roughness: 0,
    styles: { fontSize: (coords) => coords.width(0.035) }
  });
  graphics.text('lives on Earth', 50, 35, {
    roughness: 0,
    styles: { fontSize: (coords) => coords.width(0.035) }
  });
  graphics.text(startText, 50, 92, {
    roughness: 0,
    styles: { fontSize: (coords) => coords.width(0.04) }
  });
  graphics.lineSegments(
    [
      [50, 79],
      [50, 87]
    ],
    {
      roughness
    }
  );
  graphics.lineSegments(
    [
      [47, 85],
      [50, 87],
      [53, 85]
    ],
    {
      roughness
    }
  );

  // graphics.text(subtitle, 50, 95, {
  //   styles: { fontSize: (coords) => coords.width(0.04) }
  // });
};
