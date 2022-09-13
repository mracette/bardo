import { thirdEye } from '../../svg/thirdEye';
import { thirdEyeDark } from '../../svg/thirdEyeDark';
import { thirdEyeLight } from '../../svg/thirdEyeLight';
import { Canvas2DGraphics, Canvas2DGraphicsOptions, mulberry32 } from '../crco';
import { SEEDS } from '../globals/math';
import { palette } from '../globals/palette';
import { roughness, startText, translation } from './drawThirdEye';

const interval = 7.5;
const intervalSmall = interval / 1.75;
const options: Canvas2DGraphicsOptions = {
  styles: {
    fontSize: (coords) => coords.width(0.03)
  }
};

export const drawExposition = (graphics: Canvas2DGraphics) => {
  let y = 2;
  const x = 50;
  const random = mulberry32(SEEDS[0]);
  graphics.options.random = random;
  thirdEyeLight.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background, translation },
      roughness
    });
  });
  thirdEyeDark.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background, translation },
      roughness
    });
  });
  thirdEye.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background, translation },
      roughness
    });
  });
  graphics.rect(0, 0, 1, 0.4, {
    fill: true,
    stroke: false,
    roughness: 0,
    styles: { fillStyle: palette.background }
  });
  graphics.rect(0, 40, 0.22, 0.15, {
    fill: true,
    stroke: false,
    roughness: 0,
    styles: { fillStyle: palette.background }
  });
  graphics.rect(70, 40, 0.22, 0.15, {
    fill: true,
    stroke: false,
    roughness: 0,
    styles: { fillStyle: palette.background }
  });
  graphics.text(`In Buddhism, Bardo is the state of existence`, x, y, options);
  y += intervalSmall;
  graphics.text(`between two lives on Earth.`, x, y, options);
  y += interval;
  graphics.text(`In this state, one may experience`, x, y, options);
  y += intervalSmall;
  graphics.text(`terrifying hallucinations`, x, y, options);
  y += interval;
  graphics.text(`For prepared individuals,`, x, y, options);
  y += intervalSmall;
  graphics.text(`Bardo offers a great opportunity for liberation.`, x, y, options);
  y += interval;
  graphics.text(`While for others, it can be a place of great danger...`, x, y, options);
  graphics.text(startText, x, 92, {
    roughness: 0,
    styles: { fontSize: (coords) => coords.width(0.04) }
  });
  graphics.lineSegments(
    [
      [25, 60],
      [75, 60]
    ],
    { roughness: 0.05 }
  );
};
