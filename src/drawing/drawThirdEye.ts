import { thirdEye } from '../../svg/thirdEye';
import { thirdEyeDark } from '../../svg/thirdEyeDark';
import { thirdEyeDarkMoons } from '../../svg/thirdEyeDarkMoons';
import { thirdEyeLight } from '../../svg/thirdEyeLight';
import { Canvas2DGraphics, PI, Vector2 } from '../crco';
import { palette } from '../globals/palette';

const roughness = 0.2;
const startText = 'Press enter to start';
const translation = new Vector2(0, 10);

export const drawThirdEye = (graphics: Canvas2DGraphics) => {
  thirdEyeDark.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background, translation },
      roughness
    });
  });
  thirdEye.forEach((points) => {
    graphics.lineSegments(points, { roughness, styles: { translation } });
  });
  graphics.circle(50, 50, 0.09, {
    roughness,
    styles: {
      translation
    }
  });
  graphics.circle(50, 50, 0.06, {
    roughness,
    styles: {
      translation
    }
  });
  graphics.circle(50, 65, 0.01, {
    roughness,
    styles: {
      translation
    }
  });
  graphics.circle(50, 70, 0.0125, {
    roughness,
    styles: {
      translation
    }
  });
  graphics.circle(50, 75, 0.015, {
    roughness,
    styles: {
      translation
    }
  });
  thirdEyeLight.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.violet, translation },
      roughness
    });
  });
  thirdEyeDarkMoons.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background, translation },
      roughness
    });
  });
  graphics.arc(50, 50, 0.49, PI, 0);
  graphics.lineSegments(
    [
      [1, 39],
      [1, 100]
    ],
    { roughness: 0, styles: { translation } }
  );
  graphics.lineSegments(
    [
      [99, 39],
      [99, 100]
    ],
    { roughness: 0, styles: { translation } }
  );
  graphics.text('BARDO', 50, 28, {
    roughness: 0,
    styles: { translation }
  });
  graphics.text(startText, 50, 92, {
    roughness: 0,
    styles: { fontSize: (coords) => coords.width(0.04) }
  });
};
