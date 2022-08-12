import {
  Canvas2DGraphics,
  Canvas2DGraphicsOptions,
  Canvas2DGraphicsRough,
  Canvas2DStyles
} from 'crco-utils';
import { CanvasCoordinates } from 'crco-utils';
import { MAP_DIMENSIONS } from './game';

const BASE_STYLES: Canvas2DStyles = {
  strokeStyle: 'white',
  fillStyle: 'white',
  lineWidth: (coords) => coords.width(0.001)
};

const BASE_OPTIONS: Canvas2DGraphicsOptions = {
  useNormalCoordinates: true,
  scalarNormalization: 'width'
};

export const CANVAS_ELEMENTS = {
  map: document.querySelector('canvas#map') as HTMLCanvasElement,
  player: document.querySelector('canvas#player') as HTMLCanvasElement,
  debug: document.querySelector('canvas#debug') as HTMLCanvasElement
};

export const CANVAS_CONTEXTS = {
  map: CANVAS_ELEMENTS.map.getContext('2d')!,
  player: CANVAS_ELEMENTS.player.getContext('2d')!,
  debug: CANVAS_ELEMENTS.debug.getContext('2d')!
};

export const COORDS = {
  map: new CanvasCoordinates({
    canvas: CANVAS_ELEMENTS.map,
    nxRange: [0, MAP_DIMENSIONS.x],
    nyRange: [0, MAP_DIMENSIONS.y]
  })
};

export const GRAPHICS = {
  map: new Canvas2DGraphics(CANVAS_CONTEXTS.map, {
    ...BASE_OPTIONS,
    coords: COORDS.map,
    styles: BASE_STYLES,
    stroke: true
  }),
  player: new Canvas2DGraphicsRough(CANVAS_CONTEXTS.player, {
    ...BASE_OPTIONS,
    coords: COORDS.map,
    styles: { ...BASE_STYLES, lineWidth: (coords) => coords.width(0.00175) },
    stroke: true,
    roughness: 0.1
  }),
  debug: new Canvas2DGraphics(CANVAS_CONTEXTS.debug, {
    ...BASE_OPTIONS,
    styles: {
      ...BASE_STYLES,
      fontSize: (coords) => coords.height(0.5)
    }
  })
};
