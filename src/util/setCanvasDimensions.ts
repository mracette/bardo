import { DPR } from 'crco-utils';
import { CANVAS_ELEMENTS } from '../globals/dom';

export const setCanvasDimensions = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.clientWidth * DPR;
  canvas.height = canvas.clientHeight * DPR;
};

export const setAllCanvasDimensions = () => {
  Object.values(CANVAS_ELEMENTS).forEach(setCanvasDimensions);
};
