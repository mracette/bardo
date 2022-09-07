import '../src/dom/styles.css';

import {
  aspectRatioResize,
  Canvas2DGraphics,
  CanvasCoordinates,
  Vector2
} from '../src/crco';
import { drawThirdEye } from '../src/drawing/drawThirdEye';
import { drawTiles } from '../src/drawing/drawTiles';
import { canvasContexts, canvasElements } from '../src/globals/dom';
import { graphics, sharedOptions, sharedStyles } from '../src/globals/graphics';
import { mapDimensions } from '../src/globals/map';
import { palette } from '../src/globals/palette';
import { registerEvent, Trigger } from '../src/util/eventRegister';
import { pointsOnPath } from '../src/util/pointsOnPath';
import { goat } from '../svg/goat';
import { heart } from '../svg/heart';
import { mask } from '../svg/mask';
import { meditator } from '../svg/meditator';
import { mind } from '../svg/mind';
import { mushroom } from '../svg/mushroom';
import { prisoner } from '../svg/prisoner';
import { reaper } from '../svg/reaper';
import { treasure } from '../svg/treasure';
import { wrestler } from '../svg/wrestler';

document.body.style.backgroundColor = palette.background;

const studioGraphics = new Canvas2DGraphics(canvasContexts.gameplay, {
  ...sharedOptions,
  styles: {
    ...sharedStyles,
    lineWidth: (coords) => coords.width(0.015),
    fontSize: (coords) => coords.width(0.1)
  },
  roughness: 0.1,
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
aspectRatioResize(canvasElements.upgrades, mapDimensions);

const size = 0.1;

// registerEvent(Trigger.CanvasResize, () => {
//   drawThirdEye(studioGraphics);
// });

registerEvent(Trigger.CanvasResize, () => {
  [
    wrestler,
    goat,
    heart,
    mask,
    meditator,
    mind,
    mushroom,
    prisoner,
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
