import {
  Canvas2DGraphics,
  Canvas2DGraphicsOptions,
  Canvas2DGraphicsRough,
  Canvas2DStyles
} from 'crco-utils';
import { CanvasCoordinates } from 'crco-utils';
import { canvasContexts, canvasElements } from './dom';
import { mapDimensions } from './map';

export const fontFamily = 'Arial, sans-serif';

export const sharedStyles: Canvas2DStyles = {
  strokeStyle: 'white',
  fillStyle: 'white',
  lineWidth: (coords) => coords.width(0.001),
  fontFamily,
  textAlign: 'center',
  textBaseline: 'middle',
  fontSize: (coords) => coords.width(0.1)
};

export const sharedOptions: Canvas2DGraphicsOptions = {
  useNormalCoordinates: true,
  scalarNormalization: 'width'
};

export const coordinates = {
  map: new CanvasCoordinates({
    canvas: canvasElements.map,
    nxRange: [0, mapDimensions.x],
    nyRange: [0, mapDimensions.y]
  }),
  upgrade: new CanvasCoordinates({
    canvas: canvasElements.upgrades,
    padding: 0.1
  }),
  ui: new CanvasCoordinates({
    canvas: canvasElements.ui
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
  upgrade: new Canvas2DGraphicsRough(canvasContexts.upgrades, {
    ...sharedOptions,
    coords: coordinates.upgrade,
    styles: {
      ...sharedStyles,
      lineWidth: (coords) => coords.width(0.01),
      fontSize: (coords) => coords.width(0.1),
      fontFamily
    }
  }),
  ui: new Canvas2DGraphicsRough(canvasContexts.ui, {
    ...sharedOptions,
    coords: coordinates.ui,
    styles: {
      ...sharedStyles,
      lineWidth: (coords) => coords.width(0.01),
      fontSize: (coords) => coords.width(0.1),
      fontFamily
    }
  })
};
