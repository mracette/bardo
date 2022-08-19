import '../src/dom/styles.css';

import {
  aspectRatioResize,
  Canvas2DGraphicsRough,
  CanvasCoordinates,
  Vector2
} from 'crco-utils';
import { drawThirdEye } from '../src/drawing/drawThirdEye';
import { drawTiles } from '../src/drawing/drawTiles';
import { canvasContexts, canvasElements } from '../src/globals/dom';
import { mapDimensions } from '../src/globals/game';
import { graphics, sharedOptions, sharedStyles } from '../src/globals/graphics';
import { palette } from '../src/globals/palette';
import { registerEvent, Trigger } from '../src/util/eventRegister';
import { pointsOnPath } from '../src/util/pointsOnPath';
import { anger } from '../svg/anger';
import { goat } from '../svg/goat';
import { heart } from '../svg/heart';
import { mask } from '../svg/mask';
import { meditator } from '../svg/meditator';
import { mind } from '../svg/mind';
import { mushroom } from '../svg/mushroom';
import { pinhead } from '../svg/pinhead';
import { reaper } from '../svg/reaper';
import { thirdEye } from '../svg/thirdEye';
import { thirdEyeDark } from '../svg/thirdEyeDark';
import { thirdEyeLight } from '../svg/thirdEyeLight';
import { treasure } from '../svg/treasure';

document.body.style.backgroundColor = palette.background;

const studioGraphics = new Canvas2DGraphicsRough(canvasContexts.gameplay, {
  ...sharedOptions,
  styles: {
    ...sharedStyles,
    lineWidth: (coords) => coords.width(0.015),
    fontSize: (coords) => coords.width(0.1)
  },
  roughness: 1.25,
  stroke: true,
  coords: new CanvasCoordinates({
    canvas: canvasElements.gameplay,
    nxRange: [0, 100],
    nyRange: [0, 100],
    paddingX: (1 - 9 / 16) / 2
  })
});

aspectRatioResize(canvasElements.map, mapDimensions);
aspectRatioResize(canvasElements.gameplay, mapDimensions);
aspectRatioResize(canvasElements.ui, mapDimensions);

const size = 0.1;

// registerEvent(Trigger.CanvasResize, () => {
//   drawThirdEye(studioGraphics);
// });

registerEvent(Trigger.CanvasResize, () => {
  [
    anger,
    goat,
    heart,
    mask,
    meditator,
    mind,
    mushroom,
    pinhead,
    reaper,
    // thirdEye,
    // thirdEyeDark,
    // thirdEyeLight,
    treasure
  ].forEach((sprite, i) => {
    sprite.forEach((lines) =>
      studioGraphics.lineSegments(lines, {
        styles: {
          scale: new Vector2(size, size),
          translation: new Vector2(
            studioGraphics.coords.width((size * i) % 1),
            studioGraphics.coords.width(size + size * Math.floor(size * i))
          )
        }
      })
    );
  });
});
