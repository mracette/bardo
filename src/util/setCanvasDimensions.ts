import { DPR } from 'crco-utils';
import { canvasElements } from '../globals/dom';

export const setCanvasDimensions = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.clientWidth * DPR;
  canvas.height = canvas.clientHeight * DPR;
};

export const setAllCanvasDimensions = () => {
  Object.values(canvasElements).forEach(setCanvasDimensions);
};
