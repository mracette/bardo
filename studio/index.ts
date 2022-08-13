import '../src/dom/styles.css';

import { aspectRatioResize, Canvas2DGraphicsRough } from "crco-utils";
import { canvasContexts, canvasElements } from "../src/globals/dom";
import { mapDimensions } from "../src/globals/game";
import { palette } from '../src/globals/palette';
import { graphics, sharedOptions, sharedStyles } from '../src/globals/graphics';
import { drawThirdEye } from '../src/drawing/drawThirdEye';
import { registerEvent, Trigger } from '../src/util/eventRegister';
import { drawTiles } from '../src/drawing/drawTiles';

document.body.style.backgroundColor = palette.background;

const studioGraphics = new Canvas2DGraphicsRough(canvasContexts.gameplay, {
    ...sharedOptions,
    styles: {
        ...sharedStyles
    },
    stroke: true
})

aspectRatioResize(canvasElements.map, mapDimensions);
aspectRatioResize(canvasElements.gameplay, mapDimensions);
aspectRatioResize(canvasElements.ui, mapDimensions);

registerEvent(Trigger.CanvasResize, () => {
    drawTiles(graphics.map);
    drawThirdEye(studioGraphics);
})