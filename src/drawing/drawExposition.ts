import { thirdEyeDark } from '../../svg/thirdEyeDark';
import { Canvas2DGraphics, Canvas2DGraphicsOptions, mulberry32, Vector2 } from '../crco';
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
  let y = 5;
  const x = 50;
  const random = mulberry32(SEEDS[0]);
  graphics.options.random = random;
  graphics.text(`In Buddhism, Bardo is the state of existence`, x, y, options);
  y += intervalSmall;
  graphics.text(`between two lives on Earth.`, x, y, options);
  y += interval;
  graphics.text(`In this state, one may experience terrifying`, x, y, options);
  y += intervalSmall;
  graphics.text(`hallucinations that arise from previous actions.`, x, y, options);
  y += interval;
  graphics.text(`For prepared and appropriately trained individuals,`, x, y, options);
  y += intervalSmall;
  graphics.text(`Bardo offers a great opportunity for liberation.`, x, y, options);
  y += interval;
  graphics.text(`While for others, it can be a place of great danger... `, x, y, options);
  graphics.text(startText, x, 92, {
    roughness: 0,
    styles: { fontSize: (coords) => coords.width(0.04) }
  });
  thirdEyeDark.forEach((points) => {
    graphics.lineSegments(points, {
      fill: true,
      styles: { fillStyle: palette.background, translation },
      roughness
    });
  });
  graphics.lineSegments(
    [
      [25, 60],
      [75, 60]
    ],
    { roughness: 0.05 }
  );
};
