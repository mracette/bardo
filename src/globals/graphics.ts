import {
  Canvas2DGraphics,
  Canvas2DGraphicsOptions,
  Canvas2DGraphicsRough,
  Canvas2DStyles
} from 'crco-utils';
import { CanvasCoordinates } from 'crco-utils';
import { canvasContexts, canvasElements } from './dom';
import { mapDimensions } from './game';

const sharedStyles: Canvas2DStyles = {
  strokeStyle: 'white',
  fillStyle: 'white',
  lineWidth: (coords) => coords.width(0.001)
};

const sharedOptions: Canvas2DGraphicsOptions = {
  useNormalCoordinates: true,
  scalarNormalization: 'width'
};

const coordinates = {
  map: new CanvasCoordinates({
    canvas: canvasElements.map,
    nxRange: [0, mapDimensions.x],
    nyRange: [0, mapDimensions.y]
  }),
  ui: new CanvasCoordinates({
    canvas: canvasElements.ui,
    padding: 0.1
  })
};

export const graphics = {
  map: new Canvas2DGraphics(canvasContexts.map, {
    ...sharedOptions,
    coords: coordinates.map,
    styles: sharedStyles,
    stroke: true
  }),
  gameplay: new Canvas2DGraphicsRough(canvasContexts.gameplay, {
    ...sharedOptions,
    coords: coordinates.map,
    styles: { ...sharedStyles, lineWidth: (coords) => coords.width(0.00175) },
    stroke: true,
    roughness: 0.1
  }),
  ui: new Canvas2DGraphicsRough(canvasContexts.ui, {
    ...sharedOptions,
    coords: coordinates.ui,
    styles: {
      ...sharedStyles,
      lineWidth: (coords) => coords.width(0.01),
      fontSize: (coords) => coords.width(0.1),
      fontFamily: 'Comic Sans MS, Chalkboard, cursive',
      textAlign: 'center'
    }
  }),
  debug: new Canvas2DGraphics(canvasContexts.debug, {
    ...sharedOptions,
    styles: {
      ...sharedStyles,
      fontSize: (coords) => coords.height(0.5)
    }
  })
};
