import '../src/dom/styles.css';

import { aspectRatioResize, Canvas2DGraphicsRough, CanvasCoordinates } from 'crco-utils';
import { drawThirdEye } from '../src/drawing/drawThirdEye';
import { drawTiles } from '../src/drawing/drawTiles';
import { canvasContexts, canvasElements } from '../src/globals/dom';
import { mapDimensions } from '../src/globals/game';
import { graphics, sharedOptions, sharedStyles } from '../src/globals/graphics';
import { palette } from '../src/globals/palette';
import { registerEvent, Trigger } from '../src/util/eventRegister';
import { pointsOnPath } from '../src/util/pointsOnPath';
import { moon } from '../svg/moon';

document.body.style.backgroundColor = palette.background;

const studioGraphics = new Canvas2DGraphicsRough(canvasContexts.gameplay, {
  ...sharedOptions,
  styles: {
    ...sharedStyles,
    lineWidth: (coords) => coords.width(0.0075),
    fontSize: (coords) => coords.width(0.1)
  },
  roughness: 0.05,
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

registerEvent(Trigger.CanvasResize, () => {
  drawThirdEye(studioGraphics);
});
