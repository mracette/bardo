import { Canvas2DGraphics, Canvas2DGraphicsRough, Canvas2DStyles } from 'crco-utils';
import { CanvasCoordinates } from 'crco-utils';
import { MAP_DIMENSIONS } from './game';

const BASE_STYLES: Canvas2DStyles = {
  strokeStyle: 'white',
  lineWidth: (coords) => coords.width(0.001)
};

export const CANVAS_ELEMENTS = {
  map: document.getElementById('canvas-main') as HTMLCanvasElement
};

export const CANVAS_CONTEXTS = {
  map: CANVAS_ELEMENTS.map.getContext('2d')
};

export const COORDS = {
  map: new CanvasCoordinates({
    canvas: CANVAS_ELEMENTS.map,
    nxRange: [0, MAP_DIMENSIONS.x],
    nyRange: [0, MAP_DIMENSIONS.y],
    padding: 0
  })
};

export const GRAPHICS = {
  map: new Canvas2DGraphics(CANVAS_CONTEXTS.map, {
    coords: COORDS.map,
    styles: BASE_STYLES,
    stroke: true,
    useNormalCoordinates: true,
    scalarNormalization: 'width'
  }),
  player: new Canvas2DGraphicsRough(CANVAS_CONTEXTS.map, {
    coords: COORDS.map,
    styles: { ...BASE_STYLES, lineWidth: (coords) => coords.width(0.00175) },
    stroke: true,
    roughness: 0.07,
    useNormalCoordinates: true,
    scalarNormalization: 'width'
  })
};
