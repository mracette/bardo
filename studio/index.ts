import '../src/dom/styles.css';

import { aspectRatioResize, Canvas2DGraphicsRough, CanvasCoordinates } from "crco-utils";
import { canvasContexts, canvasElements } from "../src/globals/dom";
import { mapDimensions } from "../src/globals/game";
import { palette } from '../src/globals/palette';
import { graphics, sharedOptions, sharedStyles } from '../src/globals/graphics';
import { drawThirdEye } from '../src/drawing/drawThirdEye';
import { registerEvent, Trigger } from '../src/util/eventRegister';
import { drawTiles } from '../src/drawing/drawTiles';
import { pointsOnPath } from '../src/util/pointsOnPath';
import { moon } from "../svg/moon"

document.body.style.backgroundColor = palette.background;

const studioGraphics = new Canvas2DGraphicsRough(canvasContexts.gameplay, {
    ...sharedOptions,
    styles: {
        ...sharedStyles,
        lineWidth: (coords) => coords.width(.0075)
    },
    roughness: .05,
    stroke: true,
    coords: new CanvasCoordinates({canvas: canvasElements.gameplay, nxRange: [0, 100], nyRange: [0, 100], paddingX: (1 - 9/16) / 2})
})

aspectRatioResize(canvasElements.map, mapDimensions);
aspectRatioResize(canvasElements.gameplay, mapDimensions);
aspectRatioResize(canvasElements.ui, mapDimensions);

registerEvent(Trigger.CanvasResize, () => {
    drawTiles(graphics.map);
    drawThirdEye(studioGraphics);
})