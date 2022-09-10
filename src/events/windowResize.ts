import { DPR } from '../crco';
import { canvasElements } from '../globals/dom';

export const handleWindowResize = () => {
  // style the ui canvas
  const rect = canvasElements.map.getBoundingClientRect();
  canvasElements.ui.style.height = String(rect.height * 0.1);
  canvasElements.ui.style.left = String(rect.left);
  canvasElements.ui.style.top = String(rect.top - canvasElements.ui.clientHeight);
  canvasElements.ui.style.width = String(rect.width);
  canvasElements.ui.width = canvasElements.ui.clientWidth * DPR;
  canvasElements.ui.height = canvasElements.ui.clientHeight * DPR;

  // style the lottery canvas
  canvasElements.lottery.width = canvasElements.gameplay.height;
  canvasElements.lottery.height = canvasElements.gameplay.height;
  canvasElements.lottery.style.width = canvasElements.gameplay.clientHeight + 'px';
  canvasElements.lottery.style.height = canvasElements.gameplay.clientHeight + 'px';
};
