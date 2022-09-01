import { Canvas2DGraphics, Canvas2DGraphicsOptions, Canvas2DStyles } from 'crco-utils';
import { CanvasCoordinates } from 'crco-utils';
import { canvasContexts, canvasElements } from './dom';
import { mapDimensions } from './map';

const fontFamily = 'Arial, sans-serif';

export const sharedStyles: Canvas2DStyles = {
  strokeStyle: 'white',
  fillStyle: 'white',
  fontFamily,
  textAlign: 'center',
  textBaseline: 'middle',
  lineWidth: (coords) => coords.width(0.00175),
  fontSize: (coords) => coords.width(0.1)
};

export const sharedOptions: Canvas2DGraphicsOptions = {
  useNormalCoordinates: true,
  scalarNormalization: 'width',
  stroke: true
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
    styles: { ...sharedStyles, lineWidth: (coords) => coords.width(0.001) }
  }),
  gameplay: new Canvas2DGraphics(canvasContexts.gameplay, {
    ...sharedOptions,
    coords: coordinates.map,
    styles: { ...sharedStyles },
    roughness: 0.1
  }),
  upgrade: new Canvas2DGraphics(canvasContexts.upgrades, {
    ...sharedOptions,
    coords: coordinates.upgrade,
    styles: {
      ...sharedStyles
    },
    roughness: 0.05
  }),
  ui: new Canvas2DGraphics(canvasContexts.ui, {
    ...sharedOptions,
    coords: coordinates.ui,
    styles: {
      ...sharedStyles
    }
  })
};
